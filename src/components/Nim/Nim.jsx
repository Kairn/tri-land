import React, { Component } from 'react';
import './Nim.css';
import { Link } from 'react-router-dom';
// import { Board } from './components';

export class Nim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      gameStyle: 0,
      gameMode: 0
    };
  }

  render() {
    return (
      <div className="Nim">
        <h1>Nim reacts!</h1>
        <Link to="/">Quit</Link>
      </div>
    );
  }
};

export default Nim;
