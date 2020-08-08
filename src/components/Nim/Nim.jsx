import React, { Component } from 'react';
import './Nim.css';
import { Link } from 'react-router-dom';
import { Board } from './components';

import bkIcon from '../../assets/back.svg';
import stIcon from '../../assets/start.svg';

export class Nim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      gameStyle: 0,
      gameMode: 0,
      gameLevel: 0
    };
  }

  render() {
    let screen;
    let style = this.state.gameStyle;
    let mode = this.state.gameMode;
    let level = this.state.gameLevel;

    if (this.state.gameState === 1) {
      screen = (
        <div>
          <Board style={style} mode={mode} level={level} />
        </div>
      );
    } else {
      screen = (
        <div id="nim-op-screen">
          <ul id="nim-rule-sect">
            <h2>Rules</h2>
            <li className="nim-rule">1. Players take turns removing objects (rocks) from distinct piles.</li>
            <li className="nim-rule">2. A player must remove at least one object, and may remove any number of objects provided they all come from the same pile.</li>
            <li className="nim-rule">3. The player who takes the last object wins (or loses in Misère) the game.</li>
            <li className="nim-rule">4. AI will always lose if the player makes optimal moves, but it will win otherwise.</li>
          </ul>
          <div id="nim-options">
            <h3>Choose Game Style</h3>
            <div className="nim-op">
              <button type="button" className={this.state.gameStyle === 1 ? "active-op" : ""} disabled={style === 1} onClick={this.setOption} value="S-1">Normal</button>
              <button type="button" className={this.state.gameStyle === 2 ? "active-op" : ""} disabled={style === 2} onClick={this.setOption} value="S-2">Misère</button>
            </div>
            <h3>Choose Game Mode</h3>
            <div className="nim-op">
              <button type="button" className={this.state.gameMode === 1 ? "active-op" : ""} disabled={mode === 1} onClick={this.setOption} value="M-1">Versus AI</button>
              <button type="button" className={this.state.gameMode === 2 ? "active-op" : ""} disabled={mode === 2} onClick={this.setOption} value="M-2">Versus Player</button>
            </div>
            <h3>Choose Game Level</h3>
            <div className="nim-op">
              <button type="button" className={this.state.gameLevel === 1 ? "active-op" : ""} disabled={level === 1} onClick={this.setOption} value="L-1">Simple</button>
              <button type="button" className={this.state.gameLevel === 2 ? "active-op" : ""} disabled={level === 2} onClick={this.setOption} value="L-2">Complex</button>
            </div>
          </div>
          <div id="nim-start">
            <button type="button" className={this.isReady() ? "" : "not-ready"} disabled={!this.isReady()} onClick={this.startGame}>
              <span>Start</span>
              <img src={stIcon} alt="start" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="Nim">
        <header className="header-sect">
          <h1>Welcome to Nim</h1>
        </header>
        {screen}
        <Link className="back-btn" to="/">
          <img src={bkIcon} alt="back" />
        </Link>
      </div>
    );
  }

  isReady = () => {
    return this.state.gameStyle && this.state.gameMode && this.state.gameLevel;
  }

  setOption = (event) => {
    const values = event.target.value ? event.target.value.split('-') : null;
    if (values) {
      let gameStyle = this.state.gameStyle;
      let gameMode = this.state.gameMode;
      let gameLevel = this.state.gameLevel;

      let o = values[0];
      let v = values[1];
      if (o === 'S') {
        gameStyle = v === '1' ? 1 : 2;
      } else if (o === 'M') {
        gameMode = v === '1' ? 1 : 2;
      } else {
        gameLevel = v === '1' ? 1 : 2;
      }

      this.setState({
        gameStyle,
        gameMode,
        gameLevel
      });
    }
  }

  startGame = () => {
    this.setState({
      gameState: 1
    });
  }

  leaveBoard = () => {
    this.setState({
      gameState: 0,
      gameStyle: 0,
      gameMode: 0,
      gameLevel: 0
    });
  }
};

export default Nim;
