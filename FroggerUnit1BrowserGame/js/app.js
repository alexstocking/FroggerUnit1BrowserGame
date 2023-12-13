// CACHED ELEMENTS //
const mainMenu = document.querySelector('#main-container')
const boardHolder = document.querySelector('#board')
const title = document.querySelector('#title')
const lifeCounter = document.querySelector('#lifeCounter')
const levelCounter = document.querySelector('#levelCounter')

const easyBtn = document.querySelector('#easybtn')
const mediumBtn = document.querySelector('#mediumbtn')
const hardBtn = document.querySelector('#hardbtn')

const road = document.querySelectorAll('.road')
const river = document.querySelectorAll('.river')
const grassStart = document.querySelectorAll('.grassStart')
const grassMiddle = document.querySelectorAll('.grassMiddle')
const grassEnd = document.querySelectorAll('.grassEnd')

const mainMenuBtn = document.querySelector('#mainMenu')
const nextLevelBtn = document.querySelector('#nextlevel')

const frogEl = document.querySelector('.frog')

// EVENT LISTENERS //
easyBtn.addEventListener('click', initEasy)
mediumBtn.addEventListener('click', initMedium)
hardBtn.addEventListener('click', initHard)
mainMenuBtn.addEventListener('click', rtnMenu)
nextLevelBtn.addEventListener('click', nextLevel)
document.addEventListener('keydown', handleMovement)


// BOARD CONFIG AND CREATION //
let easyBoard = document.querySelector('#easyboard')
let mediumBoard = document.querySelector('#mediumboard')
let hardBoard = document.querySelector('#hardboard')
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
let vehicleIntervalTimeM = 1300
let riverIntervalTimeM = 1100
let vehicleIntervalTimeH = 1200
let riverIntervalTimeH = 1000
let levelDisplay = document.querySelector('#level')

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

