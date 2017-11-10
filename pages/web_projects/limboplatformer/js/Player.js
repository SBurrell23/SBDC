var facing;
var cursors;
var jumpButton;

function createPlayer()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 280;
    player = game.add.sprite(50, 20, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 900;
    player.body.maxVelocity.y = 500;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);


}

function handlePlayerMovement()
{
    game.physics.arcade.collide(player, solidLayer);
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -500;
        jumpTimer = game.time.now + 750;
    }
}

