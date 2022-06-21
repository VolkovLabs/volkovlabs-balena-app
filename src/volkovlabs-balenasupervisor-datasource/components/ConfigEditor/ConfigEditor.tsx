import React, { ChangeEvent, PureComponent } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { FieldSet, InlineField, InlineFieldRow, Input, LegacyForms } from '@grafana/ui';
import { DataSourceOptions, SecureJsonData } from '../../types';

/**
 * Editor Properties
 */
interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions> {}

/**
 * State
 */
interface State {}

/**
 * Config Editor
 */
export class ConfigEditor extends PureComponent<Props, State> {
  /**
   * API URL Change
   */
  onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        url: event.target.value,
      },
    });
  };

  /**
   * API Key Change
   * Secure fields only sent to the backend
   */
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  /**
   * API Key Reset
   */
  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  /**
   * Render
   */
  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as SecureJsonData;

    return (
      <FieldSet>
        <InlineFieldRow>
          <InlineField label="API URL" labelWidth={14}>
            <Input type="text" value={jsonData.url} width={40} onChange={this.onUrlChange} />
          </InlineField>
        </InlineFieldRow>

        <InlineFieldRow>
          <LegacyForms.SecretFormField
            isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
            value={secureJsonData.apiKey || ''}
            label="API Key"
            labelWidth={7}
            inputWidth={20}
            onReset={this.onResetAPIKey}
            onChange={this.onAPIKeyChange}
          />
        </InlineFieldRow>
      </FieldSet>
    );
  }
}
