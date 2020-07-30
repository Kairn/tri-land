import React, { Component } from 'react';
import './Board.css';
import { Heap } from '../Heap';
import PropTypes from 'prop-types';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heapVals: [],
      allHeaps: [],
      activePlayer: -1,
      winner: -1
    }
  }

  render() {
    let player = this.state.activePlayer === 1 ? 'Player 1' : this.state.activePlayer === 0 ? 'Computer' : 'Player 2';

    return (
      <div className="Board">
        <h1>This is a Nim board.</h1>
        <h2>{player}'s Turn</h2>
        <div id="board-main-panel">
          {this.state.allHeaps.map((heap) => {
            return (
              <Heap
                key={heap.id}
                id={heap.id}
                count={heap.count}
                isPlayerTurn={this.state.activePlayer !== 0}
                isSelected={heap.isSelected}
                select={this.selectHeap}
                nim={this.nimHeap}
                die={this.removeHeap}
              />
            );
          })}
        </div>
        <div id="nim-res">
          <button type="button" onClick={this.resetBoard}>Restart</button>
          <button type="button" onClick={this.initBoard}>Reroll</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initBoard();
  }

  initBoard = () => {
    let heapVals = [];
    if (this.props.level === 1) {
      const count = 3;
      for (let i = 0; i < count; ++i) {
        heapVals.push(5);
      }
    } else {
      const count = 7;
      for (let i = 0; i < count; ++i) {
        heapVals.push(9);
      }
    }

    let allHeaps = heapVals.map((c, i) => {
      return {
        id: i,
        count: c,
        isSelected: false
      };
    });

    this.setState({
      heapVals,
      allHeaps,
      activePlayer: 1,
      winner: -1
    });
  }

  resetBoard = () => {
    this.setState({
      allHeaps: this.state.heapVals.map((v, i) => {
        return {
          id: i,
          count: v,
          isSelected: false
        };
      }),
      activePlayer: 1
    });
  }

  getNextPlayer = () => {
    let ap = this.state.activePlayer;
    return ap === 1 ? this.props.mode === 1 ? 0 : 2 : 1;
  }

  selectHeap = (heapId) => {
    this.setState({
      allHeaps: this.state.allHeaps.map((heap) => {
        return {
          id: heap.id,
          count: heap.count,
          isSelected: heap.id === heapId
        };
      })
    });
  }

  nimHeap = (heapId, count) => {
    this.setState({
      allHeaps: this.state.allHeaps.map((heap) => {
        return {
          id: heap.id,
          count: heap.id === heapId ? count : heap.count,
          isSelected: false
        };
      }),
      activePlayer: this.getNextPlayer()
    });
  }

  removeHeap = (heapId) => {
    this.setState({
      allHeaps: this.state.allHeaps.filter((heap) => {
        return heap.id !== heapId;
      }),
      activePlayer: this.getNextPlayer()
    });
  }
};

Board.prototypes = {
  style: PropTypes.number,
  mode: PropTypes.number,
  level: PropTypes.number
};
