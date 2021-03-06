import axios, { AxiosError } from "axios";
import {
  ApiMethod,
  ApiResultObject,
  SnovAddUrlForSearchResponse,
  SnovAuthRequestParams,
  SnovAuthRequestResponse,
  SnovDomainSearchV2Params,
  SnovDomainSearchV2Response,
  SnovFindProspectbyUrlRequestParams,
  SnovGetProspectWithUrlResponse,
  SnovList,
  SnovProspectListRequestParams,
  SnovProspectListResponse,
  SnovGetProspectByIdRequestParams,
} from "../core/service-objects";
import { ApiUtil } from "../utils/api-util";
import qs from "qs";
import { PrivateSettings } from "./connector";

export class ServiceClient {
  public readonly appSettings: PrivateSettings;
  constructor(options: any) {
    this.appSettings = options.hullAppSettings;
  }

  public async generateAccessToken(): Promise<
    ApiResultObject<SnovAuthRequestParams, SnovAuthRequestResponse, AxiosError>
  > {
    const url = `https://api.snov.io/v1/oauth/access_token`;
    const method: ApiMethod = "post";
    const payload: SnovAuthRequestParams = {
      client_id: this.appSettings.client_id!,
      client_secret: this.appSettings.client_secret!,
      grant_type: "client_credentials",
    };

    try {
      const response = await axios.post<SnovAuthRequestResponse>(url, payload);
      return ApiUtil.handleApiResultSuccess(
        url,
        method,
        payload,
        response.data,
      );
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, payload, error);
    }
  }

  public async addUrlToSearchForProspect(
    params: SnovFindProspectbyUrlRequestParams,
  ): Promise<
    ApiResultObject<
      SnovFindProspectbyUrlRequestParams,
      SnovAddUrlForSearchResponse,
      AxiosError
    >
  > {
    const url = `https://api.snov.io/v1/add-url-for-search`;
    const method: ApiMethod = "post";
    const payload = {
      ...params,
      access_token: this.appSettings.access_token,
    };

    try {
      const response = await axios.post<SnovAddUrlForSearchResponse>(
        url,
        payload,
      );
      return ApiUtil.handleApiResultSuccess(url, method, params, response.data);
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, params, error);
    }
  }

  public async getProspectWithUrl(
    params: SnovFindProspectbyUrlRequestParams,
  ): Promise<
    ApiResultObject<
      SnovFindProspectbyUrlRequestParams,
      SnovGetProspectWithUrlResponse,
      AxiosError
    >
  > {
    const url = `https://api.snov.io/v1/get-emails-from-url`;
    const method: ApiMethod = "post";
    const payload = {
      ...params,
      access_token: this.appSettings.access_token,
    };

    try {
      const response = await axios.post<SnovGetProspectWithUrlResponse>(
        url,
        payload,
      );
      return ApiUtil.handleApiResultSuccess(url, method, params, response.data);
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, params, error);
    }
  }

  public async searchDomain(
    params: SnovDomainSearchV2Params,
  ): Promise<
    ApiResultObject<
      SnovDomainSearchV2Params,
      SnovDomainSearchV2Response,
      AxiosError
    >
  > {
    const payload = {
      ...params,
      access_token: this.appSettings.access_token,
    };

    const url = `https://api.snov.io/v2/domain-emails-with-info?${qs.stringify(
      payload,
    )}`;
    const method: ApiMethod = "get";

    try {
      const response = await axios.get<SnovDomainSearchV2Response>(url);
      return ApiUtil.handleApiResultSuccess(url, method, params, response.data);
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, params, error);
    }
  }

  public async getUserLists(): Promise<
    ApiResultObject<undefined, SnovList[], AxiosError>
  > {
    const queryString = qs.stringify({
      access_token: this.appSettings.access_token,
    });
    const url = `https://api.snov.io/v1/get-user-lists?${queryString}`;
    const method: ApiMethod = "get";

    try {
      const response = await axios.get<SnovList[]>(url);
      return ApiUtil.handleApiResultSuccess(
        url,
        method,
        undefined,
        response.data,
      );
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, undefined, error);
    }
  }

  public async getProspectsInList(
    params: SnovProspectListRequestParams,
  ): Promise<
    ApiResultObject<
      SnovProspectListRequestParams,
      SnovProspectListResponse,
      AxiosError
    >
  > {
    const url = `https://api.snov.io/v1/prospect-list`;
    const method: ApiMethod = "post";
    const payload = {
      ...params,
      access_token: this.appSettings.access_token,
    };

    try {
      const response = await axios.post<SnovProspectListResponse>(url, payload);
      return ApiUtil.handleApiResultSuccess(url, method, params, response.data);
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, params, error);
    }
  }

  public async getProspectById(
    params: SnovGetProspectByIdRequestParams,
  ): Promise<
    ApiResultObject<
      SnovGetProspectByIdRequestParams,
      SnovGetProspectWithUrlResponse,
      AxiosError
    >
  > {
    const url = `https://api.snov.io/v1/get-prospect-by-id`;
    const method: ApiMethod = "post";
    const payload = {
      ...params,
      access_token: this.appSettings.access_token,
    };

    try {
      const response = await axios.post<SnovGetProspectWithUrlResponse>(
        url,
        payload,
      );
      return ApiUtil.handleApiResultSuccess(url, method, params, response.data);
    } catch (error) {
      return ApiUtil.handleApiResultError(url, method, params, error);
    }
  }
}
