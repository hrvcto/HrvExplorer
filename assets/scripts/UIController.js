var UIController = function(obj){
  var that = this;

  that.operation = $(obj.operation);
  that.operationTrigger = $(obj.operationTrigger);
  that.operationsTrigger = $(obj.operationsTrigger);

  that.operationHeight = obj.operationHeight || 49;

  that.operationsTriggerShowing = false;

  that.executor = obj.executor;

  that._init();
};

UIController.prototype = {
  _init: function(){
    var that = this;

    that.operation.on('click', '.ope-command .icon', function(e){
      e.stopPropagation();
      that._executeCommand($(this).attr('data-command'));
    });

    that.operationTrigger.on('click', function(e){
      e.stopPropagation();
      that._toggleOperations();
    });

    that.operationsTrigger.on('click', '.icon', function(e){
      e.stopPropagation();
      that._operationsOnClick($(this).index(), $(this).attr('data-command'));
    });

    $(document).on('click', function(){
      that._hideOperations();
    });
  },
  _toggleOperations: function(){
    var that = this;

    if(that.operationsTriggerShowing){
      that._hideOperations();
    } else {
      that._showOperations();
    }
  },
  _hideOperations: function(){
    var that = this;

    that.operationsTrigger.css('height', '0px');
    that._hideCommands();
    that.operationsTriggerShowing = false;
  },
  _showOperations: function(){
    var that = this;

    that.operationsTriggerShowing = true;
    var count = that.operationsTrigger.find('a').size();
    that.operationsTrigger.css('height', count * that.operationHeight + 'px');
  },
  _hideCommands: function(){
    var that = this;
    that.operationsTrigger.css('height', '0px');
    that.operation.find('.ope-command').hide();
  },
  _operationsOnClick: function(index, command){
    var that = this;

    that.operation.find('.ope-command').hide();

    var commandW = that.operation.find('.ope-command[data-command="' + command + '"]');
    commandW.css('margin-top', (index + 1) * that.operationHeight + 'px').show();
  },
  _executeCommand: function(command){
    var that = this;
    if(that.executor[command]){
      that.executor[command]();
    }
  }
};