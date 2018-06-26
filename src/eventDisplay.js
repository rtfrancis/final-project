import React from "react";
import { connect } from "react-redux";
import { eventDetails, likeEvent } from "./actions";

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
        if (!this.props.singleEvent && !this.props.dates) {
            return null;
        }
        return (
            <div className="singleEventDiv">
                <h1>{this.props.singleEvent.name}</h1>
                <img src={this.props.singleEvent.photo} />
                <div>{this.props.singleEvent.name}</div>
                <div>{this.props.singleEvent.artist}</div>
                <div>{this.props.singleEvent.city}</div>
                <div>{this.props.singleEvent.category}</div>
                <div>{this.props.singleEvent.language}</div>
                <div>{this.props.singleEvent.subtitles}</div>
                <div>{this.props.singleEvent.notes}</div>
                <div>
                    <a href={this.props.singleEvent.url} target="_blank">
                        Find out more here
                    </a>
                </div>
                <div className="singleEventDates">
                    Dates:
                    {this.props.dates &&
                        this.props.dates.map(date => {
                            return (
                                <div key={date.event_date}>
                                    {date.event_date}
                                    <span
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.dispatch(
                                                likeEvent(
                                                    this.props.match.params.id,
                                                    date.event_date
                                                )
                                            );
                                        }}
                                    >
                                        Add to your events
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
    console.log("STATE INSIDE EVENT DETAIL PAGE", state);
    return {
        singleEvent: state.eventDetail,
        dates: state.dates
    };
};

export default connect(getStateFromRedux)(EventDisplay);
