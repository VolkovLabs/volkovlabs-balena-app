import { Query } from '../types';
import { LogFormatValue, LogUnitValue } from './log';
import { RequestTypeValue } from './request';

/**
 * Defaults for Query
 */
export const DefaultQuery: Partial<Query> = {
  requestType: RequestTypeValue.NONE,
  logFormat: LogFormatValue.SHORT,
  logUnit: LogUnitValue.BALENA,
  logCount: 200,
  logExclude: 'journalctl',
};
