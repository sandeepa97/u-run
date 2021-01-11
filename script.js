// Created by Coder

/*
Author:Coder;
Name :Unicorn Dash Run;
FrameWork:P5.js;
*/

"use strict"
var spriteSheet = [];
var jump = []
console.log =()=>{};
var land = [];
var clouds = []
var enemies= []
var chance = 3;
var score = 0;
var rock;
var theme;
var coin;
var Enemies = [];
var coins = [];
var Land_img,Background1,Land_img1,Background2;
var Cloud;
var button,button1;
var rocks =[]
function preload(){
 spriteSheet[0] =  loadImage("https://image.ibb.co/hnpyYV/ice-horse.png");
 spriteSheet[1] = loadImage("https://image.ibb.co/fb5afA/ice-horse-run-06.png");
 spriteSheet[2] = loadImage("https://image.ibb.co/cw4e7q/ice-horse-run-05.png");
 spriteSheet[3] = loadImage("https://image.ibb.co/g4NGnq/ice-horse-run-04.png");
 spriteSheet[4] = loadImage("https://image.ibb.co/fuPe7q/ice-horse-run-03.png");
 spriteSheet[5] = loadImage("https://image.ibb.co/kbVY0A/ice-horse-run-02.png");
 spriteSheet[6] = loadImage("https://image.ibb.co/bNJE7q/ice-horse-run-01.png");
 spriteSheet[7] = loadImage("https://image.ibb.co/dk6HSq/ice-horse-run-00.png");
 jump[4] = loadImage("https://image.ibb.co/kEa80A/ice-horse-jump-02.png");
 Land_img = loadImage("https://image.ibb.co/fEdXvA/tile-fall-2.png");
 Background1 = loadImage("https://image.ibb.co/bN8nTV/scroll-bg-far.png");
Cloud = loadImage("https://image.ibb.co/iT0jQA/8i6o-A9x5-T.png");
rock = loadImage("https://image.ibb.co/gEeiJV/8b1eb71d81e991476ed7607d73f61644.png");
coin = loadImage("https://image.ibb.co/jRAp0y/coin.png") ;
Enemies[0] = loadImage("https://image.ibb.co/nPQwOV/Haunter-Shiny.png");
 Background2 = loadImage("https://preview.ibb.co/gtT1sq/midnight-volcano-brad-simpson.jpg" );
}

var sprit ;
var life = []
function setup(){
var c = createCanvas(windowWidth,windowHeight);
c.position(0,0);
background(0);

sprit = new Sprite ();
theme = new background_1();
button = createButton("Restart").class("btn btn-primary");
button.position(width/2-50,height-50);
button.mousePressed(restart);
button.hide();
for(var i =0;i<3;i++){
    life.push(new helath(i*20));
}
var a = confirm(`1.Click "Ok" to play in Light mode\n2.click "Cancel" to play in dark mode `);
if(a==true){
    theme.img = Background1;
    }
    else{
      theme.img = Background2;
    }

}
function draw(){
  background(0); 
 frameRate(20);
 theme.show();
 for(var i =0;i< life.length;i++){
     life[i].show();
 }
 if(frameCount % 10==0){
      clouds.push(new Clouds());
  }
  if(frameCount % 150==0){
      enemies.push(new Enemy());
  }
  for(var i = clouds.length-1;i>0; i--){
      clouds[i].show();
      clouds[i].update();
    
    if(clouds[i].x<-clouds[i].w){
        clouds.splice(i,1);
    }
  } 
 fill("red")
textAlign(CENTER) ;
textSize(20);
text("Score:"+score,width/2,20);
  sprit.show() 
  sprit.animate();
  if(frameCount%25==0){
      land.push(new Land());
      
  }
  if(frameCount % 30==0){
     coins.push(new Coin()); 
  }
 if(frameCount % 80==0){
     rocks.push(new Rock());
 }
 for(var i = 0;i<rocks.length;i++){
   rocks[i].show();
   rocks[i].update();
   
   
 }

for(var i = 0;i<rocks.length;i++){
 if(rocks[i].x<-rocks[i].w){
       rocks.splice(i,1);
   }
   }    
for(var i = 0;i<rocks.length;i++){
if(collision(sprit,rocks[i]) ){
       rocks.splice(i,1);
       score+=10;
   }
     

} 
 
 for(var i = 0;i<coins.length;i++){
     coins[i].show();
     coins[i].update();
     
     }
for(var i = 0;i<coins.length;i++){     
     if(collision(sprit,coins[i])){
         coins.splice(i,1);
         score++;
     }
     }
for(var i = 0;i<coins.length;i++){     
     if(coins[i].x<-coins[i].w){
         coins.splice(i,1);
     }
 }
 
 for(var i = 0;i<enemies.length;i++){
     enemies[i].show();
     enemies[i].update();
 }
 for(var i = 0;i<enemies.length;i++){
 
 if(enemies[i].x<-enemies[i].w){
     enemies.splice(i,1);
 }
 
 }
   //console.log(spriteSheet.length);
  for(var i = land.length-1;i>0;i--){
      land[i].show();
      land[i].update();
      
      if(collision(sprit,land[i])){
          sprit.y = land[i].y-land[i].h*4+10;
        
      }
    if(land[i].x<-land[i].w){
        land.splice(i,1);
    }
   
  }
for(var j =0;j<life.length;j++){  
 if(sprit.y>height-95){
   sprit.y =0;
   life.splice(j,1);
   chance -=1;
}
}
/* for(var i = rocks.length-1;i>0;i--){
 if(collision(sprit,rocks[i])){
 game_over()

}
 }
 */
for(var j =0;j<life.length;j++){
for(var i = 0;i<enemies.length;i++){
if(collision(sprit,enemies[i])){
    enemies.splice(i,1);
    life.splice(j,1);
    chance-=1;
}

} 
}
 
 if(chance ==0) {
     game_over();
 }
}


