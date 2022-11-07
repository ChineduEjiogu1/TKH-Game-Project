const rows = 6;
const columns = 7;
let board;
let playerRed = "red"
let playerYellow = "yellow"
let gameOver = false;
let currentPlayer = playerRed;

let currentColumns;

// window.onload = function()
// {
//     setGame();
// }

// function setGame()
// {
//     board = [];
//     currentColumns = [5, 5, 5, 5, 5, 5, 5];
//     for(let x = 0; x < rows; x++)
//     {
//         let row = [];
//         for(let y = 0; y < columns; y++)
//         {
//             row.push(" ");

//             let tile = document.createElement('div');
//             tile.id = x.toString() + ":" + y.toString();
//             tile.classList.add("tile");
//             tile.addEventListener("click", setPlayer);
//             document.getElementById('board').append(tile);
//         }
//         board.push(row);
//     }
// }

// function setPlayer() 
// {
//     if (gameOver) 
//     {
//         return;
//     }

//     //get coords of that tile clicked
//     let position = this.id.split(":");
//     let x = parseInt(position[0]);
//     let y = parseInt(position[1]);

//     // figure out which row the current column should be on
//     x = currentColumns[y]; 

//     if (x < 0) 
//     { // board[r][c] != ' '
//         return;
//     }

//     board[x][y] = currentPlayer; //update JS board
//     let tile = document.getElementById(x.toString() + ":" + y.toString());
    
//     if (currentPlayer == playerRed) 
//     {
//         tile.classList.add("red-disc");
//         currentPlayer = playerYellow;
//     }
//     else 
//     {
//         tile.classList.add("yellow-disc");
//         currentPlayer = playerRed;
//     }

//     x -= 1; //update the row height for that column
//     currentColumns[y] = x; //update the array

//     checkWinner();
// }

// function checkWinner()
// {
//     // horizontally
//     for (let x = 0; x < rows; x++)
//     {
//         for (let y = 0; y < columns - 3; y++)
//         {
//             if(board[x][y] != ' ')
//             {
//                 if(board[x][y] == board[x][y+1] && board[x][y+1] == board[x][y+2] && board[x][y+2] == board[x][y+3])
//                 {
//                     setWinner(x, y);
//                     return;
//                 }
//             }
//         }
//     }

//     // vertically
//     for (let y = 0; y < columns; y++)
//     {
//         for (let x = 0; x < rows - 3; x++)
//         {
//             if(board[x][y] != ' ')
//             {
//                 if (board[x][y] == board[x+1][y] && board[x+1][y] == board[x+2][y] && board[x+2][y] == board[x+3][y])
//                 {
//                     setWinner(x, y);
//                     return;
//                 }
//             } 
//         }
//     }

//     // diagonally downwards
//     for (let x = 0; x < rows - 3; x++)
//     {
//         for (let y = 0; y < columns - 3; y++)
//         {
//             if(board[x][y] != ' ')
//             {
//                 if(board[x][y] == board[x+1][y+1] && board[x+1][y+1] == board[x+2][y+2] && board[x+2][y+2] == board[x+3][y+3])
//                 {
//                     setWinner(x, y);
//                     return;
//                 }
//             }
//         }
//     }

//     // diagonally upwards 
//     for (let x = 3; x < rows; x++)
//     {
//         for (let y = 0; y < columns - 3; y++)
//         {
//             if (board[x][y] != ' ')
//             {
//                 if (board[x][y] == board[x-1][y+1] && board[x-1][y+1] == board[x-2][y+2] && board[x-2][y+2] == board[x-3][y+3])
//                 {
//                     setWinner(x, y);
//                     return;
//                 }
//             }
//         }
//     }
// }

// function setWinner(x, y)
// {
//     let winner = document.getElementById("winner");
//     if (board[x][y] == playerRed)
//     {
//         winner.innerHTML = "Red wins!";
//     }
//     else
//     {
//         winner.innerHTML = "Yellow wins!"
//     }

//     gameOver = true;
// }


window.onload = function()
{
    myGame.setGame();
}

class Connect4
{
    constructor(rows = 6, columns = 7)
    {
        this.playerRed = "red";
        this.playerYellow = "Yellow";

        // this.name = name;
        this.rows = rows;
        this.columns = columns;
        // this.setPlayer();
    }

    setPlayer()
    {
        if (gameOver) 
        {
            return;
        }

        //get coords of that tile clicked
        let position = this.id.split(":");
        console.log(position);
        let x = parseInt(position[0]);
        let y = parseInt(position[1]);

        // figure out which row the current column should be on
        x = currentColumns[y]; 

        if (x < 0) 
        {
            return;
        }

        board[x][y] = currentPlayer; //update JS board
        let tile = document.getElementById(x.toString() + ":" + y.toString());
        
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

        x -= 1; //update the row height for that column
        currentColumns[y] = x; //update the array

        // checkWinner();
        checkVertically();
        checkHorizontally();
        checkDiagonallyUpwards();
        checkDiagonallyDownwards();
    }

    setGame()
    {
        const rows = 6;
        const columns = 7;
        
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
                console.log(tile.id)
                tile.classList.add("tile");
                tile.addEventListener("click", this.setPlayer());
                document.getElementById('board').append(tile);
            }
            board.push(row);
        }
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

let myGame = new Connect4(6, 7);
// console.log(myGame);

// console.log(myGame.setGame());

// function playGame()
// {
//     while(!myGame.setWinner())
//     {
//         myGame.setPlayer();
//         myGame.setWinner();
//     }
// }