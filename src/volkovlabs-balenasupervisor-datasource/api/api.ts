import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings, FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { DefaultQuery, RequestTypeValue } from '../constants';
import { DataSourceOptions, Query, TargetState } from '../types';
import { getDevice, getDeviceFrame } from './v1';
import { getStateStatus, getStateStatusFrame } from './v2';

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
   * Get Journal Logs
   */
  async getJournalLogs(
    count = DefaultQuery.logCount,
    unit = DefaultQuery.logUnit,
    format = DefaultQuery.logFormat
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

  /**
   * V1
   */
  getDevice = getDevice;
  getDeviceFrame = getDeviceFrame;

  /**
   * V2
   */
  getStateStatus = getStateStatus;
  getStateStatusFrame = getStateStatusFrame;
}
