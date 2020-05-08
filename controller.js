const controller = document.getElementById('controller');
const contX = controller.getBoundingClientRect().left + 25;
const contY = controller.getBoundingClientRect().top + 20;
const handlerDiff = 50; //отклонение в px от центра
let controllerState = 'nonactive';
let diffX, diffY;

controller.addEventListener('touchstart', function(event){
    let shiftX = event.touches[0].PageX - controller.getBoundingClientRect().left;
    let shiftY = event.touches[0].PageY - controller.getBoundingClientRect().top;
    
    controller.style.position = 'absolute';
    //controller.style.zIndex = 1000;
    document.querySelector('.controllerMiddle').append(controller);

    moveAt(event.touches[0].pageX, event.touches[0].pageY);

    function moveAt(pageX, pageY) {
        controller.style.left = pageX - shiftX + 'px';
        controller.style.top = pageY - shiftY + 'px';
    }
    
    function moveRight(x) {
        console.log('right');
        allKeyIsUp();
        rightPressed = true;
        console.log(event.clientX);
        controller.style.left = x - shiftX + 'px';
    }
    
    function moveLeft(x) {
        console.log('left');
        allKeyIsUp();
        leftPressed = true;
        controller.style.left = x - shiftX + 'px';
    }
    
    function moveUp(y) {
        console.log('up');
        allKeyIsUp();
        upPressed = true;
        controller.style.top = y - shiftY + 'px';
    }
    
    function moveDown(y) {
        console.log('clientX ' + event.touches[0].PageX + ' left ' + controller.getBoundingClientRect().left);
        console.log('down');
        allKeyIsUp();
        downPressed = true;
        controller.style.top = y - shiftY + 'px';
    }

    function onMouseMove(event) {
        //console.log(diffY + '  ' + diffX);
        if(event.touches[0].pageX >= contX) {
            diffX = event.touches[0].pageX - contX;
            if(diffX < handlerDiff && setPositive(diffX) > setPositive(diffY)) {
                moveRight(event.touches[0].pageX);
            }
        } 
        
        if(event.touches[0].pageX < contX) {
            diffX = contX - event.touches[0].pageX;
            if(diffX < handlerDiff && setPositive(diffX) > setPositive(diffY)) {
                moveLeft(event.touches[0].pageX);
            }
        }
        
        if(event.touches[0].pageY < contY) {
            diffY = event.touches[0].pageY - contY;
            if(diffY < handlerDiff && setPositive(diffY) > setPositive(diffX)) {
                moveUp(event.touches[0].pageY);
            }
        }
        
        if(event.touches[0].pageY >= contY) {
            diffY = contY - event.touches[0].pageY;
            if(diffY < handlerDiff && setPositive(diffY) > setPositive(diffX)) {
                moveDown(event.touches[0].pageY);
            }
        }
    }

    document.addEventListener('touchmove', onMouseMove);
    
    function controllerReset() {
        document.removeEventListener('touchmove', onMouseMove);
        controller.touchend = null;
        controller.style.left = contX - 20 + 'px';
        controller.style.top = contY - 20 + 'px';
        diffX = 0;
        diffY = 0;
        allKeyIsUp();
    }

    controller.touchend = function() {
        controllerReset();
        document.removeEventListener('touchmove', onMouseMove);
        allKeyIsUp();
    };
})

//controller.addEventListener('mousedown', function(event){
//    let shiftX = event.clientX - controller.getBoundingClientRect().left;
//    let shiftY = event.clientY - controller.getBoundingClientRect().top;
//    
//    controller.style.position = 'absolute';
//    controller.style.zIndex = 1000;
//    document.body.append(controller);
//
//    moveAt(event.pageX, event.pageY);
//
//    function moveAt(pageX, pageY) {
//        controller.style.left = pageX - shiftX + 'px';
//        controller.style.top = pageY - shiftY + 'px';
//    }
//    
//    function moveRight(x) {
//        console.log('right');
//        allKeyIsUp();
//        rightPressed = true;
//        controller.style.left = x - shiftX + 'px';
//    }
//    
//    function moveLeft(x) {
//        console.log('left');
//        allKeyIsUp();
//        leftPressed = true;
//        controller.style.left = x - shiftX + 'px';
//    }
//    
//    function moveUp(y) {
//        console.log('up');
//        allKeyIsUp();
//        upPressed = true;
//        controller.style.top = y - shiftY + 'px';
//    }
//    
//    function moveDown(y) {
//        console.log('down');
//        allKeyIsUp();
//        downPressed = true;
//        controller.style.top = y - shiftY + 'px';
//    }
//
//    function onMouseMove(event) {
//        if(event.pageX >= contX) {
//            diffX = event.pageX - contX;
//            if(diffX < handlerDiff) {
//                moveRight(event.pageX);
//            }
//        } 
//        
//        if(event.pageX < contX) {
//            diffX = contX - event.pageX;
//            if(diffX < handlerDiff) {
//                moveLeft(event.pageX);
//            }
//        }
//        
//        if(event.pageY < contY) {
//            diffY = event.pageY - contY;
//            if(diffY < handlerDiff) {
//                moveUp(event.pageY);
//            }
//        }
//        
//        if(event.pageY >= contY) {
//            diffY = contY - event.pageY;
//            if(diffY < handlerDiff) {
//                moveDown(event.pageY);
//            }
//        }
//    }
//
//    document.addEventListener('mousemove', onMouseMove);
//    
//    function controllerReset() {
//        document.removeEventListener('mousemove', onMouseMove);
//        controller.touchend = null;
//        controller.style.left = contX - 20 + 'px';
//        controller.style.top = contY - 20 + 'px';
//        diffX = 0;
//        diffY = 0;
//        allKeyIsUp();
//    }
//
//    controller.onmouseup = function() {
//        controllerReset();
//    };
//})

controller.touchmove = function() {
    return false;
};

controller.ondragstart = function() {
    return false;
};

function setPositive(num) {
    if(num < 0){
        return num * -1;
    } else return num;
}