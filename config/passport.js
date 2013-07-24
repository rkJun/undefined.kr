var passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,    
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = {
 express: {
    customMiddleware: function(app){
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};