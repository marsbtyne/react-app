/*global document, window, alert, console, require*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">

        
        <label className="custom-file-upload btn btn-default btn-lg"><input type="file" size ="200" id="file-input" />Upload a CSV file
        </label>
        <div id="file-content">
        </div>
      </div>
    );
  }
}

export default App;
