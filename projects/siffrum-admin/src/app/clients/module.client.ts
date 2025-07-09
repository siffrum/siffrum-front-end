import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BaseApiClient } from './base-client/base-api.client';
import { CommonResponseCodeHandler } from './helpers/common-response-code-handler.helper';
import { StorageCache } from './helpers/storage-cache.helper';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';
import { QueryFilter } from '../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../models/service-models/foundation/common-response/int-response-root';
import { AppConstants } from '../../app-constants';
import { ModulesSM } from '../models/service-models/app/v1/licenses/modules-s-m';
@Injectable({
  providedIn: 'root',
})
export class ModuleClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
    /**
     * Retrieves all modules with pagination.
     *@dev Musaib
     * @param queryFilter - The filter for pagination (skip and top).
     * @returns A promise that resolves to an ApiResponse containing an array of ModulesSM objects.
     */
  GetAllModules = async (queryFilter:QueryFilter): Promise<ApiResponse<ModulesSM[]>> => {
    let resp = await this.GetResponseAsync<null, ModulesSM[]>(`${AppConstants.ApiUrls.MODULE}/getall?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

    /**
     * Retrieves the total count of modules.
     * @returns A promise that resolves to an ApiResponse containing the total count of modules.
     */
  GetTotatModuleCount = async (): Promise<ApiResponse<number>> => {
    let resp = await this.GetResponseAsync<null, number>(
      `${AppConstants.ApiUrls.MODULE}/count`,
      'GET'
    );
    return resp;
    }

    /** * Adds a new module.
     * @dev Musaib
     * @param addModule - The module data to add.
     * @return A promise that resolves to an ApiResponse containing the added ModulesSM object.         
     * */
 AddModule= async (
    addModule: ApiRequest<ModulesSM>
  ): Promise<ApiResponse<ModulesSM>> => {
    let resp = await this.GetResponseAsync<ModulesSM, ModulesSM>(
      `${AppConstants.ApiUrls.MODULE}/create`,
      'POST',
      addModule
    );
    return resp;
  };

    /**
     * Deletes a module by its ID.
     * @dev Musaib
     * @param Id - The ID of the module to delete.
     * @returns A promise that resolves to an ApiResponse containing the result of the deletion.
     */
  DeleteModuleById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.ApiUrls.MODULE}/delete/${Id}`,
      'DELETE'
    );
    return resp;
  };
    /**
     * Retrieves a module by its ID.
     * @dev Musaib
     * @param Id - The ID of the module to retrieve.
     * @returns A promise that resolves to an ApiResponse containing the ModulesSM object.
     */

  GetModuleById = async (Id: number): Promise<ApiResponse<ModulesSM>> => {
    let resp = await this.GetResponseAsync<number, ModulesSM>(
      `${AppConstants.ApiUrls.MODULE}/getbyid/${Id}`,
      'GET'
    );
    return resp;
  };



  /**
   * Update existing Module
   * 
   * @param updateModule Module data to update
   * @returns Promise<ApiResponse<ModulesSM>>
   * @example
   * const updatedModule = new ModulesSM();
  
   */
  UpdateModule = async (
    updateModule: ApiRequest<ModulesSM>
  ): Promise<ApiResponse<ModulesSM>> => {
    let resp = await this.GetResponseAsync<ModulesSM, ModulesSM>(
      `${AppConstants.ApiUrls.MODULE}/update/${updateModule.reqData.id}`,
      'PUT',
      updateModule
    );
    return resp;
  };
}
