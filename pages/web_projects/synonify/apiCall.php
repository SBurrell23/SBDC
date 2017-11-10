<?php

	$wordLengthToSynonify = 5;
	$synonifyInput = file_get_contents('php://input');
	$inputArray = explode(' ', $synonifyInput);

	for ($i=0; $i < sizeof($inputArray); $i++)
	{ 
		$word = preg_replace("/[^A-Za-z0-9 ]/", '',str_replace("\"","",$inputArray[$i]));
		if(strlen($word) >= $wordLengthToSynonify)
		{
			$synList = json_decode(@file_get_contents("http://words.bighugelabs.com/api/2/1d618baa9a1c1cef7b4c8937fa6687b9/".$word."/json"));
			if($synList != null){
				if(array_key_exists("noun",$synList))
					$replacement = $synList->noun->syn[rand(0,sizeof($synList->noun->syn)-1)];
				if(array_key_exists("adverb",$synList))
					$replacement = $synList->adverb->syn[rand(0,sizeof($synList->adverb->syn)-1)];
				else if(array_key_exists("verb",$synList))
					$replacement = $synList->verb->syn[rand(0,sizeof($synList->verb->syn)-1)];
				if(array_key_exists("adjective",$synList))
					$replacement = $synList->adjective->syn[rand(0,sizeof($synList->adjective->syn)-1)];

				$synonifyInput = str_replace($word,$replacement,$synonifyInput);
			}
		}
	}

	echo str_replace("\"","",$synonifyInput);