import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';
import { Api } from '../api';
import { DataSourceTestStatus, RequestTypeValue } from '../constants';
import { DataSourceOptions, Query } from '../types';

/**
 * Datasource
 */
export class DataSource extends DataSourceApi<Query, DataSourceOptions> {
  /**
   * Api
   *
   * @type {Api} api
   */
  api: Api;

  /**
   * Constructor
   */
  constructor(instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    super(instanceSettings);
    this.api = new Api(instanceSettings);
  }

  /**
   * Query
   */
  async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const data: DataFrame[] = [];

    /**
     * Process targets
     */
    await Promise.all(
      options.targets.map(async (target) => {
        let frames: MutableDataFrame[] = [];

        /**
         * Request Types
         */
        switch (target.requestType) {
          case RequestTypeValue.DEVICE:
            frames = await this.api.getDeviceFrame(target);
            break;
          case RequestTypeValue.STATE_STATUS:
            frames = await this.api.getStateStatusFrame(target);
            break;
          case RequestTypeValue.LOGS:
            frames = await this.api.getJournalLogsFrame(target);
            break;
        }

        if (!frames || !frames.length) {
          return;
        }

        /**
         * Add Frames
         */
        data.push(...frames);
      })
    );

    /**
     * Return data
     */
    return { data };
  }

  /**
   * Health Check
   */
  async testDatasource() {
    /**
     * Check Ping and Device
     */
    const isStatusOk = await this.api.checkPing();
    const device = await this.api.getDevice();

    /**
     * Return
     */
    return {
      status: isStatusOk && device ? DataSourceTestStatus.SUCCESS : DataSourceTestStatus.ERROR,
      message: isStatusOk && device ? `Connected...` : "Error. Can't connect.",
    };
  }
}
