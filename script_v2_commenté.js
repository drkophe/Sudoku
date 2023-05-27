////////////////// Variable utile //////////////////

// 1er : bouton play et reset
let play = document.querySelector('#play');
let reset = document.querySelector('#reset');

// 2e : compteur
let error = 1;

////////////////// Définir les fonctions qu'on va utiliser : ///////////////////

// 1er : Choisir aléatoirement un nombres parmis ceux du tableau en paramètre
function randomNumber (tab){
    return tab[Math.floor(Math.random() * tab.length)];
};

// 2e : Remplir le tableau sous certaine condition
function remplirBoard(){

    // Boucler sur toute les colones (axe vertical)
    for(y=1; y<10; y++){

        // créer une variable "col" à chaque itération, pour séléectionner le class col... correspondant au numéro de l'itération : col1, col2, ...
        let col = document.querySelectorAll(".col"+ y);

        // Boucler sur chaque element de la colone en fonction de ça ligne (axe horizontal de la colone)
        for(x=0; x<9; x++){

            // à chaque case (x), définir un tableau de base (numbers) ayant les chiffre 1 à 9
            let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            // à chaque case (x) récupéré son block, sa colone et sa ligne
            let blockElements = document.querySelectorAll("#" + col[x].parentElement.parentElement.id + " p");
            let colElements = document.querySelectorAll("." + col[x].className);
            let rowElements = document.querySelectorAll("." + col[x].parentElement.className + " p");

            // Boucler sur tout les éléments de son block
            blockElements.forEach( (elementBlock) => {

                // Si le nombre qui se trouve dans elementBlock, se trouve également dans le tableau numbers, alors le supprimer du tableau
                numbers = numbers.filter((n) => n !== (Number(elementBlock.textContent)));
            });

            // Boucler sur tout les éléments de son block
            colElements.forEach( (elementBlock) => {

                // Si le nombre qui se trouve dans elementBlock, se trouve également dans le tableau numbers, alors le supprimer du tableau
                numbers = numbers.filter((n) => n !== (Number(elementBlock.textContent)));
            });
            
            // Boucler sur tout les éléments de son block
            rowElements.forEach( (elementBlock) => {

                // Si le nombre qui se trouve dans elementBlock, se trouve également dans le tableau numbers, alors le supprimer du tableau
                numbers = numbers.filter((n) => n !== (Number(elementBlock.textContent)));
            });

            // parmis les nombres restants du tableau numbers, en choisir un alétoirement et l'inscrire dans la case (la fonction précédente)
            col[x].textContent = randomNumber(numbers);

        };
    };
};


// 3e : Controlé les infos de tableau
function boardCheck(){

    // Définir un tableau vide qui servira de "solution" au sudoku
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

    // Boucler sur les lignes du board créer avec la fonction remplirBoard() (J'ai choisi les lignes pour remplir plus facilement le tabSolution) (axe horizontal)
    
    // * Note à moi même : peut etre modifier remplirBoard() pour remplir par ligne au lieu de par colone pour garder de la cohérence

    for(x=1; x<10; x++){

        // créer une variable "row" à chaque itération de x qui récupère la class correspondante au numéro de l'itération : .row1, .row2, ...
        let row = document.querySelectorAll(".row"+ x + " p");
    
        // Boucler sur chaque case de la ligne en fonction de la colone (axe vertical)
        for(y=0; y<9; y++){

            // Incorporter dans le tableau[ligne] tabSolution, le nombre trouver dans x[y] (la case de la boucle)
            tabSolution[x-1].push(Number(row[y].textContent));
    
            // * Note : Si il n'y a pas de nombre dans la tableau (a cause du tri précédant) par défaut le tableau est remplis par 0 *

            // Si la case contient 0 
            if(Number(row[y].textContent == 0)){

                // Alors incrémenté la variable error de +1
                error++;
            };
        };
    };

    // Si après avec vérifier le board, et complété le tableau le variable error est toujours égale a 0 (donc que toute les case possède un nombre)
    if (error == 0){
        // afficher dans la console le tableau de solution (utile plus tard)
        console.log(tabSolution);
    };
};


// 4e : Effacer tout les nombres du tableau
function cleanBoard(){

    // Boucler sur les lignes
    for(x=1; x<10; x++){

        // récupéré les class
        let row = document.querySelectorAll(".row"+ x + " p");
    
        // Boucler sur les colones de ces ligne (donc chaque case)
        for(y=0; y<9; y++){

            // vider la case
            row[y].textContent = '';
        };
    };
};

//////////////////// Définir les actions ////////////////////

// Au démarage de la page (pas obliger, à supprimer plus tard) : //

// Activer la recherche d'une board VALIDE

// error à été défini de base à 1 au démarage
// Donc tant que error n'est pas égale a 0 :
while(error !== 0){
    // définir error à zéro
    error = 0;

    // Vider le board (au cas ou)
    cleanBoard();

    // Remplir le board
    remplirBoard();

    // Vérifié le board 
    boardCheck();

    // (si des erreurs, error sera incrémenté (via la function boardCheck()) et donc ne sera plus égale à 0, la boucle continuera jusqu'a ce que error soit finnalement égale à 0)

    // console.log(error); // vérification du nombre d'erreur
}

// Clique : //

// Quand on clique sur le bouton play :
play.addEventListener('click', () => {

    // Définir la variable error à 1
    error = 1;

    // Lancer la boucle de création de board valide
    while(error !== 0){
        error = 0;
        cleanBoard();
        remplirBoard();
        boardCheck();
    }

})

// Quand on clique sur le bouton reset :
reset.addEventListener('click', () => {

    // Vider le board
    cleanBoard();

    // Définir la variable error à 0 pour pas que la boucle "while" ne se lance
    error = 0;
})

