/*global document, window, alert, console, require*/
import React, { Component } from 'react';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
         <h1 className="App-title">PeopleSorter React App</h1>
         <label className="file-upload btn btn-default btn-lg"><input type="file" size ="200" id="file-input" />Upload a CSV file
        </label>
      </header>
      <div className="container">
        <div id="file-content" className="row">
          <div id="under-30" className="col-md-6">
            <h1>People Under 30</h1>
          </div>
          <div id="over-30" className="col-md-6">
            <h1> People 30 And Over </h1>
          </div>  
        </div>
        </div>
      </div>
    );
  }
}

export default App;
