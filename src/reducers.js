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
            dates: action.data,
            eventDates: [...state.eventDates, action.data]
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

    if (action.type == "ALL_CITIES") {
        state = Object.assign({}, state, {
            cities: action.data
        });
    }
    if (action.type == "EVENT_DATES") {
        state = Object.assign({}, state, {
            eventDates: action.data
        });
    }

    if (action.type == "DATE_DELETE") {
        const copyEventDates = state.eventDates.filter(
            date => date.id != action.dateId
        );
        console.log("COPY!", copyEventDates);
        state = Object.assign({}, state, {
            eventDates: copyEventDates
        });
    }

    if (action.type == "LIKED_EVENTS") {
        state = Object.assign({}, state, {
            likedEvents: action.data
        });
    }

    if (action.type == "LIKE_DELETED") {
        const copyLikedEvents = state.likedEvents.filter(
            eachEvent => eachEvent.id != action.id
        );
        state = Object.assign({}, state, {
            likedEvents: copyLikedEvents
        });
    }

    console.log("REDUX state: ", state);
    return state;
}
