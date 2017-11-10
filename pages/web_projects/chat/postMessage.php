<?php

$post = file_get_contents('php://input');
date_default_timezone_set('Etc/GMT+0');
$t=time();
$message = date("h:i:s",$t) . " (" . $_SERVER['REMOTE_ADDR'] ."): " .  str_replace('+', ' ', substr($post, strrpos($post, '=') + 1)) . "\n";

if(str_replace('+', ' ', substr($post, strrpos($post, '=') + 1)) == 'clear'){
	$file = fopen("messages.txt","w");
	fwrite($file, '');
	fclose($file);
	return;
}

$file = fopen("messages.txt","a+");
fwrite($file, $message);
fclose($file);

echo $message;

?>