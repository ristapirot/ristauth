var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema({
    title: String,
    content: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}));