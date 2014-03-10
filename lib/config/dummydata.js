'use strict';

/*
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cat = mongoose.model('Cat'),
  CatSchema = require('../models/cat.js');
*/

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

exports.exampleCat = {
	"createdBy" : "RubberCat",
	"dateCreated" : new Date(),
	"dateModified" : new Date(),
	"isLocked" : false,
	"isPrivate" : false,
	"lines" : [
		{
			"annotation" : "",
			"code" : "I wrote RubberCat as an exercise in developing with the MEAN stack"
		},
		{
			"annotation" : "I started a [blog post](about:blank) in which I planned to write a line-by-line analysis of the MEAN stack boilerplate I used to build RubberCat, but I couldn't find a tool to help me make substantial annotations to source code without breaking the code's flow.\n\nSo I built RubberCat. Maybe it will be useful to you, too!",
			"code" : "and to build a simple tool to make it easier to write and analyze code."
		},
		{
			"code" : "",
			"annotation" : "",
		},
		{
			"annotation" : "RubberCat is a service to aid writing *about* code. It's not an IDE or a code editor - it's more akin to a blogging tool than a programming tool.",
			"code" : "In the editor, the code is static."
		},
		{
			"code" : "",
			"annotation" : "",
		},
		{
			"code" : "You can add, remove, and alter annotations to the code.",
			"annotation" : "",
		},
		{
			"annotation" : "Yellow lines imply that the line already has an annotation in it, like this one.",
			"code" : "Click on any line of this example to see the annotation editor."
		},
		{
			"code" : "",
			"annotation" : "",
		},
		{
			"annotation" : "## Markdown syntax is pretty cool\n\n* you can have bulleted lists\n* and *emphasize* text\n* and [add links](about:blank) to your annotations\n\nYou can also add images or use `some code` in the annotation.\n\nMarkdown syntax is quite robust, [read more about it here](http://daringfireball.net/projects/markdown/basics).",
			"code" : "The annotation editor uses markdown syntax."
		},
		{
			"code" : "",
			"annotation" : "",
		},
		{
			"annotation" : "",
			"code" : "If you're not logged in, new cats you make will be public and unlocked."
		},
		{
			"annotation" : "But it's unlikely anyone will have that URL unless you give it to them.",
			"code" : "Unlocked cats can be edited by anyone that has the URL."
		},
		{
			"annotation" : "You cannot edit a cat after you have locked it.",
			"code" : "When you're finished editing a public cat, lock the cat to prevent further changes."
		},
		{
			"code" : "",
			"annotation" : "",
		},
		{
			"annotation" : "**Public** cats are visible to anyone with the cat's URL.\n\n**Private** cats are only visible to the user that created them.",
			"code" : "Logged in users can make cats they have created public or private."
		},
		{
			"code" : "User made cats are only editable by their creators.",
			"annotation" : "",
		},
		{
			"code" : "",
			"annotation" : "",
		},
		{
			"annotation" : "Please contribute! Find us on [GitHub](https://github.com/cheesepencil/rubbercat).",
			"code" : "RubberCat is open source."
		}
	],
	"title" : "A Helpful Example"
};
