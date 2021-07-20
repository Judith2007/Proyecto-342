const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1,box2;
var backgroundImg;

var slingshot
var gameState="onSling"
var bg="sprites/bg.png"
var score=0
var birds=[];
function preload(){
    getTime();
}
function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

   
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,20,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810, 220);
    log2 =  new Log(810,180,20,300, PI/2);

    box5 = new Box(810,160,70,70);
    log3 = new Log(760,120,20,150, PI/7);
    log4 = new Log(870,120,20,150, -PI/7);

    bird= new Bird(200,50);
    bird2= new Bird(150,170);
    bird3= new Bird(100,170);
    bird4= new Bird(50,170);

    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);
    ground = new Ground(600,height,1200,40)
    plataform = new Ground(100,400,300,400);
    
    slingshot=new SlingShot(bird.body,{x:200,y:50})



 }

function draw(){
  if(backgroundImg)
    background(backgroundImg);

    noStroke();
    textSize(35)
    fill("white")
    text("score:"+score,width-300,50)

    Engine.update(engine);
    
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score()
    log1.display();
    log2.display();
    
    box5.display();
    log3.display();
    log4.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    plataform.display();
    slingshot.display();

    
}

function mouseDragged(){
  if (gameState!=="launched")
  Matter.Body.setPosition(birds[birds.length-1].body, {x:mouseX,y:mouseY});
  Matter.Body.applyForce(birds[birds.length-1].body, birds[birds.length-1].body.position,{x:5,y:-5});
  return false;



    
  
    
    
  
  }
  
  function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState="launched";
    return false;

  }

  function keyPressed () {

  if ((keyCode===32) && gameState === "launched"){
    Matter.Body.setPosition(bird.body,{x:200,y:50})
  slingshot.attach(bird.body)
  gameState = "onSling"

  }

  }


  async function getTime(){
    var response=await fetch ("http://worldtimeapi.org/api/timezone/Asia/Tokyo")
    var responseJSON=await response.json()
    console.log(responseJSON.datetime)
    
    var datetime=responseJSON.datetime
    var hour=datetime.slice(11,13)

    if(hour>=06 && hour<=19){
    bg="sprites/casa.jpg"
    }
    else{
      bg="sprites/bg2.jpg"
    }
    backgroundImg=loadImage(bg)
    }
  
    



  