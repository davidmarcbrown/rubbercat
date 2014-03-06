'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cat Schema
 */
var CatSchema = new Schema({
  title: { type: String, default: 'Untitled' },
  dateCreated: { type: Date, default: Date.now },
  dateModified:{ type: Date, default: Date.now },
  createdBy: { type: String, default: 'Anonymous' },
  lines: [ { code: String, annotation: String } ],
  isPrivate: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false }
});

CatSchema.methods = {
  findCatsByUserId : function ( userId ){
    console.log( 'Finding cats for user ' + userId );
    return [];
  }
};

module.exports = mongoose.model('Cat', CatSchema);
