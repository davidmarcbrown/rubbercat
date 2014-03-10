'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    cats = require('./controllers/cats');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  app.get('/api/cats/example', cats.example);
  app.put('/api/cats/example', cats.exampleUpdate);
  app.get('/api/cats/:id', cats.show);
  app.put('/api/cats/:id', cats.update);
  app.post('/api/cats', cats.create);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
