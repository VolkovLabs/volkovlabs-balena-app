import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings, FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { RequestTypeValue } from '../constants';
import { DataSourceOptions, Query } from '../types';
import { parseJSONToCamelCase } from '../utils';
import { Device } from './models';

/**
 * API
 */
export class Api {
  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}

  /**
   * Check Ping
   */
  async checkPing(): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.instanceSettings.url}/ping`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Data is not found');
      return false;
    }

    /**
     * Pong received
     */
    if (response.data === 'OK') {
      return true;
    }

    return false;
  }

  /**
   * Get Device
   */
  async getDevice(): Promise<Device | null> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.instanceSettings.url}/v1/device`,
        responseType: 'text',
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Get Device: API Request failed', response);
      return null;
    }

    /**
     * Check Device
     */
    const device = parseJSONToCamelCase(response.data as any) as Device;
    if (!device) {
      console.log('Device is not found');
      return null;
    }

    console.log(device);

    return device;
  }

  /**
   * Get Device Frame
   */
  async getDeviceFrame(query: Query): Promise<MutableDataFrame[]> {
    const device = await this.getDevice();
    if (!device) {
      return [];
    }

    /**
     * Create Device frame
     */
    const deviceFrame = new MutableDataFrame({
      name: RequestTypeValue.DEVICE,
      refId: query.refId,
      fields: [
        { name: 'IP address', values: [device.ipAddress], type: FieldType.string },
        { name: 'Port', values: [device.apiPort], type: FieldType.number },
        { name: 'Status', values: [device.status], type: FieldType.string },
        { name: 'OS', values: [device.osVersion], type: FieldType.string },
        { name: 'Progress', values: [device.downloadProgress], type: FieldType.number },
        { name: 'Commit', values: [device.commit], type: FieldType.string },
        { name: 'Supervisor', values: [device.supervisorVersion], type: FieldType.string },
        { name: 'MAC address', values: [device.macAddress], type: FieldType.string },
        { name: 'Update Downloaded', values: [device.updateDownloaded], type: FieldType.boolean },
        { name: 'Update Pending', values: [device.updatePending], type: FieldType.boolean },
        { name: 'Update Failed', values: [device.updateFailed], type: FieldType.boolean },
      ],
    });

    return [deviceFrame];
  }
}
