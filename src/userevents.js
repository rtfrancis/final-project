import React from "react";
import { connect } from "react-redux";
import { getUserUploadedEvents, addDate } from "./actions";
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
            <div>
                <h3>Youve uploaded these events</h3>
                {this.props.userEvents &&
                    this.props.userEvents.map(singleEvent => {
                        return (
                            <div key={singleEvent.id}>
                                {singleEvent.name}{" "}
                                <Link to={`/editevent/${singleEvent.id}`}>
                                    <span>edit</span>
                                </Link>{" "}
                                <span>add dates</span>
                                <div
                                    className="addDateButton"
                                    onClick={this.showAddDate}
                                >
                                    Add another date
                                </div>
                                <div className="dateAdd">
                                    Add date:
                                    <input
                                        onChange={this.handleInput}
                                        type="date"
                                        name="date"
                                    />
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                addDate({
                                                    eventId: singleEvent.id,
                                                    date: this.date
                                                })
                                            )
                                        }
                                    >
                                        Add
                                    </button>
                                    <button onClick={this.hideAddDate}>
                                        Done
                                    </button>
                                </div>
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
        userEvents: state.userEvents
    };
};

export default connect(getStateFromRedux)(UserUploadedEvents);
