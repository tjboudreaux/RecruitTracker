'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Pages = new Module('pages');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Pages.register(function(app, auth, database) {


  app.set('views', __dirname + '/server/views');

  //We enable routing. By default the Package Object is passed to the routes
  Pages.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Pages.menus.add({
    title: 'About Us',
    link: 'aboutUs',
    roles: ['anonymous', 'authenticated', 'admin'],
    menu: 'main'
  });

  Pages.aggregateAsset('css', 'pages.css');

  return Pages;
});
