$(document).ready(function () {
    if (localStorage.getItem("difficulty") == "pro") {
        $('#highScore').html(localStorage.getItem('pro-high-score'));
        $('#highScoreUser').html(localStorage.getItem('user-pro-high-score'));

    } else if (localStorage.getItem("difficulty") == "beginner")  {
        $('#highScore').html(localStorage.getItem('easy-high-score'));
        $('#highScoreUser').html(localStorage.getItem('user-easy-high-score'));

    } else if (localStorage.getItem("difficulty") == "extreme"){
        $('#highScore').html(localStorage.getItem('extreme-high-score'));
        $('#highScoreUser').html(localStorage.getItem('extreme-easy-high-score'));
    };

    if(localStorage.getItem("playerName") == ""){
        localStorage.setItem("playerName","Player");
    };
    
    
    setTimeout(function(){
        gameTheme.play();
    },200);
    
    $("#user-name-game").text(localStorage.getItem("playerName"));
});
// Variables 

var difficulty = difficultySelector();

var hitCounter = 0;
var timerPro = new Timer(function () {
    targetSpawner();
}, difficulty);
var spawnCount = 0;
var gameState = false;
var gameOutCome;
var playerName = "Player_1";
var startingTimer = 3;
countDown();

const targetId = $("#targetIcon");
const hitDom = $("#hit-counter");
const missDom = $("#missed-counter");
const accuracyDom = $("#accuracy-counter");
const userName = $("#player-user").val();

function difficultySelector() {
    if (localStorage.getItem("difficulty") == "pro") {
        difficulty = 750;
    } else if (localStorage.getItem("difficulty") == "beginner") {
        difficulty = 1000;
    } else if (localStorage.getItem("difficulty") == "extreme"){
        difficulty = 600;

    } else {
        difficulty = 700;
    };

    return (difficulty);
};

function targetSelector() {

    if (localStorage.getItem("target") == "alien") {
        return (alienRandomizer());
    } else if (localStorage.getItem("target") == "fruit") {
        return (fruitRandomizer());
    } else {
        return (alienRandomizer());
    }
};

function countDown() {
    killSwitch();
    if (startingTimer > -1) {
        setTimeout(function () {
            if (startingTimer == 0) {
                $('#spawn-point-67').html('<p class="text-light count-down-text">go</p>');
                setTimeout(function () {
                    $('#spawn-point-67').html('');
                    timerPro.start();
                }, 500)
            }
            if (startingTimer !== 0) {
                timerPro.stop();
                $('#spawn-point-67').html(`<p class="text-light count-down-text">${startingTimer}</p>`);
                startingTimer--;
                countDown();
            }
        }, 500);
    }
};




