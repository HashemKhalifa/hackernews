import React from 'react';
import PropTypes from 'prop-types';
import style from './story-item.scss';

const StoryItem = ({ score, title, author, text }) => (
  <div className={style.storyDetails}>
    <div className={style.leftScore}>
      <span>{score}</span>
    </div>
    <ul className={style.rightData}>
      <li>{title}</li>
      <li>by: {author}</li>
      <li dangerouslySetInnerHTML={{ __html: text }} />
    </ul>
  </div>
);

StoryItem.propTypes = {
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default StoryItem;
