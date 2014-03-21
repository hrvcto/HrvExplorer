(function(){
  var material = Cesium.Material.fromType(Cesium.Material.ColorType);
  material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 0.5);
  
  function copyOptions(options, defaultOptions){
    var newOptions = {}, option;
    for(option in options){
      newOptions[option] = options[option];
    }

    for(option in defaultOptions){
      if(newOptions[option] === undefined){
        newOptions[option] = defaultOptions[option];
      }
    }

    return newOptions;
  }

  var defaultShapeOptions = {
    ellipsoid: Cesium.Ellipsoid.WGS84,
    textureRotationAngle: 0.0,
    height: 0.0,
    asynchronous: true,
    show: true,
    debugShowBoundingVolume: false
  };

  var defaultPolylineOptions = copyOptions(defaultShapeOptions, {
    width: 5,
    geodesic: true,
    granularity: 10000,
    appearance: new Cesium.PolylineMaterialAppearance({
      material : material,
      aboveGround : false
    })
  });



  function CesiumAPI(cesiumWidget){
    this._scene = cesiumWidget.scene;

    this.initHandlers();
  };

  CesiumAPI.prototype.initHandlers = function(){
    var that = this;
    var scene = that._scene;

    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    
  };

  CesiumAPI.prototype.startDrawing = function(cleanUp){

  };

  CesiumAPI.prototype.startDrawingPolyshape = function(isPolygon, options){
    var that = this;
    var scene = that._scene;
    var primitives = scene.primitives;

    var minPoints = isPolygon ? 3 : 2;
    var poly;
    if(isPolygon){
      poly = new Cesium.Polygon(options);
    } else {
      
    }
  };

  CesiumAPI.prototype.startDrawingPolyline = function(options){
    var options = copyOptions(options, defaultPolylineOptions);
    this.startDrawingPolyshape(false, options);
  };

  window.CesiumAPI = CesiumAPI;
})();