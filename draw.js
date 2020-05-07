 /* создание холста, базовое расположение объектов, загрузка спрайтов */
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   //очистка старой позиции
    ctx.drawImage(hero, hX, hY);
    drawPumpkin();
    collisionDetection();
    drawScore();
    drawCoor();
    wallDetection();
    drawDynamic();
    
    if(rightPressed && hX < canvas.width) {
        hX += 5;
    }
    else if(leftPressed && hX > 0) {
        hX -= 5;
    }
    else if(upPressed && hY > 0) {
        hY -= 5;
    }
    
    else if(downPressed && hY < canvas.height) {
        hY += 5;
    }
    
    requestAnimationFrame(draw);
}

    let hero = new Image();
    let pumpkin = new Image();
    let wall = new Image();
    hero.src = 'img/hero.png';
    pumpkin.src = 'img/pumpkin.png';
    wall.src = 'img/wall.png';
    
    let hX = 155;  //позиция героя
    let hY = 155;
    let pump = [];
    let forcol = [];
    let c_forcol = 0;
    let pumpcount = 10;
    let pumpPadding = 30;
    let wallwidth = 20;
    let eaten = 0;
   
    for(var i=0; i<pumpcount; i++){
        pump[i] = { x: 0, y: 0, status: 1 };
    }
    
    function drawPumpkin() {
    for(var i=0; i<pumpcount; i++) {
        if(pump[i].status == 1) {
          var pX = (i*(pumpkin.width+pumpPadding))+100;
          var pY = 40;
          pump[i].x = pX;
          pump[i].y = pY;
          ctx.drawImage(pumpkin, pX, pY);
         }
       }
     }

    function drawWall(how, ac, aX, aY, aW, theImage){   //how = 1 - рисуем вправо; how = 2 - вниз
        var newarr = [];                                    //ac - кол-во объектов (массив), aX и aY - коорд. начала, aW - ширина объекта
        for(var i=0; i<ac; i++){                        //theImage - картинка
            newarr[i] = {x:0, y:0, status: 2};
            forcol[c_forcol] = newarr[i];
            c_forcol++;
        }
        for(var i=0; i<ac; i++){
          if(how == 1){
            var nX = aX+i*aW;
            var nY = aY;
          }
          else if(how == 2){
            var nX = aX;
            var nY = aY+i*aW;
          }
            newarr[i].x = nX;
            newarr[i].y = nY;
            ctx.drawImage(theImage, nX, nY);
          }
    }
    
function collisionDetection() {
  for(var i=0; i<pumpcount; i++) {
    var p = pump[i];
    if(p.status == 1) {
      if(hX+hero.width > p.x && hX+hero.width < p.x+pumpkin.width && hY < p.y && hY+hero.height > p.y) {
        p.status = 0;
        eaten++;
      }
    }  
  }
}
    
    
    /**
        TODO: ежесекундно проевряется КАЖДЫЙ блок (совпадает ли его позиция с игроком)
        это медленно
    */

// взаимодействие со стенами
function wallDetection() {
  for(var i=0; i<c_forcol; i++) {
    var fc = forcol[i];
    if(fc.status == 2) {
     if(0) {
        //if(hY < fc.y && hY+hero.height > fc.y){ // ПЕРЕДЕЛАТЬ
          //hX -= 5;
            console.log('BUM');
        //}
     }
     
     /*if(hY + hero.height > fc.y && hX+hero.width/2 < fc.x) {
       hY -= 5;
      }*/
    }  
  }
}

function drawScore() {
  ctx.font = "20px Sensel bold";
  ctx.fillStyle = "#7921A1";
  ctx.fillText("SCORE "+eaten, 1200, 20);
}

function drawCoor() {
  ctx.font = "20px Sensel bold";
  ctx.fillStyle = "green";
  ctx.fillText("X hero "+hX, 1150, 80);
  ctx.fillText("Y hero "+hY, 1050, 80);
  ctx.fillText("hero width "+hero.width, 1100, 100);
  ctx.fillText("hero height "+hero.height, 1100, 120);
}

    /* отрисовка стен */
function drawDynamic() {	
    drawWall(2, 14, 700, 20, wallwidth, wall);  //куда, кол-во, X, Y, Ширина картинки, Картинка // 1 - по иксу рисуем; 2 - по игреку
    drawWall(1, 11, 600, 160, wallwidth, wall);
    ////////////////////////////////////////////////////////Рамки
    drawWall(1, 65, 0, 0, wallwidth, wall);
    drawWall(2, 10, 0, 0, wallwidth, wall);
    drawWall(2, 10, 0, 400, wallwidth, wall);
    drawWall(2, 30, 1280, 0, wallwidth, wall);
    drawWall(1, 65, 0, 580, wallwidth, wall);
    
    }   

function keyDownHandler(e) {      //реагирование на нажатие кнопки; 39 - вправо, 37 - влево
    if(e.keyCode == 39) {
        rightPressed = true;        //кнопка нажата
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {           //кнопка отпущена
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
     else if(e.keyCode == 38) {
        upPressed = false;
    }
     else if(e.keyCode == 40) {
        downPressed = false;
    }
}     


draw();
drawDynamic();
document.addEventListener("keydown", keyDownHandler, false); //событие при нажатии кнопки (нажата)
document.addEventListener("keyup", keyUpHandler, false); //отпущена  
    
/**
Отрисовка ОДНОГО объекта
    параметры:
    x - расположение по Х
    у - рсположение по У
    obj - объект (его картинка, ширина, высота)
    isStatic - можно ли его двигать 
    isEaten - можно ли его поднять
    isEnemy - можно ли дотронуться
    score - плюс очков за поднятие
*/

function drawObj(x, y, obj, isEaten, score, isStatic=0, isEnemy=0) {
    let image = new Image();
    image.src = obj.img;
    
    ctx.drawImage(image, x, y);
}


/**
Объект
    img - путь до изображения объекта
    width - ширина объекта в px
    height - высота объекта в px
*/

const pumpkins = {
    img: './img/pumpkin.png',
    width: 20,
    height: 20
}


/**
Пример отрисовки 15 тыкв
*/

function drawManyPumkins(n) {
    let x = 40,
        y = 200;
    
    for(let i=0; i<n; i++) {
        drawObj(x, y, pumpkins, 1, 25);
        x = x + pumpkins.width + 15;
    }
}

drawManyPumkins(15);