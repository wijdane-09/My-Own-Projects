const questions = document.getElementById('question');
const answers = document.querySelectorAll('.answer');
const result = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const progress = document.getElementById('progress'); 

let currentIndex = 0;
let score = 0;

const quiz = [
  {
    question: 'What is JavaScript?',
    answers: ['A programming language', 'Creating databases', 'Styling web pages'],
    correct: 'A programming language'
  },
  {
    question: 'What is true',
    answers: ['String', 'Boolean', 'Number'],
    correct: 'Boolean'
  },
  {
    question: 'Which symbol is for comments?',
    answers: ['//', '##', '__'],
    correct: '//'
  }
];

// hide restart
restartBtn.style.display = 'none';

// show question
function ShowQuestion() {
  const current = quiz[currentIndex];

  // ✅ Progress
  progress.textContent = `Question ${currentIndex + 1} of ${quiz.length}`;

  questions.textContent = current.question;
  
  nextBtn.disabled = true;

  answers.forEach((btn, index) => {
    btn.textContent = current.answers[index];
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
    btn.style.display = 'block';
  });
  result.textContent = '';
}

// click answers
answers.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = quiz[currentIndex];

    if (btn.textContent === current.correct) {
      btn.classList.add('correct');
      result.textContent = 'Correct ✅';
      score++;
    } else {
      btn.classList.add('wrong');
      result.textContent = 'Wrong ❌';
    }

    answers.forEach(b => {
      if (b.textContent === current.correct) {
        b.classList.add('correct');
      }
      b.disabled = true;
    });
    nextBtn.disabled = false
  });
});

// next
nextBtn.addEventListener('click', () => {
  currentIndex++;

  if (currentIndex < quiz.length) {
    ShowQuestion();
  } else {
    questions.textContent = 'Quiz finished';
    result.textContent = `Your score: ${score} / ${quiz.length}`;
    progress.textContent = ''; 
    nextBtn.disabled = true;

    restartBtn.style.display = 'block';
  }
});

// restart
restartBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;

  nextBtn.disabled = false;
  restartBtn.style.display = 'none';

  ShowQuestion();
});

// start
ShowQuestion();
