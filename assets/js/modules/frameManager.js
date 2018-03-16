/**
  * This module contains all operations linked to manipulation of the
  * webviews.
  * @module Universe/frameManager
  * @author Rémy Raes
  **/
Universe.frameManager = (function(){

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

	/**
	  * @memberof module:Universe/frameManager
	  * @return {HTML} all webviews
	  * @public
	  * @author Rémy Raes
	  **/
	  /*
	_this.getWebviews = function() {
		return webviews.getViews();
	};/*

	/**
	  * Increments the number of loaded frames when one has finished loading,
	  * and updates the loader.
	  * @memberof module:Universe/frameManager
	  * @private
	  * @author Rémy Raes
	  **/
	function increment_loaded_frames() {
		frames_loaded++;
		loadingBar.set(
			(frames_loaded/webviews.getViewsCount())*100
		);
	};


	/**
	  * Checks if all webviews have loaded their content; if that's the case,
	  * removes the loading screen.
	  * @memberof module:Universe/frameManager
	  * @private
	  * @author Rémy Raes
	  **/
	function check_loaded_frames() {
		if(is_ready_to_display()) {
			console.info('All frames have been loaded, hiding the loading screen.');
			setTimeout(_hide_loading_screen, 1000);
		}
	};

	/**
	  * @memberof module:Universe/frameManager
	  * @return {Boolean} is the application fully loaded
	  * @private
	  * @author Rémy Raes
	  **/
	function is_ready_to_display() {
		return frames_loaded === webviews.getViewsCount();
	}

	/**
	  * See public API
	  * @private
	  * @author Rémy Raes
	  **/
	function _hide_loading_screen() {
		loading_logo.style.webkitAnimationPlayState = 'paused';
		loading_screen.style.opacity = '0';
		setTimeout(function() {
			loading_screen.style.zIndex = '-1';
		}, 1000);

		if(first_launch)
			Universe.tutorial.launch_tutorial_mode();
	}


	/**
	  * Hides all webviews.
	  * @memberof module:Universe/frameManager
	  * @private
	  * @author Rémy Raes
	  **/
	function hide_all_frames () {
		home.className = 'category frame';
		let views = webviews.views;
		for (let key in views) {
			views[key].className = 'frame';
		}
	}

	/**
	  * See public API
	  * @private
	  * @author Rémy Raes
	  **/
	function _show_frame(url) {
		hide_all_frames();
		let hash = url.hashCode() + '_frame';
		webviews.views[hash].className = 'frame frame-show';
	}

	/**
	  * See public API
	  * @private
	  * @author Rémy Raes
	  **/
	function _show_home() {
		hide_all_frames();
		home.className = 'homeWrapper frame-show';
	}

	/**
	  * See public API
	  * @private
	  * @author Rémy Raes
	  **/
	function _create_new_frame(site) {
		let url = site.url;
		let frame = document.createElement('webview');

		frame.id = url.hashCode() + '_frame';
		frame.className = 'frame';
		frame.src = url;

		frame.addEventListener('dom-ready', () => {
			console.log('The website \'' + site.name + '\' has been loaded.');
			increment_loaded_frames();
			check_loaded_frames();

			// reset the notification indicator
			Universe.notification.remove_notification_from_site(site);
		});
		frame.addEventListener('page-title-updated', () => {
			if(!frame_is_focused(site.url) && is_ready_to_display() || document.hidden)
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

		Universe.main_wrapper.appendChild(frame);
		webviews.add(url, frame);
	}

	/**
	  * Returns if a webview is focused.
	  * @param {String} url - url of the site webview
	  * @return {Boolean} is the frame focused or not
	  * @memberof module:Universe/frameManager
	  * @private
	  * @author Rémy Raes
	  **/
	function frame_is_focused(url) {
		let hash = url.hashCode() + '_frame';
		let frame = webviews.views[hash];
		return frame.className === 'frame frame-show';
	}

	/**
	  * See public API
	  * @private
	  * @author Rémy Raes
	  **/
	function _delete_frame(site) {
		let node = webviews.get(site.url);
		Universe.main_wrapper.removeChild(node);
		webviews.remove(site.url);
		console.info('Deleting ' + site.name + '.');
	}

	/**
	  * See private API
	  * @private
	  * @author Rémy Raes
	  **/
	function _reset_frame(site) {
		let frame = webviews.get(site.url);
		frame.loadURL(site.url);
		console.info('Frame ' + site.name + ' is resetting.');
	}

	/**
	  * See public API
	  * @private
	  * @author Rémy Raes
	  **/
	function _trigger_tutorial_mode() {
		first_launch = true;
	}



	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	return {

		/**
		  * Hides the loading screen, and launch the tutorial mode if the
		  * application is started for the first time (or reset).
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		hide_loading_screen: () => {
			_hide_loading_screen();
		},

		/**
		  * Hides all frames, and display one.
		  * @param {String} url - URL of the targeted website
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		show_frame: (url) => {
			_show_frame(url);
		},

		/**
		  * Hides all frames, and display the home one.
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		show_home: () => {
			_show_home();
		},

		/**
		  * Creates a webview showing a certain website.
		  * @param {Object} site - Website object
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		create_new_frame: (site) => {
			_create_new_frame(site);
		},

		/**
		  * Deletes a webview.
		  * @param {Object} site - Website object
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		delete_frame: (site) => {
			_delete_frame(site);
		},

		/**
		  * Resets a webview to the url it was registered with.
		  * @param {Object} site - Website object
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		reset_frame: (site) => {
			_reset_frame(site);
		},

		/**
		  * When called, tells to the frameManager to launch tutorial mode as
		  * soon as all webviews are loaded and ready to display.
		  * @memberof module:Universe/frameManager
		  * @public
		  * @author Rémy Raes
		  **/
		trigger_tutorial_mode: () => {
			_trigger_tutorial_mode();
		}

	}

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------

})(Universe || {});
