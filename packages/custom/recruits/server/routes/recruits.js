'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Recruits, app, auth, database) {

  var recruitsController = require('../controllers/recruits')(Recruits);

  app.get('/api/recruits', auth.requiresLogin, recruitsController.findByParameters);
  app.get('/api/recruits/:recruitId', auth.requiresLogin, recruitsController.findById);
  app.post('/api/recruits', auth.requiresLogin, recruitsController.create);
  app.put('/api/recruits/:recruitId', auth.requiresLogin, recruitsController.update);
};
