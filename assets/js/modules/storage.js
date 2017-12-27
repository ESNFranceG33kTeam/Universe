var Universe = Universe || {};

/**
  * This module contains all operations linked to manipulation of user
	* settings and their storage.
	* @module Universe/storage
	* @author Rémy Raes
	**/
Universe.storage = (function () {

	var _this = {};

	/**
	  * This function handles all signals sended by other modules to save
	  * user settings.
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	(function storage_handlers() {

		ipc.on('save_size' , function(event , data){
			let p = _this.get_parameters();
			p.size = data;
			store_parameters(p);
		});

		ipc.on('get-params' , function(event , data){
			var settings = _this.get_parameters();
			ipc.send('send_params', settings);
		});

		ipc.on('build-interface' , function(event , data){
			var settings = _this.get_parameters();
			var sites = settings.sites;

			Universe.commons.build(sites);
		});

	})();



	/**
	  * This is the user settings model, used to store all information
	  * relative to the user preferences.
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	var settings_model = {

		// object containing size information of the application window
		size : {
			width: 0,
			height: 0,
			maximized: false
		},

		// array containing all websites the user has subscribed to
		sites: [],

		// is it the first time the user launches the application ?
		first_launch: true,

		// language of the application
		language: 'enGB'
	}


	/**
	  * This function saves user settings when its subscripted sites have been
	  * changed.
	  * @param {JSON} data - Object containing all user websites
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	function save_sites(data){
		let p = _this.get_parameters();
		p.sites = data;
		store_parameters(p);
	}

	/**
	  * This function does the initialization of a new component, if the site given
		* hasn't been registered yet.
		* @param {Boolean} registered - is the site already registered ?
		* @param {JSON} site - JSON representing a website
		* @memberof module:Universe/storage
		* @author Rémy Raes
		**/
	function site_already_registered(registered, site){

		let url = site.url;

		if(!registered) {
			Universe.menu.buttonManager.create_new_button(site, false);
			Universe.frameManager.create_new_frame(site, false);

			console.info('Registering the new website ' + url + '.');
			Universe.menu.set_overflow_on_menu();
		}

		else if(registered){
			// alert the user
			Universe.subscription.set_new_site_warning(Universe.i18n.errorMessages.subscription_already_done);
			console.warn('The website ' + url + ' has already been registered by the user.');
		}

	}

	/**
	  * This functions allows the application to save the title of
	  * a page that would have changed its own.
	  * It also propagates the title change to the tooltip, in the
	  * sidebar menu.
	  * @param {JSON} site - JSON object representing the site to update
	  * @param {String} title - new title to give to the page
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	_this.save_site_title = function(site, title) {
		let p = _this.get_parameters();
		for(let i=0, length=p.sites.length; i<length; i++)
			if(p.sites[i].url === site.url) {
				if(title != p.sites[i].name)
					store_parameters(p);
				p.sites[i].name = title;
				Universe.menu.buttonManager.update_tooltip_title(site.url.hashCode(), title)
				console.info('Updating the title for webpage \'' + site.url + '\'.');
				break;
			}
	}

	/**
	  * This function saves user settings when the application language
	  * is changing.
	  * @param {String} lang_code - code of the current language
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	_this.save_language = function(lang_code) {
		let p = _this.get_parameters();
		p.language = lang_code;
		store_parameters(p);
	}

	/**
	  * This function is the public method that enables modules to save
	  * user settings.
	  * @param {JSON} params - Object containing the user settings, following the pattern settings_model
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	_this.save_parameters = function(params) {
		store_parameters(params);
	}
	/**
	  * This function saves the user settings on the user local
	  * storage.
	  * @param {JSON} params - JSON representing user settings
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	function store_parameters(params) {
		console.info('Saving user settings.');
		storage.set('parameters', params);
	}

	/**
	  * This function check if the user has settings stored on
	  * its computer, and returns them ; if it's not the case,
	  * it returns a new settings object.
	  * @return {JSON} a JSON object representing user settings
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	_this.get_parameters = function() {

		var settings = storage.get('parameters');

		if(settings !== undefined && settings.status === true) {
			var parameters = settings.data;
			parameters.first_launch = false;

			return parameters;

		} else {

			// first start

			var params = settings_model;
			store_parameters(params);

			return params;
		}
	}

	/**
	  * This function realizes all the tests to see if an url can be
	  * subscribed to, or not.
	  * @param {String} url - Website address to check
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	_this.subscribe_to_new_site = function(url) {

		var valid = is_valid_url(url);

		if(valid === 'void'){
			Universe.subscription.set_new_site_warning(Universe.i18n.errorMessages.subscription_empty_message);
			console.warn('The "new website subscription" input field is empty.');

		} else if(valid) {

			let parameters = _this.get_parameters();
			let sites = parameters.sites;
			let site = {
				name: get_site_name(url),
				url: url,
				image_url: url,
				muted: false
			}

			// checking if the site isn't already registered
			for(let i=0, len = sites.length; i<len; i++)
				if(sites[i].url === url) {
					site_already_registered(true, site);
					return ;
				}

			site_already_registered(false, site);
			sites.push(site);
			save_sites(sites);


		} else {
			Universe.subscription.set_new_site_warning(Universe.i18n.errorMessages.subscription_url_not_valid);
			console.warn('The string "' + url + '" is not a valid URL.');
		}
	}


	/**
	  * This function checks if a string is a valid url.
	  * @param {String} url - String to check
	  * @return {Boolean} is the parameter a valid url or not
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	function is_valid_url(url) {

		var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ ;

		if(url == '')
			return 'void';

		if(url.match(regex))
			return true;
		else
			return false;
	}

	/**
	  * This functions returns a temporary site name, based on its URL
	  * (for example, using 'https://www.facebook.com' will return
	  * 'Facebook').
	  * @param {String} url - URL to convert to a readable name
	  * @return {String} A human readable string reprensenting the URL
	  * @memberof module:Universe/storage
	  * @author Rémy Raes
	  **/
	function get_site_name(url) {
		let domain = url.split('/')[2];
		let tmp = domain.split('.');
		let ret = null;

		if(tmp.length > 2)
			ret = tmp[tmp.length-2];
		else
			ret = tmp[0];

		return ret.substr(0, 1).toUpperCase() + ret.substr(1, ret.length-1);
	}
	return _this;
})();
