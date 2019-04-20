import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { Container, Jumbotron } from 'react-bootstrap';

class LogInPage extends Component {
    state = {
      users: [],
      user: {
        name: ""
      },
      redirectToHome: false,
      createdUser: {}
    };
  
    componentDidMount = () => {
      this.getAllUsers();
    };
  
    getAllUsers = () => {
      axios.get("/api/v1/users/").then(res => {
        this.setState({ users: res.data });
      });
    };
  
    createUser = () => {
      axios.post("/api/v1/users/", this.state.user ).then(res => {
        this.setState({ redirectToHome: true, createdUser: res.data });
      });
    };
  
    handleChange = e => {
      const newUser = { ...this.state.user };
      newUser[e.target.name] = e.target.value;
      this.setState({ user: newUser });
    };
  
    handleSignUp = (e) => {
      e.preventDefault();
      this.createUser();
    };
  
    render() {
      if (this.state.redirectToHome === true) {
        return <Redirect to={`/user/${this.state.createdUser.id}/hostels`} />;
      }
  
      return (
          <div align="center">
          <Jumbotron fluid className="login" style={{ height: '30rem' }}>
					<Container className="loginfont">
						<h1 style={{ fontSize: '50px', fontWeight: 'bold', color: 'white' }}>HOSTEL HACK</h1>
						<p style={{ fontSize: '20px', color: 'white' }}>Your hassle-free hostel experience awaits!</p>
					</Container>
	    </Jumbotron>
          {this.state.users.map(user => {
            return (
              <div key={user.id}>
                <Link to={`/user/${user.id}/hostels`} key={user.id}>
                  {user.name}
                </Link>
              </div>
            );
          })}
  
          <form onSubmit={this.handleSignUp}>
            <div>
              <label htmlFor="name">What is your name?</label>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.user.name}
              />
            </div>
            <button>Join</button>
          </form>
          </div>
      );
    }
  }
  
  export default LogInPage;