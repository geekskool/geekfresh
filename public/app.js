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

function makeDiv() {
    getJSON('/all', function(responseText) {
    // console.log(typeof text);
    // console.log(JSON.stringify(responseText));
    for (var i = 0; i < responseText.length; i++) {
        var content = document.querySelector("template").content;
        var firstChild = content.firstElementChild
        firstChild.src = '/images/' + responseText[i].image;
        var lastChild = content.lastElementChild;
        lastChild.innerHTML = responseText[i].description;
        var main = document.getElementById("main-div");
        main.appendChild(document.importNode(content, true));
    }
});
}




