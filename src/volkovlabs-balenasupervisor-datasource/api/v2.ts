import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { RequestTypeValue } from '../constants';
import { Query, StateStatus } from '../types';
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
