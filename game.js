
//essa funcao me ajudda a transformar o tamanho que esta em CSS para o tamanho em JS. o comprimento e a altura fica o mesmo do css
const helperSetSize = (obj) => {
    obj.width = obj.html.clientWidth;
    obj.height = obj.html.clientHeight;
}

let score = 0
let helicopterDown = 0
let characterNotSaved = 0

let lifeScore = {
    html: document.getElementById('life-score'),
    value: 3,
    subtract: () => {
        lifeScore.value -= 1
        lifeScore.update()
    },
    add:() => {
        lifeScore.value += 1
        lifeScore.update()
    },
    initValue: () => {
        lifeScore.value = 3
        lifeScore.update()
    },
    update: () => {
        lifeScore.html.innerText = lifeScore.value
    }
}



// nunca se altera um objeto dentro de outro objeto, as propriedades.
let characterSaved = {
    html: document.getElementById('character-saved'),
    value: 0,
    addCharacter: () => {
        //a cada tres cowboys saved I wanna add a lifeScore
        //mod operator mod (reminder)
        characterSaved.value += 1
        if (characterSaved.value % 3 === 0){
            lifeScore.add()
        } 
        
        characterSaved.update()
    },
    update: () => {
        characterSaved.html.innerText = characterSaved.value
    }
}

