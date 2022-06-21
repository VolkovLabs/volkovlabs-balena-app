import { Observable } from 'rxjs';
import { RequestTypeValue } from '../constants';
import { Api } from './api';

/**
 * Response
 *
 * @param response
 */
const getResponse = (response: any) =>
  new Observable((subscriber) => {
    subscriber.next(response);
    subscriber.complete();
  });

/**
 * Fetch request Mock
 */
let fetchRequestMock = jest.fn().mockImplementation(() => getResponse({}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getBackendSrv: () => ({
    fetch: fetchRequestMock,
  }),
}));

/**
 * API
 */
describe('Api', () => {
  const instanceSettings: any = {};

  /**
   * Api
   */
  const api = new Api(instanceSettings);

  /**
   * checkPing
   */
  describe('checkPing', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: 'OK',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/2/ping',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/2/ping',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
          'X-Grafana-NoCache': 'true',
        },
        hideFromInspector: false,
      },
    };

    it('Should make checkPing request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await api.checkPing();
      expect(result).toBeTruthy();
    });

    it('Should handle checkPing failed request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      response.data = 'failed';

      let result = await api.checkPing();
      expect(result).toBeFalsy();
    });

    it('Should handle checkPing request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      response.data = '';
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.checkPing();
      expect(result).toBeFalsy();
    });
  });

  /**
   * getDevice, getDeviceFrame
   */
  describe('getDevice', () => {
    let response = {
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

    it('Should make getDevice request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await api.getDevice();
      expect(result).toBeTruthy();
    });

    it('Should make getActorsFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await api.getDeviceFrame({ refId: 'A', requestType: RequestTypeValue.DEVICE });
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(11);
    });
  });

  /**
   * getStateStatus, getStateStatusFrame
   */
  describe('getStateStatus', () => {
    let response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: '{"status":"success","appState":"applied","overallDownloadProgress":null,"containers":[],"release":"93a21afbb594139716164a8222c05ffa"}',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/state/status',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/v2/state/status',
        responseType: 'text',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    it('Should make getStateStatus request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await api.getStateStatus();
      expect(result).toBeTruthy();
    });

    it('Should make getStateStatusFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await api.getStateStatusFrame({ refId: 'A', requestType: RequestTypeValue.STATE_STATUS });
      expect(result?.length).toEqual(1);
    });
  });
});
