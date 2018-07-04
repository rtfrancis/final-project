import React from "react";
import { connect } from "react-redux";
import { getEditEventDetails, editEvent, updateEventForm } from "./actions";

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.addNotes = this.addNotes.bind(this);
    }
    handleInput(e) {
        this.props.dispatch(updateEventForm(e.target.name, e.target.value));
    }
    addNotes() {
        const notes = document.querySelector(".notes");
        notes.style.display = "block";
    }
    componentDidMount() {
        this.props.dispatch(getEditEventDetails(this.props.match.params.id));
    }
    render() {
        if (!this.props.eventDetails) {
            return null;
        }
        return (
            <div className="editEvent">
                <h3>Edit Event</h3>
                <form>
                    <div>
                        Name of event <span className="requiredStar">*</span>:
                        <input
                            autoComplete="off"
                            onChange={this.handleInput}
                            type="text"
                            name="name"
                            value={this.props.eventDetails.name}
                            required
                        />
                    </div>
                    <div>
                        Host/Artist/Institution{" "}
                        <span className="requiredStar">*</span>:
                        <input
                            autoComplete="off"
                            onChange={this.handleInput}
                            type="text"
                            name="artist"
                            value={this.props.eventDetails.artist}
                            required
                        />
                    </div>
                    <div>
                        Event category<span className="requiredStar">*</span>:
                        <select
                            onChange={this.handleInput}
                            name="category"
                            value={this.props.eventDetails.category}
                            required
                        >
                            <option>Please Select</option>
                            <option value="Theatre">Theatre</option>
                            <option value="Music">Music</option>
                            <option value="Dance">Dance</option>
                            <option value="Fine Art">Fine Art</option>
                        </select>
                    </div>
                    <div>
                        Language:
                        <input
                            autoComplete="off"
                            onChange={this.handleInput}
                            type="text"
                            name="language"
                            value={this.props.eventDetails.language || ""}
                        />
                    </div>
                    <div>
                        Subtitles:
                        <input
                            autoComplete="off"
                            onChange={this.handleInput}
                            type="text"
                            name="subtitles"
                            value={this.props.eventDetails.subtitles || ""}
                        />
                    </div>
                    <div>
                        City <span className="requiredStar">*</span>:
                        <input
                            autoComplete="off"
                            onChange={this.handleInput}
                            type="text"
                            name="city"
                            value={this.props.eventDetails.city}
                            required
                        />
                    </div>
                    <div>
                        Url:
                        <input
                            autoComplete="off"
                            onChange={this.handleInput}
                            type="url"
                            name="url"
                            value={this.props.eventDetails.url || ""}
                        />
                    </div>
                    <div className="notes">
                        <textarea
                            onChange={this.handleInput}
                            cols="50"
                            rows="20"
                            name="notes"
                            value={this.props.eventDetails.notes || ""}
                        />
                    </div>
                    <div className="addNotes" onClick={this.addNotes}>
                        + add notes
                    </div>
                    <br />
                    <span
                        id="editEventButton"
                        onClick={e => {
                            e.preventDefault();
                            this.props.dispatch(
                                editEvent({
                                    id: this.props.match.params.id,
                                    name: this.props.eventDetails.name,
                                    host: this.props.eventDetails.artist,
                                    category: this.props.eventDetails.category,
                                    language:
                                        this.props.eventDetails.language ||
                                        null,
                                    subtitles:
                                        this.props.eventDetails.subtitles ||
                                        null,
                                    city: this.props.eventDetails.city,
                                    url: this.props.eventDetails.url || null,
                                    notes: this.props.eventDetails.notes || null
                                })
                            );
                        }}
                    >
                        Submit
                    </span>
                </form>
                <br />
                <br />
                <span className="requiredStar">*</span> indicates required field
            </div>
        );
    }
}

const getStateFromRedux = state => {
    return {
        eventDetails: state.eventDetails
    };
};

export default connect(getStateFromRedux)(EditEvent);
