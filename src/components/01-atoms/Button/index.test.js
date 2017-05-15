import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

describe('Button Component', () => {
  it('sets the correct type', () => {
    const correctType = 'submit';
    const wrapper = shallow(<Button type={correctType} content="" />);
    expect(wrapper.is(`[type="${correctType}"]`)).toBeTruthy();
  });
});
