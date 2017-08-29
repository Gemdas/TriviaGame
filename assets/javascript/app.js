$(document).ready(function() {
	//create a new object called question
	function question(ques, ans, wro, we1,we2)
	{
		this.question=ques;
		this.answer=ans;
		this.wrong=wro;
		this.wrongEliminated1=we1;
		this.wrongEliminated2=we2;
	}
	//create array of question objects
	var questionList=[];
	questionList.push(new question("#0963 Who wrote the cult novel 'Generation X'?", "Douglas Coupland", "Jay McInerney", "Bret Easton Ellis","Will Self"));
	questionList.push(new question("#0078 August 16th 2003 was the 40th anniversary of which 'Great' robbery?", "Train", "Balloon", "Hovercraft","Pushchair"));
	questionList.push(new question("#0525 In which of these sports would you make use of the backboard?", "Basketball", "Darts", "Pool","Diving"));
	questionList.push(new question("#0932 Which Scottish writer was created the first Baron Tweedsmuir?", "John Buchan", "Compton Mackenzie", "Walter Scott","Robert L Stevenson"));
	questionList.push(new question("#1011 Who auditioned for the role of James Bond in 1969 but was turned down for being too tall?", "Peter Snow", "John Cleese", "Simon Dee","Christopher Lee"));
	questionList.push(new question("#0136 Which of these is a village in Somerset?", "Cheddar", "Brie", "Gorgonzola","Emmental"));
	questionList.push(new question("#0940 Which of these capital cities stands at the mouth of the River Plate?", "Montevideo", "Lima", "Brasilia","Quito"));		
	questionList.push(new question("#0002 Which of these kills its victims by constriction?", "Anaconda", "Andypandy", "Andalucia","Annerobinson"));		
	questionList.push(new question("#0292 Black Eyed Peas had a UK chart-topper in 2003 with 'Where is the ...'?", "Love?", "Cashpoint?", "Bus Stop?","Chip point?"));		
	questionList.push(new question("#0935 In which city was the first GAP store founded in the 1960s?", "San Francisco", "Los Angeles", "New York","Boston"));
	questionList.push(new question("#0333 Which is not an electrical SI unit of measurement?", "Grave", "Volt", "Ampere","Ohm"));
	questionList.push(new question("#1002 In which sport is the Sam Maguire Cup annually contested?", "Gaelic Football", "Bowls", "Curling","Ice hockey"));
	questionList.push(new question("#0248 Which of these might be sprinkled on a rice pudding?", "Cinnamon", "Cinnabar", "Cincinnati","Cinerama"));
	questionList.push(new question("#0411 Which of these is a tool used for making holes for seeds or plants?", "Dibber", "Dobber", "Dabber","Dubber"));
	questionList.push(new question("#0566 What name is given to someone who makes, transports or sells something illicit?", "Bootlegger", "Trickster", "Blacklegger","Footpadder"));
	var index;
	var prize=[0,100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000];
	var prizeLevel=1;
	var timerId;
	var time=30;
	var currentQuestion;
	var isPlaying=true;
	var has5050=true;
	var hasPAF=true;
	var hasATA=true;
	var hasExited = false;
	// sound effects
	var soundEffects = document.createElement("audio");
	soundEffects.setAttribute("src", "assets/sounds/intro.mp3");
	soundEffects.play();
	var soundEffectsLoop =document.createElement("audio");
	soundEffectsLoop.loop=true;
	var soundStorage;
	var isATA;
	//Start Screen set up
	$("#Dialogue-Box").html("<h1>Welcome to Who Wants to be a Millionaire, press start to begin play</h1>");
	$(document).on("click", ".Start", function() {
		soundEffects.pause();
		index=Math.floor(Math.random()*questionList.length);
		has5050=true;
		hasPAF=true;
	 	hasATA=true;
		isPlaying=true;
		setUpQuestion();
		$(".life-line").removeClass("hidden");
		$(".life-line").css({opacity:"1"});
		$(this).removeClass("Start");
		$(this).addClass("Walkaway");
		$(this).html("Walkaway");
	});
	$(document).on("click", ".Next", function() {
		soundEffects.pause();
		index++;
		if (index===questionList.length)
		{
			index=0;
		}
		isPlaying=true;
		setUpQuestion();
		$(this).removeClass("Next");
		$(this).addClass("Walkaway");
		$(this).html("Walkaway");
	});

	//Generate Question that knows the correct answer include offer to walkaway
	function setUpQuestion()
	{
		if (prizeLevel===15)
		{
			soundEffectsLoop.setAttribute("src", "assets/sounds/stufe_3_letzte_frage.mp3");
		}
		else if(prizeLevel>10)
		{
			soundEffectsLoop.setAttribute("src", "assets/sounds/stufe_3.mp3");
		}
		else if(prizeLevel>5)
		{
			soundEffectsLoop.setAttribute("src", "assets/sounds/stufe_2.mp3");
		}
		else
		{
			soundEffectsLoop.setAttribute("src", "assets/sounds/stufe_1.mp3");
		}
		soundEffectsLoop.play();
		time=30;
		currentQuestion=questionList[index];
		var random1=Math.ceil(Math.random()*4);
		var random2;
		while(random1===random2||random2===undefined)
		{
			random2=Math.ceil(Math.random()*4);
		}
		var random3;
		while(random3===random2||random3===random1||random3===undefined)
		{
			random3=Math.ceil(Math.random()*4);
		}
		var random4=10-random1-random2-random3;
		$("#Answer-Box"+random1).html(currentQuestion.answer);
		$("#Answer-Box"+random1).addClass("Answer");
		$("#Answer-Box"+random1).removeClass("hidden");
		$("#Answer-Box"+random2).html(currentQuestion.wrong);
		$("#Answer-Box"+random2).addClass("Wrong");
		$("#Answer-Box"+random2).removeClass("hidden");
		$("#Answer-Box"+random3).html(currentQuestion.wrongEliminated1);
		$("#Answer-Box"+random3).addClass("Wrong Eliminate");
		$("#Answer-Box"+random3).removeClass("hidden");
		$("#Answer-Box"+random4).html(currentQuestion.wrongEliminated2);
		$("#Answer-Box"+random4).addClass("Wrong Eliminate");
		$("#Answer-Box"+random4).removeClass("hidden");
		$("#Question-Box").html("<h2>"+ currentQuestion.question+ "</h2>");
		$("#Dialogue-Box").html("<h1>$ "+ prize[prizeLevel] + "</h1>");
		$("#Timer-Box").html("<h3>"+time+"</h3>");
	//start timer
		timerId= setInterval(Timer, 1000);
	}
	//if correct answer picked move forward and tell the player their cash
	$(document).on("click", ".Answer", function() {
		clearInterval(timerId);
		soundEffectsLoop.pause();
		if (prizeLevel===15)
		{
			soundEffects.setAttribute("src", "assets/sounds/richtig_stufe_3_letzte.mp3");
		}
		else if(prizeLevel>10)
		{
			soundEffects.setAttribute("src", "assets/sounds/richtig_stufe_3.mp3");
		}
		else if(prizeLevel>5)
		{
			soundEffects.setAttribute("src", "assets/sounds/richtig_stufe_2.mp3");
		}
		else
		{
			soundEffects.setAttribute("src", "assets/sounds/richtig_stufe_1.mp3");
		}
		soundEffects.play();
		time=30;
		prizeLevel++;
		$("#Dialogue-Box").html("<h1> CORRECT </h1>");
		if (prizeLevel===prize.length)
		{
			$("#Question-Box").html("<h2> You have won a million dollars, congrats</h2>");
		}
		reset(prizeLevel<prize.length);
	//if answers the million dollar question give them the money and offer reset
	});
	//if answered wrong give them the money they earn by getting it wrong and offer reset
	$(document).on("click", ".Wrong", function() {
		$("#Dialogue-Box").html("<h1> INCORRECT </h1>");
		soundEffectsLoop.pause();
		soundEffects.setAttribute("src", "assets/sounds/falsch.mp3");
		soundEffects.play();
		clearInterval(timerId);
		wrong(false);	
	});
	//if the player walks away give money earned and offer reset
	$(document).on("click", ".Walkaway", function() {
		$("#Dialogue-Box").html("<h1> WALK AWAY </h1>");
		soundEffectsLoop.pause();
		console.log(currentQuestion);
		clearInterval(timerId);
		wrong(true);
	});
	//Timer that counts down and stop things at zero
	function Timer()
	{
		time--;
		$("#Timer-Box").html("<h3>"+time+"</h3>");
		if(time<=0)
		{
			clearInterval(timerId);
			soundEffectsLoop.pause();
			$("#Dialogue-Box").html("<h1> TIMES UP </h1>");
			wrong(true);
		}
	}
	function wrong(didWalkaway)
	{
		if (didWalkaway)
		{
			$("#Question-Box").html("<h2> I'm sorry you walked away, the answer was "+ currentQuestion.answer + ". You walk away with $"+prize[prizeLevel-1] +"</h2>");
			soundEffects.setAttribute("src", "assets/sounds/spielende_kandidat_geht.mp3");
			soundEffects.play();
		}
		else
		{
			prizeLevel=prizeLevel-(prizeLevel%5);
			$("#Question-Box").html("<h2> I'm sorry you got it wrong, the answer was "+ currentQuestion.answer + ". You walk away with $"+prize[prizeLevel] +"</h2>");
		}
		reset(false);
	}
	function reset(keepGoing)
	{
		
		if (keepGoing)
		{
			$("#Question-Box").html("<h2> Correct, you now move on to the $"+prize[prizeLevel] +" question</h2>");
			$("#Timer-Box").html("<h3>next question</h3>");
			$("#Start-Box").html("Next");
			$("#Start-Box").addClass("Next");
			$("#Start-Box").removeClass("Walkaway");
			isPlaying=false;
		}
		else
		{
			isPlaying=false;
			prizeLevel=1;
			$("#Timer-Box").html("<h3>play again?</h3>");
			$("#Start-Box").html("Play Again");
			$("#Start-Box").addClass("Start");
			$("#Start-Box").removeClass("Walkaway");
		}
		for (var i=1; i<=4; i++)
		{
			$("#Answer-Box"+i).removeClass("Answer");
			$("#Answer-Box"+i).removeClass("Wrong");
			$("#Answer-Box"+i).removeClass("Eliminate");
			$("#Answer-Box"+i).removeClass("opacity");
			$("#Answer-Box"+i).addClass("hidden");
		}
	}
	//bonus
	$(document).on("click", ".life-line", function() {
		if (isPlaying)
		{
			$(this).animate({ opacity: "0.05" });
		}
	});
	//ask the audience opens a let me google link
	$(document).on("click", "#Google-Box", function() {
		if(hasATA&&isPlaying)
		{
			hasATA=false;
			isATA=true;
			soundEffectsLoop.pause();
			soundEffects.setAttribute("src", "assets/sounds/publikumsjoker_start.mp3");
			soundEffects.play()
			var google=currentQuestion.question;
			google=google.slice(6,google.length-1);
			for (var i = 0; i < google.length; i++) {
				if(google.charAt(i)===' ')
				{
					google=google.replace(" ","+");
				}
			}
			clearInterval(timerId);
			soundStorage=soundEffectsLoop.getAttribute("src");
			soundEffectsLoop.setAttribute("src", "assets/sounds/publikumsjoker_loop.mp3");
			soundEffectsLoop.play();
			window.open("http://lmgtfy.com/?q="+google,'_blank');
			hasExited=true;
		}
	});
	//5050 removes two answers
	$(document).on("click", "#Fifty-Fifty-Box", function() {
		if(has5050&&isPlaying)
		{
			has5050=false;
			$(".Eliminate").addClass("opacity");
			$(".Eliminate").removeClass("Wrong");
			soundEffects.setAttribute("src", "assets/sounds/50_50.mp3");
			soundEffects.play();
		}
	});
	//phone a friend opens slack for the class
	$(document).on("click", "#Phone-A-Friend-Box", function() {
		if(hasPAF&&isPlaying)
		{
			clearInterval(timerId);
			isATA=false;
			soundEffectsLoop.pause();
			soundEffects.setAttribute("src", "assets/sounds/telefonjoker_start.mp3");
			soundEffects.play()
			window.open("https://july2017pt.slack.com/",'_blank');
			soundStorage=soundEffectsLoop.getAttribute("src");
			soundEffectsLoop.setAttribute("src", "assets/sounds/telefonjoker_loop.mp3");
			soundEffectsLoop.play();
			hasExited=true;
		}
	});
	//checks to see if you have returned to the window
	$(window).on("focus", function(){
		if (hasExited)
		{
			soundEffectsLoop.pause();
			if(isATA)
			{
				soundEffects.setAttribute("src", "assets/sounds/publikumsjoker_ende.mp3");
				soundEffects.play()
			}
			else
			{
				soundEffects.setAttribute("src", "assets/sounds/telefonjoker_ende.mp3");
				soundEffects.play()
			}
			hasExited=false;
			soundEffectsLoop.setAttribute("src", soundStorage);
			soundEffectsLoop.play();
			timerId= setInterval(Timer, 1000);
		}
	});
});             