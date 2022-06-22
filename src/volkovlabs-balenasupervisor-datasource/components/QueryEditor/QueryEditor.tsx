import { defaults } from 'lodash';
import React, { PureComponent } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Select, Slider } from '@grafana/ui';
import {
  defaultQuery,
  LogFormatOptions,
  LogFormatValue,
  LogUnitOptions,
  LogUnitValue,
  RequestType,
  RequestTypeValue,
} from '../../constants';
import { DataSource } from '../../datasource';
import { DataSourceOptions, Query } from '../../types';

/**
 * Editor Properties
 */
type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

/**
 * Query Editor
 */
export class QueryEditor extends PureComponent<Props> {
  /**
   * Request Type change
   */
  onRequestTypeChange = async (item: SelectableValue<RequestTypeValue>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, requestType: item.value! });
    onRunQuery();
  };

  /**
   * Log Format change
   */
  onLogFormatChange = async (item: SelectableValue<LogFormatValue>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, logFormat: item.value! });
    onRunQuery();
  };

  /**
   * Log Unit change
   */
  onLogUnitChange = async (item: SelectableValue<LogUnitValue>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, logUnit: item.value! });
    onRunQuery();
  };

  /**
   * Log Count change
   */
  onLogCountChange = async (value: number) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, logCount: value });
    onRunQuery();
  };

  /**
   * Render
   */
  render() {
    const query = defaults(this.props.query, defaultQuery);

    return (
      <>
        <InlineFieldRow>
          <InlineField grow label="Request" labelWidth={10}>
            <Select
              options={RequestType}
              value={RequestType.find((type) => type.value === query.requestType)}
              onChange={this.onRequestTypeChange}
            />
          </InlineField>
        </InlineFieldRow>

        {query.requestType === RequestTypeValue.LOGS && (
          <InlineFieldRow>
            <InlineField label="Format" labelWidth={10} tooltip="Allows to specify custom value">
              <Select
                width={40}
                allowCustomValue
                options={LogFormatOptions}
                value={LogFormatOptions.find((format) => format.value === query.logFormat)}
                onChange={this.onLogFormatChange}
              />
            </InlineField>

            <InlineField label="Unit" labelWidth={10} tooltip="Allows to specify custom value">
              <Select
                width={40}
                allowCustomValue
                options={LogUnitOptions}
                value={LogUnitOptions.find((unit) => unit.value === query.logUnit)}
                onChange={this.onLogUnitChange}
              />
            </InlineField>

            <InlineField grow label="Count" labelWidth={10}>
              <Slider value={query.logCount} min={100} max={2000} onChange={this.onLogCountChange} />
            </InlineField>
          </InlineFieldRow>
        )}
      </>
    );
  }
}
