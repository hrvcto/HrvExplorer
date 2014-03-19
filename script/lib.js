(function(win, doc){
  var $ = function(str){
    return doc.querySelector(str);
  };

  $.addClass = function(dom, cls){
    dom.classList.add(cls);
  };

  $.removeClass = function(dom, cls){
    dom.classList.remove(cls);
  };

  $.hasClass = function(dom, cls){
    dom.classList.contains(cls);
  };


  win.$ = $;
})(window, document);