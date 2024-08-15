console.log("tictactoe");


const player = function (name, symbol) {
	const playerName = name;
	let playerSymbol = symbol;

	const setSymbol = (newSymbol) => playerSymbol = newSymbol;
	const getSymbol = () => playerSymbol;
	const playTurn = (board, x,y) => {if (board.setBoard(x,y,playerSymbol) !== true){
			console.log("Cant play here");
			return false;
		}
		console.log(`${playerName} played at pos ${x}, ${y}`);
	};

	return {playerName, playerSymbol, setSymbol, getSymbol, playTurn}
};

const gameboard = (function () {
	const board = [["","",""],["","",""],["","",""]]; 
	const setBoard = (x,y,symbol) => {
			if (board[x][y] !== ""){
			return false;
			}
			board[x][y] = symbol;
			return true;
		};
	const resetBoard = () => board.fill(["","",""]);
	const winCond = () => {
		for (let i = 0; i<board.length; i++){
		console.log(i);	
		}
	};
	return {board, setBoard, resetBoard , winCond};
})();


const player1 = player("sil", "x");
const player2 = player("sisl", "o");


player1.playTurn(gameboard, 0, 1);

console.table(gameboard.board);

player2.playTurn(gameboard, 0, 0);

player1.playTurn(gameboard, 0, 0);
console.table(gameboard.board);

gameboard.winCond();



