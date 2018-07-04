import React from "react";
import { connect } from "react-redux";
import { searchField } from "./actions.js";
import { Link } from "react-router-dom";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.hideResults = this.hideResults.bind(this);
        this.blurResults = this.blurResults.bind(this);
    }
    blurResults() {
        let body = document.body;
        let searches = document.querySelector(".searchResults");
        body.addEventListener("click", function() {
            searches.style.display = "none";
        });
    }
    hideResults() {
        let searches = document.querySelector(".searchResults");
        searches.style.display = "none";
    }
    componentDidMount() {
        this.blurResults();
    }
    render() {
        return (
            <div id="searchDiv">
                <input
                    id="searchBar"
                    type="text"
                    name="search"
                    placeholder="Search"
                    autoComplete="off"
                    ref={elem => {
                        this.text = elem;
                    }}
                    onChange={e =>
                        this.props.dispatch(searchField(e.target.value))
                    }
                />
                <div className="searchResults">
                    {this.props.searchResults &&
                        this.props.searchResults.map(result => {
                            return (
                                <Link
                                    key={result.id}
                                    onClick={() => {
                                        this.text.value = "";
                                        this.hideResults();
                                    }}
                                    to={`/event/${result.id}`}
                                >
                                    <div
                                        className="eachSearchResult"
                                        key={result.id}
                                    >
                                        <img
                                            className="searchPhoto"
                                            src={
                                                result.photo ||
                                                "/assets/user.png"
                                            }
                                        />
                                        {result.name} // {result.artist}
                                    </div>
                                </Link>
                            );
                        })}
                    {this.props.noResults}
                </div>
            </div>
        );
    }
}

const getStateFromRedux = state => {
    return {
        searchResults: state.searchResults || [],
        noResults: state.noResults
    };
};

export default connect(getStateFromRedux)(Search);
