import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

class Hostel extends Component {
    state = {
        hostel: {},
        hostels: [],
        redirectToHome: false,
        isUpdateFormDisplayed: false,
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
        try {
            const res = await axios.put(`/api/v1/user/${userId}/hostels/`, this.state.hostel)
            this.setState({
                hostel: res.data,
                isHostelFormDisplayed: false,
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
              cloneNewHostel: cloneNewHostel
          })
      }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to={`/user/${this.props.match.params.userId}/hostels/`} />;
            }
        return (
            <div align="center">
                <div>{this.state.hostels.name}</div>
                <div>Location: {this.state.hostels.location}</div>
                <div>Arrival Date: {this.state.hostels.arrival_date}</div>
                <div>Departure Date: {this.state.hostels.departure_date}</div>
                <Link to={`/user/${this.props.match.params.userId}/hostels/${this.props.match.params.hostelId}/events`}>View Upcoming Events!</Link>
                <div><Button variant="danger" size="lg" onClick={this.deleteHostel}>+ Delete Trip</Button></div>
                <div><Button variant="danger" size="lg" onClick={this.toggleHostelForm}>+ Edit Trip</Button></div>

                {
                    this.state.isUpdateFormDisplayed
                        ?  <form onSubmit={this.updateHostel}>
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
                            value={this.state.hostel.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="arrival_date">Trip Start Date:</label>
                          <input
                            type="text"
                            name="arrival_date"
                            onChange={this.handleHostelChange}
                            value={this.state.hostel.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="departure_date">Trip End Date:</label>
                          <input
                            type="text"
                            name="departure_date"
                            onChange={this.handleHostelChange}
                            value={this.state.hostel.name}
                          />
                        </div>
                        <button>Add</button>
                      </form>
                        : null
                }

            </div>
        );
    }
}

export default Hostel;