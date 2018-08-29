var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema({
    title: String,
    content: String,
    createdBy: Schema.Types.ObjectId
}));