
import React from 'react';
import { shallow } from 'enzyme';
import { AppInner } from './';

it('Test example', () => {
  const wrapper = shallow(<AppInner createMeetingRequest={() => 'needfulz'} />);
  expect(wrapper.find('div')).toBeTruthy();
});
