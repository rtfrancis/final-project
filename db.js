var spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/kunst"
);

module.exports.register = function register(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first || null, last || null, email || null, password || null]
    );
};

module.exports.getUserByEmail = function getUserByEmail(email) {
    return db.query(
        `SELECT id, first, last, password FROM users WHERE email = $1`,
        [email]
    );
};

module.exports.loggedInUser = function loggedInUser(id) {
    return db.query(
        `SELECT users.id, first, last, photo FROM users
                    LEFT JOIN profilephotos ON users.id = profilephotos.user_id
                    WHERE users.id = $1`,
        [id]
    );
};

module.exports.addEvent = function addEvent(
    user_id,
    name,
    artist,
    city,
    category,
    language,
    subtitles,
    url,
    notes
) {
    return db.query(
        `INSERT INTO events (user_id, name, artist, city, category, language, subtitles, url, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
        `,
        [user_id, name, artist, city, category, language, subtitles, url, notes]
    );
};
module.exports.getUserUploadedEvents = function getUserUploadedEvents(id) {
    return db.query(
        `SELECT events.id, name, photo FROM events
        LEFT JOIN eventphotos ON events.id = eventphotos.event_id
        WHERE events.user_id = $1`,
        [id]
    );
};

module.exports.addDate = function addDate(id, date) {
    return db.query(
        `INSERT INTO dates (event_id, event_date) VALUES ($1, $2) RETURNING id, event_id, event_date`,
        [id, date]
    );
};

module.exports.getAllEvents = function getAllEvents() {
    return db.query(`SELECT * FROM events
                    LEFT JOIN dates ON events.id = event_id
                    ORDER BY event_date ASC`);
};

module.exports.getEventDetails = function getEventDetails(id) {
    return db.query(
        `SELECT events.id AS event_id, events.user_id, name, artist, city, category, language, subtitles, url, notes, dates.id AS date_id, dates.event_date, photo, likedevents.status  FROM events
                    LEFT JOIN dates ON events.id = event_id
                    LEFT JOIN eventphotos ON events.id = eventphotos.event_id
                    LEFT JOIN likedevents ON likedevents.date_id = dates.id
                    WHERE events.id = $1`,
        [id]
    );
};

module.exports.editEvent = function editEvent(
    id,
    name,
    artist,
    category,
    language,
    subtitles,
    city,
    url,
    notes
) {
    return db.query(
        `
        UPDATE events
        SET name = $2, artist = $3, category = $4, language = $5, subtitles = $6, city = $7, url = $8, notes = $9
        WHERE id = $1
        RETURNING id
        `,
        [id, name, artist, category, language, subtitles, city, url, notes]
    );
};

module.exports.eventsByCity = function eventsByCity(city) {
    return db.query(
        `SELECT * FROM events
                    LEFT JOIN dates ON events.id = event_id
                    WHERE city = $1`,
        [city]
    );
};

module.exports.getAllEventCities = function getAllEventCities() {
    return db.query(`SELECT DISTINCT city FROM events`);
};

module.exports.getDatesByEventId = function getDatesByEventId(eventId) {
    return db.query(
        `SELECT id, event_id, event_date FROM dates WHERE event_id = $1 ORDER BY event_date ASC`,
        [eventId]
    );
};

module.exports.deleteDate = function deleteDate(dateId) {
    return db.query(`DELETE from dates WHERE id = $1`, [dateId]);
};

module.exports.addEventPhoto = function addEventPhoto(userId, eventId, photo) {
    return db.query(
        `INSERT INTO eventphotos (user_id, event_id, photo, status) VALUES ($1, $2, $3, 1)`,
        [userId, eventId, photo]
    );
};

module.exports.addProfilePhoto = function addProfilePhoto(userId, photo) {
    return db.query(
        `INSERT INTO profilephotos (user_id, photo, status) VALUES ($1, $2, 1)`,
        [userId, photo]
    );
};

module.exports.likeEvent = function likeEvent(userId, eventId, dateId, date) {
    return db.query(
        `INSERT INTO likedevents (user_id, event_id, date_id, event_date, status) VALUES ($1, $2, $3, $4, 1) RETURNING id, event_date, event_id, date_id`,
        [userId, eventId, dateId, date]
    );
};

module.exports.getMyLikedEvents = function getMyLikedEvents(userId) {
    return db.query(
        `SELECT likedevents.id, name, likedevents.event_date, photo, events.id AS event_id FROM likedevents
        LEFT JOIN events ON events.id = likedevents.event_id
        LEFT JOIN eventphotos ON events.id = eventphotos.event_id
        WHERE likedevents.user_id = $1
        `,
        [userId]
    );
};

module.exports.deleteMyLikedEvent = function deleteMyLikedEvent(id) {
    return db.query(`DELETE FROM likedevents WHERE id = $1`, [id]);
};

module.exports.deleteEvent = function deleteEvent(eventId) {
    return db.query(
        `DELETE FROM events
                    WHERE id = $1`,
        [eventId]
    );
};

module.exports.deleteDates = function deleteDates(eventId) {
    return db.query(
        `DELETE FROM dates
                    WHERE event_id = $1`,
        [eventId]
    );
};

module.exports.deleteEventPhotos = function deleteEventPhotos(eventId) {
    return db.query(
        `DELETE FROM eventphotos
                    WHERE event_id = $1`,
        [eventId]
    );
};
module.exports.deleteLikedEvents = function deleteLiked(eventId) {
    return db.query(
        `DELETE FROM likedevents
                    WHERE event_id = $1`,
        [eventId]
    );
};

// /////////////////// PASSWORD FUNCTIONS /////////////////////////
module.exports.hashPassword = function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            console.log(salt);
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }

                resolve(hash);
            });
        });
    });
};

module.exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
