function Map(JSONMap){
    var self = this;
    $.ajax({
        url: JSONMap,
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).complete(function (mapData) {
        var map = mapData.responseJSON;

        self.mapImage = new Image();
        self.mapImage.src = map.tileSheet;
        self.height = map.height;
        self.width = map.width;

        self.ground = new Layer(self, map.ground);
        self.detail = new Layer(self, map.detail);
        self.blocked = new Layer(self, map.blocked);
        self.over = new Layer(self, map.over);
    });
}

function Layer(map, layer) {
    this.map = map;
    this.layerMap = layer;
}

Layer.prototype.draw = function(context) {
    var self = this;
    if(this.map.mapImage.complete){
        $.each(self.layerMap, function(rowIndex, row) {
            $.each(row, function(colIndex, tile) {
                if(tile !== -1) {
                    var tileX = 0;
                    var tileY = 0;
                    while(tile > 9) {
                        tile = tile - 10;
                        tileY++;
                    }
                    tileX = tile;
                    console.log(tileX+' : ' + tileY);
                    context.drawImage(self.map.mapImage, (32*tileX), (32*tileY), 32, 32, (colIndex*32), (rowIndex*32), 32, 32);
                }
            });
        });
    }
};

Layer.prototype.update = function(context) {

};