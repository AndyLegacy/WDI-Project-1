$(() => {
  console.log('we\'re all gonna make it bruh');


  function Glossary(words) {
    this.words = words;
    this.length = this.words.length;
  }

  Glossary.prototype.randWord = function() {
    return this.words[Math.floor(Math.random() * this.length)];
  };
  //removes current word from the gloassay of words
  Glossary.prototype.removeWord = function(word) {
    const index = this.words.indexOf(word);
    this.words.splice(index, 1);

  };
  //updates glossary of word how many words left
  Glossary.prototype.updateWordCount = function () {
    this.length = this.words.length;
  };

  const glossary = new Glossary([
    'adept', 'aphid', 'aphis', 'apoda', 'apsis', 'arena', 'argon',
    'argus', 'aroph', 'aster', 'augur', 'aurin', 'baric', 'bathe',
    'being', 'beroe', 'chair', 'chart', 'cheer', 'cilia', 'cloud',
    'death', 'delph', 'devil', 'evade', 'exode', 'exult', 'farse',
    'fever', 'flesh', 'flock', 'hepar', 'hexad', 'hocco', 'homer',
    'houri', 'lumen', 'lymph', 'phono', 'photo', 'rheic', 'rhein',
    'rogue', 'romic', 'rosin', 'rouge', 'scrat', 'screw', 'sense'
  ]);

  // cache your DOM elements (start button, reset button, timer, currentWord, anagramButton) using jQuery
  const $startGame = $('.startGame');
  const $resetButton = $('#reset');
  const $timer = $('#timer');
  const $currentWord = $('#currentWord');
  const $anagramButtons = $('.anagramButton');
  const $answerButtons = $('#answerButtons');


  // get timer working on click of start button, get it to stop at 0, console log game over
  let timeRemaining = 5;
  let timerIsRunning = false;
  let timerid = null;


  $startGame.on('click', () => {
    console.log('click');
    if(!timerIsRunning)  {
      timerIsRunning = true;
      timerid = setInterval(countDown, 10);
      console.log(timeRemaining);
    } else {
      timerIsRunning = false;
      clearInterval(timerid);
    }
  });

  function countDown() {
    if (timeRemaining === 0) {
      clearInterval(timerid);
      timerIsRunning = false;
      $timer.addClass('ringing');
    } else {
      timeRemaining = parseFloat((timeRemaining - 0.01).toFixed(2));
      $timer.html(timeRemaining.toFixed(2));
    }
  }



  // on start call glossary.randWord() to return a random word, and then scramble that word and display inside currentWord
  //

  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  const randWord = glossary.randWord();
  const shuffledWords = [];

  while(shuffledWords.length < 4) {
    const shuffledWord = shuffle(randWord.split('')).join('');
    if(!shuffledWords.includes(shuffledWord)) shuffledWords.push(shuffledWord);
  }

  // setting the current word to be the last element in the shuffled words array + removing it from the array
  $currentWord.html(shuffledWords.pop());
  const wrongAnswers = [0,1,2];
  const randomIndex2 = Math.Floor(Math.random() * 4);
  wrongAnswers.splice(randomIndex2, 3);
  const $wrongButtons = $anagramButtons.eq(randomIndex2);
  $wrongButtons.html(shuffledWord);




  // array of possible button indexs
  const possibleButtons = [0,1,2,3];
  // pick one index out of array of possible button indexs
  const randomIndex = Math.floor(Math.random() * 4);
  // remove that chosen index from the array so that it can't be picked again
  possibleButtons.splice(randomIndex, 1);

  // set the html of one button to be the correct answer
  const $correctButton = $anagramButtons.eq(randomIndex);
  $correctButton.html(randWord);

  // shuffledWords is an array of 3 shuffled words
  // possibleButtons is an array containing the 3 remaining indexes of the empty buttons [0,2,3]
  // looping through each possible button, and setting the html to be one of the remaining shuffled words
  // forEach, for loop

  // console.log(correctButton);

  // for (let i = 0; i < 4; i++) {
  //   shuffledArray.push(shuffle(randWord.split('')).join(''));
  //
  //   $anagramButtons.html(shuffledArray[i]);
  // }



  //  pick a random button from the anagramButton array, and set the text to be the correct answer

  // const randButton = $anagramButtons.splice($anagramButtons.indexOf(randWord), );
  // $anagramButtons.html(randButton);
  // //
  // //
  // //

//

// scramble the correct word another 3 times for other 3 buttons
//
// function shuffles (){
// const shuffledArray = [0,1,2,3];
// for (let i = 0; i < 4, i++);{
// shuffledArray.push(shuffle(randWord.split('')).join(''));
//
//  $anagramButtons.html(shuffledArray[i]);
// //


//
//
//
});
