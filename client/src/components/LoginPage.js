import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';

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

          <Form className="loginform" onSubmit={this.handleSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>What is your name?</Form.Label>
              <Form.Control type="text" name="name" placeholder="" onChange={this.handleChange} value={this.state.user.name} />
              <Form.Text className="text-muted">
                Your hassle-free hostel experience awaits!
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.createUser}>
              Join
            </Button>
          </Form>
          </div>
      );
    }
  }
  
  export default LogInPage;