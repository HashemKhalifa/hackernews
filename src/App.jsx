import React from 'react';
import { hot } from 'react-hot-loader';
import './assets/css/reset.scss';
import DisplayedResult from './components/displayed_result';

const App = () => {
  return (
    <div>
      <DisplayedResult />
    </div>
  );
};

export default hot(module)(App);
