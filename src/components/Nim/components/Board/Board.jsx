import React, { Component } from 'react';
import './Board.css';
import { Heap } from '../Heap';
import PropTypes from 'prop-types';

import rsIcon from '../../../../assets/restart.svg';
import rrIcon from '../../../../assets/reroll.svg';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heapVals: [],
      allHeaps: [],
      activePlayer: -1,
      winner: -1,
      noUpdate: false
    }
  }

  render() {
    let player = this.state.activePlayer === 1 ? 'Player 1' : this.state.activePlayer === 0 ? 'Computer' : 'Player 2';
    if (this.state.winner === -1 && player) {
      player = `${player}'s Turn`;
    } else {
      player = null;
    }

    let winner = this.state.winner === 1 ? 'Player 1' : this.state.winner === 0 ? 'Computer' : this.state.winner === 2 ? 'Player 2' : null;
    if (winner) {
      winner = `Game over. Winner is ${winner}.`;
    }

    let boardMsg = player ? player : winner;

    return (
      <div className="Board">
        <h2 id="board-msg">{boardMsg}</h2>
        <div id="board-main-panel">
          {this.state.allHeaps.map((heap) => {
            return (
              <Heap
                key={heap.id}
                id={heap.id}
                count={heap.count}
                isPlayerTurn={this.state.activePlayer !== 0}
                isSelected={heap.isSelected}
                goingIndex={heap.goingIndex}
                select={this.selectHeap}
                nim={this.nimHeap}
                die={this.removeHeap}
              />
            );
          })}
        </div>
        <div id="nim-res">
          <button className="nr-btn" type="button" onClick={this.resetBoard}>
            <img src={rsIcon} alt="restart" />
            <span>Restart</span>
          </button>
          <button className="nr-btn" type="button" onClick={this.initBoard}>
            <img src={rrIcon} alt="reroll" />
            <span>Reroll</span>
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initBoard();
  }

  componentDidUpdate() {
    if (this.state.noUpdate) {
      return;
    }

    if (this.state.allHeaps.length === 0 && this.state.winner === -1) {
      // Game over
      if (this.props.style === 1) {
        // Normal
        this.setState({
          winner: this.state.activePlayer === 1 ? this.props.mode === 1 ? 0 : 2 : 1
        });
      } else {
        this.setState({
          winner: this.state.activePlayer === 1 ? 1 : this.props.mode === 1 ? 0 : 2
        });
      }
    } else if (this.state.activePlayer === 0 && this.state.winner === -1) {
      // AI move
      setTimeout(() => {
        this.aiNim();
      }, 1000);
    }
  }

  getRandInt = (min, max) => {
    min = Math.floor(min);
    max = Math.floor(max);
    if (min >= max) {
      return NaN;
    }

    let bound = max - min;
    return min + (Math.round(Math.random() * bound));
  }

  getNimSum = (array) => {
    return array.reduce((prev, cur) => {
      return prev ^ cur;
    }, 0);
  }

  initBoard = () => {
    let heapVals = [];

    // Populate initial heaps
    if (this.props.level === 1) {
      const heapCount = this.getRandInt(3, 5);
      for (let i = 0; i < heapCount; ++i) {
        heapVals.push(this.getRandInt(2, 6));
      }
    } else {
      const heapCount = this.getRandInt(6, 9);
      for (let i = 0; i < heapCount; ++i) {
        heapVals.push(this.getRandInt(3, 10));
      }
    }

    // Adjust when against AI
    // Player is always allowed to win against AI when moves are made appropriately
    if (this.props.mode === 1 && this.getNimSum(heapVals) === 0) {
      let hi = this.getRandInt(0, heapVals.length - 1);
      heapVals[hi] += 1;
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
      activePlayer: 1,
      winner: -1
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
      activePlayer: this.getNextPlayer(),
      noUpdate: false
    });
  }

  removeHeap = (heapId) => {
    this.setState({
      allHeaps: this.state.allHeaps.filter((heap) => {
        return heap.id !== heapId;
      }),
      activePlayer: this.getNextPlayer(),
      noUpdate: false
    });
  }

  aiNim = () => {
    let isDefault = true;
    let heaps = this.state.allHeaps;

    // Passive move
    let heapId = heaps[0].id;
    let goingIndex = heaps[0].count - 1;

    // Check for win condition for misère game
    if (this.props.style === 2) {
      if (heaps.length === 1 && heaps[0].count > 1) {
        heapId = heaps[0].id;
        goingIndex = 1;
        isDefault = false;
      } else if (heaps.length === 2) {
        if (heaps[0].count === 1) {
          heapId = heaps[1].id;
          goingIndex = 0;
          isDefault = false;
        } else if (heaps[1].count === 1) {
          heapId = heaps[0].id;
          goingIndex = 0;
          isDefault = false;
        }
      } else {
        // Look for win position when all heaps except one have only one rock
        let loneCount = 0;
        let moreId = 0;
        for (let heap of heaps) {
          if (heap.count === 1) {
            ++loneCount;
          } else {
            moreId = heap.id;
          }
        }
        if (loneCount === heaps.length - 1) {
          heapId = moreId;
          goingIndex = loneCount % 2 === 0 ? 1 : 0;
          isDefault = false;
        }
      }
    } else {
      // End the game with only one heap left for normal play
      if (heaps.length === 1) {
        heapId = heaps[0].id;
        goingIndex = 0;
        isDefault = false;
      }
    }

    // Use the default behavior
    let nimSum = this.getNimSum(heaps.map((heap) => heap.count));
    if (isDefault && nimSum !== 0) {
      Loop:
      for (let heap of heaps) {
        let count = heap.count;
        let subSum = nimSum ^ count;
        for (let i = 0; i < count; ++i) {
          if ((i ^ subSum) === 0) {
            heapId = heap.id;
            goingIndex = i;
            break Loop;
          }
        }
      }
    }

    // Indicate intention
    this.setState({
      allHeaps: this.state.allHeaps.map((heap) => {
        return {
          id: heap.id,
          count: heap.count,
          isSelected: false,
          goingIndex: heapId === heap.id ? goingIndex : -1
        };
      }),
      noUpdate: true
    });

    // Execution after delay
    setTimeout(() => {
      if (goingIndex === 0) {
        this.removeHeap(heapId);
      } else {
        this.nimHeap(heapId, goingIndex);
      }
    }, 1000);
  }
};

Board.prototypes = {
  style: PropTypes.number,
  mode: PropTypes.number,
  level: PropTypes.number
};
