import React from 'react';
import PropTypes from 'prop-types';
import style from './error.scss';

const ErrorMsg = props => (
  <div className={style.error}>
    <h2>{props.title}</h2>
  </div>
);

ErrorMsg.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ErrorMsg;
