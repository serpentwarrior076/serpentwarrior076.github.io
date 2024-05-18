
let xDirectionArray = [1, 0, -1, 0];
let yDirectionArray = [0, 1, 0, -1];
let directionIndex = 0;

let cX = [];
let cY = [];
let len = 1;
let diameter = 10;


let foodX;
let foodY;

function setup() {
  noLoop()
  createCanvas(400, 400);
  frameRate(10); 

  for (let i = 0; i < len; i++) {
    cX.push(30 - i * 10);
    cY.push(20);
  }

  generateFood();
  
  button = createButton("start!");
 button.mouseClicked(strt);
 button.size(100, 50);
 button.position(10, 420);
 button.style("font-family", "Comic Sans MS");
 button.style("font-size", "28px");
}
function strt() {
 loop();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && directionIndex !== 2) {
    directionIndex = 0;
  } else if (keyCode === DOWN_ARROW && directionIndex !== 3) {
    directionIndex = 1;
  } else if (keyCode === LEFT_ARROW && directionIndex !== 0) {
    directionIndex = 2;
  } else if (keyCode === UP_ARROW && directionIndex !== 1) {
    directionIndex = 3;
  }
}

function caterpillar() {
 
  for (let i = len - 1; i > 0; i--) {
    cX[i] = cX[i - 1];
    cY[i] = cY[i - 1];
  }
  cX[0] += xDirectionArray[directionIndex] * diameter;
  cY[0] += yDirectionArray[directionIndex] * diameter;


  if (dist(cX[0], cY[0], foodX, foodY) < diameter) {
    eatFood();
  }

  for (let i = 0; i < len; i++) {
    fill("green");
    cX[i] = constrain(cX[i], 0, width - diameter);
    cY[i] = constrain(cY[i], 0, height - diameter);
    circle(cX[i], cY[i], diameter);
  }
}

function eatFood() {
  len++;
  cX.push(cX[len - 2]); 
  cY.push(cY[len - 2]);
  generateFood(); 
}

function generateFood() {
  
  let validLocation = false;
  while (!validLocation) {
    foodX = Math.floor(Math.random() * (width - diameter) / diameter) * diameter;
    foodY = Math.floor(Math.random() * (height - diameter) / diameter) * diameter;
    validLocation = true;
    for (let i = 0; i < len; i++) {
      if (dist(foodX, foodY, cX[i], cY[i]) < diameter) {
        validLocation = false;
        break;
      }
    }
  }
}

function draw() {
  background("black");
  caterpillar();
 
  fill("red");
  circle(foodX, foodY, diameter);
}
