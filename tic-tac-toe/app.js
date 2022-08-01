
const board = document.getElementById('board')

const restart = document.getElementsByClassName('restart')[0]

const submitBtn = document.getElementById('submitbtn')

const playerX = document.getElementById('playerXName')

const playerO = document.getElementById('playerOName')

const playXName = document.getElementById('playerX')

const playOName = document.getElementById('playerO')

const winMsg = document.getElementsByClassName('winSection')[0]

const gameState = {}

const menu = document.getElementsByTagName('menu')[0]

function resetInitialState() {
    winMsg.style.display = 'none'
    gameState.players = ['x', 'o']
    gameState.board = [
        ['u', 'u', 'u'],
        ['u', 'u', 'u'],
        ['u', 'u', 'u']
    ]
    board.addEventListener('click', click=function(event){
        let position = event.target.getAttribute('data-coordinates').split(',')
        const [y, x] = position
        if (event.target.classList.length > 1) {
            
        } else {
            event.target.classList.add(gameState.players[0])
            gameState.board[y][x] =  gameState.players[0]
            // run win check
            winCheck(position, gameState.players[0])
            let changePlayer = gameState.players.shift()
            gameState.players.push(changePlayer)
        }
        // run game check
        gameCheck()
    })
    welcome()
}

function welcome() {
    menu.style.display = 'block'
    submitBtn.addEventListener('click', function(event){
        event.preventDefault()
        gameState.playerXName = playerX.value;
        gameState.playerOName = playerO.value;
        playXName.innerText = `PlayerX: ${playerX.value}`
        playOName.innerText = `PlayerO: ${playerO.value}`
        menu.style.display = 'none'
    })
}

function clearHTMLboard() {
    const xElem = document.getElementsByClassName('x')
    console.log(xElem)
    const oElem = document.getElementsByClassName('o')
    console.log(oElem)
    for (let i = 0; i < xElem.length; i++) {
        xElem[i].classList.remove("x")
    }
    for (let b = 0; b < oElem.length; b++) {
        oElem[b].classList.remove("o")
    }
}


function gameCheck() {
    let nullPresent = 0;
    for(let i = 0; i <= 2; i++){
        for(let b = 0; b <= 2; b++){
            if(gameState.board[i][b] === 'u') {
                nullPresent++
            }
        }
    }
    if(nullPresent === 0){
        showRestart()
        winMsg.firstElementChild.innerText = `There has been a draw!`
        winMsg.style.display = 'block'
    }
}
restart.addEventListener('click', function(event){
    clearHTMLboard()
    clearHTMLboard()
    clearHTMLboard()
    clearHTMLboard()
    resetInitialState()
    restart.style.display = 'none'
})
function showRestart() {
    restart.style.display = 'block'
    board.removeEventListener('click', click);
}

function winCheck(position, player) {
    if(verticalCheck(position)[0] || horizontalCheck(position)[0] || diagCheck()[0]) {
        let winner = document.querySelector(`span[playername="${player}"]`)
        console.log(winner.innerText)
        winMsg.firstElementChild.innerText = `${winner.innerText} wins!`
        winMsg.style.display = 'block'
        showRestart()
    }

}



function verticalCheck(position) {
    const [y, x] = position
    if(gameState.board[0][x] === gameState.players[0] && gameState.board[1][x] === gameState.players[0] && gameState.board[2][x] === gameState.players[0]) {
        console.log('vertical win')
        return [true, 'vertical win']
    } else {
        return [false]
    }
}
function horizontalCheck(position) {
    const [y, x] = position
    if(gameState.board[y][0] === gameState.players[0] && gameState.board[y][1] === gameState.players[0] && gameState.board[y][2] === gameState.players[0]) {
        console.log('horizontal win')
        return [true, 'horizontal win']
    } else {
        return [false]
    }
}
function diagCheck() {
    if(gameState.board[0][0] === gameState.players[0] && gameState.board[1][1] === gameState.players[0] && gameState.board[2][2] === gameState.players[0]) {
        console.log('diagonal win')
        return [true, 'diagonal win']
    } else if(gameState.board[0][2] === gameState.players[0] && gameState.board[1][1] === gameState.players[0] && gameState.board[2][0] === gameState.players[0]) {
        console.log('diagonal win')
        return [true, 'diagonal win']
    } else {
        return [false]
    }
}

resetInitialState()
clearHTMLboard()