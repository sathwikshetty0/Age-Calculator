const games = [
    { name: "Iron Man", category: "Superheroes", hint: "A billionaire with a high-tech suit." },
    { name: "Python", category: "Programming Languages", hint: "Named after a British comedy group, not a snake." },
    { name: "Paris", category: "Cities", hint: "Known as the City of Light." },
    { name: "Lion", category: "Animals", hint: "The king of the jungle." },
    { name: "Minecraft", category: "Video Games", hint: "A world made of blocks." },
    { name: "Saturn", category: "Planets", hint: "Famous for its beautiful rings." }
];

let currentGame = null;

function initGame() {
    // Pick a random game
    const randomIndex = Math.floor(Math.random() * games.length);
    currentGame = games[randomIndex];

    // Update UI
    document.getElementById('category-display').textContent = `Category: ${currentGame.category}`;
    document.getElementById('hint-text').textContent = ""; // Clear hint
    document.getElementById('result-message').textContent = "";
    document.getElementById('result-message').className = "";
    document.getElementById('name-input').value = "";
    document.getElementById('hint-container').style.display = "none";
}

function showHint() {
    const hintContainer = document.getElementById('hint-container');
    const hintText = document.getElementById('hint-text');
    hintText.textContent = currentGame.hint;
    hintContainer.style.display = "block";
}

function checkName() {
    const input = document.getElementById('name-input');
    const msg = document.getElementById('result-message');
    const guess = input.value.trim();

    if (!guess) {
        msg.textContent = "Please enter a name!";
        msg.className = "error";
        return;
    }

    if (guess.toLowerCase() === currentGame.name.toLowerCase()) {
        msg.textContent = `🎉 Correct! The answer was ${currentGame.name}.`;
        msg.className = "success";
        // Optionally wait and restart
        setTimeout(() => {
            msg.textContent += " Starting new game...";
            setTimeout(initGame, 2000);
        }, 1500);
    } else {
        msg.textContent = "❌ Wrong name. Try again or check the hint!";
        msg.className = "error";
    }
}

// Start game on load
initGame();
