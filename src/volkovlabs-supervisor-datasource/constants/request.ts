import { SelectableValue } from '@grafana/data';

/**
 * Request Type Values
 */
export enum RequestTypeValue {
  DEVICE = 'device',
  STATE_STATUS = 'status',
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
    label: 'Device',
    description: 'Returns device information',
    value: RequestTypeValue.DEVICE,
  },
  {
    label: 'State Status',
    description:
      'Returns a list of images, containers, the overall download progress and the status of the state engine. Requires Supervisor 9.7',
    value: RequestTypeValue.STATE_STATUS,
  },
  {
    label: 'None',
    description: 'For internal API calls',
    value: RequestTypeValue.NONE,
  },
  {
    label: 'Logs',
    description: 'Returns logs. Requires Supervisor 10.2',
    value: RequestTypeValue.LOGS,
  },
];
