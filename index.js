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
            tile.id = x.toString() + ":" + y.toString();
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
    let position = this.id.split(":");
    let r = parseInt(position[0]);
    let c = parseInt(position[1]);

    // figure out which row the current column should be on
    r = currentColumns[c]; 

    if (r < 0) 
    { // board[r][c] != ' '
        return;
    }

    board[r][c] = currentPlayer; //update JS board
    let tile = document.getElementById(r.toString() + ":" + c.toString());
    
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

    checkWinner();
}

function checkWinner()
{
    // horizontally
    for (let x = 0; x < rows; x++)
    {
        for (let y = 0; y < columns - 3; y++)
        {
            if(board[x][y] != ' ')
            {
                if(board[x][y] == board[x][y+1] && board[x][y+1] == board[x][y+2] && board[x][y+2] == board[x][y+3])
                {
                    setWinner(x, y);
                    return;
                }
            }
        }
    }

    // vertically
    for (let y = 0; y < columns; y++)
    {
        for (let x = 0; x < rows - 3; x++)
        {
            if(board[x][y] != ' ')
            {
                if (board[x][y] == board[x+1][y] && board[x+1][y] == board[x+2][y] && board[x+2][y] == board[x+3][y])
                {
                    setWinner(x, y);
                    return;
                }
            } 
        }
    }

    // diagonally downwards
    for (let x = 0; x < rows - 3; x++)
    {
        for (let y = 0; y < columns - 3; y++)
        {
            if(board[x][y] != ' ')
            {
                if(board[x][y] == board[x+1][y+1] && board[x+1][y+1] == board[x+2][y+2] && board[x+2][y+2] == board[x+3][y+3])
                {
                    setWinner(x, y);
                    return;
                }
            }
        }
    }

    // diagonally upwards 
    for (let x = 3; x < rows; x++)
    {
        for (let y = 0; y < columns - 3; y++)
        {
            if (board[x][y] != ' ')
            {
                if (board[x][y] == board[x-1][y+1] && board[x-1][y+1] == board[x-2][y+2] && board[x-2][y+2] == board[x-3][y+3])
                {
                    setWinner(x, y);
                    return;
                }
            }
        }
    }
}

function setWinner(x, y)
{
    let winner = document.getElementById("winner");
    if (board[x][y] == playerRed)
    {
        winner.innerHTML = "Red wins!";
    }
    else
    {
        winner.innerHTML = "Yellow wins!"
    }

    gameOver = true;
}


class Connect4
{
    constructor(name)
    {
        this.name = name;
    }

    setGame()
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
                tile.id = x.toString() + ":" + y.toString();
                tile.classList.add("tile");
                tile.addEventListener("click", setPlayer);
                document.getElementById('board').append(tile);
            }
            board.push(row);
        }
    }

    setPlayer()
    {
        if (gameOver) 
        {
            return;
        }

        //get coords of that tile clicked
        let position = this.id.split(":");
        let r = parseInt(position[0]);
        let c = parseInt(position[1]);

        // figure out which row the current column should be on
        r = currentColumns[c]; 

        if (r < 0) 
        { // board[r][c] != ' '
            return;
        }

        board[r][c] = currentPlayer; //update JS board
        let tile = document.getElementById(r.toString() + ":" + c.toString());
        
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

        // checkWinner();
        checkVertically();
        checkHorizontally();
        checkDiagonallyUpwards();
        checkDiagonallyDownwards();
    }

    checkVertically()
    {
        for (let y = 0; y < columns; y++)
        {
            for (let x = 0; x < rows - 3; x++)
            {
                if(board[x][y] != ' ')
                {
                    if (board[x][y] == board[x+1][y] && board[x+1][y] == board[x+2][y] && board[x+2][y] == board[x+3][y])
                    {
                        setWinner(x, y);
                        return;
                    }
                } 
            }
        }
    }

    checkHorizontally()
    {
        for (let x = 0; x < rows; x++)
        {
            for (let y = 0; y < columns - 3; y++)
            {
                if(board[x][y] != ' ')
                {
                    if(board[x][y] == board[x][y+1] && board[x][y+1] == board[x][y+2] && board[x][y+2] == board[x][y+3])
                    {
                        setWinner(x, y);
                        return;
                    }
                }
            }
        }
    }

    checkDiagonallyUpwards()
    {
        for (let x = 3; x < rows; x++)
        {
            for (let y = 0; y < columns - 3; y++)
            {
                if (board[x][y] != ' ')
                {
                    if (board[x][y] == board[x-1][y+1] && board[x-1][y+1] == board[x-2][y+2] && board[x-2][y+2] == board[x-3][y+3])
                    {
                        setWinner(x, y);
                        return;
                    }
                }
            }
        }
    }

    checkDiagonallyDownwards()
    {
        for (let x = 0; x < rows - 3; x++)
        {
            for (let y = 0; y < columns - 3; y++)
            {
                if(board[x][y] != ' ')
                {
                    if(board[x][y] == board[x+1][y+1] && board[x+1][y+1] == board[x+2][y+2] && board[x+2][y+2] == board[x+3][y+3])
                    {
                        setWinner(x, y);
                        return;
                    }
                }
            }
        }
    }

    setWinner(x, y)
    {
        let winner = document.getElementById("winner");
        if (board[x][y] == playerRed)
        {
            winner.innerHTML = "Red wins!";
        }
        else
        {
            winner.innerHTML = "Yellow wins!"
        }

        gameOver = true;
    }
}