import React, { Component } from 'react';
import './Hand.css';
import { Card } from '../Card';
import PropTypes from 'prop-types';

export class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: props.playerId,
      wager: props.wager,
      cards: props.cards,
      value: 0,
      isBust: false
    };
  }

  componentDidMount() {
    this.updateValue();
  }

  render() {
    let owner = this.state.playerId === 0 ? 'Dealer' : 'Player';
    let wagerRow = owner === 'Dealer' ? null : <h1>Wager: {this.state.wager}</h1>;

    return this.state.cards ? (
      <div className="Hand" key={this.state.playerId.toString()}>
        <h1>This is a {owner} hand</h1>
        {wagerRow}
        <h1>Hand Value: {this.state.value}</h1>
        <div className="hand-row">
          {this.state.cards.map((card) => <Card key={card.cardId} suit={card.suit} rank={card.rank} />)}
        </div>
      </div>
    ) : null;
  }

  updateValue = () => {
    // 
  }
};

Hand.propTypes = {
  playerId: PropTypes.number,
  wager: PropTypes.number,
  cards: PropTypes.arrayOf(Object)
};

export default Hand;
