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
        const hostelId= this.props.match.params.hostelId
        this.fetchEvents(hostelId);
    }

    fetchEvents = async (hostelId) => {
        try {
            const userId = this.props.match.params.userId;
            const hostelId = this.props.match.params.hostelId;
            const res = await axios.get(`/api/v1/users/${userId}/hostel/${hostelId}`);
            this.setState({user: res.data,
                            userId: this.props.match.params.userId,
                            hostels: res.data.hostels,
                            hostel: res.data.hostel,
                            events: res.data.events,
                            event: res.data.event
                    }
                        )
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
                {console.log(this.state.events)}
                {this.state.events.map(event => (
                    <div key={event.id}>
                        <p>{event.name}</p>
                    </div>
                ))}
            </div>
        );
    }
}


export default AllEvents;
