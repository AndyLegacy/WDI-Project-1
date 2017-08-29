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
  // const $resetButton = $('#reset');
  const $timer = $('#timer');
  const $currentWord = $('#currentWord');
  const $anagramButtons = $('.anagramButton');
  // const $answerButtons = $('#answerButtons');
  const $score = $('#score');


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
  let shuffledWords = [];

  while(shuffledWords.length < 4) {
    const shuffledWord = shuffle(randWord.split('')).join('');
    if(!shuffledWords.includes(shuffledWord)) shuffledWords.push(shuffledWord);
  }

  // setting the current word to be the last element in the shuffled words array + removing it from the array
  $currentWord.html(shuffledWords.pop());
  // pick one index out of array of possible button indexs
  const randomIndex = Math.floor(Math.random() * 4);
  // remove that chosen index from the array so that it can't be picked again

  // set the html of one button to be the correct answer
  const $correctButton = $anagramButtons.eq(randomIndex);
  $correctButton.html(randWord);

  $anagramButtons.each((i, button) => {
    if(!$(button).html()) $(button).html(shuffledWords.pop());
  });

  let newScore = 0;
  $anagramButtons.on('click', (e) => {

    const buttonPoint = $(e.target).html();
    if (buttonPoint === randWord){
      newScore++;
      console.log(newScore);
      $score.html(newScore);
      console.log('itWorks');
      // shuffle();        /*find right array*/
      shuffledWords = [];
    } else {
      console.log('lose');

    }

  });












});
