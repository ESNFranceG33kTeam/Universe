var Universe = Universe || {};
const KonamiCode = require( "konami-code" );
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
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

		// build main sites
		fs.readFile(path.join(__dirname, '/websites.json'), 'utf8', function (err,data) {
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
				Universe.menu.buttonManager.create_new_button(new_site, true);
				Universe.frameManager.create_new_frame(new_site, true);
			}

			// build added sites
			for(let i=0, length=sites.length; i<length; i++) {
				Universe.menu.buttonManager.create_new_button(sites[i]);
				Universe.frameManager.create_new_frame(sites[i]);
			}

			// actualisation
			Universe.frameManager.load_all_frames();
		});
	};


	_this.launch_tutorial = function() {

		let logo = document.getElementsByClassName('img_center')[0];
		let menu = Universe.menu.get_home_menu();
		let addSiteButton = document.getElementsByClassName('section subscribe')[0];

		SpotlightJS.config({
			message: {
				positions: ['dir_top_center', 'dir_bottom_center', 'dir_bottom_right']
			},
			arrow: {size: 11},
			navigation: {loop: true, await: false}
		}).add(
			'main', {
				element: logo,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Next',
						click: function () {
							SpotlightJS.next();
						}
					}],
					title: 'Universe: tutorial mode',
					body: 'Welcome to your Universe! This is a tutorial mode, that will explain fastly how the application works. You can relaunch it anytime by clicking the logo, just there.'
				},
			},
			'menu', {
				element: menu,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Next',
						click: function () {
							SpotlightJS.next();
						}
					}],
					title: 'Browsing menu',
					body: 'This is the browsing menu, where you can find all your favourites ESN platforms!'
				}
			},
			'addsite', {
				element: addSiteButton,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Finish',
						click: function () {
							SpotlightJS.destroy();
						}
					}],
					title: 'Adding a new platform',
					body: 'If you want to add a new source of information, you simply have to click this button!<br>Now, you\'re good to go!'
				}
			}

		).spotlight('main', 'menu', 'addsite');

	};

	return _this;
})();
