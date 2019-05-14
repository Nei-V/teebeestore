import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Container/Navbar/Navbar';
import Home from './Components/Container/Home/Home'
import Routes from './routes'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {Routes}
        
      </div>
    );
  }
}

export default App;
