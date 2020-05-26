import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

export default function Card(props) {
  return (
    <div className="Card">
      <h1>Suit: {props.suit}</h1>
      <h1>Rank: {props.rank}</h1>
    </div>
  );
};

Card.propTypes = {
  suit: PropTypes.string,
  rank: PropTypes.string
};
