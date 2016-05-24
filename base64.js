
function convertTo64(newimg) {
	var img ;
var base64 = require('node-base64-image');

var path = __dirname + '/images/'+newimg+'.jpg',
    options = { localFile: true, string: true };



base64.base64encoder(path, options, function(err, image) {
    if (err) { console.log(err); }
    img = image;
    console.log(image);
});

	return img;
}

module.exports = convertTo64;


