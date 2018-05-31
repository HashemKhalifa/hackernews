import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import DisplayedResult from '../displayed-result/index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const data = [17192926];
mock
  .onGet('https://hacker-news.firebaseio.com/v0/topstories.json')
  .reply(200, data);

data.forEach(id =>
  mock
    .onGet(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .reply(200, {
      by: 'jijojv',
      descendants: 1,
      id,
      kids: [17194292],
      score: 4,
      time: 1527746805,
      title:
        "Tesla's Rapid Software Update Is Great, but Hides More Fundamental Problems",
      type: 'story',
      url:
        'https://www.forbes.com/sites/samabuelsamid/2018/05/30/rapid-tesla-software-updates-are-great-but-hide-more-fundamental-problems/#558da95c57de',
    }),
);

describe('<DisplayedResult />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<DisplayedResult />);
  });
  it('Get data', async done => {
    const getData = jest.spyOn(wrapper.instance(), 'getData');
    await wrapper.instance().componentDidMount();
    setTimeout(() => {
      wrapper.update();
      const loadMoreButton = wrapper.find('[data-test="load-more"]').first();
      loadMoreButton.simulate('click');
      expect(getData).toHaveBeenCalled();
      done();
    }, 1000);
  });
});
