const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;

const BrowserWindow = electron.BrowserWindow;
var mainWindow;
var parameters = {};

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
								backgroundColor: '#e0e0e0',
								
								width: 920, 
								height: 535,
								minWidth: 920,
								minHeight: 535,
								
								show: false});
	app.setApplicationMenu(null);
	mainWindow.loadURL(`file://${__dirname}/index.html`);
    // mainWindow.webContents.openDevTools();
	
	const session = mainWindow.webContents.session
	session.clearCache(function(){});
	
	// show the window only when it's rendered
	mainWindow.once('ready-to-show', () => {
		// initializing parameters
		mainWindow.webContents.send('get-params');
		ipcMain.on('send_params', function(event , data){ 
			parameters = data;
			console.log('parameters received:');
			console.log(data);
			mainWindow.setSize(parameters.size.width, parameters.size.height);
			mainWindow.center();
			mainWindow.show();
		});
	});
	
	
	// hide the main window when the user clicks the 'close' button
	mainWindow.on('close', (event) => {
		event.preventDefault();		
		// TODO send a notification to inform the application is still running
		save_parameters();
		mainWindow.hide();
	});
	
	
	// save window size
	
	mainWindow.on('resize', () => {
		save_parameters();
	});
	
	
}


function save_parameters() {
	// TODO code a timer to avoid too much function calls in a short period of time
	let { width, height } = mainWindow.getBounds();
	parameters.size.width = width;
	parameters.size.height = height;
	console.log(parameters);
	mainWindow.webContents.send('save', parameters);
}