//Selectionner element du DOM
const $board = document.querySelector('#board');
const $allCells = document.querySelectorAll('.cell'); //array avec liste de cellules
const $endMessage = document.querySelector('#winningMessage');
const $endMessageText = document.querySelector('#winningMessageText');
const $restartBtn = document.querySelector('#restartButton');

//créer variables (players, isGameStarted)
const players = [
  "Player x",
  "Player o"
];

let currentPlayer = "";
let currentClass ="";
let isGameStarted = false;

//Fonction init
const init = () => {
  //newGame();
  newGame();
  //event handleCell

};


//Fonction newGame
const newGame = () => {
  //1 - Remove classes x & circle on cells and board (sécurité)
  if($board.classList.contains('x') || $board.classList.contains('circle')) {
    $board.classList.remove('x');
    $board.classList.remove('circle');
  };
  $allCells.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('circle');
  });
  //2 - sélectionner joueur (random?)
  currentPlayer = players[Math.round(Math.random() * (players.length - 1))];
    //2a - link currentPlayer to currentClass
  currentPlayer === "Player x" ? currentClass = "x" : currentClass = "circle";
  console.log(currentPlayer);
  //2b - Add current class to board
  $board.classList.add(currentClass);
};

//Loop sur les cells
$allCells.forEach (cell => {
  //Event handleCell : "click" !
  cell.addEventListener('click', (e) => {
    e.preventDefault();
    //Ajout x ou o si case est vide
    //1 cell contains x or circle?
    if(e.target.classList.contains('x') || e.target.classList.contains('circle')){
      return;
    } else {
      //No: add current class à la target
        e.target.classList.add(currentClass);
    }
    //change User
    changeUser();
    $board.classList.add(currentClass);
    console.log(currentPlayer);
  },
  {once:true}
  );
  
  //Verifier si jeu finit ou non
  
  //2 3contiguous cells contain x?
    //playeur win
      //renderGameWin
      //return
      //Event click on button => newGame
    //Else if 3contiguous cells contains circle?
      //circle playeur win
        //renderGameWin
        //return
        //Event click on button => newGame
    //Else if toutes les cell sont remplies
      //message egalite
      //return
      //Event click on button => newGame
    //Else
    //Changement de joueur
    //if board contains x => replace by circle
      //else replace by x
  
  //3 renderGame();
    
});

//change user
const changeUser = () => {
  $board.classList.remove(currentClass);
  if(currentClass === "x") {
    currentClass = "circle";
    currentPlayer = "Player o";
  } else {
    currentClass = "x";
    currentPlayer = "Player x";
  };
}

//renderGame

init();

