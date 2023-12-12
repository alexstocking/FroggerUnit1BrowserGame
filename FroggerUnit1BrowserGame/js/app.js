// CACHED ELEMENTS //
const mainMenu = document.querySelector('#main-container')
const boardHolder = document.querySelector('#board')
const title = document.querySelector('#title')
const lifeCounter = document.querySelector('#lifeCounter')
const levelCounter = document.querySelector('#levelCounter')
const easyBtn = document.querySelector('#easybtn')

const mediumBtn = document.querySelector('#mediumbtn')

const road = document.querySelectorAll('.road')
const river = document.querySelectorAll('.river')
const grassStart = document.querySelectorAll('.grassStart')
const grassMiddle = document.querySelectorAll('.grassMiddle')
const grassEnd = document.querySelectorAll('.grassEnd')

const mainMenuBtn = document.querySelector('#mainMenu')
const nextLevelBtn = document.querySelector('#nextlevel')


// EVENT LISTENERS //
easyBtn.addEventListener('click', initEasy)
mediumBtn.addEventListener('click', initMedium)
mainMenuBtn.addEventListener('click', rtnMenu)
nextLevelBtn.addEventListener('click', nextLevel)
document.addEventListener('keydown', handleMovement)


// BOARD CONFIG AND CREATION //
let easyBoard = document.querySelector('#easyboard')
let mediumBoard = document.querySelector('#mediumboard')
let width;
let height;
let cellCount = width * height
let cells = []
let startPosition = 0
let currentPosition = startPosition;
let livesDisplay = document.querySelector('#lives')
let lives;
let level;
let winner = 0;
let vehicleInterval;
let riverInterval;
let vehicleIntervalTime = 1500
let riverIntervalTime = 1200
let levelDisplay = document.querySelector('#level')

function initEasyGrid() {
    boardHolder.removeChild(mediumBoard)
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

function initMediumGrid() {
    boardHolder.removeChild(easyBoard)
    width = 15
    height = 9
    cellCount = width * height
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('data-index', i)
        if (i >= 0 && i <= 14) {
            cell.classList.add('grassEnd')
        } else if (i>= 14 && i <= 59) {
            cell.classList.add('river')
        } else if (i >= 60 && i <= 74) {
            cell.classList.add('grassMiddle')
        } else if (i >= 75 && i <= 119) {
            cell.classList.add('road')
        } else if (i >= 119 && i <= 134) {
            cell.classList.add('grassStart')
        } 
        mediumBoard.appendChild(cell)
        cells.push(cell)
        // cells[startPosition].classList.add('frog')
        
    }
    addFrog(startPosition)
}

function addVehicles() {
    addRedCar(currentPositionRedCar)
    addYellowCar(currentPositionYellowCar)
    addRedCar(currentPositionRedCarTwo)
    addTrucks(currentPositionTruckOne, currentPositionTruckTwo)
    addTrucks(currentPositionTruckThree, currentPositionTruckFour)
    addTrucks(currentPositionTruckFive, currentPositionTruckSix)
}

function addRiverFeatures() {
    addLogs(positionLogOne, positionLogTwo, positionLogThree)
    addLogs(positionLogFour, positionLogFive, positionLogSix)
    addLilyPads(positionLilyOne, positionLilyTwo)
    addLilyPads(positionLilyThree, positionLilyFour)
    addLilyPads(positionLilyFive, positionLilySix)
}

function addFrog(position) {
    cells[position].classList.add('frog')
}

function removeFrog() {
    cells[currentPosition].classList.remove('frog')
}

function addRedCar(position) {
    cells[position].classList.add('carOne')
}

function addYellowCar(position) {
    cells[position].classList.add('carTwo')
}

function addTrucks(positionOne, positionTwo) {
    cells[positionOne].classList.add('truckOne')
    cells[positionTwo].classList.add('truckTwo')
}

function addLogs(positionOne, positionTwo, positionThree) {
    cells[positionOne].classList.add('log')
    cells[positionTwo].classList.add('log')
    cells[positionThree].classList.add('log')
}

function addLilyPads(positionOne, positionTwo) {
    cells[positionOne].classList.add('lily')
    cells[positionTwo].classList.add('lily')
}

// FUNCTIONS FOR STARTING AND CONTROLS //

