/*-- Starting Point --*/
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        let element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 /*-- show progress --*/
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
/*-- show scores --*/
function showScores() {
    let gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    let element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
/*-- Quiz Questions --*/
let questions = [
    new Question ("How many 3 pointers has curry made?",["1,500","2,495","700","3,000"],"2,495"),
    new Question ("Which team did Shaquille O'Neal finish his NBA career with, in the 2010-11 season?",["Boston Celtics","Los Angeles Lakers","Dallas Mavericks","Toronto Raptors"],"Boston Celtics"),
    new Question (" What year did kobe get drafted?",["2003","2000","1993","1996"],"1996"),
    new Question ("Who was Kobe drafted by first?",["Charlotte Hornets","Los Angeles Lakers","Miami Heat","Phoenix Suns"],"Charlotte Hornets"),
    new Question ("How many championships did Michael Jordan win?",["5","1","6","3"],"5")
];

let quiz = new Quiz(questions);

populate();

