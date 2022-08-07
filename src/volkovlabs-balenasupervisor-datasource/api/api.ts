import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { DataSourceOptions } from '../types';
import { getDevice, getDeviceFrame, rebootDevice } from './v1';
import {
  getJournalLogs,
  getJournalLogsFrame,
  getStateStatus,
  getStateStatusFrame,
  getTargetState,
  restartApplicationService,
  restartApplicationServices,
  startApplicationService,
  stopApplicationService,
} from './v2';

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
   * V1
   */
  getDevice = getDevice;
  getDeviceFrame = getDeviceFrame;
  rebootDevice = rebootDevice;

  /**
   * V2
   */
  getStateStatus = getStateStatus;
  getStateStatusFrame = getStateStatusFrame;
  getTargetState = getTargetState;
  getJournalLogs = getJournalLogs;
  getJournalLogsFrame = getJournalLogsFrame;
  startApplicationService = startApplicationService;
  stopApplicationService = stopApplicationService;
  restartApplicationService = restartApplicationService;
  restartApplicationServices = restartApplicationServices;
}
