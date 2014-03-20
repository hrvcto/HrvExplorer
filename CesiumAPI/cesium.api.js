var CesiumAPI = {};

CesiumAPI.setWidget = function(widget){
  CesiumAPI.CesiumWidget = widget;
  CesiumAPI.init();
};

(function(exports){
  var Cartographic = Cesium.Cartographic;
  var Primitive = Cesium.Primitive;
  var GeometryInstance = Cesium.GeometryInstance;
  var PolylineGeometry = Cesium.PolylineGeometry;
  var PolylineMaterialAppearance = Cesium.PolylineMaterialAppearance;
  var Material = Cesium.Material;

  var widget, scene, centralBody, primitives, ellipsoid;

  CesiumAPI.init = function(){
    widget = exports.CesiumWidget;
  
    scene = widget.scene;
    centralBody = widget.centralBody;

    primitives = scene.primitives;
    ellipsoid = centralBody.ellipsoid;
  };

  

  function drawLine(positions, color, width){
    var poses = [];
    for(var i = 0; i < positions.length; i ++){
      poses.push(
        ellipsoid.cartographicToCartesian(
          Cartographic.fromDegrees(positions[i].longitude, positions[i].latitude, positions[i].height)
          )
        );
    }

    var w = width ? width : 1.0;
    var c = color ? color.split(',') : [0.0, 0.0, 0.0, 1.0];

    var p = new Primitive({
      geometryInstances: new GeometryInstance({
        geometry: new PolylineGeometry({
          positions: poses,
          width: w
        })
      }),
      appearance : new PolylineMaterialAppearance({
        material : Material.fromType('Color', {
          color: new Cesium.Color(c[0], c[1], c[2], c[3])
        })
      })
    });

    primitives.add(p);

    return p;
  }

  exports.drawLine = drawLine;
})(CesiumAPI);