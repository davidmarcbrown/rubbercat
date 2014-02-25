'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineSchema = new Schema({
  code: String,
  annotation: String
});

/**
 * Cat Schema
 */
var CatSchema = new Schema({
  title: String,
  dateCreated: Date,
  dateModified: Date,
  lines: [ LineSchema ],
  isPrivate: Boolean
});

// mongoose.model('Cat', CatSchema);
module.exports = CatSchema;
