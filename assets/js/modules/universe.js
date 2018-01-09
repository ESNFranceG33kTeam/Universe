const KonamiCode = require( "konami-code" );
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const app = require('electron').remote;
const remote = require('electron').remote;
const path = require('path');


var Universe = (function() {

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


    /**
	  * See public API
      * @private
	  **/
	function _build(sites) {
		for(let i=0, length=sites.length; i<length; i++) {
			Universe.menu.buttonManager.create_new_button(sites[i]);
			Universe.frameManager.create_new_frame(sites[i]);
		}

		Universe.updater.updateVersionIndicator();
	};

    let suggested_sites = [
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
    		name: 'Slack',
    		url: 'https://communauteixesn.slack.com',
    		image_url: 'https://communauteixesn.slack.com',
    		muted: false
    	},
    ];



    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    return {

        // application components
    	main_wrapper: document.getElementById('main_wrapper'),
        suggested_sites: suggested_sites,

        /**
    	  * Creates HTML components (buttons and webviews) for all websites, and
          * set the version indicator.
    	  * @memberof module:Universe
    	  * @author Rémy Raes
          * @public
    	  **/
    	build: (sites) => {
            _build(sites);
        }

    }

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

})();
