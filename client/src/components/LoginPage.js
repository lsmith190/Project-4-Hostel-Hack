import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

class LoginPage extends Component {
    state = {
        user: {
            name: ''
        },
        redirect: false
    }

    handleChange = (event) => {
        const attributeName = event.target.name;
        const attributeValue = event.target.value;
        const user = { ...this.state.user };
        user[attributeName] = attributeValue;
        this.setState({ user })
    };

    newUser = () => {
        axios.post('/api/user', { name: this.state.user.name })
            .then(res => {
                this.setState({ redirect: true })
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/"} />
        } else {
            return (
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        <h1 style={{ textAlign: "center" }}>Hostel Hack</h1>
                        <h4 style={{ textAlign: "center" }}>Your hassle-free hostel experience awaits!</h4>
                        <form>
                            <div>
                                <label htmlFor="name">What is your name? </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <Link to={`/user/:userId/hostels`}><input type="submit" value="Join" onClick={this.newUser}/></Link>
                        </form>


                    </div>

            )
        }
    }
}

export default LoginPage;