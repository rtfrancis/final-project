import React from "react";
import { connect } from "react-redux";
import { uploadEventImage } from "./actions";

class ImagesUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upload = this.upload.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }
    closeUploader() {
        location.replace("/profile");
    }
    upload(e) {
        const id = this.props.match.params.id;
        e.preventDefault();
        console.log(this.file);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        this.props.dispatch(uploadEventImage(formData, id));
        // location.replace("/profile");
    }
    // getInfo() {
    //     const imageEvent = this.props.userEvents.filter(
    //         events => events.id == this.props.match.params.id
    //     );
    //     return imageEvent;
    // }

    componentDidMount() {}

    render() {
        return (
            <div id="uploaderOverlay">
                <div id="imageUploader">
                    <div id="uploaderClose" onClick={this.closeUploader}>
                        X
                    </div>
                    <span className="headline">Upload an event image</span>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="inputfile"
                        onChange={this.upload}
                    />
                    <label htmlFor="file">Choose a file</label>
                </div>
            </div>
        );
    }
}

export default connect(null)(ImagesUploader);
