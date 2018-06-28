import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents, eventsByCity, getCities, loggedInUser } from "./actions";
import Calendar from "./calendar";

class guestEvents extends React.Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        this.props.dispatch(loggedInUser());
    }
    componentDidMount() {
        // this.props.dispatch(getAllEvents());

        this.props.dispatch(getCities());
        this.props.dispatch(eventsByCity(this.props.loggedIn.city));
    }
    render() {
        if (!this.props.loggedIn && !this.props.cities && !this.props.events) {
            return null;
        }
        return (
            <div className="eventsPageComponent">
                <div className="citySelect">
                    Select the city you'd like to view:
                    <select
                        onChange={e => {
                            this.props.dispatch(eventsByCity(e.target.value));
                        }}
                        name="city"
                    >
                        <option>Select City</option>
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
                    <Calendar city={this.props.city} />
                </div>
                <h2 className="citiesIn">
                    Events in{" "}
                    <span
                        className="eventsInName"
                        onClick={() =>
                            this.props.dispatch(eventsByCity(this.props.city))
                        }
                    >
                        {this.props.city || this.props.loggedIn.city}
                    </span>
                </h2>

                <div className="eventList">
                    {this.props.events && this.props.events.length ? (
                        this.props.events.map(events => {
                            return (
                                <div className="eachEvent" key={events.id}>
                                    {new Date(events.event_date)
                                        .toUTCString()
                                        .slice(0, 12)}{" "}
                                    <Link to={`/event/${events.event_id}`}>
                                        {events.name}
                                    </Link>{" "}
                                    by: {events.artist} in: {events.city}
                                </div>
                            );
                        })
                    ) : (
                        <div>No events found</div>
                    )}
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    console.log("REDUX STATE IN EVENTS", state);
    return {
        events: state.events,
        cities: state.cities,
        loggedIn: state.loggedIn,
        city: state.city
    };
};

export default connect(getStateFromRedux)(guestEvents);
