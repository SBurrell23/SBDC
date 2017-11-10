<div class="container">
	<div class="section">
		<div class="row">
			<div class="col s6">
				<h4>Input Text</h4>
				<textarea data-length="255" class="materialize-textarea" id="synonifyInput" placeholder="Enter your text here. (255 Char Max!)" style="height: 230px;resize: vertical;margin-bottom:10px;"></textarea>
				<button class="btn btn-default" id="synonifyButton">Synonify My Text</button>
			</div>
			<div class="col s6">
				<h4>Synonified Text</h4>
				<div class="card">
					<div class="card-content">
						<p id="synonifyOutput">Your synonified output will appear here.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
$(function(){
	$('#synonifyButton').click(function(){
		$.ajax({
			url: "./pages/web_projects/synonify/apiCall.php", 
			type: 'POST',
			data: $("#synonifyInput").val().replace(/\n/g, ''),
			success: function(result){
        		$("#synonifyOutput").html(result);
    		},
	        error: function () {
	            alert("Something went wrong and your text could not be synonified!");
	        }
    	});
	});
	$('#synonifyInput').keypress(function(e) {
	    if(e.which == 13)
	        $('#synonifyButton').click();
	});
});
</script>