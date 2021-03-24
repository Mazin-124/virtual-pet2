//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var foodObj;


function preload()
{
	//load images here
  sadDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,300,50,50)
  dog.addImage("dog1",sadDog)
  dog.addImage("dog2",happyDog);
  dog.scale=0.2

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background("46, 139, 87")
  
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
   
    dog.changeImage("dog2",happyDog);
  }
  
  textSize(20)
  fill("green")
  stroke(2)
  text("Note:Press UP_ARROW Key To Feed Drago Milk!",100,30)
  text("Food:"+foodS,100,100)
  drawSprites();
}
//Function to read value from DB
function readStock(data){
  foodS = data.val();
}
//Functions to write values from DB
function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x= x-1
  }
  database.ref('/').update({food:x})
}

