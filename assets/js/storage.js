const storage = remote.require('electron-json-storage-sync');


// ----------------------------------------------------------------
// Signals handlers
// ----------------------------------------------------------------

ipc.on('site_already_registered' , function(event, registered, url){

	if(!registered) {
		create_site_menu_component(url);
		create_site_frame_component(url);
		console.info('Registering the new website ' + url + '.');
		set_overflow_on_menu();
	}

	else if(registered){
		// alert the user
		set_new_site_warning('You\'ve already registered this one.');
		console.warn('The website ' + url + ' has already been registered by the user.');
	}

});

ipc.on('save' , function(event , data){
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
	// TODO update the selector flag
	ESNbang.i18n.load_language_file(settings.language);
	
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

	} else if(valid)
		ipc.send('add_new_site', url);

	else {
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
