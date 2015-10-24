var app = (function(){
  console.log('facade initialized');
  
  var _private = {
    i: 5,
    get: function() {
      console.log('Текущее значение:' + this.i);
    },
    set: function(val) {
      this.i = val;
    },
    run: function() {
      console.log('процесс запущен');
    },
    jump: function() {
      console.log('резкое изменение');
    }
  };

  var _user = {
    getUserId: function(){
      user.getId();
    }
  };

  return {
    facade: function(args) {
      _private.set(args.val);
      _private.get();
      
      if (args.run) {
        _private.run();
        _user.getUserId();
      }
    }
  }
}());

app.facade({run:true, val:10}); // Текущее значение: 10, процесс запущен
app.facade({val: 1});
var obj = {name: 'fuck'};

core.attachTo(obj);
obj.subscribe('nameChange', function(args){
  var old_name = this.name;
  this.name = args
  console.log(old_name + ' -> ', this.name)
});
obj.publish('nameChange', 'you!');