import { SelectableValue } from '@grafana/data';

/**
 * Log Unit Value
 */
export enum LogUnitValue {
  ALL = '*',
  BALENA = 'balena.service',
  OPENVPN = 'openvpn.service',
  SUPERVISOR = 'balena-supervisor.service',
}

/**
 * Log Unit
 *
 * @type {SelectableValue[]}
 */
export const LogUnitOptions: SelectableValue[] = [
  {
    label: 'Any',
    description: 'Display logs for all services',
    value: LogUnitValue.ALL,
  },
  {
    label: 'Balena',
    description: 'Display logs for Balena services',
    value: LogUnitValue.BALENA,
  },
  {
    label: 'OpenVPN',
    description: 'Display logs for OpenVPN',
    value: LogUnitValue.OPENVPN,
  },
  {
    label: 'Supervisor',
    description: 'Display logs for Supervisor',
    value: LogUnitValue.SUPERVISOR,
  },
];

/**
 * Log Format Values
 */
export enum LogFormatValue {
  UNIT = 'with-unit',
  SHORT = 'short',
  JSON = 'json',
  CAT = 'cat',
}

/**
 * Log Format
 *
 * @type {SelectableValue[]}
 */
export const LogFormatOptions: SelectableValue[] = [
  {
    label: 'Cat',
    description:
      'Generates a very terse output, only showing the actual message of each journal entry with no metadata, not even a timestamp',
    value: LogFormatValue.CAT,
  },
  {
    label: 'JSON',
    description: 'Formats entries as JSON objects',
    value: LogFormatValue.JSON,
  },
  {
    label: 'Short',
    description: 'Generates an output that is mostly identical to the formatting of classic syslog files',
    value: LogFormatValue.SHORT,
  },
  {
    label: 'With Units',
    description: 'Prefixes the unit and user unit names instead of the traditional syslog identifier',
    value: LogFormatValue.UNIT,
  },
];
