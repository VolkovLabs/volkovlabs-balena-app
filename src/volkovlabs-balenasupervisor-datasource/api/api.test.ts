import { Observable } from 'rxjs';
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
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: 'failed' }));

      let result = await api.checkPing();
      expect(result).toBeFalsy();
    });

    it('Should handle checkPing request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: '' }));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.checkPing();
      expect(result).toBeFalsy();
    });
  });
});
