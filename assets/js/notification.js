ipc.on('exit-notification' , function(){
	new Notification('Application still running', {
		body: 'ESNbang! is running in background.',
		icon: 'assets/img/star.png'
	});
});