// Enemies our player must avoid
var Enemy = function(startX, startY, bugSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    //default starting location of the player
    this.x = 202;
    this.y = 404;
};

// Handle the input to move the player around
Player.prototype.handleInput = function(direction) {
    if (direction === 'right') {
      this.x += 101;
    } else if (direction === 'left') {
      this.x -= 101;
    } else if (direction === 'down') {
      this.y += 85;
    } else if (direction === 'up') {
      this.y -= 85;
      //reset the player position when the water is reached
      if (this.y <= 50) {
        this.reset();
      }
    }

};

//Reset the position of the player
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

// This will be the collision detection function
Player.prototype.update = function() {
    // This will be the
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
