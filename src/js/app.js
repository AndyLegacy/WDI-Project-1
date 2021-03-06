$(() => {
  console.log('we\'re all gonna make it bruh');


  function Glossary(words) {
    this.words = words;
    this.length = this.words.length;
  }

  Glossary.prototype.randWord = function() {
    return this.words[Math.floor(Math.random() * this.length)];
  };

  const glossary = new Glossary([
    'adept', 'aphid', 'signature', 'computer', 'alphabet', 'arena', 'argon',
    'satellite', 'backpack', 'aster', 'augur', 'leather', 'passport', 'bathe',
    'being', 'guitar', 'chair', 'chart', 'cheer', 'cilia', 'cloud',
    'death', 'delph', 'devil', 'evade', 'exode', 'exult', 'farse',
    'fever', 'flesh', 'flock', 'diamond', 'kaleidoscope', 'balloon', 'homer',
    'barbecue', 'lumen', 'lymph', 'phono', 'photo', 'coffee', 'telescope',
    'rogue', 'restaurant', 'rosin', 'bible', 'bridge', 'screw', 'sense', 'racket','torpedo', 'weapon',
    'stomach','tapestry', 'thermometer', 'pyramid', 'pendulum', 'microscope', 'liquid', 'hieroglyph', 'eraser',
    'cappuccino','asphyxiate','expect', 'expected','rhythm', 'rhyme', 'cemetary', 'indict', 'embarass', 'hijinks',
    'ensued','synonym','development','indices','disembogue', 'vernacular','recommend', 'occurred','psychiatrist','definite',
    'illicit', 'fluorescent', 'ennui','phlegm','feign','chliche', 'typhoon','eucalyptus','bugles','pneumonia',
    'pneumatic', 'jubilant','canoe','hullabaloo','coercion', 'aurae',	'odious','idleness','tortoise', 'elude', 'proconsul','simian',
    'tarsier','trailing', 'tiling', 'conquer', 'vanquish', 'subdue', 'annihilate', 'ascend', 'subjugate', 'coxis', 'hernia', 'serratus', 'anterior',
    'posterior', 'rearward', 'canthus', 'glabella', 'mischievous', 'laborious', 'overwrought', 'unceremonious',
    'unmannerly', 'nefarious','degenerate','profligate', 'spendthrift'

  ]);

  // cache your DOM elements (start button, reset button, timer, currentWord, anagramButton) using jQuery
  const $startGame = $('.startGame');
  const $timer = $('#timer');
  const $currentWord = $('#currentWord');
  const $anagramButtons = $('.anagramButton');
  const $winLose= $('.winLose');
  const $score = $('#score');
  const $reset = $('#reset');
  console.log($reset);
  const $rules = $('#rules');


  let timeRemaining = 5;
  let timerIsRunning = false;
  let timerid = null;


  $startGame.on('click', () => {
    console.log('click');
    if(!timerIsRunning)  {
      timerIsRunning = true;
      timerid = setInterval(countDown, 10);
      console.log(timeRemaining);
      $currentWord.show('fast');
      $anagramButtons.show('fast');
      $rules.hide('fast');
      $timer.show('fast');
      $reset.hide('fast');
      $startGame.hide('fast');



    } else {
      timerIsRunning = false;
      clearInterval(timerid);
    }
  });

  function countDown() {
    if (timeRemaining === 0) {
      clearInterval(timerid);
      timerIsRunning = false;
      $winLose.css('visibility', 'visible');
      $winLose.text('You Lose!!!!');
      $timer.hide('fast');
      $reset.show('fast');
      $currentWord.hide('fast');
      $anagramButtons.hide('fast');


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

  let randWord = null;
  function setRound() {
    randWord = glossary.randWord();
    const shuffledWords = [];

    $anagramButtons.html('');

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
  }

  setRound();

  let newScore = 0;
  //shuffle(); //CANNOT CALL FUNCTION HERE- doesnt accept argument either- dear javascript what will you accept? how about a fiver?
  $anagramButtons.on('click', (e) => {

    const buttonPoint = $(e.target).html();
    if (buttonPoint === randWord){
      newScore++;
      $score.html(newScore);
      setRound();
      if (newScore === 10) winGame();
      if (newScore === 10) clearInterval(timerid);
      if (newScore) timeRemaining = 5;
    } else {
      $winLose.css('visibility', 'visible');
      $reset.css('visibility', 'inherit');
      $winLose.text('You Lose!!!!');
      $timer.hide('fast');
      $currentWord.hide('fast');
      $anagramButtons.hide('fast');
      $reset.show('fast');


    }

  });

  function winGame() {

    $winLose.css('visibility', 'visible');
    $reset.css('visibility', 'inherit');
    $winLose.text('Congratulations! You Win!!');
    $timer.hide('fast');
    $currentWord.hide('fast');
    $anagramButtons.hide('fast');
    $reset.show('fast');
  }

  $reset.on('click', () => {
    console.log('click');
    newScore = null;
    $score.html('Score');
    clearInterval(timerid);
    $timer.html(parseFloat(0).toFixed(2));
    $winLose.text('');
    $rules.show('fast');
    $currentWord.hide('fast');
    $anagramButtons.hide('fast');
    $reset.hide('fast');
    $timer.hide('fast');
    timeRemaining = 5;
    $startGame.show('fast');
    setRound();

    console.log(timerIsRunning);


  });

});