function targetSpawner() {



    if (spawnCount <= 29) {
        killSwitch();
        timerPro.stop();
        timerPro.start();
        $(spawner()).append(`<div class="target"    id="targetIcon">${targetSelector()}</div>`);
        spawnCount++;
        accuracyDomPusher();

    } else {
        killSwitch();
        timerPro.stop();
        failedHit();
        failedHitFinal();
        highScore();
        setTimeout(function () {
            
            endGameModal();
            
            $('#endGameModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }, 200);
    }
};

// function to calculate where the target will spawn next
function spawner() {
    var numberGen = Math.floor((Math.random() * 132) + 1);
    var spawnPoint = "#spawn-point-".concat(numberGen);
    return (spawnPoint);
};

// killSwitch funcion will remove any targets on screen 

function killSwitch() {
    $("#targetIcon").remove();
};
function successfulHit() {
    hitSound.play();
    hitDom.text(hitCounter);
};


function failedHit() {
    var missCounter = (spawnCount - 1) - hitCounter;
    return (missCounter)
};

//function used to update the dom with the vaule of failedHit function

function failedHitDomPusher() {
    missDom.text(failedHit());
};


//this function adds that final target back in to the mix to calculate the final amount of targets missed at the end of the game. 
function failedHitFinal() {
    var missCounter = spawnCount - hitCounter;
    missDom.text(missCounter);
    return(missCounter);
};



// accuracyCalc is a simple equation to calculate the accuracy percentage of the player

// spawnCounter =  100%
// hitCounter   =  X 

// the value of spawnCount = 100% so the value of hit count = X 
// to calculate the percentage we multiply hitCounter by 100 then divide it by spawnCount, this gives us the value of X
// X = the players accuracy.

// spawnCounter = 100%
// hitCounter   =  X 

function accuracyCalc() {
    hits = hitCounter;
    spawned = spawnCount;

    var accuracyTotal = hits * 100 / (spawned -1 );
    var accuracyRounded = Math.round(accuracyTotal * 100) / 100;

    return (accuracyRounded);
};


//function used to push the accuracy percentage to the Dom.

function accuracyDomPusher() {
    accuracyDom.text(accuracyCalc());
};
// Timer function to reset the interval everytime a target is hit. (by jfriend00 on Stack Overflow) credit in read me 

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function (newT) {
        t = newT;
        return this.stop().start();
    }
}

// fruitRandomizer uses  math.random to calculate a number between 1 - 3
// each fruit is assigned to a diffrent number, using a simple if statment the function will
// determine what fruit to show.

function fruitRandomizer() {

    var numberGen = Math.floor((Math.random() * 3) + 1);



    if (numberGen == 1) {
        var target = '<img draggable="false" onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/8-bitBanana.png">';
        return (target);
    } else if (numberGen == 2) {
        var target = '<img draggable="false" onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/8-bitCherry.png">';
        return (target);
    } else {
        var target = '<img draggable="false" onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/8-bitWatermelon.png">';
        return (target);
    }
};

// alienRandomizer uses math.random to calculate a number between 1 - 3
// each alien is assigned to a diffrent number, using a simple if statment the function will
// determine what alien to show.

function alienRandomizer() {

    var numberGen = Math.floor((Math.random() * 3) + 1);



    if (numberGen == 1) {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/boss-1.png">';
        return (target);
    } else if (numberGen == 2) {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/boss-2.png">';
        return (target);
    } else {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/boss-3.png">';
        return (target);
    }
};


//End game modal that updates with end of game stats

function endGameModal(){
    $("#player-name-modal").text(localStorage.getItem("playerName"));
    $("#total-hit-modal").text(hitCounter);
    $("#total-misses-modal").text(failedHitFinal);
    $("#accuracy-modal").text(accuracyCalc() + "%");
};



// High score 

// This function uses the same the local storage variable for difficulty,
// The if stamtent is checking the difficulty setting then with in these if statments we have further
// if statments that compare the current score to the local storage item of high score
// if current score > local storage high score then the game will update the score and user name as a
// Local storage item

function highScore(){
    

    if (localStorage.getItem("difficulty") == "pro") {
        
        var currentHighScore = localStorage.getItem("pro-high-score")
        var currentUserName = localStorage.getItem("playerName");
        

        if (hitCounter > currentHighScore){
            localStorage.setItem('pro-high-score', hitCounter);
            localStorage.setItem('user-pro-high-score',currentUserName);
            $('#highScore').html(hitCounter);
            $('#highScoreUser').html(currentUserName);

        }

    } else if (localStorage.getItem("difficulty") == "beginner") {
        var currentHighScore = localStorage.getItem("easy-high-score");
        var currentUserName = localStorage.getItem("playerName");
        
        if (hitCounter > currentHighScore){
            localStorage.setItem('easy-high-score', hitCounter);
            localStorage.setItem('user-easy-high-score',currentUserName);
            $('#highScore').html(hitCounter);
            $('#highScoreUser').html(currentUserName);

        }
       
    } else if (localStorage.getItem("difficulty") == "extreme"){
        
        var currentHighScore = localStorage.getItem("extreme-high-score");
        var currentUserName = localStorage.getItem("playerName");
        
        if (hitCounter > currentHighScore){
            localStorage.setItem('extreme-high-score', hitCounter);
            localStorage.setItem('user-extreme-high-score',currentUserName);
            $('#highScore').html(hitCounter);
            $('#highScoreUser').html(currentUserName);
        }

    }
};