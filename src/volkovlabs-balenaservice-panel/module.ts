import { PanelPlugin } from '@grafana/data';
import { ServicePanel } from './components';
import { ServiceOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<ServiceOptions>(ServicePanel).setPanelOptions((builder) => {
  return builder;
});
