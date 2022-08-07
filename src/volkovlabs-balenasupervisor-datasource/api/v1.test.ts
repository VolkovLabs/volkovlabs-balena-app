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
 * Throw Exception Response
 */
const getErrorResponse = (response: any) =>
  new Observable((subscriber) => {
    throw new TypeError('Error');
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
 * V1 API
 */
describe('V1', () => {
  const instanceSettings: any = {};
  const api = new Api(instanceSettings);

  /**
   * Get Device
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

    it('Should not make getDevice request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getDevice();
      expect(result).toBeFalsy();
    });

    it('Should throw exception getDevice request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getDevice();
      expect(result).toBeFalsy();
    });

    it('Should make getDeviceFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.getDeviceFrame({ refId: 'A', requestType: RequestTypeValue.DEVICE });
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(11);
    });

    it('Should handle getDeviceFrame request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: {} }));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getDeviceFrame({ refId: 'A', requestType: RequestTypeValue.DEVICE });
      expect(result?.length).toEqual(0);
    });
  });

  /**
   * Reboot Device
   */
  describe('rebootDevice', () => {
    const response = {
      status: 202,
      statusText: 'Accepted',
      ok: true,
      data: {
        Data: 'OK',
        Error: null,
      },
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v1/reboot',
      type: 'basic',
      redirected: false,
      config: {
        url: 'api/datasources/proxy/1/v1/reboot',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Grafana-Org-Id': 1,
        },
        retry: 0,
        hideFromInspector: false,
      },
    };

    it('Should make rebootDevice request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.rebootDevice();
      expect(result).toBeTruthy();
    });

    it('Should not make rebootDevice request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.rebootDevice();
      expect(result).toBeFalsy();
    });

    it('Should throw exception rebootDevice request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.rebootDevice();
      expect(result).toBeFalsy();
    });
  });
});
