import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        userId: ""
    }

    componentDidMount(){
        this.fetchHostels();
    }

    fetchHostels = async () => {
        try {
            const userId = this.props.match.params.userId;
            const res = await axios.get(`/api/v1/users/${userId}/`);
            this.setState({user: res.data});
            this.setState({hostels: res.data.hostels});
            this.setState({hostel: res.data.hostel});
            this.setState({userId: this.props.match.params.userId})
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Hostels</h1>
                {this.state.hostels.map(hostel => (
                    <div key={hostel.id}>
                        <Link to={`/user/${this.state.userId}/hostels/${hostel.id}/events`} >{hostel.name}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default AllHostels;