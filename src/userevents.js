import React from "react";
import { connect } from "react-redux";
import { getUserUploadedEvents, deleteEvent } from "./actions";
import { Link } from "react-router-dom";

class UserUploadedEvents extends React.Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
        console.log(this.date);
    }
    componentDidMount() {
        this.props.dispatch(getUserUploadedEvents());
    }
    render() {
        if (!this.props.userEvents) {
            return null;
        }
        return (
            <div className="userEventsDiv">
                <h1>Youve uploaded these events</h1>
                <div className="userEventsContainer">
                    {this.props.userEvents &&
                        this.props.userEvents.map(singleEvent => {
                            return (
                                <div
                                    key={singleEvent.id}
                                    className="usersEvent"
                                >
                                    <img
                                        className="userAddedPhoto"
                                        src={singleEvent.photo}
                                    />
                                    <br />
                                    <Link to={`/event/${singleEvent.id}`}>
                                        {singleEvent.name}
                                    </Link>{" "}
                                    <br />
                                    <br />
                                    <Link to={`/editevent/${singleEvent.id}`}>
                                        <span>edit</span>
                                    </Link>{" "}
                                    <Link to={`/uploadimage/${singleEvent.id}`}>
                                        <p>Upload an event image</p>
                                    </Link>
                                    <Link to={`/editdates/${singleEvent.id}`}>
                                        Edit/Delete Dates
                                    </Link>
                                    <br />
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                deleteEvent(singleEvent.id)
                                            )
                                        }
                                    >
                                        Delete Event
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
    console.log("Events state", state);
    return {
        userEvents: state.userEvents,
        eventDates: state.eventDates
    };
};

export default connect(getStateFromRedux)(UserUploadedEvents);
