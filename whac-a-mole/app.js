const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition = null;
let currentTime = 30;
let timerId = null;


function randomSquare(){
    squares.forEach(square =>{
        square.classList.remove('mole');
    });

    let randomePosition = squares[Math.floor(Math.random()*9)]; 
    randomePosition.classList.add('mole'); 

    hitPosition = randomePosition.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () =>{
        if(square.id == hitPosition){
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole(){
    timerId = setInterval(randomSquare, 500);
}

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime == 0){
        clearInterval(countDownTimerId);
        alert(`GAME OVER!! Your final score is ${result}! `);
        clearInterval(timerId); 
    }
}

let countDownTimerId = setInterval(countDown, 1000);

moveMole();
randomSquare();
 