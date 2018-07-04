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
        const data = action.dates;
        const copyDate = data.filter(
            each =>
                new Date(each.event_date).getTime() >
                new Date(Date.now()).getTime()
        );

        state = Object.assign({}, state, {
            eventDetail: action.eventDetail,
            dates: copyDate
        });
    }

    if (action.type == "ADDING_DATE") {
        state = Object.assign({}, state, {
            // dates: [...state.dates, action.data],
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
        const data = action.data;
        const copyEvents = data.filter(
            each =>
                new Date(each.event_date).getTime() >
                new Date(Date.now()).getTime()
        );
        state = Object.assign({}, state, {
            events: copyEvents,
            city: action.city
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
        state = Object.assign({}, state, {
            eventDates: copyEventDates
        });
    }
    if (action.type == "LIKE_EVENT") {
        state = Object.assign({}, state, {
            likedEvents: [...state.likedEvents, action.data]
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
    if (action.type == "CITY_AND_DATE") {
        state = Object.assign({}, state, {
            events: action.data
        });
    }

    if (action.type == "EVENT_DELETED") {
        const copyUserEventList = state.userEvents.filter(
            eachUserEvent => eachUserEvent.id != action.id
        );
        const copyLikedEventList = state.likedEvents.filter(
            eachLikedEvent => eachLikedEvent.event_id != action.id
        );
        state = Object.assign({}, state, {
            userEvents: copyUserEventList,
            likedEvents: copyLikedEventList
        });
    }

    if (action.type == "SEARCH_FIELD") {
        let box = document.querySelector(".searchResults");
        if (action.results == []) {
            box.style.display = "none";
        } else {
            box.style.display = "block";
        }
        if (action.results.length > 10) {
            box.style.display = "none";
        } else {
            box.style.display = "block";
        }
        state = Object.assign({}, state, {
            searchResults: action.results
        });
    }

    return state;
}
