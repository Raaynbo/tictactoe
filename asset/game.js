console.log("tictactoe");


const player = function (name, symbol, marker) {
	const playerName = name;
	let playerSymbol = symbol;
	const playerMarker = marker;
	const playerScore = 0;

	let playerMoves = [];
	const resetMoves = () => {
			while (playerMoves.length > 0){
			playerMoves.pop();
		}
	};
	
	const setSymbol = (newSymbol) => playerSymbol = newSymbol;
	const getSymbol = () => playerSymbol;
	const playTurn = (board, x,y) => {
		if (!board.setBoard(x,y, playerSymbol)){
			console.log("cant play here");
			console.log(x)
			console.log(y)
			return [false, false];
		}
		console.log(`${playerName} played at ${x}, ${y}`);
		playerMoves.push(`${x},${y}`) ;
		if (playerMoves.length >= 3){
			return [true , board.isWinnerMove(playerMoves)];
		}
		return [true, false];
		};

	return {playerName, playerSymbol,playerMarker,playerScore, playerMoves, resetMoves, setSymbol, getSymbol, playTurn}
};

const gameHistory = function() {

	const gameList = [];

	const addGame = (game) => {
		gameList.push(game);	
	};
	return {gameList, addGame}; 
};

const gameOb = function(player1, player2, ft) {
	const p1 = player1;
	const p2 = player2;
	const ftmode = ft;
	const round = [];

	const addRoundData = (infoP1, infoP2, board, winner) => 
	{
		round.push([infoP1, infoP2, board, winner]);
	};

	return {p1, p2, ft, round, addRoundData}
	// 0-0 0-1 0-2 0-3 
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
			if (board[x][y] !== ""){
			return false;
			}
			board[x][y] = symbol;
			return true;
		};
	const resetBoard = () =>{
		board.forEach((row) => {
			row.fill("");
		})
	}; 

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
					console.log(pWinCond)
					return true;
				}
				if (j === history[j].length-1){
					pWinCond = wincase;
					playerWinningState = 0;
				}


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




//gameMode.startGame();

//player1.playTurn(gameboard, 0, 1);






