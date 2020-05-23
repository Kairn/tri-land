import React, { Component } from 'react';
import './BlackJack.css';
import { Link } from 'react-router-dom';

export class BlackJack extends Component {
  render() {
    return (
      <div className="BlackJack">
        <h1>BlackJack reacts!</h1>
        <Link to="/">Back</Link>
      </div>
    );
  }
};

export default BlackJack;
