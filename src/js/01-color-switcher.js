
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

function start() {
    startBtn.disabled = true;

    // change background immediately, then run interval
    updateBodyBackground();

    timerId = setInterval(() => {
        updateBodyBackground();
    }, 1000);
};


function stop() {
    startBtn.disabled = false;

    clearInterval(timerId);
};

function updateBodyBackground() {
    document.body.style.background = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

