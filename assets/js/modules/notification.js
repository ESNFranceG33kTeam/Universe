const dialog = remote.dialog;
const platform = require('os').platform();

/**
  * This modules contains all operations linked to communication of
  * information to the user, being by desktop or site notifications.
  * @module Universe/notification
  * @author Rémy Raes
  **/
Universe.notification = (function () {

	// Listener that sends notification informing the user that the
	// application is running in background.

	ipc.on('exit-notification' , function(){
		// Universe.frameManager.show_home();
		if(platform == 'win32') {
			ipc.send('tray_notif', {
		        icon: __dirname + '/assets/img/icons/logo.png',
		        title: Universe.i18n.notificationMessages.notification_running_title,
		        content: Universe.i18n.notificationMessages.notification_running_text
		    });
		} else {
			new Notification(Universe.i18n.notificationMessages.notification_running_title, {
				body: Universe.i18n.notificationMessages.notification_running_text,
				icon: 'assets/img/icons/logo.png'
			});
		}
	});

	/**
	  * Sends a notification informing the user that a certain website has
	  * received news.
	  * @memberof module:Universe/notification
	  * @author Rémy Raes
	  * @private
	  **/
	function _send_notification(site) {
		console.log('Sending notification for site \'' + site.name + '\'.');
		if(platform === 'win32') {
			ipc.send('tray_notif', {
		        //icon: site.image_url, // doesn't work with other image formats
				icon: __dirname + '/assets/img/icons/logo.png',
		        title: Universe.i18n.notificationMessages.new_notification_title,
		        content: Universe.i18n.notificationMessages.new_notification_text + ' ' + site.name
		    });
		} else {
			new Notification(Universe.i18n.notificationMessages.new_notification_title, {
				body: Universe.i18n.notificationMessages.new_notification_text + ' ' + site.name,
				icon: site.image_url
			});
		}
	}

	/**
	  * See public method add_notification_on_site().
	  * @private
	  **/
	function _add_notification_on_site(site) {

		let url = site.url.hashCode();

		// check if the notification span exists
		let component = document.getElementById(url);
		if(component === null) {
			return ;
		}

		let child_nodes = component.getElementsByClassName('new_item');

		// create it if not
		if(child_nodes.length === 0) {
			let spa = document.createElement("SPAN");
			spa.innerText = '!';
			spa.className = 'new_item';
			component.appendChild(spa);
		}

		console.log('Adding notification on site \'' + site.name + '\'.');

		/*
		Disabling notifications count :
		to fix, some sites will change title several times for one only
		notification (eg. Facebook when you receive a Messenger message)

		// +1
		else {
			let spa = component.getElementsByClassName('new_item')[0];
			spa.innerText = parseInt(spa.innerText) + 1;
		}
		*/
		if(!site.muted)
			_send_notification(site);

	}

	/**
	  * See public method remove_notification_from_site().
	  * @private
	  **/
	function _remove_notification_from_site(site) {
		// delete the notification span
		let component = document.getElementById(site.url.hashCode());
		let spa = component.getElementsByClassName('new_item');

		if(spa.length === 1)
			component.removeChild(spa[0]);
	}



	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	return {

		/**
		  * Creates notification on a website button, to signal to the user
		  * something happened (eg: a new publication).
		  * @param {Object} site - Website object
		  * @memberof module:Universe/notification
		  * @author Rémy Raes
		  * @public
		  **/
		add_notification_on_site: (site) => {
			_add_notification_on_site(site);
		},

		/**
		  * Removes the notification object from a website button (eg: when the user
		  * has read everything on the node).
		  * @param {Object} site - Website object
		  * @memberof module:Universe/notification
		  * @author Rémy Raes
		  * @public
		  **/
		remove_notification_from_site: (site) => {
			_remove_notification_from_site(site);
		}
	}

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------

})(Universe || {});
