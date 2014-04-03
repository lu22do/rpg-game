var rpg = {};
rpg.hero = undefined;
var canvas;
var ctx;

window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  // ctx.fillStyle = 'blue';
  // ctx.fillRect(10, 10, 50, 100);

  // new Tileset('tilesets/tileset1.png', function() {
  //   this.draw(ctx, 6, 32, 32);
  // });


  var map = new Map('first', function() {
    canvas.width = this.getWidth() * 32;
    canvas.height = this.getHeight() * 32;
  });

  rpg.hero = new Character('character1', 10, 10, Character.UP)
  map.addCharacter(rpg.hero);
  map.addCharacter(new Character('character1', 5, 8, Character.RIGHT));
  map.addCharacter(new Character('character1', 9, 10, Character.DOWN));

  setInterval(function() {
    map.draw(ctx);
  }, 40);
}

rpg.UP = 122; // z
rpg.RIGHT = 115; // s
rpg.LEFT = 113; // q
rpg.DOWN = 119; // w

window.onkeypress = function(event) {
  if (!canvas) {
    return false;
  }
  switch(event.keyCode) {
    case rpg.UP:
      rpg.hero.move(canvas, Character.UP);
      break;
    case rpg.RIGHT:
      rpg.hero.move(canvas, Character.RIGHT);
      break;
    case rpg.LEFT:
      rpg.hero.move(canvas, Character.LEFT);
      break;
    case rpg.DOWN:
      rpg.hero.move(canvas, Character.DOWN);
      break;      
    default:
      break;
  }
  return false;
}