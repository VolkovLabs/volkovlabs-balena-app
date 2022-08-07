import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { DefaultQuery, RequestTypeValue } from '../constants';
import { Query, StateStatus, TargetState } from '../types';
import { Api } from './api';

/**
 * Get State Status
 */
export async function getStateStatus(this: Api): Promise<StateStatus | null> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${this.instanceSettings.url}/v2/state/status`,
      responseType: 'json',
    })
  ).catch((e) => {
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
    console.error('State Status is not found');
    return null;
  }

  return stateStatus;
}

/**
 * Get State Status Frame
 */
export async function getStateStatusFrame(this: Api, query: Query): Promise<MutableDataFrame[]> {
  const stateStatus = await this.getStateStatus();
  if (!stateStatus || !Object.keys(stateStatus).length) {
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
export async function getJournalLogs(
  this: Api,
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
  ).catch((e) => {
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
export async function getJournalLogsFrame(this: Api, query: Query): Promise<MutableDataFrame[]> {
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
 * Get Target State
 */
export async function getTargetState(this: Api): Promise<TargetState | null> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${this.instanceSettings.url}/v2/local/target-state`,
      responseType: 'json',
    })
  ).catch((e) => {
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
  if (!Object.keys(targetState).length) {
    console.error('Target State is not found');
    return null;
  }

  return targetState;
}

/**
 * Start Service
 */
export async function startApplicationService(this: Api, appId: number, serviceName: string): Promise<boolean> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      url: `${this.instanceSettings.url}/v2/applications/${appId}/start-service`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ serviceName }),
    })
  ).catch((e) => {
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
export async function stopApplicationService(this: Api, appId: number, serviceName: string): Promise<boolean> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      url: `${this.instanceSettings.url}/v2/applications/${appId}/stop-service`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ serviceName }),
    })
  ).catch((e) => {
    console.error(e.statusText);
  });

  /**
   * Check Response
   */
  if (!response || !response.data) {
    console.error('Stop Application Service: API request failed', response);
    return false;
  }

  return true;
}

/**
 * Restart Service
 */
export async function restartApplicationService(this: Api, appId: number, serviceName: string): Promise<boolean> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      url: `${this.instanceSettings.url}/v2/applications/${appId}/restart-service`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ serviceName }),
    })
  ).catch((e) => {
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
export async function restartApplicationServices(this: Api, appId: number): Promise<boolean> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      url: `${this.instanceSettings.url}/v2/applications/${appId}/restart`,
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
    console.error('Restart Application Services: API request failed', response);
    return false;
  }

  return true;
}
