const dialog = remote.dialog;
const platform = require('os').platform();

/**
  * This modules contains all operations linked to communication of
  * information to the user, being by desktop or site notifications.
  * @module Universe/notification
  * @author Rémy Raes
  **/
Universe.notification = (function () {

	var _this = {};

	ipc.on('exit-notification' , function(){
		Universe.frameManager.show_home();
		if(platform == 'win32') {
			ipc.send('tray_notif', {
		        icon: __dirname + '/assets/img/icons/star.png',
		        title: Universe.i18n.notificationMessages.notification_running_title,
		        content: Universe.i18n.notificationMessages.notification_running_text
		    });
		} else {
			new Notification(Universe.i18n.notificationMessages.notification_running_title, {
				body: Universe.i18n.notificationMessages.notification_running_text,
				icon: 'assets/img/icons/star.png'
			});
		}
	});

	function send_notification(site) {
		if(platform === 'win32') {
			ipc.send('tray_notif', {
		        //icon: site.image_url, // doesn't work with other image formats
				icon: __dirname + '/assets/img/icons/star.png',
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
	  * This function creates notification on a website node, to signal
	  * to the user something happened (eg: a new publication).
	  * @param {String} url - Address of the website from which to add notification
	  * @memberof module:Universe/notification
	  * @author Rémy Raes
	  **/
	_this.add_notification_on_site = function(site) {

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
			send_notification(site);

	}

	/**
	  * This function removes the notification object from a website
	  * node (eg: when the user has read everything on the node).
	  * @param {String} url - Address of the website from which to remove notification
	  * @memberof module:Universe/notification
	  * @author Rémy Raes
	  **/
	_this.remove_notification_from_site = function(site) {
		// delete the notification span
		let component = document.getElementById(site.url.hashCode());
		let spa = component.getElementsByClassName('new_item');

		if(spa.length === 1)
			component.removeChild(spa[0]);
	}

	return _this;

})(Universe || {});
