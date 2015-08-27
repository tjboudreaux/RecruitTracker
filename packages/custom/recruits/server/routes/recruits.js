'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Recruits, app, auth, database) {

  app.get('/api/recruits/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/recruits/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/recruits/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/recruits/example/render', function(req, res, next) {
    Recruits.render('index', {
      package: 'recruits'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
