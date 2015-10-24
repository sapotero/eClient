var core = (function(){
  console.log('core initialized');

  var modules = ['module'];

  for (var i = modules.length - 1; i >= 0; i--) {
    console.log( 'modules/' + modules[i] );
  };

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
  // TODO: динамическая загрузка модулей, возможность стар/стоп/рестарт
  // TODO: порядок подгрузки модулей 
  // TODO: система проверки прав

})();

var obj = {name: 'fuck'};

core.attachTo(obj);
obj.subscribe('nameChange', function(args){
  var old_name = this.name;
  this.name = args
  console.log(old_name + ' -> ', this.name)
});
obj.publish('nameChange', 'you!')