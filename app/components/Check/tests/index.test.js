import React from 'react';
import { shallow } from 'enzyme';

import Check from '../index';

describe('<Check />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Check />);
    expect(
      renderedComponent.contains(
        <section>This project is licensed under the MIT license.</section>
      )
    ).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.text()).toContain('Dinesh Pandiyan');
  });
});
