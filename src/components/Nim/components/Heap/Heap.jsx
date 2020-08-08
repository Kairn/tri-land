import React, { Component } from 'react';
import './Heap.css';
import PropTypes from 'prop-types';

export default class Heap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingIndex: -1
    }
  }

  render() {
    let rocks = [];
    let pi = this.state.pendingIndex;
    let gi = this.props.goingIndex;

    for (let i = 0; i < this.props.count; ++i) {
      rocks.push(
        <span
          className={"rock" + (pi > -1 && i >= pi ? " pending" : "") + (gi > -1 && i >= gi ? " going" : "")}
          key={i} data-heap={this.props.id}
          data-id={i}
          onClick={this.doRemove}
          onMouseEnter={this.doHover}
          onMouseLeave={this.doLeave}
        ></span>
      );
    }

    return (
      <div
        className={"Heap" + (this.props.isSelected ? " selected" : "") + (this.props.isPlayerTurn ? " player" : "")}
        onClick={this.doSelect}
      >
        <div className="heap-row">
          {rocks}
        </div>
      </div>
    );
  }

  doSelect = () => {
    if (this.props.isPlayerTurn && !this.props.isSelected) {
      this.props.select(this.props.id);
    }
  }

  doHover = (event) => {
    if (this.props.isPlayerTurn && this.props.isSelected) {
      this.setState({
        pendingIndex: parseInt(event.target.getAttribute('data-id'), 10)
      });
    }
  }

  doLeave = () => {
    if (this.props.isSelected) {
      this.setState({
        pendingIndex: -1
      });
    }
  }

  doRemove = (event) => {
    if (this.props.isPlayerTurn && this.props.isSelected) {
      let pi = parseInt(event.target.getAttribute('data-id'), 10);
      if (pi === 0) {
        // Remove the heap
        this.props.die(this.props.id);
      } else {
        // Remove some rocks
        this.setState({
          pendingIndex: -1
        });
        this.props.nim(this.props.id, pi);
      }
    }
  }
};

Heap.prototypes = {
  id: PropTypes.number,
  count: PropTypes.number,
  isPlayerTurn: PropTypes.bool,
  isSelected: PropTypes.bool,
  goingIndex: PropTypes.number,
  select: PropTypes.func,
  nim: PropTypes.func,
  die: PropTypes.func
};