function initEasy() {
    startPosition = 84
    currentPosition = startPosition;
    hideMainMenu()
    newGameOrMenuEasy()
    lives = 7
    level = 1
    vehicleInterval = setInterval(updateVehiclePositions, vehicleIntervalTime);
    riverInterval = setInterval(updateRiverPositions, riverIntervalTime);
    initLivesCounter()
    initLevelCounter()
    addVehicles()
    addRiverFeatures()
}

function initMedium() {
    startPosition = 127
    currentPosition = startPosition;
    hideMainMenu()
    newGameOrMenuMed()
    lives = 7
    level = 1
    vehicleInterval = setInterval(updateVehiclePositions, vehicleIntervalTime);
    riverInterval = setInterval(updateRiverPositions, riverIntervalTime);
    initLivesCounter()
    initLevelCounter()
    addVehicles()
    addRiverFeatures()
}

function newGameOrMenuEasy() {
    if (!easyBoard.classList.contains('boardgenerated')) {
    initEasyGrid()
    easyBoard.classList.add('boardgenerated')
    boardHolder.classList.add('easyboardgen')
    } else {
        addFrog(currentPosition);
    }
}

function newGameOrMenuMed() {
    if (!mediumBoard.classList.contains('boardgenerated')) {
    initMediumGrid()
    mediumBoard.classList.add('boardgenerated')
    boardHolder.classList.add('mediumboardgen')
    } else {
        addFrog(currentPosition);
    }
}

function hideMainMenu() {
    mainMenu.classList.remove('visible')
    mainMenu.classList.add('hidden')
    boardHolder.classList.remove('hidden')
    boardHolder.classList.add('visible')
    if (boardHolder.classList.contains('easyboardgen')) {
        easyBoard.classList.remove('hidden')
        easyBoard.classList.add('visible')
    } else if (boardHolder.classList.contains('mediumboardgen')) {
        mediumBoard.classList.remove('hidden')
        mediumBoard.classList.add('visible')
    }
    mainMenuBtn.classList.remove('hidden')
    mainMenuBtn.classList.add('visible')
}

// function bringUpMainMenu() {
//     mainMenu.classList.remove('hidden')
//     mainMenu.classList.add('visible')
//     boardHolder.classList.remove('visible')
//     boardHolder.classList.add('hidden')
//     easyBoard.classList.remove('visible')
//     easyBoard.classList.add('hidden')
//     mainMenuBtn.classList.remove('visible')
//     mainMenuBtn.classList.add('hidden')
// }

function initLivesCounter() {
    lifeCounter.style.position = 'absolute'
    lifeCounter.style.top = '15px'
    lifeCounter.style.right = '15px'
    lifeCounter.style.display = 'block'
    lifeCounter.style.color = 'red'
}

function initLevelCounter() {
    levelCounter.style.position = 'absolute'
    levelCounter.style.top = '15px'
    levelCounter.style.left = '15px'
    levelCounter.style.display = 'block'
    levelCounter.style.color = 'red'
    level.textContent = level
}

function handleMovement(event) {
    const key = event.keyCode
   
    const up = 87
    const down = 83
    const left = 65
    const right = 68

    removeFrog()

    let newPosition;
    let width;
    if (boardHolder.classList.contains('easyboardgen')) {
        width = 13
    } else if (boardHolder.classList.contains('mediumboardgen')) {
        width = 15
    }

    if (key === up && currentPosition >= width) {
        console.log('UP')
        newPosition = currentPosition - width
    } else if (key === down && currentPosition + width <= cellCount - 1) {
        console.log('DOWN')
        newPosition = currentPosition + width
    } else if (key === left && currentPosition % width !== 0) {
        console.log('LEFT')
        newPosition = currentPosition - 1
    } else if (key === right && currentPosition % width !== width - 1) {
        console.log('RIGHT')
        newPosition = currentPosition + 1
    } else {
        newPosition = currentPosition
    }

    currentPosition = newPosition;
    addFrog(currentPosition)
    handleCollision()
}

function updateLifeCounter() {
    livesDisplay.textContent = lives;
}

function updateLevelCounter() {
    levelDisplay.textContent = level
}


function nextLevel() {
    removeFrog()
    currentPosition = startPosition;
    addFrog(currentPosition)
    winner = 0
    nextLevelBtn.classList.add('hidden');
    vehicleIntervalTime -= 100
    riverIntervalTime -= 100
    clearInterval(vehicleInterval)
    clearInterval(riverInterval)
    vehicleInterval = setInterval(updateVehiclePositions, vehicleIntervalTime)
    riverInterval = setInterval(updateRiverPositions, riverIntervalTime)
    level++
    updateLevelCounter()
    title.textContent = 'FROGGER'
    title.style.color = 'green'
}



