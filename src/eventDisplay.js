import React from "react";
import { connect } from "react-redux";
import { eventDetails, addDate } from "./actions";

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.showAddDate = this.showAddDate.bind(this);
        this.hideAddDate = this.hideAddDate.bind(this);
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
        this.props.dispatch(eventDetails(this.props.match.params.id));
    }
    render() {
        if (!this.props.singleEvent) {
            return null;
        }
        return (
            <div>
                <h1>SINGLE EVENT PAGE</h1>
                <div>{this.props.singleEvent.name}</div>
                <div>{this.props.singleEvent.artist}</div>
                <div>{this.props.singleEvent.city}</div>
                <div className="addDateButton" onClick={this.showAddDate}>
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
                                    eventId: this.props.singleEvent.id,
                                    date: this.date
                                })
                            )
                        }
                    >
                        Add
                    </button>
                    <button onClick={this.hideAddDate}>Done</button>
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    console.log("STATE INSIDE EVENT DETAIL PAGE", state);
    return {
        singleEvent: state.singleEvent,
        dates: state.dates
    };
};

export default connect(getStateFromRedux)(EventDisplay);
