var core = (function(){
  console.log('core initialized');

  // TODO: динамическая загрузка модулей, возможность стар/стоп/рестарт
  // TODO: порядок подгрузки модулей
  var modules = ['eManagerFacade', 'user'];

  for (var i = modules.length - 1; i >= 0; i--) {
    var js_script = document.createElement('script');
    js_script.type = "text/javascript";
    // js_script.src =  "assets/js/modules/"+modules[i]+".js";
    js_script.src =  (modules[i] != 'eManagerFacade' ? "assets/js/modules/"+modules[i]+".js" : 'assets/js/'+modules[i]+'.js') + '?rnd='+Math.random();
    js_script.async = true;
    document.getElementsByTagName('head')[0].appendChild(js_script);
  };

  /* Базовый механизм pub/sub -> вещается на изменения параметров модулей */
  var subscribe = function(channel, fn) {
    if (!core.channels[channel]) core.channels[channel] = [];
    core.channels[channel].push({ context: this, callback: fn });
    return this;
  },

  publish = function(channel) {
    if (!core.channels[channel]) return false;
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = core.channels[channel].length; i < l; i++) {
      var subscription = core.channels[channel][i];
      subscription.callback.apply(subscription.context, args);
    }
    return this;
  };

  return {
    channels:  {},
    publish:   publish,
    subscribe: subscribe,
    attachTo:  function(obj){
      obj.publish   = publish;
      obj.subscribe = subscribe;
    }
  };

  // TODO: система проверки прав

})();