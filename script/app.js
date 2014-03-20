(function(){
  var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer');
  CesiumAPI.setWidget(cesiumWidget);

  
  var executor = {
    drawLine: function(){
      var line = CesiumAPI.drawLine([
        {longitude: -100.0, latitude:36.0, height:0},
        {longitude: -92.0, latitude:36.0, height:300},
        {longitude: -80.0, latitude:36.0, height:8890}
        ], '1.0, 0.8, 0.1, 1.0', 2.0);
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