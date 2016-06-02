var get = function(url,callback) {
	var http = new XMLHttpRequest();
    http.open("GET", url, true);
    // console.log(http);
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            // console.log(typeof http.responseText);
            callback(http.responseText);                 
        }  
    }   
    http.send();
}

function getJSON(url, callback) {
	get(url,function(text) {
        // console.log(typeof JSON.parse(text));
        callback(JSON.parse(text));
    });
}
getJSON('/all', function(text) {
    console.log(JSON.stringify(text));
});



