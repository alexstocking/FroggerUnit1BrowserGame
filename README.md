# Project 1 - Frogger - Browser Game

## My Portfolio Website

https://alexstocking.netlify.app/

## Description

Our first project was a chance to show what we had learnt about using HTML, CSS and JavaScript to create a browser game. A lot of the focus was on creating JS functions and manipulating the DOM to dynamically add elements to the browser game. I also tried to ensure there was a consistent theme using CSS. I decided to recreate the classic game Frogger, deciding early on I wanted to try to create different difficulties and board sizes.


## Deployment link

https://alexstocking.github.io/FroggerUnit1BrowserGame/FroggerUnit1BrowserGame/

## Getting Started/Code Installation

The code for my project can be found at https://github.com/alexstocking/FroggerUnit1BrowserGame/tree/main/FroggerUnit1BrowserGame


## Timeframe & Working Team (Solo/Pair/Group)

I had a week to complete the project from start to finish, although we prepared by creating other simpler games as a class. We were encouraged to start as early as possible. The project took me around 5 days to complete, starting on Saturday, finishing on Thursday with me debugging a few glitches on the following day. I worked independently, with some support initially from my instructor.


## Technologies Used

I used HTML, CSS and JavaScript to create my project, as well as Git Bash and GitHub to deploy the project online. 


## Brief

The idea of Frogger is to guide a family of frogs across a road, and a river to their homes at the top of the screen.

To make things more challenging there are numerous moving obstacles that the frogs must avoid to reach their destination.

### Resources

