/////////////////////// VARIABLES ///////////////////////

let play = document.querySelector('#play');
let reset = document.querySelector('#reset');
let tryGame = document.querySelector('#try'); 
let test = document.querySelector('#test');

let result = document.querySelector('#result');

let chooseDifficulty = document.querySelector('#difficulty');
// console.log(chooseDifficulty);

let selectNumbers = document.querySelectorAll('#selection p');
console.log(selectNumbers);

let selectCase = document.querySelectorAll('#top p, #mid p, #bot p');
console.log(selectCase);

let error = 1;

let compare = true;

let tabGame = [];
let tabSolution = [];

let difficulty = {
    'easy': 20,
    'medium': 40,
    'hard': 60,
    'impossible': 70
};

console.log(difficulty[chooseDifficulty.value]);

// test.addEventListener('click', () => {
//     console.log(chooseDifficulty.value);
// });

/////////////////////// FUNCTIONS ///////////////////////

function randomNumber (tab){
    return tab[Math.floor(Math.random() * tab.length)];
};

function remplirBoard(){
    for(let y=1; y<10; y++){
        let col = document.querySelectorAll(".col"+ y);
        for(let x=0; x<9; x++){
            let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            let blockElements = document.querySelectorAll("#" + col[x].parentElement.parentElement.id + " p");
            let colElements = document.querySelectorAll("." + col[x].className);
            let rowElements = document.querySelectorAll("." + col[x].parentElement.className + " p");

            blockElements.forEach( (elementBlock) => {
                numbers = numbers.filter((n) => n !== (Number(elementBlock.textContent)));
            });

            colElements.forEach( (elementBlock) => {
                numbers = numbers.filter((n) => n !== (Number(elementBlock.textContent)));
            });
            
            rowElements.forEach( (elementBlock) => {
                numbers = numbers.filter((n) => n !== (Number(elementBlock.textContent)));
            });

            col[x].textContent = randomNumber(numbers);
        };
    };
};

function boardCheck(){
    let tabValid = [
        [],
        [],
        [],
    
        [],
        [],
        [],
    
        [],
        [],
        [],
    ];
    for(x=1; x<10; x++){
        let row = document.querySelectorAll(".row"+ x + " p");
        for(let y=0; y<9; y++){
            tabValid[x-1].push(Number(row[y].textContent));
            if(Number(row[y].textContent == 0)){
                error++;
            };
        };
    };
    if (error == 0){
        // console.log(tabValid);
        tabSolution = tabValid;
        console.log(tabSolution);
        setDifficulty(); // effacer les cases en fonction de la diffuculté
        makeBoardGame(); // préparer le tab qui servira de référence pour comparer au tabSolution
    };
};

function cleanBoard(){
    for(let x=1; x<10; x++){
        let row = document.querySelectorAll(".row"+ x + " p");
        for(let y=0; y<9; y++){
            row[y].textContent = '';
            row[y].style.color = "black";
        };
    };
};

// NOUVELLE FONCTION : COMMENTER //


// Effacer des cases en fonction de la difficulté
function setDifficulty(){

  // Sélectionner tout les p qui sont contenu dans #top #mid et #bot
  let p = document.querySelectorAll("#top p, #mid p, #bot p");

  // Définir un tableau qui contiendra tout les index des cases donc : tabindex = 1,....,81;
  let tabIndex = [];
  for(let i=0; i<p.length; i++){
      tabIndex.push(i+1);
  };
 
  // Définir un tableau qui servira de référence pour savoir si un index a déjà été utilisé ou pas (pour ne pas réutiliser)
  let tabIndexSelectionne = [];

  for(let j=0; j < difficulty[chooseDifficulty.value]; j++ ){ // en fonction de la difficulté le nombre d'itération change (donc le nombre de case aussi)

    // Définir un index pris alétoirement parmis tout ceux de tabIndex[]
      let indexAleatoire = Math.floor(Math.random() * tabIndex.length);

      // Tant que l'indexAléatoire est inclus (compris) dans le tableau des index déja selectionné :
      while(tabIndexSelectionne.includes(indexAleatoire)){

        // continué de changer l'indexAlétoire par un des index de tabIndex
        indexAleatoire = Math.floor(Math.random() * tabIndex.length);
      }
      
      // quand c'est ok  : injecté dans le tableau des index déja sélectioné, l'index aléatoire récupéré précédemment
      tabIndexSelectionne.push(indexAleatoire);

      // aller chercher la case p correspondant a l'index aléatoire et la vidé
      p[indexAleatoire].textContent = "";

      // console.log(difficulty[chooseDifficulty]);
  }
};  

