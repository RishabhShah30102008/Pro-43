var END =0;
var PLAY =1;
var gameState = PLAY;

var backImage,backgr;
var player, player_running;
var ground,ground_img;

var food, food_Img, banana, foodGroup;

var obstacle,obstacle_Img, stone, obstacleGroup;

var go, gameOver, gO_Img;

var score;

function preload(){
  backImage=loadImage("jungle.jpg");

  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  food_Img = loadImage("banana.png");

  obstacle_Img = loadImage("stone.png");

  gO_Img = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  //player.setCollider("rectangle",0,0,300,500);
  //player.debug = false;

  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  score = 0;

  foodGroup = new Group();
  obstacleGroup = new Group();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }

    if(player.x>200){

      player.velocityY = 12;

    }

    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(player)){

      foodGroup[0].destroy();
      score = score + 2;
      player.scale  += + 0.01;

    }

    if(obstacleGroup.isTouching(player)){

      gameState = END;

    }

  }

  if(gameState === END){

    player.destroy();

    backgr.velocityX = 0;
    foodGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    go = createSprite(400,200,20,20);
    go.addImage(gO_Img);
    go.scale = 0.7;

  }

  drawSprites();

  textSize(20);
  fill("yellow");
  strokeWeight(4);
  stroke(0);
  text("Score : "+ score,700,30);

}

function spawnFood(){

  if(frameCount%80 === 0){

    food = createSprite(600,250,40,10);
    food.addImage(food_Img);
    food.scale = 0.05;

    food.y = random(120,200);

    food.velocityX = -4;

    food.lifetime = 200;

    foodGroup.add(food);

  }

}

function spawnObstacles(){

  if(frameCount%170 === 0){

    obstacle = createSprite(600,340,40,10);
    obstacle.addImage(obstacle_Img);
    obstacle.scale = 0.15;
    obstacle.x = random(600,800);

    obstacle.velocityX = -4;

    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);

  }

}
