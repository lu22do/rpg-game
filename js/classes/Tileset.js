function Tileset(filename, cb) {
  this.image = new Image();
  this.image.tilesetRef = this;
  this.image.onload = function() {
    if (!this.complete) {
      throw new Error('File not found: ' + filename);
    }
    this.tilesetRef.nbTilesPerRow = this.width / 32;
    cb.apply(this.tilesetRef);
  } 
  this.image.src = filename;
}

Tileset.prototype.draw = function(ctx, index, x, y) {
  var xSource = (((index - 1) % this.nbTilesPerRow) / this.nbTilesPerRow) * this.image.width;
  var ySource = Math.floor((index - 1) / this.nbTilesPerRow) * 32;

  ctx.drawImage(this.image, xSource, ySource, 32, 32, x, y, 32, 32);
}