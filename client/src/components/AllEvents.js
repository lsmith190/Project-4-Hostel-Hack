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
        hostel: {},
        hostelId: ""
    }

    componentDidMount(){
        this.fetchEvents();
    }

    fetchEvents = async () => {
        try {
            const userId = this.props.match.params.userId;
            const hostelId = this.props.match.params.hostelId
            const res = await axios.get(`/api/v1/users/${userId}/hostel/${hostelId}/`);
            this.setState({hostel: res.data});
            this.setState({events: res.data.events});
            this.setState({hostelId: this.props.match.params.hostelId})
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render(props) {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Events</h1>
                {/* {this.state.events.map(event => (
                    <div>
                        <h1>{event.name}</h1>
                    </div>
                ))} */}
            </div>
        );
    }
}

export default AllEvents;

// class AllEvents extends Component {

//     state = {
//             hostels: {},
//             events: [],
//     }

//     componentDidMount() {
//         const hostelId = this.props.match.params.id;

//         this.fetchHostel(hostelId)
//     }

//     fetchHostel = async (hostelId) => {
//         try {
//             const userId = this.props.match.params.userId;
//             const hostelId = this.props.match.params.hostelId;
//             const hostelResponse = await axios.get(`/api/v1/user/${userId}/hostels/${hostelId}/`)
//             this.setState({
//                 hostels: hostelResponse.data,
//                 events: hostelResponse.data.events,
//             })
//         }
//         catch (error) {
//             console.log(error)
//             this.setState({error: error.message})
//         }
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.events.map(event => (
//                     <div key={event.id}>
//                         <h3>{event.name}</h3>
//                         <p>{event.description}</p>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }

// export default AllEvents;