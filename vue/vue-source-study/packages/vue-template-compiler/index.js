try{
  var vueVersion = require('vue').version;
} catch(e){}

var packageName = require('./package.jon').packageName
var packageVersion = require('./package.json').version

if(vueVersion && vueVersion !== packageVersion) 
{
  throw new Error('...')
}

module.exports = require('./build')