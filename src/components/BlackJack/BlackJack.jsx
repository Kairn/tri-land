import React, { Component } from 'react';
import './BlackJack.css';
import { Link } from 'react-router-dom';
import { Hand } from './components';

export class BlackJack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      playerCash: 1000,
      wager: 0,
      deck: [],
      allHands: [],
      handValues: [],
      activeHand: 1,
      evalHand: false,
      evalRes: -1,
      canSplit: false,
      hasSplit: false,
      canDouble: false,
      canForfeit: false,
      gameOver: false,
      payout: -1
    };
  }

  render() {
    let screen;
    let playerTurn = this.state.activeHand !== 0;

    if (this.state.gameState === 2) {
      let actions;
      if (this.state.evalRes === -1) {
        actions = (
          <div>
            <button type="button" disabled={!playerTurn} onClick={this.onAction} value="hit">Hit</button>
            <button type="button" disabled={!playerTurn || !this.state.canSplit} onClick={this.onAction} value="split">Split</button>
            <button type="button" disabled={!playerTurn || !this.state.canDouble} onClick={this.onAction} value="double">Double</button>
            <button type="button" disabled={!playerTurn} onClick={this.onAction} value="stand">Stand</button>
            <button type="button" disabled={!playerTurn || !this.state.canForfeit} onClick={this.onAction} value="forfeit">forfeit</button>
          </div>
        );
      } else {
        let payoutRow = this.state.payout > -1 ? <h2>Your last payout: ${this.state.payout}</h2> : null;
        actions = (
          <div>
            <div>{payoutRow}</div>
            <button type="button" disabled={false} onClick={this.evalGame}>Continue</button>
          </div>
        );
      }

      screen = (
        <div>
          <h2>Playing Black Jack</h2>
          <h2>Your cash: ${this.state.playerCash}</h2>
          {this.state.allHands.map((hand) => {
            let handId = hand.handId;
            let cards = hand.cards;
            let wager = handId === 0 ? 0 : this.state.wager;
            return <Hand key={handId} playerId={handId} wager={wager} cards={cards} value={this.state.handValues[handId]} />
          })}
          {actions}
          <button type="button" onClick={this.end}>End Game</button>
        </div>
      )
    } else if (this.state.gameState === 1) {
      let message = this.state.gameOver ? 'Game over' : 'Choose your wager';

      screen = (
        <div>
          <h2>Your cash: ${this.state.playerCash}</h2>
          <h2>{message}</h2>
          <button type="button" disabled={this.state.playerCash < 100} onClick={this.onWage} value={100}>100</button>
          <button type="button" disabled={this.state.playerCash < 50} onClick={this.onWage} value={50}>50</button>
          <button type="button" disabled={this.state.playerCash < 20} onClick={this.onWage} value={20}>20</button>
          <button type="button" disabled={this.state.playerCash < 10} onClick={this.onWage} value={10}>10</button>
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

  componentDidUpdate() {
    if (this.state.evalHand) {
      this.evalHand(this.state.activeHand);
    }
  }

  start = () => {
    this.setState({
      playerCash: 1000,
      gameState: 1,
      gameOver: false
    });
  }

  end = () => {
    this.setState({
      playerCash: 1000,
      gameState: 0
    });
  }

  onWage = (event) => {
    this.newRound(parseInt(event.target.value, 10));
  }

  onAction = (event) => {
    this.doAction(event.target.value);
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

  newRound = (wager) => {
    let deck = this.newDeck();
    let dealerHand = {
      handId: 0,
      cards: [deck.pop()]
    };
    let playerHand = {
      handId: 1,
      cards: [deck.pop(), deck.pop()]
    };

    this.setState((state) => {
      return {
        deck,
        wager,
        playerCash: state.playerCash - wager,
        allHands: [dealerHand, playerHand],
        gameState: 2,
        activeHand: 1,
        handValues: [this.calcValue(dealerHand.cards)[0], this.calcValue(playerHand.cards)[0]],
        evalHand: true,
        evalRes: -1,
        canSplit: false,
        hasSplit: false,
        canDouble: false,
        canForfeit: false,
        payout: -1
      }
    });
  }

  calcValue = (cards) => {
    let hasAce = false;
    let total = 0;

    for (let i = 0; i < cards.length; ++i) {
      let card = cards[i];
      if (card.rank === 'A') {
        hasAce = true;
        ++total;
      } else {
        total += parseInt(card.rank, 10) ? parseInt(card.rank, 10) : 10;
      }
    }

    return (total < 12 && hasAce) ? [total + 10, true] : [total, false];
  }

  willDealerStand = (cards) => {
    let playerValues = this.state.handValues.slice(1, this.state.handValues.length);
    if (playerValues.filter((value) => value <= 21).length === 0) {
      return true;
    }

    let value = this.calcValue(cards);
    return value[0] > 17 || (value[0] === 17 && !value[1]);
  }

  getNextHand = (activeHand) => {
    return activeHand === 1 ? this.state.allHands[2] ? 2 : 0 : 0;
  }

  evalHand = (activeHand) => {
    let value = this.state.handValues[activeHand];
    let cards = this.state.allHands[activeHand].cards;
    if (activeHand === 0) {
      if (this.willDealerStand(cards)) {
        this.roundOver();
      } else {
        this.drawAction(0);
      }
    } else {
      let canSplit = false;
      let canDouble = false;
      let canForfeit = false;

      if (value >= 21) {
        this.setState({
          activeHand: this.getNextHand(activeHand),
          evalHand: true
        });
        return;
      }
      if (activeHand === 1) {
        let hasCash = this.state.playerCash >= this.state.wager;
        if (cards.length === 2 && !this.state.hasSplit) {
          canForfeit = true;
          if (cards[0].rank === cards[1].rank && hasCash) {
            canSplit = true;
          }
        }
        if (hasCash && !this.state.hasSplit) {
          canDouble = true;
        }
      }

      // Wait for player action
      this.setState({
        evalHand: false,
        canDouble,
        canSplit,
        canForfeit
      });
    }
  }

  doAction = (action) => {
    console.log('Player action: ' + action);
    let activeHand = this.state.activeHand;
    switch (action) {
      case 'hit':
        this.drawAction(activeHand);
        break;
      case 'split':
        this.splitAction(activeHand);
        break;
      case 'double':
        this.drawAction(activeHand, true);
        break;
      case 'stand':
        this.setState({
          activeHand: this.getNextHand(activeHand),
          evalHand: true
        });
        break;
      case 'forfeit':
        this.roundOver(true);
        break;
      default:
        break;
    }
  }

  drawAction = (activeHand, commit) => {
    let deck = this.state.deck;
    let cards = this.state.allHands[activeHand].cards.concat(deck.pop());
    let newHand = {
      handId: activeHand,
      cards: cards
    }
    let allHands = this.state.allHands;
    let handValues = this.state.handValues;
    allHands[activeHand] = newHand;
    handValues[activeHand] = this.calcValue(cards)[0];

    this.setState({
      playerCash: commit ? this.state.playerCash - this.state.wager : this.state.playerCash,
      wager: commit ? this.state.wager * 2 : this.state.wager,
      activeHand: commit ? 0 : activeHand,
      deck,
      allHands,
      handValues,
      evalHand: true
    });
  }

  splitAction = (activeHand) => {
    let deck = this.state.deck;
    let allHands = this.state.allHands;
    let handValues = this.state.handValues;
    let srcCards = allHands[activeHand].cards.slice(0, 1);
    let newCards = allHands[activeHand].cards.slice(1, 2);
    srcCards.push(deck.pop());
    newCards.push(deck.pop());
    handValues[activeHand] = this.calcValue(srcCards)[0];
    handValues[activeHand + 1] = this.calcValue(newCards)[0];

    allHands[activeHand] = {
      handId: activeHand,
      cards: srcCards
    };
    allHands[activeHand + 1] = {
      handId: activeHand + 1,
      cards: newCards
    };

    this.setState({
      playerCash: this.state.playerCash - this.state.wager,
      deck,
      allHands,
      activeHand,
      handValues,
      hasSplit: true,
      evalHand: true
    });
  }

  roundOver = (forfeit) => {
    let playerCash = this.state.playerCash;
    let wager = this.state.wager;
    let payout = 0;
    let evalRes = -1;
    if (forfeit) {
      payout += parseInt(wager / 2, 10);
      playerCash += parseInt(wager / 2, 10);
      evalRes = 0;
    } else {
      evalRes = 1;
      for (let i = 1; i < this.state.allHands.length; ++i) {
        let ratio = this.dealerWillPay(i);
        let pay = parseInt(wager * ratio, 10);
        // Update hand status
        payout += pay;
        playerCash += pay;
      }
    }

    this.setState({
      playerCash,
      evalHand: false,
      evalRes,
      payout
    })
  }

  dealerWillPay = (handId) => {
    let dealerValue = this.state.handValues[0];
    let dealerBj = dealerValue === 21 && this.state.allHands[0].cards.length === 2;
    let dealerBust = dealerValue > 21;
    let playerValue = this.state.handValues[handId];
    let playerBj = playerValue === 21 && this.state.allHands[handId].cards.length === 2;
    let playerBust = playerValue > 21;

    if (playerBust) {
      return 0;
    } else if (dealerBust) {
      return playerBj ? 2.5 : 2;
    } else if (dealerBj) {
      return playerBj ? 1 : 0;
    } else if (playerBj) {
      return 2.5;
    } else {
      return dealerValue > playerValue ? 0 : dealerValue === playerValue ? 1 : 2;
    }
  }

  evalGame = () => {
    this.setState({
      gameState: 1,
      evalRes: -1,
      gameOver: this.state.playerCash < 10
    });
  }
};

export default BlackJack;
