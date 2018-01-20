// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // assigning Enemies Loactions
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*200)+100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += this.speed * dt;
    
    // canvas width = 505 & canvas height = 606;
    if(this.x > 505) {
        this.x = -50;
        this.speed = 80 + Math.floor(Math.random() * 256);
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// first thing we are creating score for the game and append it to our game page
var score = 0;
document.getElementById('Score').innerHTML = score;

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 370;
};

Player.prototype.update = function() {
    
    // to aviod the ambiguity of "this", we are assigning it to player before checking for collisions
    var player = this;
    
    // Making sure Player can not move off screen
    if (this.y > 370) {
        this.y = 370;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // if the player wins , increase score by 1
    if (this.y < 0) {
        score = score + 1;
        document.getElementById('Score').innerHTML = score;
        this.respawn();
    }
    
    // checking for collisions, and if happens, set score to 0 and respawn the palyer
    for (var i = 0; i < allEnemies.length; i++) {
        if(player.x >= allEnemies[i].x - 50 && player.x <= allEnemies[i].x + 50) {
            if(player.y >= allEnemies[i].y - 50 && player.y <= allEnemies[i].y + 50) {
                score = 0;
                document.getElementById('Score').innerHTML = score;
                player.respawn();
            }
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles the movement of the player
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x -= 50;
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'right':
            this.x += 50;
            break;
        case 'down':
            this.y += 80;
            break;
    }
};

// once the player win of die, his x & y will reset
Player.prototype.respawn = function() {
    this.x = 200;
    this.y = 370;
};

// Setting "x" where all each Enemy will be created
var randomNumber = function() {
    return Math.floor((Math.random() * 10) - 10);
}

// Now instantiate your objects.
var enemyOne = new Enemy(randomNumber(),60);
var enemyTwo = new Enemy(randomNumber(),140);
var enemyThree = new Enemy(randomNumber(),220);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyOne, enemyTwo, enemyThree];

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
