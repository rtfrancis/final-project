import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents, eventsByCity, getCities } from "./actions";
import Calendar from "./calendar";

class Events extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getAllEvents());
        this.props.dispatch(getCities());
    }
    render() {
        return (
            <div>
                <Link to="/addevent">
                    <div className="addEventButton">+ Add an event</div>
                </Link>
                <div className="citySelect">
                    Select the city you'd like to view:
                    <select
                        onChange={e => {
                            this.props.dispatch(eventsByCity(e.target.value));
                        }}
                        name="city"
                    >
                        {this.props.cities &&
                            this.props.cities.map(city => {
                                return (
                                    <option key={city.city} value={city.city}>
                                        {city.city}
                                    </option>
                                );
                            })}
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
                                    {new Date(events.event_date)
                                        .toUTCString()
                                        .slice(0, 12)}{" "}
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
        events: state.events,
        cities: state.cities
    };
};

export default connect(getStateFromRedux)(Events);
