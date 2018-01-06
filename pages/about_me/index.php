<div class=" container">
	<div class="section">
		<h4 class="header">About Me</h4>
		<div class="card horizontal">
			<div class="card-image">
				<img src="assets/birdandme.PNG">
			</div>
			<div class="card-stacked">
				<div class="card-content card-text">
					<p>I'm <span id="myAge"></span> years old and a graduate of <a  target="_blank" href="http://www.cs.colostate.edu/cstop/index.php">Colorado State University</a> with a bachelor's in Computer Science and a minor in Business Administration. Currently, I work as a software engineer doing mostly full stack web app development for <a  target="_blank" href="http://www.centurylink.com/">CenturyLink</a>. On this website you'll find programs, games and general web dev things that I've made in my free time. I also use this site to compile photos from my trips and for a fun movie blog I do with my friends. If you don't know where to start, try checking out some of my <a href="?v=web_projects">web projects</a> and find one that interests you.</p>
				</div>
<!-- 				<div class="card-action">
		          <div class="card-action-link-item"><a href="?v=get_bigger"><i class="fa fa-expand" aria-hidden="true"></i> &nbsp;Get Bigger</a></div>
		        </div> -->
			</div>
		</div>
	</div>

</div>


<script type="text/javascript">
$('#myAge').html(calculateAge("1992/12/15"));
function calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        age--;
    return age;
}
</script>