// Faire le tableau joueur qui servira de référence pour comparer au tableau Solution
function makeBoardGame(){

  // Définir un tableau vide (meme format que tabSolution/tabValid)
  let tabBoardGame = [
    [],
    [],
    [],

    [],
    [],
    [],

    [],
    [],
    [],
  ];

  // Définir un compteur de case vide (celle qui contiennent 0)
  let compteur = 0;

  for(x=1; x<10; x++){
    let row = document.querySelectorAll(".row"+ x + " p");
    for(let y=0; y<9; y++){

      // inséré dans le tableau tabBoardGame les nombres dans les cases dans l'ordre
        tabBoardGame[x-1].push(Number(row[y].textContent));

        // si la case est vide (donc égale a 0)
        if(Number(row[y].textContent) == 0){

            // ajouter +1 au compteur de 0
            compteur++
        }
    };
  };

  // enregistrer tabGame avec tabBoradGame
  tabGame = tabBoardGame;

  //afficher le tableau et le compteur
  console.log(tabGame);
  console.log(compteur);
};


/////////////////////// ACTIONS ///////////////////////

while(error !== 0){
    error = 0;
    cleanBoard();
    remplirBoard();
    boardCheck();
}

reset.addEventListener('click', () => {
    cleanBoard();
    error = 0;
})

play.addEventListener('click', () => {
    error = 1;
    while(error !== 0){
        error = 0;
        cleanBoard();
        remplirBoard();
        boardCheck();
    };
});

for(let i = 0; i < selectNumbers.length; i++){
  selectNumbers[i].addEventListener('click', () => {

    for(let j = 0; j < selectNumbers.length; j++){
      if(selectNumbers[j].style.fontWeight == 'bolder'){
        console.log('Un nombre est déjà selectionné');
        selectNumbers[j].style.fontWeight = 'normal';
        selectNumbers[j].style.fontSize = '30px';
      } else {
        if(selectNumbers[i].style.fontWeight == 'bolder' &&
        selectNumbers[i].style.fontSize == '40px'){
          selectNumbers[i].style.fontWeight = 'normal';
          selectNumbers[i].style.fontSize = '30px';
        } else {
          selectNumbers[i].style.fontWeight = 'bolder';
          selectNumbers[i].style.fontSize = '40px';
        }
      }
    }
    // console.log(selectNumbers[i]);
  });
};

for(let i = 0; i < selectCase.length; i++){
  selectCase[i].addEventListener('click', () => {
    for(let j = 0; j < selectNumbers.length; j++){ 
      if(selectCase[i].textContent == "" || selectCase[i].style.color == 'blue'){
        if(selectNumbers[j].style.fontWeight == 'bolder' &&
        selectNumbers[j].style.fontSize == '40px'){
          console.log(selectNumbers[j]);
          selectCase[i].textContent = Number(selectNumbers[j].textContent);
          selectCase[i].style.color = 'blue';
        }
      }
      // console.log(selectNumbers[i]);
    };
    console.log(selectCase[i]);
  });
};

tryGame.addEventListener('click', () => {
  makeBoardGame();
  console.log(tabGame);
  console.log(tabSolution);

  compare = true;

  for(let x=0; x<9; x++){
    for(let y=0; y<9; y++){
        // compare = true;
        if(tabGame[x][y] !== tabSolution[x][y]){
          compare = false;
        }
        console.log(compare);
    };
};

console.log(compare);

  if(compare == true){
    console.log('Win !')
    result.style.color = 'green';
    result.textContent = 'Gagner !';
  } else {
    console.log('Loose !');
    result.style.color = 'red';
    result.textContent = 'Perdu ... Essaie encore !';
  }
});