import { PanelPlugin } from '@grafana/data';
import { plugin } from './module';

/*
 Plugin
 */
describe('plugin', () => {
  it('should be instance of PanelPlugin', () => {
    expect(plugin).toBeInstanceOf(PanelPlugin);
  });

  it('Should call builder', () => {
    /**
     * Builder
     */
    const builder: any = {};

    /**
     * Supplier
     */
    plugin['optionsSupplier'](builder);
  });
});
