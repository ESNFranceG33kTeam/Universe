const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;

document.getElementById('notif').addEventListener('click', function() {
	new Notification('Une r�ponse a �t� post�e !', {
		body: 'Bonjour, ceci est un test !',
		icon: 'assets/img/star.png'
	});
});