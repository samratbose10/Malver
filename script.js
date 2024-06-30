let timeLeft = 20;
let timer;
let correctAnswer;

const getQuestion = async () => {
    try {
        const response = await fetch('https://math.tools/api/numbers/fact/random');
        const data = await response.json();
        const questionText = `What is ${data.question}?`;
        correctAnswer = data.answer;
        document.getElementById('question').textContent = questionText;
        startTimer();
    } catch (error) {
        document.getElementById('question').textContent = 'Failed to load question.';
        console.error('Error fetching question:', error);
    }
};

const startTimer = () => {
    timer = setInterval(countdown, 1000);
};

const countdown = () => {
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('submit').disabled = true;
        document.getElementById('result').textContent = 'Time is up!';
        return;
    }
    document.getElementById('time').textContent = timeLeft;
    