function initMediumGrid() {
    boardHolder.removeChild(easyBoard)
    boardHolder.removeChild(hardBoard)
    width = 15
    height = 9
    cellCount = width * height
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('data-index', i)
        if (i >= 0 && i <= 14) {
            cell.classList.add('grassEnd')
        } else if (i>= 15 && i <= 59) {
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

function initHardGrid() {
    boardHolder.removeChild(easyBoard)
    boardHolder.removeChild(mediumBoard)
    width = 19
    height = 11
    cellCount = width * height
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('data-index', i)
        if (i >= 0 && i <= 18) {
            cell.classList.add('grassEnd')
        } else if (i>= 19 && i <= 94) {
            cell.classList.add('river')
        } else if (i >= 95 && i <= 113) {
            cell.classList.add('grassMiddle')
        } else if (i >= 114 && i <= 189) {
            cell.classList.add('road')
        } else if (i >= 190  && i <= 209) {
            cell.classList.add('grassStart')
        } 
        hardBoard.appendChild(cell)
        cells.push(cell)
        // cells[startPosition].classList.add('frog')
        
    }
    addFrog(startPosition)
}

function addVehiclesEasy() {
    addCars(currentPositionCar[0], currentPositionCar[1], currentPositionCar[2])
    addTrucks(currentPositionTrucks[0], currentPositionTrucks[1], currentPositionTrucks[2], currentPositionTrucks[3], currentPositionTrucks[4], currentPositionTrucks[5])
}

function addRiverFeaturesEasy() {
    addLogs(positionLogs[0], positionLogs[1], positionLogs[2], positionLogs[3], positionLogs[4], positionLogs[5])
    addLilyPads(positionLilys[0], positionLilys[1], positionLilys[2], positionLilys[3], positionLilys[4], positionLilys[5])
}

function addVehiclesMedium() {
    addCars(currentPositionCar[3], currentPositionCar[4], currentPositionCar[5])
    addTrucks(currentPositionTrucks[6], currentPositionTrucks[7], currentPositionTrucks[8], currentPositionTrucks[9], currentPositionTrucks[10], currentPositionTrucks[11])
    addMediumCars(currentPositionCarMedium[0], currentPositionCarMedium[1], currentPositionCarMedium[2], currentPositionCarMedium[3], currentPositionCarMedium[4], currentPositionCarMedium[5])
}

function addRiverFeaturesMedium() {
    addLilyPads(positionLilys[6], positionLilys[7], positionLilys[8], positionLilys[9], positionLilys[10], positionLilys[11] )
    addLogs(positionLogs[6], positionLogs[7], positionLogs[8], positionLogs[9], positionLogs[10], positionLogs[11])
    addMediumLilyPads(positionLilyMedium[0], positionLilyMedium[1], positionLilyMedium[2], positionLilyMedium[3])
}

function addVehiclesHard() {
    addCars(currentPositionCar[6], currentPositionCar[7], currentPositionCar[8])
    addCars(currentPositionCar[9], currentPositionCar[10], currentPositionCar[11])
    addTrucks(currentPositionTrucks[12], currentPositionTrucks[13], currentPositionTrucks[14], currentPositionTrucks[15], currentPositionTrucks[16], currentPositionTrucks[17])
    addMediumCars(currentPositionCarMedium[6], currentPositionCarMedium[7], currentPositionCarMedium[8], currentPositionCarMedium[9], currentPositionCarMedium[10], currentPositionCarMedium[11])
    addMediumCars(currentPositionCarMedium[12], currentPositionCarMedium[13], currentPositionCarMedium[14], currentPositionCarMedium[15], currentPositionCarMedium[16], currentPositionCarMedium[17])
    addHardRoad(currentPositionHardRoad[0], currentPositionHardRoad[1], currentPositionHardRoad[2], currentPositionHardRoad[3], currentPositionHardRoad[4], currentPositionHardRoad[5],)
    addHardRoad(currentPositionHardRoad[6], currentPositionHardRoad[7], currentPositionHardRoad[8], currentPositionHardRoad[9], currentPositionHardRoad[10], currentPositionHardRoad[11],)
}

function addRiverFeaturesHard() {
    addLogs(positionLogs[12], positionLogs[13], positionLogs[14], positionLogs[15], positionLogs[16], positionLogs[17])
    addLilyPads(positionLilys[12], positionLilys[13], positionLilys[14], positionLilys[15], positionLilys[16], positionLilys[17])
    addMediumLilyPads(positionLilyMedium[4], positionLilyMedium[5], positionLilyMedium[6], positionLilyMedium[7])
    addMediumLilyPads(positionLilyMedium[8], positionLilyMedium[9], positionLilyMedium[10], positionLilyMedium[11])
    addHardRiver(positionRiverHard[0], positionRiverHard[1], positionRiverHard[2], positionRiverHard[3], positionRiverHard[4], positionRiverHard[5],)
}

function addFrog(position) {
    cells[position].classList.add('frog')
}

function removeFrog() {
    cells[currentPosition].classList.remove('frog')
}

function addCars(positionOne, positionTwo, positionThree) {
    cells[positionOne].classList.add('carOne')
    cells[positionTwo].classList.add('carTwo')
    cells[positionThree].classList.add('carOne')
}

function addMediumCars(p1, p2, p3, p4, p5, p6) {
    cells[p1].classList.add('carOne')
    cells[p2].classList.add('carTwo')
    cells[p3].classList.add('carOne')
    cells[p4].classList.add('carTwo')
    cells[p5].classList.add('carOne')
    cells[p6].classList.add('carTwo')
}

function addTrucks(positionOne, positionTwo, positionThree, positionFour, positionFive, positionSix) {
    cells[positionOne].classList.add('truckOne')
    cells[positionTwo].classList.add('truckTwo')
    cells[positionThree].classList.add('truckOne')
    cells[positionFour].classList.add('truckTwo')
    cells[positionFive].classList.add('truckOne')
    cells[positionSix].classList.add('truckTwo')
}

function addHardRoad(p1, p2, p3, p4, p5, p6) {
    cells[p1].classList.add('carOneR')
    cells[p2].classList.add('carOneR')
    cells[p3].classList.add('truckOne')
    cells[p4].classList.add('carTwoR')
    cells[p5].classList.add('truckOne')
    cells[p6].classList.add('truckTwo')
}

function addLogs(position0, position1, position2, position3, position4, position5) {
    cells[position0].classList.add('log')
    cells[position1].classList.add('log')
    cells[position2].classList.add('log')
    cells[position3].classList.add('log')
    cells[position4].classList.add('log')
    cells[position5].classList.add('log')
}

function addLilyPads(posOne, posTwo, posThree, posFour, posFive, posSix) {
    cells[posOne].classList.add('lily')
    cells[posTwo].classList.add('lily')
    cells[posThree].classList.add('lily')
    cells[posFour].classList.add('lily')
    cells[posFive].classList.add('lily')
    cells[posSix].classList.add('lily')
}

function addMediumLilyPads(p1, p2, p3, p4) {
    cells[p1].classList.add('lily')
    cells[p2].classList.add('lily')
    cells[p3].classList.add('lily')
    cells[p4].classList.add('lily')
}

function addHardRiver(p1, p2, p3, p4, p5, p6) {
    cells[p1].classList.add('log')
    cells[p2].classList.add('log')
    cells[p3].classList.add('lily')
    cells[p4].classList.add('lily')
    cells[p5].classList.add('lily')
    cells[p6].classList.add('lily')
}

// FUNCTIONS FOR STARTING AND CONTROLS //

function initEasy() {
    startPosition = 84
    currentPosition = startPosition;
    hideMainMenu()
    newGameOrMenuEasy()
    lives = 7
    level = 1
    initLivesCounter()
    initLevelCounter()
    addVehiclesEasy()
    addRiverFeaturesEasy()
    vehicleInterval = setInterval(updateVehiclePositionsEasy, vehicleIntervalTime);
    riverInterval = setInterval(updateRiverPositionsEasy, riverIntervalTime);
}

function initMedium() {
    startPosition = 127
    currentPosition = startPosition;
    hideMainMenu()
    newGameOrMenuMed()
    lives = 7
    level = 1
    initLivesCounter()
    initLevelCounter()
    addVehiclesMedium()
    addRiverFeaturesMedium()
    vehicleInterval = setInterval(updateVehiclePositionsMedium, vehicleIntervalTimeM);
    riverInterval = setInterval(updateRiverPositionsMedium, riverIntervalTimeM);
}

function initHard() {
    startPosition = 199
    currentPosition = startPosition;
    hideMainMenu()
    newGameOrMenuHard()
    lives = 7
    level = 1
    initLivesCounter()
    initLevelCounter()
    addVehiclesHard()
    addRiverFeaturesHard()
    vehicleInterval = setInterval(updateVehiclePositionsHard, vehicleIntervalTimeH);
    riverInterval = setInterval(updateRiverPositionsHard, riverIntervalTimeH);
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

function newGameOrMenuHard() {
    if (!hardBoard.classList.contains('boardgenerated')) {
    initHardGrid()
    hardBoard.classList.add('boardgenerated')
    boardHolder.classList.add('hardboardgen')
    } else {
        addFrog(currentPosition);
    }
}



function hideMainMenu() {
    mainMenu.classList.remove('visible')
    mainMenu.classList.add('hidden')
    boardHolder.classList.remove('hidden')
    boardHolder.classList.add('visible')
    mainMenuBtn.classList.remove('hidden')
    mainMenuBtn.classList.add('visible')
}

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
    } else if (boardHolder.classList.contains('hardboardgen')) {
        width = 19
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


function updateVehiclePositionsEasy() {
    moveCars(65, 77)
    moveTrucks(64, 52)
    handleCollision()
}

function updateRiverPositionsEasy() {
    frogOnLogOrLily()
    moveLogs(26, 38)
    moveLilyPads(25, 13)
}

function updateVehiclePositionsMedium() {
    moveCars(105, 119)
    moveTrucks(104, 90)
    moveMediumCars(75, 89)
    handleCollision()
}

function updateRiverPositionsMedium() {
    frogOnLogOrLily()
    moveLilyPads(59, 45)
    moveLogs(30, 44)
    moveMediumLilys(29, 15)
}

function updateVehiclePositionsHard() {
    moveCars(171, 189)
    moveTrucks(170, 152)
    moveMediumCars(133, 151)
    moveHardRoad(132, 114)
    handleCollision()
}

function updateRiverPositionsHard() {
    frogOnLogOrLily()
    moveLilyPads(94, 76)
    moveLogs(57, 75)
    moveMediumLilys(56, 38)
    moveRiverHard(19, 37)
}
      
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
    vehicleIntervalTime -= 70
    riverIntervalTime -= 70
    vehicleIntervalTimeM -= 80
    riverIntervalTimeM -= 80
    vehicleIntervalTimeH -= 90
    riverIntervalTimeH -= 90
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
let currentPositionCar = [77, 72, 68, 118, 112, 107, 188, 184, 180, 176, 175, 172]
let currentPositionCarMedium = [88, 85, 83, 81, 78, 76, 151, 149, 147, 146, 145, 143, 142, 141, 140, 137, 135, 134]
let currentPositionTrucks = [ 53, 54, 58, 59, 62, 63, 91, 92, 96, 97, 100, 101, 153, 154, 160, 161, 168, 169]
let currentPositionHardRoad = [115, 116, 117, 120, 121, 122, 125, 126, 127, 129, 130, 131]
let positionLogs = [27, 28, 29, 33, 34, 35, 33, 34, 35, 39, 40, 41, 61, 62, 63, 68, 69, 70]
let positionLilys = [14, 15, 18, 19, 23, 24, 46, 47, 51, 52, 56, 57, 80, 81, 82, 86, 87, 92]
let positionLilyMedium = [18, 19, 24, 25, 39, 41, 43, 45, 47, 49, 51, 53]
let positionRiverHard = [22, 23, 27, 29, 32, 34]


function moveCars(x, y) {
    removeCars();
    for (let i = 0; i < currentPositionCar.length; i++) {
    currentPositionCar[i]--;
    if (currentPositionCar[i] < x) {
        currentPositionCar[i] = y;
        }
    }
    if (boardHolder.classList.contains('easyboardgen')) {
        addCars(currentPositionCar[0], currentPositionCar[1], currentPositionCar[2])
    } 
    if (boardHolder.classList.contains('mediumboardgen')) {
        addCars(currentPositionCar[3], currentPositionCar[4], currentPositionCar[5])
    }
    if (boardHolder.classList.contains('hardboardgen'))  {
        addCars(currentPositionCar[6], currentPositionCar[7], currentPositionCar[8])
        addCars(currentPositionCar[9], currentPositionCar[10], currentPositionCar[11])
    }  
}

function moveMediumCars(x, y) {
    removeMediumCars();
    for (let i = 0; i < currentPositionCarMedium.length; i++) {
    currentPositionCarMedium[i]--;
    if (currentPositionCarMedium[i] < x) {
        currentPositionCarMedium[i] = y;
        }
    }
    if (boardHolder.classList.contains('mediumboardgen')) {
        addMediumCars(currentPositionCarMedium[0], currentPositionCarMedium[1], currentPositionCarMedium[2], currentPositionCarMedium[3], currentPositionCarMedium[4], currentPositionCarMedium[5])
    }
    if (boardHolder.classList.contains('hardboardgen')) {
        addMediumCars(currentPositionCarMedium[6], currentPositionCarMedium[7], currentPositionCarMedium[8], currentPositionCarMedium[9], currentPositionCarMedium[10], currentPositionCarMedium[11])
        addMediumCars(currentPositionCarMedium[12], currentPositionCarMedium[13], currentPositionCarMedium[14], currentPositionCarMedium[15], currentPositionCarMedium[16], currentPositionCarMedium[17])
    }
}   

function removeCars() {
    if (boardHolder.classList.contains('easyboardgen')) {
        cells[currentPositionCar[0]].classList.remove('carOne');
        cells[currentPositionCar[1]].classList.remove('carTwo');
        cells[currentPositionCar[2]].classList.remove('carOne');
    } 
    if (boardHolder.classList.contains('mediumboardgen')) {
        cells[currentPositionCar[3]].classList.remove('carOne');
        cells[currentPositionCar[4]].classList.remove('carTwo');
        cells[currentPositionCar[5]].classList.remove('carOne');
    }
    if (boardHolder.classList.contains('hardboardgen')) {
        cells[currentPositionCar[6]].classList.remove('carOne');
        cells[currentPositionCar[7]].classList.remove('carTwo');
        cells[currentPositionCar[8]].classList.remove('carOne');
        cells[currentPositionCar[9]].classList.remove('carOne');
        cells[currentPositionCar[10]].classList.remove('carTwo');
        cells[currentPositionCar[11]].classList.remove('carOne');
    }
}

function removeMediumCars() {
    if (boardHolder.classList.contains('mediumboardgen')) {
        cells[currentPositionCarMedium[0]].classList.remove('carOne');
        cells[currentPositionCarMedium[1]].classList.remove('carTwo');
        cells[currentPositionCarMedium[2]].classList.remove('carOne');
        cells[currentPositionCarMedium[3]].classList.remove('carTwo');
        cells[currentPositionCarMedium[4]].classList.remove('carOne');
        cells[currentPositionCarMedium[5]].classList.remove('carTwo');
    }
    if (boardHolder.classList.contains('hardboardgen')) {
        cells[currentPositionCarMedium[6]].classList.remove('carOne');
        cells[currentPositionCarMedium[7]].classList.remove('carTwo');
        cells[currentPositionCarMedium[8]].classList.remove('carOne');
        cells[currentPositionCarMedium[9]].classList.remove('carTwo');
        cells[currentPositionCarMedium[10]].classList.remove('carOne');
        cells[currentPositionCarMedium[11]].classList.remove('carTwo');
        cells[currentPositionCarMedium[12]].classList.remove('carOne');
        cells[currentPositionCarMedium[13]].classList.remove('carTwo');
        cells[currentPositionCarMedium[14]].classList.remove('carOne');
        cells[currentPositionCarMedium[15]].classList.remove('carTwo');
        cells[currentPositionCarMedium[16]].classList.remove('carOne');
        cells[currentPositionCarMedium[17]].classList.remove('carTwo');
    }
}

function moveTrucks(x, y) {
    removeTrucks()
    for (let i = 0; i < currentPositionTrucks.length; i++) {
        currentPositionTrucks[i]++
        if (currentPositionTrucks[i] > x) {
            currentPositionTrucks[i] = y
        }
        
    }
    if (boardHolder.classList.contains('easyboardgen')) {
        addTrucks(currentPositionTrucks[0], currentPositionTrucks[1], currentPositionTrucks[2], currentPositionTrucks[3], currentPositionTrucks[4], currentPositionTrucks[5])
    } else if (boardHolder.classList.contains('mediumboardgen')) {
        addTrucks(currentPositionTrucks[6], currentPositionTrucks[7], currentPositionTrucks[8], currentPositionTrucks[9], currentPositionTrucks[10], currentPositionTrucks[11])
    } else if (boardHolder.classList.contains('hardboardgen')) {
        addTrucks(currentPositionTrucks[12], currentPositionTrucks[13], currentPositionTrucks[14], currentPositionTrucks[15], currentPositionTrucks[16], currentPositionTrucks[17],)
    }
}

function removeTrucks() {
    if (boardHolder.classList.contains('easyboardgen')) {
        cells[currentPositionTrucks[0]].classList.remove('truckOne')
        cells[currentPositionTrucks[1]].classList.remove('truckTwo')
        cells[currentPositionTrucks[2]].classList.remove('truckOne')
        cells[currentPositionTrucks[3]].classList.remove('truckTwo')
        cells[currentPositionTrucks[4]].classList.remove('truckOne')
        cells[currentPositionTrucks[5]].classList.remove('truckTwo')
}   else if (boardHolder.classList.contains('mediumboardgen')) {
        cells[currentPositionTrucks[6]].classList.remove('truckOne')
        cells[currentPositionTrucks[7]].classList.remove('truckTwo')
        cells[currentPositionTrucks[8]].classList.remove('truckOne')
        cells[currentPositionTrucks[9]].classList.remove('truckTwo')
        cells[currentPositionTrucks[10]].classList.remove('truckOne')
        cells[currentPositionTrucks[11]].classList.remove('truckTwo')
}   else if (boardHolder.classList.contains('hardboardgen')) {
        cells[currentPositionTrucks[12]].classList.remove('truckOne')
        cells[currentPositionTrucks[13]].classList.remove('truckTwo')
        cells[currentPositionTrucks[14]].classList.remove('truckOne')
        cells[currentPositionTrucks[15]].classList.remove('truckTwo')
        cells[currentPositionTrucks[16]].classList.remove('truckOne')
        cells[currentPositionTrucks[17]].classList.remove('truckTwo')
}
}

function moveHardRoad (x, y) {
    removeHardRoad()
    for (let i = 0; i < currentPositionHardRoad.length; i++) {
        currentPositionHardRoad[i]++
        if (currentPositionHardRoad[i] > x) {
            currentPositionHardRoad[i] = y
        }
}
    addHardRoad(currentPositionHardRoad[0], currentPositionHardRoad[1], currentPositionHardRoad[2], currentPositionHardRoad[3], currentPositionHardRoad[4], currentPositionHardRoad[5],)
    addHardRoad(currentPositionHardRoad[6], currentPositionHardRoad[7], currentPositionHardRoad[8], currentPositionHardRoad[9], currentPositionHardRoad[10], currentPositionHardRoad[11],)
}

function removeHardRoad() {
    cells[currentPositionHardRoad[0]].classList.remove('carOneR')
    cells[currentPositionHardRoad[1]].classList.remove('carOneR')
    cells[currentPositionHardRoad[2]].classList.remove('truckOne')
    cells[currentPositionHardRoad[3]].classList.remove('carTwoR')
    cells[currentPositionHardRoad[4]].classList.remove('truckOne')
    cells[currentPositionHardRoad[5]].classList.remove('truckTwo')
    cells[currentPositionHardRoad[6]].classList.remove('carOneR')
    cells[currentPositionHardRoad[7]].classList.remove('carOneR')
    cells[currentPositionHardRoad[8]].classList.remove('truckOne')
    cells[currentPositionHardRoad[9]].classList.remove('carTwoR')
    cells[currentPositionHardRoad[10]].classList.remove('truckOne')
    cells[currentPositionHardRoad[11]].classList.remove('truckTwo')
}


function moveLogs(x, y) {
    removeLogs()
    for (let i = 0; i < positionLogs.length; i++) {
        positionLogs[i]--
        if (positionLogs[i] < x) {
            positionLogs[i] = y
        }  
    } 
    if (boardHolder.classList.contains('easyboardgen')) {
        addLogs(positionLogs[0], positionLogs[1], positionLogs[2], positionLogs[3], positionLogs[4], positionLogs[5])
    } else if (boardHolder.classList.contains('mediumboardgen')) {
        addLogs(positionLogs[6], positionLogs[7], positionLogs[8], positionLogs[9], positionLogs[10], positionLogs[11],)
    } else if (boardHolder.classList.contains('hardboardgen')) {
        addLogs(positionLogs[12], positionLogs[13], positionLogs[14], positionLogs[15], positionLogs[16], positionLogs[17],)
    }
}

function removeLogs() {
    if (boardHolder.classList.contains('easyboardgen')) {
        cells[positionLogs[0]].classList.remove('log')
        cells[positionLogs[1]].classList.remove('log')
        cells[positionLogs[2]].classList.remove('log')
        cells[positionLogs[3]].classList.remove('log')
        cells[positionLogs[4]].classList.remove('log')
        cells[positionLogs[5]].classList.remove('log')
    }   else if (boardHolder.classList.contains('mediumboardgen')) {
        cells[positionLogs[6]].classList.remove('log')
        cells[positionLogs[7]].classList.remove('log')
        cells[positionLogs[8]].classList.remove('log')
        cells[positionLogs[9]].classList.remove('log')
        cells[positionLogs[10]].classList.remove('log')
        cells[positionLogs[11]].classList.remove('log')
    } else if (boardHolder.classList.contains('hardboardgen')) {
        cells[positionLogs[12]].classList.remove('log')
        cells[positionLogs[13]].classList.remove('log')
        cells[positionLogs[14]].classList.remove('log')
        cells[positionLogs[15]].classList.remove('log')
        cells[positionLogs[16]].classList.remove('log')
        cells[positionLogs[17]].classList.remove('log')

    }
}

function moveLilyPads(x, y) {
    removeLilyPads()
    for (let i = 0; i < positionLilys.length; i++) {
        positionLilys[i]++
        if (positionLilys[i] > x) {
            positionLilys[i] = y
        }
    }
    if (boardHolder.classList.contains('easyboardgen')) {
        addLilyPads(positionLilys[0], positionLilys[1], positionLilys[2], positionLilys[3], positionLilys[4], positionLilys[5])
    } else if (boardHolder.classList.contains('mediumboardgen')) {
        addLilyPads(positionLilys[6], positionLilys[7], positionLilys[8], positionLilys[9], positionLilys[10], positionLilys[11],)
    } else if (boardHolder.classList.contains('hardboardgen')) {
        addLilyPads(positionLilys[12], positionLilys[13], positionLilys[14], positionLilys[15], positionLilys[16], positionLilys[17],)
    }
}

function moveMediumLilys(x, y) {
    removeMediumLilys()
    for (let i = 0; i < positionLilyMedium.length; i++) {
        positionLilyMedium[i]++
        if (positionLilyMedium[i] > x) {
            positionLilyMedium[i] = y
        }
    }
    if (boardHolder.classList.contains('mediumboardgen')) {
    addMediumLilyPads(positionLilyMedium[0], positionLilyMedium[1], positionLilyMedium[2], positionLilyMedium[3])
    } else if (boardHolder.classList.contains('hardboardgen')) {
        addMediumLilyPads(positionLilyMedium[4], positionLilyMedium[5], positionLilyMedium[6], positionLilyMedium[7])
        addMediumLilyPads(positionLilyMedium[8], positionLilyMedium[9], positionLilyMedium[10], positionLilyMedium[11])
    }
}

function removeLilyPads() {
    if (boardHolder.classList.contains('easyboardgen')) {
        cells[positionLilys[0]].classList.remove('lily')
        cells[positionLilys[1]].classList.remove('lily')
        cells[positionLilys[2]].classList.remove('lily')
        cells[positionLilys[3]].classList.remove('lily')
        cells[positionLilys[4]].classList.remove('lily')
        cells[positionLilys[5]].classList.remove('lily')
}   else if (boardHolder.classList.contains('mediumboardgen')) {
        cells[positionLilys[6]].classList.remove('lily')
        cells[positionLilys[7]].classList.remove('lily')
        cells[positionLilys[8]].classList.remove('lily')
        cells[positionLilys[9]].classList.remove('lily')
        cells[positionLilys[10]].classList.remove('lily')
        cells[positionLilys[11]].classList.remove('lily')
}   else if (boardHolder.classList.contains('hardboardgen')) {
        cells[positionLilys[12]].classList.remove('lily')
        cells[positionLilys[13]].classList.remove('lily')
        cells[positionLilys[14]].classList.remove('lily')
        cells[positionLilys[15]].classList.remove('lily')
        cells[positionLilys[16]].classList.remove('lily')
        cells[positionLilys[17]].classList.remove('lily')
}
}

function removeMediumLilys() {
    cells[positionLilyMedium[0]].classList.remove('lily')
    cells[positionLilyMedium[1]].classList.remove('lily')
    cells[positionLilyMedium[2]].classList.remove('lily')
    cells[positionLilyMedium[3]].classList.remove('lily')
    cells[positionLilyMedium[4]].classList.remove('lily')
    cells[positionLilyMedium[5]].classList.remove('lily')
    cells[positionLilyMedium[6]].classList.remove('lily')
    cells[positionLilyMedium[7]].classList.remove('lily')
    cells[positionLilyMedium[8]].classList.remove('lily')
    cells[positionLilyMedium[9]].classList.remove('lily')
    cells[positionLilyMedium[10]].classList.remove('lily')
    cells[positionLilyMedium[11]].classList.remove('lily')
}

function moveRiverHard(x, y) {
    removeHardRiver()
    for (let i = 0; i < positionRiverHard.length; i++) {
        positionRiverHard[i]--
        if (positionRiverHard[i] < x) {
            positionRiverHard[i] = y
        }  
    } 
    addHardRiver(positionRiverHard[0], positionRiverHard[1], positionRiverHard[2], positionRiverHard[3], positionRiverHard[4], positionRiverHard[5],)
}

function removeHardRiver() {
    cells[positionRiverHard[0]].classList.remove('log')
    cells[positionRiverHard[1]].classList.remove('log')
    cells[positionRiverHard[2]].classList.remove('lily')
    cells[positionRiverHard[3]].classList.remove('lily')
    cells[positionRiverHard[4]].classList.remove('lily')
    cells[positionRiverHard[5]].classList.remove('lily')
}

// FUNCTIONS FOR COLLISION AND WINNING //
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

