const canvas = document.getElementById("dartboard");
const ctx = canvas.getContext("2d");
const scoresList = document.getElementById("scores");
const clearBoardButton = document.getElementById("clearBoard");
const clearScoreButton = document.getElementById("clearScore");

// resize making it compatible with mobile
function resizeCanvas() {
    const maxSize = Math.min(window.innerWidth * 0.90, window.innerHeight * 0.90);
    canvas.width = maxSize;
    canvas.height = maxSize;
}

// Resize the canvas whenever the window resizes
window.addEventListener("resize", resizeCanvas);

// Set canvas size
const dartboardSize = window.innerHeight * 0.90;
canvas.width = dartboardSize;
canvas.height = canvas.width;

let darts = [
    { x: canvas.width / 2, y: canvas.width - (canvas.width / 8), targetX: canvas.width / 2, targetY: canvas.width - (canvas.width / 8), moving: false, color: 'red' },
    { x: canvas.width / 2, y: canvas.width - (canvas.width / 8), targetX: canvas.width / 2, targetY: canvas.width - (canvas.width / 8), moving: false, color: 'green' },
    { x: canvas.width / 2, y: canvas.width - (canvas.width / 8), targetX: canvas.width / 2, targetY: canvas.width - (canvas.width / 8), moving: false, color: 'blue' }
];

let scores = JSON.parse(localStorage.getItem("dartScores")) || [];
let throwsRemaining = 3;

function getDartboardRadius() {
    return canvas.width / 2;
}

function getScoringAreas() {
    const radius = getDartboardRadius();

    return {
        bullseye: radius * 4 / 100, // 8 radius
        outerBullseye: radius * 8 / 100, // 16 radius
        firstSingleScore: radius * 45 / 100, // 90 radius
        triple: radius * 52.5 / 100, // 105 radius
        secondSingleScore: radius * 79.5 / 100, // 159 radius
        double: radius * 79.5 / 100, // 171 radius
        deadSpace: radius * 85.5 / 100 // 195 radius
    };
}

const dartboardAreas = getScoringAreas();

function drawDarts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    darts.forEach((dart, index) => {
        if (index > 3 - throwsRemaining) return; // Show only thrown darts and the next one

        ctx.save();

        // Calculate angle towards the mouse position
        let angle = Math.atan2(dart.targetY - dart.y, dart.targetX - dart.x);

        ctx.translate(dart.x, dart.y);
        ctx.rotate(angle); // Rotate so the tip points at the target

        // Draw dart shaft (cylinder-like body)
        ctx.fillStyle = dart.color;
        const dartHeight = canvas.width / 20;
        const dartWidth = canvas.width / 100;
        ctx.fillRect(-dartHeight, -dartWidth / 2, dartHeight, dartWidth);

        // Draw dart tip
        ctx.fillStyle = "silver";
        ctx.beginPath();
        ctx.moveTo(dartHeight / 5, 0);
        ctx.lineTo(0, dartWidth / 2);
        ctx.lineTo(0, dartWidth / -2);
        ctx.fill();

        ctx.restore();
    });
}

function update() {
    darts.forEach(dart => {
        if (dart.moving) {
            dart.x += (dart.targetX - dart.x) * 0.075;
            dart.y += (dart.targetY - dart.y) * 0.075;

            if (Math.abs(dart.x - dart.targetX) < 1 && Math.abs(dart.y - dart.targetY) < 1) {
                dart.x = dart.targetX;
                dart.y = dart.targetY;
                dart.moving = false;
                calculateScore(dart.x, dart.y);
            }
        }
    });

    drawDarts();
    requestAnimationFrame(update);
}

