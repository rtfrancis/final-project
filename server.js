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

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
