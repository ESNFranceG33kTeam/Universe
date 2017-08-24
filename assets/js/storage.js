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
	console.log(params.size);
	localStorage.setItem('parameters', JSON.stringify(params));
}

function get_parameters() {
	
	var params = localStorage.getItem('parameters');
	
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

function add_site(params, url) {
	params.sites.push(url);
}

ipc.on('save' , function(event , data){
	save_parameters(data);
});
ipc.on('get-params' , function(event , data){
	ipc.send('send_params', get_parameters());
});