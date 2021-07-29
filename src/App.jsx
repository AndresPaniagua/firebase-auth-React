import React from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import Admin from './Components/Admin';
import Inicio from './Components/Inicio';
import Login from './Components/Login';
import Menu from './Components/Menu';

function App() {
  return (
    <div className="container">
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path="/" component={Inicio}></Route>
          <Route path="/Admin" component={Admin}></Route>
          <Route path="/Login" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
