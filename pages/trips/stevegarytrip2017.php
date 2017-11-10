<?php include 'header.php' ?>

    <!-- Page Content -->
    <div class="container">

        <!-- Jumbotron header -->
		<h1 class="page-header">Winnipeg List<small> - 2017</small></h1>
        <!-- /.Jumbotron header -->

        <!-- Jumbotron content -->
        <div class="jumbotron">
			<div style="">
				<?php 

					$ip1 = '50.183.112.72';
					$ip2 = '142.160.57.134';
					$ip3 = '73.169.36.244';

					$incomingIP = $_SERVER['REMOTE_ADDR'];
					$fileContent = "";

					//If incoming IP is good, show the edit button
					if( ($incomingIP == $ip1 || $incomingIP == $ip2 || $incomingIP == $ip3) && !(isset($_GET['edit']))) {
						echo "<div style='float:left' ><form method='post' action='stevegarytrip2017.php?edit=true'><input type='submit' value='Edit List'></form></div><br>";
						if($incomingIP == $ip1)
							echo "<div style='float:left;padding-left:20px;margin-top:-16px;' >Welcome back <b>" . "Steve" . "</b>!</div><hr style='margin-top:16px;'>";
						if($incomingIP == $ip2)
							echo "<div style='float:left;padding-left:20px;margin-top:-16px;' >Welcome back <b>" . "Mike" . "</b>!</div><hr style='margin-top:16px;'>";
						if($incomingIP == $ip2)
							echo "<div style='float:left;padding-left:20px;margin-top:-16px;' >Welcome back <b>" . "Gary" . "</b>!</div><hr style='margin-top:16px;'>";
					}
					else if( ($incomingIP == $ip1 || $incomingIP == $ip2 || $incomingIP == $ip3) && (isset($_GET['edit']))) {
						echo "<b>Edit Document</b> - Shared Page (Make sure nobody else is overwriting your save!)<br><br>";
					}

					//If POST received, and save is set (most likely), write to file and redirect to plain stevegarytrip2017 
					if ($_SERVER["REQUEST_METHOD"] == "POST" && ($incomingIP == $ip1 || $incomingIP == $ip2 || $incomingIP == $ip3) && isset($_GET['save']) && $_GET['save'] == 'true') {
						$file = fopen("stevegarytrip2017.txt", "w");
						fputs($file, $_POST['content']);
						$fileContent = $_POST['content'];
					}

					// If incoming IP is good and the edit button has been clicked, pull from text file
					// and write into an editable text box with a save button. Else just display it.
					if (($incomingIP == $ip1 || $incomingIP == $ip2 || $incomingIP == $ip3) && isset($_GET['edit']) && $_GET['edit'] == 'true' ){
						$file = fopen("stevegarytrip2017.txt", "r+");
						while (!feof($file)) {
							$fileContent = $fileContent . fgets($file);
						}
						
						echo '<form method="post" action="stevegarytrip2017.php?save=true"><textarea name="content" rows="28" cols="154" style="padding:5px;">';
						echo "$fileContent";
						echo '</textarea><br/><br/><input type="submit" value="Save List"></form>';

					}
					else{
						echo '<PRE>' . file_get_contents("stevegarytrip2017.txt") . '</PRE>';
					}

				?>
			</div>
        </div>
        <!-- /.Jumbotron -->
		
<?php include 'footer.php' ?>
