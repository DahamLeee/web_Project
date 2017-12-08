const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  party: {type: Schema.Types.ObjectId, ref: 'Party'},
  content: {type: String, trim: true, required: true},
  createAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var Attend = mongoose.model('Attend', schema);

module.exports = Attend;
