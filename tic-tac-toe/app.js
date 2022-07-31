const board = document.getElementById('board')

const gameState = {
    players: ['x', 'o'],
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
}

board.addEventListener('click', function(event){
    if (event.target.classList > 2) {

    } else {
        event.target.classList.add(gameState.players[0])
        let changePlayer = gameState.players.shift()
        gameState.players.push(changePlayer)
    }
    // run game check
})