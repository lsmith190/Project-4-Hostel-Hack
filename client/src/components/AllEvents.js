import React, {Component} from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'

class AllEvents extends Component {
    state = {
        error: '',
        events: [],
        event: {
            name: "",
            date: "",
            time: "",
            description: "",
            eventId: ""
        },
        oneNewEvent: {
            name: "",
            date: "",
            time: "",
            description: "",
            hostel: this.props.match.params.hostelId
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
      const hostelId = this.props.match.params.hostelId;
        this.fetchEvents(hostelId);
    }

    fetchEvents = async () => {
        try {
            const hostelId = this.props.match.params.hostelId;
            const res = await axios.get(`/api/v1/hostels/${hostelId}/`);
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
      axios.post("/api/v1/events/", this.state.oneNewEvent ).then(() => {
      this.fetchEvents();
      });
    };

    handleNewEventChange = (e) => {
        let newEv = {...this.state.oneNewEvent}
        newEv[e.target.name] = e.target.value
        this.setState({ oneNewEvent: newEv })
    }

    toggleNewForm = () => {
        this.setState((state, props) => {
            return {isNewFormDisplayed: !state.isNewFormDisplayed}
        })
    }

    handleSignUp = (e) => {
      e.preventDefault();
      this.createEvent();
    };

    deleteEvent = (event, eventId) => {
      event.preventDefault()
      axios.delete(`/api/v1/events/${eventId}/`).then(() => {
        this.fetchEvents();
      });
    };

    render() {
      if (this.state.redirectToHome === true) {
        return <Redirect to={`/user/${this.state.userId}/hostels/`} />;
        }
        return (
            <div align="center">
            <div><button onClick={this.toggleNewForm}>
                    {this.state.isNewFormDisplayed === true ? 'Nah, nvm' : 'Add Event'}
                </button></div>
                {
                    this.state.isNewFormDisplayed
                        ?  <form onSubmit={this.handleSignUp}>
                        <div>
                          <label htmlFor="name">Event name:</label>
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleNewEventChange}
                            value={this.state.events.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="date">Date:</label>
                          <input
                            type="date"
                            name="date"
                            onChange={this.handleNewEventChange}
                            value={this.state.events.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="time">Time:</label>
                          <input
                            type="time"
                            name="time"
                            onChange={this.handleNewEventChange}
                            value={this.state.events.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="description">Description:</label>
                          <input
                            type="text"
                            name="description"
                            onChange={this.handleNewEventChange}
                            value={this.state.events.name}
                          />
                        </div>
                        <button>Add</button>
                      </form>
                        : null
                }
                <div align="left"><Link to={`/user/${this.props.match.params.userId}/hostels/${this.props.match.params.hostelId}`} >BACK</Link></div>
                <h1 style={{padding: '30px', fontFamily: 'Oswald'}}>Hostel Events</h1>
                {this.state.events.map(event => (
                    <div key={event.id}>

                          <Card style={{ width: '40rem', height: '25rem', fontFamily: 'Poppins' }}>
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text>
                                    Date: {event.date}
                                </Card.Text>
                                <Card.Text>
                                    Time: {event.time}
                                </Card.Text>
                                <Card.Text>
                                    {event.description}
                                </Card.Text>
                                <Card.Text>
                                    <Button variant="danger" size="lg" onClick={(e) => this.deleteEvent(e, event.id)}>+ Delete Event</Button>
                                </Card.Text>
                            </Card.Body>
                            </Card>
                    </div>
                    
                    
                ))}
            </div>
        );
    }
}


export default AllEvents;
