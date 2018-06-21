import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "./actions";

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
                <div className="eventList">
                    {this.props.events &&
                        this.props.events.map(events => {
                            return (
                                <div className="eachEvent" key={events.id}>
                                    Event: {events.name} by: {events.artist} in:{" "}
                                    {events.city} on: {events.dates}
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
