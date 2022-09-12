const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ttl = require('mongoose-ttl');

const ShortUrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique:true
  },
})
ShortUrlSchema.plugin(ttl, { ttl: 3600000, reap: false });
const ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema)

module.exports = ShortUrl
