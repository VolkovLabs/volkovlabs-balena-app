import { DataFrame, dateTime } from '@grafana/data';
import { DataSourceTestStatus, RequestTypeValue } from '../constants';
import { DataSource } from './datasource';

/**
 * Response
 */
let frames: DataFrame = [] as any;
const response: any = {
  status: 200,
  statusText: 'OK',
  ok: true,
  data: '{"api_port":48484,"ip_address":"192.168.7.223","os_version":"balenaOS 2.98.33","mac_address":"48:B0:2D:2F:6F:AA 20:4E:F6:C5:EE:C3","supervisor_version":"14.0.6","update_pending":false,"update_failed":false,"update_downloaded":false,"commit":"93a21afbb594139716164a8222c05ffa","status":"Idle","download_progress":null}',
  headers: {},
  url: 'https://localhost/api/datasources/proxy/1/v1/device',
  type: 'basic',
  redirected: false,
  config: {
    method: 'GET',
    url: 'api/datasources/proxy/1/v1/device',
    responseType: 'text',
    retry: 0,
    headers: {
      'X-Grafana-Org-Id': 1,
    },
    hideFromInspector: false,
  },
};
let pingResult = true;

/**
 * Api
 */
const apiMock = {
  getDevice: jest.fn().mockImplementation(() => Promise.resolve(response)),
  getDeviceFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  checkPing: jest.fn().mockImplementation(() => Promise.resolve(pingResult)),
};

jest.mock('../api', () => ({
  Api: jest.fn().mockImplementation(() => apiMock),
}));

/**
 * Data Source
 */
describe('DataSource', () => {
  const instanceSettings: any = {};
  const dataSource = new DataSource(instanceSettings);

  /**
   * Time Range
   */
  const range = {
    from: dateTime(),
    to: dateTime(),
    raw: {
      from: dateTime(),
      to: dateTime(),
    },
  };

  /**
   * Query
   */
  describe('Query', () => {
    it('Should return correct data for MUTABLE frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestTypeValue.DEVICE }];

      const response = (await dataSource.query({ targets, range } as any)) as any;
      const frames = response.data;
      expect(frames.length).toEqual(0);
    });
  });

  /**
   * Health Check
   */
  describe('testDatasource', () => {
    it('Should handle Success state', async () => {
      const result = await dataSource.testDatasource();
      expect(result).toEqual({
        status: DataSourceTestStatus.SUCCESS,
        message: `Connected...`,
      });
    });

    it('Should handle Error state', async () => {
      pingResult = false;

      const result = await dataSource.testDatasource();
      expect(result).toEqual({
        status: DataSourceTestStatus.ERROR,
        message: `Error. Can't connect.`,
      });
    });
  });
});
