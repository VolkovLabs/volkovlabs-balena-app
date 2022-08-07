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
 * V2 API
 */
describe('V2', () => {
  const instanceSettings: any = {};
  const api = new Api(instanceSettings);

  /**
   * Get State Status
   */
  describe('getStateStatus', () => {
    let response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: `{
        "status": "success",
        "appState": "applied",
        "overallDownloadProgress": null,
        "containers": [
          {
            "status": "Running",
            "serviceName": "nginx",
            "appId": 1951752,
            "imageId": 5185867,
            "serviceId": 1671010,
            "createdAt": "2022-07-26T01:50:37.869Z"
          },
          {
            "status": "Running",
            "serviceName": "grafana",
            "appId": 1951752,
            "imageId": 5185866,
            "serviceId": 1671009,
            "createdAt": "2022-07-26T01:50:36.356Z"
          }
        ],
        "images": [
          {
            "appId": 1951752,
            "serviceName": "nginx",
            "imageId": 5185867,
            "status": "Downloaded",
            "downloadProgress": null
          },
          {
            "appId": 1951752,
            "serviceName": "grafana",
            "imageId": 5185866,
            "status": "Downloaded",
            "downloadProgress": null
          }
        ],
        "release": "9fa3728ced7fe3cb432a63783b0e29c4"
      }`,
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

    it('Should not make getStateStatus request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getStateStatus();
      expect(result).toBeFalsy();
    });

    it('Should throw exception getStateStatus request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getStateStatus();
      expect(result).toBeFalsy();
    });

    it('Should make getStateStatusFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.getStateStatusFrame({ refId: 'A', requestType: RequestTypeValue.STATE_STATUS });
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(7);
    });

    it('Should handle getDeviceFrame request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: {} }));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getStateStatusFrame({ refId: 'A', requestType: RequestTypeValue.STATE_STATUS });
      expect(result?.length).toEqual(0);
    });

    it('Should handle getDeviceFrame request with no containers', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() =>
        getResponse({
          ...response,
          data: `{
        "status": "success",
        "appState": "applied",
        "overallDownloadProgress": null,
        "containers": [],
        "images": [],
        "release": "9fa3728ced7fe3cb432a63783b0e29c4"
      }`,
        })
      );
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getStateStatusFrame({ refId: 'A', requestType: RequestTypeValue.STATE_STATUS });
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(7);
    });
  });
});
