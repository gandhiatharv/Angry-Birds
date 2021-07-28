//examples of the different data types in javascript
//string
var string = "this is a string";
console.log(string);
//number
var num = 200;
console.log(num);
//boolean
var bool = true;
console.log(bool);
//undefined
var object;
console.log(object); 
object = null;
console.log(object);

//examples of arrays
var arr1 = [1, 2, 3, 4, 5];
console.log(arr1);
var arr2 = ["name", 1, true];
console.log(arr2);
var arr3 = [[1, 2], [3, 4], [5, 6]]
console.log(arr3)
console.log(arr3[0]);
console.log(arr3[0][1]);
console.log(arr3[1][0]);
console.log(arr3[2][0])

arr1.push(6);
console.log(arr1);
arr1.pop();
console.log(arr1);









const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var a = 0;
var b = 1;
var c = 2;
var g = " ";
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var gameState = "onSling";
var birds = [];
var bird1, bird2;
var bg = "sprites/bg.png";
var score = 0;
var pigsDestroyed = 2;
var h = " ";
var i = " ";
var birdselectsound, birdflysound, winsound, losesound;

function preload() {
    getBackgroundImg();
    birdflysound = loadSound("sounds_bird_flying.mp3");
    birdselectsound = loadSound("sounds_bird_select.mp3");
    winsound = loadSound("win.wav");
    losesound = loadSound("loss.wav");
    bg = loadImage("sprites/bg.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);

    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird1 = new Bird(150,170);
    bird2 = new Bird(100,170);
    birds.push(bird2);
    birds.push(bird1);
    birds.push(bird);
    refresh = createImg("sprites/refresh.png");
    refresh.position(15, 10);
    birds.length = 3;

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    
   if(backgroundImg)
    background(backgroundImg);
    
noStroke();
textSize(35);
fill(146, 42, 42);
    text("Score: " + score, width-200, 50)
            text(g, 360, 50);
            text(h, 450, 50);
            text(i, 310, 85);

    refresh.mousePressed(reset);
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    bird.displayred();
    bird1.displayblue();
    bird2.displayyellow();

    bird.displaytrajectory();
    bird1.displaytrajectory();
    bird2.displaytrajectory();

    if(score > 200) {
        if(pigsDestroyed === 2){
        winsound.play();
        pigsDestroyed = 0;
        }
        gameState = "end";
        g = " ";
        fill(146, 42, 42);
        text("You win!", 450, 50);
        text("Press reload to play again.", 310, 85);
        h = " ";
        i = " ";
    }
    if(gameState === "launched"){
        if(birds.length > 0){
            fill(146, 42, 42);
            g = "Press space for next bird.";
        }else if(birds.length <= 0 && c === 2){
            losesound.play();
            c = 1;
          gameState = "end";
                }
    }

    if (gameState === "end") {
        g = " ";
         if(score <= 200){
        fill(146, 42, 42);
        h = "You lose!";
        i = "Press reload to play again.";
        }
    }
}

function mouseDragged(){
    if(gameState!= "end"){
    if(mouseX >=0 &&mouseX<200){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        birdflysound.play();
    }
    }
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState="launched";
}

function reset(){
    location.reload();
}

function keyPressed(){
    if(keyCode===32){
        Matter.Body.setPosition(birds[birds.length-1].body, {x:200, y:50});
     slingshot.attach(birds[birds.length-1].body);
     bird.trajectory = [];
     bird1.trajectory = [];
     bird2.trajectory = [];
     birdselectsound.play();
        g = " ";
gameState = "onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);
    if(hour>=6 && hour<=18){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}