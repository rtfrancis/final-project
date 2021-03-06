import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.startCarousel = this.startCarousel.bind(this);
    }
    startCarousel() {
        var plays = document.getElementsByClassName("plays");
        var dots = document.getElementsByClassName("dot");
        var contain = document.getElementById("dots");
        var cur = 0;
        var isTransitioning;
        var timer;
        function carousel(next) {
            isTransitioning = true;
            plays[cur].classList.remove("onscreen");
            plays[cur].classList.add("exit");
            dots[cur].classList.remove("active");
            if (typeof next != "undefined") {
                cur = next;
            } else {
                cur++;
                if (cur >= plays.length) {
                    cur = 0;
                }
            }
            plays[cur].classList.add("onscreen");
            dots[cur].classList.add("active");
        }
        document.addEventListener("transitionend", function(e) {
            if (e.target.classList.contains("exit")) {
                e.target.classList.remove("exit");
                timer = setTimeout(carousel, 5000);
                isTransitioning = false;
            }
        });
        contain.addEventListener("click", function(e) {
            if (!e.target.classList.contains("dot")) {
                return;
            }
            if (e.target.classList.contains("active")) {
                return;
            }
            if (isTransitioning) {
                return;
            }
            for (var i = 0; i < dots.length; i++) {
                if (dots[i] == e.target) {
                    // console.log(i);
                    clearTimeout(timer);
                    carousel(i);
                    break;
                }
            }
        });
        timer = setTimeout(carousel, 5000);
    }
    componentDidMount() {
        this.startCarousel();
    }
    render() {
        return (
            <div>
                <h1 id="featuredEvents">Featured Events:</h1>
                <div id="carouselContainer">
                    <Link to="/event/14">
                        <div className="plays onscreen">
                            <img src="assets/armine2.png" alt="" />
                            <div className="titleofplay">
                                <p>Armine, Sister</p>
                                <p className="carouselArtist">Teatr Zar</p>
                                <p className="carouselCity">Wrocław</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/event/24">
                        <div className="plays">
                            <img src="assets/endgame.jpg" alt="" />

                            <div className="titleofplay">
                                <p>Endgame</p>
                                <p>Teatro Real</p>
                                <p>Madrid</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/event/18">
                        <div className="plays">
                            <img src="assets/vangelo3.jpg" alt="" />
                            <div className="titleofplay">
                                <p>Vangelo</p>
                                <p>Compagnia Pippo Delbono</p>
                                <p>Rome</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/event/23">
                        <div className="plays">
                            <img src="assets/trouble.jpg" alt="" />
                            <div className="titleofplay">
                                <p>Women in Trouble</p>
                                <p>Volksbühne</p>
                                <p>Berlin</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/event/25">
                        <div className="plays">
                            <img src="assets/wilsonmoon.jpg" alt="" />
                            <div className="titleofplay">
                                <p>Pelléas and Mélisande</p>
                                <p>Stadsschouwburg</p>
                                <p>Amsterdam</p>
                            </div>
                        </div>
                    </Link>
                    <div id="dots">
                        <div className="dot active" />
                        <div className="dot" />
                        <div className="dot" />
                        <div className="dot" />
                        <div className="dot" />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(Carousel);
