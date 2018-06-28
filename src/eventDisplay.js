import React from "react";
import { connect } from "react-redux";
import { eventDetails, likeEvent, getMyLikedEvents } from "./actions";
// import InterestedButton from "./interestedButton";

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        // this.hide = this.hide.bind(this);
    }
    hide(e) {
        e.target.style.display = "none";
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
        console.log(this.date);
    }
    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROOOOPS!:", nextProps);
        if (
            nextProps.match &&
            nextProps.match.params &&
            nextProps.match.params.id != this.props.match.params.id
        ) {
            this.props.dispatch(eventDetails(nextProps.match.params.id));
        }
    }
    componentDidMount() {
        this.props.dispatch(eventDetails(this.props.match.params.id));
        this.props.dispatch(getMyLikedEvents());
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
                        {this.props.singleEvent.url}
                    </a>
                </div>
                <div className="singleEventDatesDiv">
                    {this.props.dates &&
                        this.props.dates.map(date => {
                            return (
                                <div className="singleDate" key={date.date_id}>
                                    {new Date(date.event_date)
                                        .toUTCString()
                                        .slice(0, 12)}{" "}
                                    <button
                                        className="interestedButton"
                                        ref={elem => {
                                            this.addText = elem;
                                        }}
                                        onClick={e => {
                                            this.props.dispatch(
                                                likeEvent(
                                                    date.event_id,
                                                    date.event_date,
                                                    date.date_id
                                                )
                                            );
                                            this.hide(e);
                                        }}
                                    >
                                        Add to your events
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
    console.log("STATE INSIDE EVENT DETAIL PAGE", state);
    return {
        singleEvent: state.eventDetail,
        dates: state.dates
        // likedEvents: state.likedEvents
    };
};

export default connect(getStateFromRedux)(EventDisplay);
