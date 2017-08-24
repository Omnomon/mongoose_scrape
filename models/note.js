var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
    author: {
        type: String
    },
    text: {
        type: String
    }
});
let Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
