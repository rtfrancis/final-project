import React from "react";
import { connect } from "react-redux";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="ser_nav_month">
                    <span id="ser_prev">&lt;&lt;</span>
                    <span>Juni</span>
                    <span id="ser_next">&gt;&gt;</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mo</th>
                            <th>Di</th>
                            <th>Mi</th>
                            <th>Do</th>
                            <th>Fr</th>
                            <th>Sa</th>
                            <th>So</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td>
                                <span className="past">1</span>
                            </td>
                            <td>
                                <span className="past">2</span>
                            </td>
                            <td>
                                <span className="past">3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="past">4</span>
                            </td>
                            <td>
                                <span className="past">5</span>
                            </td>
                            <td>
                                <span className="past">6</span>
                            </td>
                            <td>
                                <span className="past">7</span>
                            </td>
                            <td>
                                <span className="past">8</span>
                            </td>
                            <td>
                                <span className="past">9</span>
                            </td>
                            <td>
                                <span className="past">10</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="past">11</span>
                            </td>
                            <td>
                                <span className="past">12</span>
                            </td>
                            <td>
                                <span className="past">13</span>
                            </td>
                            <td>
                                <span className="past">14</span>
                            </td>
                            <td>
                                <span className="past">15</span>
                            </td>
                            <td>
                                <span className="past">16</span>
                            </td>
                            <td>
                                <span className="past">17</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="past">18</span>
                            </td>
                            <td>
                                <span className="past">19</span>
                            </td>
                            <td>
                                <span className="past">20</span>
                            </td>
                            <td>
                                <span className="past">21</span>
                            </td>
                            <td>
                                <span className="past">22</span>
                            </td>
                            <td>
                                <span className="past">23</span>
                            </td>
                            <td>
                                <span>24</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>25</span>
                            </td>
                            <td>
                                <span>26</span>
                            </td>
                            <td>
                                <span>27</span>
                            </td>
                            <td>
                                <span>28</span>
                            </td>
                            <td>
                                <span>29</span>
                            </td>
                            <td>
                                <span>30</span>
                            </td>
                            <td className="leer" />
                        </tr>
                        <tr>
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                        </tr>
                        <tr>
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                        </tr>
                        <tr />
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(null)(Calendar);
