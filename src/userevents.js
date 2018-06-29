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
                <span className="headlineProfile">
                    You've uploaded these events:
                </span>
                <div className="userEventsContainer">
                    {this.props.userEvents &&
                        this.props.userEvents.map(singleEvent => {
                            return (
                                <div
                                    key={singleEvent.id}
                                    className="usersEvent"
                                >
                                    <Link
                                        className="eventPhotoLink"
                                        to={`/event/${singleEvent.id}`}
                                    >
                                        <img
                                            className="userAddedPhoto"
                                            src={singleEvent.photo}
                                        />
                                    </Link>
                                    <br />
                                    <Link
                                        className="nameLink"
                                        to={`/event/${singleEvent.id}`}
                                    >
                                        {singleEvent.name}
                                    </Link>{" "}
                                    <br />
                                    <br />
                                    <Link
                                        className="userEditButtons"
                                        to={`/editevent/${singleEvent.id}`}
                                    >
                                        <span>Edit Event</span>
                                    </Link>{" "}
                                    <Link
                                        className="imageButton userEditButtons"
                                        to={`/uploadimage/${singleEvent.id}`}
                                    >
                                        <p>Upload an event image</p>
                                    </Link>
                                    <Link
                                        className="userEditButtons"
                                        to={`/editdates/${singleEvent.id}`}
                                    >
                                        Add/Delete Dates
                                    </Link>
                                    <br />
                                    <span
                                        className="userEditButtons"
                                        onClick={() =>
                                            this.props.dispatch(
                                                deleteEvent(singleEvent.id)
                                            )
                                        }
                                    >
                                        Delete Event
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
    console.log("Events state", state);
    return {
        userEvents: state.userEvents,
        eventDates: state.eventDates
    };
};

export default connect(getStateFromRedux)(UserUploadedEvents);
