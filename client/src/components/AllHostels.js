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
            events: [],
            hostelId:""
        }, 
        oneNewHostel: {
            name: "",
            location: "",
            arrival_date: "",
            departure_date: "",
            events: []
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
              isEditFormDisplayed: false
            
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
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

      createHostel = () => {
        const newHost = this.state.oneNewHostel;  
        axios.post("/api/v1/hostels/", newHost).then(res => {
          const newHostels = [...this.state.hostels];
          newHostels.user = this.state.user.userId;
          newHostels.unshift(res.data);  
          this.setState({ hostels: newHostels });
        });
      };

      handleNewHostelChange = (e) => {
          let newHost = {...this.state.oneNewHostel}
          newHost[e.target.name] = e.target.value
          console.log(newHost)
          this.setState({ oneNewHostel: newHost })
      }


    updateHostel = async (hostel, e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/hostels/${hostel.id}`, this.state.hostel)
            this.setState({
                hostel: res.data,
                isEditFormDisplayed: false
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    // handleChange = (e) => {
    //     const clonedHostel = {...this.state.hostel}
    //     clonedHostel[e.target.name] = e.target.value

    //     this.setState({
    //         hostel: clonedHostel
    //     })
    // }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to={`/`} />;
        }
        return (
            <div align="center">
                <div><Button variant="danger" size="lg" onClick={this.deleteUser}>+ Delete Account</Button></div>
                <div><button onClick={this.toggleEditForm}>
                    {this.state.isEditFormDisplayed === true ? 'Nah, nvm' : 'Add Hostel'}
                </button></div>
                {
                    this.state.isEditFormDisplayed
                        ?  <form onSubmit={this.createHostel}>
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
                          <label htmlFor="arrival_date">Trip Start Date:</label>
                          <input
                            type="text"
                            name="arrival_date"
                            onChange={this.handleNewHostelChange}
                            value={this.state.hostels.name}
                          />
                        </div>
                        <div>
                          <label htmlFor="departure_date">Trip End Date:</label>
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

                <h1>{this.state.user.name}'s Upcoming Trips</h1>
                
                {this.state.hostels.map(hostel => (
                    <div key={hostel.id}>
                        <Link to={`/user/${this.state.userId}/hostels/${hostel.id}/events/`} >{hostel.name}</Link>
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