import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Container/Navbar/Navbar';
import Home from './Components/Container/Home/Home'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
