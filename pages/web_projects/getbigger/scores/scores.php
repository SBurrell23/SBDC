<?php

	if(isset($_GET['submitScore'])){
		$playerScore = base64_decode(file_get_contents('php://input'));

		$playerScore  = json_decode($playerScore);
		$ip = $_SERVER['REMOTE_ADDR'];

		$outString = "IP:" . $ip . " --- TRYS:" . $playerScore->trys . " --- APPLESEATEN:" . $playerScore->apples . " --- TIME:" . $playerScore->time . " END\r\n";

		$file = fopen("highscores.txt","a+");
		fwrite($file, $outString);
		fclose($file);
	}

	if(isset($_GET['getHighScores'])){
		$highScores = [];
		$handle = fopen("highscores.txt", "r");
		if ($handle) {
		    while (($line = fgets($handle)) !== false) {
		    	$ip = between($line,'IP#', ' TRYS#');
		    	$trys = (int)between($line,'TRYS#', ' APPLESEATEN#');
		    	$apples = (int)between($line,'APPLESEATEN#', ' TIME#');
		    	$time = between($line,'TIME#', ' END');

		    	if($apples >= 100){
		    		$nice = array("ip"=>$ip , "trys"=> $trys , "apples" => $apples , "time" => $time);
		    		array_push($highScores, $nice);
		    	}
		    }

		    echo json_encode($highScores);
		fclose($handle);
		} else {
		    echo "Error opening highscores.txt file!";
		} 
	}


	function between($string, $start, $end){
	    $string = ' ' . $string;
	    $ini = strpos($string, $start);
	    if ($ini == 0) return '';
	    $ini += strlen($start);
	    $len = strpos($string, $end, $ini) - $ini;
	    return substr($string, $ini, $len);
	}
?>