const rows = 6;
const columns = 7;
let board;
let playerRed = "red"
let playerYellow = "yellow"
let gameOver = false;
let currentPlayer = playerRed;

let currentColumns;

window.onload = function()
{
    setGame();
}

function setGame()
{
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];
    for(let x = 0; x < rows; x++)
    {
        let row = [];
        for(let y = 0; y < columns; y++)
        {
            row.push(" ");

            let tile = document.createElement('div');
            tile.id = x.toString() + "-" + y.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPlayer);
            document.getElementById('board').append(tile);
        }
        board.push(row);
    }
}

function setPlayer() 
{
    if (gameOver) 
    {
        return;
    }

    //get coords of that tile clicked
    let position = this.id.split("-");
    let r = parseInt(position[0]);
    let c = parseInt(position[1]);

    // figure out which row the current column should be on
    r = currentColumns[c]; 

    if (r < 0) 
    { // board[r][c] != ' '
        return;
    }

    board[r][c] = currentPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    
    if (currentPlayer == playerRed) 
    {
        tile.classList.add("red-disc");
        currentPlayer = playerYellow;
    }
    else 
    {
        tile.classList.add("yellow-disc");
        currentPlayer = playerRed;
    }

    r -= 1; //update the row height for that column
    currentColumns[c] = r; //update the array
}