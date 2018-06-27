import React from "react";
import { deleteEvent } from "./actions";

export default function Confirmation(props) {
    return (
        <div id="deleteOverlay">
            <div id="deleteConfirm">
                <h3>Are you sure?</h3>
                <button
                    onClick={() => this.props.dispatch(deleteEvent(props.id))}
                >
                    Delete
                </button>
                <button onClick={props.closeMe}>Cancel</button>
            </div>
        </div>
    );
}
