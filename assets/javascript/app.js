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
	//create array of ?arrays of? question objects
	var questionList=[];
	questionList.push(new question("#0963 Who wrote the cult novel 'Generation X'?", "Douglas Coupland", "Jay McInerney", "Bret Easton Ellis","Will Self"));

	var prize=[0,100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000];
	var prizeLevel=1;
	var timerId;
	var time=30;
	var currentQuestion;
	//Start Screen set up
	$("#Dialogue-Box").html("<h1>Welcome to Who Wants to be a Millionaire, press start to begin play</h1>");
	$(document).on("click", ".Start", function() {
		setUpQuestion();
		$(this).removeClass("Start");
		$(this).addClass("Walkaway");
		$(this).html("Walkaway");
	});
	//Generate Question that knows the correct answer include offer to walkaway
	function setUpQuestion()
	{
		time=30;
		currentQuestion=questionList[Math.floor(Math.random()*questionList.length)];
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
		clearInterval(timerId);
		wrong(false);	
	});
	//if the player walks away give money earned and offer reset
	$(document).on("click", ".Walkaway", function() {
		$("#Dialogue-Box").html("<h1> WALK AWAY </h1>");
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
			$("#Dialogue-Box").html("<h1> TIMES UP </h1>");
			wrong(true);
		}
	}
	function wrong(didWalkaway)
	{
		if (didWalkaway)
		{
			$("#Question-Box").html("<h2> I'm sorry you walked away, the answer was "+ currentQuestion.answer + ". You walk away with $"+prize[prizeLevel-1] +"</h2>");
		}
		else
		{
			prizeLevel=prizeLevel-(prizeLevel%5);
			console.log(prizeLevel);
			$("#Question-Box").html("<h2> I'm sorry you got it wrong, the answer was "+ currentQuestion.answer + ". You walk away with $"+prize[prizeLevel] +"</h2>");
		}
		reset(false);
	}
	function reset(keepGoing)
	{
		
		if (keepGoing)
		{
			$("#Question-Box").html("<h2> Correct, you now move on to the $"+prize[prizeLevel-1] +" question</h2>");
			$("#Timer-Box").html("<h3>next question</h3>");
			$("#Start-Box").html("Next");
			$("#Start-Box").addClass("Start");
			$("#Start-Box").removeClass("Walkaway");
		}
		else
		{
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
			$("#Answer-Box"+i).addClass("hidden");
		}
	}
	//bonus
	//ask the audience opens a let me google link
	//5050 removes two answers
	//phone a friend opens slack for the class
});