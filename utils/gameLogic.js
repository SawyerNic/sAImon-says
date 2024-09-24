//NONE OF THIS IS OPERATIONAL, JUST A STEP UP FROM PSUEDOCODE
let sleep = import('sleep');
//parse the response from the AI into a format like ["Simon Says ___", "____", "Simon Says___"]
let GPT = import("./gptFunctions.js");
let AIArray = [];

let correctArray = []; //array to keep track of how many correct guesses, for score keeping purposes
let gameStarted = false; //change based on the start event from arduino
let currentButton;//the current pressed arduino button
if(gameStarted){
    //go through each index in the array and check aganist current pressed button
    for(let i=0, len=AIArray.length;i<len;i++){
        if(AIArray[i]==currentButton){
            correctArray.push("correct");
        }else{
            correctArray.push("false");
        }
        //small delay here for a buffer somehow
        sleep.msleep(100);
    }
    //done with game since all prompts were responded to
    if(correctArray.length>=AIArray.length){
        gameStarted = false;
    }
}
//we leave if the game ends so show the score
const counts = {};
correctArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
console.log(`Good job, you got ${counts["correct"]} correct and ${counts["false"]} wrong.`);
