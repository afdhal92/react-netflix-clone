import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Landing_page from './modules/landing_page/Landing_page';
import Dashboard from './modules/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={props => <Landing_page />} />
          <Route exact path="/dashboard" render={props => <Dashboard />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
