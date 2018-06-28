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
                <h1>Youre interested in these events</h1>
                <div className="interestedContainer">
                    {this.props.likedEvents &&
                        this.props.likedEvents.map(eachEvent => {
                            return (
                                <div
                                    key={eachEvent.id}
                                    className="eachInterestedEvent"
                                >
                                    <img
                                        className="likedEventPhoto"
                                        src={eachEvent.photo}
                                    />
                                    <br />
                                    <br />
                                    <Link to={`/event/${eachEvent.event_id}`}>
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
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.dispatch(
                                                deleteLikedEvent(eachEvent.id)
                                            );
                                        }}
                                    >
                                        Remove from my events
                                    </button>
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
