const pole = document.getElementById('pole');
let born = 0, 
    dead = 0,
    alive = 0;

for(let i=0; i<100; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    pole.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');
for(let i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', () => getLive(cells[i]));
}

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