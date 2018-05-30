import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './assets/css/reset.scss';
import SearchBox from './components/search-box';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SearchBox />
      </div>
    );
  }
}

export default hot(module)(App);
