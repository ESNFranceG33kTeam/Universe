const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

var KonamiCode = require( "konami-code" );

const konami = new KonamiCode();
konami.listen(function () {
	remote.getCurrentWindow().webContents.openDevTools();
	console.info('Dev tools have been opened :)');
});


var frames_loaded = 0;
var sites_added = 0;

// ----------------------------------------------------------------
// initializing all application components
// ----------------------------------------------------------------

var main_wrapper = document.getElementById('main_wrapper');
var new_site_window = document.getElementById('new_site');
var new_url = document.getElementById('subscription_placeholder');
var new_site_error = document.getElementById('subscription_text');
var menu = document.getElementById('icons');
var home_menu = document.getElementById('side_menu');
var home_menu_height = 'cc';
var loading_screen = document.getElementById('loading');
var loading_logo = document.getElementById('loading_logo');
var home = document.getElementById('home');

var b_frame = document.getElementById('buddysystem_frame');
var w_frame = document.getElementById('wiki_frame');
var mb_frame = document.getElementById('mb_frame');
var slack_frame = document.getElementById('slack_frame');
var excel_frame = document.getElementById('excel_frame');

var frames = document.getElementsByTagName('webview');
var frames_count = frames.length;


var btn_up = document.getElementById('btn_up');
var btn_down = document.getElementById('btn_down');
var btn_up_hover = document.getElementById('btn_up_hover');
var btn_down_hover = document.getElementById('btn_down_hover');

// ----------------------------------------------------------------
// ----------------------------------------------------------------
String.prototype.hashCode = function() {
  return 'b' + this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
};
// ----------------------------------------------------------------
// ----------------------------------------------------------------

/**
  * This function check if all iframes have loaded their content;
  * if that's the case, it removes the loading screen.
  * @author Rémy Raes
  **/
function check_loaded_frames() {
	if(frames_loaded === frames_count) {
		hide_loading_screen();
	}
}

/**
  * This function hides the loading screen, enabling the user to
  * access the application functionnalities.
  * @author Rémy Raes
  **/
function hide_loading_screen() {
	console.info('All frames have been loaded, hiding the loading screen.');
	loading_logo.style.webkitAnimationPlayState = 'paused';
	loading_screen.style.opacity = '0';
	setTimeout(function() {
		loading_screen.style.zIndex = '-1';
	}, 1000);
}


// listeners on the application frames
for(let i=0; i<frames_count; i++) {
	let tmp = frames[i];

	// listener to check the loaded state of the frame
	tmp.addEventListener('dom-ready', () => {
		console.log('The website ' + tmp.src + ' frame has been loaded.');
		frames_loaded++;
		check_loaded_frames();
	});

	// listener to hide the 'new site' window
	tmp.addEventListener('mousedown', () => {
		reset_new_site_subscription()
	});
}

function _update_style(component) {
	component.shadowRoot.querySelector('object').style.width = '100%';
	component.shadowRoot.querySelector('object').style.height = '100%';
}

// ----------------------------------------------------------------
// iframe display functions
// ----------------------------------------------------------------
function hide_all_frames () {
	home.className = 'category frame';
	let frames = document.getElementsByTagName('webview');
    for(let i=0; i<frames.length; i++)
			frames[i].className = 'frame';
}

function show_frame(url) {

	hide_all_frames();

	let frames = document.getElementsByTagName('webview');
	for(let i=0; i<frames.length; i++)
		if(frames[i].id === url) {
			frames[i].className = 'frame frame-show';
			_update_style(frames[i]);
			return ;
		}

}

