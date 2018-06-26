import axios from "./axios";

export function loggedInUser() {
    return axios.get("/loggedininfo").then(data => {
        return {
            type: "LOGGED_IN_USER",
            data: data.data
        };
    });
}

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
                location.replace("/profile");
            } else {
                throw new Error();
            }
            return {
                type: "EVENT_ADDED",
                events: data
            };
        });
}

export function eventDetails(id) {
    return axios.get(`/singleeventinfo/${id}`).then(({ data }) => {
        console.log("returned from single event", data);
        return {
            type: "INDIVIDUAL_EVENT",
            eventDetail: data.single,
            dates: data.dates
        };
    });
}

export function addDate(obj) {
    // console.log(obj);
    return axios
        .post("/addeventdate", {
            eventId: obj.eventId,
            date: obj.date
        })
        .then(({ data }) => {
            console.log(data);
            return {
                type: "ADDING_DATE",
                data
            };
        });
}

export function getEditEventDetails(id) {
    console.log(id);
    return axios.get(`/editeventdetails/${id}`).then(({ data }) => {
        console.log("EVENT DETAILS: ", data);
        return {
            type: "EVENT_TO_EDIT",
            eventDetails: data
        };
    });
}

export function getUserUploadedEvents() {
    return axios.get("/useruploadedevents").then(data => {
        console.log(data);
        return {
            type: "USERS_EVENTS",
            userEvents: data.data
        };
    });
}

export function editEvent(eventInfo) {
    console.log("testing", eventInfo);
    return axios
        .post("/editevent", {
            id: eventInfo.id,
            name: eventInfo.name,
            artist: eventInfo.host,
            city: eventInfo.city,
            category: eventInfo.category,
            language: eventInfo.language,
            subtitles: eventInfo.subtitles,
            url: eventInfo.url,
            notes: eventInfo.notes
        })
        .then(({ data }) => {
            console.log("Getting back from DB: ", data);
            return {
                type: "EVENT_EDITED",
                data
            };
        });
}

export function updateEventForm(a, b) {
    console.log("THIS IS E:", a, b);
    return {
        type: "UPDATING_EVENT_FORM",
        name: a,
        value: b
    };
}

export function eventsByCity(city) {
    console.log(city);
    return axios.get(`/eventsbycity/${city}`).then(({ data }) => {
        console.log(data);
        return {
            type: "EVENTS_BY_CITY",
            data
        };
    });
}

export function getCities() {
    return axios.get("/getlistofcities").then(({ data }) => {
        console.log(data);
        return {
            type: "ALL_CITIES",
            data
        };
    });
}

export function getEventDates(eventId) {
    return axios.get(`/eventdatesbyid/${eventId}`).then(({ data }) => {
        console.log(data);
        return {
            type: "EVENT_DATES",
            data
        };
    });
}

export function deleteDate(dateId) {
    console.log(dateId);
    return axios.post(`/deleteeventdate`, { id: dateId }).then(({ data }) => {
        console.log(data);
        if (data.success) {
            return {
                type: "DATE_DELETE",
                dateId
            };
        }
    });
}
export function uploadEventImage(formData, id) {
    return axios.post(`/uploadeventimage/${id}`, formData).then(({ data }) => {
        console.log("TESTING TESTING:", data);
        if (data.success) {
            location.replace(`/event/${id}`);
            return {
                type: "IMAGE_UPLOADED"
            };
        }
    });
}

export function uploadProfileImage(formData) {
    return axios.post("/uploadprofileimage", formData).then(({ data }) => {
        console.log("TESTING TESTING:", data);
        if (data.success) {
            location.replace("/profile");
            return {
                type: "IMAGE_UPLOADED"
            };
        }
    });
}

export function likeEvent(eventId, eventDate) {
    console.log(eventId, eventDate);
    return axios
        .post("/likethisevent", { eventId: eventId, date: eventDate })
        .then(({ data }) => {
            console.log(data);
            return {
                type: "LIKE_EVENT"
            };
        });
}

export function getMyLikedEvents() {
    return axios.get("/getlikedevents").then(({ data }) => {
        console.log(data);
        return {
            type: "LIKED_EVENTS",
            data
        };
    });
}

export function deleteLikedEvent(id) {
    return axios.post(`/deletethislikedevent/${id}`).then(({ data }) => {
        console.log(data);
        return {
            type: "LIKE_DELETED",
            id
        };
    });
}
