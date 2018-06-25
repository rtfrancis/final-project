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
    return db.query(`SELECT id, first, last FROM users WHERE id = $1`, [id]);
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
        `SELECT * FROM events
        WHERE user_id = $1`,
        [id]
    );
};

module.exports.addDate = function addDate(id, date) {
    return db.query(
        `INSERT INTO dates (event_id, event_date) VALUES ($1, $2) RETURNING event_date`,
        [id, date]
    );
};

module.exports.getAllEvents = function getAllEvents() {
    return db.query(`SELECT * FROM events
                    LEFT JOIN dates ON events.id = event_id`);
};

module.exports.getEventDetails = function getEventDetails(id) {
    return db.query(
        `SELECT * FROM events
                    LEFT JOIN dates ON events.id = event_id
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

// module.exports.addMoreEventInfo = function addMoreEventInfo(
//     event_id,
//     language,
//     subtitles,
//     url,
//     notes
// ) {
//     return db.query(
//         `INSERT INTO eventextras (language, subtitles, url, notes) VALUES ($2, $3, $4, $5) WHERE event_id = $1`,
//         [event_id, language, subtitles, url, notes]
//     );
// };

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
