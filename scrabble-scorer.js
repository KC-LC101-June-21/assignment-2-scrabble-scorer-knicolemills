// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue)
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble! Enter a word: ");
};

function simpleScore(word){
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
			letterPoints += 1
	}
	return letterPoints;
 }

const vowelBonusStructure = {
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
};
function vowelBonusScore(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelBonusStructure) {
 
		 if (vowelBonusStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue)
		 }
 
	  }
	}
	return letterPoints;
 }


function transform(oldScoringObject) {
  let transformedObject = {}
  let currentLetter;
  for (const pointValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[pointValue].length; i++){
      currentLetter = oldPointStructure[pointValue][i];
      transformedObject[currentLetter.toLowerCase()] = Number(pointValue)
    }
  }
  return transformedObject
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(word){
  word = word.toLowerCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
			letterPoints += newPointStructure[word[i]]
	}
	return letterPoints;
}

const scoringAlgorithms = [{
  name: 'Simple Score', 
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
},{
  name: 'Bonus Vowels', 
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
},{
  name: 'Scrabble', 
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
}];

function scorerPrompt() {
  const validInputs = [0,1,2];
  let selectedScorer = Number(input.question(`
Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `));

  while (!validInputs.includes(selectedScorer)) {
    selectedScorer = Number(input.question(`Invalid input. Please enter either 0, 1, or 2: `))
  }
  return scoringAlgorithms[selectedScorer] 
}

function runProgram() {
  let scrabbleWord = initialPrompt();
  let selectedScorerPrompt = scorerPrompt();
    console.log(`Score for '${scrabbleWord}': ${selectedScorerPrompt.scoringFunction(scrabbleWord)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

