/**
 * Control Mode
 */
export enum ControlMode {
  CONTAINER = 'Containers',
  IMAGE = 'Images',
  DEVICE = 'Device',
}

/**
 * Controls Mode Options
 */
export const ControlModeOptions = [
  { label: ControlMode.CONTAINER, value: ControlMode.CONTAINER },
  { label: ControlMode.IMAGE, value: ControlMode.IMAGE },
  { label: ControlMode.DEVICE, value: ControlMode.DEVICE },
];
