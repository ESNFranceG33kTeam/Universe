const storage = remote.require('electron-json-storage-sync');


// ----------------------------------------------------------------
// Signals handlers
// ----------------------------------------------------------------

function site_already_registered(registered, site){
	
	let url = site.url;

	if(!registered) {
		create_site_menu_component(site);
		create_site_frame_component(site);
		console.info('Registering the new website ' + url + '.');
		set_overflow_on_menu();
	}

	else if(registered){
		// alert the user
		set_new_site_warning('You\'ve already registered this one.');
		console.warn('The website ' + url + ' has already been registered by the user.');
	}

}

function save_sites(data){
	let p = get_parameters();
	p.sites = data;
	save_parameters(p);
}

ipc.on('save_size' , function(event , data){
	let p = get_parameters();
	p.size = data;
	save_parameters(p);
});

ipc.on('get-params' , function(event , data){
	var settings = get_parameters();
	ipc.send('send_params', settings);
});

ipc.on('build-interface' , function(event , data){
	var settings = get_parameters();
	var sites = settings.sites;

    for(var i=0; i<sites.length; i++) {
        create_site_menu_component(sites[i]);
		create_site_frame_component(sites[i]);
	}
	
	// initializing the language
	let langSelector = document.getElementById('lang-select');
	let lang = settings.language;
	ESNbang.i18n.load_language_file(lang);
	
	// actualisation
	frames_count = document.getElementsByTagName('webview').length;
});



// ----------------------------------------------------------------
// ----------------------------------------------------------------


/**
  * This is the user settings model, used to store all information
  * relative to the user preferences.
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
  * This functions allows the application to save the title of
  * a page that would have changed its own.
  * It also propagates the title change to the tooltip, in the
  * sidebar menu.
  *
  * site JSON object representing the site to update
  * title new title to give to the page
  * @author Rémy Raes
  **/
function save_site_title(site, title) {
	let p = get_parameters();
	for(let i=0; i<p.sites.length; i++)
		if(p.sites[i].url === site.url) {
			if(title != p.sites[i].name)
				save_parameters(p);
			p.sites[i].name = title;
			update_tooltip_title(site.url.hashCode(), title)
			console.info('Updating the title for webpage \'' + site.url + '\'.');
			break;
		}
}

function save_language(lang_code) {
	let p = get_parameters();
	p.language = lang_code;
	save_parameters(p);
}


/**
  * This function saves the user settings on the user local
  * storage.
  * @author Rémy Raes
  **/
function save_parameters(params) {
	console.info('Saving user settings.');
	storage.set('parameters', params);
}

/**
  * This function check if the user has settings stored on
  * its computer, and returns them ; if it's not the case,
  * it returns a new settings object.
  * @author Rémy Raes
  **/
function get_parameters() {

	var settings = storage.get('parameters');

	if(settings !== undefined && settings.status === true) {
		var parameters = settings.data;
		parameters.first_launch = false;

		return parameters;

	} else {

		// first start

		var params = settings_model;
		save_parameters(params);

		return params;
	}
}

/**
  * This function realizes all the tests to see if an url can be
  * subscribed to, or not.
  *
  * url Website address to check
  * @author Rémy Raes
  **/
function subscribe_to_new_site(url) {
	
	var valid = is_valid_url(url);

	if(valid === 'void'){
		set_new_site_warning('You should try to write something in there !');
		console.warn('The "new website subscription" input field is empty.');

	} else if(valid) {
		
		let parameters = get_parameters();
		let sites = parameters.sites;
		let len = sites.length;
		let site = {
			name: get_site_name(url),
			url: url,
			image_url: url
		}
		
		// checking if the site isn't already registered
		for(var i=0; i<len; i++)
			if(sites[i].url === url) {
				site_already_registered(true, site);
				return ;
			}

		site_already_registered(false, site);
		sites.push(site);
		save_sites(sites);
		
	
	} else {
		set_new_site_warning('The URL you entered is not valid.');
		console.warn('The string "' + url + '" is not a valid URL.');
	}
}


/**
  * This function checks if a string is a valid url
  *
  * url String to check
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
  * 
  * url URL to convert to a readable name
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
