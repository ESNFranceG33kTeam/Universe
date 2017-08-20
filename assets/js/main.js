const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;

const frames_count = 3;
var frames_loaded = 0;

var loading_screen = document.getElementById('loading');
var loading_logo = document.getElementById('loading_logo');
var home = document.getElementById('home');
var b_frame = document.getElementById('buddysystem_frame');
var f_frame = document.getElementById('faucon_frame');
// var l_frame = document.getElementById('logoinserter_frame');
var w_frame = document.getElementById('wiki_frame');
// var g_frame = document.getElementById('galaxy_frame');

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
f_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
}
/*
l_frame.onload = function() {
	frames_loaded++;
	check_loaded_frames();
} */
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