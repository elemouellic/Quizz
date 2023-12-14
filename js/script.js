let currentQuestionIndex = 0;
let questionsData = [];

function displayQuestion(question) {
    const questionContainer = document.querySelector('.py-2.h5 b');
    const optionsContainer = document.getElementById('options');

    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = question.answers.map((answer, index) =>
        `<label class="options">${answer}
            <input type="radio" name="radio" id="res${index + 1}">
            <span class="checkmark"></span>
        </label>`
    ).join('');
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

fetch('questions.json')
    .then(response => response.json())
    .then(jsonData => {
        questionsData = jsonData.module[0].questions;
        displayQuestion(questionsData[currentQuestionIndex]);
    })
    .catch(error => console.error('Error loading JSON:', error));

document.getElementById('prev').addEventListener('click', loadPreviousQuestion);
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);
