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
        const id = this.props.match.params.id;

        this.props.dispatch(getEventDates(id));
    }
    render() {
        if (!this.props.eventDates) {
            return null;
        }
        return (
            <div>
                <h1>Dates:</h1>
                {this.props.eventDates &&
                    this.props.eventDates.map(date => {
                        return (
                            <div key={date.id}>
                                {date.event_date}{" "}
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.dispatch(
                                            deleteDate(date.id)
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                <div className="addDateButton" onClick={this.showAddDate}>
                    Add another date
                </div>
                <div className="dateAdd">
                    Add date:
                    <input
                        onChange={this.handleInput}
                        ref={elem => {
                            this.datebox = elem;
                        }}
                        type="date"
                        name="date"
                        required
                    />
                    <button
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
                    </button>
                    <button onClick={this.hideAddDate}>Done</button>
                </div>
                <p>
                    <Link to="/profile">Return to profile</Link>
                </p>
                <Link to={`/event/${this.props.match.params.id}`}>
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
