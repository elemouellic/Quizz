/**
 * Classe Quiz
 * @author Team CDA (Solenn, Manu, Nico, Julien)
 */
class Quiz {
    /**Conteneur de la question */
    #questionContainer;
    /**Conteneur des réponses */
    #answerContainer;
    /**Données des questions */
    #questionsData;
    /**Index de la question courante */
    #currentQuestionIndex;
    /**Conteneur du résultat */
    #resultBoard
    /**Conteneur du quiz */
    #quizContainer
    /**Bouton suivant */
    #nextButton;
    /**Bouton precédent */
    #previousButton;
    /**Score */
    #score
    /** Tableau des réponses */
    #answers;
    /**
     * Constructeur
     */
    constructor() {
        // J'initialise le score
        this.#score = 0;
        // J'initialise
        this.#answers = [];
        // J'initialise l'index de la question courante
        this.#currentQuestionIndex = 0;
        // Je récupère le quiz-container
        this.#quizContainer = document.getElementById('quiz-container');
        // Je récupère le conteneur des questions par son selecteur 
        this.#questionContainer = document.querySelector('.py-2.h5 b');
        // et je récupère le conteneur des réponses par son id 
        this.#answerContainer = document.getElementById('options');
        // et le conteneur du résultat par son id
        this.#resultBoard = document.getElementById("resultat");
        // Je récupère le bouton suivant par son selecteur
        this.#nextButton = document.querySelector('.btn-success');
        // Je récupère le bouton precédent
        this.#previousButton = document.getElementById('prev');
        // Je cache le conteneur du résultat
        this.#resultBoard.style.display = "none";
        // Je récupère les données du json
        fetch('./json/questions.json')
            .then(response => response.json())
            .then(jsonData => {
                this.#questionsData = jsonData.module[0].questions;
                this.#displayQuestion(this.#questionsData[this.#currentQuestionIndex]);

            })
            // Si il y a une erreur 
            .catch(error => console.error('Erreur de chargement du fichier JSON:', error));
        // Au click sur le bouton prev j'ajoute la méthode loadPreviousQuestion()
        this.#previousButton.addEventListener('click', this.#loadPreviousQuestion.bind(this));
        // Au click sur le bouton prev j'ajoute la méthode loadNextQuestion()
        this.#nextButton.addEventListener('click', this.#loadNextQuestion.bind(this));
    }
    /**
     * Méthode qui affiche la question
     */
    #displayQuestion(question) {
        // J'assigne à question la valeur du tableau questionData 
        // à l'index de la question courante
        question = this.#questionsData[this.#currentQuestionIndex];
        // J'ajoute le libelle de la question
        this.#questionContainer.textContent = question.question;
        // J'ajoute les réponses
        this.#answerContainer.innerHTML = question.answers.map((answer, index) =>
            `<label class="options">${answer}
                <input type="radio" name="radio" id="res${index + 1}">
                <span class="checkmark"></span>
            </label>`
        ).join('');
    }
    /**
     * Méthode qui charge la prochaine question
     */
    #loadNextQuestion() {
        console.log(this.#getSelectedAnswerIndex());
        this.#answers[this.#currentQuestionIndex] = this.#getSelectedAnswerIndex();
        // J'incrémente l'index de la question courante
        this.#currentQuestionIndex++;
        // Je gère le comportement du bouton previous
        this.#previousButton.disabled = false;
        if (this.#currentQuestionIndex < this.#questionsData.length) {
            this.#displayQuestion(this.#questionsData[this.#currentQuestionIndex]);
        } else {
            this.#displayResult();
        }
    }
    /**
     * Méthode qui charge la question précédente
     */
    #loadPreviousQuestion() {
        // Je décrémente l'index de la question courante    
        this.#currentQuestionIndex--;
        // Je gère le comportement du bouton previous
        this.#nextButton.disabled = false;
        if (this.#currentQuestionIndex >= 0) {
            // j'affiche la question courante 
            this.#displayQuestion(this.#questionsData[this.#currentQuestionIndex]);
        } else {
            this.#previousButton.disabled = true;
        }
    }
    /**
     * Méthode qui retourne l'index de la réponse sélectionnée
     */
    #getSelectedAnswerIndex(question) {
        const radioButtons = document.querySelectorAll('input[name="radio"]');
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return i;
            }
        }
        return -1; // Retourne -1 si aucune réponse n'est choisie
    }
    /**
     * Méthode pour calculer le score
     */
    #calculScore() {
        for (let i = 0; i < this.#answers.length; i++) {
            if (this.#answers[i] + 1 == this.#questionsData[i].correct_answer) {
                this.#score = this.#score + 2;
                console.log("yaya");
                console.log(this.#score);
            } else if (this.#answers[i] == -1) {
                this.#score = this.#score;
                console.log("yoyo");
                console.log(this.#score);
            } else if (this.#answers[i] + 1 !== this.#questionsData[i].correct_answer) {
                this.#score--;
                console.log("yiyi");
                console.log(this.#score);
            }
        }
        if (this.#score < 0) {
            this.#score = 0;
        }
    }
    /**
     * Méthode qui affiche les résultat du quiz
     */
    #displayResult() {
        this.#calculScore();
        this.#quizContainer.style.display = "none";
        this.#resultBoard.style.display = "contents";
        this.#resultBoard.innerHTML = `<div class="py-2 h3 text-center">${this.#score} point</div>`;

        // Show the validation modal
        const validationModal = document.getElementById('validationModal');
        validationModal.style.display = 'block';

        // Add an event listener to the "Submit" button in the modal
        const submitResultsBtn = document.getElementById('submitResultsBtn');
        submitResultsBtn.addEventListener('click', () => {
            // You can add your logic here to submit the results
            // For now, just close the modal
            validationModal.style.display = 'none';
        });

        // Add an event listener to the "Close" button in the modal
        const closeModalBtn = document.getElementById('closeModalBtn');
        closeModalBtn.addEventListener('click', () => {
            // Close the modal and return to the quiz
            validationModal.style.display = 'none';
            this.#quizContainer.style.display = 'block';
        });
    }
}

const quiz = new Quiz();