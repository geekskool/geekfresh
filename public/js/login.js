function securePassword() {
	var passNode = document.getElementById('password');
	var salt ="secret";
	var hashedPass = Sha256.hash(salt+passNode.value);
	passNode.value = hashedPass
	return true
}



