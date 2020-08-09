import React from 'react';
import './Hand.css';
import { Card } from '../Card';
import PropTypes from 'prop-types';

export default function Hand(props) {
  let ownerRow = props.playerId === 0 ? <h2>Dealer's Hand</h2> : null;
  let wagerRow = ownerRow ? null : <h2>Wager: ${props.wager}</h2>;
  let handStatus;
  if (props.status) {
    switch (props.status) {
      case -2:
        handStatus = 'Lost';
        break;
      case -1:
        handStatus = 'Forfeited';
        break;
      case 1:
        handStatus = 'Draw';
        break;
      case 2:
        handStatus = 'Won';
        break;
      default:
    }
  }
  handStatus = handStatus ? <h2>Status: {handStatus}</h2> : null;

  return props.cards ? (
    <div className={"Hand" + (props.isBust ? " bust" : "")} key={props.playerId.toString()}>
      <div className="hand-sum">
        {ownerRow}
        {wagerRow}
        {handStatus}
      </div>
      <div className={"hand-row" + (props.isActive ? " active" : "")}>
        <h2 className="font-mono">{props.value < 10 ? `0${props.value}` : props.value}</h2>
        <div className="cards-wrapper">
          {props.cards.map((card) => <Card key={card.cardId} suit={card.suit} rank={card.rank} />)}
        </div>
      </div>
    </div>
  ) : null;
};

Hand.propTypes = {
  playerId: PropTypes.number,
  wager: PropTypes.number,
  cards: PropTypes.arrayOf(Object),
  value: PropTypes.number,
  status: PropTypes.number,
  isBust: PropTypes.bool,
  isActive: PropTypes.bool
};
