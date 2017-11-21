var ESNbang = ESNbang || {};

/**
  * This module contains all operations linked to manipulation
  * @module ESNbang/frameManager
  * @author Rémy Raes
  **/
ESNbang.frameManager = (function(){
	var _this = {};

	var frames = document.getElementsByTagName('webview');
	var home = document.getElementById('home');

	var frames_count = frames.length;
	var frames_loaded = 0;

	_this.increment_loaded_frames = function() {
		frames_loaded++;
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
	  * @memberof module:ESNbang/frameManager
	  * @author Rémy Raes
	  **/
	_this.check_loaded_frames = function() {
		if(is_ready_to_display()) {
			hide_loading_screen();
		}
	};
	
	function is_ready_to_display() {
		return frames_loaded === frames_count;
	}

	/**
	  * This function hides the loading screen, enabling the user to
	  * access the application functionnalities.
	  * @memberof module:ESNbang/frameManager
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
	  * @memberof module:ESNbang/frameManager
	  * @author Rémy Raes
	  **/
	function hide_all_frames () {
		home.className = 'category frame';
		_this.load_all_frames();
		for(let i=0; i<frames.length; i++)
				frames[i].className = 'frame';
	}


	_this.show_frame = function(url) {
		hide_all_frames();
		_this.load_all_frames();
		for(let i=0; i<frames.length; i++)
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
	  * @memberof module:ESNbang/frameManager
	  * @author Rémy Raes
	  **/
	_this.create_new_frame = function(site) {
		let url = site.url;
		let frame = document.createElement('webview');
		frame.id = url.hashCode() + '_frame';
		frame.className = 'frame';
		frame.setAttribute('data-origin', 'user');
		frame.src = url;

		frame.addEventListener('dom-ready', () => {
			console.log('The website ' + url + ' has been loaded.')
			// frames_loaded++;
			_this.increment_loaded_frames();
			_this.check_loaded_frames();
			
			// reset the notification indicator
			ESNbang.notification.remove_notification_from_site(url.hashCode());
		});
		frame.addEventListener('page-title-updated', () => {
			// updates the application tooltip
			ESNbang.storage.save_site_title(site, frame.getTitle());

			// TODO to fix, some sites will change title several times for one only
			// notification (eg. Facebook when you receive a Messenger message)

			if(!frame_is_focused(site.url.hashCode()) && is_ready_to_display())
				ESNbang.notification.add_notification_on_site(site.url.hashCode());
		});
		frame.addEventListener('page-favicon-updated', (e) => {
			// update the button image
			ESNbang.menu.buttonManager.update_button_image(url.hashCode(), e.favicons[0]);
		});
		frame.addEventListener('mousedown', () => {
			ESNbang.subscription.reset()
		});

		ESNbang.commons.main_wrapper.appendChild(frame);
	};

	/**
	  * This functions tells if a frame is focused.
	  * @param {String} url - hashed url of the site frame
	  * @return {Boolean} is the frame focused or not
	  * @memberof module:ESNbang/frameManager
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
		ESNbang.commons.main_wrapper.removeChild(comp);
	};

	(function initialize_listeners_on_frames() {
		// listeners on the application frames
		for(let i=0; i<frames_count; i++) {
			let tmp = frames[i];

			// listener to check the loaded state of the frame
			tmp.addEventListener('dom-ready', () => {
				console.log('The website ' + tmp.src + ' frame has been loaded.');
				// frames_loaded++;
				_this.increment_loaded_frames();
				_this.check_loaded_frames();
			});

			// listener to hide the 'new site' window
			tmp.addEventListener('mousedown', () => {
				ESNbang.subscription.reset()
			});
		}
	})();


	return _this;
})();
