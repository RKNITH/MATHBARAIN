const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const skipBtn = document.querySelector('.skipBtn');
const checkBtn = document.querySelector('.checkBtn');
const userAnswerInput = document.getElementById('userAnswer');
const num = document.getElementById('num')

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
    const num = getRandomNumber(1, 20);
    const operators = ['odd', 'even', 'prime'];
    const operator1 = operators[getRandomNumber(0, operators.length - 1)];
    let question, answer;

    switch (operator1) {
        case 'odd':
            question = `Is ${num} odd?`;
            answer = num % 2 !== 0;
            break;
        case 'even':
            question = `Is ${num} even?`;
            answer = num % 2 === 0;
            break;
        case 'prime':
            question = `Is ${num} a prime number?`;
            answer = isPrime(num);
            break;
    }

    return { question, answer };
};

// Function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};

// Function to display a new math problem
const showProblem = () => {
    currentProblem = generateProblem();
    questionBox.textContent = currentProblem.question;
};

// Function to check the user's answer
const checkAnswer = () => {
    const userAnswer = userAnswerInput.value.toLowerCase(); // Convert answer to lowercase for case-insensitivity
    const correctAnswer = currentProblem.answer ? "yes" : "no"; // Convert boolean answer to "yes" or "no"

    if (userAnswer === correctAnswer) {
        displayAlert("Correct answer!");
        score++;
    } else {
        displayAlert("Wrong answer!");
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
    num.style.display = 'none'
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

// checkBtn.addEventListener('click', () => {
//     if (!quizOver) {
//         checkAnswer();
//     }
// });

//
//
// ADDING CODE TO SHOW INFO ABOUT NUMBER.
// Event listener for number categories


// Event listener for number categories
num.addEventListener('click', (event) => {
    const selectedNumber = event.target.textContent.trim();

    // Check which number category is selected and open the corresponding HTML file
    switch (selectedNumber) {
        case 'Odd Numbers':
            openNumberInfoPage('odd.html');
            break;
        case 'Even Numbers':
            openNumberInfoPage('even.html');
            break;
        case 'Prime Numbers':
            openNumberInfoPage('prime.html');
            break;
        case 'Fibonacci Numbers':
            openNumberInfoPage('fibonacci.html');
            break;
        case 'Binary Numbers':
            openNumberInfoPage('binary.html');
            break;
        case 'Bernoulli Numbers':
            openNumberInfoPage('bernoulli.html');
            break;
        case 'Composite Numbers':
            openNumberInfoPage('composite.html');
            break;
        case 'Factorial Numbers':
            openNumberInfoPage('factorial.html');
            break;
        case 'Fermat Numbers':
            openNumberInfoPage('fermat.html');
            break;
        case 'Perfect Numbers':
            openNumberInfoPage('perfect.html');
            break;
        case 'Pythagorean Triples':
            openNumberInfoPage('pythagorean.html');
            break;
        case 'Catalan Numbers':
            openNumberInfoPage('catalan.html');
            break;
        case 'Cardinal Numbers':
            openNumberInfoPage('cardinal.html');
            break;
        case 'Centered Polygonal Numbers':
            openNumberInfoPage('centered_polygonal.html');
            break;
        case 'Einstein Numbers':
            openNumberInfoPage('einstein.html');
            break;
        case 'Evil Numbers':
            openNumberInfoPage('evil.html');
            break;
        case 'Gaussian Numbers':
            openNumberInfoPage('gaussian.html');
            break;
        case 'Triangular Numbers':
            openNumberInfoPage('triangular.html');
            break;
        case 'Transcendental Numbers':
            openNumberInfoPage('transcendental.html');
            break;
    }
});

// Function to open the HTML file with information about numbers
const openNumberInfoPage = (filePath) => {
    // Define the URL to the HTML file for the number category using the local server
    const url = `http://localhost:8080/${filePath}`;

    // Open the HTML file in a new tab
    window.open(url, '_blank');
};
