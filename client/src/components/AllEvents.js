import React, {Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

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
        oneNewEvent: {
            name: "",
            date: "",
            time: "",
            description: "",
        }, 
        user: {},
        userId: "",
        hostel: {},
        hostelId: "",
        redirectToHome: false
    }

    deleteHostel = () => {
      const hostelId = this.props.match.params.hostelId;
      axios.delete(`/api/v1/hostels/${hostelId}/`).then(() => {
        this.setState({
            redirectToHome: true,
        })
      });
    };

    componentDidMount(){
        this.fetchEvents();
    }

    fetchEvents = async () => {
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

    createEvent = () => {
        const newEv = this.state.oneNewEvent;  
        axios.post("/api/v1/events/", newEv ).then(res => {
          const newEvents = [...this.state.events];
          newEvents.hostel = this.state.hostel.hostelId;
          newEvents.unshift(res.data);  
          this.setState({ redirectToHome: true, createdEvent: res.data });
        });
      };

    handleNewEventChange = (e) => {
        let newEv = {...this.state.oneNewEvent}
        newEv[e.target.name] = e.target.value
        this.setState({ oneNewEvent: newEv })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    render() {
      if (this.state.redirectToHome === true) {
        return <Redirect to={`/user/${this.state.userId}/hostels/`} />;
        }
        return (
            <div align="center">
            <div><Button variant="danger" size="lg" onClick={this.deleteHostel}>+ Delete Hostel</Button></div>
            <div><button onClick={this.toggleEditForm}>
                    {this.state.isEditFormDisplayed === true ? 'Nah, nvm' : 'Add Event'}
                </button></div>
                {
                    this.state.isEditFormDisplayed
                        ?  <form onSubmit={this.createEvent}>
                        <div>
                          <label htmlFor="name">Event name:</label>
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleNewEventChange}
                            // value={this.state.events.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="date">Date:</label>
                          <input
                            type="date"
                            name="date"
                            onChange={this.handleNewEventChange}
                            // value={this.state.events.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="time">Time:</label>
                          <input
                            type="time"
                            name="time"
                            onChange={this.handleNewEventChange}
                            // value={this.state.events.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="description">Description:</label>
                          <input
                            type="text"
                            name="description"
                            onChange={this.handleNewEventChange}
                            // value={this.state.events.name}
                          />
                        </div>
                        <button>Add</button>
                      </form>
                        : null
                }
                <h1>Hostel Events</h1>
                {/* {this.state.events.map(event => (
                    <div key={event.id}>
                        <p>{event.name}</p>
                    </div>
                ))} */}
            </div>
        );
    }
}


export default AllEvents;
