ipc.on('exit-notification' , function(){
	new Notification('Application still running', {
		body: 'ESNbang! is running in background.',
		icon: 'assets/img/star.png'
	});
});

function add_notification_on_site(url) {
	// check if the notification span exists
	let component = document.getElementById(url_to_css_id(url));
	
	// create it if not
	// +1
}

function remove_notification_from_site(url) {
	// delete the notification span
}