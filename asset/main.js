console.log("main file");

p1name = document.querySelector("#p1name");
p2name = document.querySelector("#p2name");

function startGame() {
	
	p1marker = document.querySelector("#p1marker");
	p2marker = document.querySelector("#p2marker");
	if (p1name.value ==="" || p2name.value === "" ){
		//trigger error notif
		console.log("names are missing ")
		return false;
	}
	//check if a merker is selected for each player 
	//make a marker selection for each player in Utils 
	console.log(p1marker);
	console.log(p2marker);
	if (p1marker === null || p1marker === "" || p2marker=== "" || p2marker === null ){
		console.log("no marker selected");
		return false;
	}
}
