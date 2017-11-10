<html style="background-color:#040404;">
<title>/</title>
<script   src="https://code.jquery.com/jquery-2.2.2.min.js" ></script>

<PRE id="messages" style="height:375px;color:#4AF14A;background-color:#1D1D1D;width:800px;"></PRE>
<label style="color:#ebebeb;;">Chat:</label>
<input name="keywords"  style="width:760px;background-color:#ebebeb;" type="text" id="input">


<script>

$('#input').keypress(function (e){
  if (e.which == 13){

  	var inputMessage =  $('#input').val();
  	$.post("postMessage.php",
    {
        body: inputMessage
    },
    function(data, status){
	    $.get("getMessages.php", function(data, status){
	    	$('#messages').empty();
	        $('#messages').append(data);
	    });
        console.log(data);
    });
    $('#input').val('');

  }
});

var once = 0;
window.setInterval(function(){
    $.get("getMessages.php", function(data, status){
    	$('#messages').empty();
        $('#messages').append(data);
        if (data.indexOf("!hack") !=-1 && once == 0) {
		    alert('DELETING SYSTEM32...');
		    once = 1;
		}
    });
}, 1500);

$( document ).ready(function() {
  	$.post("postMessage.php",
    {
        body: "(SERVER) USER CONNECTED"
    },
    function(data, status){
	    $.get("getMessages.php", function(data, status){
	    	$('#messages').empty();
	        $('#messages').append(data);
	    });
        console.log(data);
    });
});

window.onbeforeunload = function () {
  	$.post("postMessage.php",
    {
        body: "(SERVER) USER DISCONNECTED"
    },
    function(data, status){
        console.log(data);
        return;
    });
};
</script>
</html>