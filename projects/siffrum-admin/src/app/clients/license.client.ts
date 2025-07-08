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
import { LicenseSM } from '../models/service-models/app/v1/license-s-m';
@Injectable({
  providedIn: 'root',
})
export class LicenseClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllLicenses = async (queryFilter:QueryFilter): Promise<ApiResponse<LicenseSM[]>> => {
    let resp = await this.GetResponseAsync<null, LicenseSM[]>(`${AppConstants.ApiUrls.LICENSE}/getall?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

  GetTotatLicenseCount = async (): Promise<ApiResponse<number>> => {
    let resp = await this.GetResponseAsync<null, number>(
      `${AppConstants.ApiUrls.LICENSE}/count`,
      'GET'
    );
    return resp;
    }

 AddLicense= async (
    addLicense: ApiRequest<LicenseSM>
  ): Promise<ApiResponse<LicenseSM>> => {
    let resp = await this.GetResponseAsync<LicenseSM, LicenseSM>(
      `${AppConstants.ApiUrls.LICENSE}/create`,
      'POST',
      addLicense
    );
    return resp;
  };

  /**delete License by id */
  DeleteLicenseById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.ApiUrls.LICENSE}/delete/${Id}`,
      'DELETE'
    );
    return resp;
  };

  GetLicenseById = async (Id: number): Promise<ApiResponse<LicenseSM>> => {
    let resp = await this.GetResponseAsync<number, LicenseSM>(
      `${AppConstants.ApiUrls.LICENSE}/getbyid/${Id}`,
      'GET'
    );
    return resp;
  };



  /**
   * Update existing License
   * 
   * @param updateLicense License data to update
   * @returns Promise<ApiResponse<LicenseSM>>
   * @example
   * const updatedLicense = new LicenseSM();
  
   */
  UpdateLicense = async (
    updateLicense: ApiRequest<LicenseSM>
  ): Promise<ApiResponse<LicenseSM>> => {
    let resp = await this.GetResponseAsync<LicenseSM, LicenseSM>(
      `${AppConstants.ApiUrls.LICENSE}/update/${updateLicense.reqData.id}`,
      'PUT',
      updateLicense
    );
    return resp;
  };
}
