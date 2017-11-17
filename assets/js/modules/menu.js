var ESNbang = ESNbang || {};

/**
  * This module contains all operations linked to the side menu of the
  * application.
  * @module ESNbang/menu
  * @author Rémy Raes
  **/
ESNbang.menu = (function() {
	var _this = {};

	var interval = 20;

	var home_menu = document.getElementById('side_menu');
	var home_menu_height = 'cc';

	// scrolling buttons
	var btn_up = document.getElementById('btn_up');
	var btn_down = document.getElementById('btn_down');
	var btn_up_hover = document.getElementById('btn_up_hover');
	var btn_down_hover = document.getElementById('btn_down_hover');


	ipc.on('resized' , function(event , data){
		_this.set_overflow_on_menu();
	});

	/**
	  * This function gives the number of sites that has been added by the user.
	  * @return {Integer} the number of added sites
	  * @memberof module:ESNbang/menu
	  * @author Rémy Raes
	  **/
	_this.get_added_sites_number = function(){
		return home_menu.getElementsByClassName('added_site');
	}

	/**
	  * This functions returns the state of the state bar, meaning if its size
	  * enables it to display completely within the screen.
	  * @return {Boolean} is the side menu going out of the screen or not
	  * @memberof module:ESNbang/menu
	  * @author Rémy Raes
	  **/
	function menu_is_overflowed() {
		return (home_menu.scrollHeight > home_menu.clientHeight);
	}


	/**
	  * This functions checks if the side menu is overflowed, if that's
	  * the case, it sets the scrolling buttons state to visible.
	  * @memberof module:ESNbang/menu
	  * @author Rémy Raes
	  **/
	_this.set_overflow_on_menu = function() {
		if(menu_is_overflowed()) {
			home_menu.className = 'overflowed';
			btn_up_hover.style.display = 'block';
			btn_down_hover.style.display = 'block';
			home_menu_height = home_menu.scrollHeight;
		}

		else {
			home_menu.className = '';
			btn_up_hover.style.display = 'none';
			btn_down_hover.style.display = 'none';
		}
	}


	/**
	  * This function is used to scroll the menu up, if possible.
	  * @memberof module:ESNbang/menu
	  * @author Rémy Raes
	  **/
	function scroll_menu_up(){
		// initialisation
		if(home_menu_height === 'cc')
			home_menu_height = home_menu.scrollHeight;

		let elem = home_menu.style.marginTop;
		let cpt = 0;
		if(elem.length > 0)
			cpt = parseInt(elem.substring(0, elem.length-2));

		if(home_menu.scrollHeight === home_menu_height) {
			home_menu.style.marginTop = (cpt - interval) + 'px';
			_this.set_overflow_on_menu();
		}
	}

	var t = 0;
	/**
	  * This function is used to scroll the menu down, if possible.
	  * @memberof module:ESNbang/menu
	  * @author Rémy Raes
	  **/
	function scroll_menu_down(){
		let elem = home_menu.style.marginTop;
		let cpt = 0;
		if(elem.length > 0)
			cpt = parseInt(elem.substring(0, elem.length-2));

		if(cpt === 0) {
			clearInterval(t);
			_this.set_overflow_on_menu();
		}

		if(cpt < (-1 *interval)+1 || cpt > 0){
			home_menu.style.marginTop = parseInt(cpt + interval) + 'px';
			_this.set_overflow_on_menu();
		}
	}

	/**
	  * Self-invoking function that initialize scroll listeners on both
	  * scrolling buttons and mousewheel.
	  * @memberof module:ESNbang/menu
	  * @author Rémy Raes
	  **/
	(function initialize_scroll_listeners() {
		// scrolling listeners avoiding to call the functions too much
		// var t = 0;
		var interval = 20;
		btn_up.addEventListener('mousedown', function(){
			t = setInterval(function(){
				scroll_menu_down();
			}, 40);
		}, false);
		btn_up.addEventListener('mouseup', function() {
			clearInterval(t);
		}, false);


		btn_down.addEventListener('mousedown', function(){
			t = setInterval(function(){
				scroll_menu_up();
			}, 40);
		}, false);
		btn_down.addEventListener('mouseup', function() {
			clearInterval(t);
		}, false);

		let timerScroll = 0;
		home_menu.addEventListener('mousewheel', (e) => {
			clearTimeout(timerScroll);
			timerScroll = setTimeout( () => {
				let delta = -1 * Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
				(delta === 1) ? scroll_menu_up() : scroll_menu_down();
			}, 1);
		});
	})();

	return _this;

})();


