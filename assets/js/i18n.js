let fs = require('fs');
var ESNbang = ESNbang || {};
let langSelect;

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

	// loading the language selector
  window.onload = function(){

      langSelect = new IconSelect("lang-select");

      var icons = [];
			icons.push({'iconFilePath':'i18n/flags/enGB.png', 'iconValue':'1'});
      icons.push({'iconFilePath':'i18n/flags/frFR.png', 'iconValue':'2'});

      langSelect.refresh(icons);

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
		  _this.change_language(JSON.parse(data));
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


	return _this;

})(ESNbang || {});
