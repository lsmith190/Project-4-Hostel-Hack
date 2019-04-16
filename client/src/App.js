import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import UserList from "./components/UserList";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
                <div className="App">

                    <div>
                        <h1>Hostel Hack</h1>
                        <div>
                            <div><Link to="/">All Users</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={UserList}/>
                      # <Route path="/artist/:id" component={Artist}/>
                    </Switch>
                </div>
            </Router>
    );
  }
}

export default App;
