var electronInstaller = require('electron-winstaller');
const fs = require('fs');
var distDir = '/universe-winstaller';
let packageJson = undefined;

fs.readFile('package.json', 'utf8',
function (err, data) {

    packageJson = JSON.parse(data);
    let version = packageJson["version"];

    console.log('\nBeginning installer creation for version ' + version)

    if (err) {
        console.error('Failed to read package.json');
        return ;
    }

    resultPromise = electronInstaller.createWindowsInstaller({
      appDirectory: './Universe-win32-ia32',
      name: 'esnfrance.geekteam.universe',
      outputDirectory: distDir,
      iconUrl: 'https://raw.githubusercontent.com/ESNFranceG33kTeam/Universe/master/assets/img/icons/star.ico',
      setupIcon: './assets/img/icons/installerStar.ico',
      loadingGif: './assets/img/loading.gif',
      authors: 'ESN France - G33k Team',
      exe: 'universe.exe',
      setupExe: 'UniverseInstaller-' + version + '.exe',
      noMsi: true
    });

    resultPromise.then(() => console.log("Installer created in " + distDir), (e) => console.log(`No dice: ${e.message}`));
});
