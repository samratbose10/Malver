let timeLeft = 20;
let timer;
let correctAnswer;

const getQuestion = () => {
    const question = generateMathQuestion();
    setQuestion(question);
};

const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const questionText = `What is ${num1} + ${num2}?`;
    const answer = num1 + num2;
    return { question: questionText, answer: answer };
};

const setQuestion = (data) => {
    const questionText = data.question;
    correctAnswer = data.answer;
    document.getElementById('question').textContent = questionText;
    document.getElementById('answer').value = '';
    document.getElementById('submit').disabled = false;
    document.getElementById('again').style.display = 'none';
    document.getElementById('result').textContent = '';
    startTimer();
};

const startTimer = () => {
    timeLeft = 20;
    document.getElementById('time').textContent = timeLeft;
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
    document.getElementById('again').style.display = 'inline-block';
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

const restartGame = () => {
    clearInterval(timer);
    getQuestion();
};

getQuestion();