function show_home() {
    hide_all_frames();
    home.className = 'category frame-show';
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------


/**
  * This function creates a component representing a website
  * on the side menu.
  * @param {String} url - The URL of the new website
  * @author Rémy Raes
  **/
function create_site_menu_component(site) {

	let url = site.url;
	reset_new_site_subscription();

	if(sites_added === 0)
		create_site_menu_separation();
	sites_added++;

	// creating the button
	var button = document.createElement('LI');
	button.className = 'section added_site';
	button.addEventListener('animationend', function() {
		button.style.animationName = 'none';
	}, false);

	let tmp = url.hashCode();
	button.id = tmp;
	button.onclick = function() {show_frame(tmp + '_frame')};


	// creating the delete button
	let span = document.createElement('span');
	span.className = 'delete';
	span.innerText = 'x';

	span.addEventListener('click', function(e) {
		e.stopPropagation();
		show_home();

		delete_menu_component(tmp);
		delete_frame_component(tmp + '_frame');

		console.info('Deleting ' + url + '.');

		let p = get_parameters();
		let sites = p.sites;
		let i=-1;

		// find the position of the site in the settings
		for(let k=0; k<sites.length; k++){
			if(sites[k].url === url) {
				i = k;
				break;
			}
		}

		if(i>-1)
			sites.splice(i, 1);
		else {
			console.error('Failed to delete ' + url + ' : website not found.');
		}

		p.sites = sites;
		save_parameters(p);
		set_overflow_on_menu();

	}, false);
	button.appendChild(span);

	// listeners to manipulate the delete button
	var interval = 20;
	button.addEventListener('contextmenu', function(){

		span.className = 'delete delete-show';
		setTimeout(() => {
			span.className = 'delete';
		}, 2000);
		cpt = 0;

	}, false);


	// create the tooltip
	var tooltip = document.createElement('DIV');
	tooltip.innerText = site.name;
	button.appendChild(tooltip);

	menu.appendChild(button);
	set_overflow_on_menu();
}

/**
  * This function appends an HR element into the side menu.
  * @author Rémy Raes
  **/
function create_site_menu_separation(){
	menu.appendChild(document.createElement('HR'));
}

/**
  * This function creates a frame encapsulating a website
  * on the side menu.
  * @param {String} site - The URL of the new website
  * @author Rémy Raes
  **/
function create_site_frame_component(site) {
	let url = site.url;
	let frame = document.createElement('webview');
	frame.id = url.hashCode() + '_frame';
	frame.className = 'frame';
	frame.setAttribute('data-origin', 'user');
	frame.src = url;

	frame.addEventListener('dom-ready', () => {
		console.log('The website ' + url + ' has been loaded.')
		frames_loaded++;
		check_loaded_frames();
	});
	frame.addEventListener('page-title-updated', () => {
		// updates the application tooltip
		save_site_title(site, frame.getTitle());

		// TODO to fix, some sites will change title several times for one only
		// notification (eg. Facebook when you receive a Messenger message)
		add_notification_on_site(site.url.hashCode);
	});
	frame.addEventListener('page-favicon-updated', (e) => {
		// update the button image
		update_button_image(url.hashCode(), e.favicons[0]);
	});
	frame.addEventListener('mousedown', () => {
		reset_new_site_subscription()
	});

	main_wrapper.appendChild(frame);
}

function delete_menu_component(url) {
	let comp = document.getElementById(url);
	menu.removeChild(comp);

	// remove the second <hr> separator if there's no more added sites
	if(home_menu.getElementsByClassName('added_site').length == 0) {
		let hr = home_menu.getElementsByTagName('hr')[1];
		home_menu.removeChild(hr);
	}
	set_overflow_on_menu();
}

function delete_frame_component(url) {
	let comp = document.getElementById(url);
	main_wrapper.removeChild(comp);
}

function update_tooltip_title(url, title) {
	let tmp = document.getElementById(url);
	let tooltip = tmp.getElementsByTagName('DIV')[0];
	tooltip.innerHTML = title;
}

function update_button_image(url, image_url) {
	let node = document.getElementById(url);
	node.style.backgroundImage = 'url(\'' + image_url + '\')';
}


// ----------------------------------------------------------------
// "New website" window manipulation functions
// ----------------------------------------------------------------

/**
  * This function makes the subscription window appear.
  * @author Rémy Raes
  **/
function show_new_site_subscription() {
	main_wrapper.style.filter = 'brightness(0.4)';
	new_site_window.style.display = 'block';
	new_site_window.style.animationName = 'bounceIn';
}

/**
  * This function initializes the subscription window (style, animation, tooltip text).
  * @author Rémy Raes
  **/
function reset_new_site_subscription() {
	main_wrapper.style.filter = 'none';
	new_site_window.style.animationName = 'bounceOut';
	new_site_error.innerText = ESNbang.i18n.errorMessages.subscription_default_message;
	new_site_error.style.color = 'inherit';
	new_url.value = '';
}

/**
  * This function sets a warning state on the subscription window.
  * @param {String} message - The message to display to the user
  * @author Rémy Raes
  **/
function set_new_site_warning(message) {
	new_site_window.style.animationName = 'bounceOut';
	setTimeout(function() {
		new_site_window.style.animationName = 'bounceWarning';
	}, 20);

	new_site_error.style.color = 'red';
	new_site_error.innerText = message;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------

ipc.on('resized' , function(event , data){
	set_overflow_on_menu();
});

/**
  * This functions checks if the side menu is overflowed, if that's
  * the case, it sets the scrolling buttons state to visible.
  * @author Rémy Raes
  **/
function set_overflow_on_menu() {
	if(menu_is_overflowed()) {
		home_menu.className = 'overflowed';
		btn_up_hover.style.display = 'block';
		btn_down_hover.style.display = 'block';
		home_menu_height = home_menu.scrollHeight;
	}

	else {
		home_menu.className = '';
		btn_up_hover.style.display = 'none';
		btn_down_hover.style.display = 'none';
	}

}


/**
  * This functions returns the state of the state bar, meaning if its size
	* enables it to display completely within the screen.
	* @return {Boolean} is the side menu going out of the screen or not
	* @author Rémy Raes
	* @todo doesn't work when the subscribe button is above the application bottom
	**/
function menu_is_overflowed() {
	return (home_menu.scrollHeight > home_menu.clientHeight);
}

// scrolling listeners avoiding to call the functions too much
var t = 0;
var interval = 20;
btn_up.addEventListener('mousedown', function(){
	t = setInterval(function(){
		scroll_menu_down();
	}, 40);
}, false);
btn_up.addEventListener('mouseup', function() {
	clearInterval(t);
}, false);


btn_down.addEventListener('mousedown', function(){
	t = setInterval(function(){
		scroll_menu_up();
	}, 40);
}, false);
btn_down.addEventListener('mouseup', function() {
	clearInterval(t);
}, false);

let timerScroll = 0;
home_menu.addEventListener('mousewheel', (e) => {
	clearTimeout(timerScroll);
	timerScroll = setTimeout( () => {
		let delta = -1 * Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		(delta === 1) ? scroll_menu_up() : scroll_menu_down();
	}, 40);
});


// functions used to scroll the side menu
function scroll_menu_up(){
	// initialisation
	if(home_menu_height === 'cc')
		home_menu_height = home_menu.scrollHeight;

	let elem = home_menu.style.marginTop;
	let cpt = 0;
	if(elem.length > 0)
		cpt = parseInt(elem.substring(0, elem.length-2));

	if(home_menu.scrollHeight === home_menu_height) {
		home_menu.style.marginTop = (cpt - interval) + 'px';
		set_overflow_on_menu();
	}
	// console.log('taille menu: ' + home_menu.scrollHeight + ' \nhome_menu_height: ' + home_menu_height + '\nmargin: ' +(cpt - interval) + 'px');
}
function scroll_menu_down(){
	let elem = home_menu.style.marginTop;
	let cpt = 0;
	if(elem.length > 0)
		cpt = parseInt(elem.substring(0, elem.length-2));

	if(cpt === 0) {
		clearInterval(t);
		set_overflow_on_menu();
	}

	if(cpt < (-1 *interval)+1 || cpt > 0){
		home_menu.style.marginTop = parseInt(cpt + interval) + 'px';
		set_overflow_on_menu();
	}
}

/**
 * Get absolute bounds of an element
 * @param element
 * @returns {{top: number, left: number, width: number, height: number}}
 * @private
 * @author Jules Spicht
 */
function _dom_bounds_get(element) {
	var bounds = {},
		c = document.body,
		d = document.documentElement,
		top = window.pageYOffset || d.scrollTop || c.scrollTop,
		left = window.pageXOffset || d.scrollLeft || c.scrollLeft;
	element = element.getBoundingClientRect();
	bounds.top = element.top + top;
	bounds.left = element.left + left;
	bounds.width = element.width;
	bounds.height = element.height;
	return bounds;
}
