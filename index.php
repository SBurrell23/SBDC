<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<link rel="shortcut icon" href="assets/sb.ico" type="image/x-icon">
	<link rel="icon" href="assets/sb_favi.ico" type="image/x-icon">
	<title>Steven Burrell</title>

	<!-- CSS -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="css/materialize.min.css" type="text/css" rel="stylesheet"/>
	<link href="css/font-awesome.min.css" type="text/css" rel="stylesheet"/>
	<link href="css/style.css" type="text/css" rel="stylesheet"/>

	<!-- Pre JS -->
	<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

</head>
<body>
	<div class="navbar-fixed">
		<nav class="blue-grey darken-1" role="navigation">
			<div class="nav-wrapper container">
				<a id="logo-container" href="?v=about" class="brand-logo">
					<img src="./assets/sb_logo_white.png" class="sbLogo"><!-- <span class="siteOrangeText" style="font-weight: 400">S</span>teven <span class="siteOrangeText"></span>Burrell -->
				</a>
				<ul class="right hide-on-med-and-down">
					<li><a href="?v=web_projects">Web Projects</a></li>
					<li><a href="?v=java_games">Java Games</a></li>
					<li><a href="?v=movie_blog">Movie Blog</a></li>
				</ul>

				<ul id="nav-mobile" class="side-nav">
					<li><a href="?v=web_projects">Web Projects</a></li>
					<li><a href="?v=java_games">Java Games</a></li>
					<li><a href="?v=movie_blog">Movie Blog</a></li>
				</ul>
				<a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
			</div>
		</nav>
	</div>
	<div class="content">
		<?php
			if(isset($_GET['v']))
				switch ($_GET['v'])
				{
					case 'about':			include 'pages/about_me/index.php';						break;
					case 'web_projects':	include 'pages/web_projects/index.php';					break;
					case 'java_games':		include 'pages/java_games/index.php';					break;
					case 'movie_blog':		include 'pages/movie_blog/index.php';					break;

					case 'synonify':		include 'pages/web_projects/synonify/index.php';		break;
					case 'ccc':				include 'pages/web_projects/colors/index.html';			break;
					case 'get_bigger':		include 'pages/web_projects/getbigger/index.html';		break;
					case 'sliding_puzzle':	include 'pages/web_projects/slidingpuzzle/index.html';	break;
				}
			else
				include 'pages/about_me/index.php';
		?>
	</div>
	<footer class="page-footer blue-grey darken-1">
		<div class="container">
			<div class="row">
				<div class="col l9 s12">
					<h5 class="siteOrangeText">Where Am I?</h5>
					<p class="grey-text text-lighten-4">Welcome to my website! This site exists primarily for a place to save my software development projects. Feel free to poke around and try out some of the games or tools you find. If you need to contact me, do so with the information to the right &nbsp;<i class="fa fa-long-arrow-right" aria-hidden="true"></i></p>
				</div>
				<div class="col l3 s12">
					<h5 class="siteOrangeText">Contact Me</h5>
					<ul>
						<li><a class="white-text" target="_blank" href="https://github.com/SBurrell23"><i class="fa fa-github"                  style='margin-right:12px;'></i>Github</a></li>
						<li><a class="white-text" target="_blank" href="https://linkedin.com/in/stevengeorgeburrell/"><i class="fa fa-linkedin" style='margin-right:13px;'></i>LinkedIn</a></li>
						<li><a class="white-text" target="_blank" href="https://www.facebook.com/steven.burrell.98"><i class="fa fa-facebook"   style='margin-right:17px;'></i>Facebook</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="container">
				Made with love in <a class="siteOrangeText" target="_blank" href="https://goo.gl/ynzCmB">Colorful Colorado!</a>
			</div>
		</div>
	</footer>

	<!-- Post JS -->
	<script src="js/materialize.min.js"></script>
	<script src="js/init.js"></script>

</body>
</html>
