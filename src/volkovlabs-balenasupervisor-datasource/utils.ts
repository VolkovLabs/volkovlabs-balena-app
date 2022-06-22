import { PanelData } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { SupervisorAPIDataSource } from './constants';
import { DataSourceApi } from './types';

/**
 * Parse JSON to Camel Case
 */
export const parseJSONToCamelCase = (obj: any): any =>
  JSON.parse(obj, function (key, value) {
    const camelCaseKey = key
      .toLowerCase()
      .replace(/^_+/g, '')
      .replace(/([-_]\w)/g, (g) => g[1].toUpperCase());

    /**
     * Array or Camel Case
     */
    if (this instanceof Array || camelCaseKey === key) {
      return value;
    }

    this[camelCaseKey] = value;
  });

/**
 * Get Data Source
 *
 * @async
 */
export const getSupervisorDatasource = async (data: PanelData): Promise<DataSourceApi | null> => {
  const targets = data.request?.targets.filter((target) => target.refId === SupervisorAPIDataSource);
  if (!targets || !targets.length || !targets[0].datasource) {
    console.error('Data Source is not found');
    return null;
  }

  const datasource: DataSourceApi = await getDataSourceSrv().get(targets[0].datasource);
  if (!datasource || !datasource.api) {
    return null;
  }

  return datasource;
};
