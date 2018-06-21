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
    console.log("REDUX state: ", state);
    return state;
}
