ipc.on('exit-notification' , function(){
	new Notification('Application still running', {
		body: 'ESNbang! is running in background.',
		icon: 'assets/img/star.png'
	});
});

function add_notification_on_site(url) {
	// check if the notification span exists
	let component = document.getElementById(url_to_css_id(url));
	let child_nodes = component.getElementsByTagName('SPAN');
	
	// create it if not
	if(child_nodes.length === 0) {
		let spa = document.createElement("SPAN");
		spa.innerText = 1;
		spa.className = 'new_item';
		component.appendChild(spa);
	}
	
	// +1
	else {
		let spa = child_nodes[0];
		spa.innerText = parseInt(spa.innerText) + 1;
	}
	
}

function remove_notification_from_site(url) {
	// delete the notification span
	let component = document.getElementById(url_to_css_id(url));
	let spa = component.getElementsByTagName("SPAN");
	
	if(spa.length != 0)
		component.removeChild(spa[0]);
}