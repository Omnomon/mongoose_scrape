var Card = require("../models/card.js");
var Note = require("../models/note.js");
const request = require("request");
const cheerio = require("cheerio");
module.exports = function (app) {
    app.get("/", (req, res) => {
        Card.find({}, (err, doc) => {
            if (err)
                throw err;
            let hbs = doc;
            console.log(hbs);
            res.render("home", hbs);
        });
    });
    app.get("/scrape", (req, res) => {
        request("https://www.sciencenews.org/", (error, response, html) => {
            const $ = cheerio.load(html);
            $("div.field-item article").each((i, element) => {
                let result = {
                    title: $(element).children("header").find("a").text(),
                    link: $(element).children("header").find("a").attr("href"),
                    img: $(element).children("div.main-image").find("img").attr("src"),
                    desc: $(element).children("div.content").text()
                };
                var entry = new Card(result);
                entry.save((err, doc) => {
                    if (err)
                        throw err;
                    console.log(doc);
                });
            });
        });
        res.send("scrape done");
    });
    app.post("/comment/:id", (req, res) => {
        console.log(req.body);
        console.log(Note);
        var newNote = new Note(req.body);
        console.log(newNote);
        console.log(req.params.id);
        newNote.save((err, doc) => {
            if (err)
                throw err;
            console.log(doc);
            Card.findOneAndUpdate({ "_id": req.params.id }, {
                "note": doc._id
            }).exec((err, doc) => {
                if (err)
                    throw err;
                res.send(doc);
            });
        });
    });
};