function Sprite(){
    this.x = 50;
    this.y = 0;
    this.index = 0; 
    this.w = 100;
    this.h = 100;
    this.speed = 1;
    this.img = spriteSheet[this.index%spriteSheet.length];
    this.show = function(){
image(this.img,this.x,this.y,100,100);
    
    }
    this.animate = function(){
      this.index+=this.speed;  
      if(mouseIsPressed){
          this.img = jump[4];
          this.y-=20;
      }
      else {
        this.img = spriteSheet[this.index%spriteSheet.length];  
      }
     
     this.y+=8; 

 if(this.y<0){
    this.y = 0;
}
      
    }
    
}



function collision(a,b){
  return a.x < b.x + b.w/2 &&
         a.x + a.w >b.x &&
         a.y < b.y + b.h/2 &&
         a.y + a.w > b.y;
}

function Land(){
    this.x = width;
    this.y = random(height/2-50,height-100);
    this.w = random(170,270);
    this.h = 50/2;
    this.dx = 20;
    this.img = Land_img;
    this.show = function(){
image(this.img,this.x,this.y,this.w,this.h);
    }
    this.update = function(){
        this.x-=this.dx;
    }
    
    
}

function background_1(){
    this.x = -width/2;
    this.y = 0;
    this.w = width+width/2;
    this.h = height;
    this.img = Background1;
    this.show = function(){
image(this.img,this.x,this.y,this.w,this.h);
    }
}
function Clouds(){
    this.x = width;
    this.y = random(0,height);
    this.w = 100;
    this.h = 70;
    this.dx = 15;
    this.img = Cloud;
    this.show = function(){
image(this.img,this.x,this.y,this.w,this.h)
    }
    this.update = function(){
        this.x -= this.dx;
    }
    
}
function Coin(){
    this.x = width;
    this.y = random(height/2-100,height-100);
    this.w = 40;
    this.h = 40;
    this.dx = 5;
    this.show = function(){
image(coin,this.x,this.y,this.w,this.h);

    }
    this.update = function(){
    
    this.x -= this.dx;
    
    }
}
function Rock(){
    this.x = width;
    this.y = random(height/2-100,height-100);
    this.w = 60;
    this.h = 60;
    this.img = rock;
    this.dx = 8;
    this.show = function(){
image(this.img,this.x,this.y,this.w,this.h);        
    }
    this.update = function(){
        this.x -=this.dx;
    }
}
function game_over(){
  frameRate(0);
   fill(0);
   rect(0,0,width,height);
   textAlign(CENTER);
   textSize(50);
   fill("blue")
   text("Game Over",width/2,height/2);
   textSize(20);
   fill("red")
   text("Your Score:"+score,width/2,50);
    button.show() 
}
var aud = new Audio("assets/music.mp3");
var isPlay = 0;
function song(){
   if(!isPlay) {
       aud.play();
   }
   isPlay = 1;
}

function restart(){
    frameRate(20);
  for(var i = 0;i<land.length;i++){  
  land.splice(i,2);
  }
    for(var i = 0;i<clouds.length ;i++){
    clouds.splice(i,5);
    
    } 
    for(var i = 0;i<rocks.length;i++){
    rocks.splice(i,5);
    
    }
    for(var i = 0;i<coins.length;i++){   
    coins.splice(i,6);
    
    }
    
    sprit.y = 0;
    button.hide()
    score =0;
    chance = 3;
    for(var i =0;i< 3;i++){
     life.push(new helath(i*30));
 }
 
}
function Enemy(){
   this.x = width;
   this.y = random(height/2-50,height/2+50);
   this.w = 70;
   this.h = 70;
   this.dx = 8;
   this.img = Enemies[0];
   this.show = function(){
image(this.img,this.x,this.y,this.w,this.h)    
   }
   this.update = function(){
  this.x -=this.dx;     
   }
}
function helath(x){
    this.x = x;
    this.y = 20;
    this.w = 30;
    this.h = 30;
    this.show = function(){
image(spriteSheet[0],this.x,this.y,this.w,this.h);
    }
}