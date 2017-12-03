const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, trim: true, required: true},
  location: {type: String, trim: true, required: true},
  //starts: {type: Date, format:'YYYY-MM-DD'},
  //ends: {type: Date, format:'YYYY-MM-DD'},
  description: {type: String, trim: true,},
  organizerName: {type: String, trim: true},
  organizerDescription: {type: String, trim: true},
  price: {type: String, trim: true},
  //type: {type:String, trim: true},
  //topic: {type:String, trim: true},
  createAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

schema.plugin(mongoosePaginate);
var Party = mongoose.model('Party', schema);
/*
schema.statics.EVENT_TYPES = [
  {key:'1', value: 'Appearance or Signing'},
  {key:'2', value: 'Attraction'},
  {key:'3', value: 'Camp, Trip, or Retreat'},
  {key:'4', value: 'Class, Training, or Workshop'},
  {key:'5', value: 'Concert or Performance'},
  {key:'6', value: 'Conference'},
  {key:'7', value: 'Convention'},
  {key:'8', value: 'Dinner or Gala'},
  {key:'9', value: 'Festival or Fair'},
  {key:'10', value: 'Game or Competition'},
  {key:'11', value: 'Meeting or Networking Event'},
  {key:'12', value: 'Other'},
  {key:'13', value: 'Party or Social Gathering'},
  {key:'14', value: 'Race or Endurance Event'},
  {key:'15', value: 'Rally'},
  {key:'16', value: 'Screening'},
  {key:'17', value: 'Seminar or Talk'},
  {key:'18', value: 'Tour'},
  {key:'19', value: 'Tournament'},
  {key:'20', value: 'Tradeshow, Consumer Show, or Expo'},
]

schema.statics.EVENT_TOPICS = [
  {key:'1', value: ''}
]
*/
module.exports = Party;
