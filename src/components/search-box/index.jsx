import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import chunk from 'lodash/chunk';
import StoryItem from '../story-item';
import style from './search-box.scss';
import { SEARCH_ENDPOINT, ITEMS_ENDPOINT } from '../../constants';

/* todo
   // Handle error messages
 */
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: '',
      chunks: [],
      page: 1,
      error: '',
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
      .catch(error => {
        this.setState({
          error,
        });
      });
  }

  /**
   * Get data
   * @param page
   */
  getData = (page = 0) => {
    Promise.all(
      this.state.chunks[page].map(id =>
        axios.get(`${ITEMS_ENDPOINT}/${id}${'.json'}`),
      ),
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
      .catch(error => {
        this.setState({
          error,
        });
      });
  };
  handleToggleClass = item => {
    if (this.state.expand === item.id) {
      this.setState({ expand: null });
    } else {
      this.setState({ expand: item.id });
    }
  };

  render() {
    const { result, page, chunks, loading, expand } = this.state;
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

        {result.length >= 1 && (
          <div>
            <button
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

export default SearchBox;
