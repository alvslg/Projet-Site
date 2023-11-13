alert('Bienvenu dans notre test de temps de réaction');

let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let startCount = 0;

function startStop() { // Cette fonction permet de démarrer et de faire le test
    if (isRunning) { // Si le bouton Démarrer a été appuyé
        clearInterval(timer);
        document.getElementById("startStopButton").textContent = "Démarrer"; 
        document.getElementById("startStopButton").classList.remove("running"); // Enlève la couleur blanche
        document.getElementById("startStopButton").classList.add("stopped"); // La remplace par la couleur rouge
        document.getElementById("chronometer").classList.remove("black-text"); // 
        document.getElementById("chronometer").classList.add("white-text"); // Cache le chronomètre
    } else { // Si le bouton Arrêter est appuyé
        document.getElementById("startStopButton").classList.remove("stopped");
        document.getElementById("startStopButton").classList.add("running");
        document.getElementById("chronometer").classList.remove("white-text"); // Fait apparaître le
        document.getElementById("chronometer").classList.add("black-text"); // cache le chrono
        timer = setInterval(updateChronometer, 10);
        document.getElementById("startStopButton").textContent = "Arrêter";

        // Incrémenter le compteur de démarrage
        startCount++;

        // Défini un temps aléatoire entre 1 et 5 secondes avant de passer au vert
        const randomDelay = Math.floor(Math.random() * 5000) + 1000; // Entre 1 et 5 secondes
        setTimeout(() => {
            document.getElementById("startStopButton").classList.remove("running");
            document.getElementById("startStopButton").classList.add("stopped");
            document.getElementById("chronometer").classList.add("visible");
            document.getElementById("chronometer").classList.remove("black-text");
            document.getElementById("chronometer").classList.add("white-text");
            resetChronometer();
            startStopAuto();
        }, randomDelay);
    }
    isRunning = !isRunning;
}


function updateChronometer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById("chronometer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : ''}${milliseconds}`;
}

function resetChronometer() {
    clearInterval(timer);
    document.getElementById("chronometer").textContent = '0:00:000';
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    isRunning = false;
    document.getElementById("startStopButton").textContent = "Démarrer";
}

function startStopAuto() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStopButton").textContent = "Démarrer";
        document.getElementById("startStopButton").classList.remove("running");
        document.getElementById("startStopButton").classList.add("stopped");
    } else {
        document.getElementById("startStopButton").textContent = "Arrêter";
        document.getElementById("startStopButton").classList.remove("stopped");
        document.getElementById("startStopButton").classList.add("stopped");
        timer = setInterval(updateChronometer, 10);
    }
    isRunning = !isRunning;
}

function checkTimeOnManualStop() {
    if (!isRunning && startCount === 2 && milliseconds > 500) {
        alert("Nul");
    }
}

document.getElementById("startStopButton").addEventListener("click", startStop);
document.getElementById("resetButton").addEventListener("click", resetChronometer);

