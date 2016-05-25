var attempt = 3; // Variable to count number of attempts.

function validate() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	if ( username === "Username" && password === "password") {
		//alert ("Login successfully");
		window.location = "www.google.com"; //alert("ks")
		return false;
	} else {
		attempt --;
		alert("You have left "+attempt+" attempt;");
		if( attempt == 0) {
			document.getElementById("username").disabled = true;
			document.getElementById("password").disabled = true;
			document.getElementById("submit").disabled = true;
			return false;
		}
	}
}

