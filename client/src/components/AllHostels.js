import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap'

class AllHostels extends Component {
    state = {
        error: '',
        hostels: [],
        hostel: {
            name: "",
            location: "",
            arrival_date: "",
            departure_date: "",
            events: [],
            user: this.props.match.params.userId
        }, 
        oneNewHostel: {
            name: "",
            location: "",
            arrival_date: "",
            departure_date: "",
            events: [],
            user: this.props.match.params.userId
        },
        user: {},
        userId: "",
        redirectToHome: false,
        createdHostel: {}
    }

    deleteUser = () => {
        const userId = this.props.match.params.userId;
        axios.delete(`/api/v1/users/${userId}/`).then(() => {
          this.setState({
              redirectToHome: true,
              isNewFormDisplayed: false
          })
        });
      };

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
            this.setState({hostelId: res.data.hostelId});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    createHostel = () => {
        axios.post("/api/v1/hostels/", this.state.oneNewHostel ).then(() => {
        this.fetchHostels();
        });
      };

      handleNewHostelChange = (e) => {
          let newHost = {...this.state.oneNewHostel}
          newHost[e.target.name] = e.target.value
          this.setState({ oneNewHostel: newHost })
      }


    updateHostel = async (hostel, e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/hostels/${hostel.id}`, this.state.hostel)
            this.setState({
                hostel: res.data,
                isNewFormDisplayed: false
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    toggleNewForm = () => {
        this.setState((state, props) => {
            return {isNewFormDisplayed: !state.isNewFormDisplayed}
        })
    }

    handleSignUp = (e) => {
        e.preventDefault();
        this.createHostel();
      };

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to={`/`} />;
        }
        return (
            <div align="center">
                <div align="left"><Button variant="danger" size="sm" onClick={this.deleteUser}>+ Delete Account</Button></div>
                <div align="left"><button onClick={this.toggleNewForm}>
                    {this.state.isNewFormDisplayed === true ? 'Nah, nvm' : 'Add Hostel'}
                </button></div>
                {
                    this.state.isNewFormDisplayed
                        ?  <form onSubmit={this.handleSignUp}>
                        <div>
                          <label htmlFor="name">Hostel name:</label>
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleNewHostelChange}
                            value={this.state.hostels.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="location">Location:</label>
                          <input
                            type="text"
                            name="location"
                            onChange={this.handleNewHostelChange}
                            value={this.state.hostels.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="arrival_date">Trip Start Date(yyyy/mm/dd):</label>
                          <input
                            type="text"
                            name="arrival_date"
                            onChange={this.handleNewHostelChange}
                            value={this.state.hostels.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="departure_date">Trip End Date(yyyy/mm/dd):</label>
                          <input
                            type="text"
                            name="departure_date"
                            onChange={this.handleNewHostelChange}
                            value={this.state.hostels.name}
                          />
                        </div>
                        <button>Add</button>
                      </form>
                        : null
                }

                <h1 style={{padding: '30px', fontFamily: 'Oswald'}}>{this.state.user.name}'s Upcoming Hostel Trips</h1>
                
                {this.state.hostels.map(hostel => (
                    <div key={hostel.id}>
                        <Card style={{ width: '18rem', height: '15rem', fontFamily: 'Poppins' }}>
                            <Card.Body>
                                <Card.Title><Link to={`/user/${this.state.userId}/hostels/${hostel.id}/`} >{hostel.name}</Link></Card.Title>
                                <Card.Text>
                                    Location: {hostel.location}
                                </Card.Text>
                                <Card.Text>
                                    Arrival Date: {hostel.arrival_date}
                                </Card.Text>
                                <Card.Text>
                                    Departure Date: {hostel.departure_date}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default AllHostels;