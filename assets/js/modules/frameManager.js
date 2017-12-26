var Universe = Universe || {};

/**
  * This module contains all operations linked to manipulation
  * @module Universe/frameManager
  * @author Rémy Raes
  **/
Universe.frameManager = (function(){
	var _this = {};

	var frames = document.getElementsByTagName('webview');
	var home = document.getElementById('home');
	var loadingBar = new ldBar("#loading_bar");
	// loadingBar.set(0);

	var frames_count = frames.length;
	var frames_loaded = 0;

	function increment_loaded_frames() {
		frames_loaded++;
		loadingBar.set(
			(frames_loaded/frames_count)*100
		);
	};

	_this.load_all_frames = function() {
		frames = document.getElementsByTagName('webview');
		frames_count = frames.length;
	};


	var loading_screen = document.getElementById('loading');
	var loading_logo = document.getElementById('loading_logo');

	/**
	  * This function check if all iframes have loaded their content;
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
		return frames_loaded === frames_count;
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
	}

	/**
	  * This function hides all application frames.
	  * @memberof module:Universe/frameManager
	  * @author Rémy Raes
	  **/
	function hide_all_frames () {
		home.className = 'category frame';
		_this.load_all_frames();
		for(let i=0, length=frames.length; i<length; i++)
				frames[i].className = 'frame';
	}


	_this.show_frame = function(url) {
		hide_all_frames();
		_this.load_all_frames();
		for(let i=0, length=frames.length; i<length; i++)
			if(frames[i].id === url) {
				frames[i].className = 'frame frame-show';
				_update_style(frames[i]);
				return ;
			}
	};

	_this.show_home = function() {
		hide_all_frames();
		home.className = 'category frame-show';
	};

	function _update_style(component) {
		component.shadowRoot.querySelector('object').style.width = '100%';
		component.shadowRoot.querySelector('object').style.height = '100%';
	}

	/**
	  * This function creates a frame encapsulating a website
	  * on the side menu.
	  * @param {String} site - The URL of the new website
	  * @memberof module:Universe/frameManager
	  * @author Rémy Raes
	  **/
	_this.create_new_frame = function(site, is_main_website) {
		let url = site.url;
		let frame = document.createElement('webview');
		frame.id = url.hashCode() + '_frame';
		frame.className = 'frame';
		if(is_main_website)
			frame.setAttribute('data-origin', 'application');
		else
			frame.setAttribute('data-origin', 'user');

		frame.src = url;

		frame.addEventListener('dom-ready', () => {
			console.log('The website ' + url + ' has been loaded.');
			increment_loaded_frames();
			check_loaded_frames();

			// reset the notification indicator
			Universe.notification.remove_notification_from_site(url.hashCode());
		});
		frame.addEventListener('page-title-updated', () => {
			if(!frame_is_focused(site.url.hashCode()) && is_ready_to_display())
				Universe.notification.add_notification_on_site(site);

			// updates the application tooltip
			Universe.storage.save_site_title(site, frame.getTitle());
		});
		frame.addEventListener('page-favicon-updated', (e) => {
			// update the button image
			Universe.menu.buttonManager.update_button_image(site, e.favicons[0]);
		});
		frame.addEventListener('mousedown', () => {
			Universe.subscription.reset()
		});

		Universe.commons.main_wrapper.appendChild(frame);
		Universe.frameManager.load_all_frames();
	};

	/**
	  * This functions tells if a frame is focused.
	  * @param {String} url - hashed url of the site frame
	  * @return {Boolean} is the frame focused or not
	  * @memberof module:Universe/frameManager
	  **/
	function frame_is_focused(url) {
		let frame = undefined;
		for(let i=0; i<frames_count; i++)
			if(frames[i].id === url + '_frame') {
				frame = frames[i];
				break;
			}
		if(frame === undefined) {
			console.warn('Frame ' + url + ' not found.');
			return;
		}
		return frame.className === 'frame frame-show';
	}

	_this.delete_frame = function(url) {
		let comp = document.getElementById(url);
		Universe.commons.main_wrapper.removeChild(comp);
	};

	(function initialize_listeners_on_frames() {
		// listeners on the application frames
		for(let i=0; i<frames_count; i++) {
			let tmp = frames[i];

			// listener to check the loaded state of the frame
			tmp.addEventListener('dom-ready', () => {
				console.log('The website ' + tmp.src + ' frame has been loaded.');
				increment_loaded_frames();
				check_loaded_frames();
			});

			// listener to hide the 'new site' window
			tmp.addEventListener('mousedown', () => {
				Universe.subscription.reset()
			});
		}
	})();


	return _this;
})();
