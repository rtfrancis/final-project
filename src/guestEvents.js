import React from "react";

import { Link } from "react-router-dom";
import axios from "./axios";

export default class guestEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.eventsByCity = this.eventsByCity.bind(this);
    }
    eventsByCity(e) {
        const citySearch = e.target.value;
        console.log(citySearch);
        return axios.get(`/eventsbycity/${citySearch}`).then(({ data }) => {
            console.log(data);
            this.setState({
                events: data
            });
        });
    }
    componentDidMount() {
        // this.props.dispatch(getAllEvents());
        console.log("TESTING");
        return axios.get("/guestview").then(({ data }) => {
            console.log(data);
            this.setState({
                cities: data.cities,
                events: data.events
            });
        });
    }
    render() {
        if (!this.state.cities) {
            return null;
        }
        return (
            <div className="guestEventView">
                <div className="citySelect">
                    Select the city you'd like to view:
                    <br />
                    <br />
                    <select
                        id="selectButton"
                        name="city"
                        onChange={this.eventsByCity}
                    >
                        <option>Select City</option>
                        {this.state.cities &&
                            this.state.cities.map(city => {
                                return (
                                    <option key={city.city} value={city.city}>
                                        {city.city}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className="eventList">
                    {this.state.events && this.state.events.length ? (
                        this.state.events.map(events => {
                            return (
                                <div className="eachEvent" key={events.id}>
                                    <span className="eventDate">
                                        {new Date(events.event_date)
                                            .toUTCString()
                                            .slice(0, 12)}{" "}
                                    </span>
                                    <Link
                                        className="nameLink"
                                        to={`/event/${events.event_id ||
                                            events.id}`}
                                    >
                                        {events.name}
                                    </Link>{" "}
                                    <span className="eventArtist">
                                        {events.artist}
                                    </span>
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
