import axios from "./axios";

export function getAllEvents() {
    return axios.get("/allevents").then(data => {
        console.log("getting all events:", data);
        return {
            type: "ALL_EVENTS",
            events: data.data
        };
    });
}

export function addEvent(newEvent) {
    console.log("testing", newEvent);
    return axios
        .post("/addevent", {
            name: newEvent.name,
            artist: newEvent.host,
            city: newEvent.city,
            dates: newEvent.date,
            category: newEvent.category,
            language: newEvent.language,
            subtitles: newEvent.subtitles,
            url: newEvent.url,
            notes: newEvent.notes
        })
        .then(({ data }) => {
            console.log("Getting back from DB: ", data);
            if (data.success) {
                location.replace("/events");
            } else {
                throw new Error();
            }
            return {
                type: "EVENT_ADDED",
                events: data
            };
        });
}
