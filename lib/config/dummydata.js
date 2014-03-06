'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cat = mongoose.model('Cat'),
  CatSchema = require('../models/cat.js');

/**
 * Populate database with sample application data
 */


/*
Cat.find({}).remove(function() {
  // cat slaughter
});
    

// Clear old users, then add a default user
User.find({}).remove(function() {
  // deleted errbody
});

*/
