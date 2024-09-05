
p1name = document.querySelector("#p1name");
p2name = document.querySelector("#p2name");

const boardui = document.querySelector(".board");
const ngmenu = document.querySelector(".ng_menu");
const ft_mode = document.querySelector(".ft_button.selected")

let nextPlayer;

let cellNb = 3;
let gridDim = window.screen.height - window.screen.height*0.5;

const ghistory = gameHistory();

async function startGame(player1=undefined, player2=undefined) {
	
	if (player1 === undefined && player2 === undefined){
		p1marker = document.querySelector("#p1marker");
		p2marker = document.querySelector("#p2marker");
		const pfp_p1 = document.querySelector("#ng_player1_pfp_display");
		const pfp_p2 = document.querySelector("#ng_player2_pfp_display");
		if (p1name.value ==="" || p2name.value === "" ){  
			//trigger error notif
			createNotif("Names are missing", "input a name for each player");
			return false;
		}
		//check if a marker is selected for each player 
		//make a marker selection for each player in Utils 
		if (p1marker === null || p1marker === "" || p2marker=== "" || p2marker === null ){
			createNotif("Markers are missing", "Select a marker for each player");
			return false;
		}
		player1 = player(p1name.value, "1", p1marker.src, pfp_p1.src);
		player2 = player(p2name.value, "2", p2marker.src, pfp_p2.src);
		let board_container = changeState(ngmenu, boardui, player1, player2);

		createGrid(cellNb, gridDim, board_container, false);
	}
	let board_container = document.querySelector(".board_container");
	resetGrid(board_container);
	
	const p1_score = document.querySelector("#p1score");
	const p2_score = document.querySelector("#p2score");

	const game = gameOb(player1, player2, selected_mode);
	let nextPlayer = player1;
	let winner = undefined;
	let board = gameboard;
	while (player1.playerScore < selected_mode && player2.playerScore < selected_mode ){
		let isWinning = false;
		while ( isWinning === false){
			let isDone = false;
			while (!isDone){
				await Promise.resolve(myPromiseGenerator());
				if (x !== undefined || y !== undefined ){
					[isDone, isWinning] = nextPlayer.playTurn(board, x, y);
				}
				isDone === false ? createNotif("CAN'T PLAY HERE", "A PLAYER ALREADY PLAYED HERE, PICK ANOTHER CELL", 5000): createNotif(`${nextPlayer.playerName} JUST PLAYED`, `${nextPlayer.playerName} played at ${x}, ${y}`, 5000);

			}
			let cellid = `cell-${x}-${y}`;
			drawMarker(nextPlayer.playerMarker, cellid)
			if (isWinning){
				nextPlayer.playerScore = parseInt(nextPlayer.playerScore) + 1;
				if (nextPlayer.playerScore != selected_mode){
					createNotif("END OF THE ROUND", `${nextPlayer.playerName} won the round!`);
				  nextPlayer == player1 ? p1score.textContent = ` ${player1.playerScore}` : p2score.textContent = ` ${player2.playerScore}`;
				}
				if (nextPlayer.playerScore == selected_mode){
					winner = nextPlayer;
				} 
				game.addRoundData(player1, player2, board, nextPlayer);
				board.resetBoard();
				player1.resetMoves();
				player2.resetMoves();

				resetGrid(board_container);
			}
			
			nextPlayer == player1 ? nextPlayer = player2 : nextPlayer = player1;
			
		}
		isWinning = false;
	}
	ghistory.addGame(game);
	interactModal();
	populateModal(`${winner.playerName} won this game !`,`${winner.playerName} won this game !`);

}

	



//
//
//Draw a board dynamically, each cell is a DIV, with event listener
//
