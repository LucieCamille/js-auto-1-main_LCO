//Selectionner element du DOM
const $board = document.querySelector('#board');
const $allCells = document.querySelectorAll('.cell'); //array avec liste de cellules
const $endMessage = document.querySelector('#winningMessage');
const $endMessageText = document.querySelector('#winningMessageText');
const $restartBtn = document.querySelector('#restartButton');
const $inputPlayer1 = document.querySelector('#addPlayer1');
const $inputPlayer2 = document.querySelector('#addPlayer2');
const $addPlayerBtn = document.querySelector('#addPlayerBtn');
const $playerTurn = document.querySelector('#playerTurn');


//Variables:
let playerX;
let playerO;

const players = [];

//codes gagnants:
const winningCodes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer = "";
let currentClass ="";
let isGameStarted = false;

//Fonction init
const init = () => {
  //newPlayer
  newPlayers();
  //newGame();
  newGame();
};

//Fonction new players:
const newPlayers = () => {
  $addPlayerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playerX = $inputPlayer1.value;
    playerO = $inputPlayer2.value;

    players.push(playerX, playerO);
    //console.log(players);
  });
};

//Fonction newGame
const newGame = () => {
  //1 - Remove classes x & circle on cells and board (sécurité)
  $board.classList.remove('x');
  $board.classList.remove('circle');
  $allCells.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('circle');
  });
  //2 - sélectionner joueur (random?)
  currentPlayer = players[Math.round(Math.random() * 2) +1];
    //2a - link currentPlayer to currentClass
  currentPlayer === playerX
   ? currentClass = "x" 
   : currentClass = "circle";
  console.log(currentPlayer);
  //2b - Add current class to board
  $board.classList.add(currentClass);
};

//relancer nouveau jeu:
$restartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  $endMessage.classList.remove('show');
  init();
  return
});

//change user
const changeUser = () => {
  $board.classList.remove(currentClass);
  if(currentClass === "x") {
    currentClass = "circle";
    currentPlayer = playerO;
  } else {
    currentClass = "x";
    currentPlayer = playerX;
  };
  //ajouter en html le currentPlayer
  $playerTurn.innerHTML = `<p>C'est au tour de: ${currentPlayer}</p>`;
};

//Finir le jeu:
// check if winning code
const checkWin = (currentClass) => {
  //Check si au moins une combinaison gagnante est présente dans allCells
  return winningCodes.some(winCode => {
    return winCode.every(index => {
      return $allCells[index].classList.contains(currentClass);
    })
  })
}

//Check si toutes les cellules sont remplies mais pas de winning code
const cellsFull = () => {
  return [...$allCells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  })
}

//endGame
//Gagné
const endGameWin = () => {
  $endMessage.classList.add('show');
  $endMessageText.innerHTML = `${currentPlayer}, c'est gagné!`
}

//egalité
const endGameEqty = () => {
  $endMessage.classList.add('show');
  $endMessageText.innerHTML = `Egalité!`
}

//Loop sur les cells
$allCells.forEach (cell => {
  //Event handleCell : "click" !
  cell.addEventListener('click', (e) => {
    e.preventDefault();
    //Ajout x ou o si case est vide
    //add current class à la target
      e.target.classList.add(currentClass);
      //Verifier si jeu finit ou non
      // Un joueur a gagné?
      if(checkWin(currentClass)){
        console.log(checkWin(currentClass));
        //endGame
        endGameWin();
        return
        //toutes les cellules sont pleine?
      } else if(cellsFull()) {
        console.log(cellsFull());
        //endGame Egalite
        endGameEqty();
        return
      } else {
        //on recommence
      }

    //change User
    changeUser();
    $board.classList.add(currentClass);
    //console.log(currentPlayer);
  },
  {once:true}
  );
});

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


init();

