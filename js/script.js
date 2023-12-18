let currentQuestionIndex = 0;
let questionsData = [];
let score = 0;
/**Fonction qui affiche les questions */
function displayQuestion(question) {
    // Je récupère le conteneur de question par son selecteurs  
    const questionContainer = document.querySelector('.py-2.h5 b');
    // et je récupère le conteneur des réponses par son id 
    const optionsContainer = document.getElementById('options');
    // j'affecte le texte de la question au conteneur
    questionContainer.textContent = question.question;
    // j'affecte le texte des réponses au conteneur
    optionsContainer.innerHTML = question.answers.map((answer, index) =>
        `<label class="options">${answer}
            <input type="radio" name="radio" id="res${index + 1}">
            <span class="checkmark"></span>
        </label>`
    ).join('');
}
// La fonction charge la prochaine question elle incrémente l'index de la question courante
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(questionsData[currentQuestionIndex]);
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

fetch('questions.json')
    .then(response => response.json())
    .then(jsonData => {
        questionsData = jsonData.module[0].questions;
        displayQuestion(questionsData[currentQuestionIndex]);
    })
    .catch(error => console.error('Error loading JSON:', error));

document.getElementById('prev').addEventListener('click', loadPreviousQuestion);
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);


  
