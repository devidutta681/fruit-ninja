var sword,sword_image,sword_sound

var fruit_image1,fruit_image2,fruit_image3,fruit_image4

var alien_image,alien_image2

var PLAY = 1;
var END = 0;

var gameover,gameover_image

var gamestate = PLAY ;

var score = 0;

function preload(){
  
  sword_image = loadImage("sword.png")
  sword_sound = loadSound("knifeSwooshSound.mp3")
  
  fruit_image = loadImage("fruit1.png") 
  fruit_image2 = loadImage("fruit2.png")
  fruit_image3 = loadImage("fruit3.png")
  fruit_image4 = loadImage("fruit4.png")
  
  alien_moving = loadAnimation("alien1.png","alien2.png")
  
  gameover_image = loadImage("gameover.png")
  gameover_sound = loadSound("gameover.mp3")

 
}
function setup(){
  sword = createSprite(300,300,20,20)
  sword.addImage(sword_image)
  sword.scale = 0.5

  gameover = createSprite(300,200,0,0)
  gameover.scale = 1.5
  gameover.addImage(gameover_image);
  gameover.visible = false;
  
  fruitsgroup = createGroup();
  
  aliensgroup = createGroup();
}

function draw(){
  createCanvas(600,600)
  background("lightblue")
  if(gamestate === PLAY){
  
    sword.x = mouseX
  
    sword.y = mouseY
  
    textSize(25)
    text("score:" + score,420,60)
    
    if(fruitsgroup.isTouching(sword)){
      fruitsgroup.destroyEach();
      sword_sound.play()
      score = score + 5
    }
    if(aliensgroup.isTouching(sword)){
      gamestate = END
      gameover_sound.play()
    } 
  
  
    spawnFruits();
  
    spawnAliens();
  }
  else if(gamestate === END){
    score = 0;
    
    gameover.visible = true;
    
    fruitsgroup.destroyEach();
    aliensgroup.destroyEach();
    
    fruitsgroup.setVelocityYEach(0)
    aliensgroup.setVelocityXEach(0)
    
  }
 drawSprites();
}

function spawnFruits(){
  if(frameCount % 100 === 0){
    var fruit = createSprite(Math.round(random(10,300)),0,20,20)
    fruit.scale = 0.2
    fruit.velocityY = 3
    fruit.lifetime = 200
    fruitsgroup.add(fruit);
    var select_image = Math.round(random(1,4))
    switch(select_image){
      case 1:fruit.addImage(fruit_image)
      break;
    
      case 2:fruit.addImage(fruit_image2)
      break;
    
      case 3:fruit.addImage(fruit_image3)
      break;
    
      case 4:fruit.addImage(fruit_image4)
      break;
    
      default:break;
      }
  }
}
function spawnAliens(){
  if(frameCount % 130 === 0){
    var alien =   createSprite(400,Math.round(random(100,300)),20,20)
    alien.addAnimation("moving",alien_moving)
    alien.scale = 0.6
    alien.velocityX = -3
    alien.lifetime = 200
    aliensgroup.add(alien);
  }
}
