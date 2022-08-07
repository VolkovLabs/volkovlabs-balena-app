/**
 * Log Entry
 *
 * @see {https://www.balena.io/docs/reference/supervisor/supervisor-api/#journald-logs}
 */
export interface LogEntry {
  /**
   * Message
   *
   * @type {string}
   */
  message: string;

  /**
   * Message
   *
   * @type {number}
   */
  realtimeTimestamp: number;
}
