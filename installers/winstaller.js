var electronInstaller = require('electron-winstaller');
const path = require('path');
var distDir = '/universe-winstaller';

console.log('Beginning installer creation...')
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './Universe-win32-ia32',
    outputDirectory: distDir,
    iconUrl: 'https://raw.githubusercontent.com/ESNFranceG33kTeam/Universe/master/assets/img/icons/star.ico',
    setupIcon: './assets/img/icons/installerStar.ico',
    loadingGif: './assets/img/new_section_loading.gif',
    authors: 'ESN France - G33k Team',
    exe: 'universe.exe',
    setupExe: 'UniverseInstaller.exe',
    noMsi: true
  });

resultPromise.then(() => console.log("Installer created in " + distDir), (e) => console.log(`No dice: ${e.message}`));
