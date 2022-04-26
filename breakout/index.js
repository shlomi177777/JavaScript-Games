const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHight = 300;
let xDirection = -2;
let yDirection = 2;

let timerID;
let score = 0;

const userStart = [230,10];
let currentPosition =userStart;

const ballStart = [270,40];
let ballCurrentPosition =ballStart;
//create block
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHight];
        this.topRight = [xAxis + blockWidth, blockHight];
    }
}
//all my block 
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]

//draw my block
function addBlock(){
        for(let i = 0 ; i<blocks.length ; i++){
             const block = document.createElement('div');
             block.classList.add('block');
             block.style.left = blocks[i].bottomLeft[0] +'px';
             block.style.bottom = blocks[i].bottomLeft[1] + 'px';
             grid.appendChild(block);

    }
}

addBlock();

//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

//drew the ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0] +'px';
    ball.style.bottom = ballCurrentPosition[1] +'px';
}

//move user
function moveUser(e){
    console.log('left');
    switch(e.key){  
        case 'ArrowLeft':
            if(currentPosition[0]>0){
                currentPosition[0] -= 10 ;
                drawUser();     
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0]<boardWidth-blockWidth){
                currentPosition[0] += 10 ;
                drawUser();     
            }
            break;    
        }

}

document.addEventListener('keydown', moveUser);

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//move ball
function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollutions();
 }

 timerID = setInterval(moveBall, 30);

 //check for collutions
 function checkForCollutions(){
    //check for block collutions
    for(let i = 0 ; i<blocks.length ; i++){
        if(
            (ballCurrentPosition[0]> blocks[i].bottomLeft[0]&& 
             ballCurrentPosition[0]< blocks[i].bottomRight[0])&&
             ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
             ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection(); 
            score++;
            scoreDisplay.innerHTML = score;

            //check for win
            if(blocks.length === 0){
                score.innerHTML = 'you winn!!';
                clearInterval(timerID);
                document.removeEventListener('keydown',moveUser);
            }
        } 
    }


    //check for wall collutions
    if(ballCurrentPosition[0]>= boardWidth - ballDiameter || 
       ballCurrentPosition[1] >= boardHight -ballDiameter ||
       ballCurrentPosition[0] <= 0 ){
        changeDirection();
    }

    //check for user collisions
    if((ballCurrentPosition[0] > currentPosition[0] && 
       ballCurrentPosition[0] < currentPosition[0] + blockWidth)&&
       (ballCurrentPosition[1] > currentPosition[1] && 
        ballCurrentPosition[1] < currentPosition[1] + blockHight)){
            changeDirection(); 
        }

    //Check for game over
    if(ballCurrentPosition[1]<= 0){
        clearInterval(timerID);
        scoreDisplay.innerHTML = 'you lose!';
        document.removeEventListener('keydown',moveUser);
    }
 }

 function changeDirection(){
     if(xDirection === 2 && yDirection === 2){
        yDirection = -2;
        return
     } 
     if(xDirection === 2 && yDirection === -2 ){
         xDirection = -2;
         return 
     }
     if(xDirection === -2 && yDirection === -2){
         yDirection = 2;
         return
     }
     if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return 
     }  
 }
