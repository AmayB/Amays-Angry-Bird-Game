const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg, backgroundMusic, flight;
var canvas, angle, ground, slingshot;
var birds = [];
var pig, boxPig, towerPig, flyingPig, planePig;
var pigImg, boxPigImg, towerPigImg, flyingPigImg, planePigImg;
var eggImg;
var egg1,egg2,egg3;
var empty_egg,one_egg,two_egg,three_egg,egg_display;

var dizzyBirdAnimation = [];
var dizzyBirddata, dizzyBirdSpritesheet;

function preload() {
    backgroundImg = loadImage("background.png");
    dizzyBirddata = loadJSON("dizzyBird.json");
    dizzyBirdSpritesheet = loadImage("dizzy_bird.png");
    backgroundMusic = loadSound("backgroundMusic.mp3");
    flight = loadSound("flight.mp3");

    pigImg = loadImage("pig.png");
    boxPigImg = loadImage("boxPig.png");
    towerPigImg = loadImage("towerPig.png");
    flyingPigImg = loadImage("flyingPig.png");
    planePigImg = loadImage("planePig.png");
    eggImg = loadImage("egg.png");

    empty_egg = loadAnimation("empty.png");
    one_egg = loadAnimation("one_egg.png");
    two_egg = loadAnimation("two_egg.png");
    three_egg = loadAnimation("three_egg.png");
}

function setup() {
    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    angleMode(DEGREES)
    angle = 15

    ground = Bodies.rectangle(0, height - 1, width * 2, 1, {isStatic: true});
    World.add(world,ground);

    pig = createSprite(490,370,100,100);
    pig.addImage(pigImg);
    pig.scale = 0.1;

    egg1 = createSprite(400,250,20,20);
    egg1.addImage(eggImg);
    egg1.scale = 0.1;

    egg2 = createSprite(700,50,20,20);
    egg2.addImage(eggImg);
    egg2.scale = 0.1;

    egg3 = createSprite(950,300,20,20);
    egg3.addImage(eggImg);
    egg3.scale = 0.1;

    egg_display = createSprite(120,50,30,30);
    egg_display.scale = 0.2;
    egg_display.addAnimation('empty',empty_egg);
    egg_display.addAnimation('onestar',one_egg);
    egg_display.addAnimation('twostar',two_egg);
    egg_display.changeAnimation('empty');

    boxPig = createSprite(850,335,100,100);
    boxPig.addImage(boxPigImg);
    boxPig.scale = 0.25;

    towerPig = createSprite(680,300,100,100);
    towerPig.addImage(towerPigImg);
    towerPig.scale = 0.45;

    flyingPig = createSprite(480,200,100,100);
    flyingPig.addImage(flyingPigImg);
    flyingPig.scale = 0.25;

    planePig = createSprite(880,100,100,100);
    planePig.addImage(planePigImg);
    planePig.scale = 0.35;

    slingshot = new Slingshot(180, 350, 130, 110, angle);

    var dizzyBirdFrames = dizzyBirddata.frames;
    for (var i = 0; i < dizzyBirdFrames.length; i++) {
        var pos = dizzyBirdFrames[i].position;
        var img = dizzyBirdSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        dizzyBirdAnimation.push(img);
    }

}

function draw() {
    background(180);
    image(backgroundImg, 0, 0, width, height);

    Engine.update(engine);

    if (!backgroundMusic.isPlaying()) {
        backgroundMusic.play();
        backgroundMusic.setVolume(0.5);
    }

    push ();
    translate (ground.position.x, ground.position.y);
    fill ("brown");
    rectMode (CENTER);
    rect(0, 0, width * 2, 1);
    pop ();

    for(var i = 0; i < birds.length; i++) {
        showAngryBirds(birds[i], i);
    }

    slingshot.display();

    drawSprites();

}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        var angryBird = new AngryBird (slingshot.x, slingshot.y);
        angryBird.trajectory = [];
        Matter.Body.setAngle(angryBird.body, slingshot.angle);
        birds.push(angryBird);
    }
}


function showAngryBirds(bird, index) {
    if (bird) {
        bird.display();
        if (bird.body.position.x >= width || bird.body.position.y >= height - 50) {
            bird.remove(index);
        }
    }
}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        birds[birds.length - 1].shoot();
        flight.play();
    }
}

function collide(body,sprite,a)
{
  if(body!=null)
        {
         var d = dist();
          if(d<=a)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
