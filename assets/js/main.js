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

// listeners
b_frame.addEventListener('dom-ready', () => {
	console.log('The buddysystem has been loaded.');
	frames_loaded++;
	check_loaded_frames();
});
b_frame.addEventListener('mousedown', () => {
	reset_new_site_subscription()
});
w_frame.addEventListener('dom-ready', () => {
	console.log('The wiki frame has been loaded.');
	frames_loaded++;
	check_loaded_frames();
});
w_frame.addEventListener('mousedown', () => {
	reset_new_site_subscription()
});
mb_frame.addEventListener('dom-ready', () => {
	console.log('The "module bénévole" frame has been loaded.');
	frames_loaded++;
	check_loaded_frames();
});
mb_frame.addEventListener('mousedown', () => {
	reset_new_site_subscription()
});
slack_frame.addEventListener('dom-ready', () => {
	console.log('The Slack frame has been loaded.');
	frames_loaded++;
	check_loaded_frames();
});
slack_frame.addEventListener('mousedown', () => {
	reset_new_site_subscription()
});
excel_frame.addEventListener('dom-ready', () => {
	console.log('The Excel frame has been loaded.');
	frames_loaded++;
	check_loaded_frames();
});
excel_frame.addEventListener('mousedown', () => {
	reset_new_site_subscription()
});

function _update_style(component) {
	component.shadowRoot.querySelector('object').style.width = '100%';
	component.shadowRoot.querySelector('object').style.height = '100%';
}

// ----------------------------------------------------------------
// iframe display functions
// ----------------------------------------------------------------
function hide_all_frames () {

	home.className = 'frame';
	b_frame.className = 'frame';
	w_frame.className = 'frame';
	mb_frame.className = 'frame';
	slack_frame.className = 'frame';
	excel_frame.className = 'frame';

	// hide all extern frames
	let frames = document.getElementsByTagName('webview');
    for(let i=0; i<frames.length; i++)
			frames[i].className = 'frame';
}

function show_frame(url) {

	hide_all_frames();

	let frames = document.getElementsByTagName('webview');
	for(let i=0; i<frames.length; i++)
		if(frames[i].id === (url + '_frame')) {
			frames[i].className = 'frame frame-show';
			_update_style(frames[i]);
			return ;
		}

}


function show_logoinserter() {
		_update_style(l_frame);
		hide_all_frames();
    l_frame.className = "frame frame-show";
}
function show_wiki() {
	_update_style(w_frame);
    hide_all_frames();
    w_frame.className = 'frame frame-show';
}
function show_buddysystem() {
	_update_style(b_frame);
	hide_all_frames();
	b_frame.className = 'frame frame-show';
}
function show_mb() {
	_update_style(mb_frame);
	hide_all_frames();
	mb_frame.className = 'frame frame-show';
}
function show_slack() {
	_update_style(slack_frame);
	hide_all_frames();
	slack_frame.className = 'frame frame-show';
}
function show_excel() {
	_update_style(excel_frame);
	hide_all_frames();
	excel_frame.className = 'frame frame-show';
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


	// creating the delete button
	let span = document.createElement('span');
	span.className = 'delete';
	span.innerText = 'x';
  span.addEventListener('click', function(e) {
    e.stopPropagation();
		show_home();

    delete_menu_component(url);
    delete_frame_component(url);

    console.info('Deleting ' + url + '.');

    let p = get_parameters();
		let sites = p.sites;
    let i = p.sites.indexOf(url);

    if(i>-1)
      sites.splice(i, 1);
    else {
      console.err('Failed to delete ' + url + ' : website not found.');
    }

	p.sites = sites;
    save_parameters(p);
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

/**
  * This function creates a frame encapsulating a website
  * on the side menu.
  *
  * url The URL of the new website
  * @author Rémy Raes
  **/
function create_site_frame_component(url) {
	let frame = document.createElement('webview');
	frame.id = url_to_css_id(url + '_frame');
	frame.className = 'frame';
	frame.src = url;

	frame.addEventListener('dom-ready', () => {
		console.log('The website ' + url + ' has been loaded.')
		frames_loaded++;
		check_loaded_frames();
	});
	frame.addEventListener('mousedown', () => {
		reset_new_site_subscription()
	});

	main_wrapper.appendChild(frame);
}

function delete_menu_component(url) {
  let comp = document.getElementById(url_to_css_id(url));
  menu.removeChild(comp);
}

function delete_frame_component(url) {
  let comp = document.getElementById(url_to_css_id(url) + '_frame');
  main_wrapper.removeChild(comp);
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

home_menu.addEventListener('mousewheel', (e) => {
	let delta = -1 * Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	(delta === 1) ? scroll_menu_up() : scroll_menu_down();
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
