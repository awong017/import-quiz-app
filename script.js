//  Storing the questions, choices, and answers
let STORE = [
  {
    questionNum: 1,
    question: 'Which of these chassis codes represents the latest BMW M3 sedan model?',
    choices: ['E30','E36','E90','None of the above'],
    answer: 'None of the above'
  },
  {
    questionNum: 2,
    question: 'What engine is found the R34 Nissan Skyline GTR?',
    choices: ['2JZ-GTE','K24A2','RB26DETT','L28E'],
    answer: 'RB26DETT'
  },
  {
    questionNum: 3,
    question: 'What is the lug nut pattern found on a 2008 Acura TSX?',
    choices: ['5x114.3','5x110','5x120','5x100'],
    answer: '5x114.3'
  },
  {
    questionNum: 4,
    question: 'Which of these manufacturers DO NOT specialize in aftermarket parts for Hondas?',
    choices: ['Spoon','Feels','Mugen','Vertex'],
    answer: 'Vertex'
  },
  {
    questionNum: 5,
    question: 'What would be the most ideal aftermarket exhaust size for a 2005 Subaru WRX?',
    choices: ['50mm','60mm','70mm','80mm'],
    answer: '80mm'
  },
  {
    questionNum: 6,
    question: 'An air intake is DIRECTLY connected to which of the following?',
    choices: ['Battery','Accelerator Pedal Sensor','Throttle Body','Exhaust Manifold'],
    answer: 'Throttle Body'
  },
  {
    questionNum: 7,
    question: 'Which of these wheel manufacturers make forged wheels?',
    choices: ['Tenzo','Volk Racing','Motegi','TSW'],
    answer: 'Volk Racing'
  },
  {
    questionNum: 8,
    question: 'Which of the following cars DOES NOT have a turbo?',
    choices: ['Toyota FRS','Subaru BRZ','All of the above','None of the above'],
    answer: 'All of the above'
  },
  {
    questionNum: 9,
    question: 'How much does a 2007 Honda Civic Si sedan roughly weigh?',
    choices: ['2500lbs','3000lbs','3500lbs','None of the above'],
    answer: '3000lbs'
  },
  {
    questionNum: 10,
    question: 'How much money does Johnny Tran have under the hood of his AP1 Honda S2000?',
    choices: ['$25k','$50k','$75k','$100k'],
    answer: '$100k'
  }
]

let questionNumber = 0;
let scoreTotal = 0;

//  Event listener that listens for the start button and 
//  starts the quiz
function handleStartQuizClick() {
  $('.startPage').on('click', '.startButton', function(event){
    $('.startPage').css('display', 'none');
    createQuestionPage();
    $('footer').css('display', 'block');
    $('.questionPage').css('display','block');
    $('.questionCount').text(1);
    $('.enterAnswer').css('display', 'block');
  });
}

//  Function that creates the format of the question page
function renderQuestion() {
    if (questionNumber<STORE.length) {
    return `<div class='question'>
      <h2 class="questionHeading">${STORE[questionNumber].question}</h2>
        <form>
          <fieldset>
          <label class="answerOption">
            <input type="radio" class='radioChoice' value="${STORE[questionNumber].choices[0]}" name="answer" required>
            <span>${STORE[questionNumber].choices[0]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" class='radioChoice' value="${STORE[questionNumber].choices[1]}" name="answer" required>
            <span>${STORE[questionNumber].choices[1]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" class='radioChoice' value="${STORE[questionNumber].choices[2]}" name="answer" required>
            <span>${STORE[questionNumber].choices[2]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" class='radioChoice' value="${STORE[questionNumber].choices[3]}" name="answer" required>
            <span>${STORE[questionNumber].choices[3]}</span>
          </label>
          </fieldset>
        </form>
      </div>`}
      else
      {
        createSummary();
        $('.restart').css('display','block');
      }
}

//  Creates the question page in the DOM
function createQuestionPage() {
  $('.questionPage').html(renderQuestion());
  $(handleAnswerSelection);
}