/**
  * This submodule contains all operations linked to manipulation of the site
  * buttons.
  * @module ESNbang/menu/siteButton
  * @author Rémy Raes
  **/
ESNbang.menu.siteButton = (function () {
	var _this = {};

	var sites_added = 0;
	var menu = document.getElementById('icons');


	/**
	  * This function creates a component representing a website
	  * on the side menu.
	  * @param {String} url - The URL of the new website
	  * @memberof module:ESNbang/menu/siteButton
	  * @author Rémy Raes
	  **/
	_this.create_new_button = function(site) {

		let url = site.url;
		ESNbang.subscription.reset();

		if(sites_added === 0)
			create_site_menu_separation();
		sites_added++;

		// creating the button
		var button = document.createElement('LI');
		button.className = 'section added_site';
		button.addEventListener('animationend', function() {
			button.style.animationName = 'none';
		}, false);

		let tmp = url.hashCode();
		button.id = tmp;
		button.onclick = function() {
			ESNbang.notification.remove_notification_from_site(site.url.hashCode());
			ESNbang.frameSystem.show_frame(tmp + '_frame');
		};


		// creating the delete button
		let span = document.createElement('span');
		span.className = 'delete';
		span.innerText = 'x';

		span.addEventListener('click', function(e) {
			e.stopPropagation();
			ESNbang.frameSystem.show_home();

			delete_button(tmp);
			ESNbang.frameSystem.delete_frame(tmp + '_frame');

			console.info('Deleting ' + url + '.');

			let p = ESNbang.storage.get_parameters();
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
			ESNbang.storage.save_parameters(p);
			ESNbang.menu.set_overflow_on_menu();

		}, false);
		button.appendChild(span);


		button.addEventListener('contextmenu', function(){

			span.className = 'delete delete-show';
			setTimeout(() => {
				span.className = 'delete';
			}, 2000);
			cpt = 0;

		}, false);


		// create the tooltip
		var tooltip = document.createElement('DIV');
		tooltip.innerText = site.name;
		button.appendChild(tooltip);

		menu.appendChild(button);
		ESNbang.menu.set_overflow_on_menu();
	}

	/**
	  * This function appends an HR element into the side menu.
	  * @memberof module:ESNbang/menu/siteButton
	  * @author Rémy Raes
	  **/
	function create_site_menu_separation(){
		menu.appendChild(document.createElement('HR'));
	}

	/**
	  * This functions deletes a button from the menu.
	  * @param {String} url - hashed url of the website to delete
	  * @memberof module:ESNbang/menu/siteButton
	  * @author Rémy Raes
	  **/
	function delete_button(url) {
		let comp = document.getElementById(url);
		menu.removeChild(comp);

		// remove the second <hr> separator if there's no more added sites
		if(ESNbang.menu.get_added_sites_number() == 0) {
			let hr = home_menu.getElementsByTagName('hr')[1];
			home_menu.removeChild(hr);
		}
		ESNbang.menu.set_overflow_on_menu();
	}

	/**
	  * This function updates the tooltip containing the title of a site.
	  * @param {String} url - hashed url of the site to update
	  * @param {String} title - new site title to put into its tooltip
	  * @memberof module:ESNbang/menu/siteButton
	  * @author Rémy Raes
	  **/
	_this.update_tooltip_title = function(url, title) {
		let tmp = document.getElementById(url);
		let tooltip = tmp.getElementsByTagName('DIV')[0];
		tooltip.innerHTML = title;
	}

	/**
	  * This function updates the image of a site button.
	  * @param {String} url - hashed url of the site to update
	  * @param {String} image_url - url of the new background image
	  * @memberof module:ESNbang/menu/siteButton
	  * @author Rémy Raes
	  **/
	_this.update_button_image = function(url, image_url) {
		let node = document.getElementById(url);
		node.style.backgroundImage = 'url(\'' + image_url + '\')';
	}



	return _this;
})();



/**
 * Get absolute bounds of an element
 * @param element
 * @returns {{top: number, left: number, width: number, height: number}}
 * @private
 * @author Jules Spicht
 */
function _dom_bounds_get(element) {
	var bounds = {},
		c = document.body,
		d = document.documentElement,
		top = window.pageYOffset || d.scrollTop || c.scrollTop,
		left = window.pageXOffset || d.scrollLeft || c.scrollLeft;
	element = element.getBoundingClientRect();
	bounds.top = element.top + top;
	bounds.left = element.left + left;
	bounds.width = element.width;
	bounds.height = element.height;
	return bounds;
}
