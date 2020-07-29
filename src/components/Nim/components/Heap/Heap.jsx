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

    for (let i = 0; i < this.props.count; ++i) {
      rocks.push(
        <span
          className={"rock" + (pi > -1 && i >= pi ? " pending" : "")}
          key={i} data-heap={this.props.id}
          data-id={i}
          onClick={this.doRemove}
          onMouseEnter={this.doHover}
          onMouseLeave={this.doLeave}
        >{i}</span>
      );
    }

    return (
      <div className={"Heap" + (this.props.isSelected ? " selected" : "")} onClick={this.doSelect}>
        <h2>This is a heap of size {this.props.count}.</h2>
        <div className="heap-row">
          {rocks}
        </div>
      </div>
    );
  }

  doSelect = () => {
    if (!this.props.isSelected) {
      this.props.select(this.props.id);
    }
  }

  doHover = (event) => {
    if (this.props.isSelected) {
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
    let pi = parseInt(event.target.getAttribute('data-id'), 10);
    if (this.props.isSelected) {
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
  isSelected: PropTypes.bool,
  select: PropTypes.func,
  nim: PropTypes.func,
  die: PropTypes.func
};
