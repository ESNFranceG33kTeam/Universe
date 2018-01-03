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
		let tmp = this[hash];
		if(tmp === undefined)
			this[hash] = document.getElementById(hash);
	};
	html_buttons.getElement = function(url) {
		return this[url];
	}

	_this.getButtons = function() {
		return html_buttons;
	}


	/**
	  * This function creates a component representing a website
	  * on the side menu.
	  * @param {String} url - The URL of the new website
	  * @memberof module:Universe/menu/buttonManager
	  * @author Rémy Raes
	  **/
	_this.create_new_button = function(site, is_main_website) {

		let url = site.url;
		Universe.subscription.reset();

		if(!is_main_website) {
			if(added_sites === 0)
				create_site_menu_separation();
			added_sites++;
		}

		// creating the button
		var button = document.createElement('LI');

		if(!is_main_website)
			button.className = 'section added_site';
		else
			button.className = 'section';

		button.addEventListener('animationend', function() {
			button.style.animationName = 'none';
		}, false);

		let tmp = url.hashCode();
		button.id = tmp;

		button.onclick = function() {
			Universe.notification.remove_notification_from_site(site.url.hashCode());
			Universe.frameManager.show_frame(tmp + '_frame');
		};


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
			button.className = (!is_main_website) ? 'section added_site' : 'section';
		});


		// enabling the 'settings' mode
		button.addEventListener('contextmenu', () => {

			if(button.classList.contains('sectionSettings')) {

				if(!is_main_website) {
					button.className = 'section added_site';
				}else
					button.className = 'section';

			} else {
				button.className = 'sectionSettings';
			}
		});


		if(!is_main_website) {

			// creating the delete button
			let span = document.createElement('span');
			span.className = 'delete';
			span.innerText = 'x';

			span.addEventListener('click', function(e) {
				e.stopPropagation();
				Universe.frameManager.show_home();

				delete_button(tmp);
				Universe.frameManager.delete_frame(tmp + '_frame');

				console.info('Deleting ' + url + '.');

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
					console.error('Failed to delete ' + url + ' : website not found.');
				}

				p.sites = sites;
				Universe.storage.save_parameters(p);
				Universe.menu.set_overflow_on_menu();

			}, false);
			button.appendChild(span);
		}


		// create the tooltip
		var tooltip = document.createElement('DIV');
		tooltip.innerText = site.name;

		button.appendChild(tooltip);

		menu.appendChild(button);
		Universe.menu.set_overflow_on_menu();

		html_buttons.addNewElement(url);
	}

	/**
	  * This function appends an HR element into the side menu.
	  * @memberof module:Universe/menu/buttonManager
	  * @author Rémy Raes
	  **/
	function create_site_menu_separation(){
		menu.appendChild(document.createElement('HR'));
	}

	/**
	  * This functions deletes a button from the menu.
	  * @param {String} url - hashed url of the website to delete
	  * @memberof module:Universe/menu/buttonManager
	  * @author Rémy Raes
	  **/
	function delete_button(url) {
		let comp = html_buttons.getElement(url);
		menu.removeChild(comp);

		// remove the second <hr> separator if there's no more added sites
		if(added_sites === 1) {
			let hr = menu.getElementsByTagName('hr')[1];
			menu.removeChild(hr);
		}
		added_sites -= 1;

		Universe.menu.set_overflow_on_menu();
	}

	/**
	  * This function updates the tooltip containing the title of a site.
	  * @param {String} url - hashed url of the site to update
	  * @param {String} title - new site title to put into its tooltip
	  * @memberof module:Universe/menu/buttonManager
	  * @author Rémy Raes
	  **/
	_this.update_tooltip_title = function(url, title) {
		let tmp = html_buttons.getElement(url);
		let tooltip = tmp.getElementsByTagName('DIV')[0];
		tooltip.innerHTML = title;
	};

	/**
	  * This function updates the image of a site button.
	  * @param {String} url - hashed url of the site to update
	  * @param {String} image_url - url of the new background image
	  * @memberof module:Universe/menu/buttonManager
	  * @author Rémy Raes
	  **/
	_this.update_button_image = function(site, image_url) {
		let url = site.url.hashCode();
		let node = html_buttons.getElement(url);
		site.image_url = image_url;
		node.style.backgroundImage = 'url(\'' + image_url + '\')';
	};

	_this.add_loader = function(site) {
		let comp = html_buttons.getElement(site.url.hashCode());
		comp.className += ' sectionLoading';
	};
	_this.remove_loader = function(site, is_main_website) {
		let comp = html_buttons.getElement(site.url.hashCode());
		comp.className = is_main_website ? 'section' : 'section added_site';
	};


	return _this;
})(Universe.menu || {});
