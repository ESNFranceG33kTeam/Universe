/**
  * This module contains all operations and components used by several modules.
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

	function updateVersionIndicator(data) {
		if(data.downloading)
			versionIndicator.innerText += ' - downloading a new version...'
		else
			versionIndicator.innerText = data.message;
	};

    _this.updateVersionIndicator = function() {
        versionIndicator.innerText = app.app.getVersion();
    };

	return _this;

})(Universe || {});
