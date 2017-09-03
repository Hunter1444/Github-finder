import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import SearchBar from './Search-bar';
import UserList from './User-list';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Title/>
        <SearchBar/>
        <UserList/>
      </div>
    );
  }
}

export default App;
