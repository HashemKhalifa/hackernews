import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import axios from 'axios';
import chunk from 'lodash/chunk';
import StoryItem from '../story-item';
import './search-box.scss';
import { SEARCH_ENDPOINT, ITEMS_ENDPOINT } from '../../constants';

/* todo
   // Handle error messages
 */
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { result, page, chunks, loading } = this.state;
    console.log('result.length', result.length);
    console.log('loading', loading);
    return (
      <>
        <div className="story_content">
          {result.map(item => (
            <StoryItem
              key={item.id}
              score={item.score}
              title={item.title}
              author={item.by}
              text={item.text}
            />
          ))}
        </div>

        {loading && (
          <div className="center">
            Loading..
            <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
          </div>
        )}

        {result.length >= 1 && (
          <div>
            <button
              disabled={page >= chunks.length}
              onClick={() => {
                this.setState({ page: page + 1 });
                this.getData(page);
              }}
            >
              Load more
            </button>
          </div>
        )}
      </>
    );
  }
}

export default SearchBox;
