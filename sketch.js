var PLAY = 1;
var END = 0;
var gameState = PLAY;

var robber, trashcan, fence;
var backgroundImg, fenceImg, trashcanImg;
var robberImg1, robberEnd;
var obstaclesGroup;
var ground, floor;
var trashcanGroup;
var fenceGroup;

var score = 0;

function preload(){
    backgroundImg = loadImage("subuurban house.png");
    fenceImg = loadImage("fence.png");
    trashcanImg = loadImage("trashcan.png");
    robberImg1 = loadAnimation("robber1.png","robber2.png","robber3.png");
    robberEnd = loadAnimation("robberEND.png");

}

function setup(){
    createCanvas(2000,800);
    

    ground = createSprite(400,100,300,20);
    ground.addImage("ground",backgroundImg);
    ground.x = width /2;
    ground.y = height/2;
    ground.velocityX = -2
    ground.scale = 0.3;
    ground.velocityX = -(6 + 3*score/100);

    floor = createSprite(900,710,1900,1);
 

    robber = createSprite(600,620,40,50);
    robber.addAnimation("running",robberImg1);
    robber.addAnimation("collided",robberEnd);
    robber.scale =1;


 

    obstaclesGroup = new Group();

  score = 0;

}

function draw(){
    background(0);

    if(gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);


      if(keyDown("space") && robber.y >= 159) {
        robber.velocityY = -24;
       }
      robber.velocityY = robber.velocityY + 0.8

      if (ground.x < 0){
        ground.x = width/2;
       }

      robber.collide(floor);

      trashcan();

      
      if(obstaclesGroup.isTouching(robber)){
      gameState = END;
      }
    }

    else if(gameState===END){
      ground.velocityX = 0;
      robber.velocityX = 0;
      robber.velocityY = 0;

      obstaclesGroup.setVelocityXEach(0);

      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.destroyEach();


      robber.changeAnimation("collided",robberEnd);
    }




    robber.collide(floor);

    trashcan();
    
    drawSprites();

    stroke("orange");
    noFill();
    strokeWeight(3);
    textSize(40);
    text("Score: "+ score, 100,100);
}



function trashcan(){
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(1700,600,20,20)
    obstacle.setCollider("circle", 0,0, 130);
    obstacle.velocityX = -(6 + 3*score/100);

    obstacle.velocityX = -9;
    obstacle.scale = 0.5

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(trashcanImg);
              break;
      case 2: obstacle.addImage(fenceImg);
              break;
      default: break;
    }
    
    //assign lifetime to the variable
    obstacle.lifetime = 320;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}