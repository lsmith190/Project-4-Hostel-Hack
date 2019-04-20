import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import LoginPage from './components/LoginPage.js'
import AllHostels from './components/AllHostels.js'
// import NewHostel from './components/NewHostel.js'
import AllEvents from './components/AllEvents.js'
// import NewEvent from './components/NewEvent.js'

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
           <Route exact path="/user/:userId/hostels" component={AllHostels} />
           {/* <Route exact path="/user/:userId/hostels/new" component={NewHostel} /> */}
           <Route exact path="/user/:userId/hostels/:hostelId/events" component={AllEvents} />
           {/* <Route exact path="/user/:userId/hostels/:hostelId/events/new" component={NewEvent} /> */}
         </Switch>
         </div>
       </Router>
    );
  }
}

export default App;
