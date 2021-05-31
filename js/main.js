/*----- constants -----*/
const SQUARE_FILL = {
    "1": "red",
    "-1": "blue",
    "null": "white"
};
    



const WIN = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
];

/*----- app's state (variables) -----*/
let gameBoard;
let player;
let winner;


/*----- cached element references -----*/
const squareEl = document.querySelectorAll("section div");
console.log(squareEl);
const headerEl = document.querySelector("h1");

/*----- event listeners -----*/
document.querySelector("section").addEventListener("click", fillSelection);

/*----- functions -----*/
init();
function init() {
    gameBoard = [null, null, null, null, null, null, null, null];
    player = 1; // game starts with player 1 then set to -1.
    winner = null; // set to 1, -1, T (for tie) or null;
    render();
}
function render() {
    gameBoard.forEach(function(square, idx) {
        squareEl[idx].style.background = SQUARE_FILL[square]
     if (winner === "T") {
         headerEl.innerHTML = "Tie Game!";
     } else if (winner){
        headerEl.innerHTML = `${SQUARE_FILL[player].toUpperCase()} Wins!`;

     } else {
    headerEl.innerHTML = `${SQUARE_FILL[player].toUpperCase()}'s turn`    
     } 
     

    });
    
}

function fillSelection(evt) {
   if (evt.target.tagName != "DIV") return;
   
    
   const idx = evt.target.id.replace("grid-box", "")
   // check if square is available and return if not
   if (gameBoard[idx] || winner) return;
   // update state (board, turn, winner)
   gameBoard[idx] = player;
   player *= -1;
   winner = getWinner();
console.log(idx)
console.log(player)
console.log(gameBoard);
   render();
 }

 function getWinner() {
     for(i=0; i< WIN.length; i ++) {
        if (Math.abs(gameBoard[WIN[i][0]] + gameBoard[WIN[i][1]] + gameBoard[WIN[i][2]]) === 3) return gameBoard[WIN[i][0]];
         
     };
     if (gameBoard.includes(null)) return null;
     return "T";
 }