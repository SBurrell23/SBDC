<?php


$file = file("messages.txt");
for ($i = max(0, count($file)-25); $i < count($file); $i++) {
  echo $file[$i];
}


?>