import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { QueryFilter } from '../models/service-models/foundation/api-contracts/query-filter';
import { AppConstants } from '../../app-constants';
import { LicenseSM } from '../models/service-models/app/v1/licenses/license-s-m';
import { LicenseViewModel } from '../models/view/licenses/license.viewmodel';
import { LicenseClient } from '../clients/license.client';

@Injectable({
  providedIn: 'root',
})
export class LicenseService extends BaseService {
  constructor(private LicenseClient: LicenseClient) {
    super();
  }

  /**
   * Retrieves all Licenses from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of LicenseSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllLicenses(viewModel:LicenseViewModel): Promise<ApiResponse<LicenseSM[]>> {
      let queryFilter = new QueryFilter();
      queryFilter.skip = (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
      queryFilter.top = viewModel.pagination.PageSize
      return await this.LicenseClient.GetAllLicenses(queryFilter);
  }

  async getTotatLicensesCount(): Promise<ApiResponse<number>> {
    return await this.LicenseClient.GetTotatLicenseCount()
    }
  async deleteLicense(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ErrorPrompts.Delete_Data_Error);
    }
    return await this.LicenseClient.DeleteLicenseById(id);
  }

  async getLicenseById(id: number): Promise<ApiResponse<LicenseSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ErrorPrompts.Delete_Data_Error);
    }
    return await this.LicenseClient.GetLicenseById(id);
  }

  async addLicense(warehouseData: LicenseSM): Promise<ApiResponse<LicenseSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ErrorPrompts.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<LicenseSM>();
      apiRequest.reqData = warehouseData;
      return await this.LicenseClient.AddLicense(apiRequest);
    }
  }
  async updateLicense(LicenseData: LicenseSM): Promise<ApiResponse<LicenseSM>> {
    if (!LicenseData) {
      throw new Error(AppConstants.ErrorPrompts.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<LicenseSM>();
      apiRequest.reqData = LicenseData;
      return await this.LicenseClient.UpdateLicense(apiRequest);
    }
  }
}
