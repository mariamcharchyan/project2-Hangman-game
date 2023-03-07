//Letters-----------------------------------------------------------------------------------
const letters="abcdefghijklmnopqrstuvwxyz";
let lettersArray=Array.from(letters);
let lettersContainer=document.querySelector(".letters");
lettersArray.forEach(letter=>{
  let span=document.createElement("span");
  let theLetter=document.createTextNode(letter)
  span.appendChild(theLetter);
  span.className='letter-box';
  lettersContainer.appendChild(span);
});
//Object Of Words + Categories----------------------------------------------------------------------
const words={
    programming:["html","css","java","javascript","php","go","mysql","python","fortran","scala"],
    animals:["Dog","Cow","Cat","Horse","Donkey","Tiger","Lion","Bear","Koala","Wolf","Monkey","Elephant","Crocodile","Frog","Fox","Fish"],
    people:["Ani Manukyan","Anna Matinyan","Anna Serobyan","Armen Manukyan","Arsen Enoqyan","Boghos Boghosyan","David Arestakesyan","Dianna Paroyan"],
    countries:["Armenia","Egypt","Syria","USA","Brazil","China","France","Germany","Georgia","Russia"]
  }
//Get Random Property
let allKeys=Object.keys(words);
let randomPropNumber = Math.floor(Math.random()*allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random()*randomPropValue.length);
//The Chosen Word
let randomValueValue = randomPropValue [randomValueNumber];
console.log(randomValueValue);
//Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Seleqt Letters Guess Element----------------------------------------------------------------------
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);
//Create Spans Depened On Word
lettersAndSpace.forEach(letter => {
  //Create Empty Span
  let emptySpan = document.createElement("span");
  if (letter === ' ') {
    emptySpan.className = 'with-space';
  }
  lettersGuessContainer.appendChild(emptySpan);
});
//Select Guess Spans------------------------------------------------------------------------
let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;//Set Wrong Attempt
let correctAttempts = 0;
let theDraw = document.querySelector(".the-man");//Seleqt The Draw Element
//if there is a space in the word, in correctAttempts rewrite 1  
let theChosenWord = Array.from(randomValueValue)
theChosenWord.forEach((wordLetter) => {
    if (wordLetter === ' ') {
        correctAttempts = 1;
    }
});
//Heandle Clicking On Letters
document.addEventListener("click",(e)=>{
    //Set The Chose Status
    let theStatus = false;
    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked");
        //Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase(); // console.log(theClickedLetter);
        let theChosenWord = Array.from(randomValueValue.toLowerCase());//The Chosen Word// console.log(lettersAndSpace); 
        // console.log(theChosenWord);
        theChosenWord.forEach((wordLetter, WordIndex) => {
            //If The Cliched Letter Equal To One Of The Chosen Word Letter
            if (theClickedLetter == wordLetter){
                // console.log(wordLetter);
                //console.log(WordIndex);
                theStatus = true;//Set Status To Correct
                //Loop On All Guess Spans
                guessSpans.forEach((span, spanIndex) => {
                    if (WordIndex === spanIndex){
                        //console.log(spanIndex);
                        span.innerHTML = theClickedLetter;
                        correctAttempts++
                    //    console.log(correctAttempts);
                    }
                });
            }           
        });
        // Outside Loop // console.log(theStatus);
        // If Letter Is Wrong
        if (theStatus !== true) {
            wrongAttempts++//Increase The Wrong Attempts
            theDraw.classList.add(`wrong-${wrongAttempts}`);//Add Class Wrong On The Draw Element
            document.getElementById("fail").play();
            if (wrongAttempts === 6) {//Play Fail Sound
                setTimeout(function(){
                    return GameOver();
                },3000) ;
                lettersContainer.classList.add("finished")      
            }
        } else {
            // correctAttempts++
            document.getElementById("success").play();//Play Success Sound
            if(correctAttempts === randomValueValue.length){
                setTimeout(function(){
                    return GameWin();
                },3000) ;
                lettersContainer.classList.add("finished") 
            };
        }
    }
});
function GameWin() {
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Play Again");
    button.appendChild(buttonText);
    button.className = "myButton";

    let outerDiv = document.createElement("div");
    let divText = document.createTextNode(`Congrats on the win!`);
    outerDiv.appendChild(divText);
    
    let innerDiv = document.createElement("div");
    innerDiv.className = 'popup';

    innerDiv.appendChild(outerDiv);
    innerDiv.appendChild(button);
    document.body.appendChild(innerDiv);
    document.getElementById("win").play();

    button.addEventListener("click", function() {
        location.reload();
    });
   }
function GameOver() {
    let button = document.createElement("button");
    let buttonText = document.createTextNode("Try Again");
    button.appendChild(buttonText);
    button.className = "myButton";

    let outerDiv = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
    outerDiv.appendChild(divText);
    
    let innerDiv = document.createElement("div");
    innerDiv.className = 'popup';

    innerDiv.appendChild(outerDiv);
    innerDiv.appendChild(button);
    document.body.appendChild(innerDiv);

    document.getElementById("game-over").play();
    button.addEventListener("click", function() {
        location.reload();
    }); 
  }
