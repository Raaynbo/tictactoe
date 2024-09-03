
p1name = document.querySelector("#p1name");
p2name = document.querySelector("#p2name");

const boardui = document.querySelector(".board");
const ngmenu = document.querySelector(".ng_menu");
const ft_mode = document.querySelector(".ft_button.selected")

let nextPlayer;

let gridDim = 950;
let cellNb = 3;
const ghistory =gameHistory();

async function startGame() {
	
	p1marker = document.querySelector("#p1marker");
	p2marker = document.querySelector("#p2marker");
	const pfp_p1 = document.querySelector("#ng_player1_pfp_display")
	const pfp_p2 = document.querySelector("#ng_player2_pfp_display")
	if (p1name.value ==="" || p2name.value === "" ){  
		//trigger error notif
		showNotif("Names are missing", "input a name for each player");
		return false;
	}
	//check if a merker is selected for each player 
	//make a marker selection for each player in Utils 
	if (p1marker === null || p1marker === "" || p2marker=== "" || p2marker === null ){
		showNotif("Markers are missing", "Select a marker for each player");
		return false;
	}
	let player1 = player(p1name.value, "1", p1marker.src, pfp_p1.src);
	let player2 = player(p2name.value, "2", p2marker.src, pfp_p2.src);
	let container = changeState(ngmenu, boardui, player1, player2);

	createGrid(cellNb, gridDim, container, false);

	
	const p1_score = document.querySelector("#p1score");
	p1_score.textContent = player1.playerName;
	const p2_score = document.querySelector("#p2score");
	p2_score.textContent = player2.playerName;

	const game = gameOb(player1, player2, ft_mode);
	let nextPlayer = player1;
	let winner = undefined;
	let board = gameboard;
	while (player1.playerScore < ft_mode.textContent && player2.playerScore < ft_mode.textContent ){
		let isWinning = false;
		while ( isWinning === false){
			let isDone = false;
			while (!isDone){
				await Promise.resolve(myPromiseGenerator());
				if (x !== undefined || y !== undefined ){
					[isDone, isWinning] = nextPlayer.playTurn(board, x, y);
				}
				isDone === false ? showNotif("CAN'T PLAY HERE", "A PLAYER ALREADY PLAYED HERE, PICK ANOTHER CELL", 5000): showNotif(`${nextPlayer.playerName} JUST PLAYED`, `${nextPlayer.playerName} played at ${x}, ${y}`, 5000);

			}
			let cellid = `cell-${x}-${y}`;
			drawMarker(nextPlayer.playerMarker, cellid)
			if (isWinning){
				showNotif("END OF THE FIRST ROUND", `${nextPlayer.playerName} won the round!`);
				nextPlayer.playerScore = parseInt(nextPlayer.playerScore) + 1;
				if (nextPlayer.playerScore == ft_mode.textContent){
					winner = nextPlayer;
				} 
				game.addRoundData(player1, player2, board, nextPlayer)
				  nextPlayer == player1 ? p1score.textContent = ` ${player1.playerScore}` : p2score.textContent = ` ${player2.playerScore}`;
				board.resetBoard();
				player1.resetMoves();
				player2.resetMoves();

				resetGrid(container);
			}
			
			nextPlayer == player1 ? nextPlayer = player2 : nextPlayer = player1;
			
		}
		isWinning = false;
	}

	interactModal();
	populateModal(`${winner.playerName} won this game !`,`${winner.playerName} won this game !` )
	console.log("print rematch ui")
}

	



//
//
//Draw a board dynamically, each cell is a DIV, with event listener
//
