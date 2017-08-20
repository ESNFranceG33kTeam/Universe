const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;

const BrowserWindow = electron.BrowserWindow;
var mainWindow;


// create the display window as soon as the application is ready
app.on('ready', createWindow);

// if all application windows have been closed, shutdown the application
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// on MacOS, enable the user to reopen the application after it has been "closed"
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});



function createWindow () {
	
	// notification icon
	tray = new Tray('assets/img/star.png');
	tray.setToolTip('ESN bang!');
	
	// context menu on the icon
	const menu = Menu.buildFromTemplate([
		{
			label: 'Open application',
			click: () => {
				mainWindow.show();
			}
		},{
			label: 'Open ESN website',
			click: () => {
				electron.shell.openExternal('https://esn.org/');
			}
		},
		{
			type: 'separator'
		}, 
		{
			label: 'Close application',
			click: () => {
				mainWindow.destroy();
				app.quit();
			}
		}

	]);

	tray.setContextMenu(menu);
	tray.on('click', () => {
		mainWindow.show();
	});
	
	
	// main window
	mainWindow = new BrowserWindow({
								title: 'ESNbang!',
								icon: 'assets/img/star.png',
								width: 920, 
								height: 535,
								
								minWidth: 920,
								minHeight: 535,
								
								center: true});
	app.setApplicationMenu(null);
	mainWindow.loadURL(`file://${__dirname}/index.html`);
    // mainWindow.webContents.openDevTools();

	// hide the main window when the user clicks the 'close' button
	mainWindow.on('close', (event) => {
		event.preventDefault();
		// TODO send a notification to inform the application is still running
		mainWindow.hide();
	});
	
}