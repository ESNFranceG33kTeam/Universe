const ipc = require('electron').ipcRenderer;

/*
var parameters = {
	size : {
		width: 0,
		height: 0
	},
	
	sites: []
}
*/

function save_parameters(params) {
	if(DOMisReady) // otherwise the settings storage will not be guaranteed
		window.localStorage.setItem('parameters', JSON.stringify(params));
}

function get_parameters() {
	
	var params = window.localStorage.getItem('parameters');
	
	// first start
	if(params === null) {
		
		var parameters = {
			size : {
				width: 920,
				height: 535
			},
			
			sites: []
		};
		
		return parameters;
		
	} else {
		return JSON.parse(params);
	}
}

function subscribe_to_new_site(url) {
	if(is_valid_url(url))
		ipc.send('add_new_site', url);
	else
		console.log('lien non valide');
}

ipc.on('site_already_registered' , function(event, registered, url){
	
	if(!registered)
		create_site_menu_component(url);
	
	else if(registered){
		// alert the user
		console.log('déjà abo');
		
	} 
	
});

ipc.on('save' , function(event , data){
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
	if(url === '')
		return 'void';
	
	if(url.match(regex))
		return true;
}

