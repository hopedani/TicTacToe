/*
* Name:  Daniel Hope
* Assignment:  Assignment 1
* Date:  Jan. 23, 2017
* 
* Page Description: This page includes all variables and functions to allow 
* the Tic Tac Toe game to work.
* Files: index.html - source of the game board and message elements
*        style.css - source of the styles for the Tic Tac Toe environment
*/

// counter for number of wins X player has
var xWins = 0;

// counter for number of wins O player has
var oWins = 0;

// gets cell elements of table that makes up the game board
var board = document.getElementsByTagName("td");

/* when the 9 cells are initailized from 0-9(left to right and top to bottom),
 winSets var contains all possible win scenarios used to end game and assign
 a winner. */
var winSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]];

// initailizing player variable, gets value during resetGame function
var player;

// counter for number of empty spots on game board, when = 0 game will end
var empty = 9;

// allows game to contiune if false, game ends if true
var gameOver = false;

// initailize game, clearing cell values from HTML source
resetGame();

// hide "Player Go" message before first game and after game has finished
document.getElementById("hideMe").style.color = "white";

// hide starting player before first click
document.getElementById("player").innerHTML = "Start Game!";

// hide resetGame button for first game
document.getElementById("reset").style.display = "none";

/* Function resetGame() is called when user clicks on the "game reset" button
 Function clears board by setting all cells to nothing,
 randomize first player, changes and displays current player,
 resets the empty var to 9(total number of empty spaces on board),
 sets the gameOver var to false so that the game can be played again. */
function resetGame() {

    // clear all cells by assigning them an empty string and white background
    for ( i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
        board[i].style.backgroundColor = "white";
    }
    
    // randomize first player
    player = (Math.floor(Math.random() * 10) % 2 === 0) ? "O" : "X";
    
    // display current player
    document.getElementById("player").innerHTML = player;
    
    // show player instructions and game reset button, hidden before first click
    document.getElementById("hideMe").style.color = "black";
    
    // set current game status to active
    gameOver = false;
    
    // set number of empty cells to all (all 9 cells empty)
    empty = 9;
}

/* Function cellClicked() is called when the user clicks a play square(space) 
 * on the board.
 * Function decrements the empty var(# of empty spaces left on the board),
 * changes the content of the selected cell to the player's id(X or O), 
 * highlights selected cell, checks if player has won with this click,
 * toggle's the player from X to O, or O to X(depending who clicked) and 
 * displays which player goes next.
 */
function cellClicked(cell) {
    
    /* check if current cell is empty and game is still active, if so, change
      status of variables and run functions to display correct output */
    if (cell.innerHTML === "" && empty > 0 && gameOver === false) {
        
        // decrement number of available cells by one
        empty--;
        
        // set all cells to white background to reset last highlighted turn
        for ( i = 0; i < board.length; i++) {
            board[i].style.backgroundColor = "white";
        }
        
        // show player instructions, hidden before first click
        document.getElementById("hideMe").style.color = "black";
        
        // show reset button, hidden before first click
        document.getElementById("reset").style.display = "inline-block";
        
        // highlight current players selection until next click
        cell.style.backgroundColor = "rgba(0, 0, 255, 0.3";
        
        /* change display of current cell to reflect player name(id) who 
          clicked the cell */
        cell.innerHTML = player;
        
        // change color of font so it displays properly
        cell.style.color = "black";
        
        // run checkWin function to see if current click wins/ends game
        checkWin();    
        
        /* toggle player from X to O or vice versa(depending on who's currently
          selected as player) */
        player = (player === "X") ? "O" : "X";
        
        // display the player who's turn it is after this click
        document.getElementById("player").innerHTML = player;   
    }
}

/* Function checkWin() is called to verify if player has won, by checking all 
 * possible combinations of a win scenario.
 * Function ends game if win scenario has been reached, in case of a win 
 * scenario the winning player is displayed with a message that includes player
 * stats.  Increments winning player's stats. Hides "Player Go" message.
 * Highlights winning combonation with different color font.
 * Also ends game if a tie or stalemate has been reached and displays 
 * an informed message to user.
 */
function checkWin() {

    /* check all possible win scenarios and change variables to reflect the 
      current status of game (win/tie/game not over) */
    for ( i = 0; i < winSets.length; i++) {
        if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML 
            && board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML 
            && board[winSets[i][0]].innerHTML != "") {
        
            // change font color for winning combonation of cells
            board[winSets[i][0]].style.color = "red";
            board[winSets[i][1]].style.color = "red";
            board[winSets[i][2]].style.color = "red";
             
            // change game status to game over
            gameOver = true;
            
            // hide Player Go message after game has been won
            document.getElementById("hideMe").style.color = "white";
            
            // add win to player statistics
            (player === "X") ? xWins++ : oWins++;
            
            // display winning player's name with "Wins!"
            document.getElementById("winner").innerHTML = player + " Wins! "
            + "Current Win Count: X = " + xWins + " & O = " + oWins;
            
            /* run function to display message window for winning player/end of
              game */
            displayWin(true);
            
            // end loop
            break;
        }
    }
    
    /* check "empty" var for tie scenario(all cells selected with no winner) and
      current game status */
    if (empty === 0 && gameOver === false) {
        
        // change game status to game over
        gameOver = true;
        
        // hide Player Go message after game has finished
        document.getElementById("hideMe").style.color = "white";
        
        // display message to users describing tie scenario
        document.getElementById("winner").innerHTML = "No one wins!";
        
        // run function to display message window for tie scenario/end of game
        displayWin(true);
    }
}

// ==========================================================================
// DON'T TOUCH THESE LINES OF CODE  (we'll learn this stuff in a later lesson)
document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("message").addEventListener("click", function() {
    displayWin(false);
});
for ( i = 0; i < board.length; i++) {
    document.getElementsByTagName("td")[i].addEventListener("click", function() {
        cellClicked(this);
    });
}
// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and 
// displayWin(false) hides)
function displayWin(show) {
    if (show) {
        document.getElementById("message").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("message").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}

// ===============================================================