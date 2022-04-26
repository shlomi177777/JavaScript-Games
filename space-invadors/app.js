const grid =document.querySelector('.grid');
const resultsDisplay =document.querySelector('.results');
for( let i = 0 ; i< 225 ; i++){
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

let currentShooterIndex = 202;
let width = 15;
let diraction = 1;
let results = 0;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
];

function draw(){
    for(let i = 0 ; i< alienInvaders.length ; i++){
        if(!aliensRemoved.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader');
        } 
    }
}

function remove(){
    for(let i = 0 ; i< alienInvaders.length ; i++){
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

draw();

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter');
    switch(e.key) {
        case 'ArrowLeft' :
            if(currentShooterIndex % width != 0 ){
                currentShooterIndex-=1;
                break;
            }
        case 'ArrowRight' :
            if(currentShooterIndex % width < width -1 ){
                currentShooterIndex +=1;
                break;
            }       
    }
    squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

function moveInvadors(){
    const letftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length -1 ] % width === width -1 ;
    remove();

    if(rightEdge && goingRight){
        for(let i = 0 ; i<alienInvaders.length ; i++){
            alienInvaders[i] += width +1 ;
            diraction = -1;  
            goingRight = false; 
        }
    }
    if(letftEdge && !goingRight){
        for(let i = 0 ; i<alienInvaders.length ; i++){
            alienInvaders[i] += width -1;
            diraction = 1 ; 
            goingRight = true;
        }
    }

    for( let i = 0 ; i< alienInvaders.length ; i++){
         alienInvaders[i] +=diraction;
     }

     draw();

     if(squares[currentShooterIndex].classList.contains('invader','shooter')){
        resultsDisplay.innerHTML = 'GAME OVER!';
        clearInterval(invadersId);
     }

     for(let i = 0 ; i < alienInvaders.length ; i++ ){
         if(alienInvaders[i] > squares.length ){
            resultsDisplay.innerHTML = 'GAME OVER!';
            clearInterval(invadersId);
        }
     }

     if(aliensRemoved.length === alienInvaders.length){
         resultsDisplay.innerHTML = 'YOU WON!';
         clearInterval(invadersId);
     }
}
invadersId = setInterval(moveInvadors, 500);

function shoot(e){
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function movLaser(){
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex-=width;
        squares[currentLaserIndex].classList.add('laser');

        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');
      
            setTimeout( ()=> squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);
            
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results++; 
            resultsDisplay.innerHTML = results;
        }
    }

    switch(e.key){
        case 'ArrowUp':
            laserId = setInterval(movLaser,100);
    }
}

document.addEventListener('keydown',shoot);