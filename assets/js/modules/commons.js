var ESNbang = ESNbang || {};
const KonamiCode = require( "konami-code" );
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const remote = require('electron').remote;
const storage = remote.require('electron-json-storage-sync');

const konami = new KonamiCode();
konami.listen(function () {
	remote.getCurrentWindow().webContents.openDevTools();
	console.info('Dev tools have been opened :)');
});

String.prototype.hashCode = function() {
  return 'b' + this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
};


/**
  * This module contains all "hardcoded" components of the application
  * and all linked operations.
  * @module ESNbang/components
  * @author Rémy Raes
  **/
ESNbang.commons = (function(){
	var _this = {};

	// application components
	_this.main_wrapper = document.getElementById('main_wrapper');

	return _this;
})();
