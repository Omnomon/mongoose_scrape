var Card = require("../models/card.js")
var Note = require("../models/note.js")
const request = require("request")
const cheerio = require("cheerio")

module.exports = function(app){
	app.get("/", (req, res)=>{
		Card.find({}).populate('note').exec(function(err, doc){
			if (err) throw err
			let hbs = {card:doc}
			res.render("home", hbs)
		})
	})

	app.get("/scrape", (req, res)=>{
		request("https://www.sciencenews.org/",(error, response, html)=>{
			const $ = cheerio.load(html);
			$("div.field-item article").each((i, element)=>{
				let image = $(element).children("div.main-image").find("img").attr("src")
					if (!image){
						image = $(element).children("div.content").find("img").attr("src")
					}
				let description = $(element).children("div.content").text().split(/\b[A-Z][A-Z]+\b/g).filter(word =>{return word.length > 1}).toString().replace(/^[,\s\uFEFF\xA0]+|^|[\s]+\\n[\s]+\,/g,'').trim()
					if (!description){
						description = null
					}
				let link = $(element).children("header").find("a").attr("href")
					if (!link){
						link = $(element).find("a").attr("href")
					}
				let title = $(element).children("header").find("a").text()
					if (!title){
						let scrapeTitle = $(element).find("img").attr("title").match(/\b[A-Z][A-Z]+\b/g).join(" ")
						title = scrapeTitle.replace(/\b[A-Z][A-Z]+\b/g, function(txt){
						      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
							})
					}
                let result = {
                    title: title,
                    link: link,
                    img: image,
                    desc: description
                };

				var entry = new Card(result)

				entry.save((err, doc)=>{
					if (err) throw err
						console.log(doc)
				})
			})
		})
		res.send("scrape done")
	})

	app.post("/comment/:id", (req,res)=>{
		if (!req.body.author || !req.body.comment){
			res.redirect("/")
		}
		var newNote = new Note({
			author: req.body.author,
			text: req.body.comment,
			article: req.params.id
		})
		newNote.save((err, doc)=>{
			if (err) throw err

				Card.findOneAndUpdate({"_id": req.params.id}, {
					$push:{
						"note": doc._id
					}, 
				}, {
					new: true
				}).exec((err, doc)=>{
					if (err) throw err 
					Card.find({}).populate('note').exec(function(err, doc2){
						if (err) throw err
						let hbs = {card:doc2}
						res.render("home", hbs)
					})
				})
		})
	})

	app.delete("/delete/:id", (req, res)=>{
		console.log("get request")
		Note.remove({
			"_id": req.params.id
		}).then(result=>{
			Card.find({}).populate('note').exec(function(err, doc){
				if (err) throw err
				let hbs = {card:doc}
				res.render("home", hbs)
			})
		})
	})
}