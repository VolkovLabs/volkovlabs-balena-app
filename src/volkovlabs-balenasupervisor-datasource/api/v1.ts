import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { RequestTypeValue } from '../constants';
import { Device, Query } from '../types';
import { parseJSONToCamelCase } from '../utils';
import { Api } from './api';

/**
 * Get Device
 */
export async function getDevice(this: Api): Promise<Device | null> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${this.instanceSettings.url}/v1/device`,
      responseType: 'text',
    })
  ).catch((e) => {
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
  const device = parseJSONToCamelCase(response.data);
  if (!device) {
    console.error('Device is not found');
    return null;
  }

  return device;
}

/**
 * Get Device Frame
 */
export async function getDeviceFrame(this: Api, query: Query): Promise<MutableDataFrame[]> {
  const device = await this.getDevice();
  if (!device) {
    return [];
  }

  /**
   * Create frame
   */
  const frame = new MutableDataFrame({
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

  return [frame];
}

/**
 * Reboot Device
 */
export async function rebootDevice(this: Api): Promise<boolean> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      url: `${this.instanceSettings.url}/v1/reboot`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).catch((e) => {
    console.error(e.statusText);
  });

  /**
   * Check Response
   */
  if (!response || !response.data) {
    console.error('Reboot Device: API request failed', response);
    return false;
  }

  return true;
}
