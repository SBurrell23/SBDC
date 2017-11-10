<!DOCTYPE html>
<html style='background-color:rgb(217, 229, 255);'>
  <head>
    <meta charset="UTF-8">
    <title>Jeopardy Buzzers</title>
    <style type="text/css">
      #buzzerDiv {
        position:absolute;
        top: 50%;
        left: 50%;
        width:20em;
        height:13em;
        margin-top: -9em; /*set to a negative number 1/2 of your height*/
        margin-left: -12em; /*set to a negative number 1/2 of your width*/
        padding:30px;
        border: 1px solid #ccc;
        background-color: #f3f3f3;
        text-align: center;
      }
    </style>
  </head>
  <body>
    
    <div id="buzzerDiv">
      I'm a <a href="user.html">PLAYER!</a>
      <br><br><h2>OR</h2>
      <form action="." method="post">
        <div style="margin-bottom:10px;margin-top:35px;">I'm the <a target="_blank" href="https://en.wikipedia.org/wiki/Alex_Trebek">GAME MASTER!</a></div>
        <div style="margin-bottom:15px;"><input type="text" name="accessPin" placeholder="Enter GM access pin..."><br></div>
        <input type="submit" value="Submit">
      </form>
      
    </div>

    <?php
      if(isset($_POST['accessPin']) && $_POST['accessPin'] == 'gameon')
      {
        echo '<script type="text/javascript">window.location = "admin.html"</script>';
        exit();
      }
    ?>

  </body>
</html>