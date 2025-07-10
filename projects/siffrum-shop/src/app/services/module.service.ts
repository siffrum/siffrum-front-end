import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { QueryFilter } from '../models/service-models/foundation/api-contracts/query-filter';
import { AppConstants } from '../../app-constants';
import { ModulesSM } from '../models/service-models/app/v1/licenses/modules-s-m';
import { ModulesViewModel } from '../models/view/licenses/modules.viewmodel';
import { ModuleClient } from '../clients/module.client';

@Injectable({
  providedIn: 'root',
})
export class ModuleService extends BaseService {
  constructor(private ModuleClient: ModuleClient) {
    super();
  }

  /**
   * Retrieves all Modules from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of ModulesSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllModules(viewModel:ModulesViewModel): Promise<ApiResponse<ModulesSM[]>> {
      let queryFilter = new QueryFilter();
      queryFilter.skip = (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
      queryFilter.top = viewModel.pagination.PageSize
      return await this.ModuleClient.GetAllModules(queryFilter);
  }

  async getTotatModulesCount(): Promise<ApiResponse<number>> {
    return await this.ModuleClient.GetTotatModuleCount()
    }
  async deleteModule(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ErrorPrompts.Delete_Data_Error);
    }
    return await this.ModuleClient.DeleteModuleById(id);
  }

  async getModuleById(id: number): Promise<ApiResponse<ModulesSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ErrorPrompts.Delete_Data_Error);
    }
    return await this.ModuleClient.GetModuleById(id);
  }

  async addModule(warehouseData: ModulesSM): Promise<ApiResponse<ModulesSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ErrorPrompts.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<ModulesSM>();
      apiRequest.reqData = warehouseData;
      return await this.ModuleClient.AddModule(apiRequest);
    }
  }
  async updateModule(ModuleData: ModulesSM): Promise<ApiResponse<ModulesSM>> {
    if (!ModuleData) {
      throw new Error(AppConstants.ErrorPrompts.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<ModulesSM>();
      apiRequest.reqData = ModuleData;
      return await this.ModuleClient.UpdateModule(apiRequest);
    }
  }
}
