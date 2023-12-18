let currentQuestionIndex = 0;
let questionsData = [];
let userAnswers = [];

function displayQuestion(question) {
    const questionContainer = document.querySelector('.py-2.h5 b');
    const optionsContainer = document.getElementById('options');

    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = question.answers.map((answer, index) => {
        const isChecked = userAnswers[currentQuestionIndex] === index;
        const isCorrect = question.correctAnswer === index;
        const answerClass = isChecked ? (isCorrect ? 'correct' : 'incorrect') : '';
        return `<label class="options ${answerClass}">${answer}
                    <input type="radio" name="radio" id="res${index + 1}" ${isChecked ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>`;
    }).join('');

}

fetch('./json/questions.json')
    .then(response => response.json())
    .then(jsonData => {
        questionsData = jsonData.module[0].questions;
        // Initialiser le tableau des réponses de l'utilisateur avec '-1'
        userAnswers = new Array(questionsData.length).fill(-1);
        displayQuestion(questionsData[currentQuestionIndex]);
    })
    .catch(error => console.error('Error loading JSON:', error));

document.getElementById('prev').addEventListener('click', loadPreviousQuestion);
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);
document.getElementById('start-button').addEventListener('click', startQuiz);

function loadNextQuestion() {
    userAnswers[currentQuestionIndex] = getSelectedAnswerIndex();
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(questionsData[currentQuestionIndex]);
    } else {
        const nextButton = document.querySelector('.btn-success');
        nextButton.textContent = 'Terminé';
        nextButton.removeEventListener('click', loadNextQuestion);
        nextButton.addEventListener('click', displayResult);
    }
}
    /**
     * Méthode qui retourne l'index de la réponse sélectionnée
     */
  function getSelectedAnswerIndex(question) {
        const radioButtons = document.querySelectorAll('input[name="radio"]');
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return i;
            }
        }
        return -1; // Retourne -1 si aucune réponse n'est choisie
    }
function loadPreviousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        displayQuestion(questionsData[currentQuestionIndex]);
    }
    // Gérer le début du quiz ->
}

function displayResult() {
    const quizContainer = document.querySelector('.container');
    const resultContainer = document.getElementById('result-container');
    const score = calculateScore();

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const scoreElement = document.querySelector('.fs-3.fw-bold.text-warning');
    scoreElement.textContent = `${score} points`;

    const totalQuestions = questionsData.length;
    const validAnswers = userAnswers.filter(answer => answer !== -1 && answer === questionsData[userAnswers.indexOf(answer)].correctAnswer).length;
    const incorrectAnswers = userAnswers.filter(answer => answer !== -1 && answer !== questionsData[userAnswers.indexOf(answer)].correctAnswer).length;
    const unansweredQuestions = userAnswers.filter(answer => answer === -1).length;

    const totalQuestionsElement = document.querySelector('.questions_number.total');
    const validAnswersElement = document.querySelector('.questions_number.valid');
    const incorrectAnswersElement = document.querySelector('.questions_number.incorrect');
    const unansweredQuestionsElement = document.querySelector('.questions_number.unanswered');

    totalQuestionsElement.textContent = totalQuestions;
    validAnswersElement.textContent = validAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;
    unansweredQuestionsElement.textContent = unansweredQuestions;
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questionsData.length; i++) {
        const selectedAnswerIndex = userAnswers[i];
        const correctAnswerIndex = questionsData[i].correctAnswer;
        
        if (selectedAnswerIndex === correctAnswerIndex) {
            score += 2; // Bonne réponse = +2 points
        } else if (selectedAnswerIndex !== -1) {
            score -= 1; // Mauvaise réponse = -1 point
        }
    }
    return score;
}

function startQuiz() {
    const startQuizContainer = document.getElementById('start-quiz');
    const quizContainer = document.querySelector('.container');

    startQuizContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    // Affiche la première question du quizz
    displayQuestion(questionsData[currentQuestionIndex]);
}
