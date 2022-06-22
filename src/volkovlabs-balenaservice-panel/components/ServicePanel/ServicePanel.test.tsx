import { shallow } from 'enzyme';
import React from 'react';
import { FieldType, toDataFrame } from '@grafana/data';
import { RequestTypeValue } from '@volkovlabs/volkovlabs-balenasupervisor-datasource';
import { ServicePanel } from './ServicePanel';

/**
 * Panel
 */
describe('Panel', () => {
  const data = {
    series: [
      toDataFrame({
        name: RequestTypeValue.STATE_STATUS,
        fields: [
          {
            type: FieldType.string,
            name: 'Name',
            values: ['grafana', 'api'],
          },
        ],
      }),
    ],
  };

  it('Should find component', async () => {
    const getComponent = ({ options = {}, ...restProps }: any) => {
      return <ServicePanel {...restProps} options={options} />;
    };

    jest.spyOn(console, 'error').mockImplementation();

    const wrapper = shallow(getComponent({ data }));
    const div = wrapper.find('Alert');
    expect(div.exists()).toBeTruthy();
  });
});
