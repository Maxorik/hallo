let thumb = false;
let win = {width: $(window).width(), height: $(window).height()};
let mouse = {x: 0, y: 0};
let joy = {x: 0, y: 0};

$(document).ready(function(){
	$('.side').on('mousedown', function(){
		$('body').addClass('grabbing')
		thumb = true;
	})
	$(document).on('mouseup', function(){
		$('body').removeClass('grabbing')
		thumb = false;
	})
	$(document).on('mousemove', function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	})

    $('.side').on('touchstart', function(){
		$('body').addClass('grabbing')
		thumb = true;
	})
	$(document).on('touchend', function(){
		$('body').removeClass('grabbing')
		thumb = false;
	})
	$(document).on('touchmove', function(e){
		mouse.x = e.touches[0].pageX;
		mouse.y = e.touches[0].pageY;
	})
    
	requestAnimationFrame(animate);
	drawJoystick();
})

function animate(){
	updateJoystickPosition();
	drawJoystick();
	requestAnimationFrame(animate);
}

function updateJoystickPosition(){
	if (thumb){
		joy.x = (mouse.x / win.width - 0.5)*4;
		joy.y = (mouse.y / win.height - 0.75)*4;
		if (joy.x > 1)
			joy.x = 1;
		if (joy.x < -1)
			joy.x = -1;
		if (joy.y > 1)
			joy.y = 1;
		if (joy.y < -1)
			joy.y = -1;

	} else {
		joy.x *= 0.6;
		joy.y *= 0.6;
	}

}

function drawJoystick(){
	let xRotate = joy.x * -30;	    // радиус рычага по Х и Y
	let yRotate = joy.y * 30;	
    let transform;
    
    /* двигаем джойстик */
    if(thumb === true) {
        transform = 'rotateY('+xRotate+'deg) rotateX('+yRotate+'deg) perspective(5000rem) translateZ(0rem)';
        
        if(xRotate < 6 && xRotate > -20 && yRotate < 0) {
            //console.log('up!');
            allKeyIsUp();
            upPressed = true; 
        } else if(xRotate < 10 && xRotate > -20 && yRotate > 0) {
            //console.log('down!');
            allKeyIsUp();
            downPressed = true; 
        } else if(xRotate > 0 && yRotate < 10) {
            //console.log('left!');
            allKeyIsUp();
            leftPressed = true; 
        } else if(xRotate < -20 && yRotate > -6) {
            //console.log('right!');
            allKeyIsUp();
            rightPressed = true; 
        }
        
    } else {
        allKeyIsUp();
        transform = 'rotateY(0deg) rotateX(0deg) perspective(5000rem) translateZ(0rem)';
    }

	$('.thumb').css('transform', transform);       // кнопка 
	$('.side').css('transform', transform);        // рычаг
	$('.stem').css('transform', transform);        // часть между кнопкой и подставкой (рычаг)
}

