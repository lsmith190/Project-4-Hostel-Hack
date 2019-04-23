import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import { Navbar, Nav, ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';
import InputField from './components/InputField'
import Weather from './components/Weather'
import LoginPage from './components/LoginPage.js'
import AllHostels from './components/AllHostels.js'
import AllEvents from './components/AllEvents.js'
import Hostel from './components/Hostel.js'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
	  name: [],
      weather: [],
      temp: [],
      clouds: []
    };
  }

  getWeather = query => {
    axios.get(`https://api.openweathermap.org/data/2.5/find?q=${query}&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388`)
      .then(response => {
        this.setState({
          weather: response.data.list[0],
          temp: response.data.list[0].main.temp,
          clouds: response.data.list[0].weather[0].description
        });
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  queryWeather = (event, cityName) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      cityName = event.target.value;
      this.getWeather(cityName);
    }
  }
  render() {
    return (
       <Router>
         <div>

            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <InputField queryWeather={this.queryWeather} />
                  <ButtonToolbar style={{ marginRight: '20px' }}>
                    {['left'].map(direction => (
                      <DropdownButton
                        style={{ color: 'black' }}
                        drop={direction}
                        
                        placeholder='x'
                        
                        id={`dropdown-button-drop-${direction}`}
                        key={direction}
                      >
                        <Dropdown.Item
                          style={{
                            marginTop: '15px',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                          }}
                        >
                          <Weather
                            city={this.state.weather.name}
                            temp={this.state.temp}
                            clouds={this.state.clouds}
                          />
                        </Dropdown.Item>
                      </DropdownButton>
              ))}
            </ButtonToolbar>
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
