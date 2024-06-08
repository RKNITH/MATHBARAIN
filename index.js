const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const skipBtn = document.querySelector('.skipBtn');
const checkBtn = document.querySelector('.checkBtn');
const submitBtn = document.querySelector('.submitBtn');
const userAnswerInput = document.getElementById('userAnswer');

let currentProblem = null;
let score = 0;
let totalQuestions = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

// Function to generate a random number between min and max (inclusive)
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate a random math problem
const generateProblem = () => {
    const num1 = getRandomNumber(1, 10);
    const num2 = getRandomNumber(1, 10);
    const num3 = getRandomNumber(1, 10);
    const operators = ['+', '-', 'x', '÷'];
    const operator1 = operators[getRandomNumber(0, operators.length - 1)];
    const operator2 = operators[getRandomNumber(0, operators.length - 1)];
    let question, answer;

    // Randomly choose between a simple calculation problem and a BODMAS problem
    if (getRandomNumber(0, 1) === 0) {
        // Simple calculation problem
        question = `${num1} ${operator1} ${num2}`;
        answer = evaluateSimpleExpression(num1, num2, operator1);
    } else {
        // BODMAS problem
        switch (getRandomNumber(1, 3)) {
            case 1:
                question = `(${num1} ${operator1} ${num2}) ${operator2} ${num3}`;
                answer = evaluateExpression(num1, num2, num3, operator1, operator2);
                break;
            case 2:
                question = `${num1} ${operator1} (${num2} ${operator2} ${num3})`;
                answer = evaluateExpression(num1, num2, num3, operator2, operator1);
                break;
            case 3:
                question = `${num1} ${operator1} ${num2} ${operator2} ${num3}`;
                answer = evaluateExpression(num1, num2, num3, operator1, operator2);
                break;
        }
    }

    return { question, answer };
};

const evaluateSimpleExpression = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '÷':
            return num1 / num2;
        default:
            return NaN; // Invalid operator
    }
};

const evaluateExpression = (num1, num2, num3, operator1, operator2) => {
    const result1 = performOperation(num1, num2, operator1);
    return performOperation(result1, num3, operator2);
};

const performOperation = (operand1, operand2, operator) => {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case 'x':
            return operand1 * operand2;
        case '÷':
            return operand1 / operand2;
        default:
            return NaN; // Invalid operator
    }
};

// Function to display a new math problem
const showProblem = () => {
    currentProblem = generateProblem();
    questionBox.textContent = currentProblem.question;
};

// Function to check the user's answer
const checkAnswer = () => {
    const userAnswer = parseFloat(userAnswerInput.value); // Parse input as float
    const roundedAnswer = Math.round(userAnswer * 10) / 10; // Round to 1 decimal point
    if (roundedAnswer === currentProblem.answer) {
        displayAlert("Correct answer!");
        score++;
    } else {
        displayAlert(`Wrong answer! The correct answer is ${currentProblem.answer}`);
    }

    totalQuestions++;
    timeLeft = 15;
    userAnswerInput.value = '';
    showProblem();
    updateScoreCard();
};

// Function to update the score card
const updateScoreCard = () => {
    scoreCard.textContent = `Score: ${score} / ${totalQuestions}`;
};

// Function to display an alert message
const displayAlert = (msg) => {
    alert.style.display = 'block';
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000);
};

// Function to start the timer
const startTimer = () => {
    clearInterval(timerId);
    timeLeft = 15;
    timer.textContent = timeLeft;
    timerId = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerId);
            displayAlert("Time's up!");
            setTimeout(() => {
                totalQuestions++;
                updateScoreCard();
                showProblem();
                startTimer();
            }, 2000);
        }
    }, 1000);
};

// Event listeners
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    container.style.display = 'block';
    showProblem();
    startTimer();
    updateScoreCard();
});

nextBtn.addEventListener('click', () => {
    if (!quizOver) {
        checkAnswer();
    } else {
        scoreCard.textContent = `Your final score: ${score} / ${totalQuestions}`;
        scoreCard.style.display = 'block';
    }
});

// Function to skip the current question
const skipQuestion = () => {
    if (!quizOver) {
        displayAlert("Question skipped!");
        totalQuestions++;
        showProblem();
        updateScoreCard();
    }
};

// Add event listener for skip button click
skipBtn.addEventListener('click', skipQuestion);


checkBtn.addEventListener('click', () => {
    if (!quizOver) {
        checkAnswer();
    }
});
