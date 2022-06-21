import { SelectableValue } from '@grafana/data';
import { Query } from './types';

/**
 * API Data Source
 */
export const SupervisorAPIDataSource = 'supervisor';

/**
 * Datasource test status
 */
export enum DataSourceTestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Request Type Values
 */
export enum RequestTypeValue {
  DEVICE = 'device',
  LOGS = 'logs',
  NONE = 'none',
}

/**
 * Request Type
 *
 * @type {SelectableValue[]}
 */
export const RequestType: SelectableValue[] = [
  {
    label: 'None',
    description: 'Used for internal API calls',
    value: RequestTypeValue.NONE,
  },
  {
    label: 'Device',
    description: 'Returns device information',
    value: RequestTypeValue.DEVICE,
  },
  {
    label: 'Logs',
    description: 'Returns logs',
    value: RequestTypeValue.LOGS,
  },
];

/**
 * Defaults for Query
 */
export const defaultQuery: Partial<Query> = {
  requestType: RequestTypeValue.NONE,
};
