<html>
<head>
	<link rel="icon" href="http://www.deadbydaylight.com/wp-content/uploads/2015/11/dbd-toplogosmall.png">
	<meta http-equiv="refresh" content="2">
</head>
<body background="dbd.jpg">

<div style="color:white;background-color:black;width:600px;padding:50px;padding-top:10px;opacity:0.9">
<h1>Dead By Daylight<small> - Killer Randomizer</small></h1>
<hr>
<?php
	
	$PLAYERS = 4;
	$dataLoc = "game.txt";
	$killerLoc = "killer.txt";

	if(isset($_GET['reset'])){
		unlink($dataLoc);
		unlink($killerLoc);
		delete($dataLoc);
		delete($killerLoc);
	}

	//If user is not playing, enter them into the game.
	if( !isUserInPlay($dataLoc) )
	{
		$file = fopen($dataLoc, "a+") or die("Unable to open file!");
		fwrite($file, $_SERVER['REMOTE_ADDR'] . PHP_EOL);
		fclose($file);
	}

	if(isUserInPlay($dataLoc))	
		echo "<br>You are entered to play! <br><br>";
	


	//If there are not enough players yet, display waiting...
	if(numPlayers($dataLoc) < $PLAYERS){
		echo "Waiting for more players... Need <b>$PLAYERS</b>. Current players: <b>" . numPlayers($dataLoc) . "</b>";
	}

	// There are enough players, parse all the IP's and determine randomly which one should be the killer and display it.
	else
	{
		if(!file_exists($killerLoc))
			createKillerFile($dataLoc,$killerLoc, $PLAYERS);
		echo "<h2>" . determineKiller($killerLoc) . "</h2>";
	}
	


	function createKillerFile($dataLoc, $killerLoc, $PLAYERS)
	{
		$ipKillerArray = array();
		$file = fopen($dataLoc, "r");
		while(!feof($file)){
		    $line = trim(fgets($file));
		    array_push($ipKillerArray, $line);
		}
		fclose($file);

		$killer = $ipKillerArray[mt_rand(0,$PLAYERS - 1)];

		$file = fopen($killerLoc, "w") or die("Unable to open file!");
		fwrite($file, $killer . PHP_EOL);
		fclose($file);
	}
	

	function determineKiller($killerLoc)
	{
		$killerIP = file_get_contents($killerLoc);
		//echo $killerIP;
		if(trim($killerIP) == $_SERVER['REMOTE_ADDR'])
		    	return "YOU ARE THE <span style='color:red'>KILLER!</span> Get ready to kill your friends!";
		return "YOU ARE A <span style='color:green'>SURVIVOR!</span> Get ready to run!";
	}

	
	function isUserInPlay($dataLoc)
	{
		if(!file_exists($dataLoc))
			return false;
		$file = fopen($dataLoc, "r");
		while(!feof($file)){
		    $line = trim(fgets($file));
		    if($line == $_SERVER['REMOTE_ADDR']){
		    	fclose($file);
		    	return true;
		    }
		}
		fclose($file);
		return false;
	}

	function numPlayers($dataLoc)
	{
		$numPlayers = -1;
		$file = fopen($dataLoc, "r");
		while(!feof($file)){
		    $line = fgets($file);
		    $numPlayers++;
		}
		return $numPlayers;
	}


?>
</div>
</body>
</html>
