/*global document, window, alert, console, require*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello world!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
        <input type="file" id="file-input" />
        <div id="file-content"><div id="over-30"><h2>People Over 30</h2>
        </div></div>


        
      </div>
    );
  }
}

export default App;
