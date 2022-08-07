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

  /**
   * Start Application Service
   */
  describe('startApplicationService', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: 'OK',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/applications/1951752/start-service',
      type: 'basic',
      redirected: false,
      config: {
        url: 'api/datasources/proxy/1/v2/applications/1951752/start-service',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Grafana-Org-Id': 1,
        },
        data: '{"serviceName":"grafana"}',
        retry: 0,
        hideFromInspector: false,
      },
    };

    it('Should make startApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.startApplicationService(1951752, 'grafana');
      expect(result).toBeTruthy();
    });

    it('Should not make startApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.startApplicationService(1951752, 'grafana');
      expect(result).toBeFalsy();
    });

    it('Should throw exception startApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.startApplicationService(1951752, 'grafana');
      expect(result).toBeFalsy();
    });
  });

  /**
   * Stop Application Service
   */
  describe('stopApplicationService', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: 'OK',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/applications/1951752/stop-service',
      type: 'basic',
      redirected: false,
      config: {
        url: 'api/datasources/proxy/1/v2/applications/1951752/stop-service',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Grafana-Org-Id': 1,
        },
        data: '{"serviceName":"grafana"}',
        retry: 0,
        hideFromInspector: false,
      },
    };

    it('Should make stopApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.stopApplicationService(1951752, 'grafana');
      expect(result).toBeTruthy();
    });

    it('Should not make stopApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.stopApplicationService(1951752, 'grafana');
      expect(result).toBeFalsy();
    });

    it('Should throw exception stopApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.stopApplicationService(1951752, 'grafana');
      expect(result).toBeFalsy();
    });
  });

  /**
   * Restart Application Service
   */
  describe('restartApplicationService', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: 'OK',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/applications/1951752/restart-service',
      type: 'basic',
      redirected: false,
      config: {
        url: 'api/datasources/proxy/1/v2/applications/1951752/restart-service',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Grafana-Org-Id': 1,
        },
        data: '{"serviceName":"grafana"}',
        retry: 0,
        hideFromInspector: false,
      },
    };

    it('Should make restartApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.restartApplicationService(1951752, 'grafana');
      expect(result).toBeTruthy();
    });

    it('Should not make restartApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.restartApplicationService(1951752, 'grafana');
      expect(result).toBeFalsy();
    });

    it('Should throw exception restartApplicationService request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.restartApplicationService(1951752, 'grafana');
      expect(result).toBeFalsy();
    });
  });

  /**
   * Restart Application Services
   */
  describe('restartApplicationServices', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: 'OK',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/applications/1951752/restart',
      type: 'basic',
      redirected: false,
      config: {
        url: 'api/datasources/proxy/1/v2/applications/1951752/restart',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Grafana-Org-Id': 1,
        },
        retry: 0,
        hideFromInspector: false,
      },
    };

    it('Should make restartApplicationServices request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.restartApplicationServices(1951752);
      expect(result).toBeTruthy();
    });

    it('Should not make restartApplicationServices request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.restartApplicationServices(1951752);
      expect(result).toBeFalsy();
    });

    it('Should throw exception restartApplicationServices request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.restartApplicationServices(1951752);
      expect(result).toBeFalsy();
    });
  });

  /**
   * Get Target State
   */
  describe('getTargetState', () => {
    let response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: {
        status: 'success',
        state: {
          local: {
            name: 'dev',
            config: {},
            apps: {},
          },
          dependent: {
            apps: [],
            devices: [],
          },
        },
      },
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/local/target-state',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/v2/local/target-state',
        responseType: 'json',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    it('Should make getTargetState request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.getTargetState();
      expect(result).toBeTruthy();
    });

    it('Should not make getTargetState request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getTargetState();
      expect(result).toBeFalsy();
    });

    it('Should not make getTargetState request without data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: {} }));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getTargetState();
      expect(result).toBeFalsy();
    });

    it('Should throw exception getTargetState request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getTargetState();
      expect(result).toBeFalsy();
    });
  });

  /**
   * Get Journal Logs
   */
  describe('getJournalLogs', () => {
    let response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: '-- Journal begins at Sun 2022-08-07 20:50:50 UTC, ends at Sun 2022-08-07 21:22:41 UTC. --\nAug 07 21:13:21 d1a5b1b 4ff9c9aca8be[1623]: [api]     GET /v2/state/status 200 - 27.550 ms\nAug 07 21:13:21 d1a5b1b 4ff9c9aca8be[1623]: [api]     GET /v2/local/target-state \n',
      headers: {},
      url: 'https://localhost/api/datasources/proxy/1/v2/journal-logs',
      type: 'basic',
      redirected: false,
      config: {
        method: 'POST',
        url: 'api/datasources/proxy/1/v2/journal-logs',
        responseType: 'text',
        data: {
          follow: false,
          all: false,
          format: 'short',
          count: 300,
          unit: 'balena.service',
        },
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    it('Should make getJournalLogs request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.getJournalLogs();
      expect(result).toBeTruthy();
      expect(result?.length).toEqual(4);
    });

    it('Should not make getJournalLogs request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(null));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getJournalLogs();
      expect(result).toBeTruthy();
      expect(result?.length).toEqual(0);
    });

    it('Should throw exception getJournalLogs request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getJournalLogs();
      expect(result).toBeTruthy();
      expect(result?.length).toEqual(0);
    });

    it('Should make getJournalLogsFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      let result = await api.getJournalLogsFrame({ refId: 'A', requestType: RequestTypeValue.LOGS });
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(2);
    });

    it('Should handle getDeviceFrame request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: '' }));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.getJournalLogsFrame({ refId: 'A', requestType: RequestTypeValue.LOGS });
      expect(result).toBeTruthy();
      expect(result?.length).toEqual(1);
    });
  });
});
