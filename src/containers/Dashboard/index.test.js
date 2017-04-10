
import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './';

it('Test example', () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper.find('div')).toBeTruthy();
});
