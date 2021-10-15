# Dune Trivia Game Documentation
## by Donovan Gallaway

![Dune Poster](https://c4.wallpaperflare.com/wallpaper/996/743/625/pascal-blanche-dune-movie-dune-series-artwork-science-fiction-hd-wallpaper-preview.jpg)


## Introduction

I decided to go with a trivia game based on the novel *Dune*, in preparation for the upcoming Denis Villeneuve adaptation (in addition to the fact that I'm just a giant Dune nerd).

The strucutre of the app itself was put together mostly in jQuery, which was done specifically to open up the ability to add some animated and responsive pages such as a title screen and a brief introductory text, making it feel more like a JS game than a trivia game HTML page.

I also tried to use at least principles of how game design frameworks operate:

    1. My code initializes (init)
    2. The assets (data, images, animations) load (preload)
    3. The main game function is run with that data (draw)
    4. As the game continues, the screen is updated (update)

This kept my code flow neater (at least in my head) and helped everything make sense.

In terms of responsiveness, I wanted it to work pretty readily on both mobile and desktop browsers, so took care to use primarily responsive units in my CSS and lay out my game in such a way that was easy to see on both. There is a minimum of text and no in-line images used, so the site scales down very well in terms of size, though it looks a bit sparse on very high resolution desktops.

The win condition is when all questions pulled from the data have been asked. This was not a hardcoded number, in case more or fewer questions were to be asked.

## Technologies

- HTML
- CSS
- JS
- JQuery
- Headless CMS

## Challenges

#### Scoping

Due to the fact that I was initially unfamiliar with Ajax, I ran into a problem in laying out my functions, specifically in the scope of where the data was accessible.

However, I solved the problem by passing the data to my main game function, where it could then be referenced by lower-order functions:

```js
$.ajax(URL).then((data)=> {
    questionQueue(i, data)
    })
```

#### Mobile Responsiveness

The other problems I ran into were mostly in mobile responsiveness. While the main game worked great and was nicely responsive from initial design plans, I ran into some background image issues when trying to spruce it up.

In landscape mode, it was pretty easily solved with 

```css
@media screen and (orientation: landscape) and (max-width: 768px) {
    body {
        font-size: .8em;
        background-size: 100vw;
```

However, in portrait, the image wouldn't scale well and show my cool sandworm. So instead of trying to come up with functionality there, I simply included a note that the game was best viewed in landscape.

```js
    $('#title').append($('<p>').text('For best viewing experience, please rotate your phone').attr('id','portrait'))
```

```css
#portrait {
    display: none;
}

@media screen and (orientation: portrait) and (max-width: 768px) {

    #portrait{
        display: block;
    }

}
```

This way, the text is only in the event that the phone is in portrait mode and the user is using a small screen. So they rotate their phone and get the full experience.

#### Cool Array Trick

I also needed to empty out the array I used to store the questions that had been asked to avoid repeats, as there was a game-breaking bug for a moment before I spotted that the array was still full.

However, after a quick jump over to Stack Overflow, I found out that 
```js
exampleArray.length = 0
```
solves that one rather handily by emptying out the array entirely without having to reassign a constant variable.


### Areas for Improvement

The only thing I wasn't able to do was make animations smooth inside the game, so I decided to go with a cleaner, more straightforward game and leave the flashiness to the title screen.

Anything else is basically just additional functionality, i.e. single player, adding more questions, custom names. However, I'm quite pleased with the animations as well as the layout of the game itself.


<!-- #### Example Table

| Column1 | Column2 | Column3|
|---------|---------|--------|
| thing 1 | thing 2 | thing 3| -->