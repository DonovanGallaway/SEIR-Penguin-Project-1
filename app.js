// Contentful site hosting the trivia qs
const URL = "https://cdn.contentful.com/spaces/5o940t3dtq1j/environments/master/entries?access_token=-0DOA4rCTbI7F2rOP4wjBuJveqEqrU9mHULCJ3tUg8M&content_type=triviaQuestion"


const mainGame = () => {
    $('#game').empty();
    $.ajax(URL).then((data)=> {
        console.log(data)
        let i = 0;
        questionQueue(i, data)
    })
}

const questionQueue = (index, data) => {
    
    const compareAnswers = (text, correct) => {
        $('#game').empty() 
        if (text===correct){
             $('#game').append($('<h1>').text("Correct!").css('color','green'))
         } else {
             $('#game').append($('<h1>').text("Wrong!").css('color','red'))
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

}


mainGame()