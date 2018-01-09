/**
  * This module contains all operations linked to manipulation of the
  * "new subscription" window, which is used for the user to add a new site
  * to its application.
  * @module Universe/subscription
  * @author Rémy Raes
  **/
Universe.subscription = (function () {

	var new_site_window = document.getElementById('new_site');
	var new_url = document.getElementById('subscription_placeholder');
	var new_site_error = document.getElementById('subscription_text');

	/**
	  * See method get_new_site_window().
	  * @private
	  **/
	function _get_new_site_window() {
		return new_site_window;
	};
	/**
	  * See method get_new_url.
	  * @private
	  **/
	function _get_new_url() {
		return new_url;
	}

	/**
	  * See show_new_site_subscription.
	  * @private
	  **/
	function _show_new_site_subscription() {
		Universe.main_wrapper.style.filter = 'brightness(0.4)';
		new_site_window.style.display = 'block';
		new_site_window.style.animationName = 'bounceIn';
	};

	/**
	  * See method reset.
	  * @private
	  **/
	function _reset() {
		Universe.main_wrapper.style.filter = 'none';
		new_site_window.style.animationName = 'bounceOut';
		new_site_error.innerText = Universe.i18n.errorMessages.subscription_default_message;
		new_site_error.style.color = 'inherit';
		new_url.value = '';
	};

	/**
	  * See set_new_site_warning.
	  * @private
	  **/
	function _set_new_site_warning(message) {
		new_site_window.style.animationName = 'bounceOut';
		setTimeout(function() {
			new_site_window.style.animationName = 'bounceWarning';
		}, 20);

		new_site_error.style.color = 'red';
		new_site_error.innerText = message;
	};



	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	return {

		/**
		  * Returns the HTML component corresponding to the new site window.
		  * @return {HTML} menu
		  * @memberof module:Universe/menu
		  * @public
		  * @author Rémy Raes
		  **/
		get_new_site_window: () => {
			return _get_new_site_window();
		},

		/**
		  * Returns the HTML component corresponding to the new URL e,tered by the
		  * user.
		  * @return {HTML} menu
		  * @memberof module:Universe/menu
		  * @public
		  * @author Rémy Raes
		  **/
		get_new_url: function() {
			return _get_new_url();
		},

		/**
		  * Makes the subscription window appear.
		  * @author Rémy Raes
		  * @memberof module:Universe/subscription
		  * @public
		  **/
		show_new_site_subscription: () => {
			_show_new_site_subscription();
		},

		/**
		  * Initializes the subscription window (style, animation, tooltip text).
		  * @memberof module:Universe/subscription
		  * @author Rémy Raes
		  * @public
		  **/
		reset: () => {
			_reset();
		},

		/**
		  * Sets a warning state on the subscription window.
		  * @param {String} message - The message to display to the user
		  * @memberof module:Universe/subscription
		  * @author Rémy Raes
		  * @public
		  **/
		set_new_site_warning: (message) => {
			_set_new_site_warning(message);
		}
	}

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------

})(Universe || {});
