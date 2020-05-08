const controller = document.getElementById('controller');
const contX = controller.getBoundingClientRect().left + 25;
const contY = controller.getBoundingClientRect().top + 20;
const handlerDiff = 20; //отклонение в px от центра
let controllerState = 'nonactive';
let diffX, diffY;

controller.addEventListener('touchstart', function(event){
    let shiftX = event.clientX - controller.getBoundingClientRect().left;
    let shiftY = event.clientY - controller.getBoundingClientRect().top;
    
    //controller.style.position = 'absolute';
    controller.style.zIndex = 1000;
    document.body.append(controller);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        controller.style.left = pageX - shiftX + 'px';
        controller.style.top = pageY - shiftY + 'px';
    }
    
    function moveRight(x) {
        console.log('right');
        allKeyIsUp();
        rightPressed = true;
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
        console.log('down');
        allKeyIsUp();
        downPressed = true;
        controller.style.top = y - shiftY + 'px';
    }

    function onMouseMove(event) {
        if(event.pageX >= contX) {
            diffX = event.pageX - contX;
            if(diffX < handlerDiff) {
                moveRight(event.pageX);
            }
        } 
        
        if(event.pageX < contX) {
            diffX = contX - event.pageX;
            if(diffX < handlerDiff) {
                moveLeft(event.pageX);
            }
        }
        
        if(event.pageY < contY) {
            diffY = event.pageY - contY;
            if(diffY < handlerDiff) {
                moveUp(event.pageY);
            }
        }
        
        if(event.pageY >= contY) {
            diffY = contY - event.pageY;
            if(diffY < handlerDiff) {
                moveDown(event.pageY);
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
    };
})

//controller.touchmove = function() {
//    return false;
//};

function setPositive(num) {
    if(num < 0){
        return num * -1;
    } else return num;
}