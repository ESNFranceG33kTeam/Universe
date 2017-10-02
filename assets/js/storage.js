const storage = remote.require('electron-json-storage-sync');

/*
var parameters = {
	size : {
		width: 0,
		height: 0,
		maximised: false
	},
	
	sites: []
}
*/

function save_parameters(params) {
	storage.set('parameters', params);
}

function get_parameters() {
	
	var settings = storage.get('parameters');
	
	if(settings !== undefined && settings.status === true) {
		var parameters = settings.data;
		parameters.first_launch = false;
		
		return parameters;
		
	} else {
		
		// first start
		var parameters = {
			size : {
				width: 920,
				height: 535,
				maximized: false
			},
			
			sites: [],
			first_launch: true
		};
		
		save_parameters(parameters);
		return parameters;
	}
}

function subscribe_to_new_site(url) {
	var valid = is_valid_url(url);	
	
	if(valid === 'void'){
		set_new_site_warning('You should try to write something in there !');
		console.log('input vide');
	
	} else if(valid)
		ipc.send('add_new_site', url);
	
	else {
		set_new_site_warning('The URL you entered is not valid.');
		console.log('lien non valide');
	}
}

ipc.on('site_already_registered' , function(event, registered, url){
	
	if(!registered) {
		create_site_menu_component(url);
		console.log('enregistrement de ' + url);
		set_overflow_on_menu();
	}

	else if(registered){
		// alert the user
		set_new_site_warning('You\'ve already registered this one.');
	} 
	
});

ipc.on('save' , function(event , data){
	console.info('save');
	save_parameters(data);
});
ipc.on('get-params' , function(event , data){
	var settings = get_parameters();
	var sites = settings.sites;

	ipc.send('send_params', settings);
    for(var i=0; i<sites.length; i++) {
        create_site_menu_component(sites[i]);
	}

});


function is_valid_url(url) {
	
	var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ ;
	
	if(url == '')
		return 'void';
	
	if(url.match(regex))
		return true;
	else
		return false;
}