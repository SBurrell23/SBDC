<?php

	if(isset($_GET['pressButton']))
	{
		//Add user to the pressed buttons file
		pressButton();
	}

	if(isset($_GET['pollForReset']))
	{
		//If player pressed their button, return their position
		if(isUserButtonPressed())
			echo  isUserButtonPressed();
		else
			echo "NOBUTTONFOUND";
	}

	if(isset($_GET['resetButtons']))
	{
		emptyFile();
		echo "Buttons were reset";
	}

	if(isset($_GET['getButtons']))
	{
		echo json_encode(getButtonPresses());
	}



	/////////////Functions Below/////////////

	function pressButton()
	{
		$file = fopen("buttons.txt", "a+") or die("Unable to open file!");
		fwrite($file, $_SERVER['REMOTE_ADDR'] . "#" . $_GET['user'] .  PHP_EOL);
		fclose($file);
	}

	function buttonFileSize()
	{
		return filesize("buttons.txt");
	}

	function isUserButtonPressed()
	{
		$file = fopen("buttons.txt", "r");
		$buzzNumber = 1;
		while(!feof($file)){
		    $line = explode("#", trim(fgets($file)) );
		    if($line[0] == $_SERVER['REMOTE_ADDR']){
		    	fclose($file);
		    	return $buzzNumber;
		    }
		    $buzzNumber++;
		}
		fclose($file);
		return 0;
	}

	function emptyFile(){
		$f = @fopen("buttons.txt", "r+");
		if ($f !== false) {
		    ftruncate($f, 0);
		    fclose($f);
		}
	}

	function getButtonPresses(){
		$out = array();
		$file = fopen("buttons.txt", "r");
		while(!feof($file)){
		    $line = explode("#", trim(fgets($file)) );
		    $buttonInfo = json_decode('{}');
        	$buttonInfo->ip = $line[0];
        	$buttonInfo->name = $line[1];
        	if($line[0] != '')
       			array_push($out, $buttonInfo);
		}
		return $out;
	}

?>