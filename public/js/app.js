var get = function(url, callback) {
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
    get(url, function(text) {
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
            var btn = content.querySelector('button');
            btn.value = JSON.stringify(responseText[i]);
            var cost = content.querySelector('p');
            cost.innerHTML = responseText[i].cost;

            console.log("Cost : " + responseText[i].cost);
            console.log("description : " + responseText[i].description);
            console.log("description : " + responseText[i].image);

            var main = document.getElementById("main-div");
            main.appendChild(document.importNode(content, true));
        }
    });
}


count = 0;
count2 = 0;


function getValue(item) {
    item = JSON.parse(item);

    count += item.cost;
    count2++;
    document.getElementById('cartid').innerHTML = count;
    document.getElementById('total').innerHTML = count2;

    console.log(cart);

}
