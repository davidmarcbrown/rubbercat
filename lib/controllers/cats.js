'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Cat = mongoose.model('Cat'),
    passport = require('passport');

// public anonymous cats can be edited by anyone unle5315fe7c2584f8a60c00000ass the cat isLocked.
// public user generated cats are always locked, but the user that created the cat can edit.
// private cats can only be edited by the creator, and isLocked is ignored.

// helper function makes sure that 'createdBy' is populated with a name when sent to client,
// and not as an ObjectID
function showCat ( req, res, cat ) {
  if ( cat.createdBy !== 'Anonymous' ) {
    User.findById( cat.createdBy, 'name', function (err, userName){
      if (err) res.send(err);
      console.log('Sending cat to client...');
      cat.createdBy = userName.name;
      res.json( cat );
    });
  } else {
    res.json( cat );
  }
}

// display existing cat
// but not if it's private!
exports.show = function ( req, res, next ){
  console.log( 'Cat.show() with id: ' + req.params.id );
  console.log( 'requested by user: '  + JSON.stringify( req.user, null, 2 ) );
  Cat.findById( req.params.id, function ( err, cat ){
    if ( !err ) {
      if ( cat ) {
        // console.log( "Found the cat, here it is: " + JSON.stringify( cat, null, 2 ) );
        if ( cat.isPrivate ) {
          console.log( "It's a private cat!" );
          if ( req.user && req.user.id === cat.createdBy ){
            console.log("Ok, this private cat is yours. Here you go.");
            showCat( req, res, cat );
          } else {
            console.log("This isn't your cat. You can't see it.");
            res.send(404);
          }
        } else {
          console.log( "Returning public cat." );
          showCat( req, res, cat);
        }
      } else {
        console.log( "Couldn't find that cat..." );
        res.send(404);
      }
    } else {
      return res.send( err );
    }
  });
};

// helper function to update cat piecemeal.
// assumes checks for isLocked, isPrivate, etc are already done
// see exports.update()
function updateCat ( req, res, cat ){
  var updates = req.body;
  if ( updates.isLocked === true ) cat.isLocked = true;
  if ( updates.hasOwnProperty('isPrivate') && ( cat.createdBy !== 'Anonymous' ) ) cat.isPrivate = updates.isPrivate; // anonymous cats can't be private
  if ( updates.updateAnnotation ) cat.lines[updates.updateAnnotation.index].annotation = updates.updateAnnotation.annotation;
  cat.dateModified = new Date();
  cat.save( function (err, product ){
    if (err) res.send(err);
    //console.log( "Updated cat looks like: " + JSON.stringify( product, null, 2 ) );
    console.log( "updates.isPrivate: " + updates.isPrivate );
    console.log( "product.isPrivate: " + product.isPrivate );
    res.json( { dateModified : product.dateModified } );
  });
}

// save existing cat
exports.update = function ( req, res, next ){
  console.log( 'Cat.update() with id: ' + req.params.id );
  console.log( 'Requested by user: ' + JSON.stringify( req.user ) );
  Cat.findById( req.params.id, function ( err, cat ){
    if ( err ) return res.send (err );
    if ( cat ) {
      //console.log( 'Found the cat to update: ' + JSON.stringify( cat, null, 2 ) );
      if ( cat.isPrivate ){
        console.log( "It's a private cat!" );
        if ( req.user.id === cat.createdBy ){
          console.log( "Ok, this private cat is yours, we can edit it." );
          // update the cat
          updateCat( req, res, cat );
        } else {
          console.log( "This isn't your cat. You can't update it." );
          res.send(404);
        }
      } else if ( cat.isLocked ){
        console.log( "This cat has been locked, you can't make changes to it unless you're the owner." );
        if ( req.user && req.user.id === cat.createdBy ){
          console.log("Ok, you're the owner.");
          // update the cat
          updateCat( req, res, cat );
        } else {
          console.log("Can't edit a locked cat. Sorry.");
          res.send(404);
        }
      } else {
        console.log( "Updating an anonymous, public, unlocked cat." );
        // update the cat
        updateCat( req, res, cat );
      }
    } else {
      console.log( "Couldn't find that cat..." );
      res.send(404);
    }
  });
};

// save new cat from supplied data
exports.create = function ( req, res, next ){
  var newCat = new Cat( req.body );
  newCat.createdBy = req.user ? req.user.id : 'Anonymous';
  newCat.isLocked = req.user ? true : false;
  newCat.save(function(err, savedCat ) {
    if (err) return res.json(400, err);
    console.log( 'Saved successfully!' );
    return res.json( { id : savedCat._id } );
  });
};

exports.findCatsByUserId = function ( userId, cb ){
  console.log( 'Finding cats for user ' + userId );
  Cat.find( { createdBy : userId }, '-lines', function( err, cats ){
    if (err) return err;
    console.log( 'Cats of user ' + userId + ':' );
    console.log( JSON.stringify( cats, null, 2 ) );
    cb( cats );
  });
};
