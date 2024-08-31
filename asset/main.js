console.log("main file");

p1name = document.querySelector("#p1name");
p2name = document.querySelector("#p2name");

const boardui = document.querySelector(".board");
const ngmenu = document.querySelector(".ng_menu");

const p1_score = document.querySelector("#p1score");
const p2_score = document.querySelector("#p2score");
let nextPlayer;

async function startGame() {
	
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
	gameMode.setPlayers(player1, player2);
	gameMode.setMode(ft_mode);
	ngmenu.style.display = "none";
	boardui.style.display = "flex";
	let container = document.createElement('div');
	container.classList.add("board_container"); 
	boardui.appendChild(container);

	createGrid(3, "950", container, false);

	let nextPlayer = player1;


	let board = gameboard;
	if (!board.canPlay()){
		console.log("draw")	
		return false;
	}
		let isWinning = false;
	while ( isWinning === false){
		await Promise.resolve(myPromiseGenerator());
		let isDone;
		[isDone, isWinning] = nextPlayer.playTurn(board, x, y);
		if (!isDone){
			console.log("this cell is already taken")
		}
		else{
			let cellid = `cell-${x}-${y}`;
			drawMarker(nextPlayer.playerMarker, cellid)
			nextPlayer == player1 ? nextPlayer = player2 : nextPlayer = player1;
		}
		if (isWinning){
			console.log("we have a winner"); 
			showNotif("END OF THE FIRST ROUND", `${nextPlayer.playerName} won the round!`);
			nextPlayer.playerScore = parseInt(nextPlayer.playerScore) + 1;
			nextPlayer == player1 ? p1score.textContent = player1.playerScore : p2score.textContent = player2.playerScore;
		}
		
		
	}
}

	



//
//
//Draw a board dynamically, each cell is a DIV, with event listener
//
