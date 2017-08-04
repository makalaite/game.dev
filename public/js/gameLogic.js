var FastTyping = function () {
    /** describing states
     * @type {string}
     */
    const STATE_REGISTER = 'register';
    const STATE_LEVEL_SELECTION = 'choose_level';
    const STATE_GAME = 'game';
    const STATE_GAME_OVER = 'game_over';

    var name,                                               //for later use in RegisterLogics
        lastState,                                           //for later use in switch
        level,
        score,
        ScoreData,
        duration,
        average_speed;

    /**
     * prescribing route as value for html usage
     * @param value
     */

    this.setScoreData = function (value) {
        ScoreData = value;
    };


    /**
     * every view has logic for every state. one has to be default (register).
     * It will show register form and clean input after game is over unless you're using it again. and disabled go button.
     * one state will be SHOW other - HIDE;
     * @constructor
     */

        //---------------------------------------------------- Register ---------------------------------------------------------

    var RegisterLogics = function () {
            var view = $('#register');                      //jquery object created, now we can use jquery functions
            var input = $('#name');
            var button = $('#go');

            this.show = function () {                       //it's possible tu use it like public because of THIS
                view.removeClass('hidden');                 //removes hidden class (from bootstrap) that you could see the view
                enable();
            };

            this.hide = function () {                       //removed before, now we need to add the same class
                view.addClass('hidden');
                disable();
            };

            /**
             * will be checking the value.length of input and will activate the button after
             */
            function enable()                               //will be used with show cuz it enables the button after
            {
                input.keyup(function () {
                    if (input.val().length >= 3) {
                        button.attr('disabled', false);
                    } else {
                        button.attr('disabled', true);
                    }
                });

                button.click(function () {
                    name = input.val();
                    changeState(STATE_LEVEL_SELECTION)
                });
            }

            function disable() {
                input.unbind();
                button.unbind();
                input.val('');
            }
        };

    /** initializing object. now u can call it with this variable. it's prepared for using in switch.
     * possible to create object only after describing function name.
     * @type {RegisterLogics}
     */
    var register = new RegisterLogics();

    //---------------------------------------------------------- Select Level ----------------------------------------------------------------

    var LevelSelectionLogics = function () {
        var view = $('#level');                                                         //jquery object created, now we can use jquery functions
        var button = $('#next');


        this.show = function () {                                                        //it's possible tu use it like public because of THIS
            view.removeClass('hidden');                                                  //removes hidden class (from bootstrap) that you could see the view
            $('#nickname').html(name);
            enable();
        };

        this.hide = function () {                                                   //removed before, now we need to add the same class
            view.addClass('hidden');
            disable();
        };

        /** var level with checkbox value defined by them names;
         * enables chosen inputs value and changes state
         */
        function enable() {
            button.click(function () {
                level = $('input[name = optionsRadios]:checked').val();
                changeState(STATE_GAME)
            });
        }

        function disable() {
            button.unbind();
        }
    };

    var levelSelection = new LevelSelectionLogics();

    //---------------------------------------------------------------- THE GAME ----------------------------------------------------------

    var GameLogics = function () {
        var view = $('#game'),
            letters = 'abcdefghijklmnprstuvwxyz',
            timeOut,
            letterPlacement = $('#letter'),
            letterKey,

            liveCount,

            userInput = true,
            is_golden,

            letterAppearance,
            keyUpTime,
            amount,
            prise = '<img src=https://img.lrytas.lt/show_foto/?f=4&s=19&id=1697341>',
            gameStart,
            gameFinish,
            totalKeys = 0,                                          //need to be 0 for every new start
            totalAverage = 0;


        this.show = function () {
            view.removeClass('hidden');
            liveCount = 3;
            score = 0;
            $('#user').html(name);
            $('#levelIs').html(level);

            changeLetter();
            enable();
        };

        this.hide = function () {
            view.addClass('hidden');
            disable();
        };

        function updateScore() {

            $('#score').html(score);

            /**
             * adds 1 live every 20 scores
             */

            if (score % 20 === 0) {
                liveCount += 1;
                $('#liveScore').html(liveCount);
            }

            /**
             * turns variable into opposite that i would start to spin from negative value and gives 5 points if it's true
             */
            if (is_golden) {
                is_golden = false;
                for (var i = 0; i < 5; i++) {
                    updateScore();
                }
            } else {
                score += 1;
            }

            if (score === 150) {
                victory();
            }
        }

        /**
         * if live is 0, redirects to game over state
         */

        function removeLive() {
            liveCount -= 1;
            if (liveCount === 0) {
                gameFinish = Date.now();
                durationResult();
                changeState(STATE_GAME_OVER);
            }

            $('#liveScore').html(liveCount);

        }

        function disable() {
            $(window).unbind();
            clearTimeout(timeOut);
        }

        /**
         *
         */

        function enable() {
            $(window).keyup(function (e) {
                if (e.key === letters[letterKey]) {
                    updateScore();
                    averageSpeedResult()
                } else {
                    removeLive();
                }

                /**
                 * setting time for key up before new letter appearance
                 * @type {number}
                 */
                keyUpTime = Date.now();
                setTime();

                userInput = true;
                changeLetter();

                gameStart = Date.now();
                durationResult();
            })
        }

        function changeLetter() {

            if (liveCount < 0)
                return;

            clearTimeout(timeOut);
            letterKey = Math.round(Math.random() * (letters.length - 1));
            letterPlacement.html(letters[letterKey]);
            letterAppearance = Date.now();                                       //setting time when a letter appears
            timeOut = setTimeout(changeLetter, level * 1000);

            if (!userInput) {
                removeLive();
            }
            userInput = false;

            if (Math.random() < 0.1) {
                is_golden = true;
                letterPlacement.addClass('golden');
            } else {
                is_golden = false;
                letterPlacement.removeClass('golden');
            }
        }

        function setTime() {
            amount = (keyUpTime - letterAppearance) * 0.001;
            $('#time').html(amount);
        }

        function victory() {
            $('#gift').html(prise);
        }

        function durationResult() {
            duration = (gameFinish - gameStart) * 0.001;
            $('#duration').html(duration);
        }

        function averageSpeedResult() {
            totalAverage += Date.now() - letterAppearance;
            totalKeys++;
            average_speed = (totalAverage / totalKeys) * 0.001;
        }

    };

    var game = new GameLogics();

    //-------------------------------------------------------------- Game Over -------------------------------------------------

    var GameOverLogics = function () {

        var view = $('#over');
        var lastText = 'Oops.. you just lost the game:)';
        var again = $('#again');

        this.show = function () {
            view.removeClass('hidden');
            enable();
        };

        this.hide = function () {
            view.addClass('hidden')
        };

        function enable() {
            saveData();
        }

        $('#textOver').html(lastText);

        again.click(function () {
            changeState(STATE_REGISTER)
        });

        /**
         * Sets the default values for future AJAX requests
         */

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        /**
         * exchanging data with a server, and update parts of a web page - without reloading the whole page.
         */

        function saveData() {

            var data = {
                name: name,
                level: level,
                score: score,
                duration: duration,
                average_speed: average_speed
            };

            console.log(data);

            $.ajax({
                url: ScoreData,
                method: "POST",
                data: data
            });
        }
    };

    var gameOver = new GameOverLogics();

    //----------------------------------------------------------------- Changing a state ---------------------------------------

    /**
     * For states use
     */
    function changeState(value) {
        /**
         * if there is a state, have to change it. in every state they will be hidden.
         */

        if (lastState) {
            lastState.hide();
        }

        switch (value) {
            case STATE_REGISTER:
                lastState = register;                        //register was created before as object and we're calling it with lastState for using show() later.

                break;

            case STATE_LEVEL_SELECTION:

                lastState = levelSelection;                    //new state requires new last state value, otherwise it will show te same (register)

                break;

            case STATE_GAME:
                lastState = game;
                break;

            case STATE_GAME_OVER:
                lastState = gameOver;
                break;
        }

        lastState.show();
        // console.log('changing', lastState);
    }


    /**
     * initializing first state
     */
    changeState(STATE_REGISTER);
};