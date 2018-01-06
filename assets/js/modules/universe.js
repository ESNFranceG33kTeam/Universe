const KonamiCode = require( "konami-code" );
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const app = require('electron').remote;
const remote = require('electron').remote;
const storage = remote.require('electron-json-storage-sync');
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

    return _this;
})();
