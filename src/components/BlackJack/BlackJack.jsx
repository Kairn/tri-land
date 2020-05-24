import React, { Component } from 'react';
import './BlackJack.css';
import { Link } from 'react-router-dom';
import { Hand } from './components';

export class BlackJack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      playerCash: 1000
    };
  }

  componentDidMount() {
    console.log('Black Jack mounted');
  }

  render() {
    let screen;
    if (this.state.gameState === 2) {
      screen = (
        <div>
          <h2>Playing Black Jack</h2>
          <h2>Your cash: ${this.state.playerCash}</h2>
          <Hand playerId={0} wager={0} cards={this.state.dealerHand} />
          <Hand playerId={1} wager={this.state.wager} cards={this.state.playerHand1} />
          <Hand playerId={2} wager={this.state.wager} cards={this.state.playerHand2} />
          <button type="button" onClick={this.end}>End Game</button>
        </div>
      )
    } else if (this.state.gameState === 1) {
      screen = (
        <div>
          <h2>Choose your wager</h2>
          <button type="button" onClick={this.onWage} value={100}>100</button>
          <button type="button" onClick={this.onWage} value={50}>50</button>
          <button type="button" onClick={this.onWage} value={20}>20</button>
          <button type="button" onClick={this.onWage} value={10}>10</button>
          <br />
          <button type="button" onClick={this.end}>End Game</button>
        </div>
      )
    } else {
      screen = (
        <div>
          <h2>Welcome to Black Jack</h2>
          <button type="button" onClick={this.start}>Start Game</button>
          <Link to="/">Quit</Link>
        </div>
      )
    }

    return (
      <div className="BlackJack">
        <h1>BlackJack reacts!</h1>
        <h2>Black Jack Rules.</h2>
        {screen}
      </div>
    );
  }

  start = () => {
    this.setState({
      playerCash: 1000,
      gameState: 1
    });
  }

  end = () => {
    this.setState({
      playerCash: 1000,
      gameState: 0
    });
  }

  onWage = (event) => {
    this.newGame(parseInt(event.target.value, 10));
  }

  newDeck = () => {
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let newDeck = [];
    let cardId = 1;

    for (let i = 0; i < suits.length; ++i) {
      let suit = suits[i];
      for (let j = 0; j < ranks.length; ++j) {
        let rank = ranks[j];
        newDeck.push({
          cardId,
          suit,
          rank
        })
        ++cardId;
      }
    }

    // Shuffle
    for (let i = 0; i < 200; ++i) {
      let li = Math.floor(Math.random() * newDeck.length);
      let ri = Math.floor(Math.random() * newDeck.length);
      let temp = newDeck[li];
      newDeck[li] = newDeck[ri];
      newDeck[ri] = temp;
    }

    return newDeck;
  }

  newGame = (wager) => {
    let deck = this.newDeck();
    let dealerHand = [deck.pop()];
    let playerHand = [deck.pop(), deck.pop()];

    this.setState((state) => {
      return {
        deck,
        wager,
        playerCash: state.playerCash - wager,
        dealerHand,
        playerHand1: playerHand,
        gameState: 2
      }
    });
  }
};

export default BlackJack;
