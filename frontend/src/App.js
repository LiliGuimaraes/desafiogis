import React, { Component } from 'react';
import './App.css';

import MyMap from "./MyMap"

class App extends Component {
  render() {
    return (
      <MyMap style={{width: "100%", height: "100%"}}/>
    );
  }
}

export default App;
