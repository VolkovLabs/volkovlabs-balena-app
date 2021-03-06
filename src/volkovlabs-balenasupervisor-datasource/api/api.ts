import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings, FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { defaultQuery, RequestTypeValue } from '../constants';
import { DataSourceOptions, Query } from '../types';
import { parseJSONToCamelCase } from '../utils';
import { Device, StateStatus, TargetState } from './models';

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
   * Get State Status
   */
  async getStateStatus(): Promise<StateStatus | null> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.instanceSettings.url}/v2/state/status`,
        responseType: 'json',
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Get State Status: API Request failed', response);
      return null;
    }

    /**
     * Check State Status
     */
    const stateStatus = response.data as StateStatus;
    if (!stateStatus) {
      console.log('State Status is not found');
      return null;
    }

    return stateStatus;
  }

  /**
   * Get State Status Frame
   */
  async getStateStatusFrame(query: Query): Promise<MutableDataFrame[]> {
    const stateStatus = await this.getStateStatus();
    if (!stateStatus) {
      return [];
    }

    /**
     * Create frame
     */
    const frame = new MutableDataFrame({
      name: RequestTypeValue.STATE_STATUS,
      refId: query.refId,
      fields: [
        {
          name: 'Created At',
          values: stateStatus.containers?.map((container) => container.createdAt),
          type: FieldType.time,
        },
        {
          name: 'Name',
          values: stateStatus.containers?.map((container) => container.serviceName),
          type: FieldType.string,
        },
        {
          name: 'Id',
          values: stateStatus.containers?.map((container) => container.serviceId),
          type: FieldType.string,
        },
        {
          name: 'Application',
          values: stateStatus.containers?.map((container) => container.appId),
          type: FieldType.string,
        },
        {
          name: 'Container',
          values: stateStatus.containers?.map((container) => container.containerId),
          type: FieldType.string,
        },
        {
          name: 'Image',
          values: stateStatus.containers?.map((container) => container.imageId),
          type: FieldType.string,
        },
        {
          name: 'Status',
          values: stateStatus.containers?.map((container) => container.status),
          type: FieldType.string,
        },
      ],
    });

    return [frame];
  }

  /**
   * Get Journal Logs
   */
  async getJournalLogs(
    count = defaultQuery.logCount,
    unit = defaultQuery.logUnit,
    format = defaultQuery.logFormat
  ): Promise<string[]> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'POST',
        url: `${this.instanceSettings.url}/v2/journal-logs`,
        responseType: 'text',
        data: { follow: false, all: false, format, count, unit },
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Get Journal Logs: API Request failed', response);
      return [];
    }

    /**
     * Check Logs
     */
    const data = response.data as string;
    if (!data) {
      console.log('Logs are not found');
      return [];
    }

    return data.split('\n');
  }

  /**
   * Get Journal Logs Frame
   */
  async getJournalLogsFrame(query: Query): Promise<MutableDataFrame[]> {
    let logs = await this.getJournalLogs(query.logCount, query.logUnit, query.logFormat);
    if (!logs) {
      return [];
    }

    /**
     * Exclude
     */
    if (query.logExclude) {
      const exclude = RegExp(query.logExclude);
      logs = logs.filter((entry) => !exclude.test(entry));
    }

    /**
     * Create frame
     */
    const frame = new MutableDataFrame({
      name: RequestTypeValue.LOGS,
      refId: query.refId,
      meta: {
        preferredVisualisationType: 'logs',
      },
      fields: [
        { name: 'time', type: FieldType.time },
        { name: 'content', type: FieldType.string, values: logs.filter((entry) => entry.trim()) },
      ],
    });

    return [frame];
  }

  /**
   * Start Service
   */
  async startApplicationService(appId: number, serviceName: string): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        url: `${this.instanceSettings.url}/v2/applications/${appId}/start-service`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ serviceName }),
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Start Application Service: API request failed', response);
      return false;
    }

    return true;
  }

  /**
   * Stop Service
   */
  async stopApplicationService(appId: number, serviceName: string): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        url: `${this.instanceSettings.url}/v2/applications/${appId}/stop-service`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ serviceName }),
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Stop Application Service: API request failed', response);
      return false;
    }

    console.log(response);

    return true;
  }

  /**
   * Restart Service
   */
  async restartApplicationService(appId: number, serviceName: string): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        url: `${this.instanceSettings.url}/v2/applications/${appId}/restart-service`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ serviceName }),
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Restart Application Service: API request failed', response);
      return false;
    }

    return true;
  }

  /**
   * Restart All Services
   */
  async restartApplicationServices(appId: number): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        url: `${this.instanceSettings.url}/v2/applications/${appId}/restart`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Restart Application Services: API request failed', response);
      return false;
    }

    return true;
  }

  /**
   * Get Target Status
   */
  async getTargetState(): Promise<TargetState | null> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.instanceSettings.url}/v2/local/target-state`,
        responseType: 'json',
      })
    ).catch(function (e) {
      console.error(e.statusText);
    });

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error('Get Target State: API Request failed', response);
      return null;
    }

    /**
     * Check Target State
     */
    const targetState = response.data as TargetState;
    if (!targetState) {
      console.log('Target State is not found');
      return null;
    }

    return targetState;
  }

  /**
   * Reboot Device
   */
  async rebootDevice(): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        url: `${this.instanceSettings.url}/v1/reboot`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).catch(function (e) {
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
}
