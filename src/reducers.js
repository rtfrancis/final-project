export default function(state = {}, action) {
    if (action.type == "LOGGED_IN_USER") {
        state = Object.assign({}, state, {
            loggedIn: action.data
        });
    }

    if (action.type == "EVENT_ADDED") {
        state = Object.assign({}, state, {
            events: action.events
        });
    }
    if (action.type == "ALL_EVENTS") {
        state = Object.assign({}, state, {
            events: action.events
        });
    }
    if (action.type == "INDIVIDUAL_EVENT") {
        state = Object.assign({}, state, {
            eventDetail: action.eventDetail,
            dates: action.dates
        });
    }

    if (action.type == "ADDING_DATE") {
        state = Object.assign({}, state, {
            dates: action.data
        });
    }

    if (action.type == "USERS_EVENTS") {
        state = Object.assign({}, state, {
            userEvents: action.userEvents
        });
    }

    if (action.type == "EVENT_TO_EDIT") {
        state = Object.assign({}, state, {
            eventDetails: action.eventDetails
        });
    }
    if (action.type == "EVENT_EDITED") {
        state = Object.assign({}, state, {
            eventDetails: action.data
        });
    }
    if (action.type == "UPDATING_EVENT_FORM") {
        const copy = Object.assign({}, state.eventDetails);
        copy[action.name] = action.value;

        state = Object.assign({}, state, {
            eventDetails: copy
        });
    }
    if (action.type == "EVENTS_BY_CITY") {
        state = Object.assign({}, state, {
            events: action.data
        });
    }

    console.log("REDUX state: ", state);
    return state;
}
