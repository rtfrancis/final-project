import React from "react";
import { connect } from "react-redux";
import { eventsByDateAndCity, eventsByCity } from "./actions";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="calendarContainer">
                <div id="navMonth">
                    <span id="calPrev">&lt;&lt;</span>
                    <span
                        id="calMonth"
                        onClick={() =>
                            this.props.dispatch(eventsByCity(this.props.city))
                        }
                    >
                        July
                    </span>
                    <span id="calNext">&gt;&gt;</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mo</th>
                            <th>Tu</th>
                            <th>We</th>
                            <th>Th</th>
                            <th>Fr</th>
                            <th>Sa</th>
                            <th>Su</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td className="leer" />
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-01"
                                        )
                                    )
                                }
                            >
                                1
                            </td>
                        </tr>
                        <tr>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-02"
                                        )
                                    )
                                }
                            >
                                2
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-03"
                                        )
                                    )
                                }
                            >
                                3
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-04"
                                        )
                                    )
                                }
                            >
                                4
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-05"
                                        )
                                    )
                                }
                            >
                                5
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-06"
                                        )
                                    )
                                }
                            >
                                6
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-07"
                                        )
                                    )
                                }
                            >
                                7
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-08"
                                        )
                                    )
                                }
                            >
                                8
                            </td>
                        </tr>
                        <tr>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-09"
                                        )
                                    )
                                }
                            >
                                9
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-10"
                                        )
                                    )
                                }
                            >
                                10
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-11"
                                        )
                                    )
                                }
                            >
                                11
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-12"
                                        )
                                    )
                                }
                            >
                                12
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-13"
                                        )
                                    )
                                }
                            >
                                13
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-14"
                                        )
                                    )
                                }
                            >
                                14
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-15"
                                        )
                                    )
                                }
                            >
                                15
                            </td>
                        </tr>
                        <tr>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-16"
                                        )
                                    )
                                }
                            >
                                16
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-17"
                                        )
                                    )
                                }
                            >
                                17
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-18"
                                        )
                                    )
                                }
                            >
                                18
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-19"
                                        )
                                    )
                                }
                            >
                                19
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-20"
                                        )
                                    )
                                }
                            >
                                20
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-21"
                                        )
                                    )
                                }
                            >
                                21
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-22"
                                        )
                                    )
                                }
                            >
                                22
                            </td>
                        </tr>
                        <tr>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-23"
                                        )
                                    )
                                }
                            >
                                23
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-24"
                                        )
                                    )
                                }
                            >
                                24
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-25"
                                        )
                                    )
                                }
                            >
                                25
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-26"
                                        )
                                    )
                                }
                            >
                                26
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-27"
                                        )
                                    )
                                }
                            >
                                27
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-28"
                                        )
                                    )
                                }
                            >
                                28
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-29"
                                        )
                                    )
                                }
                            >
                                29
                            </td>
                        </tr>
                        <tr>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-30"
                                        )
                                    )
                                }
                            >
                                30
                            </td>
                            <td
                                onClick={() =>
                                    this.props.dispatch(
                                        eventsByDateAndCity(
                                            this.props.city,
                                            "2018-07-31"
                                        )
                                    )
                                }
                            >
                                31
                            </td>
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
