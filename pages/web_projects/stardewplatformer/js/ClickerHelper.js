var testBox = false;
var clickerStartX;
var clickerStartY;
function clickerHelper(){
    if(game.input.activePointer.leftButton.isDown && !testBox){
    	clickerStartX = game.input.activePointer.x;
    	clickerStartY = game.input.activePointer.y;
    	console.log("Start:" + game.input.activePointer.x + " " + game.input.activePointer.y);
    	testBox = true;
    }
    if(game.input.activePointer.leftButton.isUp && testBox){
    	console.log("End:" + game.input.activePointer.x + " " + game.input.activePointer.y);
    	testBox = false;
    	platforms.create(clickerStartX, clickerStartY,'ground');
    }
}