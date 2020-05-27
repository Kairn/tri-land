import React from 'react';
import './TechTalk.css';
import { Link } from 'react-router-dom';
import { OpinionForm } from './components';

export default function TechTalk() {
  return (
    <div className="TechTalk">
      <h1>Tell me what do you think!</h1>
      <OpinionForm />
      <Link to="/">Back</Link>
    </div>
  );
};
