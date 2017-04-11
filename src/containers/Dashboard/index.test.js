
import React from 'react';
import { shallow } from 'enzyme';
import { DashboardContainer } from './';

it('Test example', () => {
  const wrapper = shallow(<DashboardContainer />);
  expect(wrapper.find('div')).toBeTruthy();
});
