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
      heapMap: {},
      activePlayer: -1,
      winner: -1
    }
  }

  render() {
    return (
      <div className="Board">
        <h1>This is a Nim board.</h1>
        <div id="board-main-panel">
          {this.state.allHeaps.map((heap) => {
            return <Heap key={heap.id} id={heap.id} count={heap.count} isSelected={heap.isSelected} select={this.selectHeap} />;
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
    // 
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
};

Board.prototypes = {
  style: PropTypes.number,
  mode: PropTypes.number,
  level: PropTypes.number
};
