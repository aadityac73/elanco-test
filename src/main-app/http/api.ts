import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants/constants';
import Result from '../core/Result';

export interface RawDataSingle {
  ConsumedQuantity?: string,
  Cost?: string,
  Date?: string,
  InstanceId?: string,
  MeterCategory?: string,
  ResourceGroup?: string,
  ResourceLocation?: string,
  UnitOfMeasure?: string,
  Location?: string,
  ServiceName?: string,
};

export interface RawData extends RawDataSingle {
  Tags?: {
    'app-name': string,
    environment: string,
    'business-unit': string
  },
}

class Api {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: BASE_URL,
      headers: { Accept: 'application/json' }
    });
  }

  async getRawData(): Promise<Result<RawData[]>> {
    try {
      const { data } = await this.httpClient.get('raw');
      return Result.success<RawData[]>(data);
    } catch (error) {
      return Result.failed(error);
    }
  }

  async getApplications(): Promise<Result<string[]>> {
    try {
      const { data } = await this.httpClient.get('applications');
      return Result.success<string[]>(data);
    } catch (error) {
      return Result.failed(error);
    }
  }

  async getApplicationData(application: string): Promise<Result<RawData[]>> {
    try {
      const { data } = await this.httpClient.get('applications/'+application);
      return Result.success<RawData[]>(data);
    } catch (error) {
      return Result.failed(error);
    }
  }

  async getResources(): Promise<Result<string[]>> {
    try {
      const { data } = await this.httpClient.get('resources');
      return Result.success<string[]>(data);
    } catch (error) {
      return Result.failed(error);
    }
  }

  async getResourceData(resource: string): Promise<Result<RawData[]>> {
    try {
      const { data } = await this.httpClient.get('resources/'+resource);
      return Result.success<RawData[]>(data);
    } catch (error) {
      return Result.failed(error);
    }
  }
}

export default new Api()