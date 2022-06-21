import { DataQuery } from '@grafana/data';
import { LogFormatValue, LogUnitValue, RequestTypeValue } from '../constants';

/**
 * Query
 */
export interface Query extends DataQuery {
  /**
   * Request Type
   *
   * @type {RequestTypeValue}
   */
  requestType?: RequestTypeValue;

  /**
   * Log Format
   *
   * @type {LogFormatValue}
   */
  logFormat?: LogFormatValue;

  /**
   * Log Unit
   *
   * @type {LogUnitValue}
   */
  logUnit?: LogUnitValue;

  /**
   * Log Count
   *
   * @type {number}
   */
  logCount?: number;
}
