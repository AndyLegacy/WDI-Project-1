$(() => {
  console.log('im still here bro');
  (function(wordString){

    function Glossary(words) {
      this.words = words;
      this.length = this.words.length;
    }

    const glossaryProto = Glossary.prototype;

    glossaryProto.randWord = function() {
      return this.words[Math.floor(Math.random() * this.length)];
    };

    glossaryProto.removeWord = function(word) {
      const index = this.words.indexOf(word);
      this.words.splice(index, 1);
      this.updateWordCount;
    };

    glossaryProto.updateWordCount = function () {
      this.length = this.words.length;

    };


    const game = {};

    game.currentWord = document.getElementById('CurrentWord');

    game.timer = document.getElementById('timer');

    game.buttons = document.getElementByClassName('anagramButton');

    game.resetButton = document.getElementById('resetButton');

    game.correctButton = null;

    game.currentGlossary = null;

    game.scoreNum = 0;

    game.millsecondsLeft = 500;

    game.glossary = {
      gameWords: new Glossary([
        'aeon', 'aero', 'back', 'bang', 'been', 'bell', 'bios',
        'blog', 'blot', 'bots', 'cafe', 'come', 'edgy', 'fold',
        'from', 'good', 'have', 'here', 'howl', 'just', 'know',
        'like', 'long', 'make', 'many', 'more', 'much', 'navy',
        'only', 'over', 'some', 'spew', 'such', 'tact', 'take',
        'than', 'that', 'them', 'they', 'this', 'time', 'very',
        'want', 'well', 'were', 'when', 'will', 'with', 'your'
      ])

    };

    game.GetCorrectChoice = function(word) {
      let output;

      do {
        output = wordString.shuffle(word);
      }while (output === word);
      return output;
    };

    game.getIncorrectChoice = function(word) {
      let output;

      do {
        output = wordString.replaceLetter(word);
      } while (wordString.isCorrect(output, game.correctButton.innerHTML));

      return wordString.shuffle(output);
    };

    game.removePrevWord = function () {
      const prevWord = this.currentWord.innerHTML;
      this.Glossary.removeWord(prevWord);
    };

    game.updateWord = function() {
      this.removePrevWord();
      this.currentWord.innerHTML = this.Glossary.randWord();
    };

    game.updateButtons = function () {
      let i;

      this.correctButton = this.buttons[Math.floor(Math.random() * 4)];
      this.correctButton.innerHTML = game.getCorrectChoice(this.currentWord.innerHTML);

      for (i = 0; i < this.buttons.length; i++) {
        if (this.buttons[i] === this.correctButton) {
          continue;
        }
        this.buttons[i].innerHTML = game.getIncorrectChoice(this.currentWord.innerHTML);
      }
      for (i = 0; i < this.buttons.length; i ++) {
        this.buttons[i].addEventListen('click', this.clickHandler);
      }
    };
    game.displayTimer = function() {
      clearInterval(game.timer);
      game.timer = setInterval(function() {
        if (game.millsecondsLeft === 0) {
          clearInterval(game.timer);
          game.over();
        } else {
          game.millsecondsLeft--;
        }
        const time = document.getElementbyId('timer');
        time.innerHTML = (game.millsecondsLeft / 100).toFixed(2);
      }, 10);

    };

    game.resetTimer = function() {
      game.millsecondsLeft = 500;
    };

    game.clickHandler = function(event) {
      const clickedButton = event.target;
      if (clickedButton === game.correctButton) {
        game.resetTimer();
        game.removePrevWord();
        game.render();
      } else {
        game.over(clickedButton);
      }

      game.resetButton.addEventlistener('click', function(){
        window.location ='index.html';
      });
    };

    game.over= function(clickedButton) {
      game.millsecondsLeft  = 0;

      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].removeEventListener('click', this.clickHandler);
      }
      if (clickedButton) {
        clickedButton.style.background = 'red';
        clickedButton.style.border = '2px';
      }

      this.correctButton.style.background = 'green';
      this.correctbutton.style.background = '2px';
    };

    game.render = function() {
      this.updateGlossary();
      this.updateWord();
      this.updateButtons();
      this.displayTimer();

    };
    game.render();





  })(wordString);



});
