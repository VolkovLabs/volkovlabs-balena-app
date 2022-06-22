import { shallow } from 'enzyme';
import React from 'react';
import { ServicePanel } from './ServicePanel';

/**
 * Panel
 */
describe('Panel', () => {
  const data = {
    series: [],
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
