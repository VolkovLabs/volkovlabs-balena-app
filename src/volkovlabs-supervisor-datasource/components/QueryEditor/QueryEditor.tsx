import { defaults } from 'lodash';
import React, { PureComponent } from 'react';
import { css } from '@emotion/css';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineFieldRow, InlineFormLabel, Select } from '@grafana/ui';
import { defaultQuery, RequestType, RequestTypeValue } from '../../constants';
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
   * Render
   */
  render() {
    const query = defaults(this.props.query, defaultQuery);

    return (
      <InlineFieldRow>
        <InlineFormLabel width={8}>Request</InlineFormLabel>
        <Select
          className={css`
            margin-right: 5px;
          `}
          width={40}
          options={RequestType}
          value={RequestType.find((type) => type.value === query.requestType)}
          onChange={this.onRequestTypeChange}
        />
      </InlineFieldRow>
    );
  }
}
