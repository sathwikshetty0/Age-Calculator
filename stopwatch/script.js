let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

function startTimer() {
    if (running) return;
    running = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
}

function stopTimer() {
    if (!running) return;
    running = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 1;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("laps-list").innerHTML = "";
}

function recordLap() {
    if (!running) return;
    const lapTime = document.getElementById("display").innerText;
    const li = document.createElement("li");
    li.innerHTML = `<span>Lap ${lapCounter}</span> <span>${lapTime}</span>`;

    // Prepend to show newest first
    const list = document.getElementById("laps-list");
    list.insertBefore(li, list.firstChild);

    lapCounter++;
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;

    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');

    document.getElementById("display").innerText = `${minutes}:${seconds}:${milliseconds}`;
}
