import { PanelPlugin } from '@grafana/data';
import { ServicePanel } from './components';
import { ServiceOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<ServiceOptions>(ServicePanel).setPanelOptions((builder) => {
  builder.addSliderInput({
    path: 'refresh',
    name: 'Refresh',
    description: 'Interval to refresh, ms',
    settings: {
      min: 500,
      max: 10000,
      step: 100,
    },
    defaultValue: 3000,
  });

  return builder;
});
