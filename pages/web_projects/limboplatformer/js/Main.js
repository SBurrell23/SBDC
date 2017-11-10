
var game = new Phaser.Game(800,600, Phaser.CANVAS, 'StarDew2', { preload: preload, create: create, update: update});

function preload()
{
    //Notes tile size must match tilemap size
    //the image name you load must be the same one you use in the tilemap name...
    game.load.image('LimboStyle', 'assets/LimboStyle.png');
    game.load.spritesheet('dude', 'assets/player2.png', 32, 48);

    game.load.tilemap('level_2', 'assets/level_2.json', null, Phaser.Tilemap.TILED_JSON);
   
}

function create()
{
    createLevelBackgroundAndSolids('level_2');
    createPlayer();
    createLevelForeground('level_2');
}   

function update()
{
    handlePlayerMovement();
}
