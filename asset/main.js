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
			return false;
		}
		console.table(board.board);
		console.log(`${playerName} played at pos ${x}, ${y}`);
		playerMoves.push(`${x},${y}`) ;
		return true;
		};

	return {playerName, playerSymbol, playerMoves, setSymbol, getSymbol, playTurn}
};

const gameboard = (function () {
	const board = [["","",""],["","",""],["","",""]]; 
	const setBoard = (x,y,symbol) => {
			if (board[y][x] !== ""){
			return false;
			}
			board[y][x] = symbol;
			return true;
		};
	const resetBoard = () => board.fill(["","",""]);
	const winCond = (symbol) => {
		for (let i = 0; i<board.length; i++){
		console.log(i);	
		}
	};

	const isEmpty = (row) => row.includes("");  

	const canPlay = () => {
		let empty = false;
		board.forEach((row) => {
			empty = empty || row.includes("");
		});
		return empty;
	};

	return {board, setBoard, resetBoard , winCond,isEmpty, canPlay};
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
		while (!isDone){
			const x = window.prompt(`${player.playerName}: x pos`);
			const y = window.prompt(`${player.playerName}: y pos`);
			const regexp = /[0-2]/;
			if (x.match(regexp) !== null && y.match(regexp) !== null ){
				isDone = player.playTurn(board, x,y);
			}else{
				console.log("please play in the bound [0-1-2]");
			}
	
		}
		console.log(player.playerMoves);
		//check if wincond
		//return result
	};
	
	const startGame = () => {
		let nextPlayer = p1;	
		
		while (board.canPlay() ){
		
			console.log(nextPlayer);
			playersTurn(nextPlayer);
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
	};
	return {p1, p2, board, setPlayers,playersTurn, startGame};
})();


const player1 = player("sil", "x");
const player2 = player("sisl", "o");

gameMode.setPlayers(player1, player2);
gameMode.startGame();

//player1.playTurn(gameboard, 0, 1);






