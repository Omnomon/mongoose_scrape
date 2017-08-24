Card = require("../models/card.js")
const request = require("request")
const cheerio = require("cheerio")

module.exports = function(app){
	app.get("/", (req, res)=>{
		Card.find({}, (err, doc)=>{
			if (err) throw err
			let hbs = [doc]
			res.render("home", hbs)
		})
	})

	app.get("/scrape", (req, res)=>{
		request("https://www.sciencenews.org/",(error, response, html)=>{
			const $ = cheerio.load(html);
			$("div.field-item article header h2 a").each((i, element)=>{
                let result = {
                    title: $(element).text(),
                    link: $(element).attr("href")
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
}