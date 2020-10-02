import React from 'react';
import About from "./about";
import Poll from "./poll";
import './App.css';

export default function App() {
  // currently loads the 'Poll' page by default
  return (
    <Router>
      <Route path="/" component={Poll} />
    </Router>
  );
}
