import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suit: props.suit,
      rank: props.rank
    };
  }

  render() {
    return (
      <div className="Card">
        <h1>Suit: {this.state.suit}</h1>
        <h1>Rank: {this.state.rank}</h1>
      </div>
    );
  }
};

Card.propTypes = {
  suit: PropTypes.string,
  rank: PropTypes.string
};

export default Card;
