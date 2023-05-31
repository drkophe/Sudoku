/////////////////////// VARIABLES ///////////////////////

let play = document.querySelector('#new_game');
let reset = document.querySelector('#reset');
let tryGame = document.querySelector('#valid'); 
let test = document.querySelector('#test');
let changeMode = document.querySelector('#mode');

let result = document.querySelector('#result');

let chooseDifficulty = document.querySelector('#difficulty');
console.log(chooseDifficulty.textContent);

let selectNumbers = document.querySelectorAll('#selection p');
console.log(selectNumbers);

let selectCase = document.querySelectorAll('#top p, #mid p, #bot p');
console.log(selectCase);

let error = 1;

let compare = true;

let tabGame = [];
let tabSolution = [];

let difficulty = {
    'Facile': 20,
    'Normal': 40,
    'Difficile': 60,
    'Impossible': 70
};

console.log(difficulty[chooseDifficulty.textContent]);

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
            col[x].style.color = '#646464';
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
            row[y].style.fontWeight = "normal";
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

  for(let j=0; j < difficulty[chooseDifficulty.textContent]; j++ ){ // en fonction de la difficulté le nombre d'itération change (donc le nombre de case aussi)

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
  for(let x=1; x<10; x++){
    let row = document.querySelectorAll(".row"+ x + " p");
    for(let y=0; y<9; y++){
      if(row[y].style.color == 'black'){
        row[y].textContent = '';
      }
    };
};
})

play.addEventListener('click', () => {
    error = 1;
    result.style.color = 'white';
    result.textContent = 'Resultat';
    while(error !== 0){
        error = 0;
        cleanBoard();
        remplirBoard();
        boardCheck();
    };
});

chooseDifficulty.addEventListener('click', () => {
  if(chooseDifficulty.textContent == 'Facile'){
    chooseDifficulty.textContent = 'Normal';
  } else if(chooseDifficulty.textContent == 'Normal'){
    chooseDifficulty.textContent = 'Difficile';
  } else if(chooseDifficulty.textContent == 'Difficile'){
    chooseDifficulty.textContent = 'Impossible';
  } else if(chooseDifficulty.textContent == 'Impossible'){
    chooseDifficulty.textContent = 'Facile';
  };
});

for(let i = 0; i < selectNumbers.length; i++){
  selectNumbers[i].addEventListener('click', () => {



    if(selectNumbers[i].style.fontWeight !== 'bolder' &&
    selectNumbers[i].style.fontSize !== '40px'){
      for(let j = 0; j < selectNumbers.length; j++){
        if(selectNumbers[j].style.fontWeight == 'bolder'){
          selectNumbers[j].style.fontWeight = 'normal';
          selectNumbers[j].style.fontSize = '30px';
          selectNumbers[j].style.boxShadow = "none";
        }
      }

      selectNumbers[i].style.fontWeight = 'bolder';
      selectNumbers[i].style.fontSize = '40px';
      selectNumbers[i].style.boxShadow = colorModeChange + " 0px 0px 10px";
    } else {
      selectNumbers[i].style.fontWeight = 'normal';
      selectNumbers[i].style.fontSize = '30px';
      selectNumbers[i].style.boxShadow = "none";
    }  

 
    // console.log(selectNumbers[i]);
  });
};

// for(let i = 0; i < selectNumbers.length; i++){
//   selectNumbers[i].addEventListener('click', () => {



//     for(let j = 0; j < selectNumbers.length; j++){
//       if(selectNumbers[j].style.fontWeight == 'bolder'){
//         console.log('Un nombre est déjà selectionné');
//         selectNumbers[j].style.fontWeight = 'normal';
//         selectNumbers[j].style.fontSize = '30px';

