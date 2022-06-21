/**
 * Device
 *
 * @see {https://www.balena.io/docs/reference/supervisor/supervisor-api/#get-v1device}
 */
export interface Device {
  /**
   * Status of the device regarding the app, as a string, i.e. "Stopping", "Starting", "Downloading", "Installing", "Idle".
   *
   * @type {string}
   */
  status: string;

  /**
   * Version of the host OS running on the device.
   *
   * @type {string}
   */
  osVersion: string;

  /**
   * Port on which the supervisor is listening.
   *
   * @type {number}
   */
  apiPort: number;

  /**
   * Hash of the current commit of the release that is running on the fleet.
   *
   * @type {string}
   */
  commit: string;

  /**
   * Amount of the release that has been downloaded, expressed as a percentage. If the update has already been downloaded, this will be null.
   *
   * @type {number}
   */
  downloadProgress: number;

  /**
   * Space-separated list of IP addresses of the device.
   *
   * @type {string}
   */
  ipAddress: string;

  /**
   * Space-separated list of MAC addresses of the device.
   *
   * @type {string}
   */
  macAddress: string;

  /**
   * Version of the supervisor running on the device.
   *
   * @type {string}
   */
  supervisorVersion: string;

  /**
   * Boolean that will be true if a pending update has already been downloaded.
   *
   * @type {boolean}
   */
  updateDownloaded: boolean;

  /**
   * Boolean that will be true if the supervisor has tried to apply a pending update but failed (i.e. if the app was locked, there was a network failure or anything else went wrong).
   *
   * @type {boolean}
   */
  updateFailed: boolean;

  /**
   * It's a boolean that will be true while the Supervisor is checking for updates (such as on boot or every poll interval) or if the supervisor has finally concluded there is an update.
   *
   * @type {boolean}
   */
  updatePending: boolean;
}
