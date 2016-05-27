function securePassword() {
	var passNode = document.getElementById('password')
	var hashedPass = Sha256.hash(passNode.value)
	passNode.value = hashedPass
	return true
}



