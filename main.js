'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log('board:' ,board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  //turns the string into an array
  let solutionArray = Array.from(solution)
  let guessArray = Array.from(guess)
  //sets the starting index at 0 for the hints
  let sameIndex = 0
  let sameLetter = 0
  // console.log(solutionArray)
  for(let i = 0; i < solutionArray.length; i++){
    if(guessArray[i]===solutionArray[i]){
    sameIndex++
    solutionArray[i] = null
    }
  }
  for(let i= 0; i<solutionArray.length; i++){
    if(guessArray.indexOf(solutionArray[i]) > -1){
    sameLetter++
    }
  }
  // console.log('sameIndex:' , sameIndex)
  // console.log('sameLetter', sameLetter)
  let hint = sameIndex + '-' + sameLetter

  return hint
}
//when I check for a win inside the mastermind function, it doesn't exit mastermind, so I put it in getPrompt and it does what it's supposed to 
const mastermind = (guess) => {
  // solution = 'abcd'; 
  board.push(guess + '-' + generateHint(guess))
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    if(guess === solution){
    return console.log('You guessed it!')
    }
    printBoard();
    if(board.length === 10){
    return console.log('You ran out of turns! The solution was ' , solution)
    }
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}