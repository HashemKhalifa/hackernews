import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './assets/css/reset.scss';
import DisplayedResult from './components/displayed_result';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <DisplayedResult />
      </div>
    );
  }
}

export default hot(module)(App);
