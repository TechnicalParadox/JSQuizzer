// GLOBAL VARIABLES
/** @type {Array} An array of objects that each contain a question, options,
answer key, and function to pull the answer string */
var questions;
/** @type {Number}  contains the ID of the timer we set so it can be stopped later */
var timerInterval;


var quiz, questionNum, timer;

// Store references to necessary DOM objects
var lnk_viewHS, txt_timer, div_starter, div_quizzer, div_ender, div_leaderboard, btn_start,
txt_question, btn_answer1, btn_answer2, btn_answer3, btn_answer4, txt_output,
txt_finalscore, in_username, btn_submit;
lnk_hs = document.getElementById("lnk_hs");
txt_timer = document.getElementById("txt_timer");
div_starter = document.getElementById("starter");
div_quizzer = document.getElementById("quizzer");
div_ender = document.getElementById("ender");
div_leaderboard = document.getElementById("leaderboard");
div_leaderboardList = document.getElementById("leaderboard-list");
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

// FUNCTIONS

// Resets the list of questions
function resetQuestions()
{
  questions = [
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
      "o": ["javascript", "script", "js", "code"],
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
      "q": "Inside of the script tag, how do you link to an external .js file?",
      "o": ["src=\"filepath\"", "href=\"filepath\"", "ref=\"filepath\"", "path=\"filepath\""],
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
  ];
}
/** Start the quiz for the user and then calls quizUser() */
function startQuiz()
{
  resetQuestions(); // Reset list of questions since they get spliced out when generating quiz
  div_starter.style.display = "none"; // Hide starter div
  div_quizzer.style.display = "flex"; // Show quizzer div which had default of flex
  questionNum = 1;
  quiz = getQuiz(5);
  timer = 60.000;
  startTimer();
  txt_timer.innerHTML = timer.toFixed(3);
  quizUser();
}

/** Start a timer that updates every ms and update the HTML to display */
function startTimer()
{
  timerInterval = setInterval(function()
  {
    timer -= .001;
    txt_timer.innerHTML = timer.toFixed(3);
  }, 1);
}

/**
 * randomly pull questions from the questions array to use in the quiz
 * @param  {Number} numQuestions the number of questions to pull
 * @return {Array}              the array of question objects
 */
function getQuiz(numQuestions)
{
  if (numQuestions > questions.length) // Validate parameter
    numQuestions = questions.length;

  // Choose numQuestions random questions from questions and return
  let quiz = [];
  for (let x = 0; x < numQuestions; x++)
  {
    let randomIndex = Math.ceil(Math.random() * questions.length - 1);
    quiz.push(questions.splice(randomIndex, 1)[0]); // splice out to prevent repeats
  }
  return quiz;
}

/** quizzes the user and then passes the final score/calls endQuiz */
function quizUser() // TODO Implement actual timer
{
  if (questionNum > 5)
  {
    endQuiz(timer.toFixed(3));
    return;
  }

  // Get question and populate relevent text in quizzer
  let question = quiz[questionNum-1];
  txt_question.innerHTML = question.q;
  btn_answer1.innerHTML = question.o[0];
  btn_answer2.innerHTML = question.o[1];
  btn_answer3.innerHTML = question.o[2];
  btn_answer4.innerHTML = question.o[3];
}

/**
 * check if user clicked correct Answer
 * @param  {number} option the option number that the user clicks, 0-3
 * @return {undefined}        n/a
 */
function answer(option)
{
  if (quiz[questionNum-1].a == option) // If answers correctly, add to timer and move on
  {
    txt_output.innerHTML = "Correct!";
    timer += 5;
    questionNum++;
    quizUser();
  }
  else // If answer incorrectly, subtract from timer
  {
    txt_output.innerHTML = "Wrong...";
    timer -= 5;
  }
}

/**
 * Hides quizzer, shows ender, displays final score to username
 * @param  {Number} finalScore users final score
 * @return {undefined}
 */
function endQuiz(finalScore)
{
  // Stop the timerInterval
  clearInterval(timerInterval);

  div_quizzer.style.display = "none"; // Hide quizzer after quiz
  div_ender.style.display = "initial"; // Show ender

  txt_timer.innerHTML = finalScore;
  txt_finalScore.innerHTML = finalScore;
  in_username.value= ""; // Make sure username field is empty
}

/** Submits uses score/username to the leaderboard */
function submitScore()
{
  let usernameEntered = false;
  let userFinalScore = txt_finalScore.innerHTML; // Fetch user final score
  let username = in_username.value; // Get username
  if (username == "") // Validate that username isn't blank
  {
    alert("Please enter a username.");
    return;
  }
  // Save score to leaderboard
  var leaderboard = window.localStorage;
  leaderboard.setItem(userFinalScore, username)
  showLeaderboard(); // Show leaderboard

}

/** depopulates the leaderboardList before its reloaded in another method */
function unloadLeaderboard()
{
  while (div_leaderboardList.hasChildNodes())
  {
    div_leaderboardList.removeChild(div_leaderboardList.childNodes[0]);
  }
}

/** Hides all other main content divs and displays leaderboard to the user */
function showLeaderboard()
{
  if (div_quizzer.style.display == "flex") // if user is taking quiz, do not show Leaderboard
  {
    alert("Finish your quiz!");
    return;
  }
  // Hide all divs other than leaderboard and make sure leaderboard is empty before reloading
  div_starter.style.display = "none";
  div_quizzer.style.display = "none";
  div_ender.style.display = "none";
  unloadLeaderboard();
  div_leaderboard.style.display = "grid" // display leaderboard with default, grid

  // Load leaderboard from localStorage
  let leaderboard = window.localStorage;
  // get all keys from Leaderboard
  let keys = Object.keys(leaderboard);
  // convert keys into array of floats
  let scores = [];
  for (let x = 0; x < keys.length; x++)
  {
    scores.push(parseFloat(keys[x]));
  }
  // sort scores from high -> low
  scores.sort(function(a,b){return b-a});
  console.log(scores);

  // pull key value pairs from leaderboard storage in sorted order and add to Leaderboard
  var username;
  for (let x = 0; x < scores.length; x++) // for each entry in leaderboard
  {
    // Create leaderboard list item
    let entry = document.createElement("H3");
    entry.class = "leaderboard-item";
    // Get username from leaderboard by using score/key
    username = leaderboard.getItem(scores[x].toFixed(3));
    // Populate leaderboard list item (H3) with place #, score (xX.XX), and username
    entry.innerHTML = x+1 +". " + scores[x].toFixed(3) + " - " + username;
    div_leaderboardList.appendChild(entry); // append leaderboard list item to leaderboard
  }
}

/** send user back to starter div */
function goHome()
{
  div_leaderboard.style.display = "none";
  div_starter.style.display = "flex"; // from ../css/style.css - default of "flex"
}

/** resets the leaderboard storage and calls goHome() */
function resetLeaderboard()
{
  var leaderboard = window.localStorage;
  leaderboard.clear();
  goHome();
}

// MAIN LOGIC

// Hide Quizer and Ender from the user
div_quizzer.style.display = "none"; // from ../css/style.css - default of "flex"
div_ender.style.display = "none";
div_leaderboard.style.display = "none"; // from ../css/style.css - default of "grid"
