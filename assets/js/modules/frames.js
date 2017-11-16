var ESNbang = ESNbang || {};

ESNbang.frames = (function(){
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
	}
	
	
	var loading_screen = document.getElementById('loading');
	var loading_logo = document.getElementById('loading_logo');
	
	/**
	  * This function check if all iframes have loaded their content;
	  * if that's the case, it removes the loading screen.
	  * @author Rémy Raes
	  **/
	_this.check_loaded_frames = function() {
		if(frames_loaded === frames_count) {
			hide_loading_screen();
		}
	}
	
	/**
	  * This function hides the loading screen, enabling the user to
	  * access the application functionnalities.
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
		_this.load_all_frames()
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
			ESNbang.frames.increment_loaded_frames();
			ESNbang.frames.check_loaded_frames();
		});
		frame.addEventListener('page-title-updated', () => {
			// updates the application tooltip
			save_site_title(site, frame.getTitle());

			// TODO to fix, some sites will change title several times for one only
			// notification (eg. Facebook when you receive a Messenger message)
			
			// TODO if the page isn't focused
			ESNbang.notification.add_notification_on_site(site.url.hashCode());
		});
		frame.addEventListener('page-favicon-updated', (e) => {
			// update the button image
			ESNbang.menu.siteButton.update_button_image(url.hashCode(), e.favicons[0]);
		});
		frame.addEventListener('mousedown', () => {
			ESNbang.subscription.reset()
		});

		ESNbang.commons.main_wrapper.appendChild(frame);
	};
	
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
				ESNbang.frames.increment_loaded_frames();
				ESNbang.frames.check_loaded_frames();
			});

			// listener to hide the 'new site' window
			tmp.addEventListener('mousedown', () => {
				reset_new_site_subscription()
			});
		}
	})();

	
	return _this;
})();