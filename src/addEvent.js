import React from "react";
import { connect } from "react-redux";
import { addEvent } from "./actions";

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.addDate = this.addDate.bind(this);
        this.addNotes = this.addNotes.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    addDate() {
        const dates = document.querySelector(".dateRange");
        // const addButton = document.querySelector(".addDateButton");
        // let deleteDate = document.createElement("div");
        let newDate = document.createElement("span");
        newDate.innerHTML = '<input type="date" name="date" />';
        newDate.classList.add("newDate");
        dates.appendChild(newDate);
    }
    addNotes() {
        const notes = document.querySelector(".notes");
        notes.style.display = "block";
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    render() {
        return (
            <div className="addEvent">
                <h3>Add an event</h3>
                <form>
                    <div>
                        Name of event <span className="requiredStar">*</span>:
                        <input
                            onChange={this.handleInput}
                            type="text"
                            name="name"
                            required
                        />
                    </div>
                    <div>
                        Host/Artist/Institution{" "}
                        <span className="requiredStar">*</span>:
                        <input
                            onChange={this.handleInput}
                            type="text"
                            name="host"
                            required
                        />
                    </div>
                    <div>
                        Event category:
                        <select onChange={this.handleInput} name="category">
                            <option>Please Select</option>
                            <option value="Theatre">Theatre</option>
                            <option value="Music">Music</option>
                            <option value="Dance">Dance</option>
                            <option value="Fine Art">Fine Art</option>
                        </select>
                    </div>
                    <div className="dateRange">
                        Dates <span className="requiredStar">*</span>:
                        <span>
                            <input
                                onChange={this.handleInput}
                                type="date"
                                name="date"
                                required
                            />
                        </span>
                    </div>
                    <div className="addDateButton" onClick={this.addDate}>
                        {" "}
                        + add date{" "}
                    </div>

                    <div>
                        Language:
                        <input
                            onChange={this.handleInput}
                            type="text"
                            name="language"
                        />
                    </div>
                    <div>
                        Subtitles:
                        <input
                            onChange={this.handleInput}
                            type="text"
                            name="subtitles"
                        />
                    </div>
                    <div>
                        City <span className="requiredStar">*</span>:
                        <input
                            onChange={this.handleInput}
                            type="text"
                            name="city"
                            required
                        />
                    </div>
                    <div>
                        Url:
                        <input
                            onChange={this.handleInput}
                            type="url"
                            name="url"
                        />
                    </div>
                    <div className="notes">
                        <textarea
                            onChange={this.handleInput}
                            cols="50"
                            rows="20"
                            name="notes"
                        />
                    </div>
                    <div className="addNotes" onClick={this.addNotes}>
                        + add notes
                    </div>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.props.dispatch(
                                addEvent({
                                    name: this.name,
                                    host: this.host,
                                    category: this.category,
                                    date: this.date,
                                    language: this.language || null,
                                    subtitles: this.subtitles || null,
                                    city: this.city,
                                    url: this.url || null,
                                    notes: this.notes || null
                                })
                            );
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(null)(AddEvent);
