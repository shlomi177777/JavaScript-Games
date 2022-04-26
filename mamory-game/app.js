const cardArray =[
    {
        name:'fries',
        img: 'images/fries.png',
    },
    {
        name:'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name:'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name:'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name:'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name:'pizza',
        img: 'images/pizza.png',
    },
    {
        name:'fries',
        img: 'images/fries.png',
    },
    {
        name:'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name:'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name:'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name:'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name:'pizza',
        img: 'images/pizza.png',
    }
];

cardArray.sort(()=> 0.5 - Math.random());

const grid = document.querySelector('#grid');
resultDisplay = document.querySelector('#result');
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function createBoard() {
    for(let i = 0 ; i <  cardArray.length ; i++){
        const card = document.createElement('img');
        card.setAttribute('src','images/blank.png');
        card.setAttribute('data-id',i);
        card.addEventListener('click',flipCard);
        grid.append(card);
    }
}

createBoard();

function flipCard(){
    let cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if(cardChosen.length === 2){
        setTimeout(checkMatch,500);
    }
}

function checkMatch(){
    const cards = document.querySelectorAll('img'); 
    const optionOneId = cardChosenIds[0];
    const optionTwoId = cardChosenIds[1]; 
    if(optionTwoId === optionOneId){
        alert('Same card here!!');
        cards[optionOneId].setAttribute('src','images/blank.png');
        cards[optionTwoId].setAttribute('src','images/blank.png');
    }
    if(cardChosen[0] ==  cardChosen[1]){
          alert('a match!!');
         cards[optionOneId].setAttribute('src','images/white.png');
         cards[optionTwoId].setAttribute('src','images/white.png');
         cards[optionOneId].removeEventListener('click',flipCard);
         cards[optionTwoId].removeEventListener('click',flipCard);
         cardsWon.push(cardChosen);
        }else{
            cards[optionOneId].setAttribute('src','images/blank.png');
            cards[optionTwoId].setAttribute('src','images/blank.png');
            alert('Try again :(');
           
        }
    resultDisplay.textContent = cardsWon.length;    
    cardChosen = [];
    cardChosenIds = [];
    if(cardsWon.length == cardArray.length/2){
        resultDisplay.innerHTML = 'Congrats!! you have won the game!!';
    }
}