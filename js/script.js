let currentQuestionIndex = 0;
let questionsData = [];
<<<<<<< HEAD
let score = 0;
/**Fonction qui affiche les questions */
=======
let userAnswers = [];

>>>>>>> 682c0b7138cbf6863df2f9111e3fa4d34161cd21
function displayQuestion(question) {
    // Je récupère le conteneur de question par son selecteurs  
    const questionContainer = document.querySelector('.py-2.h5 b');
    // et je récupère le conteneur des réponses par son id 
    const optionsContainer = document.getElementById('options');
    // j'affecte le texte de la question au conteneur
    questionContainer.textContent = question.question;
<<<<<<< HEAD
    // j'affecte le texte des réponses au conteneur
    optionsContainer.innerHTML = question.answers.map((answer, index) =>
        `<label class="options">${answer}
            <input type="radio" name="radio" id="res${index + 1}">
            <span class="checkmark"></span>
        </label>`
    ).join('');
=======
    optionsContainer.innerHTML = question.answers.map((answer, index) => {
        const isChecked = userAnswers[currentQuestionIndex] === index;
        const isCorrect = question.correctAnswer === index;
        const answerClass = isChecked ? (isCorrect ? 'correct' : 'incorrect') : '';
        return `<label class="options ${answerClass}">${answer}
                    <input type="radio" name="radio" id="res${index + 1}" ${isChecked ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>`;
    }).join('');

    // Ajouter un écouteur d'événements pour sauvegarder la réponse sélectionnée
    optionsContainer.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
        radio.addEventListener('change', () => {
            userAnswers[currentQuestionIndex] = index;
        });
    });
>>>>>>> 682c0b7138cbf6863df2f9111e3fa4d34161cd21
}
<<<<<<< HEAD
// La fonction charge la prochaine question elle incrémente l'index de la question courante
=======

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

>>>>>>> ce75f334cbdaebfee24ab9ab0ef029077d13eec6
function loadNextQuestion() {
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

function loadPreviousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        displayQuestion(questionsData[currentQuestionIndex]);
    }
}

function calculateScore() {
    current
}

function displayResult() {
    const result = calculateScore();
    document.querySelector('.text-warning').textContent = `${result.score} points`;
    document.querySelector('.questions_number').textContent = questionsData.length;
    document.querySelector('.questions_number[data-type="valid"]').textContent = result.correctAnswers;
    document.querySelector('.questions_number[data-type="invalid"]').textContent = result.incorrectAnswers;
    document.querySelector('.questions_number[data-type="unanswered"]').textContent = result.unanswered;
    document.querySelector('.question:last-child').style.display = 'block';
    document.querySelector('.question:first-child').style.display = 'none';
}
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(questionsData[currentQuestionIndex]);
    } else {
        calculateScore();
    }
}

function displayResult() {
    const quizContainer = document.querySelector('.container');
    const resultContainer = document.getElementById('result-container');
    const score = calculateScore();

<<<<<<< HEAD
document.getElementById('prev').addEventListener('click', loadPreviousQuestion);
<<<<<<< HEAD
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);


  
=======
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);
>>>>>>> 682c0b7138cbf6863df2f9111e3fa4d34161cd21
=======
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const scoreElement = document.querySelector('.fs-3.fw-bold.text-warning');
    scoreElement.textContent = `${score} points`;

    const totalQuestions = questionsData.length;
    const validAnswers = userAnswers.filter(answer => answer !== -1).length;
    const correctAnswers = questionsData.filter((question, index) => {
        const selectedAnswerIndex = userAnswers[index];
        const correctAnswerIndex = question.correct_answer - 1; // Ajuster l'index de la réponse correcte
        return selectedAnswerIndex === correctAnswerIndex;
    }).length;
    const incorrectAnswers = totalQuestions - validAnswers - correctAnswers;
    const unansweredQuestions = totalQuestions - validAnswers;

    const totalQuestionsElement = document.querySelector('.questions_number.total');
    const validAnswersElement = document.querySelector('.questions_number.valid');
    const correctAnswersElement = document.querySelector('.questions_number.correct');
    const incorrectAnswersElement = document.querySelector('.questions_number.incorrect');
    const unansweredQuestionsElement = document.querySelector('.questions_number.unanswered');

    totalQuestionsElement.textContent = totalQuestions;
    validAnswersElement.textContent = validAnswers;
    correctAnswersElement.textContent = correctAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;
    unansweredQuestionsElement.textContent = unansweredQuestions;
}






function calculateScore() {
    let score = 0;
    for (let i = 0; i < questionsData.length; i++) {
        const selectedAnswerIndex = userAnswers[i];
        const correctAnswerIndex = questionsData[i].correct_answer - 1; // Ajuster l'index de la réponse correcte

        if (selectedAnswerIndex === -1) {
            // La question n'a pas été répondu
            score += 0; // Réponse non donnée = 0 point
        } else if (selectedAnswerIndex === correctAnswerIndex) {
            score += 2; // Bonne réponse = +2 points
        } else {
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
>>>>>>> ce75f334cbdaebfee24ab9ab0ef029077d13eec6
