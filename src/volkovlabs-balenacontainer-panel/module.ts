import { PanelPlugin } from '@grafana/data';
import { ContainerPanel } from './components';
import { ContainerOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<ContainerOptions>(ContainerPanel).setPanelOptions((builder) => {
  return builder;
});