//  Event listener that listens for when an answer selection
//  is clicked on on the question page
function handleAnswerSelection() {
  $('.answerOption').click(function(event) {
    let targetAnswer = $(event.currentTarget);
    let otherAnswers = $('.answerOption').not(targetAnswer);
    let pressedBool = $(targetAnswer).attr('aria-pressed') === 'true';
    otherAnswers.removeClass('answerSelected').attr('aria-pressed', false);
    targetAnswer.addClass('answerSelected').attr('aria-pressed', pressedBool);
  });
}

//  Event listener that listens for the submit button after
//  an answer has been selected
function handleSubmitAnswer() {
  $('.submitAnswer').on('click', '.enterAnswer', function (event) {
    createResultPage();
    if (questionNumber<STORE.length-1) {
      $('.next').text('Next Question');
    }
    else
    {
      $('.next').text('See Results').css('transition', '0.5s');
    };
    $('.answerPage').css('display', 'block');
    $('.question').css('display', 'none');
    $('.enterAnswer').css('display', 'none');
  });
}

//  The next two functions create the format of the
//  result page once an answer has been submitted
function renderCorrect() {
    return `<div class= 'result'>
      <h2 class='correctHeading'>You are correct!</h2>
      <button type='button' button class='next'></button>
    <div>`;
}

function renderIncorrect() {
    return `<div class= 'result'>
      <h2 class='incorrectHeading'>You are wrong! The correct answer is <p class="correctAnswer">${STORE[questionNumber].answer}<p></h2>
      <button type='button' button class='next'></button>
    <div>`;
}

//  Function renders a result page in the DOM depending
//  on if the user selected the correct answer or incorrect
//  answer
function createResultPage() {
  let choice = $("[type='radio']:checked").val();
  let correctAnswer = `${STORE[questionNumber].answer}`;
  if (choice === correctAnswer) {
    $('.answerPage').html(renderCorrect());
      countScore();
      }
    else
      {
        $('.answerPage').html(renderIncorrect());
    }
}

//  Event listener that listens for when the user clicks
//  the button to go to the next question.
function handleNextQuestion() {
  $('.answerPage').on('click', '.next', function(event) {
    trackQuestion();
    createQuestionPage();
    $('.result').css('display','none');
    if (questionNumber<STORE.length) {
      $('.question').css('display', 'block');
      $('.enterAnswer').css('display', 'block');
    }
    else
    {
      $('.question').css('display', 'none');
      $('.enterAnswer').css('display', 'none');
      $('footer').css('display', 'none');
    }
  });
}

//  This function creates the format of the quiz summary
//  page depending on the score of the user
function renderSummary() {
  if (scoreTotal<4) {
    return `<div class="summary">
    <h2 class="results">Looks like you should sell your car and stick to the bus</h2>
    <p class="scoreSummary">Score:</p>
    <span class='poorScore'>${scoreTotal}/10</span>
  </div>`
  }
  else if (scoreTotal>=4 && scoreTotal<7) {
    return `<div class="summary">
    <h2 class="results">Not bad, you know about as much as the average Joe</h2>
    <p class="scoreSummary">Score:</p>
    <span class='fairScore'>${scoreTotal}/10</span>
  </div>`
  }
  else
  {
    return `<div class="summary">
    <h2 class="results">Awesome job! You're definitely a car enthusiast</h2>
    <p class="scoreSummary">Score:</p>
    <span class='excellentScore'>${scoreTotal}/10</span>
  </div>`
  }
}

//  Function creates summary in DOM
function createSummary() {
  $('.summaryPage').html(renderSummary());
}

//  Function keeps track of the score while the 
//  user takes the quiz
function countScore() {
  scoreTotal ++;
  $('.scoreCount').text(scoreTotal);
}

//  Function keeps track of the question that
//  the user is on
function trackQuestion() {
  questionNumber ++;
  $('.questionCount').text(questionNumber+1);
}

//  Event listener that restarts the quiz
function handleQuizRestart () {
  $('.restartQuiz').on('click', '.restart', function (event) {
    location.reload();
  });
}

function setupHandlers() {
  handleStartQuizClick();
  handleSubmitAnswer();
  handleNextQuestion();
  handleQuizRestart();
}

$(setupHandlers);
