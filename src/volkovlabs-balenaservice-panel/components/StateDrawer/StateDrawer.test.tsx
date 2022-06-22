import { shallow } from 'enzyme';
import React from 'react';
import { StateDrawer } from './StateDrawer';

/**
 * State Drawer
 */
describe('StateDrawer', () => {
  const targetState = {};

  it('Should find component', async () => {
    const getComponent = ({ options = {}, ...restProps }: any) => {
      return <StateDrawer {...restProps} onClose={() => {}} />;
    };

    const wrapper = shallow(getComponent({ targetState }));
    const div = wrapper.find('Drawer');
    expect(div.exists()).toBeTruthy();
  });
});
