/**
  * This module contains all operations linked to the tutorial mode.
  * @module Universe/tutorial
  * @author Rémy Raes
  **/
Universe.tutorial = (function(){

	// tutorial mode
	let exampleButton;
	let no_added_platforms = false;


	/**
	  * Initializes spotlight.js with a tutorial configuration.
	  * @memberof module:Universe/tutorial
	  * @author Rémy Raes
	  * @private
	  **/
	function init_tutorial_mode() {

		// html elements needed for the tutorial
		let logo = document.getElementsByClassName('img_center')[0];
		let menu = Universe.menu.get_home_menu();
		exampleButton = document.getElementsByClassName('section')[0];
		let addSiteButton = document.getElementsByClassName('section subscribe')[0];
		no_added_platforms = (exampleButton.classList.contains('subscribe'));

		let newSiteWindow = Universe.subscription.get_new_site_window();
		let translations = Universe.i18n.tutorialMessages;
		let new_url = Universe.subscription.get_new_url();

		let targetBtn = document.createElement('div');
		targetBtn.className = 'tutorialSectionFocus';
		let icons = document.getElementById('icons');
		icons.appendChild(targetBtn);
		let mute = exampleButton.getElementsByClassName('mute')[0];

		// route through all html elements to showcase
		SpotlightJS.config({
			message: {
				positions: ['dir_top_center', 'dir_bottom_center', 'dir_right_middle']
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
						text: translations.buttons.exit,
						click: function () {
							icons.removeChild(targetBtn);
							SpotlightJS.destroy();
						}
					},{
						text: translations.buttons.next,
						click: function () {
							SpotlightJS.next();
						}
					}],
					title: translations.main.title,
					body: translations.main.body
				},
			},
			'menu', {
				element: menu,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: translations.buttons.previous,
						click: function () {
							SpotlightJS.previous();
						}
					},
					{
						text: translations.buttons.next,
						click: function () {
							SpotlightJS.next();
						}
					}],
					title: translations.menu.title,
					body: translations.menu.body
				},
				config: {borders: {radius: 2}}
			},
			'section', {
				element: exampleButton,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: translations.buttons.previous,
						click: function () {
							SpotlightJS.previous();
						}
					},
					{
						text: translations.buttons.next,
						click: function () {
							exampleButton.className = 'sectionSettings';
							SpotlightJS.next();
						}
					}],
					title: translations.section.title,
					body: translations.section.body
				},
				config: {borders: {radius: 10}}
			},
			'settingsMode', {
				element: targetBtn,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: translations.buttons.previous,
						click: function () {
							exampleButton.className = 'section';
							SpotlightJS.previous();
						}
					},
					{
						text: translations.buttons.next,
						click: function () {
							exampleButton.className = 'section';
							SpotlightJS.next();
						}
					}],
					title: translations.settingsMode.title,
					body: translations.settingsMode.body
				},
				config: {borders: {radius: 2}}
			},
			'addsite', {
				element: addSiteButton,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: translations.buttons.previous,
						click: function () {
							exampleButton.className = 'sectionSettings';
							SpotlightJS.previous();
						}
					},
					{
						text: translations.buttons.next,
						click: function () {
							new_url.value = 'https://remyraes.com/';
							Universe.subscription.show_new_site_subscription();
							SpotlightJS.next();
						}
					}],
					title: translations.addsite.title,
					body: translations.addsite.body
				},
				config: {borders: {radius: 10}}

			},'newsite', {
				element: newSiteWindow,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: translations.buttons.previous,
						click: function () {
							Universe.subscription.reset();
							SpotlightJS.previous();
						}
					},
					{
						text: translations.buttons.next,
						click: function () {
							Universe.subscription.reset();
							SpotlightJS.next();
						}
					}],
					title: translations.newsite.title,
					body: translations.newsite.body
				},
				config: {borders: {radius: 2}}
			},
			'end', {
				element: logo,
				speed: 600,
				message: {
					icon: path.join('assets','img','icons','star.png'),
					buttons: [{
						text: translations.buttons.exit,
						click: function () {
							icons.removeChild(targetBtn);
							SpotlightJS.destroy();
						}
					}],
					title: translations.end.title,
					body: translations.end.body
				}
			}

		);
	}

	/**
	  * See launch_tutorial_mode.
	  * @private
	  **/
	function _launch_tutorial_mode() {
		SpotlightJS.clear();
		init_tutorial_mode();

		if(no_added_platforms)
			SpotlightJS.spotlight('main', 'menu', 'addsite', 'newsite', 'end');
		else
			SpotlightJS.spotlight('main', 'menu', 'section', 'settingsMode', 'addsite', 'newsite', 'end');
	};



	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	return {

		/**
		  * Public method that launches the tutorial mode.
		  * Will behave differently if no website has been added to the application.
		  * @memberof module:Universe/tutorial
		  * @author Rémy Raes
		  * @public
		  **/
		launch_tutorial_mode: () => {
			_launch_tutorial_mode();
		}

	}

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------

})(Universe || {});
