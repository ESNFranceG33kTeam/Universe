## TODO

- [x] Break the code into modules
- [x] Generate documentation with [jsdoc](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki)
- [x] Handle behaviour when no network (not necessary)
- [x] Make an autoupdate system
- [x] Add a "reset site" button
- [x] Fix application behaviour when no platforms are registered
    - [x] Fix delete issues (first platform sometimes cannot be deleted)
- [x] Fix notification system (https://github.com/electron/electron/issues/10864)
    - [x] Using Tray Balloons system
- [x] Get a new logo
- [x] An unknown bug sometimes prevents the application from starting ('ready-to-show' event ?)
    - [x] The bug do not come from the event, since it's always fired as planned
    - [x] Maybe the bug was coming from the storage lib used? (we changed lib since then)
    - [x] Nope, I think it comes from the fact that all application files have not been loaded before building signal is sent, which means it hits nothing
    - [x] Fixed with commit [2ffdf2b](https://github.com/ESNFranceG33kTeam/Universe/commit/2ffdf2ba3374dcf20d180cc5c5564238cb26b465).
- [ ] Create a settings view
    - [ ] "Launch at OS boot" option
    - [ ] Language selection
    - [ ] Import/Export settings
    - [ ] Delete settings
    

### LESS URGENT
- [x] Make a tutorial mode
- [x] Add a loading indicator on platforms
- [x] Launch tutorial mode when executed for the first time
- [x] Modify translation listener
- [ ] Review the function checking if the side menu is overflowed
- [ ] "What's new?" pop-up window
