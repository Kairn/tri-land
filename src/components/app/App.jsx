import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { BlackJack } from '../BlackJack';
import { Nim } from '../Nim';
import { TechTalk } from '../TechTalk';

// Asset import
import bjIcon from '../../assets/blackjack.svg';
import nimIcon from '../../assets/nim.svg';
import ghIcon from '../../assets/github.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/blackjack' component={BlackJack} />
          <Route path='/nim' component={Nim} />
          <Route path='/tecktalk' component={TechTalk} />
        </Switch>
        <div id="footer">
          <div id="ft-box">
            <a href="https://github.com/Kairn/tri-land" target="_blank" rel="noopener noreferrer"><img src={ghIcon} alt="github" /></a>
            <i>Designed by: Eddy Soma</i>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="Home">
      <div id="title" className="font-coug">
        <h1 id="tl-title">Tri Land</h1>
        <h1>A Reactive Experience</h1>
      </div>
      <div id="home-main">
        <div id="fb-1" className="feature-box">
          <h2 className="feature-title">Blackjack</h2>
          <img className="feature-icon" src={bjIcon} alt="blackjack" />
          <p>Feeling lucky? Let's see how much can you win!</p>
          <Link className="feature-btn" to="/blackjack">Play</Link>
        </div>
        <div id="fb-2" className="feature-box">
          <h2 className="feature-title">Nim Game</h2>
          <img className="feature-icon" src={nimIcon} alt="nim" />
          <p>Feeling smart? Let's see how quickly can you think!</p>
          <Link className="feature-btn" to="/nim">Play</Link>
        </div>
      </div>
      <div id="feedback">
        <Link id="tt-btn" to="/tecktalk">Tech Talk</Link>
      </div>
    </div>
  );
}

export default App;
