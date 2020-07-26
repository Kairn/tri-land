import React, { Component } from 'react';
import './Heap.css';
import PropTypes from 'prop-types';

export default class Heap extends Component {
  render() {
    return (
      <div className="Heap">
        <h2>This is a heap of size {this.props.count}.</h2>
      </div>
    );
  }
};

Heap.prototypes = {
  id: PropTypes.number,
  count: PropTypes.number,
  nim: PropTypes.func,
  die: PropTypes.func
};
