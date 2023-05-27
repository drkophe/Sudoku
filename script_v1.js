// test de selection des colones, lignes et block //
// let col1 = document.querySelectorAll(".col1");
// console.log(col1);

// let row1 = document.querySelectorAll(".row1>p");
// console.log(row1);

// let block1 = document.querySelectorAll("#top>.left p");
// console.log(block1);
// ---------- TEST REUSSI ------------- //

// Nouvelle méthode //

// Chaque case a un tableau de 1 a 9
// Commencer par remplir la col1
// une fois que la colone 1 est rempli : vérifier chaque case, si il ne lui reste qu'un nombre dans son tableau, inscrire le nombre dans la case
// remplir la col
// ....


// function randomNumber (tab){
//     return tab[Math.floor(Math.random() * tab.length)];
// };

// // Boucle pour remplir le tableau de Sudoku
// for(i=1; i<10; i++){
//     // créer une variable "col" a chaque itération de i qui récupère la colone correspondant au numéro de l'itération : col1, col2, ...
//     let col = document.querySelectorAll(".col"+ i);
//     console.log(col);

//     // remplir chaque case de la NodeList recupérer en haut
//     for(x=0; x<9; x++){
//         let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//         // col[x].textContent = randomNumber();
//     }
// };





// rempli alétoirement mais laisse quelque case vide (MARCHE PAS) //

let play = document.querySelector('#play');
let reset = document.querySelector('#reset');



// Génère aléatoirement un chiffres parmis ceux du tableau numbers
function randomNumber (tab){
    return tab[Math.floor(Math.random() * tab.length)];
};
// console.log(randomNumber());
function remplirBoard(){
    // Boucle pour remplir le tableau de Sudoku
    for(i=1; i<10; i++){
        // créer une variable "col" a chaque itération de i qui récupère la colone correspondant au numéro de l'itération : col1, col2, ...
        let col = document.querySelectorAll(".col"+ i);
        // console.log(col);

        // remplir chaque case de la NodeList recupérer en haut
        for(x=0; x<9; x++){
            let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            // console.log(col[x].parentElement.parentElement.id);

            let blockElements = document.querySelectorAll("#" + col[x].parentElement.parentElement.id + " p");

            blockElements.forEach( (elementBlock) => {
                // numbers.forEach( (tabNumber) => {
                //     if(Number(elementBlock.textContent) == tabNumber){

                //     }
                // });
                let numToRemove = Number(elementBlock.textContent);
                numbers = numbers.filter((n) => n !== numToRemove);
            });

            // console.log(numbers);
        

            let colElements = document.querySelectorAll("." + col[x].className);

            colElements.forEach( (elementBlock) => {
                let numToRemove = Number(elementBlock.textContent);
                numbers = numbers.filter((n) => n !== numToRemove);
            });
            

            let rowElements = document.querySelectorAll("." + col[x].parentElement.className + " p");
            // console.log(rowElements);

            rowElements.forEach( (elementBlock) => {
                let numToRemove = Number(elementBlock.textContent);
                numbers = numbers.filter((n) => n !== numToRemove);
            });

            col[x].textContent = randomNumber(numbers);

            // if (col[x].textContent === ''){
            //     validation++
            // };
        };
    };
};

let error = 1;

// Boucle pour récupéré les info du tableau de Sudoku
function boardCheck(){
    let tabSolution = [
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
    for(i=1; i<10; i++){
        // créer une variable "col" a chaque itération de i qui récupère la colone correspondant au numéro de l'itération : col1, col2, ...
        let row = document.querySelectorAll(".row"+ i + " p");
        // console.log(row);
    
        // récupéré chaque case de la NodeList recupérer en haut
        for(x=0; x<9; x++){
            // console.log(row[i]);
            tabSolution[i-1].push(Number(row[x].textContent));
    
            if(Number(row[x].textContent == 0)){
                error++;
            };
        };
    };
    if (error == 0){
        console.log(tabSolution);
    };
};

function cleanBoard(){
    for(i=1; i<10; i++){
        // créer une variable "col" a chaque itération de i qui récupère la colone correspondant au numéro de l'itération : col1, col2, ...
        let row = document.querySelectorAll(".row"+ i + " p");
        // console.log(row);
    
        // récupéré chaque case de la NodeList recupérer en haut
        for(x=0; x<9; x++){
            // console.log(row[i]);
            row[x].textContent = '';
        };
    };
};

console.log(error)

play.addEventListener('click', () => {
    error = 1;
    while(error !== 0){
        error = 0;
        cleanBoard();
        remplirBoard();
        boardCheck();
        console.log(error);
    }

})

reset.addEventListener('click', () => {
    cleanBoard();
    error = 0;
    console.log(error);
})

remplirBoard();
while(error !== 0){
    error = 0;
    cleanBoard();
    remplirBoard();
    boardCheck();
    console.log(error);
}



// while(error !== 0){
//     remplirBoard();
// }
    
// console.log(tabSolution);
// console.log(error);






// créer 3 tableaux contenant les chiffres de 1 a 9 : ROW , COL et BLOCK
// (modifier la fonction randomNumber pour quel prenne en paramettre le tableau qui sera defini)
// vérifier chaque colone, chaque ligne et chaque block correspondant a la case
// supprimer les chiffres déjà présent dans les autre case dans leur tableau respectif
// choisir un chiffre parmis les chiffre restant dans les tableaux
//passer au suivant 


// // OLD FONCTIONNEL (rempli le tableau de chiffre aléatoire, pas de vérification) //
// // tableau des chiffres pour piocher dedans
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // pas obligatoire je pense

// // Génère aléatoirement un chiffres parmis ceux du tableau numbers

// function randomNumber (){
//     return numbers[Math.floor(Math.random() * numbers.length)];
// };
// console.log(randomNumber());

// // test d'incorporer la fonction randomNumber dans un paragraphe
// // col1[0].textContent = randomNumber();

// // Boucle pour remplir le tableau de Sudoku
// for(i=1; i<10; i++){
//     // créer une variable "col" a chaque itération de i qui récupère la colone correspondant au numéro de l'itération : col1, col2, ...
//     let col = document.querySelectorAll(".col"+ i);
//     console.log(col);

//     // remplir chaque case de la NodeList recupérer en haut
//     for(x=0; x<9; x++){
//         col[x].textContent = randomNumber();
//     }
// };

// // créer 3 tableaux contenant les chiffres de 1 a 9 : ROW , COL et BLOCK
// // (modifier la fonction randomNumber pour quel prenne en paramettre le tableau qui sera defini)
// // vérifier chaque colone, chaque ligne et chaque block correspondant a la case
// // supprimer les chiffres déjà présent dans les autre case dans leur tableau respectif
// // choisir un chiffre parmis les chiffre restant dans les tableaux
// //passer au suivant 


////////////////////////////////////

//autre idée : remplir le tableau aléatoirement et ensuite faire la vérification de chaque case 
