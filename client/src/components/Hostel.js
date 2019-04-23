import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

class Hostel extends Component {
    state = {
        hostel: {},
        hostels: [],
        redirectToHome: false,
        // isUpdateFormDisplayed: false,
    }
    componentDidMount() {
        const hostelId = this.props.match.params.hostelId
        this.getHostel(hostelId)
    }

    getHostel = async (hostelId) => {
        try {
            const res = await axios.get(`/api/v1/hostels/${hostelId}/`)
            this.setState({
                hostel: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteHostel = () => {
        const hostelId = this.props.match.params.hostelId;
        axios.delete(`/api/v1/hostels/${hostelId}/`).then(() => {
          this.setState({
              redirectToHome: true,
          })
        });
      };

      updateHostel =  async (e, userId) => {
          e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/user/${this.props.match.params.userId}/hostels/${this.props.match.params.hostelId}/`, this.state.hostel)
            this.setState({
                hostel: res.data,
            })
        } catch (err) {
            console.log(err)
        }
      }

      toggleHostelForm = () => {
          this.setState((state, props) => {
              return ({
                  isHostelFormDisplayed: !state.isHostelFormDisplayed
              })
          })

      }

      handleHostelChange = (e) => {
          const cloneNewHostel = {...this.state.hostel}
          cloneNewHostel[e.target.name] = e.target.value
          this.setState({
              hostel: cloneNewHostel
          })
      }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to={`/user/${this.props.match.params.userId}/hostels/`} />;
            }
        return (
            <div align="center">
                            <div><Button variant="danger" size="sm" onClick={this.deleteHostel}>+ Delete Trip</Button></div>
                            <h1 style={{padding: '30px'}}>Trip Details:</h1>

                            <Card style={{ width: '18rem', height: '15rem' }}>
                            <Card.Body>
                                <Card.Title>{this.state.hostel.name}</Card.Title>
                                <Card.Text>
                                    Location: {this.state.hostel.location}
                                </Card.Text>
                                <Card.Text>
                                    Arrival Date: {this.state.hostel.arrival_date}
                                </Card.Text>
                                <Card.Text>
                                    Departure Date: {this.state.hostel.departure_date}
                                </Card.Text>
                                <Card.Text>
                                <Link to={`/user/${this.props.match.params.userId}/hostels/${this.props.match.params.hostelId}/events`}>View Upcoming Events!</Link>
                                </Card.Text>
                            </Card.Body>
                            </Card>

                {
                     <form onSubmit={this.updateHostel}>
                        <div>
                          <label htmlFor="name">Hostel name:</label>
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleHostelChange}
                            value={this.state.hostel.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="location">Location:</label>
                          <input
                            type="text"
                            name="location"
                            onChange={this.handleHostelChange}
                            value={this.state.hostel.location}
                          />
                        </div>
                        <div>
                          <label htmlFor="arrival_date">Trip Start Date:</label>
                          <input
                            type="text"
                            name="arrival_date"
                            onChange={this.handleHostelChange}
                            value={this.state.hostel.arrival_date}
                          />
                        </div>
                        <div>
                          <label htmlFor="departure_date">Trip End Date:</label>
                          <input
                            type="text"
                            name="departure_date"
                            onChange={this.handleHostelChange}
                            value={this.state.hostel.departure_date}
                          />
                        </div>
                        <button>Update Trip Details</button>
                      </form>
                }

            </div>
        );
    }
}

export default Hostel;