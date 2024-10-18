$(document).ready(function () {
    if(localStorage.getItem("difficulty") == undefined){
        localStorage.setItem("difficulty","pro")
    };

    if (localStorage.getItem("theme") == undefined){
        localStorage.setItem("theme", "dark")
    };

    if (localStorage.getItem("target") == undefined){
        localStorage.setItem('target', "alien")
    };

    if (localStorage.getItem("audio") == undefined){
        localStorage.setItem("audio", "off")
    };
    $("#player-name-intro").val(localStorage.getItem("playerName"))
    
    $('#userNameModal').modal({
        backdrop: 'static',
        keyboard: false
    });

    setTimeout(function () {
        introMusic.play();
    }, 1500);

    setInterval(() => {
        targetSpawner();
    }, 1000);
    console.log("ready!");
});






function targetSpawner() {
    killSwitch();
    var numberGen = Math.floor((Math.random() * 132) + 1);
    var spawnPoint = "#spawn-point-".concat(numberGen);
    $(spawnPoint).append('<div class="intro-target" id="targetIcon"> <i class="fas fa-bullseye target"></i></div>');
}

function killSwitch() {
    $("#targetIcon").remove();

};


function userNameModal() {
    playerName = $('#player-name-intro').val();
    localStorage.setItem('playerName', playerName);
};