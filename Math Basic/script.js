let correctAnswer = 0;
let score = 0;
let stars = 0;
let currentMode = "";
let sortingNumbers = [];

function startAddition() {
  currentMode = "addition";
  generateAddition();
}

function startSubtraction() {
  currentMode = "subtraction";
  generateSubtraction();
}

function startSorting() {
  currentMode = "sorting";
  generateSorting();
}

function generateAddition() {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  correctAnswer = num1 + num2;
  document.getElementById("question").innerText = `${num1} + ${num2} = ?`;
  clearInputAndFeedback();
}

function generateSubtraction() {
  let num1 = Math.floor(Math.random() * 10) + 5;
  let num2 = Math.floor(Math.random() * 5);
  correctAnswer = num1 - num2;
  document.getElementById("question").innerText = `${num1} - ${num2} = ?`;
  clearInputAndFeedback();
}

function generateSorting() {
  document.getElementById("question").innerText = "Click numbers in order (small to big)";
  document.getElementById("sorting-area").innerHTML = "";
  document.getElementById("input-area").style.display = "none";
  document.getElementById("next-btn").style.display = "none";

  sortingNumbers = [];
  for (let i = 0; i < 5; i++) {
    sortingNumbers.push(Math.floor(Math.random() * 20));
  }
  sortingNumbers.sort((a, b) => a - b); // sorted for reference

  let shuffled = [...sortingNumbers].sort(() => Math.random() - 0.5);
  shuffled.forEach(num => {
    let btn = document.createElement("button");
    btn.innerText = num;
    btn.onclick = () => checkSortingAnswer(num, btn);
    document.getElementById("sorting-area").appendChild(btn);
  });
}

let sortingIndex = 0;

function checkSortingAnswer(num, button) {
  if (num === sortingNumbers[sortingIndex]) {
    button.style.backgroundColor = "#6bcf63";
    sortingIndex++;
    if (sortingIndex === sortingNumbers.length) {
      document.getElementById("feedback").innerText = "🎉 Sorted Correctly!";
      score++;
      stars++;
      updateScore();
      document.getElementById("next-btn").style.display = "block";
    }
  } else {
    document.getElementById("feedback").innerText = "❌ Wrong order!";
  }
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (isNaN(userAnswer)) {
    document.getElementById("feedback").innerText = "❗ Enter a number!";
    return;
  }

  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").innerText = "🎉 Correct!";
    score++;
    stars++;
  } else {
    document.getElementById("feedback").innerText = "😢 Try Again!";
  }
  updateScore();
}

function nextQuestion() {
  if (currentMode === "addition") generateAddition();
  if (currentMode === "subtraction") generateSubtraction();
  if (currentMode === "sorting") {
    sortingIndex = 0;
    generateSorting();
  }
}

function updateScore() {
  document.getElementById("score").innerText = score;
  document.getElementById("stars").innerText = stars;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  document.getElementById("high-score").innerText = highScore;
}

let countingItems = [];
let correctCount = 0;

function startCounting() {
  currentMode = "counting";
  generateCounting();
}

function generateCounting() {
  document.getElementById("question").innerText = "Count how many items and enter number!";
  document.getElementById("sorting-area").innerHTML = "";
  document.getElementById("counting-area").innerHTML = "";
  document.getElementById("input-area").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  document.getElementById("feedback").innerText = "";

  countingItems = ["🍎", "🐻", "⭐", "🎈", "🍬"];
  let randomItem = countingItems[Math.floor(Math.random() * countingItems.length)];

  correctCount = Math.floor(Math.random() * 6) + 3; // 3 to 8 items

  for (let i = 0; i < correctCount; i++) {
    let span = document.createElement("span");
    span.innerText = randomItem;
    span.style.fontSize = "40px";
    span.style.margin = "5px";
    document.getElementById("counting-area").appendChild(span);
  }
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (isNaN(userAnswer)) {
    document.getElementById("feedback").innerText = "❗ Enter a number!";
    return;
  }

  if (currentMode === "counting") {
    if (userAnswer === correctCount) {
      document.getElementById("feedback").innerText = "🎉 Correct!";
      score++;
      stars++;
    } else {
      document.getElementById("feedback").innerText = "😢 Try Again!";
    }
    updateScore();
    return;
  }

  // for addition and subtraction
  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").innerText = "🎉 Correct!";
    score++;
    stars++;
  } else {
    document.getElementById("feedback").innerText = "😢 Try Again!";
  }
  updateScore();
}

function nextQuestion() {
  if (currentMode === "addition") generateAddition();
  if (currentMode === "subtraction") generateSubtraction();
  if (currentMode === "sorting") {
    sortingIndex = 0;
    generateSorting();
  }
  if (currentMode === "counting") generateCounting();
}
let highScore = localStorage.getItem("highScore") || 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("high-score").innerText = highScore;
});


