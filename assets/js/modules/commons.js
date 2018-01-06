var Universe = Universe || {};
const KonamiCode = require( "konami-code" );
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const app = require('electron').remote;
const remote = require('electron').remote;
const storage = remote.require('electron-json-storage-sync');
const path = require('path');


const konami = new KonamiCode();
konami.listen(function () {
	remote.getCurrentWindow().webContents.openDevTools();
	console.info('Dev tools have been opened :)');
});

String.prototype.hashCode = function() {
  return 'b' + this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
};


/**
  * This module contains all operations and components used by several modules.
  * @module Universe/commons
  * @author Rémy Raes
  **/

Universe.commons = (function(){
	var _this = {};


	// application components
	_this.main_wrapper = document.getElementById('main_wrapper');

	_this.build = function(sites) {
		for(let i=0, length=sites.length; i<length; i++) {
			Universe.menu.buttonManager.create_new_button(sites[i]);
			Universe.frameManager.create_new_frame(sites[i]);
		}

		Universe.updater.updateVersionIndicator();
	};

	return _this;
})();
