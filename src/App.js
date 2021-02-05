import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import HomePage from './HomePage/HomePage'

function App() {
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
