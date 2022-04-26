const computerChoiceDisplay = document.getElementById('computer-choice');
const uesrChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let uesrChoice;
let computerChoice;
let result;
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e)=>{
    uesrChoice = e.target.id;
    console.log(uesrChoice);
    uesrChoiceDisplay.innerHTML = uesrChoice;
    generateComputerChoice();
    getResult();
}));

function generateComputerChoice(){
    const randomNumner =Math.floor(Math.random() *possibleChoices.length) + 1;
    
    if(randomNumner === 1){
         computerChoice = 'rock';
    }else if(randomNumner === 2){
        computerChoice = 'paper';
    }else{
        computerChoice = 'scissors';
    }
    computerChoiceDisplay.innerHTML = computerChoice;
}
    
function getResult(){
    if(computerChoice === uesrChoice ){
        result = 'we have a drew here!!';
    }
    if(computerChoice === 'rock' && uesrChoice === 'paper' ){
        result = 'you win!!';
    }
    if(computerChoice === 'rock' && uesrChoice === 'scissors' ){
        result = 'you lost!!';
    }
    if(computerChoice === 'paper' && uesrChoice === 'rock' ){
        result = 'you lost!!';
    }
    if(computerChoice === 'paper' && uesrChoice === 'scissors' ){
        result = 'we have a drew here!!';
    }
    if(computerChoice === 'scissors' && uesrChoice === 'paper' ){
        result = 'you lost!!';
    }
    if(computerChoice === 'scissors' && uesrChoice === 'rock' ){
        result = 'you win!!';
    }
    resultDisplay.innerHTML = result;
}
 