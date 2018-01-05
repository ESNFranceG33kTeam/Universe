var Universe = Universe || {};

/**
  * This module contains all operations linked to manipulation of the setApplicationMenu
  * frames.
  * @module Universe/frameManager
  * @author Rémy Raes
  **/
Universe.frameManager = (function(){
	let _this = {};

	let home = document.getElementById('home');
	let loadingBar = new ldBar("#loading_bar");
	var loading_screen = document.getElementById('loading');
	var loading_logo = document.getElementById('loading_logo');
	let frames_loaded = 0;
	let first_launch = false;

	let webviews = {
		views: {}
	};

	webviews.add = function(url, view) {
		let hash = url.hashCode() + '_frame';
		let element = this.views[hash];
		if(element === undefined)
			this.views[hash] = view;
	};
	webviews.get = function(url) {
		let hash = url.hashCode() + '_frame';
		return this.views[hash];
	};
	webviews.remove = function(url) {
		let hash = url.hashCode() + '_frame';
		delete this.views[hash];
	}
	webviews.getViews = function() {
		return webviews.views;
	};
	webviews.getViewsCount = function() {
		return Object.keys(webviews.views).length;
	};

	_this.getWebviews = function() {
		return webviews.getViews();
	};

	function increment_loaded_frames() {
		frames_loaded++;
		loadingBar.set(
			(frames_loaded/webviews.getViewsCount())*100
		);
	};


	/**
	  * This function check if all webviews have loaded their content;
	  * if that's the case, it removes the loading screen.
	  * @memberof module:Universe/frameManager
	  * @author Rémy Raes
	  **/
	function check_loaded_frames() {
		if(is_ready_to_display()) {
			setTimeout(hide_loading_screen, 1000);
		}
	};

	function is_ready_to_display() {
		return frames_loaded === webviews.getViewsCount();
	}

	/**
	  * This function hides the loading screen, enabling the user to
	  * access the application functionnalities.
	  * @memberof module:Universe/frameManager
	  * @author Rémy Raes
	  **/
	function hide_loading_screen() {
		console.info('All frames have been loaded, hiding the loading screen.');
		loading_logo.style.webkitAnimationPlayState = 'paused';
		loading_screen.style.opacity = '0';
		setTimeout(function() {
			loading_screen.style.zIndex = '-1';
		}, 1000);

		if(first_launch)
			Universe.commons.launch_tutorial_mode();
	}

	/**
	  * This function hides all application frames.
	  * @memberof module:Universe/frameManager
	  * @author Rémy Raes
	  **/
	function hide_all_frames () {
		home.className = 'category frame';
		let views = webviews.views;
		for (let key in views) {
			views[key].className = 'frame';
		}
	}


	_this.show_frame = function(url) {
		hide_all_frames();
		let hash = url.hashCode() + '_frame';
		webviews.views[hash].className = 'frame frame-show';
	};

	_this.show_home = function() {
		hide_all_frames();
		home.className = 'homeWrapper frame-show';
	};

	/**
	  * This function creates a frame encapsulating a website
	  * on the side menu.
	  * @param {String} site - The URL of the new website
	  * @memberof module:Universe/frameManager
	  * @author Rémy Raes
	  **/
	_this.create_new_frame = function(site) {
		let url = site.url;
		let frame = document.createElement('webview');

		frame.id = url.hashCode() + '_frame';
		frame.className = 'frame';

		// let attribute = (is_main_website) ? 'application' : 'user';
		// frame.setAttribute('data-origin', attribute);
		frame.setAttribute('data-origin', 'user');
		frame.src = url;

		frame.addEventListener('dom-ready', () => {
			console.log('The website \'' + site.name + '\' has been loaded.');
			increment_loaded_frames();
			check_loaded_frames();

			// reset the notification indicator
			Universe.notification.remove_notification_from_site(site);
		});
		frame.addEventListener('page-title-updated', () => {
			if(!frame_is_focused(site.url) && is_ready_to_display())
				Universe.notification.add_notification_on_site(site);

			// updates the application tooltip
			Universe.storage.save_site_title(site, frame.getTitle());
		});
		frame.addEventListener('page-favicon-updated', (e) => {
			// update the button image
			Universe.menu.buttonManager.update_button_image(site, e.favicons[0]);
		});
		frame.addEventListener('mousedown', () => {
			// hiding the subscription window
			Universe.subscription.reset();
		});
		frame.addEventListener('did-start-loading', () => {
			Universe.menu.buttonManager.add_loader(site);
		});
		frame.addEventListener('did-stop-loading', () => {
			Universe.menu.buttonManager.remove_loader(site);
		});

		Universe.commons.main_wrapper.appendChild(frame);
		webviews.add(url, frame);
	};

	/**
	  * This functions tells if a frame is focused.
	  * @param {String} url - hashed url of the site frame
	  * @return {Boolean} is the frame focused or not
	  * @memberof module:Universe/frameManager
	  **/
	function frame_is_focused(url) {
		let hash = url.hashCode() + '_frame';
		let frame = webviews.views[hash];
		return frame.className === 'frame frame-show';
	}

	_this.delete_frame = function(site) {
		let node = webviews.get(site.url);
		Universe.commons.main_wrapper.removeChild(node);
		webviews.remove(site.url);
		console.info('Deleting ' + site.name + '.');
	};

	_this.reset_frame = function(site) {
		let frame = webviews.get(site.url);
		frame.loadURL(site.url);
		console.info('Frame ' + site.name + ' is resetting.');
	};


	_this.trigger_tutorial_mode = function() {
		first_launch = true;
	};


	return _this;
})();
