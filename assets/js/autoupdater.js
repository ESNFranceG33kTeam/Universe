const os = require('os');
const {app, autoUpdater, dialog} = require('electron');
const version = app.getVersion();
const platform = os.platform() + '_' + os.arch();  // usually returns darwin_64

const updaterFeedURL = 'http://remyraes.com:5014/update/win32/' + version + '/stable';

function appUpdater(mainWindow) {
	console.log('hitting ' + updaterFeedURL);
	autoUpdater.setFeedURL(updaterFeedURL);
	/* Log whats happening
	TODO send autoUpdater events to renderer so that we could console log it in developer tools
	You could alsoe use nslog or other logging to see what's happening */
	autoUpdater.on('error', err => console.log(err));
	autoUpdater.on('checking-for-update', () => console.log('checking-for-update'));
	autoUpdater.on('update-available', () => {
		mainWindow.webContents.send('dlUpdate',
		{
			downloading: true
		});
		console.log('update-available');
	});
	autoUpdater.on('update-not-available', () => console.log('update-not-available'));

	// update downloading progress
	autoUpdater.addListener("download-progress", function (event, bytesPerSecond, percent, total, transferred) {
		console.log('cc');
		mainWindow.setProgressBar(event.percent / 100);
	});

	// Ask the user if update is available
	autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {

		mainWindow.webContents.send('dlUpdate',
		{
			downloading: false,
			message: 'Version ' + releaseName + ' is available.'
		});

		mainWindow.setProgressBar(0);
		var buttons = ['Restart', 'Later'];
		if (os.platform() === 'win32') {
			dialog.showMessageBox(mainWindow, {
				type: 'info',
				buttons: buttons,
				message: "A new update is ready to install! \n" + "Version " + releaseName + " is downloaded and will be automatically installed on restart.",
				title: "Update"
			}, function (buttonIndex) {
				if (buttonIndex == 0) {
					autoUpdater.quitAndInstall();
					return false;
				}
			});
		} else {
			dialog.showMessageBox(mainWindow, { type: 'info',
				buttons: buttons,
				message: "A new update is ready to install! \n" + "Version " + releaseName + " is downloaded and will be automatically installed on restart.",
				title: "Update"
			}, function (buttonIndex) {
				if (buttonIndex == 0) {
					autoUpdater.quitAndInstall();
					return false;
				}
			});
		}
	});
	// init for updates
	autoUpdater.checkForUpdates();
}

exports = module.exports = {
	appUpdater
};
