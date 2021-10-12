# Project 1 Documentation
## by Donovan Gallaway


## Introduction

I decided to go with a trivia game based on the novel *Dune*, in preparation for the upcoming Denis Villeneuve adaptation (in addition to the fact that I'm just a giant Dune nerd).

The strucutre of the app itself was put together mostly in jQuery, which was done specifically to open up the ability to add some animated and responsive pages such as a title screen and a brief introductory text, making it feel more like a JS game than a trivia game HTML page.

In terms of responsiveness, I wanted it to work pretty readily on both mobile and desktop browsers, so took care to use primarily responsive units in my CSS and lay out my game in such a way that was easy to see on both. There is a minimum of text and no in-line images used, so the site scales down very well in terms of size, though it looks a bit sparse on very high resolution desktops.

## Technologies

- HTML
- CSS
- JS
- JQuery

## Challenges

#### Scoping

Due to the fact that I was initially unfamiliar with Ajax, I ran into a problem in laying out my functions, specifically in the scope of where the data was accessible.

However, I solved the problem by passing the data to my main game function, where it could then be referenced by lower-order functions:

```js
$.ajax(URL).then((data)=> {
    questionQueue(i, data)
    })
```


#### Areas for Improvement

I still need to find appropriate images, code the animations, and otherwise style the page. If I have enough time after that, I might try and use a game/animation library to add some spice to the animation/game states.


<!-- #### Example Table

| Column1 | Column2 | Column3|
|---------|---------|--------|
| thing 1 | thing 2 | thing 3| -->