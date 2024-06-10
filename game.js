



// tenho que transformar meu player em objeto
//possui propriedades e metodos
//propriedades sao caracteristicas
//metodost sao funcoes que executam acoes e alteram as propriedades do proprio objeto
//controler: trazer a interacao do usuario para o meu programa
let gameArea = {
    width: null,
    height: null,
    html: document.getElementById('game-area'),
    start: () => {
        gameArea.width = gameArea.html.clientWidth;
        gameArea.height = gameArea.html.clientHeight;
    }
}

let player = {
    top: 0,
    left: 0,
    width: 100,
    height: 50,
    isShooting: false,
    html: document.getElementById('player'),
    shoot: () => {
        if (player.isShooting) {
            console.log('ja esta atirando');
            return
        }
        player.isShooting = true;
        bullet.startMove(player.top);
    },
    //fiz um metodo para parar o shooting, quando eu preciso eu chamo ele.
    finishShoot: () => {
        player.isShooting = false;
    },
    moveUp: () => {
        if (player.top <= 0) {
            return
        }
        player.top -= 10;
        player.updatePosition();
    },
    moveDown: () => {
        if (player.top >= gameArea.height - player.height) {
            return
        }
        player.top += 10;
        player.updatePosition();
    },
    // view
    updatePosition: () => {
        player.html.style.top = player.top + 'px';
        player.html.style.left = player.left + 'px';
    }
}

// controler
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        console.log('move up');
        player.moveUp();
    } else if (event.key === 'ArrowDown') {
        console.log('move down');
        player.moveDown();
    } else if (event.key === ' ') {
        console.log('shoot');
        player.shoot();
    }
});

let bullet = {
    html: document.getElementById('bullet'),
    width: 20,
    height: 20,
    top: 0,
    left: 0,
    isMoving: false,
    //recebe o top do jogador
    startMove: (top) => {
        bullet.top = top;
        bullet.isMoving = true;
    },
    move: () => {
        if (!bullet.isMoving) {
            return
        }
        if (bullet.left >= gameArea.width) {
            bullet.isMoving = false;
            bullet.left = 0;
            bullet.updatePosition();
            player.finishShoot();
            return
        }
        console.log('bullet move');
        bullet.left += 10;
        bullet.updatePosition();
    },
    updatePosition: () => {
        if (bullet.isMoving) {
            bullet.html.style.display = 'block';
        } else {
            bullet.html.style.display = 'none';
        }
        bullet.html.style.top = bullet.top + 'px';
        bullet.html.style.left = bullet.left + 'px';
    }
}

let computer = {
    top: 0,
    right: 0,
    width: 100,
    height: 50,
    html: document.getElementById('computer'),
    startMove: (top) => {
        computer.top = top;
        computer.isMoving = true;
    },
    move: () => {
        if (!computer.isMoving) {
            let top = Math.floor(Math.random() * gameArea.height);
            computer.startMove(top);
        }
        if (computer.right >= gameArea.width) {
            computer.isMoving = false;
            computer.right = 0;
            computer.updatePosition();
            return
        }
        console.log('computer move');
        computer.right += 5;
        computer.updatePosition();
    },
    updatePosition: () =>{
        if (computer.isMoving){
            computer.html.style.top = computer.top + 'px';
            computer.html.style.right = computer.right + 'px';
        }
    }
}








//para o game se atualizar, normalmente jogo é 60 vezes por segundo
const gameLoop = () => {
    setInterval(() => {
        // computer.move();
        //aqui dentro eu vou atualizar a posicao do bullet
        //vou atualizar a posicao do computador, etc
        bullet.move();
    }, 1000 / 60); // 60fps
}






//quando fizer o move down para verificar a altura (client)
gameArea.start();
gameLoop();