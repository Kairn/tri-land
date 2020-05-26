import React from 'react';
import './Hand.css';
import { Card } from '../Card';
import PropTypes from 'prop-types';

export default function Hand(props) {
  let owner = props.playerId === 0 ? 'Dealer' : 'Player';
  let wagerRow = owner === 'Dealer' ? null : <h1>Wager: {props.wager}</h1>;

  return props.cards ? (
    <div className={"Hand " + props.isBust ? 'bust' : 'no-bust'} key={props.playerId.toString()}>
      <h1>This is a {owner} hand</h1>
      {wagerRow}
      <h1>Hand Value: {props.value}</h1>
      <div className="hand-row">
        {props.cards.map((card) => <Card key={card.cardId} suit={card.suit} rank={card.rank} />)}
      </div>
    </div>
  ) : null;
};

Hand.propTypes = {
  playerId: PropTypes.number,
  wager: PropTypes.number,
  cards: PropTypes.arrayOf(Object),
  value: PropTypes.number
};
