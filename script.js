let timeLeft = 20;
let timer;
let correctAnswer;

const getQuestion = async () => {
    try {
        const response = await fetch('https://math.tools/api/numbers/fact/random');
        const data = await response.json();
        setQuestion(data);
    } catch (error) {
        showError('Failed to load question.');
        console.error('Error fetching question:', error);
    }
};

const setQuestion = (data) => {
    const questionText = `What is ${data.question}?`;
    correctAnswer = data.answer;
    document.getElementById('question').textContent = questionText;
    startTimer();
};

const startTimer = () => {
    timer = setInterval(countdown, 1000);
};

const countdown = () => {
    if (timeLeft <= 0) {
        endGame('Time is up!');
        return;
    }
    document.getElementById('time').textContent = timeLeft;
    timeLeft -= 1;
};

const checkAnswer = () => {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        endGame('Correct!');
    } else {
        endGame('Wrong answer!');
    }
};

const endGame = (message) => {
    clearInterval(timer);
    document.getElementById('submit').disabled = true;
    document.getElementById('result').textContent = message;
};

const showError = (message) => {
    document.getElementById('result').textContent = '';
    const errorDiv = document.getElementById('error');
    if (!errorDiv) {
        const newErrorDiv = document.createElement('div');
        newErrorDiv.id = 'error';
        newErrorDiv.textContent = message;
        document.querySelector('.container').appendChild(newErrorDiv);
    } else {
        errorDiv.textContent = message;
    }
};

getQuestion();