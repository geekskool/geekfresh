module.exports = function() {

    var jsonfile = require('jsonfile');

    var sha256 = require('js-sha256');
    // var rand = require('csprng');
    var salt = "secret";

    var pass = "geekskool_admin";
    var obj = {};

    var hashedPass = sha256(salt + pass);
    // localStorage.setItem('pass', hashedPass);
    obj.password = hashedPass;

    //console.log(JSON.stringify(obj));

    /*var fs = require('fs');
fs.writeFile('config.json', obj, function (err) {
  if (err) return console.log(err);
  console.log();
});*/

    jsonfile.writeFileSync('./config.json', obj);

};
