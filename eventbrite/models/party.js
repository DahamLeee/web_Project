const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, trim: true, required: true},
  location: {type: String, trim: true, required: true},
  starts: {type: Date, format:'YYYY-MM-DD'},
  ends: {type: Date, format:'YYYY-MM-DD'},
  startM: {type: String, trim:true},
  endM: {type: String, trim:true},
  description: {type: String, trim: true,},
  organizerName: {type: String, trim: true},
  organizerDescription: {type: String, trim: true},
  price: {type: String, trim: true},
  type: {type:String, trim: true},
  topic: {type:String, trim: true},
  numAttends: {type: Number, default: 0},
  createAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var Party = mongoose.model('Party', schema);


module.exports = Party;
