const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;
const ipc = require('electron').ipcRenderer;

const frames_count = 3;
var frames_loaded = 0;
var sites_added = 0;

// ----------------------------------------------------------------
// initializing all application components
// ----------------------------------------------------------------

var main_wrapper = document.getElementById('main_wrapper');
var new_site_window = document.getElementById('new_site');
var new_url = document.getElementById('new_url');
var error_window = document.getElementById('new_site_error');
var menu = document.getElementById('icons');
var home_menu = document.getElementById('side_menu');
var home_menu_height = 'cc';
var loading_screen = document.getElementById('loading');
var loading_logo = document.getElementById('loading_logo');
var home = document.getElementById('home');

var b_frame = document.getElementById('buddysystem_frame');
var w_frame = document.getElementById('wiki_frame');
var mb_frame = document.getElementById('mb_frame');

var frames = document.getElementsByTagName('IFRAME');


var btn_up = document.getElementById('btn_up');
var btn_down = document.getElementById('btn_down');
var btn_up_hover = document.getElementById('btn_up_hover');
var btn_down_hover = document.getElementById('btn_down_hover');

// ----------------------------------------------------------------
// ----------------------------------------------------------------


/**
  * This function check if all iframes have loaded their content;
  * if that's the case, it removes the loading screen.
  * @author Rémy Raes
  **/
function check_loaded_frames() {
	if(frames_loaded === frames_count)
		hide_loading_screen();
}

/**
  * This function hides the loading screen, enabling the user to
  * access the application functionnalities.
  * @author Rémy Raes
  **/
function hide_loading_screen() {
	loading_logo.style.webkitAnimationPlayState = 'paused';
	loading_screen.style.opacity = '0';
	setTimeout(function() {
		loading_screen.style.zIndex = '-1';
	}, 1000);
}

// listeners
b_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
}
w_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
}
mb_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
}


// ----------------------------------------------------------------
// iframe display functions
// ----------------------------------------------------------------
function hide_all_frames () {

	// hide base frames
	home.style.display = 'none';
	b_frame.style.display = 'none';
	w_frame.style.display = 'none';
	mb_frame.style.display = 'none';

	// hide all extern frames
	let frames = document.getElementsByTagName('iframe');
    for(let i=0; i<frames.length; i++)
			frames[i].style.display = 'none';
}

function show_frame(url) {

	hide_all_frames();
	console.log('showing ' + url);

	let frames = document.getElementsByTagName('iframe');
	for(let i=0; i<frames.length; i++)
		if(frames[i].id === (url + '_frame')) {
			console.log('trouvé');
			frames[i].style.display = 'block';
			return ;
	}

}


function show_logoinserter() {
    hide_all_frames();
    l_frame.style.display = "block";
}
function show_wiki() {
    hide_all_frames();
    w_frame.style.display = 'block';
}
function show_buddysystem() {
	hide_all_frames();
	b_frame.style.display = 'block';
}
function show_mb() {
	hide_all_frames();
	mb_frame.style.display = 'block';
}

function show_home() {
    hide_all_frames();
    home.style.display = 'block';
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------


/**
  * This function creates a component representing a website
  * on the side menu.
  *
  * url The URL of the new website
  * @author Rémy Raes
  **/
function create_site_menu_component(url) {

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

	let tmp = url_to_css_id(url);
	button.id = tmp;
	button.onclick = function() {show_frame(tmp)};


	// create the tooltip
	var tooltip = document.createElement('DIV');
	tooltip.innerText = url;
	button.appendChild(tooltip);

	menu.appendChild(button);

	// actualise menu size
	home_menu_height = home_menu.scrollHeight;
}

/**
  * This function appends an HR element into the side menu.
  * @author Rémy Raes
  **/
function create_site_menu_separation(){
	menu.appendChild(document.createElement('HR'));
}

function create_site_frame_component(url) {
	let frame = document.createElement('IFRAME');
	frame.id = url_to_css_id(url + '_frame');
	frame.src = url;

	main_wrapper.appendChild(frame);
}


/* TODO hiding menus by clicking on iframes */

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
	new_site_error.innerText = 'You can insert here a news feed you want to follow.';
	new_site_error.style.color = 'inherit';
	new_url.value = '';
}

/**
  * This function sets a warning state on the subscription window.
  *
  * message The message to display to the user
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


function url_to_css_id(url) {
	var ret = url.replace(/:/g, '_');
	ret = ret.replace(/\./g, '_');
	return ret.replace(/\//g, '_');
}

ipc.on('overflow-menu' , function(event , data){
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
	}

	else {
		home_menu.className = '';
		btn_up_hover.style.display = 'none';
		btn_down_hover.style.display = 'none';
	}

}

// TODO to redo
function menu_is_overflowed() {
	return (home_menu.scrollHeight > home_menu.clientHeight);
}

// scrolling listeners avoiding to call the functions too much
var t = 0;
var interval = 20;
btn_up.addEventListener('mousedown', function(){
	t = setInterval(function(){
		scroll_menu_down();
	}, 100);
}, false);
btn_up.addEventListener('mouseup', function() {
	clearInterval(t);
}, false);

btn_down.addEventListener('mousedown', function(){
	t = setInterval(function(){
		scroll_menu_up();
	}, 100);
}, false);
btn_down.addEventListener('mouseup', function() {
	clearInterval(t);
}, false);


// functions used to scroll the side menu
function scroll_menu_up(){
	// initialisation
	if(home_menu_height === 'cc')
		home_menu_height = home_menu.scrollHeight;

	let elem = home_menu.style.marginTop;
	let cpt = 0;
	if(elem.length > 0)
		cpt = parseInt(elem.substring(0, elem.length-2));

	if(home_menu.scrollHeight === home_menu_height)
		home_menu.style.marginTop = (cpt - interval) + 'px';
}
function scroll_menu_down(){
	let elem = home_menu.style.marginTop;
	let cpt = 0;
	if(elem.length > 0)
		cpt = parseInt(elem.substring(0, elem.length-2));

	if(cpt < 0)
		home_menu.style.marginTop = parseInt(cpt + interval) + 'px';
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
