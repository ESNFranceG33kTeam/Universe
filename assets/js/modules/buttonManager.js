/**
  * This submodule contains all operations linked to manipulation of the site 
  * buttons.
  * @module Universe/menu/buttonManager
  * @author Rémy Raes
  **/
Universe.menu.buttonManager = (function () {
	var _this = {};

	var added_sites = 0;
	var menu = document.getElementById('icons');

	// object containing added website button HTML elements
	let html_buttons = {};
	html_buttons.addNewElement = function(url, element) {
		let hash = url.hashCode();
			this[hash] = element;
	};
	html_buttons.getElement = function(url) {
		let hash = url.hashCode();
		return this[hash];
	}
	html_buttons.remove = function(url) {
		let hash = url.hashCode();
		delete this[hash];
	}

	_this.getButtons = function() {
		return html_buttons;
	}


	/**
	  * Creates a component representing a website on the side menu.
	  * @param {Object} site - Website object
	  * @memberof module:Universe/menu/buttonManager
	  * @public
	  * @author Rémy Raes
	  **/
	_this.create_new_button = function(site) {

		let url = site.url;
		Universe.subscription.reset();
		if(added_sites === 0)
			create_site_menu_separation();
		added_sites++;

		// creating the button
		var button = document.createElement('LI');
		button.className = 'section';

		button.addEventListener('animationend', function() {
			button.style.animationName = 'none';
		}, false);

		button.id = url.hashCode();


		// creating the mute button
		let muteBtn = document.createElement('span');
		muteBtn.className = (site.muted) ? 'mute muteActivated' : 'mute';
		button.appendChild(muteBtn);

		muteBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			site.muted = !site.muted;
			muteBtn.className = (site.muted) ? 'mute muteActivated' : 'mute';
			Universe.storage.save_site(site);
		});


		// creating the reset button
		let resetBtn = document.createElement('span');
		resetBtn.className = 'reset';
		button.appendChild(resetBtn);

		resetBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			Universe.frameManager.reset_frame(site);
			button.className = 'section';
		});


		// enabling the 'settings' mode
		button.addEventListener('contextmenu', () => {
			if(button.classList.contains('sectionSettings'))
				button.className = 'section';
			else
				button.className = 'sectionSettings';
		});


		// creating the delete button
		let span = document.createElement('span');
		span.className = 'delete';
		span.innerText = 'x';

		span.addEventListener('click', function(e) {
			e.stopPropagation();
			Universe.frameManager.show_home();

			delete_button(site);
			Universe.frameManager.delete_frame(site);

			let p = Universe.storage.get_parameters();
			let sites = p.sites;
			let i=-1;

			// find the position of the site in the settings
			for(let k=0; k<sites.length; k++){
				if(sites[k].url === url) {
					i = k;
					break;
				}
			}

			if(i>-1)
				sites.splice(i, 1);
			else {
				console.error('Failed to delete ' + site.name + ' : website not found.');
			}

			p.sites = sites;
			Universe.storage.save_parameters(p);
			Universe.menu.set_overflow_on_menu();

			html_buttons.remove(url);

		}, false);
		button.appendChild(span);


		button.onclick = function() {
			Universe.notification.remove_notification_from_site(site);
			Universe.frameManager.show_frame(site.url);
		};


		// create the tooltip
		var tooltip = document.createElement('DIV');
		tooltip.innerText = site.name;

		button.appendChild(tooltip);

		menu.appendChild(button);
		Universe.menu.set_overflow_on_menu();

		html_buttons.addNewElement(url, button);
	}

	/**
	  * Inserts a separator into the side menu.
	  * @memberof module:Universe/menu/buttonManager
	  * @private
	  * @author Rémy Raes
	  **/
	function create_site_menu_separation(){
		menu.appendChild(document.createElement('HR'));
	}

	/**
	  * Deletes a button from the menu.
	  * @param {Object} site - Website object
	  * @memberof module:Universe/menu/buttonManager
	  * @private
	  * @author Rémy Raes
	  **/
	function delete_button(site) {
		let comp = html_buttons.getElement(site.url);
		menu.removeChild(comp);

		// remove the <hr> separator if there's no more added sites
		if(added_sites === 1) {
			let hr = menu.getElementsByTagName('hr')[0];
			menu.removeChild(hr);
		}
		added_sites -= 1;

		Universe.menu.set_overflow_on_menu();
	}

	/**
	  * Updates the tooltip containing the title of a site.
	  * @param {Object} site - Website object
	  * @param {String} title - new site title to put into its tooltip
	  * @memberof module:Universe/menu/buttonManager
	  * @public
	  * @author Rémy Raes
	  **/
	_this.update_tooltip_title = function(site, title) {
		let tmp = html_buttons.getElement(site.url);
		let tooltip = tmp.getElementsByTagName('DIV')[0];
		tooltip.innerHTML = title;
		console.info('Updating the title for webpage \'' + site.name + '\'.');
	};

	/**
	  * Updates the image of a site button.
	  * @param {Object} site - Website object
	  * @param {String} image_url - url of the new background image
	  * @memberof module:Universe/menu/buttonManager
	  * @public
	  * @author Rémy Raes
	  **/
	_this.update_button_image = function(site, image_url) {
		let node = html_buttons.getElement(site.url);
		site.image_url = image_url;
		node.style.backgroundImage = 'url(\'' + image_url + '\')';
	};

	/**
	  * Sets a button state to loading (adds a CSS animation).
	  * @param {Object} site - Website object
	  * @memberof module:Universe/menu/buttonManager
	  * @public
	  * @author Rémy Raes
	  **/
	_this.add_loader = function(site) {
		let comp = html_buttons.getElement(site.url);
		comp.className += ' sectionLoading';
	};
	/**
	  * Removes the loading state of a button.
	  * @param {Object} site - Website object
	  * @memberof module:Universe/menu/buttonManager
	  * @public
	  * @author Rémy Raes
	  **/
	_this.remove_loader = function(site) {
		let comp = html_buttons.getElement(site.url);
		comp.className = 'section';
	};


	return _this;

})(Universe.menu || {});
