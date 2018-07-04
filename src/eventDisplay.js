import React from "react";
import { connect } from "react-redux";
import { eventDetails, likeEvent, getMyLikedEvents } from "./actions";
// import InterestedButton from "./interestedButton";

class EventDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
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
                <h1 className="singleEventTitle">
                    {this.props.singleEvent.name}
                </h1>
                <img src={this.props.singleEvent.photo} />
                <div className="detailDiv">
                    <div className="eventInfo">
                        {this.props.singleEvent.artist}
                    </div>
                    <div className="eventInfo">
                        {this.props.singleEvent.city}
                    </div>
                    <div className="eventInfo">
                        {this.props.singleEvent.category}
                    </div>
                    <div className="eventInfo">
                        {this.props.singleEvent.language}
                    </div>
                    <div className="eventInfo">
                        {this.props.singleEvent.subtitles}
                    </div>
                    <div className="eventInfo">
                        {this.props.singleEvent.notes}
                    </div>
                    <div className="eventInfo eventUrl">
                        <a href={this.props.singleEvent.url} target="_blank">
                            {this.props.singleEvent.url}
                        </a>
                    </div>
                </div>
                <div className="singleEventDatesDiv">
                    {this.props.dates &&
                        this.props.dates.map(date => {
                            return (
                                <div className="singleDate" key={date.date_id}>
                                    <span className="eachDate">
                                        {new Date(date.event_date)
                                            .toUTCString()
                                            .slice(0, 12)}{" "}
                                    </span>
                                    <br />
                                    <span
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
    return {
        singleEvent: state.eventDetail,
        dates: state.dates
    };
};

export default connect(getStateFromRedux)(EventDisplay);
