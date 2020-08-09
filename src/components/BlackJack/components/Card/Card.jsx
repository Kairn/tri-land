import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

import cIcon from '../../../../assets/clubs.svg';
import dIcon from '../../../../assets/diamonds.svg';
import hIcon from '../../../../assets/hearts.svg';
import sIcon from '../../../../assets/spades.svg';

export default function Card(props) {
  let suitIcon;
  let cClass;

  switch (props.suit) {
    case 'Clubs':
      suitIcon = cIcon;
      cClass = 's1';
      break;
    case 'Diamonds':
      suitIcon = dIcon;
      cClass = 's2';
      break;
    case 'Hearts':
      suitIcon = hIcon;
      cClass = 's3';
      break;
    case 'Spades':
      suitIcon = sIcon;
      cClass = 's4';
      break;
    default:
  }

  return (
    <div className={`Card font-robs ${cClass}`}>
      <span className="r1">{props.rank}</span>
      <img src={suitIcon} alt="suit" className="suit" />
      <span className="r2">{props.rank}</span>
    </div>
  );
};

Card.propTypes = {
  suit: PropTypes.string,
  rank: PropTypes.string
};
