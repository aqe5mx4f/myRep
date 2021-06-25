var session = require("express-session");
var connectMongo = require("connect-mongo")(session);

module.exports = session({
    secret: 'mooc',
    cookie: { maxAge: 30 * 60 * 1000 },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new connectMongo({ url: 'mongodb://localhost:27017/mooc' })
});