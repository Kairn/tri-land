import React, { Component } from 'react';
import './Nim.css';
import { Link } from 'react-router-dom';

export class Nim extends Component {
  render() {
    return (
      <div className="Nim">
        <h1>Nim reacts!</h1>
        <Link to="/">Back</Link>
      </div>
    );
  }
};

export default Nim;