let characterNotSaved = {
    html: document.getElementById(),
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
    positionY: 0,
    positionX: 0,
    width: null,
    height: null,
    isShooting: false,
    html: document.getElementById('player'),
    // start: () => {
    //     player.width = player.html.clientWidth;
    //     player.height = player.html.clientHeight;
    // }
    shoot: () => {
        if (isGameOver()) {
            return
        }
        if (player.isShooting) {
            console.log('ja esta atirando');
            return
        }
        player.isShooting = true;
        //vai sair do meio do jogador
        bullet.startMove(player.positionY + player.height / 2, player.positionX + player.width);
    },
    //fiz um metodo para parar o shooting, quando eu preciso eu chamo ele.
    finishShoot: () => {
        player.isShooting = false;
    },
    moveUp: () => {
        if (isGameOver()) {
            return
        }
        if (player.positionY <= 0) {
            return
        }
        player.positionY -= 20;
        player.updatePosition();
    },
    moveDown: () => {
        if (isGameOver()) {
            return
        }
        if (player.positionY >= gameArea.height - player.height) {
            return
        }
        player.positionY += 20;
        player.updatePosition();
    },
    // view
    updatePosition: () => {
        player.html.style.top = player.positionY + 'px';
        player.html.style.left = player.positionX + 'px';
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
    positionY: 0,
    positionX: 0,
    isMoving: false,
    //recebe o positionY do jogador
    startMove: (positionY, positionX) => {
        bullet.positionY = positionY;
        bullet.positionX = positionX;
        bullet.isMoving = true;
    },
    move: () => {
        if (!bullet.isMoving) {
            return
        }
        if (bullet.positionX >= gameArea.width) {
            bullet.isMoving = false;
            bullet.positionX = 0;
            bullet.updatePosition();
            player.finishShoot();
            return
        }
        bullet.positionX += 10;
        bullet.updatePosition();
    },
    stopMove: () => {
        bullet.isMoving = false;
        bullet.positionX = 0;
        player.finishShoot();
        bullet.updatePosition();
    },
    updatePosition: () => {
        if (bullet.isMoving) {
            bullet.html.style.display = 'block';
        } else {
            bullet.html.style.display = 'none';
        }
        bullet.html.style.top = bullet.positionY + 'px';
        bullet.html.style.left = bullet.positionX + 'px';
    }
}

let computer = {
    positionY: 0,
    positionX: 0,
    width: null,
    height: null,
    html: document.getElementById('computer'),
    isWaiting: false,
    startMove: (positionY) => {
        computer.positionY = positionY;
        computer.isMoving = true;
    },
    move: () => {
        if (!computer.isMoving && !computer.isWaiting) {
            computer.isWaiting = true;
            setTimeout(() => {
                computer.isWaiting = false;
                let positionY = Math.floor(Math.random() * (gameArea.height - computer.height - truck.height));
                computer.positionX = gameArea.width;
                computer.startMove(positionY);
            }, 2000);
        }
        if (computer.isMoving) {
            // se a posicao do computador for menor que 0 menos o computador, ou seja saindo da tela -1, -2,-3....
            if (computer.positionX <= 0 - computer.width) {
                computer.isMoving = false;
                //vai comecar no comprimento da area do jogo
                computer.positionX = gameArea.width;
                computer.updatePosition();
                return
            }
            computer.positionX -= 5;
            computer.updatePosition();
        }

    },
    stopMove: () => {
        computer.isMoving = false;
    },
    updatePosition: () => {
        if (computer.isMoving) {
            computer.html.style.top = computer.positionY + 'px';
            computer.html.style.left = computer.positionX + 'px';
        }
    }
}


let truck = {
    html: document.getElementById('truck'),
    width: null,
    height: null,
    // top
    positionY: 0,
    // left
    positionX: 0,
    isWaiting: false,
    isMoving: false,
    startMove: (positionY) => {
        truck.positionY = positionY;
        truck.isMoving = true;
    },
    move: () => {
        if (!truck.isMoving && !truck.isWaiting) {
            truck.isWaiting = true;
            setTimeout(() => {
                truck.isWaiting = false;
                let positionY = gameArea.height - truck.height
                truck.positionX = gameArea.width;
                truck.startMove(positionY);
            }, 2000);
        }
        if (truck.isMoving) {
            //o meu truck que vem do right (que é o tamanho maximo da minha tela). Se a posicao do meu truck for menor que o gamearea menos o comprimento de caminhao, quer dizer que ele saiu completamente da tela.
            //se a posicao do meu truck for menor que 0 menos o tamanho do meu truck
            if (truck.positionX <= 0 - truck.width) {
                truck.isMoving = false;
                truck.positionX = gameArea.width;
                truck.updatePosition();
                return
            }
            truck.positionX -= 4;
            truck.updatePosition();
        }
    },
    stopMove: () => {
        truck.isMoving = false;
    },
    updatePosition: () => {
        if (truck.isMoving) {
            truck.html.style.top = truck.positionY + 'px';
            truck.html.style.left = truck.positionX + 'px';
        }
    }
}


let character = {
    html: document.getElementById('character'),
    width: null,
    height: null,
    // top
    positionY: 0,
    // left
    positionX: 0,
    isWaiting: false,
    isMoving: false,
    startMove: (positionY) => {
        character.positionY = positionY;
        character.isMoving = true;
    },
    move: () => {
        if (!character.isMoving && !character.isWaiting) {
            character.isWaiting = true;
            setTimeout(() => {
                character.isWaiting = false;
                let positionY = gameArea.height - character.height;
                character.positionX = 0;
                character.startMove(positionY);
            }, 2000);
        }
        if (character.isMoving) {
            //character.positionX é a posicao do meu caracter
            if (character.positionX >= gameArea.width) {
                character.isMoving = false;
                character.positionX = 0;
                character.updatePosition();
                return
            }
            character.positionX += 1;
            character.updatePosition();
        }
    },
    stopMove: () => {
        character.isMoving = false;
    },
    updatePosition: () => {
        if (character.isMoving) {
            character.html.style.top = character.positionY + 'px';
            character.html.style.left = character.positionX + 'px';
        }
    }
}

// o bullet ja é um objeto global, entao nao preciso passar como parametro
let checkCollisionComputerBullet = () => {
    // Se a bolinha não estiver se movimentando => não tem change de haver colisão
    if (!bullet.isMoving || !computer.isMoving) {
        return
    }

    if (hasCollided(bullet, computer)) {
        computer.stopMove();
        bullet.stopMove();
        console.log('aumenta o número de helicópteros abatidos');
        helicopterDown += 1
    }
}

let checkCollisionPlayerComputer = () => {
    console.log('player', player.positionX, player.positionY)
    console.log('computer', computer.positionX, computer.positionY)
    if (computer.isMoving && hasCollided(player, computer)) {
        // player.stopMove();
        computer.stopMove();
        console.log('perdeu uma vida');
        lifeScore.subtract()
    }
}

let checkCollisionPlayerTruck = () => {
    if (truck.isMoving && hasCollided(player, truck)) {
        // player.stopMove();
        truck.stopMove();
        console.log('perdeu uma vida');
        // lifeScore.subtract()
    }
}

let checkCollisionPlayerCharacter = () => {
    if (character.isMoving && hasCollided(player, character)) {
        // player.stopMove();
        character.stopMove();
        console.log('aumenta o número de salvamentos realizados');
        characterSaved.addCharacter()
    }
}

//positionY left é meu padrao de distribuicao, mesmo eu tento usado bottom nos meus objetos?
let checkCollisionCharacterTruck = () => {

    if (truck.isMoving && hasCollided(character, truck)) {
        truck.stopMove();
        character.stopMove();
        console.log('aumenta o número de salvamentos não realizados');
        characterNotSaved = 0
    }
}

// a = who is on left; b = who is on right
const hasCollided = (a, b) => {
    if (
        a.positionX < b.positionX + b.width &&
        a.positionX + a.width > b.positionX &&
        a.positionY < b.positionY + b.height &&
        a.positionY + a.height > b.positionY
    ) {
        return true
    }
    return false
}

let stopTheGame = () => {
    bullet.stopMove();
    computer.stopMove();
    truck.stopMove();
    character.stopMove();

}

let isGameOver = () => {
    console.log(lifeScore.value)
    if (lifeScore.value <= 0) {
        console.log('Game Over')
        return true
    }
    return false
}


let scoreGame = () => {
    htmlLives = document.getElementById('lives')
    if (bullet.left + bullet.width >= gameArea.width - computer.right - computer.width) {
        // ta errado
        htmlLives.innerText = +1

    }
}


//para o game se atualizar, normalmente jogo é 60 vezes por segundo
const gameLoop = () => {
    setInterval(() => {
        if (isGameOver()) {
            stopTheGame();
            //return para ele nao continuar movimentando 
            return;
        }
        computer.move();
        truck.move()
        character.move()
        //aqui dentro eu vou atualizar a posicao do bullet
        //vou atualizar a posicao do computador, etc
        bullet.move();
        checkCollisionComputerBullet();
        checkCollisionCharacterTruck();
        checkCollisionPlayerComputer();
        checkCollisionPlayerCharacter();
        checkCollisionPlayerTruck();


    }, 1000 / 60); // 60fps
}



//quando fizer o move down para verificar a altura (client)
// gameArea.start();
helperSetSize(gameArea);
helperSetSize(player);
helperSetSize(computer);
helperSetSize(truck);
helperSetSize(character);
gameLoop();