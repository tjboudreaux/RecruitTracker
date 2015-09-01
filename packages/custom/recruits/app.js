'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Recruits = new Module('recruits');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Recruits.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Recruits.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Recruits.menus.add({
        title: 'View Recruits',
        link: 'recruitsIndex',
        roles: ['authenticated'],
        menu: 'main'
    });

    Recruits.angularDependencies(['ui.validate', 'ngToast', 'ngMessages']);

    Recruits.aggregateAsset('css', 'recruits.css');

    Recruits.aggregateAsset('css', '../lib/ngToast/dist/ngToast.min.css', {
        absolute: false,
        global: true
    });

    Recruits.aggregateAsset('css', '../lib/ngToast/dist/ngToast-animations.min.css', {
        absolute: false,
        global: true
    });

    Recruits.aggregateAsset('js', '../lib/angular-ui-validate/dist/validate.min.js', {
        absolute: false,
        global: true
    });

    Recruits.aggregateAsset('js', '../lib/angular-messages/angular-messages.min.js', {
        absolute: false,
        global: true
    });

    Recruits.aggregateAsset('js', '../lib/ngToast/dist/ngToast.min.js', {
        absolute: false,
        global: true
    });

    Recruits.aggregateAsset('js', '../lib/zeroclipboard/dist/ZeroClipboard.js', {
        absolute: false,
        global: true
    });

    return Recruits;
});
