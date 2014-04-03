function Character(name, x, y, dir, cb) {
  var that = this;
  this.x = x * 32;
  this.y = y * 32;

  // destination
  this.dx = this.x;  
  this.dy = this.y;

  this.dir = dir;

  this.image = new Image();
  this.image.onload = function() {
    if (!this.complete) {
      throw new Error('Cannot load ' + name);
    }
    if (cb) {
      cb.apply(that);
    }
  };
  this.image.src = './sprites/' + name + '.png';

  this.anim_index = 0;
}

Character.DOWN = 0;
Character.LEFT = 1;
Character.RIGHT = 2;
Character.UP = 3;
Character.MOVE_STEPS = 8;

Character.prototype.draw = function(ctx) {
  if (this.dx != this.x || this.dy != this.y) {
    this.anim_index++;
    this.anim_index %= 4;    
  }

  var sourceX = this.anim_index * 32;
  var sourceY = this.dir * 48;

  if (this.dx > this.x) {
    this.x += 32 / Character.MOVE_STEPS;
  } 
  else if (this.dx < this.x) {
    this.x -= 32 / Character.MOVE_STEPS;
  } 
  else if (this.dy > this.y) {
    this.y += 32 / Character.MOVE_STEPS;
  } 
  else if (this.dy < this.y) {
    this.y -= 32 / Character.MOVE_STEPS;
  } 

  ctx.drawImage(this.image, sourceX, sourceY, 32, 48, this.x, this.y - 16, 32, 48);
};

Character.prototype.move = function(canvas, dir) {
  this.dir = dir;
  switch(dir) {
    case Character.UP:
      if (this.dy > 0) {
        this.dy -= 32;
      }
      break;
    case Character.RIGHT:
      if (this.dx + 32 < canvas.width) {
        this.dx += 32;
      }
      break;
    case Character.LEFT:
      if (this.dx > 0) {
        this.dx -= 32;
      }
      break;
    case Character.DOWN:
      if (this.dy + 32 < canvas.height) {
        this.dy += 32;
      }
      break;      
    default:
      break;  
  }
};