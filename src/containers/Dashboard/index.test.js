
import React from 'react';
import { shallow } from 'enzyme';
import { DashboardContainer } from './';

it('Test example', () => {
  const wrapper = shallow(<DashboardContainer createMeetingRequest={() => 'needfulz'} />);
  expect(wrapper.find('div')).toBeTruthy();
});
