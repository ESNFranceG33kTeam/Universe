var Universe = Universe || {};

/**
  * This module contains all operations linked to the side menu of the
  * application.
  * @module Universe/menu
  * @author Rémy Raes
  **/
Universe.menu = (function() {
	var _this = {};

	var interval = 20;

	var home_menu = document.getElementById('side_menu');
	var home_menu_height = 'cc';

	// scrolling buttons
	var btn_up = document.getElementById('btn_up');
	var btn_down = document.getElementById('btn_down');
	var btn_up_hover = document.getElementById('btn_up_hover');
	var btn_down_hover = document.getElementById('btn_down_hover');


	// getters
	_this.get_home_menu = function() {
		return home_menu;
	}

	ipc.on('resized' , function(event , data){
		_this.set_overflow_on_menu();
	});

	/**
	  * This functions returns the state of the state bar, meaning if its size
	  * enables it to display completely within the screen.
	  * @return {Boolean} is the side menu going out of the screen or not
	  * @memberof module:Universe/menu
	  * @author Rémy Raes
	  **/
	function menu_is_overflowed() {
		return (home_menu.scrollHeight > home_menu.clientHeight);
	}


	/**
	  * This functions checks if the side menu is overflowed, if that's
	  * the case, it sets the scrolling buttons state to visible.
	  * @memberof module:Universe/menu
	  * @author Rémy Raes
	  **/
	_this.set_overflow_on_menu = function() {
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
	  * This function is used to scroll the menu up, if possible.
	  * @memberof module:Universe/menu
	  * @author Rémy Raes
	  **/
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
			_this.set_overflow_on_menu();
		}
	}

	var t = 0;
	/**
	  * This function is used to scroll the menu down, if possible.
	  * @memberof module:Universe/menu
	  * @author Rémy Raes
	  **/
	function scroll_menu_down(){
		let elem = home_menu.style.marginTop;
		let cpt = 0;
		if(elem.length > 0)
			cpt = parseInt(elem.substring(0, elem.length-2));

		if(cpt === 0) {
			clearInterval(t);
			_this.set_overflow_on_menu();
		}

		if(cpt < (-1 *interval)+1 || cpt > 0){
			home_menu.style.marginTop = parseInt(cpt + interval) + 'px';
			_this.set_overflow_on_menu();
		}
	}

	/**
	  * Self-invoking function that initialize scroll listeners on both
	  * scrolling buttons and mousewheel.
	  * @memberof module:Universe/menu
	  * @author Rémy Raes
	  **/
	(function initialize_scroll_listeners() {
		// scrolling listeners avoiding to call the functions too much
		// var t = 0;
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
			}, 1);
		});
	})();

	return _this;

})();
