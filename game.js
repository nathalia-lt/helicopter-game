
//essa funcao me ajudda a transformar o tamanho que esta em CSS para o tamanho em JS. o comprimento e a altura fica o mesmo do css
const helperSetSize = (obj) => {
    obj.width = obj.html.clientWidth;
    obj.height = obj.html.clientHeight;
}


// tenho que transformar meu player em objeto
//possui propriedades e metodos
//propriedades sao caracteristicas
//metodost sao funcoes que executam acoes e alteram as propriedades do proprio objeto
//controler: trazer a interacao do usuario para o meu programa
let gameArea = {
    width: null,
    height: null,
    html: document.getElementById('game-area'),
    // start: () => {
    //     helperSetSize(gameArea);
    // }
}

let player = {
    top: 0,
    left: 0,
    width: null,
    height: null,
    isShooting: false,
    html: document.getElementById('player'),
    // start: () => {
    //     player.width = player.html.clientWidth;
    //     player.height = player.html.clientHeight;
    // }
    shoot: () => {
        if (player.isShooting) {
            console.log('ja esta atirando');
            return
        }
        player.isShooting = true;
        //vai sair do meio do jogador
        bullet.startMove(player.top + player.height / 2, player.left + player.width);
    },
    //fiz um metodo para parar o shooting, quando eu preciso eu chamo ele.
    finishShoot: () => {
        player.isShooting = false;
    },
    moveUp: () => {
        if (player.top <= 0) {
            return
        }
        player.top -= 20;
        player.updatePosition();
    },
    moveDown: () => {
        if (player.top >= gameArea.height - player.height) {
            return
        }
        player.top += 20;
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
    width: null,
    height: null,
    top: 0,
    left: 0,
    isMoving: false,
    //recebe o top do jogador
    startMove: (top, left) => {
        bullet.top = top;
        bullet.left = left;
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
        bullet.left += 10;
        bullet.updatePosition();
    },
    stopMove: () => {
        bullet.isMoving = false;
        bullet.left = 0;
        player.finishShoot();
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
    width: null,
    height: null,
    html: document.getElementById('computer'),
    isWaiting: false,
    startMove: (top) => {
        computer.top = top;
        computer.isMoving = true;
    },
    move: () => {
        if (!computer.isMoving && !computer.isWaiting) {
            computer.isWaiting = true;
            setTimeout(() => {
                computer.isWaiting = false;
                let top = Math.floor(Math.random() * (gameArea.height - computer.height - truck.height));
                computer.right = 0;
                computer.startMove(top);
            }, 2000);
        }
        if (computer.isMoving) {
            if (computer.right >= gameArea.width) {
                computer.isMoving = false;
                computer.right = 0;
                computer.updatePosition();
                return
            }
            computer.right += 5;
            computer.updatePosition();
        }

    },
    stopMove: () => {
        computer.isMoving = false;
    },
    updatePosition: () => {
        if (computer.isMoving) {
            computer.html.style.top = computer.top + 'px';
            computer.html.style.right = computer.right + 'px';
        }
    }
}

//fazer o truck e a person

let truck = {
    html: document.getElementById('truck'),
    width: null,
    height: null,
    bottom: 0,
    left: 0,
}


let person = {
    html: document.getElementById('person'),
    width: null,
    height: null,
    bottom: 0,
    right: 0,
}

// o bullet ja é um objeto global, entao nao preciso passar como parametro
let checkCollisionComputerBullet = () => {
    // Se a bolinha não estiver se movimentando => não tem change de haver colisão
    if (!bullet.isMoving) {
        return
    }
    // (5) está entre (2) e (7)
    // 5 > 2 && 5 < 7

    // Se o (top da bolinha) estiver entre (o top do computador) e o (top do computador + a altura do computador) => tem change de haver colisão
    if ( 
        !((bullet.top > computer.top && 
        bullet.top < (computer.top + computer.height) )
        || 
        ((bullet.top + bullet.height) > computer.top && 
        (bullet.top + bullet.height) < (computer.top + computer.height))
    )){
        return
    }
    // Se o (left da bolinha + width da bolinha) for maior que o left do computador => colidiu
    if (bullet.left + bullet.width >= gameArea.width - computer.right - computer.width) {
        console.log('colidiu');
        computer.stopMove();
        bullet.stopMove();
    }

}




//para o game se atualizar, normalmente jogo é 60 vezes por segundo
const gameLoop = () => {
    setInterval(() => {
        computer.move();
        //aqui dentro eu vou atualizar a posicao do bullet
        //vou atualizar a posicao do computador, etc
        bullet.move();
        checkCollisionComputerBullet();
    }, 1000 / 60); // 60fps
}



//quando fizer o move down para verificar a altura (client)
// gameArea.start();
helperSetSize(gameArea);
helperSetSize(player);
helperSetSize(computer);
helperSetSize(truck);
helperSetSize(person);
gameLoop();