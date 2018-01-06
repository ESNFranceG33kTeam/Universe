/**
  * This module contains all operations linked the the application versionning.
  * @module Universe/updater
  * @author Rémy Raes
  **/
Universe.updater = (function(){
	var _this = {};

	// version number indicator
	let versionIndicator = document.getElementById('version');

	ipc.on('dlUpdate' , function(event, data){
		updateVersionIndicator(data);
	});

	/**
	  * Updates the version indicator when the application starts.
	  * @memberof module:Universe/updater
	  * @author Rémy Raes
	  * @private
	  **/
	function updateVersionIndicator(data) {
		if(data.downloading)
			versionIndicator.innerText += ' - downloading a new version...'
		else
			versionIndicator.innerText = data.message;
	};

	/**
	  * Public getter of the version updating method.
	  * @memberof module:Universe/updater
	  * @author Rémy Raes
	  * @public
	  **/
    _this.updateVersionIndicator = function() {
        versionIndicator.innerText = app.app.getVersion();
    };

	return _this;

})(Universe || {});
