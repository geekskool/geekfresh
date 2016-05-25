function addMenu() {
	var xhttp;
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var foodName = document.getElementById("foodName").value;
	var data = JSON.stringify(foodName);

	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	      document.getElementById("demo").innerHTML = xhttp.responseText;
	    }
	};

	xhttp.open("POST", "admin.html", true);
	// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(data);
}

