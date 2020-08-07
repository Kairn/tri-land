import React, { Component } from 'react';
import './TechTalk.css';
import { Link } from 'react-router-dom';
import { OpinionForm } from './components';

import bkIcon from '../../assets/back.svg';

export default class TechTalk extends Component {
  render() {
    return (
      <div className="TechTalk">
        <header className="header-sect">
          <h1>Your Opinions Matter</h1>
        </header>
        <OpinionForm />
        <aside className="back-sect">
          <Link className="back-btn" to="/">
            <img src={bkIcon} alt="back" />
          </Link>
        </aside>
      </div>
    );
  }
};
