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
  const $anagramButton = $('.anagramButton');
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
  const shuffledWord = shuffle(randWord.split('')).join('');
  $currentWord.html(shuffledWord);
  console.log(shuffledWord, randWord);
  }

  //  pick a random button from the anagramButton array, and set the text to be the correct answer
 



  //   var answerButtons = answersButtons[Math.floor(Math.random()*answerButtons.length)];
  //   // scramble the correct word another 3 times for other 3 buttons
  //
  //
  //
  //
  //
  //
});
