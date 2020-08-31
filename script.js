// My variables

var beginQuizBtn = document.getElementById("beginBtn");
var endGameSection = document.getElementById("endgame");
var welcomeMsgSection = document.getElementById("welcomeMsg");
var questionsSection = document.getElementById("questionsDisplayed");
var quizContent = document.getElementById("quizActual");
var quizTimer = document.getElementById("timer");
var highScoreName = document.getElementById("initials");
var highScoreSection = document.getElementById("highScoreSection");
var resultScore = document.getElementById("result");
var submitScore = document.getElementById("submitScore");
var highScorePage = document.getElementById("highScorePage");
var highScoreInitials = document.getElementById("highScoreInitials");
var highScore = document.getElementById("highScore");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");
var button5 = document.getElementById("5");

// Questions

var questions = [
    {
        qStatement: "In JavaScript, what is a script defined as?",
        choice1: "Text that displays on a webpage",
        choice2: "An unordered collection of data",
        choice3: "A collection of properties",
        choice4: "A series of instructions",
        choice5: "None of the above",
        answer: "4"
    },

    {
        qStatement: "What is the function NaN used for?",
        choice1: "An object from where it was called",
        choice2: "It determines whether a value is not-a-number",
        choice3: "This function is used to represent a boolean value",
        choice4: "It determines whether a value is not-a-name",
        choice5: "None of the above",
        answer: "2"
    },

    {
        qStatement: "What symbol is used to create single-line comments in JavaScript?",
        choice1: "&&",
        choice2: "//",
        choice3: "$",
        choice4: "||",
        choice5: "None of the above",
        answer: "2"
    },

    {
        qStatement: "Who designed and created JavaScript?",
        choice1: "Jason Lee Scott",
        choice2: "Jeremy Clarkson",
        choice3: "Brendan Eich",
        choice4: "Elon Musk",
        choice5: "None of the above",
        answer: "3"
    },

    {
        qStatement: "In JavaScript, what does a null value represent?",
        choice1: "No value or object",
        choice2: "Negative value",
        choice3: "Return value",
        choice4: "Positive value",
        choice5: "None of the above",
        answer: "1"
    },

    {
        qStatement: "Which of the following is not a JavaScript data type?",
        choice1: "Object",
        choice2: "Boolean value",
        choice3: "Undefined",
        choice4: "Element",
        choice5: "String",
        answer: "4"
    },

    {
        qStatement: "Which company developed JavaScript in 1995?",
        choice1: "Code Academy",
        choice2: "AOL",
        choice3: "REI",
        choice4: "Microsoft",
        choice5: "None of the above",
        answer: "5"
    },

    {
        qStatement: "From the choices below, what is a type of pop-up in JavaScript?",
        choice1: "New",
        choice2: "Alert",
        choice3: "Active",
        choice4: "Appear",
        choice5: "Message",
        answer: "2"
    },

];

var finalQuestion = questions.length;
var activeQuestion = 0;
var correct;
var score = 0;
var timeRemaining = 61;
var timerInterval;

function displayQuizQuestion() {
    endGameSection.style.display = "none";
    if (activeQuestion === finalQuestion) {
        return displayScore();
    }
    var activeqStatement = questions[activeQuestion];
    questionsSection.innerHTML = "<p>" + activeqStatement.qStatement + "</p>";
    button1.innerHTML = activeqStatement.choice1;
    button2.innerHTML = activeqStatement.choice2;
    button3.innerHTML = activeqStatement.choice3;
    button4.innerHTML = activeqStatement.choice4;
    button5.innerHTML = activeqStatement.choice5;
};

function beginQuiz() {
    endGameSection.style.display = "none";
    welcomeMsgSection.style.display = "none";
    displayQuizQuestion();

    // My timer

    timerInterval = setInterval(function () {
        timeRemaining--;
        quizTimer.textContent = "Time remaining: " + timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            displayScore();
        }
    }, 1000);

    quizContent.style.display = "block";
}

// After last question

function displayScore() {
    quizContent.style.display = "none";
    endGameSection.style.display = "block";
    clearInterval(timerInterval);
    highScoreName.value = "";
    resultScore.innerHTML = "Your score is " + score + " out of " + questions.length + ".";
}

submitScore.addEventListener("click", function highscore() {
    if (highScoreName.value === "") {
        alert("Please enter your initials.");
        return false;
    } else {
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        var current = highScoreName.value.trim();
        var currentScore = {
            name: current,
            score: score
        };

        endGameSection.style.display = "none";
        highScoreSection.style.display = "flex";
        highScorePage.style.display = "block";

        savedScores.push(currentScore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        loadHighScores();

    }
});

function loadHighScores() {
    highScoreInitials.innerHTML = "";
    highScore.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i = 0; i < highScores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highScores[i].name;
        newScore.textContent = highScores[i].score;
        highScoreInitials.appendChild(newName);
        highScore.appendChild(newScore);
    }
}

function displayHighScore() {
    welcomeMsgSection.style.display = "none";
    endGameSection.style.display = "none";
    highScoreSection.style.display = "flex";
    highScorePage.style.display = "block";

    loadHighScores();
}

function answerCheck(answer) {
    correct = questions[activeQuestion].answer;

    if (answer === correct && activeQuestion !== finalQuestion) {
        score++;
        activeQuestion++;
        displayQuizQuestion();
    } else if (answer !== correct && activeQuestion !== finalQuestion) {
        timeRemaining = timeRemaining - 10;
        activeQuestion++;
        displayQuizQuestion();
    }
}

beginQuizBtn.addEventListener("click", beginQuiz);