function rtnMenu() {
    location.reload()
    // bringUpMainMenu()
    // removeFrog()
    // currentPosition = startPosition;
    // clearInterval(vehicleInterval)
    // clearInterval(riverInterval)
    // vehicleInterval = 0;
    // riverInterval = 0
    // winner = 0;
    // nextLevelBtn.classList.add('hidden');
    // lifeCounter.style.display = 'none'
    // lives = 7;
    // updateLifeCounter()
    // levelCounter.style.display = 'none'
    // level = 1;
    // updateLevelCounter()
    // title.textContent = 'FROGGER'
    // title.style.color = 'green'
}


// FUNCTIONS FOR MOVING OBSTACLES //
let currentPositionRedCar = 77
let currentPositionYellowCar = 72
let currentPositionRedCarTwo = 68
let currentPositionTruckOne = 53
let currentPositionTruckTwo = 54
let currentPositionTruckThree = 58
let currentPositionTruckFour = 59
let currentPositionTruckFive = 62
let currentPositionTruckSix = 63

let positionLogOne = 27
let positionLogTwo = 28
let positionLogThree = 29
let positionLogFour = 33
let positionLogFive = 34
let positionLogSix = 35

let positionLilyOne = 14
let positionLilyTwo = 15
let positionLilyThree = 18
let positionLilyFour = 19
let positionLilyFive = 23
let positionLilySix = 24

function updateVehiclePositions() {
    moveRedCar()
    moveRedCarTwo()
    moveYellowCar()
    moveTrucks()
    moveTrucksTwo()
    moveTrucksThree()
    handleCollision()
}

