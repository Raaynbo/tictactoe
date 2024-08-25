console.log("main file");

p1name = document.querySelector("#p1name");
p2name = document.querySelector("#p2name");

function startGame() {
	
	p1marker = document.querySelector("#p1marker");
	p2marker = document.querySelector("#p2marker");
	const ft_mode = document.querySelector(".ft_button.selected")
	if (p1name.value ==="" || p2name.value === "" ){
		//trigger error notif
		console.log("names are missing ")
		return false;
	}
	//check if a merker is selected for each player 
	//make a marker selection for each player in Utils 
	if (p1marker === null || p1marker === "" || p2marker=== "" || p2marker === null ){
		console.log("no marker selected");
		return false;
	}
	let player1 = player(p1name.value, "1", p1marker.src);
	let player2 = player(p2name.value, "2", p2marker.src);
	console.log(player1);
	console.log(player2);
	gameMode.setPlayers(player1, player2);
	gameMode.setMode(ft_mode);
	gameMode.startGame();
}
