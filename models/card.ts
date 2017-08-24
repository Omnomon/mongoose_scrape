var mongoose = require('mongoose');
var Schema = mongoose.Schema
var CardSchema = Schema({
	title: {
		type: String
	},
	link: {
		type: String 
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
})

let Card = mongoose.model('Card', CardSchema)

module.exports = Card;
