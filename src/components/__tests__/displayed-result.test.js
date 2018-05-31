import React from 'react';
import { shallow, render, mount } from 'enzyme';
import DisplayedResult from '../displayed-result';

const Component = <DisplayedResult />;
describe('<DisplayedResult />', () => {
  it('should render correctly', () => {
    const wrapper = mount(Component);
    expect(wrapper.find('[data-test="displayed-init"]')).toHaveLength(1);
  });
});
