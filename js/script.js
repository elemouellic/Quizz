let currentQuestionIndex = 0;
let questionsData = [];
let userAnswers = [];

function displayQuestion(question) {
    const questionContainer = document.querySelector('.py-2.h5 b');
    const optionsContainer = document.getElementById('options');

    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = question.answers.map((answer, index) => {
        // Vérifier si la réponse a déjà été sélectionnée
        const isChecked = userAnswers[currentQuestionIndex] === index;
        return `<label class="options">${answer}
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
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        displayQuestion(questionsData[currentQuestionIndex]);
    }
    // Gérer la fin du quiz ->
}

function loadPreviousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        displayQuestion(questionsData[currentQuestionIndex]);
    }
    // Gérer le début du quiz ->
}

fetch('./json/questions.json')
    .then(response => response.json())
    .then(jsonData => {
        questionsData = jsonData.module[0].questions;
        // Initialiser le tableau des réponses de l'utilisateur avec 'null'
        userAnswers = new Array(questionsData.length).fill(null);
        displayQuestion(questionsData[currentQuestionIndex]);
    })
    .catch(error => console.error('Error loading JSON:', error));

document.getElementById('prev').addEventListener('click', loadPreviousQuestion);
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);