var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
    author: {
        type: String
    },
    text: {
        type: String
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Card"
    }
});
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
