

import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './index';

it('Test example', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find('section')).toBeTruthy();
});
