import React from "react";
import axios from "./axios";

export default class GuestEventDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
    }
    hide(e) {
        e.target.style.display = "none";
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
        console.log(this.date);
    }
    getDetails(id) {
        console.log(id);
        return axios.get(`/singleeventinfo/${id}`).then(({ data }) => {
            console.log(data);
            this.setState({
                details: data.single,
                dates: data.dates
            });
        });
    }

    componentDidMount() {
        this.getDetails(this.props.match.params.id);
    }

    render() {
        if (!this.state.details) {
            return null;
        }
        return (
            <div className="singleEventDiv">
                <h1 className="singleEventTitle">{this.state.details.name}</h1>
                <img src={this.state.details.photo} />
                <div className="detailDiv">
                    <div className="eventInfo">{this.state.details.artist}</div>
                    <div className="eventInfo">{this.state.details.city}</div>
                    <div className="eventInfo">
                        {this.state.details.category}
                    </div>
                    <div className="eventInfo">
                        {this.state.details.language}
                    </div>
                    <div className="eventInfo">
                        {this.state.details.subtitles}
                    </div>
                    <div className="eventInfo">{this.state.details.notes}</div>

                    <div className="eventInfo eventUrl">
                        <a href={this.state.details.url} target="_blank">
                            {this.state.details.url}
                        </a>
                    </div>
                </div>
                <div className="singleEventDatesDiv">
                    {this.state.dates &&
                        this.state.dates.map(date => {
                            return (
                                <div
                                    className="singleDateGuest"
                                    key={date.date_id}
                                >
                                    {new Date(date.event_date)
                                        .toUTCString()
                                        .slice(0, 12)}{" "}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
