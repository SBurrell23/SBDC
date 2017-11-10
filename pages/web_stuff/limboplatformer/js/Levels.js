var level;
function createLevelBackgroundAndSolids(levelNum)
{
	level = game.add.tilemap(levelNum);
    level.addTilesetImage('LimboStyle');
    level.createLayer('Background');
    level.createLayer('Middleground');
    solidLayer = level.createLayer('Solids');
    level.setCollisionBetween(0,1000,true,solidLayer);
    solidLayer.resizeWorld();
}

function createLevelForeground(levelNum)
{
	level.createLayer('Foreground');
}