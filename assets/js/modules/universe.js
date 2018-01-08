const KonamiCode = require( "konami-code" );
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const app = require('electron').remote;
const remote = require('electron').remote;
const path = require('path');


var Universe = (function() {
    let _this = {};

    // listener to access the Dev Tools
    const konami = new KonamiCode();
    konami.listen(function () {
    	remote.getCurrentWindow().webContents.openDevTools();
    	console.info('Dev tools have been opened :)');
    });

    /**
	  * Returns a hash value.
      * Called to obtain HTML identifiers for buttons and webviews.
	  * @memberof module:Universe
	  * @author Rémy Raes
      * @public
	  **/
    String.prototype.hashCode = function() {
      return 'b' + this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };

    // application components
	_this.main_wrapper = document.getElementById('main_wrapper');

    /**
	  * Creates HTML components (buttons and webviews) for all websites, and
      * set the version indicator.
	  * @memberof module:Universe
	  * @author Rémy Raes
      * @public
	  **/
	_this.build = function(sites) {
		for(let i=0, length=sites.length; i<length; i++) {
			Universe.menu.buttonManager.create_new_button(sites[i]);
			Universe.frameManager.create_new_frame(sites[i]);
		}

		Universe.updater.updateVersionIndicator();
	};

    _this.suggested_sites = [
    	{
    		name: 'Pallospace',
    		url: 'http://pallospace.ixesn.fr',
    		image_url: "http://pallospace.ixesn.fr",
    		muted: false
    	},
    	{
    		name: 'Galaxy',
    		url: 'http://galaxy.esn.org',
    		image_url: 'http://galaxy.esn.org',
    		muted: false
    	},
    	{
    		name: 'Module Bénévole',
    		url: 'http://gestion.ixesn.fr/liste',
    		image_url: 'http://gestion.ixesn.fr/liste',
    		muted: false
    	},
    	{
    		name: 'Excel d\'or',
    		url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRKN9kuV5KoUJ-ICqRHsM3CYiBBUFEOF09elVyKoiBTjJGrAcs0tcBCmF6KnTiqUhH10u7gQJw1v0tp/pubhtml?widget=true&headers=false',
    		image_url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRKN9kuV5KoUJ-ICqRHsM3CYiBBUFEOF09elVyKoiBTjJGrAcs0tcBCmF6KnTiqUhH10u7gQJw1v0tp/pubhtml?widget=true&headers=false',
    		muted: false
    	},
    	{
    		name: 'Slack',
    		url: 'https://communauteixesn.slack.com',
    		image_url: 'https://communauteixesn.slack.com',
    		muted: false
    	},
    ];

    return _this;
})();
