/**
  *	This module allows the application content to be translated to multiple languages.
  * If you want to introduce translations for another element than those initialized
  * in i18n, you have to give it an id in the HTML code, to reference it in i18n, and
  * then to write your translations.
  * @module Universe/i18n
  * @author Rémy Raes
  **/
Universe.i18n = (function() {
	var _this = {};

	let lang_folder = path.join(__dirname, 'i18n');
	let flags_folder = path.join(__dirname, 'i18n', 'flags');

	// language selector element
	_this.langSelect = new IconSelect("lang-select");

	// variable containing messages for the "new subscription" window
	_this.errorMessages = {
		subscription_default_message: '',
		subscription_empty_message: '',
		subscription_error_already_done: '',
		subscription_url_not_valid: ''
	};

	// variable containing messages for notifications
	_this.notificationMessages = {
		notification_running_title: '',
		notification_running_text: '',
		new_notification_title: '',
		new_notification_text: ''
	};

	// variable containing messages for the tutorial mode
	_this.tutorialMessages = {
		buttons: {
			exit: '',
			previous: '',
			next: ''
		}
	};

	// loading the language selector
	(function(){

		var icons = [];

		fs.readdir(flags_folder, (err, files) => {
			let i = 0;
			files.forEach(file => {
				let lang = file.substr(0, file.length-4);
				icons.push({'iconFilePath': path.join(flags_folder, file), 'iconValue': i, 'iconLang': lang});
				i++;
			});
			_this.langSelect.refresh(icons);
			let lang = Universe.storage.get_parameters().language;
			Universe.i18n.langSelect.setSelectedLanguage(lang);

			// initializing language
			Universe.i18n.load_language_file(lang);
		});
	})();

	// HTML elements to translate
	let home_message = document.getElementById('home_message');
	let home_tooltip = document.getElementById('home_tooltip');
	let subscription_tooltip = document.getElementById('subscription_tooltip');
	let subscription_placeholder = document.getElementById('subscription_placeholder');
	let subscription_text = document.getElementById('subscription_text');
	let subscription_button_text = document.getElementById('subscription_button_text');


	/**
	  * Launches the loading of a file containing translations of the
	  * application texts in a certain language.
	  * Once the file is loaded, launches the live translation of the texts;
	  * if it doesn't exists, exits.
	  * @param {String} lang_code - code representing a language
  	  * @author Rémy Raes
	  * @public
	  * @memberof module:Universe/i18n
	  **/
	_this.load_language_file = function (lang_code) {

		fs.readFile(path.join(lang_folder, (lang_code + '.json')), 'utf8', function (err,data) {
		  if (err) {
				console.error('Failed to change current language: the file \'' + lang_code + '.json\' doesn\'t exist.');
				return ;
		  }
		  console.info('Changing the application language to \'' + lang_code + '\'.');
		  change_language(JSON.parse(data));
		  Universe.storage.save_language(lang_code);
		});
	}

	/**
	  * Allows the application to switch the text of certain elements to
	  * enable the understanding of it for differents languages. 
	  * @param {JSON} json - Object containing all variables translated in a certain language
	  * @private
	  * @author Rémy Raes
	  * @memberof module:Universe/i18n
	  **/
	  function change_language(json) {

		// loading the translations into the application
		home_message.innerHTML = json['home_message'];
		home_tooltip.innerText = json['home_tooltip'];
		subscription_tooltip.innerText = json['subscription_tooltip'];
		subscription_placeholder.placeholder = json['subscription_placeholder'];
		subscription_text.innerText = json['subscription_text'];
		subscription_button_text.innerText = json['subscription_button_text'];

		// loading in memory the messages for the "new subscription" window
		_this.errorMessages.subscription_default_message = json['subscription_text'];
		_this.errorMessages.subscription_empty_message = json['subscription_error_empty_message'];
		_this.errorMessages.subscription_already_done = json['subscription_error_already_done'];
		_this.errorMessages.subscription_url_not_valid = json['subscription_error_url_not_valid'];

		// loading in memory messages for notifications
		_this.notificationMessages.notification_running_title = json['notification_application_still_running_title'];
		_this.notificationMessages.notification_running_text = json['notification_application_still_running_text'];
		_this.notificationMessages.new_notification_title = json['new_notification_title'];
		_this.notificationMessages.new_notification_text = json['new_notification_text'];

		// loading in memory messages for the tutorial mode
		_this.tutorialMessages = {
			main: {
				title: json['tutorial_main_title'],
				body: json['tutorial_main_body']
			},
			menu: {
				title: json['tutorial_menu_title'],
				body: json['tutorial_menu_body']
			},
			section: {
				title: json['tutorial_section_title'],
				body: json['tutorial_section_body']
			},
			settingsMode: {
				title: json['tutorial_settings_mode_title'],
				body: json['tutorial_settings_mode_body']
			},
			addsite: {
				title: json['tutorial_addsite_title'],
				body: json['tutorial_addsite_body']
			},
			newsite: {
				title: json['tutorial_newsite_title'],
				body: json['tutorial_newsite_body']
			},
			end: {
				title: json['tutorial_end_title'],
				body: json['tutorial_end_body']
			},

			buttons: {
				exit: json['tutorial_buttons_exit'],
				previous: json['tutorial_buttons_previous'],
				next: json['tutorial_buttons_next']
			}
		};

	};

	return _this;

})(Universe || {});
