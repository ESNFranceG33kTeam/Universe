const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;
const ipc = require('electron').ipcRenderer;

const frames_count = 2;
var frames_loaded = 0;
var sites_added = 0;

var main_wrapper = document.getElementById('main_wrapper');
var new_site_window = document.getElementById('new_site');
var new_url = document.getElementById('new_url');
var error_window = document.getElementById('new_site_error');
var menu = document.getElementById('icons');
var home_menu = document.getElementById('side_menu');
var loading_screen = document.getElementById('loading');
var loading_logo = document.getElementById('loading_logo');
var home = document.getElementById('home');

var b_frame = document.getElementById('buddysystem_frame');
var w_frame = document.getElementById('wiki_frame');

var btn_up = document.getElementById('btn_up');
var btn_down = document.getElementById('btn_down');


function check_loaded_frames() {
	if(frames_loaded === frames_count)
		hide_loading_screen();
}

function hide_loading_screen() {
	loading_logo.style.webkitAnimationPlayState = 'paused';
	loading_screen.style.opacity = '0';
	setTimeout(function() {
		loading_screen.style.zIndex = '-1';
	}, 1000);	
}

/* listeners */
b_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
}
w_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
}

function hide_all () {
    home.style.display = 'none';
    b_frame.style.display = 'none';
    f_frame.style.display = 'none';
    // l_frame.style.display = 'none';
    w_frame.style.display = 'none';
    // g_frame.style.display = 'none';
}
function show_faucondor() {
    hide_all();
    f_frame.style.display = 'block';
}
function show_logoinserter() {
    hide_all();
    l_frame.style.display = "block";
}
function show_wiki() {
    hide_all();
    w_frame.style.display = 'block';
}
function show_galaxy() {
    hide_all();
    g_frame.style.display = 'block';
}
function show_buddysystem() {
	hide_all();
	b_frame.style.display = 'block';
}

function show_home() {
    hide_all();
    home.style.display = 'block';
}



function create_site_menu_component(url) {

	reset_new_site_subscription();
	
	if(sites_added === 0)
		create_site_menu_separation();
	sites_added++;

	var button = document.createElement('LI');
	button.className = 'section added_site';
	button.addEventListener('animationend', function() {
		button.style.animationName = 'none';
	}, false);
	
	var tooltip = document.createElement('DIV');
	tooltip.innerText = url;
	button.appendChild(tooltip);
	
	button.id = url_to_css_id(url);

	menu.appendChild(button);
}

function create_site_menu_separation(){
	menu.appendChild(document.createElement('HR'));
}



/* TODO hiding menus by clicking on iframes */

function show_new_site_subscription() {
	main_wrapper.style.filter = 'brightness(0.4)';
	new_site_window.style.display = 'block';
	new_site_window.style.animationName = 'bounceIn';
}

function reset_new_site_subscription() {
	main_wrapper.style.filter = 'none';
	new_site_window.style.animationName = 'bounceOut';
	new_site_error.innerText = 'You can insert here a news feed you want to follow.';
	new_site_error.style.color = 'inherit';
	new_url.value = '';
}

function set_new_site_warning(message) {
	new_site_window.style.animationName = 'bounceOut';
	setTimeout(function() {
		new_site_window.style.animationName = 'bounceWarning';
	}, 20);
	
	new_site_error.style.color = 'red';
	new_site_error.innerText = message;
}


function url_to_css_id(url) {
	var ret = url.replace(/:/g, '_');
	return ret.replace(/\//g, '_');
}

ipc.on('overflow-menu' , function(event , data){
	set_overflow_on_menu();
});

function set_overflow_on_menu() {
	if(menu_is_overflowed()) {
		home_menu.className = 'overflowed';
		btn_up.style.display = 'block';
		btn_down.style.display = 'block';
	}
		
	else {
		home_menu.className = '';
		btn_up.style.display = 'none';
		btn_down.style.display = 'none';
	}
		
}

// TODO à revoir
function menu_is_overflowed() { 
	return (home_menu.scrollHeight > home_menu.clientHeight);
}

// listeners pour scroll
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

function scroll_menu_up(){
	let elem = home_menu.style.marginTop;
	let cpt = 0;
	if(elem.length > 0)
		cpt = parseInt(elem.substring(0, elem.length-2));
	
	home_menu.style.marginTop = (cpt - interval) + 'px';
	console.log(cpt);
}
function scroll_menu_down(){
	let elem = home_menu.style.marginTop;
	let cpt = 0;
	if(elem.length > 0)
		cpt = parseInt(elem.substring(0, elem.length-2));
	
	if(cpt < 0)
		home_menu.style.marginTop = parseInt(cpt + interval) + 'px';
	console.log(cpt);
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