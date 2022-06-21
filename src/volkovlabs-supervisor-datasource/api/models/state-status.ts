/**
 * State Status
 *
 * @see {https://www.balena.io/docs/reference/supervisor/supervisor-api/#get-v2statestatus}
 */
export interface StateStatus {
  /**
   * Status
   *
   * @type {string}
   */
  status: string;

  /**
   * Application State
   *
   * @type {string}
   */
  appState: string;

  /**
   * Release
   *
   * @type {string}
   */
  release: string;

  /**
   * Containers
   *
   * @type {ServiceContainer[]}
   */
  containers: ServiceContainer[];

  /**
   * Images
   *
   * @type {ServiceImage[]}
   */
  images: ServiceImage[];
}

/**
 * Service Container
 *
 */
export interface ServiceContainer {
  /**
   * Status
   *
   * @type {string}
   */
  status: string;

  /**
   * Service Name
   *
   * @type {string}
   */
  serviceName: string;

  /**
   * Service Id
   *
   * @type {number}
   */
  serviceId: number;

  /**
   * Image Id
   *
   * @type {number}
   */
  imageId: number;

  /**
   * Application Id
   *
   * @type {number}
   */
  appId: number;

  /**
   * Created At
   *
   * @type {string}
   */
  createdAt: string;

  /**
   * Container Id
   *
   * @type {string}
   */
  containerId: string;
}

/**
 * Service Image
 *
 */
export interface ServiceImage {
  /**
   * Status
   *
   * @type {string}
   */
  status: string;

  /**
   * Service Name
   *
   * @type {string}
   */
  serviceName: string;

  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Image Id
   *
   * @type {number}
   */
  imageId: number;

  /**
   * Download Progress
   *
   * @type {number}
   */
  downloadProgress: number;

  /**
   * Docker Image Id
   *
   * @type {string}
   */
  dockerImageId: string;

  /**
   * Application Id
   *
   * @type {string}
   */
  appId: string;
}
