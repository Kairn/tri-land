import React, { Component } from 'react';
import './Nim.css';
import { Link } from 'react-router-dom';
import { Board } from './components';

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
          <h2>Playing Nim game</h2>
          <Board style={style} mode={mode} level={level} />
          <button type="button" onClick={this.leaveBoard}>Leave</button>
        </div>
      );
    } else {
      screen = (
        <div>
          <h2>Welcome to Nim game</h2>
          <h2>Choose your game options</h2>
          <div id="nim-options">
            <h3>Game Style:</h3>
            <div className="nim-op">
              <button type="button" className={this.state ? "active-op" : ""} disabled={style === 1} onClick={this.setOption} value="S-1">Normal</button>
              <button type="button" className={this.state ? "active-op" : ""} disabled={style === 2} onClick={this.setOption} value="S-2">Misère</button>
            </div>
            <h3>Game Mode:</h3>
            <div className="nim-op">
              <button type="button" className={this.state ? "active-op" : ""} disabled={mode === 1} onClick={this.setOption} value="M-1">Versus AI</button>
              <button type="button" className={this.state ? "active-op" : ""} disabled={mode === 2} onClick={this.setOption} value="M-2">Versus Player</button>
            </div>
            <h3>Game Level:</h3>
            <div className="nim-op">
              <button type="button" className={this.state ? "active-op" : ""} disabled={level === 1} onClick={this.setOption} value="L-1">Simple</button>
              <button type="button" className={this.state ? "active-op" : ""} disabled={level === 2} onClick={this.setOption} value="L-2">Complex</button>
            </div>
          </div>
          <button type="button" disabled={!this.isReady()} onClick={this.startGame}>Start</button>
          <Link to="/">Quit</Link>
        </div>
      );
    }

    return (
      <div className="Nim">
        <h1>Nim reacts!</h1>
        <h2>Nim Rules.</h2>
        {screen}
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
