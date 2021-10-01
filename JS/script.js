let existingScoreBoard = localStorage.getItem("Score");   //initializing local storage
if(existingScoreBoard==null){
    localStorage.setItem("Score", JSON.stringify([]));
}


let questions = [
    {
        question:"Which of the following teams NEVER got relegated to the second division on its national league:",
        option1:"River Plate",
        option2:"Flamengo",
        option3:"Manchester United",
        option4:"Borussia Dortmund",
        rAnswer:2
    },
    {
        question:"What soccer team has the biggest number of fans around the world?",
        option1:"Chivas Guadalajara",
        option2:"Bayern Munich",
        option3:"Barcelona",
        option4:"Flamengo",
        rAnswer:4
    },
    {
        question:"What is the best soccer player of all time after Pelé?",
        option1:"Cristiano Ronaldo",
        option2:"Maradona",
        option3:"Zico",
        option4:"Messi",
        rAnswer:3
    },
    {   
        question:"What is the strongest soccer team in the world? ",
        option1:"Flamengo",
        option2:"Liverpool",
        option3:"Real Madrid",
        option4:"Bayern Munich",
        rAnswer:1
}];

let timeScore = 200;
let currentQuestion = 0;
let anwser = document.querySelector("#correct-wrong");
let startButton = document.querySelector("#start-btn");
let timer = document.querySelector(".timer-count");
let btn1 = document.querySelector("#opt1");
let btn2 = document.querySelector("#opt2");
let btn3 = document.querySelector("#opt3");
let btn4 = document.querySelector("#opt4");
let saveScore = document.querySelector("#saveScore");
let nameInput = document.querySelector("#initials");
let userScore = document.querySelector("#user-score");
let leaderBoardBtn = document.querySelector("#leader-board");
let returnBtn = document.querySelector(".return");

startButton.addEventListener("click", function() {
    removeHidden("#answer-btn");
    removeHidden("#score-counter");
    addHidden(".controls");
    showQuestion();
    let timeCDown = setInterval(function(){
        
        if (timeScore>0 && currentQuestion>=questions.length){
            console.log("Your Score is "+timeScore);
            removeHidden("#form-score");
            clearInterval(timeCDown);
        }

        else if (timeScore>0){
            timeScore--;
            console.log(timeScore);
            timer.textContent = timeScore;

        } else {
            clearInterval(timeCDown);
            removeHidden("#form-score");
            addHidden("#answer-btn");
            console.log("TIME'S UP!");
        }
    },1000)
});

    // fucntion to hide elements
function addHidden (elementName) {
    let element = document.querySelector(elementName)
    element.classList.add("hidden");
    }
    //function to remove "hidden" 
function removeHidden (elementName) {
    let element = document.querySelector(elementName)
    element.classList.remove("hidden"); 
    }

function showQuestion () {
    let cQuestion = questions[currentQuestion]; //calling question on postion [0]
    let questionElement = document.querySelector("#question");

    if(currentQuestion>=questions.length){
        addHidden("#answer-btn");
        addHidden(".timer-text");
        anwser.textContent = ("YOUR SCORE IS "+timeScore);
        //anwser.textContent = "OVER!!!";
        clearInterval(timeScore);
    }
else{
    // display question and options 
    questionElement.textContent = cQuestion.question;
    btn1.textContent = cQuestion.option1;
    btn2.textContent = cQuestion.option2;
    btn3.textContent = cQuestion.option3;
    btn4.textContent = cQuestion.option4;
}
}

btn1.addEventListener("click", function(e){
    e.preventDefault();
    let optClicked = e.target;
    checkAnswer(optClicked.value);
})
btn2.addEventListener("click", function(e){
    e.preventDefault();
    let optClicked = e.target;
    checkAnswer(optClicked.value);
})
btn3.addEventListener("click", function(e){
    e.preventDefault();
    let optClicked = e.target;
    checkAnswer(optClicked.value);
})
btn4.addEventListener("click", function(e){
    e.preventDefault();
    let optClicked = e.target;
    checkAnswer(optClicked.value);
})

function checkAnswer(buttonValue){
    let cQuestion = questions[currentQuestion];

    if(cQuestion.rAnswer==buttonValue){
        console.log("ACERTOU MIZERAVI!!!");
        anwser.textContent = "ACERTOU MIZERAVI!!!";

        currentQuestion++;

        showQuestion();
    } else{
        timeScore -=50;
        anwser.textContent = "ERRRRRRROOOU!!!";
        currentQuestion++;
        showQuestion();
    }
}

saveScore.addEventListener("click", function(){

    let newScoreBoard = {
        initials:nameInput.value.trim(),
        score:timeScore
    };
    let lsScoreBoard = localStorage.getItem("Score");
    let tempScoreBoard = JSON.parse(lsScoreBoard);

    tempScoreBoard.push(newScoreBoard)
    localStorage.setItem("Score", JSON.stringify(tempScoreBoard));

    console.log("SALVOU");

    

})
leaderBoardBtn.addEventListener("click", function(){
    removeHidden(".final-board");
    removeHidden(".return-board");
    addHidden(".controls");
    let lsScoreBoard = localStorage.getItem("Score");
    let tempScoreBoard = JSON.parse(lsScoreBoard);
    
    tempScoreBoard.forEach(element => {
        var div = document.querySelector('#user-score');
        p = document.createElement("p");
        p.innerHTML = element.initials + " " + element.score;
        div.appendChild(p);
    });

})

returnBtn.addEventListener("click",function(){
    removeHidden(".controls");
    addHidden(".final-board");
    addHidden(".return-board");
    location.reload();
    
})






