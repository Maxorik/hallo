const pole = document.getElementById('pole')
      startbtn = document.getElementById('start_btn');

let born = 0, 
    dead = 0,
    alive = 0,
    nowP = [],
    nextP = [],
    isMobile = false;

if(window.navigator.userAgent.toLowerCase().includes('mobi')) {
    isMobile = true;
}

for(let i=0; i<100; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = 'cell-' + i;
    pole.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');

for(let i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', () => getLive(cells[i]));
}

start_btn.addEventListener('click', newLife);

function getLive(cell) {
    if(cell.classList.contains('alive')) {
        cell.classList.remove('alive');
        alive--;
    } else {
        cell.classList.add('alive');
        born++;
        alive++;
    }
    
    addToTable();
}

function addToTable() {
    let str = '<tr><td>' + born + '</td><td>' + dead + '</td><td>' + alive + '</td></tr>';
    document.getElementById('game_statistic').innerHTML += str;
    document.getElementById('statistic').scrollTop += 40
}

function getLife() {
    for(let i=0; i<cells.length; i++) {
        if(cells[i].classList.contains('alive')) {
            nowP[i] = 1;
        } else {
            nowP[i] = 0;
        }
    }
}

function getNeighbor(i) {
    let nei = [i-11, i-10, i-9, i-1, i+11, i+10, i+9, i+1];
    for(let i=0; i<nei.length; i++) {
        if(+nei[i] < 0) {
            nei[i] = +nei[i] + 10;
        } else if (+nei[i] > 100) {
            nei[i] = +nei[i] - 10;
        }           
    }
    
    return nei;
}

function checkLife() {
    for(let i=0; i<nowP.length; i++) {
        let nei = getNeighbor(i);
        let l=0, change=0;
        
        for(let j=0; j<nei.length; j++) {
            if(nowP[nei[j]] === 1) {
                l++;
            }
        }
        
        if(nowP[i]===0 && l===3) {
            nextP[i] = 1;
            born++;
            alive++;
            change++;
        } else if(nowP[i]===1 && l>=2 && l<=3) {
            nextP[i] = 1;
        } else if (nowP[i]===1 && l<2 || l>3) {
            nextP[i] = 0;
            dead++;
            change++;
        }
        
        if(change>0 && !isMobile) {
            console.log('asasas');
            addToTable();
        }
    }
    
    setClass();
}

function setClass() {
    for(let i=0; i<cells.length; i++) {
        cells[i].classList.remove('alive');
        if(nextP[i] === 1) {
            cells[i].classList.add('alive');
        }
        
        nowP[i] = nextP[i];
    }
}

function newLife() {
    let timertest;
    
    if(startbtn.classList.contains('start')) {
        startbtn.classList.remove('start');
        startbtn.classList.add('stop');
        startbtn.innerHTML = 'Пауза';
        window.timerId = window.setInterval(age, 850);
        
    } else if(startbtn.classList.contains('stop')){
        startbtn.classList.remove('stop');
        startbtn.classList.add('start');
        startbtn.innerHTML = 'Старт';
        window.clearInterval(window.timerId);
    }
}

function age(){
    getLife();
    checkLife();
}