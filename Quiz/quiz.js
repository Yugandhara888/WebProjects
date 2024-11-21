$(document).ready(function () {
    let questions = [];
    let userAnswers = [];
    let correctAnswers = [];

    // Fetch questions from the Open Trivia API
    $('#start').on('click', function () {
        const category = $('#category').val();
        const difficulty = $('#difficulty').val();

        $.ajax({
            url: `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}&difficulty=${difficulty}`,
            method: 'GET',
            success: function (response) {
                if (response.results.length > 0) {
                    questions = response.results;
                    displayQuestions(questions);
                } else {
                    alert('No questions available. Please try a different category or difficulty.');
                }
            },
            error: function () {
                alert('Failed to fetch questions. Please try again.');
            }
        });
    });

    // Display questions
    function displayQuestions(questions) {
        const quizContainer = $('#quiz');
        quizContainer.empty();
        userAnswers = [];
        correctAnswers = [];

        questions.forEach((question, index) => {
            const questionHtml = `
                <div class="question">
                    <p>${index + 1}. ${decodeHtml(question.question)}</p>
                    <div class="options">
                        ${getOptionsHtml(question, index)}
                    </div>
                </div>
            `;
            quizContainer.append(questionHtml);

            correctAnswers.push(decodeHtml(question.correct_answer));
        });

        $('#submit').show();
    }

    // Generate options HTML
    function getOptionsHtml(question, index) {
        const options = [...question.incorrect_answers, question.correct_answer];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        return shuffledOptions.map(option => `
            <label>
                <input type="radio" name="q${index}" value="${decodeHtml(option)}">
                ${decodeHtml(option)}
            </label><br>
        `).join('');
    }

    // Decode HTML entities
    function decodeHtml(html) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = html;
        return textArea.value;
    }

    // Handle submit button click
    $('#submit').on('click', function () {
        questions.forEach((_, index) => {
            const selectedOption = $(`input[name="q${index}"]:checked`).val();
            userAnswers.push(selectedOption || '');
        });

        calculateScore();
    });

    // Calculate and display the score
    function calculateScore() {
        let score = 0;

        userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                score++;
            }
        });

        $('#score').text(`You scored ${score} out of ${questions.length}!`);
    }
});
