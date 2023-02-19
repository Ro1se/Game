var xDelta = 0;
var yDelta = 0;
var xPos = 0;
var yPos = 0;
var arr = [];
var hero;
var boolExistenceBullet = false;
var bulletPos = 0;
var deltaBullet = 5;
let x;
let y;
var arrBullet = [];

console.log(`Ширина ${document.documentElement.clientWidth}`);
console.log(`Высота: ${document.documentElement.clientHeight}`);

var boolKey = {

  arrowLeft: true,
  arrowRight: true,
  arrowUp: true,
  arrowDown: true

}  
let lastKey;

function intersects ( ax, ax1, ay, ay1, bx, bx1, by, by1 ) { // Пересечения
  return(
    (
      (
        ( ax >= bx && ax <= bx1 )||( ax1 >= bx && ax1 <= bx1  )
      ) && (
        ( ay >= by && ay <= by1 )||( ay1 >= by && ay1 <= by1 )
      )
    )||(
      (
        ( bx >= ax && bx <= ax1 )||( bx1 >= ax && bx1 <= ax1  )
      ) && (
        ( by >= ay && by <= ay1 )||( by1 >= ay && by1 <= ay1 )
      )
    )
  )||(
    (
      (
        ( ax >= bx && ax <= bx1 )||( ax1 >= bx && ax1 <= bx1  )
      ) && (
        ( by >= ay && by <= ay1 )||( by1 >= ay && by1 <= ay1 )
      )
    )||(
      (
        ( bx >= ax && bx <= ax1 )||( bx1 >= ax && bx1 <= ax1  )
      ) && (
        ( ay >= by && ay <= by1 )||( ay1 >= by && ay1 <= by1 )
      )
    )
  )};



