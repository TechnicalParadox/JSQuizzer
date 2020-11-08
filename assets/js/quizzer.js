// REFERENCES
// Define array of 10 questions
let questions =
[
  {
    "q": "What keyword is used to declare a variable?",
    "o": ["const", "var", "let", "all of the above"],
    "a": 3, // o[3] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "What is the correct syntax to print a page?",
    "o": ["browser.print()", "navigator.print()", "window.print()", "document.print()"],
    "a": 2, // o[2] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "Which built-in method removes the last element from an array and returns it?",
    "o": ["last()", "pop()", "get()", "none of the above"],
    "a": 1, // o[1] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "Which built-in method reverses the order of the elements of an array?",
    "o": ["reverse()", "flip()", "zToA()", "mirror()"],
    "a": 0, // o[0] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "Which of the following function of String object extracts a section of a string and returns a new string?",
    "o": ["split()", "slice()", "section()", "cut()"],
    "a": 1, // o[1] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "What is the HTML tag under which one can write the JavaScript code?",
    "o": ["<javascript>", "<script>", "<js>", "<code>"],
    "a": 1, // o[1] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "What method is used to display an alert box?",
    "o": ["popUp()", "display()", "alert()", "log()"],
    "a": 2, // o[2] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "Inside of the <script> tag, how do you link to an external .js file?",
    "o": ["src=\"<filepath>\"", "href=\"<filepath>\"", "ref=\"<filepath>\"", "path=\"<filepath>\""],
    "a": 0, // option 1 is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "for (var x = 0; x <= 5; x++) { window.alert(\"Hello\"); }\nHow many time's will an alert window pop up?",
    "o": ["1", "4", "5", "6"],
    "a": 3, // o[3] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  },
  {
    "q": "var x = 0; if (x == 0) { let x = 10; } console.log(x) \nWhat is logged to the console?",
    "o": ["10", "0", "5", "error"],
    "a": 1, // o[1] is the answer
    "getAnswer": function() { return this.o[this.a]; }
  }
]

// Store references to necessary DOM objects
var lnk_viewHS, txt_timer, div_starter, div_quizzer, div_ender, btn_start,
txt_question, btn_answer1, btn_answer2, btn_answer3, btn_answer4, txt_output,
txt_finalscore, in_username, btn_submit;
lnk_hs = document.getElementById("lnk_hs");
txt_timer = document.getElementById("txt_timer");
div_starter = document.getElementById("starter");
div_quizzer = document.getElementById("quizzer");
div_ender = document.getElementById("ender");
btn_start = document.getElementById("btn_start");
txt_question = document.getElementById("txt_question");
btn_answer1 = document.getElementById("btn_answer1");
btn_answer2 = document.getElementById("btn_answer2");
btn_answer3 = document.getElementById("btn_answer3");
btn_answer4 = document.getElementById("btn_answer4");
txt_output = document.getElementById("txt_output");
txt_question = document.getElementById("txt_question");
txt_finalScore = document.getElementById("txt_finalScore");
in_username = document.getElementById("in_username");
btn_submitScore = document.getElementById("btn_submitScore");

// Functions

function startQuiz()
{
  div_starter.style.display = "none"; // Hide starter div
  div_quizzer.style.display = "flex"; // Show quizzer div
  quizUser(getQuiz);
}

/** @param {integer} numQuestions - Num of questions you want added (max of questions.length)*/
function getQuiz(numQuestions)
{
  if (numQuestions > questions.length) // Validate parameter
    numQuestions = questions.length;

  // Choose numQuestions random questions from questions and return
  let quiz = [];
  for (var x = 0; x < numQuestions; x++)
  {
    let randomIndex = Math.ceil(Math.random() * questions.length - 1);
    quiz.push(questions.splice(randomIndex, 1)[0]); // splice out to prevent repeats
  }
  return quiz;
}

function quizUser(quiz)
{
  /** @type {float} Timer/score */
  let timer = 60.000;
  // TODO timer/quiz user
  endQuiz(timer);
}

function endQuiz(finalScore)
{
  div_quizzer.style.display = "none"; // Hide quizzer after quiz
  div_ender.style.display = "initial"; // Show ender

  userFinalScore = finalScore.toFixed(3);
  txt_finalScore.innerHTML = "Your final score is: " +userFinalScore;
}

function submitScore()
{
  let username = in_username.value; // Get username
  if (username == "") // Validate that username isn't blank
    alert("Please enter a username.");
  else
    // TODO save score to leaderboard
}

// MAIN LOGIC
var userFinalScore;
// Hide Quizer and Ender from the user
div_quizzer.style.display = "none"; // from ../css/style.css - default of "flex"
div_ender.style.display = "none";

// Listen to start quiz
