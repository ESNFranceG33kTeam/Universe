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
  * This module contains all operations and components used by several modules.
  * @module ESNbang/commons
  * @author Rémy Raes
  **/

ESNbang.commons = (function(){
	var _this = {};

	// application components
	_this.main_wrapper = document.getElementById('main_wrapper');


	_this.build = function(sites) {

		// build main sites
		fs.readFile(__dirname + '/websites.json', 'utf8', function (err,data) {
			let new_sites = {};
			try {
				new_sites = JSON.parse(data);
			}catch(e) {
				console.error('Syntax error in the file websites.json.');
			}

			for(let i in new_sites) {
				let new_site = {
					name: i,
					url: new_sites[i]
				};
				ESNbang.menu.buttonManager.create_new_button(new_site, true);
				ESNbang.frameManager.create_new_frame(new_site, true);
			}

			// build added sites
			for(let i=0, length=sites.length; i<length; i++) {
				ESNbang.menu.buttonManager.create_new_button(sites[i]);
				ESNbang.frameManager.create_new_frame(sites[i]);
			}

			// actualisation
			ESNbang.frameManager.load_all_frames();
		});
	};

	return _this;
})();
