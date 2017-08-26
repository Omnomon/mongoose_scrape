var mongoose = require('mongoose');
var Schema = mongoose.Schema
var autopopulate = require("mongoose-autopopulate")
var CardSchema = Schema({
	title: {
		type: String
	},
	link: {
		type: String 
	},
	img: {
		type: String
	},
	desc: {
		type: String,
		required: true
	},
	note: [{
		type: Schema.Types.ObjectId,
		ref: "Note",
		autopopulate: true
	}]
})
CardSchema.plugin(autopopulate)
var Card = mongoose.model('Card', CardSchema)

module.exports = Card;