function updateRiverPositions() {
    moveLogsOne()
    moveLogsTwo()
    moveLilyPadsOne()
    moveLilyPadsTwo()
    moveLilyPadsThree()

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

function moveRedCar() {
    removeRedCar();
    currentPositionRedCar--;
    if (currentPositionRedCar < 65) {
        currentPositionRedCar = 77;
    }
    addRedCar(currentPositionRedCar)
}

function removeRedCar() {
    cells[currentPositionRedCar].classList.remove('carOne');
}

function moveRedCarTwo() {
    removeRedCarTwo();
    currentPositionRedCarTwo--;
    if (currentPositionRedCarTwo < 65) {
        currentPositionRedCarTwo = 77;
    }
    addRedCar(currentPositionRedCarTwo)
}
function removeRedCarTwo() {
    cells[currentPositionRedCarTwo].classList.remove('carOne');
}

function moveYellowCar() {
    removeYellowCar();
    currentPositionYellowCar--;
    if (currentPositionYellowCar < 65) {
        currentPositionYellowCar = 77;
    }
    addYellowCar(currentPositionYellowCar)
}

function removeYellowCar() {
    cells[currentPositionYellowCar].classList.remove('carTwo');
}

function moveTrucks() {
    removeTrucks()
    currentPositionTruckOne++
    currentPositionTruckTwo++
    if (currentPositionTruckOne > 64) {
        currentPositionTruckOne = 52
    }
    if (currentPositionTruckTwo > 64) {
        currentPositionTruckTwo = 52
    }
    addTrucks(currentPositionTruckOne, currentPositionTruckTwo)
}

function removeTrucks() {
    cells[currentPositionTruckOne].classList.remove('truckOne')
    cells[currentPositionTruckTwo].classList.remove('truckTwo')
}

function moveTrucksTwo() {
    removeTrucksTwo()
    currentPositionTruckThree++
    currentPositionTruckFour++
    if (currentPositionTruckThree > 64) {
        currentPositionTruckThree = 52
    }
    if (currentPositionTruckFour > 64) {
        currentPositionTruckFour = 52
    }
    addTrucks(currentPositionTruckThree, currentPositionTruckFour)
}

function removeTrucksTwo() {
    cells[currentPositionTruckThree].classList.remove('truckOne')
    cells[currentPositionTruckFour].classList.remove('truckTwo')
}

function moveTrucksThree() {
    removeTrucksThree()
    currentPositionTruckFive++
    currentPositionTruckSix++
    if (currentPositionTruckFive > 64) {
        currentPositionTruckFive = 52
    }
    if (currentPositionTruckSix > 64) {
        currentPositionTruckSix = 52
    }
    addTrucks(currentPositionTruckFive, currentPositionTruckSix)
}

function removeTrucksThree() {
    cells[currentPositionTruckFive].classList.remove('truckOne')
    cells[currentPositionTruckSix].classList.remove('truckTwo')
}

function moveLogsOne() {
    removeLogsOne()
    positionLogOne--
    positionLogTwo--
    positionLogThree--
    if (positionLogOne < 26) {
        positionLogOne = 38
    }
    if (positionLogTwo < 26) {
        positionLogTwo = 38
    }
    if (positionLogThree < 26) {
        positionLogThree = 38
    }
    addLogs(positionLogOne, positionLogTwo, positionLogThree)
}

function removeLogsOne() {
    cells[positionLogOne].classList.remove('log')
    cells[positionLogTwo].classList.remove('log')
    cells[positionLogThree].classList.remove('log')
}

function moveLogsTwo() {
    removeLogsTwo()
    positionLogFour--
    positionLogFive--
    positionLogSix--
    if (positionLogFour < 26) {
        positionLogFour = 38
    }
    if (positionLogFive < 26) {
        positionLogFive = 38
    }
    if (positionLogSix < 26) {
        positionLogSix = 38
    }
    addLogs(positionLogFour, positionLogFive, positionLogSix)
}

function removeLogsTwo() {
    cells[positionLogFour].classList.remove('log')
    cells[positionLogFive].classList.remove('log')
    cells[positionLogSix].classList.remove('log')
}

function moveLilyPadsOne() {
    removeLilyPadsOne()
    positionLilyOne++
    positionLilyTwo++
    if (positionLilyOne > 25) {
        positionLilyOne = 13
    }
    if (positionLilyTwo > 25) {
        positionLilyTwo = 13
    }
    addLilyPads(positionLilyOne, positionLilyTwo)
}

function removeLilyPadsOne() {
    cells[positionLilyOne].classList.remove('lily')
    cells[positionLilyTwo].classList.remove('lily')
}

function moveLilyPadsTwo() {
    removeLilyPadsTwo()
    positionLilyThree++
    positionLilyFour++
    if (positionLilyThree > 25) {
        positionLilyThree = 13
    }
    if (positionLilyFour > 25) {
        positionLilyFour = 13
    }
    addLilyPads(positionLilyThree, positionLilyFour)
}

function removeLilyPadsTwo() {
    cells[positionLilyThree].classList.remove('lily')
    cells[positionLilyFour].classList.remove('lily')
}

function moveLilyPadsThree() {
    removeLilyPadsThree()
    positionLilyFive++
    positionLilySix++
    if (positionLilyFive > 25) {
        positionLilyFive = 13
    }
    if (positionLilySix > 25) {
        positionLilySix = 13
    }
    addLilyPads(positionLilyFive, positionLilySix)
}

function removeLilyPadsThree() {
    cells[positionLilyFive].classList.remove('lily')
    cells[positionLilySix].classList.remove('lily')
}

// FUNCTIONS FOR COLLISION //
function handleCollision() {
    const frogCell = cells[currentPosition];
    const isSafe = frogCell.classList.contains('log') || frogCell.classList.contains('lily')

    if (frogCell.classList.contains('carOne') || frogCell.classList.contains('carTwo')) {
        handleCollisionAction();
    }   
    
    if (frogCell.classList.contains('truckOne') || frogCell.classList.contains('truckTwo')) {
        handleCollisionAction();
    }

    if (!isSafe && (frogCell.classList.contains('river'))) {
        handleCollisionAction();
    }

    if (frogCell.classList.contains('grassEnd')) {
        winLevel()
    }

}

function handleCollisionAction() {
    lives--;
    updateLifeCounter()
    console.log(lives)
    if (lives <= 0) {
        title.textContent = 'GAME OVER!'
        title.style.color = 'red'
        setTimeout(rtnMenu, 3000);
    } else {
        removeFrog();
        currentPosition = startPosition;
        addFrog(currentPosition);
    }
}


function winLevel() {
    if (winner === 0) { 
        winner = 1;
        title.textContent = "Level Complete!"
        title.style.color = "teal" }
        nextLevelBtn.classList.remove('hidden');
}

