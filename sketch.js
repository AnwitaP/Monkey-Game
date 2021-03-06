
var monkey , monkey_running;
var ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(360, 360);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(80, 351, 20, 10);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
}


function draw() {
 
  background("lightblue");
  
  if(ground.x < 0){
    ground.x = ground.x/2;
  }
  
  if(keyDown("space")&&monkey.y >= 100){
    monkey.velocityY = -12;
  }
  
    
  monkey.velocityY = monkey.velocityY + 0.5;
  
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocity.x = 0;
    monkey.VelocityX = 0;
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    }
  
    monkey.collide(invisibleGround);

    stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+ score, 500, 50);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time:"+ survivalTime, 100, 50);



    food();
    obstacles();

  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(400, 120, 15, 15);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 300;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(400, 328, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}



