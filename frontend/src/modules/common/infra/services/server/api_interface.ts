/* eslint-disable @typescript-eslint/no-explicit-any */

import { ServerApiResponse } from '@/modules/common/domain/models';
import {
  AxiosDefaults,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  HeadersDefaults,
  InternalAxiosRequestConfig
} from 'axios';

export class ServerApi {
  constructor(private readonly client: AxiosInstance) { }

  defaults?: Omit<AxiosDefaults<any>, 'headers'> & {
    headers: HeadersDefaults & { [key: string]: AxiosHeaderValue };
  };
  interceptors?: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig<any>>;
    response: AxiosInterceptorManager<ServerApiResponse<any>>;
  };

  getUri(config?: AxiosRequestConfig<any>): string {
    return this.client.getUri(config);
  }

  async request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<ServerApiResponse<T>> {
    const response = await this.client.request(config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.get(url, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.delete(url, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async head<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.head(url, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async options<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.options(url, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.post(url, data, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.put(url, data, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.patch(url, data, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async postForm<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.postForm(url, data, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async putForm<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.putForm(url, data, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }

  async patchForm<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ServerApiResponse<T>> {
    const response = await this.client.patchForm(url, data, config);
    return ServerApiResponse.fromClientResponse<T>(response);
  }
}
