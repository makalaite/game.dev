<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
          integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">

    <title>Fast keyboard game</title>
</head>
<body>
<div id="register" class="hidden">
    <span class="input-group-addon" id="sizing-addon1">Fast Typing game starts here</span>
    <input type="text" class="form-control" id="name" placeholder="Insert Your username">
    <br/>
    <button type="button" class="btn btn-success" id="go" disabled>GO!</button>
</div>


<div id="level" class="hidden">

    <legend>Choose a level, <span id="nickname"></span></legend>
    <div class="form-check">
        <br/>
        <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value=9>
        EASY
        <br/>
        <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value=6>
        MEDIUM
        <br/>

        <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value=3>
        HARD
        <br/>
        <button type="submit" class="btn btn-success" id="next">NEXT</button>
    </div>

</div>


<div id="game" class="hidden">

    <h3 id="user"> chose <span id="levelIs"> </span> </h3>
    <h4> score is: <span id="score">0</span> </h4>
    <h1 id="letter"></h1>
    <h4>You still have <span id="liveScore"><b> 3 </b></span> lives to live</h4>
    <h5> your time is: <span id="time">  </span> </h5>

    <div id="gift"></div>
</div>

<div id="over" class="hidden">

    <h1>say whaat?! <span id="textOver"></span></h1>

    <button id="again">Try again?</button>
    <a href="{{route('app.game.index')}}"><button id="viewScore"> View score</button></a>
</div>

<div>

</div>

</body>
<script type="text/javascript" src="js/gameLogic.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"
        integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"
        integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn"
        crossorigin="anonymous"></script>
<script>
    var scoreD = new FastTyping();                                                                //it loads automatically after all scripts. if using 'new' you can add it to variable use it like var game = new FastTyping();
    scoreD.setScoreData('{{route('app.game.store')}}');
</script>
</html>