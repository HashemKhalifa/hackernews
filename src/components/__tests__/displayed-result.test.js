import React from 'react';
import { shallow } from 'enzyme';
import DisplayedResult from '../displayed-result/index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock
  .onGet('https://hacker-news.firebaseio.com/v0/topstories.json')
  .reply(200, [17194289]);

mock
  .onGet('https://hacker-news.firebaseio.com/v0/item/17194289.json')
  .reply(200, {
    by: 'jijojv',
    descendants: 1,
    id: 17194289,
    kids: [17194292],
    score: 4,
    time: 1527746805,
    title:
      "Tesla's Rapid Software Update Is Great, but Hides More Fundamental Problems",
    type: 'story',
    url:
      'https://www.forbes.com/sites/samabuelsamid/2018/05/30/rapid-tesla-software-updates-are-great-but-hide-more-fundamental-problems/#558da95c57de',
  });


describe('<STORY />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<DisplayedResult />);
    console.log(wrapper);
  });
  it('Get data', () => {
    const loadMoreButton = wrapper.find('[data-test="load-more"]').first();
    loadMoreButton.simulate('click');
    const getData = jest.spyOn(DisplayedResult.prototype, 'getData');
    expect(getData).toHaveBeenCalled();
  });
});
