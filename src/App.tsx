import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRoutes } from './AppRoutes';
import { ReactNotifications } from 'react-notifications-component'

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <AppRoutes />
    </div>
  );
}

export default App;
