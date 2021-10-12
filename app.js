// Contentful site hosting the trivia qs
const URL = "https://cdn.contentful.com/spaces/5o940t3dtq1j/environments/master/entries?access_token=-0DOA4rCTbI7F2rOP4wjBuJveqEqrU9mHULCJ3tUg8M&content_type=triviaQuestion"


// Setting the score as a global variable so it can be acessed by any needed functions
let p1Score = 0;
let p2Score = 0;
let p1Turn = true;

// Score add function to save a bit of clarity
const scoreAdd = (player) => {
    if (player === 1) {
        p1Score++
        p1Turn = false;
        $('#score1').text(p1Score)
    }
    if (player === 2) {
        p2Score++
        p1Turn = true;
        $('#score2').text(p2Score)
    }
}


// Set up the game. I did this in a function instead of a variable because I intended to add a title screen as a separate function, but due to the nature of the promise call I may end up just making this a global thing and putting the title screen as a function inside this whole "Main Game"

// This not only makes for slightly drier code, but also gives me an easy way to start the game when I want
// Note: due to the data being called as avariable inside "main game", this has to be inside "main game", which is another argument for making the promise request globally accessible.
const questionQueue = (index, data) => {
    $('#game').empty(); // Reset game state
    $('#score1').text(p1Score) //Update scores (0 for reset state)
    $('#score2').text(p2Score)

    // Text refers to the question text, while correct refers to the answer text
    const compareAnswers = (text, correct) => {
        $('#game').empty() //Displays the answer next, so emptying makes it cleaner
        if (text===correct){
             $('#game').append($('<h1>').text("Correct!").css('color','green').attr('id','truth'))
             if (p1Turn) {
                 scoreAdd(1)
             } else {
                 scoreAdd(2)
             }
         } else {
             $('#game').append($('<h1>').text("Wrong!").css('color','red').attr('id','truth'))
         }
         $('#game').append($('<p>').text('Click above to continue'))
         $('#game').append($('<h3>').text(data.items[index].fields.answerText))
        //  console.log(data.items.length)
        //  console.log(index)
        // This if statement effectively iterates through the questions as long as a question exists. If it doesn't, we tally up the score
         if (data.items[index+1]){
             $('#truth').on('click', () => {
                console.log('clicked')
                questionQueue(index+1, data) 
             })
         }
         else {
            $('#truth').on('click', gameOver)
         }
    }
    
    // Makes the question
    const $question = $('<h2>').text(data.items[index].fields.question)
    // Make an ul to put answers
    const $answers = $('<ul>')
    .append($('<li>').text(data.items[index].fields.a).attr('id','a'))
    .append($('<li>').text(data.items[index].fields.b).attr('id','b'))
    .append($('<li>').text(data.items[index].fields.c).attr('id','c'))
    .append($('<li>').text(data.items[index].fields.d).attr('id','d'))
    const corrAnswer = data.items[index].fields.answer
    // console.log(corrAnswer)
    $('#game').append($question).append($answers)

    // Add on-click function for answers. The compareAnswers function also resets game state
    $('#a').on('click', () => {
        compareAnswers($('#a').text(), corrAnswer)
    })
    $('#b').on('click', () => {
        compareAnswers($('#b').text(), corrAnswer)
    })
    $('#c').on('click', () => {
        compareAnswers($('#c').text(), corrAnswer)
    })
    $('#d').on('click', () => {
        compareAnswers($('#d').text(), corrAnswer)
    })
    const gameOver = () => {
        // Originally had this empty out the whole body and try to reset that way, but that killed the divs I had hard-coded into html, so I added some stuff to empty out so the game could be reset.
        $('#game').empty()
        $('#game').append($('<h1>').text("Well done!"))
        if (p1Score > p2Score) {
            $('#result').append($('<h2>').text("Player 1 Wins!"))
        } else if (p1Score < p2Score) {
            $('#result').append($('<h2>').text("Player 2 Wins!"))
        } else if (p1Score === p2Score) {
            $('#result').append($('<h2>').text("A Draw!"))
        }
        $('#result').append($('<h4>').text('Click here to play again').addClass('reset'))
        // Reset the invisible game state
        p1Score = 0;
        p2Score = 0;
        p1Turn = true;
        // On click, visually reset game state
        $('.reset').on('click', ()=>{
            $('#game').empty()
            $('#result').empty()
            questionQueue(0,data)
        })
    }
    
}
// Grabs the trivia data
$.ajax(URL).then((data)=> {
    console.log(data)
    let i = 0; // This i acts as an iterator through the various runs of the function without needing to have everything in a giant "for" loop
    questionQueue(i, data)
    })