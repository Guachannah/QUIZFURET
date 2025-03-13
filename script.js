let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "Quel est le nom scientifique du furet ?",
    answers: [
      "Mustela putorius furo",
      "Felis catus",
      "Canis lupus familiaris",
      "Equus caballus",
    ],
    correctAnswer: 0,
  },
  {
    question: "Combien de temps vit généralement un furet ?",
    answers: ["2 à 4 ans", "5 à 7 ans", "10 à 12 ans", "15 à 20 ans"],
    correctAnswer: 1,
  },
  {
    question: "Les furets sont-ils des carnivores ?",
    answers: ["Oui", "Non", "Ils sont omnivores", "Ils mangent tout"],
    correctAnswer: 0,
  },
  {
    question:
      "Quel est le nom de la période de sommeil intense chez le furet ?",
    answers: ["Hibernation", "Sieste", "Dormance", "Repos actif"],
    correctAnswer: 2,
  },
  {
    question: "Les furets sont-ils des animaux solitaires ?",
    answers: [
      "Oui, ils vivent seuls",
      "Non, ils aiment être en groupe",
      "Ils sont sociaux mais peuvent vivre seuls",
      "Ils vivent en meutes",
    ],
    correctAnswer: 2,
  },
];

function startQuiz() {
  document.getElementById("intro").style.display = "none"; // Masque la page d'accueil
  document.getElementById("question-container").style.display = "block"; // Affiche la zone de questions
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-text").textContent = question.question;

  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = ""; // Clear previous answers

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => selectAnswer(index);
    answersContainer.appendChild(button);
  });

  document.getElementById("validate-btn").style.display = "none"; // Masque le bouton de validation initialement
}

function selectAnswer(selectedIndex) {
  this.selectedIndex = selectedIndex;
  document.getElementById("validate-btn").style.display = "block"; // Affiche le bouton de validation
}

function checkAnswer() {
  const question = questions[currentQuestionIndex];
  const feedback = document.createElement("p");

  if (this.selectedIndex === question.correctAnswer) {
    score++;
    feedback.textContent = "Bonne réponse !";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `Mauvaise réponse, la bonne était : ${
      question.answers[question.correctAnswer]
    }`;
    feedback.style.color = "red";
  }

  document.getElementById("answers-container").appendChild(feedback);
  document.getElementById("validate-btn").style.display = "none"; // Masque le bouton de validation
  setTimeout(() => {
    nextQuestion(); // Passe à la question suivante après un délai
  }, 1500);
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("question-container").style.display = "none"; // Masque les questions
  document.getElementById("result-container").style.display = "block"; // Affiche le résultat
  document.getElementById("score").textContent = score;

  let feedbackMessage = "";
  if (score === 5) {
    feedbackMessage = "Excellent ! Vous êtes un expert des furets !";
  } else if (score >= 3) {
    feedbackMessage =
      "Bon travail, vous avez pas mal de connaissances sur les furets.";
  } else {
    feedbackMessage = "Vous pouvez encore apprendre davantage sur les furets !";
  }
  document.getElementById("result-feedback").textContent = feedbackMessage;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("result-container").style.display = "none"; // Masque les résultats
  document.getElementById("intro").style.display = "block"; // Affiche la page d'accueil
}
