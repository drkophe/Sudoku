/////////////////////// VARIABLES ///////////////////////

let play = document.querySelector('#play');
let reset = document.querySelector('#reset');
let error = 1;

/////////////////////// FUNCTIONS ///////////////////////

function randomNumber (tab){
    return tab[Math.floor(Math.random() * tab.length)];
};

function remplirBoard(){
    for(y=1; y<10; y++){
        let col = document.querySelectorAll(".col"+ y);
        for(x=0; x<9; x++){
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
    for(x=1; x<10; x++){
        let row = document.querySelectorAll(".row"+ x + " p");
        for(y=0; y<9; y++){
            tabSolution[x-1].push(Number(row[y].textContent));
            if(Number(row[y].textContent == 0)){
                error++;
            };
        };
    };
    if (error == 0){
        console.log(tabSolution);
    };
};

function cleanBoard(){
    for(x=1; x<10; x++){
        let row = document.querySelectorAll(".row"+ x + " p");
        for(y=0; y<9; y++){
            row[y].textContent = '';
        };
    };
};

/////////////////////// ACTIONS ///////////////////////

while(error !== 0){
    error = 0;
    cleanBoard();
    remplirBoard();
    boardCheck();
}

play.addEventListener('click', () => {
    error = 1;
    while(error !== 0){
        error = 0;
        cleanBoard();
        remplirBoard();
        boardCheck();
    }

})

reset.addEventListener('click', () => {
    cleanBoard();
    error = 0;
})

