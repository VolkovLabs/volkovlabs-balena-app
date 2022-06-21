import { DataQuery, DataSourceJsonData, DataSourceRef } from '@grafana/data';
import { Api } from './api';

/**
 * Query
 */
export interface Query extends DataQuery {
  /**
   * Request Type
   *
   * @type {string}
   */
  requestType?: string;
}

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
