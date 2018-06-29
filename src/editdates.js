import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEventDates, deleteDate, addDate } from "./actions";

class EditEventDates extends React.Component {
    constructor(props) {
        super(props);
        this.showAddDate = this.showAddDate.bind(this);
        this.hideAddDate = this.hideAddDate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    showAddDate() {
        const dateAddBox = document.querySelector(".dateAdd");
        dateAddBox.style.display = "block";
    }
    hideAddDate() {
        const dateAddBox = document.querySelector(".dateAdd");
        dateAddBox.style.display = "none";
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
        console.log(this.date);
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.dispatch(getEventDates(id));
    }
    render() {
        if (!this.props.eventDates) {
            return null;
        }
        return (
            <div className="addDatesDiv">
                <h1>Dates:</h1>
                {this.props.eventDates &&
                    this.props.eventDates.map(date => {
                        return (
                            <div key={date.id}>
                                {new Date(date.event_date)
                                    .toUTCString()
                                    .slice(0, 12)}{" "}
                                <span
                                    className="editDatesButtons"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.dispatch(
                                            deleteDate(date.id)
                                        );
                                    }}
                                >
                                    Delete
                                </span>
                            </div>
                        );
                    })}
                <div className="addDateButton" onClick={this.showAddDate}>
                    +Add another date
                </div>
                <div className="dateAdd">
                    <input
                        onChange={this.handleInput}
                        ref={elem => {
                            this.datebox = elem;
                        }}
                        type="date"
                        name="date"
                        required
                    />
                    <span
                        className="editDatesButtons"
                        onClick={() => {
                            this.props.dispatch(
                                addDate({
                                    eventId: this.props.match.params.id,
                                    date: this.date
                                })
                            );
                            this.datebox.value = "";
                        }}
                    >
                        Add
                    </span>
                    <span
                        className="editDatesButtons"
                        onClick={this.hideAddDate}
                    >
                        Done
                    </span>
                </div>
                <p>
                    <Link className="editDatesButtons" to="/profile">
                        Return to profile
                    </Link>
                </p>
                <Link
                    className="editDatesButtons"
                    to={`/event/${this.props.match.params.id}`}
                >
                    Go to event page
                </Link>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    return {
        eventDates: state.eventDates
    };
};

export default connect(getStateFromRedux)(EditEventDates);
