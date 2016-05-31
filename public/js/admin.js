function displayUpdateMenu() {
	displayMenu()
	var a1 = document.getElementById("addAnchor")
	a1.classList.remove("selected");
	var a2 = document.getElementById("updateAnchor")
	a2.classList.add("selected");
	document.querySelector(".content1").style.display = "none"
	document.querySelector(".content2").style.display = "block"
}

function displayAddMenu(argument) {
	var a1 = document.getElementById("updateAnchor")
	a1.classList.remove("selected");
	var a2 = document.getElementById("addAnchor")
	a2.classList.add("selected");
	document.querySelector(".content1").style.display = "block"
	document.querySelector(".content2").style.display = "none"
}

function displayUser() {
	var xhttp
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest()
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/user", true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	document.getElementById("userLbl").innerHTML = "Logged in as " + xhttp.responseText
	    }
	}
	xhttp.send()
}

function displayMenu() {
	var xhttp
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest()
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/allNames", true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	document.getElementById("menu").innerHTML = xhttp.responseText
	    }
	}
	xhttp.send()
}



