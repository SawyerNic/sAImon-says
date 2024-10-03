import { currentAction } from '../index.js'; //the current pressed arduino button
import { completion } from './gptFunctions.js';
import { waitForArduinoInput } from '../index.js';
import say from 'say';

//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait
function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

//parse the response from the AI into a format like ["Simon Says ___", "____", "Simon Says___"]
let AIArray = completion.choices[0].message;

const numberedCommands = completion.choices[0].message.content.match(/\d+\.\s"[^"]+"/g).map(command => command.replace(/^\d+\.\s"|"$/g, '').toLowerCase());

console.log(numberedCommands);

let correctArray = []; //array to keep track of how many correct guesses, for score keeping purposes
let gameStarted = true;
// if(currentAction == "start"){gameStarted==true;}//is replacable, just need some sort of start event to fire
while(gameStarted){
    //go through each index in the array and check aganist current pressed button
    for(let i=0, len=numberedCommands.length;i<len;i++){
        
        say.speak(numberedCommands[i]);
        
        let action = await waitForArduinoInput();

        console.log(numberedCommands[i], ("simon says " + action))
        if(numberedCommands[i].includes("simon says") && numberedCommands[i].includes(action)){ //and starts with simon says
            correctArray.push("correct");
        }else{
            correctArray.push("false");
        }
        //console.log(len);
        //small delay here for a buffer somehow
        msleep(600); //might cause the most problems
    }
    //done with game since all prompts were responded to
    if(correctArray.length>=numberedCommands.length){
        gameStarted = false;
    }
}
//we leave if the game ends so show the score
const counts = {};
correctArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
console.log(`Good job, you got ${counts["correct"] ? counts["correct"] : "0"} correct and ${counts["false"]} wrong.`);