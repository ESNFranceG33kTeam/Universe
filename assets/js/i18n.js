let fs = require('fs');
var ESNbang = ESNbang || {};

/**
  *	This module allows the application content to be translated to multiple languages.
  * If you want to introduce translations for another element than those initialized
  * in i18n, you have to give it an id in the HTML code, to reference it in i18n, and
  * then to write your translations.
  *
  * @author Rémy Raes
  **/
ESNbang.i18n = (function() {
	var _this = {};
	
	let lang_folder = 'i18n/';
	let flags_folder = 'i18n/flags/';

	_this.langSelect = new IconSelect("lang-select");

	// loading the language selector
	window.onload = function(){

		var icons = [];
		
		fs.readdir(flags_folder, (err, files) => {
			let i = 0;
			files.forEach(file => {
				let lang = file.substr(0, file.length-4);
				icons.push({'iconFilePath': flags_folder + file, 'iconValue': i, 'iconLang': lang});
				i++;
			});
			_this.langSelect.refresh(icons);
			ESNbang.i18n.langSelect.setSelectedLanguage(get_parameters().language);
		});
	};

	// HTML elements to translate
	let home_message = document.getElementById('home_message');
	let home_tooltip = document.getElementById('home_tooltip');
	let subscription_tooltip = document.getElementById('subscription_tooltip');
	let subscription_placeholder = document.getElementById('subscription_placeholder');
	let subscription_text = document.getElementById('subscription_text');
	let subscription_button_text = document.getElementById('subscription_button_text');


	/**
	  * This function launches the loading of a file containing translations of the
		* application texts in a certain language.
		* Once the file is loaded, it launches the live translation of the texts;
		* if it doesn't exists, the function exits.
		*
		* lang_code code representing a language
		* @author Rémy Raes
		**/
	_this.load_language_file = function (lang_code) {

		fs.readFile('i18n/' + lang_code + '.json', 'utf8', function (err,data) {
		  if (err) {
				console.error('Failed to change current language: the file \'' + lang_code + '.json\' doesn\'t exist.');
				return ;
		  }
		  console.info('Changing the application language to \'' + lang_code + '\'.');
		  _this.change_language(JSON.parse(data));
		  save_language(lang_code);
		});
	}

	/**
	  * This function allows the application to switch the text of certain elements to
	  * enable the understanding of it for differents languages.
	  *
	  * json JSON String containing all variables translated in a certain language
	  * @author Rémy Raes
	  **/
	_this.change_language = function(json) {

		home_message.innerHTML = json['home_message'];
		home_tooltip.innerText = json['home_tooltip'];
		subscription_tooltip.innerText = json['subscription_tooltip'];
		subscription_placeholder.placeholder = json['subscription_placeholder'];
		subscription_text.innerText = json['subscription_text'];
		subscription_button_text.innerText = json['subscription_button_text'];
	};

	
	// TODO ajouter une fonction qui fournit les traductions des messages de la fenetre d'inscription

	return _this;

})(ESNbang || {});
