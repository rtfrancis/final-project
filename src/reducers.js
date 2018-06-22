export default function(state = {}, action) {
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
            singleEvent: action.data
        });
    }

    if (action.type == "ADDING_DATE") {
        state = Object.assign({}, state, {
            dates: action.data
        });
    }

    console.log("REDUX state: ", state);
    return state;
}
