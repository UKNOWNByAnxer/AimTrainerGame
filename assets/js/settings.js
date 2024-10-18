$(document).ready(function () {
    // Verifica la interacción del usuario para habilitar el audio
    $(document).on('click', function () {
        introMusic.play().catch(function (error) {
            console.error('Error al reproducir el audio:', error);
        });
        gameTheme.play().catch(function (error) {
            console.error('Error al reproducir el audio:', error);
        });
        // Este evento se desactiva después de la primera interacción
        $(document).off('click');
    });

    // Código restante para aplicar los temas y configuraciones
    if (localStorage.getItem("theme") == "light") {
        lightSwitch();
    } else if (localStorage.getItem("theme") == "dark") {
        darkSwitch();
    }
    
    if (localStorage.getItem("audio") == "off") {
        audioOff();
    } else if (localStorage.getItem("audio") == "on") {
        audioOn();
    }
    
    if (localStorage.getItem("difficulty") == "beginner") {
        difficultyBeginner();
    } else if (localStorage.getItem("difficulty") == "pro") {
        difficultyPro();
    } else if (localStorage.getItem("difficulty") == "extreme"){
        difficultyExtreme();
    }
    
    if (localStorage.getItem("target") == "alien") {
        alienTargets();
    } else if (localStorage.getItem("target") == "fruit") {
        fruitTargets();
    }
});

var introMusic = new Audio();
introMusic.src = "assets/audio/273539__tristan-lohengrin__8bit-introduction.wav";
introMusic.volume = 1.0;

var hitSound = new Audio();
hitSound.src = "assets/audio/431329__someguy22__8-bit-powerup.wav";
hitSound.volume = 1.0;

var gameTheme = new Audio();
gameTheme.src = "assets/audio/Mecha Collection.mp3";
gameTheme.volume = 1.0;



// Themes 


// toggles the theme  by adding a local storage item, used on page load to determine whether to load the light or dark theme 

function lightSwitch() {
    localStorage.setItem("theme", "light");
    $("body").css("background-color", "#ffdede");
    $("#darkModeToggle").removeClass("btn-success").addClass("btn-secondary");
    $("#lightModeToggle").removeClass("btn-secondary").addClass("btn-success");
    $("#rules-color").addClass("rules-info-light");
    $(".settings-containers").addClass("settings-containers-light");
    $(".header-game-mode").removeClass("white");
    $(".game-area").addClass("game-area-light");
    $(".index-header").addClass("index-header-light");
    $(".about-para").removeClass("white");
    $(".rules-header").removeClass("white");
    $("#player-user").addClass("user-name-light");
    $(".stat-hits").addClass("btn-success").removeClass("stat-hits").addClass("stat-hits-light");
    $(".stat-missed").addClass("btn-danger").removeClass("stat-missed").addClass("stat-missed-light");
    $(".high-score").addClass("high-score-light");
    $("#stats-header").removeClass("white");
    $(".stat-user").removeClass("stat-user").addClass("stat-user-light");
    $(".stat-accuracy").removeClass("stat-accuracy").addClass("stat-accuracy-light");
};


function darkSwitch() {
    localStorage.setItem("theme", "dark");
    $("body").css("background-color", "");
    $("#lightModeToggle").removeClass("btn-success").addClass("btn-secondary");
    $("#darkModeToggle").removeClass("btn-secondary").addClass("btn-success");
    $("#rules-color").removeClass("rules-info-light");
    $(".settings-containers").removeClass("settings-containers-light");
    $(".header-game-mode").addClass("white");
    $(".game-area").removeClass("game-area-light");
    $(".index-header").removeClass("index-header-light");
    $(".about-para").addClass("white");
    $(".rules-header").addClass("white");
    $("#player-user").removeClass("user-name-light")
    $(".stat-hits-light").removeClass("btn-success").addClass("stat-hits").removeClass("stat-hits-light");
    $(".stat-missed-light").removeClass("btn-danger").addClass("stat-missed").removeClass("stat-missed-light");
    $(".high-score-light").removeClass("high-score-light");
    $("#stats-header").addClass("white");
    $(".stat-user-light").addClass("stat-user").removeClass("stat-user-light");
    $(".stat-accuracy-light").addClass("stat-accuracy").removeClass("stat-accuracy-light");
};



// audio toggle 


// toggles volume off and on , again using local stoarge to store the audio state across both pages. Checks local storage item to
// determine what audio function to call 

function audioOff() {
    localStorage.setItem("audio", "off");

    $("#audioOff").removeClass("btn-secondary").addClass("btn-danger");
    $("#audioOn").removeClass("btn-success").addClass("btn-secondary");
    hitSound.volume = 0;
    introMusic.volume = 0;
    gameTheme.volume = 0;
};


function audioOn() {
    localStorage.setItem("audio", "on");

    $("#audioOff").addClass("btn-secondary").removeClass("btn-danger");
    $("#audioOn").addClass("btn-success").removeClass("btn-secondary");


    introMusic.volume = 0.09;
    hitSound.volume = 0.09;
    gameTheme.volume = 0.09;
};


//dificulty toggle that uses local storage to store the difficulty state and apply it across both pages,
// if statment called in the document ready function determines what to call 



function difficultyPro() {
    localStorage.setItem("difficulty", "pro");

    $("#pro").addClass("btn-success").removeClass("btn-secondary");
    $("#beginner").removeClass("btn-success").addClass("btn-secondary");
    $("#extreme").removeClass("btn-success").addClass("btn-secondary");
};


function difficultyBeginner() {
    localStorage.setItem("difficulty", "beginner");

    $("#beginner").addClass("btn-success").removeClass("btn-secondary");
    $("#pro").addClass("btn-secondary").removeClass("btn-success");
    $("#extreme").removeClass("btn-success").addClass("btn-secondary");
};

 
function difficultyExtreme(){
localStorage.setItem("difficulty", "extreme")

$("#extreme").addClass("btn-success").removeClass("btn-secondary");
$("#beginner").addClass("btn-secondary").removeClass("btn-success");
$("#pro").addClass("btn-secondary").removeClass("btn-success");

};

//target toggle that uses local storage to store the target state and apply it across both pages,
// if statment called in the document ready function determines what to call 


function alienTargets() {
    localStorage.setItem("target", "alien");

    $("#alienToggle").addClass("btn-success").removeClass("btn-secondary");
    $("#fruitToggle").removeClass("btn-success").addClass("btn-secondary");
};


function fruitTargets() {
    localStorage.setItem("target", "fruit");

    $("#fruitToggle").addClass("btn-success").removeClass("btn-secondary");
    $("#alienToggle").addClass("btn-secondary").removeClass("btn-success");
};
