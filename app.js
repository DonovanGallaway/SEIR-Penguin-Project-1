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


const titleScreen = () => {
    $('#page').hide()
    $('body').css('background-image','url(https://www.desktopbackground.org/p/2015/04/24/937687_dune-wallpapers_1592x1000_h.jpg)')
    $('body').prepend($('<div>').attr('id', 'title'))
    $('#title').append($('<h1>').text('Welcome to Dune'))
    $('#title').append($('<h2>').text('The Trivia Game'))
    $('#title').append($('<p>').text('Click here to continue'))
    $('#title').on('click', () =>{
        $('body').css('background-image', 'url(https://cdna.artstation.com/p/assets/images/images/030/613/370/large/jorge-hardt-dune-desktop-wallpaper-hd.jpg?1601131509)')
        $('#title').remove()
        $('#page').show()
        mainGame()
    })


}

const mainGame = () => {
    // Grabs the trivia data
    // Note: due to the data being called as avariable inside "main game", this has to be inside "main game"
    $.ajax(URL).then((data)=> {
    console.log(data)
    let i = 0; // This i acts as an iterator through the various runs of the function without needing to have everything in a giant "for" loop
    questionQueue(i, data)
    })

const questionQueue = (index, data) => {
    $('#game').empty(); // Reset game state
    $('#score1').text(p1Score) //Update scores (0 for reset state)
    $('#score2').text(p2Score)

    // Text refers to the question text, while correct refers to the answer text
    const compareAnswers = (text, correct) => {
        $('#game').empty() //Displays the answer next, so emptying makes it cleaner
        if (text===correct){
             $('#game').append($('<h1>').text("Correct!").css('color','white').attr('id','truth'))
             if (p1Turn) {
                 scoreAdd(1)
             } else {
                 scoreAdd(2)
             }
         } else {
             $('#game').append($('<h1>').text("Wrong!").css('color','red').attr('id','truth'))
         }
         $('#game').append($('<p>').text('Click above to continue'))
         $('#game').append($('<h1>').text(data.items[index].fields.answerText).attr('id','answerText'))
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
    
    // Makes the question
    const $question = $('<h1>').text(data.items[index].fields.question).animate({opacity:1},5000)
    // Make an ul to put answers
    const $answers = $('<ul>')
    .append($('<li>').text(data.items[index].fields.a).attr('id','a'))
    .append($('<li>').text(data.items[index].fields.b).attr('id','b'))
    .append($('<li>').text(data.items[index].fields.c).attr('id','c'))
    .append($('<li>').text(data.items[index].fields.d).attr('id','d'))
    const corrAnswer = data.items[index].fields.answer
    // console.log(corrAnswer)
    $('#game').append($question).append($('<br>')).append($answers)

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

    
}
}



titleScreen()