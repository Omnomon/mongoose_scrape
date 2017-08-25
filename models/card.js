var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});
var Card = mongoose.model('Card', CardSchema);
module.exports = Card;
