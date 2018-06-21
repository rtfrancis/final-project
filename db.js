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
module.exports.addEvent = function addEvent(
    user_id,
    name,
    artist,
    city,
    dates,
    category,
    language,
    subtitles,
    url,
    notes
) {
    return db.query(
        `INSERT INTO events (user_id, name, artist, city, dates, category, language, subtitles, url, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
        `,
        [
            user_id,
            name,
            artist,
            city,
            dates,
            category,
            language,
            subtitles,
            url,
            notes
        ]
    );
};

module.exports.getAllEvents = function getAllEvents() {
    return db.query(`SELECT * FROM events ORDER BY dates ASC`);
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
