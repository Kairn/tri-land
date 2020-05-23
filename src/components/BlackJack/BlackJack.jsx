import React, { Component } from 'react';
import './BlackJack.css';
import { Link } from 'react-router-dom';

export class BlackJack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inGame: false,
      playerCash: 1000
    };
  }

  render() {
    let screen;
    if (this.state.inGame) {
      screen = (
        <div>
          <h2>Playing Black Jack</h2>
          <h2>Your cash: ${this.state.playerCash}</h2>
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
      inGame: true
    });
  }

  end = () => {
    this.setState({
      playerCash: 1000,
      inGame: false
    });
  }
};

export default BlackJack;
