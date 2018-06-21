const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const csurf = require("csurf");
const bodyParser = require("body-parser");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
// const config = require("./config");

app.use(express.static("public"));

app.use(compression());

app.use(require("cookie-parser")());

const cookieSessionMiddleware = cookieSession({
    secret: "I'm always hungry.",
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
                req.body.email,
                hashedPass
            );
        })
        .then(function(userId) {
            console.log("userId is: ", userId);
            req.session.userId = userId.rows[0].id;
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

app.post("/addevent", function(req, res) {
    // console.log(req.body);
    db
        .addEvent(
            req.session.userId,
            req.body.name,
            req.body.artist,
            req.body.city,
            req.body.dates,
            req.body.category,
            req.body.language,
            req.body.subtitles,
            req.body.url,
            req.body.notes
        )
        .then(function() {
            db.getAllEvents().then(({ rows }) =>
                // console.log(rows));
                res.json({
                    data: rows,
                    success: true
                })
            );
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
            // console.log(rows);
            res.json(rows);
        })
        .catch(function(err) {
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