* [Frogger arcade game - Youtube](https://www.youtube.com/watch?v=l9fO-YuWPSk)
* [Frogger - Wikipedia](https://en.wikipedia.org/wiki/Frogger)

### Requirements

* The game should be playable for one player.
* The obstacles should be auto generated.

### Suggested enhancements

* Different difficulty levels.
* Auto generated boards.
* Two player mode on the same computer: players take turns the first to lose more lives across a whole game loses.
* High score board with `localStorage`

### Challenges

The main difficulty here is animating the obstacles and detecting collision. There will be a number of timers to manage across the whole game, which can be easily get out of hand.

### Your App Must:
☐ Render a game in the browser.
☐ Include win/loss logic and render win/loss messages in HTML. Popup alerts using the alert() method are okay during development, but not production.
☐ Include separate HTML, CSS & JavaScript files.
☐ Use vanilla JavaScript, not jQuery.
☐ Have properly indented HTML, CSS & JavaScript. In addition, vertical whitespace needs to be consistent.
☐ No remaining unused and/or commented out code (code that will never be called) .
☐ Have functions and variables that are named sensibly. Remember, functions are typically named as verbs and variables (data) named as nouns.
☐ Be coded in a consistent manner. For example, choose between your preference for function declarations vs. function expressions.
☐ Be deployed online using GitHub Pages so that the rest of the world can play your game!


## Planning

My plan can be found at this link: https://docs.google.com/document/d/1WaVYEm7kBITXbL6S5SKKiJ4jTPffclKSSLNx-V3tKdM/edit

I decided to split the plan into my HTML, CSS and JS elements, looking at what functions I would need etc. I also researched Frogger as a game, looking at a wide variety of versions of the game, from very basic to released games. I gave myself an afternoon to complete this.


## Build/Code Process

My build process started very simple, and gradually became more complicated as the scope of my project expanded. I will split it into days for ease of tracking the progress.

### Day 1 (Saturday):
I initially created the Frogger homepage, with some simple CSS styling on the body, with instructions on how to play the game and three buttons displayed (easy, medium and hard). I made sure the layout was how I wanted it and decided that I would add more styling later. I had decided I would start by building the easy board first, and then expand from there. I made the board using HTML divs and tried to make it so it didn’t need to be dynamically generated. 

### Day 2 (Monday):
I very quickly realised that creating the board as HTML divs from the start would lead to more problems down the line, particularly when I wanted to expand the boards. This meant scrapping the easy divs and creating a function to dynamically create a grid when you pressed the easy button. I also figured out how to use the display css property to my advantage, removing the home screen when the board was loaded. I added classes to each row of the board based on where it was (river, road, grass etc) using an if conditional in my init easy function. I decided then to use classes as the main way to code my game. 

I found assets for my frog and obstacles, added them to my assets folder, and got them all on the board dynamically when the easy button was pressed, based on the index number of the grid squares of my board. Effectively, if the square was added the class of frog to it, the frog would appear, the same for the cars, trucks, logs and lilypads. I spent most of the afternoon creating the functions for the obstacles moving, and initially these were all individual functions with let variables for each obstacle’s starting position. I added player driven movement to the frog class, using W, A, S and D to move the frog, as well as adding conditionals to my function to stop the frog going off the edge. I managed to get a collision function working at a basic level, where if the frog moved into a specific space, he would reset back to the start. However there were some problems where the frog would collide with the obstacles starting position only, rather than where the vehicles were moving.

    function initEasyGrid() {
        boardHolder.removeChild(mediumBoard)
        boardHolder.removeChild(hardBoard)
        width = 13
        height = 7
        cellCount = width * height
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div')
            cell.setAttribute('data-index', i)
            if (i >= 0 && i <= 12) {
                cell.classList.add('grassEnd')
            } else if (i>= 13 && i <= 38) {
                cell.classList.add('river')
            } else if (i >= 39 && i <= 51) {
                cell.classList.add('grassMiddle')
            } else if (i >= 52 && i <= 77) {
                cell.classList.add('road')
            } else if (i >= 77 && i <= 90) {
                cell.classList.add('grassStart')
            }
            easyBoard.appendChild(cell)
            cells.push(cell)
            // cells[startPosition].classList.add('frog')
           
        }
        addFrog(startPosition)
    }

### Day 3 (Tuesday):
I started the day by fixing and debugging my collision function. It was working, and I used what I had learnt to create a function where the frog would inherit the logs or lilypads movement when they collided to mimic how the actual game works.

    function frogOnLogOrLily() {
        const frogCell = cells[currentPosition];
        if (frogCell.classList.contains('log')) {
            removeFrog()
            currentPosition--
            addFrog(currentPosition)
        } else if (frogCell.classList.contains('lily')) {
            removeFrog()
            currentPosition++
            addFrog(currentPosition)
        }
    }


I added a level and life counter function. A game over screen appears when you run out of lives and a next level button would pop up when you reached the end of that level. When pressed this would reset the frog to its starting position and speed up the intervals of the obstacles, making it harder. I decided at this point to change the board buttons to small, medium and hard, adding harder and harder levels to each level, increasing the scope of my project. I had problems with the reset button, as the game would continue running in the background, and not every element was resetting properly, leading to glitches and bugs when starting the game again. I rectified this by replacing my reset function with just a function that reloads the page when the back to main menu button is pressed, thus returning the game to its initial state. At this point, I was happy with how the small board worked and decided to come back to it later to add any additional styling.

I then turned my focus to the medium board, and ran into some problems with the obstacles. There were still far too many functions for the moving of the obstacles, with each individual obstacle having its own starting variable and specific function guiding its movement. Speaking to my instructor, they gave me the advice that refactoring my code might help this. I changed all of the obstacle starting variables into arrays, meaning I could expand on them as I added more, and changed the individual functions into for loops that would iterate through the array, reducing my code drastically, I ran into a problem with creating a second board, as it would place both boards side by side, hiding one, but meaning that one board was squashed into half the screen. I got around this by removing the unneeded divs when clicking a board size (eg. the medium and large board divs would be completely removed from the HTML when the small button was pressed). This also meant how I reset the game was useful, because it readded all of the removed divs every time the player would return to the main menu.

    function nextLevel() {
        removeFrog()
        currentPosition = startPosition;
        addFrog(currentPosition)
        winner = 0
        nextLevelBtn.classList.add('hidden');
        vehicleIntervalTime -= 100
        riverIntervalTime -= 100
        vehicleIntervalTimeM -= 100
        riverIntervalTimeM -= 100
        vehicleIntervalTimeH -= 100
        riverIntervalTimeH -= 100
        clearInterval(vehicleInterval)
        clearInterval(riverInterval)
        if (boardHolder.classList.contains('easyboardgen')) {
        vehicleInterval = setInterval(updateVehiclePositionsEasy, vehicleIntervalTime)
        riverInterval = setInterval(updateRiverPositionsEasy, riverIntervalTime)
        } else if (boardHolder.classList.contains('mediumboardgen')) {
            vehicleInterval = setInterval(updateVehiclePositionsMedium, vehicleIntervalTimeM)
            riverInterval = setInterval(updateRiverPositionsMedium, riverIntervalTimeM)
        } else if (boardHolder.classList.contains('hardboardgen')) {
            vehicleInterval = setInterval(updateVehiclePositionsHard, vehicleIntervalTimeH)
            riverInterval = setInterval(updateRiverPositionsHard, riverIntervalTimeH)
          }
        level++
        updateLevelCounter()
        enableMovement()
        title.textContent = 'FROGGER'
        title.style.color = 'green'
    }
    
    
    function rtnMenu() {
        location.reload()
    }

### Day 4 (Wednesday):
I spent most of the day adding the functions for dynamically creating the medium board, adding additional obstacles, and deciding on different starting speeds for the different board sizes. I also added classes to a lot of the differing HTML elements between the two boards (easyboard, medium board, hardboard etc.) that would ensure only the correct obstacles were loaded at the right time. I decided to create an array for each row of obstacles, so it would be easier to decide the movement direction of that row, and I wouldn’t be limited to only have obstacles on set rows as the board got bigger. 

I also added a “game won” screen when the player reached the end of level 10, as well as adding functions to restrict movement during this and the game over screens. Before moving onto the hard board, I restructured my code to try to make it more easily readable, and refactored some more functions as it was nearing 1000 lines of code at this point.

    function winLevel() {
        if (winner === 0) {
            if (level <= 9) {
                winner = 1;
                title.textContent = "Level Complete!"
                title.style.color = "teal"
                levelup.play()
                nextLevelBtn.classList.remove('hidden');
            }
        }
            if (level > 9) {
                title.textContent = "Board Complete!"
                title.style.color = "teal"
                nextLevelBtn.classList.add('hidden')
                setTimeout(rtnMenu, 6500)
                boardClear.play()
        }
        disableMovement()
    }
 

### Day 5 (Thursday):
Having figured out a lot of the difficulties of creating a new board with the medium sized board, the largest board was a lot easier to create, and only took me around an hour to do, with me running into no bugs or glitches that I had done with the medium board. I then added a retro font to the text and decided to give the rest of the game a more retro feel, similar to a retro arcade game. I added background music that the player can turn on and off. I attached sounds to each of the movements of the frog (jumping, collision, resetting, winning the round etc.) and jingles for completing a level, completing the whole board and the game over screen. I also debugged some of the bugs I had discovered with some collision issues on my logs and lilypads.



## Challenges

My first challenge was realising I would need to dynamically create the board, this meant a lot of the work I had already put in had to be scrapped and I had to start again with how I planned out the HTML grid that I would create.

The largest challenge I faced was expanding the board and creating multiple sized boards within one browser game. This was lots of different problems, some small, some large that I had to work through at the same time. Like I described above, it took me most of a day to work through a lot of the problems that this was causing and identifying how obstacles and my frog would have different starting positions, and the effect that had on my current functions and arrays. 

I think the individual challenge that took me the longest to work through was refactoring a large amount of code and figuring out how this would help me expand the scope of my game. I believe it could still be improved upon, with my way of refactoring not being the most elegant solution, however I learnt a lot to take into future projects.



## Wins

My biggest wins involved a lot of the challenges above. I was very proud that, for the most part,  I independently worked through these problems and found solutions, either through my own ideas or resources online to push me in the right direction. As the project progressed I was able to more quickly identify what was going wrong in a specific scenario and navigate my way to the function that wasn’t working properly.  I believe I thought like an actual developer more and more as I progressed through the week.

Function wise I was really proud of my function that allowed the frog to inherit the movement of the individual obstacles, and this was the function I was asked most about when I presented my game to the class.

Finally, I've never really identified myself as creative, but I was pleased with the overall styling of the game, and spent time carefully picking css styling and audio to try to make it look more professional.

## Key Learnings/Takeaways

The importance of manipulating the DOM and dynamically generating elements with a project. This gave me more control over what I wanted the player to see and be able to interact with. 
That HTML classes and IDs can be used in many different ways, and is especially helpful and differentiating between similar aspects of a project (eg. in frogger to differentiate elements between the different board sizes).
The importance of collaboration. Whilst this project was independent, various resources online were very helpful in understanding how a function works, or using an element I hadn’t seen before. It is important to always be learning when working through a project.


## Bugs

On the larger board, in the final row of lily pads and logs, frogger inherits the wrong direction of movement when jumping on a lilypad. This is because it is the only row that has both logs and lilypads on, and the only row where lilypads move in that direction.


## Future Improvements

For future improvements, I would like to work on refactoring my code further, to make it more readable by other developers. I would also want to continue adding to the styling to make it look more professional.




