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

	// tutorial mode
	let tutorialModeInitialized = false;
	let span;
	let exampleButton;

	function init_tutorial_mode() {

		let logo = document.getElementsByClassName('img_center')[0];
		let menu = Universe.menu.get_home_menu();
		exampleButton = document.getElementsByClassName('section')[1];
		let addSiteButton = document.getElementsByClassName('section subscribe')[0];
		let newSiteWindow = Universe.subscription.get_new_site_window();

		span = document.createElement('span');
		span.className = 'delete';
		span.innerText = 'x';
		exampleButton.appendChild(span);

		SpotlightJS.config({
			message: {
				positions: ['dir_top_middle', 'dir_bottom_middle', 'dir_right_middle']
			},
			arrow: {size: 11},
			navigation: {loop: true, await: false},
		}).add(
			'main', {
				element: logo,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Exit tutorial mode',
						click: function () {
							SpotlightJS.destroy();
						}
					},{
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
						text: 'Previous',
						click: function () {
							SpotlightJS.previous();
						}
					},
					{
						text: 'Next',
						click: function () {
							SpotlightJS.next();
						}
					}],
					title: 'Browsing menu',
					body: 'This is the browsing menu, where you can find all your favourites ESN platforms!'
				}
			},
			'section', {
				element: exampleButton,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Previous',
						click: function () {
							SpotlightJS.previous();
						}
					},
					{
						text: 'Next',
						click: function () {
							span.className = 'delete delete-show';
							SpotlightJS.next();
						}
					}],
					title: 'Platforms',
					body: 'This is a main platform of your Universe. To display it, you just have to left click it.'
				},
				config: {borders: {radius: 10}}
			},
			'delsite', {
				element: span,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Previous',
						click: function () {
							span.className = 'delete';
							SpotlightJS.previous();
						}
					},
					{
						text: 'Next',
						click: function () {
							span.className = 'delete';
							SpotlightJS.next();
						}
					}],
					title: 'Deleting a platform',
					body: 'If you want to delete a platform, just right click it and press the delete button.<br><u>Please note that you cannot delete a main platform from your Universe.</u>'
				},
				config: {borders: {radius: 2}}
			},
			'addsite', {
				element: addSiteButton,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Previous',
						click: function () {
							span.className = 'delete delete-show';
							SpotlightJS.previous();
						}
					},
					{
						text: 'Next',
						click: function () {
							Universe.subscription.show_new_site_subscription();
							SpotlightJS.next();
						}
					}],
					title: 'Adding a new platform',
					body: 'If you want to add a new source of information, you simply have to click this button!'
				},
				config: {borders: {radius: 10}}

			},'newsite', {
				element: newSiteWindow,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Previous',
						click: function () {
							Universe.subscription.reset();
							SpotlightJS.previous();
						}
					},
					{
						text: 'Next',
						click: function () {
							Universe.subscription.reset();
							SpotlightJS.next();
						}
					}],
					title: 'Adding a custom platform',
					body: 'You just have to insert the URL of the website you want to follow here, and click the "Subscribe" button.'
				},
				config: {borders: {radius: 2}}
			},
			'end', {
				element: logo,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: 'Finish',
						click: function () {
							SpotlightJS.destroy();
						}
					}],
					title: 'End',
					body: 'Now, you\'re good to go!<br>Don\'t hesitate to contact your webmaster if you need assistance :)'
				}
			},

		);
	}

	_this.launch_tutorial_mode = function() {
		if(!tutorialModeInitialized) {
			tutorialModeInitialized = true;
			init_tutorial_mode();
		}
		SpotlightJS.spotlight('main', 'menu', 'section', 'delsite', 'addsite', 'newsite', 'end');
	};

	return _this;
})();
