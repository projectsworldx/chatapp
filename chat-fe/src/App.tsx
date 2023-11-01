import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/login/login';
import Chat from './components/chat/chatbox';




function App() {

  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
