console.log("tictactoe");


const player = function (name, symbol) {
	const playerName = name;
	let playerSymbol = symbol;

	const playerMoves = [];
	const setSymbol = (newSymbol) => playerSymbol = newSymbol;
	const getSymbol = () => playerSymbol;
	const playTurn = (board, x,y) => {
		if (!board.setBoard(x,y, playerSymbol)){
			console.log("cant play here");
			return [false, false];
		}
		console.log(`${playerName} played at ${x}, ${y}`);
		playerMoves.push(`${x},${y}`) ;
		if (playerMoves.length >= 3){
			return [true , board.isWinnerMove(playerMoves)];
		}
		return [true, false];
		};

	return {playerName, playerSymbol, playerMoves, setSymbol, getSymbol, playTurn}
};

const gameboard = (function () {
	const board = [["","",""],["","",""],["","",""]]; 
	const wincase = [["0,0", "0,1", "0,2"],
			["0,1", "1,1", "2,1"],
			["0,2", "1,2", "2,2"],
			["0,0", "1,0", "2,0"],
			["1,0", "1,1", "1,2"],
			["2,0", "2,1", "2,2"],
			["0,0", "1,1", "2,2"],
			["0,2", "1,1", "2,0"]];

	const setBoard = (x,y,symbol) => {
			if (board[y][x] !== ""){
			return false;
			}
			board[y][x] = symbol;
			return true;
		};
	const resetBoard = () => board.fill(["","",""]);

	const isWinnerMove = (history) => {
		// this function shouldnt be run until the moveHistory length is eqaul to 3 or higher 
		// iterate over moveHistory, filter wincase to have all cases having this specific move, then check if the 2 others wincase moves are part of the history list
		let playerWinningState = 0;
		let winCond = wincase;
		let winningMove = [];
		loop1:
		for (let i= 0; i < history.length; i++){
			winCond = winCond.filter((cases) => {
				if ( cases.includes(history[i])){
					return cases;
				}
			});

			let pWinCond = winCond;
			loop2:
			for (let j= 0; j < history.length; j++){
				if (history[i] === history[j])
				continue loop2;
				pWinCond.forEach((possibleWin) => {
					if (possibleWin.includes(history[j]) == true)
					{
						pWinCond = [];
						pWinCond.push(possibleWin);
						playerWinningState++;
					}
				});
				if (playerWinningState === 2){
					console.log("we have a winner here");
					return true;
				}
				if (j === history[j].length-1){
					pWinCond = wincase;
					playerWinningState = 0;
				}
				console.log(`playerwinningState = ${playerWinningState}`)


			}
			
		}	
		return false;
	};  
	const canPlay = () => {
		let empty = false;
		board.forEach((row) => {
			empty = empty || row.includes("");
		});
		return empty;
	};

	return {board, setBoard, resetBoard, wincase, isWinnerMove, canPlay};
})();

const gameMode = (function () {
	let p1, p2 = "";
	let board = gameboard;
	const setPlayers = (player1, player2) => {
		p1 = player1;
		p2 = player2;
	};

	const playersTurn = (player) => {
		//display input to select next pos xy
		// store user input into a var called pos
		//place marker on board
		let isDone = false;
		let isWinner = false;
		while (!isDone){
			const x = window.prompt(`${player.playerName}: x pos`);
			const y = window.prompt(`${player.playerName}: y pos`);
			const regexp = /[0-2]/;
			if (x.match(regexp) !== null && y.match(regexp) !== null ){
				[isDone, isWinner] = player.playTurn(board, x,y);
			}else{
				console.log("please play in the bound [0-1-2]");
			}
	
		}
		if (isWinner === true)
			return true;
		//check if wincond
		//return result
	};
	
	const startGame = () => {
		let nextPlayer = p1;	
		
		while (board.canPlay() ){
		
			if (playersTurn(nextPlayer)){
			console.table(board.board);
				break;
			}
			console.table(board.board);
		//define who will play this turn in a var called nextPlayer
		// check if board still has empty cell to play
			// if not draw
			// wait for nextPlayer move 
			// change who is nextPlayer
			if (nextPlayer == p1){
				nextPlayer = p2;
			}else{
				nextPlayer = p1;
			}
		}
		console.log(`${nextPlayer.playerName} won !`);
	};
	return {p1, p2, board, setPlayers,playersTurn, startGame};
})();


const player1 = player("sil", "x");
const player2 = player("sisl", "o");

gameMode.setPlayers(player1, player2);
//gameMode.startGame();

//player1.playTurn(gameboard, 0, 1);






