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
	    	var json = JSON.parse(xhttp.responseText)
			for(var x in json) {
	    		addMenu(json[x])
	    	}
	    }
	}
	xhttp.send()
}

function addMenu(value) {
	var menuDropDownList = document.getElementById("menuList")
    var option = document.createElement("option")
    option.text = value
    menuDropDownList.add(option)
}

function onSelect() {
	var selectBox = document.getElementById("menuList")
	var selectedValue = selectBox.options[selectBox.selectedIndex].value
	document.getElementById("menuList").style.display = "none"
	fillUpdateForm(selectedValue)
	document.getElementById('updateFoodId').readOnly = true
	document.getElementById('updateFoodName').readOnly = true
	document.getElementById('updateFoodDesc').readOnly = true
	document.getElementById('updateQuantity').readOnly = true
	document.getElementById('updateIngredients').readOnly = true
	document.getElementById('updateCategory').readOnly = true
	document.getElementById('updateCost').readOnly = true
	document.getElementById('updateImage').readOnly = true
	document.getElementById('updateLocation').readOnly = true
	document.getElementById("menuForm").style.display = "block"
}

function fillUpdateForm(selectedMenu) {
	var xhttp
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest()
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/all", true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	var json = JSON.parse(xhttp.responseText)
			for(var x in json) {
	    		if (selectedMenu === json[x].name) {
	    			document.getElementById("updateFoodId").value = json[x].id
	  				document.getElementById("updateFoodName").value = json[x].name
	  				document.getElementById("updateFoodDesc").value = json[x].description
	  				document.getElementById("updateQuantity").value = json[x].quantity
	  				document.getElementById("updateIngredients").value = json[x].ingredients
	  				document.getElementById("updateCategory").value = json[x].category
	  				document.getElementById("updateCost").value = json[x].cost
	  				document.getElementById("updateImage").value = json[x].image
	  				document.getElementById("updateLocation").value = json[x].location
	    		}
	    	}
	    }
	}
	xhttp.send()
}

function enableEdit() {
	document.getElementById('updateFoodId').readOnly = false
	document.getElementById('updateFoodName').readOnly = false
	document.getElementById('updateFoodDesc').readOnly = false
	document.getElementById('updateQuantity').readOnly = false
	document.getElementById('updateIngredients').readOnly = false
	document.getElementById('updateCategory').readOnly = false
	document.getElementById('updateCost').readOnly = false
	document.getElementById('updateImage').readOnly = false
	document.getElementById('updateLocation').readOnly = false
	document.getElementById('editBtn').style.display = "none"
	document.getElementById('updateBtn').style.display = "block"
	
}



