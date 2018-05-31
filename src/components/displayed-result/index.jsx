import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import axios from 'axios';
import chunk from 'lodash/chunk';
import ErrorMsg from '../common/error';
import StoryItem from '../story-item';
import style from './displayed-result.scss';
import { SEARCH_ENDPOINT, ITEMS_ENDPOINT } from '../../constants';

class DisplayedResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: '',
      chunks: [],
      page: 1,
      isResponseFailed: false,
      result: [],
      loading: false,
    };
  }
  componentDidMount() {
    axios
      .get(SEARCH_ENDPOINT)
      .then(response => {
        this.setState({
          chunks: chunk(response.data.slice(0, 500), 50),
        });
        this.getData(this.state.page);
      })
      .catch(() => {
        this.setState({
          isResponseFailed: true,
        });
      });
  }

  /**
   * Get data
   * @param page
   */
  getData = (page = 0) => {
    const getChunks = this.state.chunks[page];
    if (!getChunks) return;
    Promise.all(
      getChunks.map(id => axios.get(`${ITEMS_ENDPOINT}/${id}${'.json'}`)),
      this.setState({
        loading: true,
      }),
    )
      .then(items => {
        this.setState({
          result: [...this.state.result, ...items.map(item => item.data)],
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          isResponseFailed: true,
        });
      });
  };

  /**
   * handle toggle class for expand based on every story
   * @param item
   */
  handleToggleClass = item => {
    if (this.state.expand === item.id) {
      this.setState({ expand: null });
    } else {
      this.setState({ expand: item.id });
    }
  };

  render() {
    const {
      result,
      page,
      chunks,
      loading,
      expand,
      isResponseFailed,
    } = this.state;
    return (
      <>
        <div className={style.content}>
          {result.map(item => (
            <div
              key={item.id}
              onClick={() => this.handleToggleClass(item)}
              className={`${style.story_item} ${style.card} ${
                expand === item.id ? style.expanded : ''
              }`}
            >
              <StoryItem
                data-test="storyItem-init"
                score={item.score}
                title={item.title}
                author={item.by}
                text={expand === item.id ? item.text : null}
              />
            </div>
          ))}

          {loading && (
            <div className="center">
              Loading..
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            </div>
          )}
        </div>
        {isResponseFailed && (
          <ErrorMsg title="Something went wrong please try again!" />
        )}

        {result.length >= 1 && (
          <div>
            <button
              data-test="load-more"
              className={`${style.load_more} ${style.card}`}
              disabled={page >= chunks.length}
              onClick={() => {
                this.setState({ page: page + 1 }, () =>
                  this.getData(this.state.page),
                );
              }}
            >
              Load more...
            </button>
          </div>
        )}
      </>
    );
  }
}

export default DisplayedResult;
