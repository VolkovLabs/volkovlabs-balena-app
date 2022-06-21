import { DataSourceJsonData, DataSourceRef } from '@grafana/data';
import { Api } from '../api';

/**
 * Datasource Options
 */
export interface DataSourceOptions extends DataSourceJsonData {
  /**
   * URL to access API
   *
   * @type {string}
   */
  url: string;
}

/**
 * Secure JSON Data
 */
export interface SecureJsonData {
  /**
   * API Key
   *
   * @type {string}
   */
  apiKey?: string;
}

/**
 * Data Source Ref for API
 */
export interface DataSourceApi extends DataSourceRef {
  /**
   * Api
   */
  api?: Api;
}
