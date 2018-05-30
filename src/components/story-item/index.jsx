import React from 'react';
import PropTypes from 'prop-types';
import './story-item.scss';

const storyItem = ({ score, title, author, text }) => {
  return (
    <div className="story_item">
      <li>{score}</li>
      <li>{title}</li>
      <li>{author}</li>
      <li>{text}</li>
    </div>
  );
};

storyItem.propTypes = {
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default storyItem;
