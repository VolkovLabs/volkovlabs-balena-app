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
