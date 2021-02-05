import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import HomePage from './HomePage/HomePage'
import { useState } from 'react';

function App() {
  const [playlistId , setPlaylistId]=useState("")
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
