/////////////////////// Variable ///////////////////////

let play = document.querySelector('#new_game');
let reset = document.querySelector('#reset');
let valid = document.querySelector('#valid'); 
let changeMode = document.querySelector('#mode');
let result = document.querySelector('#result');

let chooseDifficulty = document.querySelector('#difficulty');
console.log(chooseDifficulty.textContent);
let difficulty = {
  'Facile': 20,
  'Normal': 40,
  'Difficile': 60,
  'Impossible': 70
};

let selectNumbers = document.querySelectorAll('#selection p');
console.log(selectNumbers);
let selectCase = document.querySelectorAll('#top p, #mid p, #bot p');
console.log(selectCase);

let error = 1;
let compare = true;
let colorModeChange = 'white';

let tabGame = [];
let tabSolution = [];

/////////////////////// Functions ///////////////////////

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

function setDifficulty(){
  let p = document.querySelectorAll("#top p, #mid p, #bot p");
  let tabIndex = [];
  for(let i=0; i<p.length; i++){
      tabIndex.push(i+1);
  };
 
  let tabIndexSelectionne = [];

  for(let j=0; j < difficulty[chooseDifficulty.textContent]; j++ ){
      let indexAleatoire = Math.floor(Math.random() * tabIndex.length);
      while(tabIndexSelectionne.includes(indexAleatoire)){
        indexAleatoire = Math.floor(Math.random() * tabIndex.length);
      }
      tabIndexSelectionne.push(indexAleatoire);
      p[indexAleatoire].textContent = "";
  }
};  

function makeBoardGame(){
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
  let compteur = 0;

  for(x=1; x<10; x++){
    let row = document.querySelectorAll(".row"+ x + " p");
    for(let y=0; y<9; y++){
        tabBoardGame[x-1].push(Number(row[y].textContent));
        if(Number(row[y].textContent) == 0){
            compteur++
        }
    };
  };
  tabGame = tabBoardGame;
  // console.log(tabGame);
  // console.log(compteur);
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

valid.addEventListener('click', () => {
  makeBoardGame();
  compare = true;

  for(let x=0; x<9; x++){
    for(let y=0; y<9; y++){
        if(tabGame[x][y] !== tabSolution[x][y]){
          compare = false;
        }
    };
};

  if(compare == true){
    result.style.color = 'rgb(138, 247, 138)';
    result.textContent = 'Victoire !';
  } else {
    result.style.color = 'rgb(255, 113, 113)';
    result.textContent = 'Perdu ...';
  }
});

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
})

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
  });
};

for(let i = 0; i < selectCase.length; i++){
  selectCase[i].addEventListener('click', () => {
    for(let j = 0; j < selectNumbers.length; j++){ 

      if(selectCase[i].textContent == "" || selectCase[i].style.color == 'black'){
        if(selectNumbers[j].style.fontWeight == 'bolder'){
          selectCase[i].textContent = Number(selectNumbers[j].textContent);
          selectCase[i].style.color = 'black';
          selectCase[i].style.fontWeight = 'bolder';
        } 
      }
    };
  });
};

///////////////////////////////////////////////////////////////////////////////////////
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


////////////////////////////////////////////////////////////////////////////////////////////