import React, {Component} from 'react';
import axios from 'axios';

class AllEvents extends Component {
    state = {
        error: '',
        events: [],
        event: {
            name: "",
            date: "",
            time: "",
            description: "",
        }, 
        user: {},
        userId: "",
        hostel: {},
        hostelId: ""
    }

    componentDidMount(){
        this.fetchEvents();
    }

    fetchEvents = async () => {
        try {
            const userId = this.props.match.params.userId;
            const hostelId = this.props.match.params.hostelId;
            const res = await axios.get(`/api/v1/users/${userId}/hostel/${hostelId}`);
            this.setState({user: res.data});
            this.setState({userId: this.props.match.params.userId});
            this.setState({hostels: res.data.hostels});
            this.setState({hostel: res.data.hostel});
            this.setState({events: res.data.events});
            this.setState({event: res.data.event});
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
            <div align="center">
                <h1>Hostel Events</h1>
                {/* {this.state.events.map(event => (
                    <div key={event.id}>
                        <h1>{event.name}</h1>
                    </div>
                ))} */}
            </div>
        );
    }
}


export default AllEvents;
