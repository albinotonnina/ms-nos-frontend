var dyson = require('dyson');

dyson.bootstrap({
	configDir: __dirname + '/static',
	port: 3000
});



// Provided dyson is installed globally,
// the equivalent for this script from the CLI would be: `dyson services`
