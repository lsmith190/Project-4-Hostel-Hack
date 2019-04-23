import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import LoginPage from './components/LoginPage.js'
import AllHostels from './components/AllHostels.js'
import AllEvents from './components/AllEvents.js'
import Hostel from './components/Hostel.js'

class App extends Component {
  render() {
    return (
       <Router>
         <div>

            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav>
              </Navbar>
            

         <Switch>
           <Route exact path="/" component={LoginPage} />
           <Route exact path="/user/:userId/hostels/" component={AllHostels} />
           <Route exact path="/user/:userId/hostels/:hostelId/" component={Hostel} />
           <Route exact path="/user/:userId/hostels/:hostelId/events/" component={AllEvents} />
         </Switch>
         </div>
       </Router>
    );
  }
}

export default App;
