// Contentful site hosting the trivia qs
const URL = "https://cdn.contentful.com/spaces/5o940t3dtq1j/environments/master/entries?access_token=-0DOA4rCTbI7F2rOP4wjBuJveqEqrU9mHULCJ3tUg8M&content_type=triviaQuestion"

let p1Score = 0;
let p2Score = 0;
let p1Turn = true;

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



const mainGame = () => {
    $.ajax(URL).then((data)=> {
        console.log(data)
        let i = 0;
        questionQueue(i, data)
    })
}

const questionQueue = (index, data) => {
    $('#game').empty();
    $('#score1').text(p1Score)
    $('#score2').text(p2Score)

    const compareAnswers = (text, correct) => {
        $('#game').empty() 
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
         console.log(data.items.length)
         console.log(index)
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
    console.log(corrAnswer)
    $('#game').append($question).append($answers)

    // Add on-click function for answers
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
        p1Score = 0;
        p2Score = 0;
        p1Turn = true;
        $('.reset').on('click', ()=>{
            $('#game').empty()
            $('#result').empty()
            questionQueue(0,data)
        })
    }
    
}


const gameOver = () => {
    $('body').empty()
    $('body').append($('<h1>').text("Well done!"))
    if (p1Score > p2Score) {
        $('body').append($('<h2>').text("Player 1 Wins!"))
    } else if (p1Score < p2Score) {
        $('body').append($('<h2>').text("Player 2 Wins!"))
    } else if (p1Score === p2Score) {
        $('body').append($('<h2>').text("A Draw!"))
    }
    $('body').append($('<h4>').text('Click anywhere to play again'))
    p1Score = 0;
    p2Score = 0;
    p1Turn = true;
    $('body').on('click', ()=>{
        $('body').empty()
        questionQueue(0,data)
    })
}


mainGame()