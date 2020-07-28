import React, { Component } from 'react';
import './Heap.css';
import PropTypes from 'prop-types';

export default class Heap extends Component {
  render() {
    let rocks = [];
    for (let i = 0; i < this.props.count; ++i) {
      rocks.push(<span className="rock" key={i} data-heap={this.props.id} data-id={i} onClick={this.doRemove}>{i}</span>);
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

  doRemove = (event) => {
    // 
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
