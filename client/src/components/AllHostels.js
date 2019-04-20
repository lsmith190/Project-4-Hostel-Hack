import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap'

class AllHostels extends Component {
    state = {
        error: '',
        hostels: [],
        hostel: {
            name: "",
            location: "",
            arrival_date: "",
            departure_date: "",
            events: []
        }, 
        user: {},
        userId: "",
        redirectToHome: false
    }

    componentDidMount(){
        this.fetchHostels();
    }

    fetchHostels = async () => {
        try {
            const userId = this.props.match.params.userId;
            const res = await axios.get(`/api/v1/users/${userId}/`);
            this.setState({user: res.data});
            this.setState({userId: this.props.match.params.userId})
            this.setState({hostels: res.data.hostels});
            this.setState({hostel: res.data.hostel});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    deleteUser = () => {
        const userId = this.props.match.params.userId;
        axios.delete(`/api/v1/users/${userId}/`).then(() => {
          this.setState({
              redirectToHome: true
          })
        });
      };

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to={`/`} />;
        }
        return (
            <div align="center">
                <div><Button variant="danger" size="lg" onClick={this.deleteUser}>+ Delete Account</Button></div>
                <h1>{this.state.user.name}'s Upcoming Trips</h1>
                
                {this.state.hostels.map(hostel => (
                    <div key={hostel.id}>
                        <Link to={`/user/${this.state.userId}/hostels/${hostel.id}/events`} >{hostel.name}</Link>
                        <p>{hostel.location}</p>
                        <p>Arrival Date: {hostel.arrival_date}</p>
                        <p>Departure Date: {hostel.departure_date}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default AllHostels;