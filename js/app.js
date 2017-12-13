/*
 * Create a list that holds all of your cards
 */
var deck = ['fa-diamond', 'fa-diamond','fa-paper-plane-o', 'fa-paper-plane-o','fa-anchor', 'fa-anchor','fa-bolt', 'fa-bolt','fa-cube', 'fa-cube','fa-leaf', 'fa-leaf','fa-bicycle', 'fa-bicycle','fa-bomb', 'fa-bomb']

// variables for code
var openedCards = [];
var list = $('.card');
var images = $('.deck').find('i');
var moves = 0;
var matches = 0;
var timer = $('.timer');
var numStars = 3;
var restart = $('.restart');
var modal = $("#win-modal");
var playAgain = $(".play-again");
var seconds = 0;
var myInterval = null;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


//create board
function createBoard(){
    shuffle(deck);
    i = 0;
    images.each(function(){
        $(this).removeClass();
        $(this).addClass("fa " + deck[i]);
        i = i + 1;
    });
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//timer


function setUpTimer(){
    myInterval = setInterval(function(){
        seconds += 1;
        timer.text(seconds);
    }, 1000);
};

/*
 *functions with reset purpose
 */

//restarts game after winning
function newMatch(){
    resetGame();
    modal.css("display", "none");
};

//resets class so three stars appear
function resetStars(){
   $(".empty").each(function(){
    $(this).addClass("fa-star");
});
};

//main function for resetting game
function resetGame(){
    list.removeClass("match open show");
    createBoard();
    matches = 0;
    moves = 0;
    updateMove();
    resetStars();
    clearInterval(myInterval);
    seconds = 0;
    setUpTimer();
};

//checks if card is showing or not
function isValid(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
};


// functions used to modify game


//dispays modal after winning
function win (){
    modal.css("display", "block");
    $('.moves').text(moves);
    $('.num-stars').text(starCount);
    clearInterval(myInterval);
    timer.text(minutes + ':' + seconds);
};

//returns cards to initial state if they dont match
function resetCards(){
    var cards = $('.open');
    cards.removeClass("open show");
};

//changes card class to match if both cards are the same
function match(){
    var cards = $('.open')
    cards.removeClass();
    cards.addClass("card match");
    matches = matches + 1;
};

//compares both open cards to see if they match
function compareCards(array){
    if (openedCards[0].children().attr("class") === openedCards[1].children().attr("class")) {
        openedCards.pop();
        return true;
    } else {
        return false;
    };
};

//checks to see if the win function should run or not
function checkWin(){
    if (matches === 8){
        win();
    };
};

//updates number of moves on screen
function updateMove(){
    $('.moves').text(moves);
};

//checks to see what star rating there should be depending on moves
function checkStars(){
    var scorePanel = $('.stars');
    if (moves == 15){
        scorePanel.each(function (){
            $(this).find('i').first().removeClass("fa-star");
            $(this).find('i').first().addClass("empty");
        });
    };
    if(moves == 20){
        scorePanel.each(function(){
            $(this).find('i:eq(1)').removeClass("fa-star");
            $(this).find('i:eq(1)').addClass("empty");
        });
    };
    if (moves > 15 && moves < 20){
        starCount = 2;
    } else if(moves > 20){
        starCount = 1;
    } else{
        starCount = 3;
    };
};

// main function, runs game
function playGame(){
    setUpTimer();
    list.click(function(){
        if (isValid($(this)) == true){
            $(this).addClass("open show");//reveals cards
            openedCards.push($(this));
            if(openedCards.length === 2){
            if(compareCards(openedCards) === true){
                match();
                openedCards = [];
                moves += 1;
                checkStars();
                updateMove();
            } else {
                setTimeout(function(){
                    resetCards();
                    openedCards = [];
                }, 300);
                moves += 1;
                checkStars();
                updateMove();
            };
        };// end of openCards
        checkWin();
        }

    });
    restart.click(function(){
        resetGame();
    });
};

//event listeners and call functions

createBoard();
playGame();
playAgain.click(newMatch);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
