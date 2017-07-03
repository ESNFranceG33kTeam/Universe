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
								title: 'ESN bang!',
								icon: 'assets/img/star.png',
								width: 920, 
								height: 550,
								
								minWidth: 920,
								minHeight: 550,
								
								center: true});
	app.setApplicationMenu(null);
	mainWindow.loadURL(`file://${__dirname}/index.html`);

	// hide the main window when the user clicks the 'close' button
	mainWindow.on('close', (event) => {
		event.preventDefault();
		mainWindow.hide();
	});
	
}