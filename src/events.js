import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents, eventsByCity } from "./actions";
import Calendar from "./calendar";

class Events extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getAllEvents());
    }
    render() {
        return (
            <div>
                <Link to="/addevent">
                    <div className="addEventButton">+ Add an event</div>
                </Link>
                <div>
                    Select the city youd like to view
                    <select
                        onChange={e => {
                            this.props.dispatch(eventsByCity(e.target.value));
                        }}
                        name="city"
                    >
                        <option>city</option>
                        <option value="Berlin">Berlin</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                    </select>
                </div>
                <div className="eventCalendar">
                    <Calendar />
                </div>
                <div className="eventList">
                    {this.props.events &&
                        this.props.events.map(events => {
                            return (
                                <div className="eachEvent" key={events.id}>
                                    {events.event_date}{" "}
                                    <Link to={`/event/${events.event_id}`}>
                                        Event: {events.name}
                                    </Link>{" "}
                                    by: {events.artist} in: {events.city}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    console.log("REDUX STATE IN EVENTS", state);
    return {
        events: state.events
    };
};

export default connect(getStateFromRedux)(Events);
