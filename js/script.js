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
>>>>>>> 682c0b7138cbf6863df2f9111e3fa4d34161cd21
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
<<<<<<< HEAD
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);


  
=======
document.querySelector('.btn-success').addEventListener('click', loadNextQuestion);
>>>>>>> 682c0b7138cbf6863df2f9111e3fa4d34161cd21
