import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyLikedEvents, deleteLikedEvent } from "./actions";

class InterestedEvents extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getMyLikedEvents());
    }
    render() {
        return (
            <div className="interestedEventsDiv">
                <span className="headlineProfile">
                    You're interested in these events:
                </span>
                <div className="interestedContainer">
                    {this.props.likedEvents &&
                        this.props.likedEvents.map(eachEvent => {
                            return (
                                <div
                                    key={eachEvent.id}
                                    className="eachInterestedEvent"
                                >
                                    <Link to={`/event/${eachEvent.event_id}`}>
                                        <img
                                            className="likedEventPhoto"
                                            src={eachEvent.photo}
                                        />
                                    </Link>
                                    <br />
                                    <br />
                                    <Link
                                        className="nameLink"
                                        to={`/event/${eachEvent.event_id}`}
                                    >
                                        {eachEvent.name}
                                    </Link>
                                    {""}
                                    <br />
                                    <br />
                                    {new Date(eachEvent.event_date)
                                        .toUTCString()
                                        .slice(0, 12)}
                                    <br />
                                    <br />
                                    <span
                                        className="userEditButtons"
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.dispatch(
                                                deleteLikedEvent(eachEvent.id)
                                            );
                                        }}
                                    >
                                        Remove from my events
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    return { likedEvents: state.likedEvents };
};

export default connect(getStateFromRedux)(InterestedEvents);
