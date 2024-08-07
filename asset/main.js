console.log("tictactoe");


const player = function (name) {
	const playerName = name;
	let playerSymbol = "";

	const setSymbol = (newSymbol) => playerSymbol = newSymbol;
	const getSymbol = () => playerSymbol;

	return {playerName, playerSymbol, setSymbol, getSymbol}
};

const gameboard = (function () {
	const board = [["","",""],["","",""],["","",""]]; 
	const setBoard = (x,y,symbol) => board[x][y] =symbol;
	return {board, setBoard };
})();


const player1 = player("sil", "x");

console.log(player1.getSymbol());
console.log(player1.setSymbol("o"));
console.log(player1.getSymbol());

gameboard.setBoard(0,0,player1.getSymbol());

console.log(gameboard.board);

