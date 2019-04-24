import React from 'react';
import { shallow } from 'enzyme';

import Field from '../index';

describe('<Field />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Field />);
    expect(
      renderedComponent.contains(
        <section>This project is licensed under the MIT license.</section>
      )
    ).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Field />);
    expect(renderedComponent.text()).toContain('Dinesh Pandiyan');
  });
});