function calculateScore(x, y) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let dx = x - centerX;
    let dy = y - centerY;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 180;

    // Calculate the section index based on angle (0 to 360 degrees)
    let sectionIndex = Math.floor((angle + 9) / 18) % 20;

    // Define the scores for each 18-degree segment (dartboard numbers)s
    const dartboardNumbers = [11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8];
    let baseScore = dartboardNumbers[sectionIndex];

    let score = 0;

    // Calculate score based on dart's distance from the center and sector
    if (distance < dartboardAreas.bullseye) {
        score = 50; // Bullseye
    } else if (distance >= dartboardAreas.bullseye && distance < dartboardAreas.outerBullseye) {
        score = 25; // Outer bullseye
    } else if (distance >= dartboardAreas.outerBullseye && distance < dartboardAreas.firstSingleScore) {
        score = baseScore; // First single score area
    } else if (distance >= dartboardAreas.firstSingleScore && distance < dartboardAreas.triple) {
        score = baseScore * 3; // Triple area
    } else if (distance >= dartboardAreas.triple && distance < dartboardAreas.secondSingleScore) {
        score = baseScore; // Second single score area (between 105 and 159 radius)
    } else if (distance >= dartboardAreas.secondSingleScore && distance < dartboardAreas.double) {
        score = baseScore; // Second single score area (from 159 to 171 radius)
    } else if (distance >= dartboardAreas.double && distance < dartboardAreas.deadSpace) {
        score = baseScore * 2; // Double area
    } else if (distance >= dartboardAreas.deadSpace) {
        score = 0; // Dead space
    }

    // Store the score and update the scoreboard
    scores.push(score);
    localStorage.setItem("dartScores", JSON.stringify(scores));
    updateScoreboard();
}


function updateScoreboard() {
    // Clear the current scores list
    scoresList.innerHTML = "";

    // Set initial score (301) and subtract from it based on the scores array
    let totalScore = 301;

    // Create and append the list items
    scores.forEach((score, index) => {
        let li = document.createElement("li");
        li.textContent = `${score} points`;
        scoresList.appendChild(li);

        // Decrease totalScore based on each score
        totalScore -= score;
    });

    // Ensure only one 'sum' div exists and place it after the last <li> element
    let sumDiv = document.querySelector(".sum");

    // If the sum div doesn't exist, create it
    if (!sumDiv) {
        sumDiv = document.createElement("div");
        sumDiv.classList.add("sum");
    }

    // Update the text content of the sum div to show the remaining score
    if (totalScore === 0 || totalScore > 0) {
        sumDiv.textContent = `Score: ${totalScore} points`;
    } else {
        sumDiv.textContent = `Bust!`;
    }

    // Append the sum div at the end of the scores list
    scoresList.appendChild(sumDiv);
}

canvas.addEventListener("mousemove", (e) => {
    if (throwsRemaining > 0) {
        const rect = canvas.getBoundingClientRect();
        console.log('Mouse Position:', e.clientX, e.clientY);
        console.log('Canvas Position:', rect.left, rect.top);
        let dart = darts[3 - throwsRemaining];
        dart.targetX = e.clientX - rect.left;
        dart.targetY = e.clientY - rect.top;
    }
});

canvas.addEventListener("click", (e) => {
    if (throwsRemaining > 0) {
        const rect = canvas.getBoundingClientRect();
        let dart = darts[3 - throwsRemaining];

        if (!dart.moving) {
            dart.moving = true;
            dart.targetX = e.clientX - rect.left;
            dart.targetY = e.clientY - rect.top;
            throwsRemaining--;
        }
    }
});

clearBoardButton.addEventListener("click", () => {
    throwsRemaining = 3;

    darts.forEach(dart => {
        dart.x = canvas.width / 2;
        dart.y = canvas.width - (canvas.width / 8);
        dart.targetX = canvas.width / 2;
        dart.targetY = canvas.width - (canvas.width / 8);
        dart.moving = false;
    });
});

clearScoreButton.addEventListener("click", () => {
    scores = [];
    sum = [];
    localStorage.removeItem("dartScores");
    localStorage.removeItem("dartScores");
    updateScoreboard();
});

resizeCanvas();
update();
updateScoreboard();