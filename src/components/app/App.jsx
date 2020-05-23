import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BlackJack from '../BlackJack';
import Nim from '../Nim';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Tri Land reacts!</h1>
        <h1>Tri Header</h1>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/blackjack' component={BlackJack} />
          <Route path='/nim' component={Nim} />
        </Switch>
        <h1>Tri Footer</h1>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="Home">
      <h1>Tri Home</h1>
      <ul>
        <li>
          <Link to="/blackjack">Black Jack</Link>
        </li>
        <li>
          <Link to="/nim">Nim Game</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
