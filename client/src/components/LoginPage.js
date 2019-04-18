import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

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
      axios.post("/api/v1/users/", { user: this.state.user }).then(res => {
        this.setState({ redirectToHome: true, createdUser: res.data });
      });
    };
  
    handleChange = e => {
      const newUser = { ...this.state.user };
      newUser[e.target.name] = e.target.value;
      this.setState({ user: newUser });
    };
  
    handleSignUp = e => {
      e.preventDefault();
      this.createUser();
    };
    deleteUser = () => {
      const userId = this.props.match.params.userId;
      axios.delete(`/api/v1/user/${userId}/hostels`);
      this.props.history.goBack();
    };
  
    render() {
      if (this.state.redirectToHome === true) {
        return <Redirect to={`/user/${this.state.createdUser._id}/hostels`} />;
      }
  
      return (
          <div>
          <h1>Hostel Hack</h1>
  
          <h2>Your hassle-free hostel experience awaits!</h2>
          {this.state.users.map(user => {
            return (
              <div key={user.id}>
                <Link to={`/user/${user.id}/hostels`} key={user._id}>
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