//         // selectNumbers[i].style.fontWeight = 'bolder';
//         // selectNumbers[i].style.fontSize = '40px';
//       } else {
//         if(selectNumbers[i].style.fontWeight == 'bolder' &&
//         selectNumbers[i].style.fontSize == '40px'){
//           selectNumbers[i].style.fontWeight = 'normal';
//           selectNumbers[i].style.fontSize = '30px';
//         } else {
//           selectNumbers[i].style.fontWeight = 'bolder';
//           selectNumbers[i].style.fontSize = '40px';
//         }
//       }
//     }
//     // console.log(selectNumbers[i]);
//   });
// };

for(let i = 0; i < selectCase.length; i++){
  selectCase[i].addEventListener('click', () => {
    for(let j = 0; j < selectNumbers.length; j++){ 


      if(selectCase[i].textContent == ""){

        if(selectNumbers[j].style.fontWeight == 'bolder'){

          console.log(selectNumbers[j]);
          selectCase[i].textContent = Number(selectNumbers[j].textContent);
          selectCase[i].style.color = 'black';
          selectCase[i].style.fontWeight = 'bolder';
        } 
      }
    };
    console.log(selectCase[i]);
  });
};


// CASE GREY !
// for(let i = 0; i < selectCase.length; i++){
//   selectCase[i].addEventListener('click', () => {
//     for(let j = 0; j < selectNumbers.length; j++){ 

//       // console.log(selectCase[i].style.backgroundColor)
//       if(selectCase[i].textContent == "" || selectCase[i].style.color !== 'blue'){

//         if(selectNumbers[j].style.fontWeight !== 'bolder' &&
//         selectNumbers[j].style.fontSize !== '40px'){
//           if(selectCase[i].style.backgroundColor == ''){
//             selectCase[i].style.backgroundColor = 'grey';
//           } else {
//             selectCase[i].style.backgroundColor = ''
//           }
//         } 
//       }
//     };
//     console.log(selectCase[i]);
//   });
// };


/////// TOUCHE DU CLAVIER  //////

// document.addEventListener('keydown', function(event) {
//   // Vérifier si la touche appuyée est "6" du pavé numérique
//   if (event.key === '6' && event.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
//     // Votre code ici pour l'événement de la touche "6" du pavé numérique
//     console.log(event.key);

//   }
// });

// document.addEventListener('keydown', function(event) {

//   let key = event.key;
//   // let numbers = [1,2,3,4,5,6,7,8,9];

//   for (let i=1; i<10; i++){
//     if (event.key === i && event.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD){
//       console.log(key);
//     }
//   }
// });




// GOOD !!! 
document.addEventListener('keydown', function(event) {
  var key = event.key;
  var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (numbers.includes(key) && event.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
    console.log("La touche '" + key + "' du pavé numérique a été appuyée.");
  }
});


/////////////

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
    result.style.color = 'rgb(138, 247, 138)';
    result.textContent = 'Victoire !';
  } else {
    console.log('Loose !');
    result.style.color = 'rgb(255, 113, 113)';
    result.textContent = 'Perdu ...';
  }
});

let colorModeChange = 'white';

changeMode.addEventListener('click', () => {
  if(changeMode.getAttribute('name') == 'moon-outline'){
    changeMode.setAttribute('name','sunny-outline');
    changeMode.style.color = '#222222';
    changeMode.nextElementSibling.textContent = 'light mode';

    document.querySelector('body').style.backgroundColor = 'white';

    document.querySelector('h1').style.color = '#222222';
    document.querySelector('h2').style.color = '#222222';

    colorModeChange = '#222222';

  } else if(changeMode.getAttribute('name') == 'sunny-outline') {
    changeMode.setAttribute('name','moon-outline');
    changeMode.style.color = 'white';
    changeMode.nextElementSibling.textContent = 'dark mode';

    document.querySelector('body').style.backgroundColor = '#222222';

    document.querySelector('h1').style.color = 'white';
    document.querySelector('h2').style.color = 'white';

    colorModeChange = 'white';
  }
  console.log(changeMode);
})
console.log(changeMode.nextSibling);