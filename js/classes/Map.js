function Map(mapname, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', './maps/' + mapname + '.json', false);
  xhr.send(null);
  if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) { // Code == 0 en local
    throw new Error('Cannot load file ' + url);
  }

  this.characters = [];
  
  this.data = JSON.parse(xhr.responseText);

  var that = this;
  this.tileset = new Tileset('./tilesets/' + this.data.tileset, function() {
    cb.apply(that);
  });
}

Map.prototype.getWidth = function() {
  return this.data.map.length;
}

Map.prototype.getHeight = function() {
  return this.data.map[0].length;
}

Map.prototype.addCharacter = function(character) {
  this.characters.push(character);
}

Map.prototype.draw = function(ctx) {
  for (var x = 0; x < this.data.map.length; x++) {
    for (var y = 0; y < this.data.map[0].length; y++) {
      this.tileset.draw(ctx, this.data.map[y][x], x*32, y*32);
    }
  }

  this.characters.forEach(function(character) {
    character.draw(ctx);
  });
}

