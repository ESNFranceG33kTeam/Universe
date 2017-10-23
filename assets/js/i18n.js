var ESNbang = ESNbang || {};

ESNbang.i18n = (function() {
	var _this = {};	
	
	let home_message = document.getElementById('home_message');
	let home_tooltip = document.getElementById('home_tooltip');
	let subscription_tooltip = document.getElementById('subscription_tooltip');
	let subscription_placeholder = document.getElementById('subscription_placeholder');
	let subscription_text = document.getElementById('subscription_text');
	let subscription_button_text = document.getElementById('subscription_button_text');
	
	
	let translations = {
	
		home_message: {
			enGB: 'Welcome to ESNbang!, the new application for members of the Erasmus Student Network !<br /><br />' + 
					'This application gathers many tools used every day by ESNers, everything is at the same place, no need to search for the tools anymore !<br />' +
					'ESNbang! can also send you notifications: it listens to information sources (Facebook pages, livestreams, etc) and can tell you when something is happening ! ' +
					'Moreover, when you close its main frame, the application doesn\'t close itself, but rather goes background on your computer, still listening for news :)',
			
			frFR: 'Bienvenue sur ESNbang!, la nouvelle application pour les membres de la grande famille de ESN ! <br /><br />' +
					'Cette application rassemble les outils utilisés tous les jours par les ESNers au même endroit, plus besoin de perdre du temps à retrouver les URL ! <br />' +
					'ESNbang! peut aussi t\'envoyer des notifications et t\'informer lorsque quelque chose arrive sur un de tes sites préférés ! ' +
					'De plus, quand tu fermes la fenêtre, l\'application ne se ferme pas, mais continue à tourner en arrière-plan, toujours à l\'écoute de nouvelles :)'
		},
		
		home_tooltip: {
			enGB: 'Home',
			frFR: 'Accueil'
		},
		
		subscription_tooltip: {
			enGB: 'Subscribe to a news feed',
			frFR: 'Ajouter une nouvelle source'
		},
		subscription_placeholder: {
			enGB: 'Website URL',
			frFR: 'Adresse du site'
		},
		subscription_text: {
			enGB: 'Insert here a news feed you want to follow.',
			frFR: 'Ecris ici un site que tu veux suivre.'
		},
		subscription_button_text: {
			enGB: 'Subscribe',
			frFR: 'S\'abonner'
		}
	};
	
	
	_this.change_language = function(lang_code) {
		let lang = lang_code;
		home_message.innerHTML = translations.home_message[lang];
		home_tooltip.innerText = translations.home_tooltip[lang];
		subscription_tooltip.innerText = translations.subscription_tooltip[lang];
		subscription_placeholder.placeholder = translations.subscription_placeholder[lang];
		subscription_text.innerText = translations.subscription_text[lang];
		subscription_button_text.innerText = translations.subscription_button_text[lang];
	};
	
	return _this;	
	
})(ESNbang || {});