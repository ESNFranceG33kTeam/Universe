const jsdoc2md = require('jsdoc-to-markdown');

jsdoc2md.render({ files: 'assets/js/modules/*.js' }).then(console.log);
