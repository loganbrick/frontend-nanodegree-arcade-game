// Enemies our player must avoid
var Enemy = function(startX, startY, bugSpeed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //set default start location of enemy
    this.x = startX;
    this.y = startY;
    this.speed = bugSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ( this.x < 606) {
        this.x += this.speed * dt;
    } else {
      //when bug hits end of screen, start at common point
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player class!
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    //default starting location of the player
    this.x = 202;
    this.y = 404;

    //victory condition
    this.victory = false;

    //character sprite variable will change with each success to choose a new sprite
    this.level = 1;

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char1.png';
};

// Handle the input to move the player around
Player.prototype.handleInput = function(direction) {
    if (direction === 'right' && this.x !== edges.right) {
        this.x += 101;
    } else if (direction === 'left' && this.x !== edges.left) {
        this.x -= 101;
    } else if (direction === 'down' && this.y !== edges.bottom) {
        this.y += 85;
    } else if (direction === 'up' && this.y !== edges.top) {
        this.y -= 85;
        //reset the player position when the water is reached
        if (this.y <= 50) {
            this.victory = true;
            this.reset();
        }
    }

};

//Reset the position of the player
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;

    //When a victory is acheived, the character changes
    if (this.level <= 5 && this.level >= 0) {
        if (this.victory == true) {
            this.level += 1;
            this.victory = false;
        } else if (this.level != 0) {
            //When the player gets hit, the character reverts back
            this.level -= 1;
        }
    }
    //change the sprite based on the character level
    this.sprite = 'images/char' + this.level + '.png';
};

// This is the collision detection function
Player.prototype.update = function() {
    var self = this;

    //iterate through the array of enemies and determine whether the enemy
    //and player sprite intersect
    allEnemies.forEach(function(enemy) {
        if (Math.abs(enemy.x - self.x) < 50 && Math.abs(enemy.y - self.y) < 50) {
            self.victory = false;
            self.reset();
        }
    });
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// 3 Enemies with different locations
var enemy1 = new Enemy(-101, 55, 60);
var enemy2 = new Enemy(-303, 55, 86);
var enemy3 = new Enemy(-101, 140, 120);
var enemy4 = new Enemy(-101, 225, 60);
var enemy5 = new Enemy(-202, 225, 100);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);


// Place the player object in a variable called player
var player = new Player();

//The gameboard needs edges that the player cannot move past
var edges = {
  left: 0,
  right: 404,
  top: 25,
  bottom: 404
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
