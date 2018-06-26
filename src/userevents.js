import React from "react";
import { connect } from "react-redux";
import {
    getUserUploadedEvents,
    addDate,
    getEventDates,
    deleteDate
} from "./actions";
import { Link } from "react-router-dom";

class UserUploadedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.showAddDate = this.showAddDate.bind(this);
        this.hideAddDate = this.hideAddDate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    showAddDate() {
        const dateAddBox = document.querySelector(".dateAdd");
        dateAddBox.style.visibility = "visible";
    }
    hideAddDate() {
        const dateAddBox = document.querySelector(".dateAdd");
        dateAddBox.style.visibility = "hidden";
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
            <div className="userEventsComponent">
                <h3>Youve uploaded these events</h3>
                {this.props.userEvents &&
                    this.props.userEvents.map(singleEvent => {
                        return (
                            <div key={singleEvent.id} className="usersEvent">
                                {singleEvent.name}{" "}
                                <Link to={`/editevent/${singleEvent.id}`}>
                                    <span>edit</span>
                                </Link>{" "}
                                <Link to={`/uploadimage/${singleEvent.id}`}>
                                    <p>Upload an event image</p>
                                </Link>
                                <Link to={`/editdates/${singleEvent.id}`}>
                                    Edit/Delete Dates
                                </Link>
                            </div>
                        );
                    })}
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
