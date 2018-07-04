const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const secrets = require("./secrets");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const config = require("./config");
const s3 = require("./s3");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 5097152
    }
});

app.use(express.static("public"));

app.use(compression());

app.use(require("cookie-parser")());

const cookieSessionMiddleware = cookieSession({
    secret: secrets.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// /////////////// ROUTES ////////////////////
app.post("/register", function(req, res) {
    db
        .hashPassword(req.body.password)
        .then(function(hashedPass) {
            return db.register(
                req.body.first,
                req.body.last,
                req.body.city,
                req.body.email,
                hashedPass
            );
        })
        .then(function(data) {
            req.session.userId = data.rows[0].id;
        })
        .then(function() {
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});

app.post("/login", function(req, res) {
    let userId;
    db
        .getUserByEmail(req.body.email)
        .then(data => {
            userId = data.rows[0].id;
            return db.checkPassword(req.body.password, data.rows[0].password);
        })
        .then(function(data) {
            if (data == false) {
                throw new Error();
            } else {
                req.session.userId = userId;
                res.json({
                    success: true
                });
            }
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});

app.get("/loggedininfo", function(req, res) {
    return db.loggedInUser(req.session.userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.post("/addevent", function(req, res) {
    return db
        .addEvent(
            req.session.userId,
            req.body.name,
            req.body.artist,
            req.body.city,
            req.body.category,
            req.body.language,
            req.body.subtitles,
            req.body.url,
            req.body.notes
        )
        .then(({ rows }) => {
            db.addDate(rows[0].id, req.body.dates);
        })
        .then(function() {
            db.getAllEvents().then(({ rows }) => {
                res.json({
                    data: rows,
                    success: true
                });
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});

app.get("/allevents", function(req, res) {
    db
        .getAllEvents()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/guestview", function(req, res) {
    Promise.all([db.getAllEvents(), db.getAllEventCities()])
        .then(function([events, cities]) {
            res.json({ events: events.rows, cities: cities.rows });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/singleeventinfo/:id", function(req, res) {
    return db
        .getEventDetails(req.params.id)
        .then(({ rows }) => {
            res.json({
                single: rows[0],
                dates: rows
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/useruploadedevents", function(req, res) {
    return db
        .getUserUploadedEvents(req.session.userId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post("/addeventdate", function(req, res) {
    return db
        .addDate(req.body.eventId, req.body.date)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/editeventdetails/:id", function(req, res) {
    return db
        .getEventDetails(req.params.id)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post("/editevent", function(req, res) {
    db
        .editEvent(
            req.body.id,
            req.body.name,
            req.body.artist,
            req.body.category,
            req.body.language,
            req.body.subtitles,
            req.body.city,
            req.body.url,
            req.body.notes
        )
        .then(data => {
            res.json({ success: true });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/eventdatesbyid/:id", function(req, res) {
    return db
        .getDatesByEventId(req.params.id)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/eventsbycity/:city", function(req, res) {
    return db
        .eventsByCity(req.params.city)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post("/deleteeventdate", function(req, res) {
    return db
        .deleteDate(req.body.id)
        .then(data => {
            if (data) {
                res.json({ success: true });
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});
app.post(
    "/uploadeventimage/:id",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        return db
            .addEventPhoto(
                req.session.userId,
                req.params.id,
                config.s3Url + req.file.filename
            )
            .then(function(result) {
                if (result) {
                    res.json({ success: true });
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }
);

app.post(
    "/uploadprofileimage",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        return db
            .addProfilePhoto(
                req.session.userId,
                config.s3Url + req.file.filename
            )
            .then(function(result) {
                if (result) {
                    res.json({ success: true });
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }
);

app.post("/likethisevent", function(req, res) {
    return db
        .likeEvent(
            req.session.userId,
            req.body.eventId,
            req.body.dateId,
            req.body.date
        )
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/eventsbydateandcity/:city/:date", function(req, res) {
    return db
        .eventsByCityAndDate(req.params.city, req.params.date)
        .then(({ rows }) => {
            console.log(rows);
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/getlikedevents", function(req, res) {
    return db
        .getMyLikedEvents(req.session.userId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post("/deletethislikedevent/:id", function(req, res) {
    return db
        .deleteMyLikedEvent(req.params.id)
        .then(data => {
            if (data) {
                res.json({ success: true });
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post("/deleteentireevent/:id", function(req, res) {
    Promise.all([
        db.deleteEvent(req.params.id),
        db.deleteDates(req.params.id),
        db.deleteEventPhotos(req.params.id),
        db.deleteLikedEvents(req.params.id)
    ])
        .then(() => {
            res.json({ success: true });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get("/getlistofcities", function(req, res) {
    return db
        .getAllEventCities()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});
app.get("/searchresults/search", function(req, res) {
    db
        .userSearch(req.query.q)
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
