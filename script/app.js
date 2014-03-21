(function(){
  var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer');
  var scene = cesiumWidget.scene;
  var cesiumHelper = new DrawHelper(cesiumWidget);

  var drawListener = new DrawHelper.DrawHelperListener();
  
  drawListener.addListener('polylineCreated', function(event){
    var polyline = new DrawHelper.PolylinePrimitive({
      positions: event.positions,
      width: 5,
      geodesic: true
    });
    scene.primitives.add(polyline);
    // polyline.setEditable();
  });

  drawListener.addListener('extentCreated', function(event){
    var extent = event.extent;
    var extentPrimitive = new Cesium.ExtentPrimitive({
      extent: extent,
      material: Cesium.Material.fromType(Cesium.Material.StripeType)
    });
    scene.primitives.add(extentPrimitive);
    //extentPrimitive.setEditable();
  });

  var executor = {
    drawLine: function(){
      cesiumHelper.startDrawingPolyline({
        callback: function(positions) {
          drawListener.executeListeners({name: 'polylineCreated', positions: positions});
        }
      });
    },
    drawRect: function(){
      cesiumHelper.startDrawingExtent({
        callback: function(extent) {
          drawListener.executeListeners({name: 'extentCreated', extent: extent});
        }
      });
    }
  };

  var uiController = new UIController({
    operation: '#operation',
    operationTrigger: '#operationTrigger',
    operationsTrigger: '#operationsTrigger',
    executor: executor
  });


  /*window.cesiumWidget = cesiumWidget;
  CesiumAPI.setWidget(cesiumWidget);

  var line = CesiumAPI.drawLine([
    {longitude: -100.0, latitude:36.0, height:0},
    {longitude: -92.0, latitude:36.0, height:300},
    {longitude: -80.0, latitude:36.0, height:8890}
    ], '1.0, 0.8, 0.1, 1.0', 2.0);

  setTimeout(function(){
    line.appearance = new Cesium.PolylineMaterialAppearance({
        material : Cesium.Material.fromType('Color', {
          color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
        })
      });
  }, 3000);
  

  var operationDOM = $('#operationWrapper');
  function showOperation(){
    operationDOM.addClass('show');
  }
  function hideOperation(){
    operationDOM.removeClass('show');
  }


  $('#tabs').tabs();
  window.showOperation = showOperation;
  window.hideOperation = hideOperation;*/
})();