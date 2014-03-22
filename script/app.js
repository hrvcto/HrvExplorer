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
    dataTreeHelper.addNode(11, "Line");
  });

  drawListener.addListener('extentCreated', function(event){
    var extent = event.extent;
    var extentPrimitive = new Cesium.ExtentPrimitive({
      extent: extent,
      material: Cesium.Material.fromType(Cesium.Material.StripeType)
    });
    scene.primitives.add(extentPrimitive);
    dataTreeHelper.addNode(12, "Rect");
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

  var treeListeners = {
    onCheck: function(e, treeId, treeNode){
    }
  };


  var dataTree = (function(){
    var settings = {
      check: {
        enable: true
      },
      view: {
        showLine: false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onCheck: treeListeners.onCheck
      }
    };
    var data = [
      {id:1, pId:0, name: '所有对象', open: true, isParent: true},
      {id:11, pId:1, name: '折线', isParent: true},
      {id:12, pId:1, name: '多边形', isParent: true}
    ];
    return $.fn.zTree.init($("#theTree"), settings, data);
  })();

  window.dataTree = dataTree;

  var dataTreeHelper = (function(){
    function siteID(){
      return ++siteID._id;
    }
    siteID._id = 10000;

    var helper = {
      addNode: function(pid, name){
        var pnode = dataTree.getNodesByParam('id', pid, null);
        if(pnode.length){
          dataTree.addNodes(pnode[0], {id: siteID(), pId: pid, name: name, isParent: false}, false);
        } else {
          dataTree.addNodes(null, {id: siteID(), pId: pid, name: name, isParent: false}, false);
        }
      }
    };

    return helper;
  })();
})();