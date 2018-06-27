import React from "react";
import { deleteLikedEvent, likeEvent } from "./actions";
import { connect } from "react-redux";

class InterestedButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setText = this.setText.bind(this);
        this.addLike = this.addLike.bind(this);
        this.removeLike = this.removeLike.bind(this);
    }

    setText() {
        if (this.props.status == null) {
            this.setState({
                buttonText: "Add to your events",
                buttonAction: this.addLike
            });
        } else {
            // if (this.props.status != null) {
            const button = document.querySelector(".interestedButton");
            button.classList.add("hideButton");
        }
    }
    addLike() {
        this.props.dispatch(
            likeEvent(this.props.eventId, this.props.date, this.props.dateId)
        );
    }
    removeLike() {
        this.props.dispatch(deleteLikedEvent(this.props.dateId));
    }
    componentDidMount() {
        this.setText();
        console.log(this.props.status);
    }
    render() {
        return (
            <div>
                <div
                    className="interestedButton"
                    onClick={this.state.buttonAction}
                >
                    {this.state.buttonText}
                </div>
            </div>
        );
    }
}

export default connect(null)(InterestedButton);