document.onmousemove = function(event) { // Слежение персонажа за курсором
  x = event.x - parseInt(document.getElementById("hero_r").style.left) - parseInt(document.getElementById("hero_r").style.width) / 2;
  y = event.y - (document.documentElement.clientHeight - (parseInt(document.getElementById("hero_r").style.bottom) + parseInt(document.getElementById("hero_r").style.height) / 2));
  console.log(`x=${x}  y=${y}`);
  document.getElementById('hero_r').style.transform = 'rotate('+(180 / Math.PI)*arcctg(x, y)+'45deg)';

  function arcctg (x, y) {
    if (x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
    if (x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
    if (x < 0 && y < 0) return Math.PI + Math.atan(y / x);
    if (x < 0 && y < 0) return Math.PI + Math.atan(y / x);
    if (x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y));
  }
}


function moveX() { // Движение персонажа по X
    if(xPos  != 0) {
        xPos = xPos - xDelta;
        for(var i = 0; i < arr.length; i++) {
        var ax = parseInt(document.getElementById("hero_r").style.left) + xDelta;
        var ax1 = parseInt(document.getElementById("hero_r").style.left) + xDelta + parseInt(document.getElementById("hero_r").style.width);
        var ay = parseInt(document.getElementById("hero_r").style.bottom);
        var ay1 = parseInt(document.getElementById("hero_r").style.bottom) + parseInt(document.getElementById("hero_r").style.height);
        var canMove = true;
        for(var i = 0; i < arr.length; i++) {
        if(arr[i].id == "hero_r") continue;
            var bx = parseInt(arr[i].left);
            var bx1 = parseInt(arr[i].left) + parseInt(arr[i].width);
            var by = parseInt(arr[i].bottom);
            var by1 = parseInt(arr[i].bottom) + parseInt(arr[i].height);
            if(intersects(ax, ax1, ay, ay1, bx, bx1, by, by1)==true) {
                canMove = false;
                console.log(arr[i])
                console.log(ax, ax1, ay, ay1, bx, bx1, by, by1)
	}
};
		
		if(canMove == true)
		document.getElementById("hero_r").style.left = parseInt(document.getElementById("hero_r").style.left) + xDelta +"px";
	}
}
}
function moveY() { // Движение персонажа по Y
	if(yPos   != 0) {
	    yPos = yPos - yDelta;
		for(var i = 0; i < arr.length; i++) {
			var ax = parseInt(document.getElementById("hero_r").style.left);
			var ax1 = parseInt(document.getElementById("hero_r").style.left) + parseInt(document.getElementById("hero_r").style.width) ;
			var ay = parseInt(document.getElementById("hero_r").style.bottom) + yDelta;
			var ay1 = parseInt(document.getElementById("hero_r").style.bottom) + yDelta + parseInt(document.getElementById("hero_r").style.height);
			var canMove = true;
			for(var i = 0; i < arr.length; i++) {
			    if(arr[i].id == "hero_r") continue;
				    var bx = parseInt(arr[i].left);
				    var bx1 = parseInt(arr[i].left) + parseInt(arr[i].width);
				    var by = parseInt(arr[i].bottom);
				    var by1 = parseInt(arr[i].bottom) + parseInt(arr[i].height);
				if(intersects(ax, ax1, ay, ay1, bx, bx1, by, by1) == true) {
				   canMove = false;
				   console.log(arr[i])
				   console.log(ax, ax1, ay, ay1, bx, bx1, by, by1)
				}
			};
			if(canMove == true)
	 
			document.getElementById("hero_r").style.bottom = parseInt(document.getElementById("hero_r").style.bottom) + yDelta +"px";
		}
	}
}

var k = 0;
function createBullet() { // Создание пули
  if (boolExistenceBullet) {
    var bullet = new myObjects("bullet");
  
    

    if(x >= 0){
    bullet.left = parseInt(document.getElementById("hero_r").style.left) - Math.sin(Math.atan(y / x) - 90 * Math.PI / 180) * 50 + 'px';
    bullet.bottom = parseInt(document.getElementById("hero_r").style.bottom) - Math.cos(Math.atan(y / x) - 90 * Math.PI / 180) * 50 + 'px';
    bullet.posXBullet = x;
    bullet.posYBullet = -y;
    }
		else {
    bullet.left = parseInt(document.getElementById("hero_r").style.left) + Math.sin(Math.atan(y / x) - 90 * Math.PI / 180) * 50 + 'px';
    bullet.bottom = parseInt(document.getElementById("hero_r").style.bottom) + Math.cos(Math.atan(y / x) - 90 * Math.PI / 180) * 50 + 'px';
    bullet.posXBullet = x;
    bullet.posYBullet = -y;
    }

    bullet.transform = 'rotate('+(Math.atan(y / x)) * (180 / Math.PI)+'deg)';
		bullet.myRender();
		boolExistenceBullet = false;
    arr.push(bullet);
	}
}

function deltaBullets() { //Движение пули


  for (var i = 0; i < arrBullet.length; i++) {
    arrBullet[i].bulletLife = arrBullet[i].bulletLife - 1;
    if(arrBullet[i].bulletLife <= 0) {
      arrBullet[i].remove();
      continue;
    }
    if (arrBullet[i].getElementById == `bullet${i}`) {
      var constAngle = (arrBullet[i].style.posYBullet) / (arrBullet[i].style.posXBullet);
      var fY_deltaBullet = constAngle * (deltaBullet);
      var fX_deltaBullet = (1/constAngle) * (deltaBullet);
      if (arrBullet[i].style.posXBullet >= 0 && arrBullet[i].style.posYBullet <= arrBullet[i].style.posXBullet && arrBullet[i].style.posYBullet >= -arrBullet[i].style.posXBullet) {
        if(collisionBullet(arrBullet[i], deltaBullet, fY_deltaBullet) == true ){
        arrBullet[i].style.left = parseInt(arrBullet[i].style.left) + deltaBullet + 'px';
        arrBullet[i].style.bottom = parseInt(arrBullet[i].style.bottom) + fY_deltaBullet + 'px';
        } else {
          arrBullet[i].remove();
        }
      }
      if (arrBullet[i].style.posXBullet <= 0 && arrBullet[i].style.posYBullet <= -arrBullet[i].style.posXBullet && arrBullet[i].style.posYBullet >= arrBullet[i].style.posXBullet) {
        if(collisionBullet(arrBullet[i], deltaBullet, fY_deltaBullet) == true ){
          arrBullet[i].style.left = parseInt(arrBullet[i].style.left) - deltaBullet + 'px';
          arrBullet[i].style.bottom = parseInt(arrBullet[i].style.bottom) - fY_deltaBullet + 'px';
        } else {
          arrBullet[i].remove();
        }
        
      }
      if (arrBullet[i].style.posYBullet >= 0 && arrBullet[i].style.posXBullet <= arrBullet[i].style.posYBullet && arrBullet[i].style.posXBullet >= -arrBullet[i].style.posYBullet){
        if(collisionBullet(arrBullet[i], fX_deltaBullet, deltaBullet) == true ){
          arrBullet[i].style.left = parseInt(arrBullet[i].style.left) + fX_deltaBullet + 'px';
          arrBullet[i].style.bottom = parseInt(arrBullet[i].style.bottom) + deltaBullet + 'px';
        } else {
          arrBullet[i].remove();
        }

      }
      if (arrBullet[i].style.posYBullet <= 0 && arrBullet[i].style.posXBullet <= -arrBullet[i].style.posYBullet && arrBullet[i].style.posXBullet >= arrBullet[i].style.posYBullet){
        if(collisionBullet(arrBullet[i], fX_deltaBullet, deltaBullet) == true ){
          arrBullet[i].style.left = parseInt(arrBullet[i].style.left) - fX_deltaBullet + 'px';
          arrBullet[i].style.bottom = parseInt(arrBullet[i].style.bottom) - deltaBullet + 'px';
        } else {
          arrBullet[i].remove();
        }

      }
    }
  }
}

function collisionBullet(bullet, bulletdx, bulletdy) { // Взаимодействие пули с объектами
    var ax = parseInt(bullet.style.left) + bulletdx;
		var ax1 = parseInt(bullet.style.left) + parseInt(bullet.style.width) + bulletdx;
		var ay = parseInt(bullet.style.bottom) + bulletdy;
		var ay1 = parseInt(bullet.style.bottom) + parseInt(bullet.style.height) + bulletdy;
    var canMove = true;
    for(var i = 0; i < arr.length; i++) {
    var bx = parseInt(arr[i].left);
    var bx1 = parseInt(arr[i].left) + parseInt(arr[i].width);
    var by = parseInt(arr[i].bottom);
    var by1 = parseInt(arr[i].bottom) + parseInt(arr[i].height);
    if(intersects(ax, ax1, ay, ay1, bx, bx1, by, by1) == true) { // to do
       canMove = false;
       console.log(arr[i])
       console.log(ax, ax1, ay, ay1, bx, bx1, by, by1)
    }
  };
  
  console.log(canMove);
  return canMove;
}
debugger;

function WASDKeys() { // Проверка, какая последняя кнопка нажата


  if (lastKey == 'a' && boolKey.arrowLeft == false) {

    xPos = -8;
    xDelta = -2;

  }
  else if (lastKey == 'd' && boolKey.arrowRight == false) {

    xPos = 8;
    xDelta = 2;

  }
  else if (lastKey == 'w' && boolKey.arrowUp == false) {
    yPos = 8;
    yDelta = 2;

  }
  else if (lastKey == 's' && boolKey.arrowDown == false) {
    yPos = -8;
    yDelta = -2;
  }

}

document.addEventListener('click', (event) => { // Слушатель на кнопку мыши
  if(event.button == 0) {
    boolExistenceBullet = true;
  }
})


document.addEventListener('keydown', (event) => { // Слушатель на нажатие кнопок WASD
  switch (event.key) {
    case 'a':
      boolKey.arrowLeft = false;
      lastKey = 'a';
      break;
    case 'd':
      boolKey.arrowRight = false;
      lastKey = 'd';
      break;
    case 'w':
      boolKey.arrowUp = false;
      lastKey = 'w';
      break;
    case 's':
      boolKey.arrowDown = false;
      lastKey = 's';
      break;
  }
});

document.addEventListener('keyup', (event) => { // Слушатель на отпускание кнопок WASD

  switch (event.key) {

    case 'a':
      boolKey.arrowLeft = true;
      break;
    case 'd':
      boolKey.arrowRight = true;
      break;
    case 'w':
      boolKey.arrowUp = true;
      break;
    case 's':
      boolKey.arrowDown = true;
      break;
  }
})


class myObjects { // Создание типов объектов
    constructor(type) {
    //Hero_red
        if(type == 'hero_r') {
            this.backgroundimage = 'url(./img/Heroes/Hero_red.png)';
            this.position = 'absolute';
            this.backgroundsize = '60px 35px';
            this.backgroundrepeat = 'no-repeat';
            this.width = '60px';
            this.height = '35px';
            this.id = 'hero_r';
          }

          if(type == 'opponent') {
            this.backgroundimage = 'url(./img/Heroes/Hero_blue.png)';
            this.position = 'absolute';
            this.backgroundsize = '60px 35px';
            this.backgroundrepeat = 'no-repeat';
            this.width = '60px';
            this.height = '35px';
            this.transform = 'scale(-1, -1)'
            this.id = 'opponent';
          }

        if(type == 'box_1') {
          this.backgroundimage = 'url(./img/objects/box_1.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '50px 50px';
          this.width = '50px';
          this.height = '50px';
        }

        if(type == 'box_2') {
          this.backgroundimage = 'url(./img/objects/box_1.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '50px 50px';
          this.width = '50px';
          this.height = '50px';
        }

        if(type == 'bagw_1') {
          this.backgroundimage = 'url(./img/objects/bag-wall.png)';
          this.position = 'absolute';
          this.backgroundsize = '30px 95px';
          this.backgroundrepeat = 'no-repeat';
          this.width = '30px';
          this.height = '95px';
        }

        if(type == 'bagw_2') {
          this.backgroundimage = 'url(./img/objects/bag-wall.png)';
          this.position = 'absolute';
          this.backgroundsize = '30px 95px';
          this.backgroundrepeat = 'no-repeat';
          this.transform = 'scale(-1, -1)';
          this.width = '30px';
          this.height = '95px';
        }

        if(type == 'bwall') {
          this.backgroundimage = 'url(./img/objects/wall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.alignitems = 'center';
          this.width = '8px';
          this.height = '120px';
        }

        if(type == 'upwall') {
          this.backgroundimage = 'url(./img/objects/wall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '120px 8px';
          this.width = '120px';
          this.height = '8px';
          this.boxShadow = '1px 1px 5px 1px rgb(0, 0, 0)';
        }

        if(type == 'downwall') {
          this.backgroundimage = 'url(./img/objects/wall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '120px 8px';
          this.width = '120px';
          this.height = '8px';
          this.boxShadow = '1px 1px 5px 1px rgb(0, 0, 0)';
        }

        if(type == 'lwall1') {
          this.backgroundimage = 'url(./img/objects/longwall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '150px 10px';
          this.width = '150px';
          this.height = '10px';
        }
        
        if(type == 'ltwall1') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'ltwall2') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'lwall2') {
          this.backgroundimage = 'url(./img/objects/longwall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '150px 10px';
          this.width = '150px';
          this.height = '10px';
        }

        if(type == 'ltwall3') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'ltwall4') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'lwall3') {
          this.backgroundimage = 'url(./img/objects/longwall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '150px 10px';
          this.width = '150px';
          this.height = '10px';
        }

        if(type == 'ltwall5') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'ltwall6') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'lwall4') {
          this.backgroundimage = 'url(./img/objects/longwall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '150px 10px';
          this.width = '150px';
          this.height = '10px';
        }

        if(type == 'ltwall7') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'ltwall8') {
          this.backgroundimage = 'url(./img/objects/littlewall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '10px 70px';
          this.width = '10px';
          this.height = '70px';
        }

        if(type == 'swall1') {
          this.backgroundimage = 'url(./img/objects/smallwall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '13px 78px';
          this.width = '13px';
          this.height = '78px';
        }

        if(type == 'swall2') {
          this.backgroundimage = 'url(./img/objects/smallwall.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '13px 78px';
          this.width = '13px';
          this.height = '78px';
        }

        if(type == 'med1') {
          this.backgroundimage = 'url(./img/objects/medicine.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '18px 22px';
          this.width = '18px';
          this.height = '22px';
        }

        if(type == 'med2') {
          this.backgroundimage = 'url(./img/objects/medicine.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '18px 22px';
          this.width = '18px';
          this.height = '22px';
        }

        if(type == 'med3') {
          this.backgroundimage = 'url(./img/objects/medicine.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '18px 22px';
          this.width = '18px';
          this.height = '22px';
        }

        if(type == 'med4') {
          this.backgroundimage = 'url(./img/objects/medicine.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '18px 22px';
          this.width = '18px';
          this.height = '22px';
        }

        if(type == 'ammo1') {
          this.backgroundimage = 'url(./img/objects/ammo.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '35px 22px';
          this.width = '35px';
          this.height = '22px';
        }

        if(type == 'ammo2') {
          this.backgroundimage = 'url(./img/objects/ammo.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '35px 22px';
          this.width = '35px';
          this.height = '22px';
        }

        if(type == 'ammo3') {
          this.backgroundimage = 'url(./img/objects/ammo.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '35px 22px';
          this.width = '35px';
          this.height = '22px';
        }

        if(type == 'ammo4') {
          this.backgroundimage = 'url(./img/objects/ammo.png)';
          this.position = 'absolute';
          this.backgroundrepeat = 'no-repeat';
          this.backgroundsize = '35px 22px';
          this.width = '35px';
          this.height = '22px';
        }

        if(type == 'bullet') {
          this.backgroundimage = 'url(./img/objects/bullet-b.png)';
          this.position = 'absolute';
          this.backgroundsize = '17px 6px';
          this.backgroundrepeat = 'no-repeat';
          this.width = '17px';
          this.height = '6px';
          this.id = 'bullet';
          this.transform = 'rotate(0deg)';
          this.posXBullet = 0;
          this.posYBullet = 0;
          this.existencecounter = 0;
          this.bulletLife = 200;
        }

        
        }

        myRender() { // Рендер объектов
		    let d = document.createElement('div');
        d.style.width = this.width;
        d.style.height = this.height;
        d.style.backgroundImage = this.backgroundimage;
        d.style.bottom = this.bottom;
        d.style.left = this.left;
        d.style.backgroundSize = this.backgroundsize;
        d.style.position = this.position;
        d.style.transform = this.transform;
        d.style.boxShadow = this.boxShadow;
        d.style.posXBullet = this.posXBullet;
        d.style.posYBullet = this.posYBullet;
        d.id = this.id;
        d.style.class = this.class;
        d.style.existenceCounter = this.existencecounter;
        document.body.appendChild(d);
    }

      }


      document.addEventListener('DOMContentLoaded', function(){
        hero =  new myObjects("hero_r"); // Красный персонаж
        hero.left = "40px";
        hero.bottom = '285px';
        arr.push(hero);

        opponent =  new myObjects("opponent"); // Синий персонаж
        opponent.left = "1260px";
        opponent.bottom = '285px';
        arr.push(opponent);

        var box1 = new myObjects("box_1"); // Левый ящик
        box1.left = "340px";
        box1.bottom = "130px";
        arr.push(box1);

        var box2 = new myObjects("box_2"); // Правый ящик
        box2.left = "975px";
        box2.bottom = "450px";
        arr.push(box2);

        var bagw1 = new myObjects("bagw_1"); // Левая ограда из песка
        bagw1.left = "120px";
        bagw1.bottom = "250px";
        arr.push(bagw1);

        var bagw2 = new myObjects("bagw_2"); // Правая ограда из песка
        bagw2.left = "1210px";
        bagw2.bottom = "260px";
        arr.push(bagw2);

        var bwall = new myObjects("bwall"); //Центральная стенка
        bwall.left = "670px";
        bwall.bottom = "260px";
        arr.push(bwall);

        var upwall = new myObjects("upwall"); // Верхняя стенка
        upwall.left = "615px";
        upwall.bottom = "575px";
        arr.push(upwall);

        var downwall = new myObjects("downwall"); // Нижняя стенка
        downwall.left = "615px";
        downwall.bottom = "60px";
        arr.push(downwall);

        var lwall1 = new myObjects("lwall1"); // Верхняя длинная стенка дома красного
        lwall1.left = "340px";
        lwall1.bottom = "510px";
        arr.push(lwall1);

        var ltwall1 = new myObjects("ltwall1"); // Левая вехняя стенка дома красного (короткая)
        ltwall1.left = "335px";
        ltwall1.bottom = "450px";
        arr.push(ltwall1);

        var ltwall2 = new myObjects("ltwall2"); // Левая нижняя стенка дома красного (короткая)
        ltwall2.left = "335px";
        ltwall2.bottom = "320px";
        arr.push(ltwall2);

        var lwall2 = new myObjects("lwall2"); // Нижняя длинная стенка дома красного
        lwall2.left = "340px";
        lwall2.bottom = "320px";
        arr.push(lwall2);

        var ltwall3 = new myObjects("ltwall3"); //Правая нижняя стенка дома красного (короткая)
        ltwall3.left = "480px";
        ltwall3.bottom = "320px";
        arr.push(ltwall3);

        var ltwall4 = new myObjects("ltwall4"); // Правая верхняя стенка дома красного (короткая)
        ltwall4.left = "480px";
        ltwall4.bottom = "450px";
        arr.push(ltwall4);

        var lwall3  = new myObjects("lwall3"); // Нижняя длинная стенка синего
        lwall3.left = "880px";
        lwall3.bottom = "125px";
        arr.push(lwall3);

        var ltwall5  = new myObjects("ltwall5"); //Левая нижняя стенка синего (короткая)
        ltwall5.left = "875px";
        ltwall5.bottom = "125px";
        arr.push(ltwall5);

        var ltwall6  = new myObjects("ltwall6"); // Левая верхняя стенка синего (короткая)
        ltwall6.left = "875px";
        ltwall6.bottom = "250px";
        arr.push(ltwall6);

        var lwall4  = new myObjects("lwall4"); // Верхняя длинная стенка синего
        lwall4.left = "880px";
        lwall4.bottom = "310px";
        arr.push(lwall4);

        var ltwall7  = new myObjects("ltwall7"); // Правая верхняя стенка синего (короткая)
        ltwall7.left = "1020px";
        ltwall7.bottom = "250px";
        arr.push(ltwall7);

        var ltwall8  = new myObjects("ltwall8"); // Правая верхняя стенка синего (короткая)
        ltwall8.left = "1020px";
        ltwall8.bottom = "125px";
        arr.push(ltwall8);

        var swall1  = new myObjects("swall1"); // Правая стенка в крапинку
        swall1.left = "770px";
        swall1.bottom = "430px";
        arr.push(swall1);

        var swall2  = new myObjects("swall2"); // Левая стенка в крапинку
        swall2.left = "585px";
        swall2.bottom = "135px";
        arr.push(swall2);

        var med1  = new myObjects("med1"); // Аптечка в доме красного
        med1.left = "350px";
        med1.bottom = "480px";
        arr.push(med1);

        var med2  = new myObjects("med2"); // Аптечка в доме синего
        med2.left = "1000px";
        med2.bottom = "140px";
        arr.push(med2);

        var med3  = new myObjects("med3"); // Аптечка в доме красного
        med3.left = "565px";
        med3.bottom = "140px";
        arr.push(med3);

        var med4  = new myObjects("med4"); // Аптечка со стороны синего
        med4.left = "785px";
        med4.bottom = "480px";
        arr.push(med4);

        var ammo1  = new myObjects("ammo1"); // Патроны со стороны красного
        ammo1.left = "300px";
        ammo1.bottom = "150px";
        arr.push(ammo1);

        var ammo2 = new myObjects("ammo2"); //Патроны со стороны синего
        ammo2.left = "1030px";
        ammo2.bottom = "470px";
        arr.push(ammo2);

        var ammo3 = new myObjects("ammo3"); //Патроны со стороны синего
        ammo3.left = "680px";
        ammo3.bottom = "585px";
        arr.push(ammo3);

        var ammo4 = new myObjects("ammo4"); //Патроны со стороны синего
        ammo4.left = "650px";
        ammo4.bottom = "35px";
        arr.push(ammo4);



        for(var i = 0; i < arr.length; i++) {
          arr[i].myRender();
        };
    })

      var myIntervalX = setInterval(moveX, 5);
      var myIntervalY = setInterval(moveY, 5);
      var intervalWASD = setInterval(WASDKeys, 5); 
      var intervalCreateBullet = setInterval(createBullet, 200);
      var intervalDeltaBullet = setInterval(deltaBullets, 10);


