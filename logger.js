define(function() {
  var Logger = {
    defaultlogLevel: ['error', 'warn', 'log', 'info', 'dir', 'debug'],
    infoLevel: ['log', 'info', 'dir'],
    devLevel: {
      'DEPLOY': 0,
      'ERROR': 1,
      'WARN': 2,
      'INFO': 3,
      'DEBUG': 4
    },
    currentLv: 4,
    _currentLv: "",
    setLevel: function(lv) {
      this._currentLv = lv;
      this.currentLv = this.devLevel[lv];
      if (!(window.console != null)) {
        window.console = {};
        for (i in defaultlogLevel) {
          if (typeof c[defaultlogLevel[i]] === 'function') {
            window.console[defaultlogLevel[i]] = function() {
              return true;
            };
          }
        }
      } else {
        switch (this.currentLv) {
        case 0:
        case 1:
        case 2:
          this._updateConsole(this.currentLv);
          break;
        case 3:
          this._updateConsole(this.currentLv + this.infoLevel.length);
          break;
        case 4:
        default:
          break;
        }
    }
      (function(ConsoleLogger){
          ConsoleLogger.DirObject = function() {
            this._msg = "";
            this.data = {};            
            this.setMessage = function(msg) {
              this._msg = msg;
            }
            this.setData = function(data) {
              this.data = data;
            }
          }          
          ConsoleLogger.dir_o = ConsoleLogger.dir;
          ConsoleLogger.dir = (function() {
            var dirobj = new this.DirObject();
            var e = new Error();
            if (arguments.length > 1 && e.stack != undefined) {
              dirobj.setMessage(arguments[0]);
              dirobj.setData(arguments[1]);        
              var caller_line = e.stack.split("\n")[2];
              var index = caller_line.indexOf("at ");
              var clean = caller_line.slice(index+2, caller_line.length);
               console.info(_.initial(clean.split(":"),1).join(":"));
               ConsoleLogger.dir_o(dirobj);
             } else {
               ConsoleLogger.dir_o(arguments);
             }
           })
      }).call(this, console);
    },    
    getLevel: function() {
      return this.devLevel[this.currentLv];
    },
    testLogger: function() {
      console.debug("Current Debug Level : " + this._currentLv);
      console.error('errorTest');
      console.warn('warnTest');
      console.log('logTest');
      console.info('infoTest');
      console.dir('dirTest');
      console.debug('debugTest');
    },
    _updateConsole: function(lv) {
      for (var i = lv; i < this.defaultlogLevel.length; i++) {
        if (typeof console[this.defaultlogLevel[i]] === 'function') {
          console[this.defaultlogLevel[i]] = function() {
            return true;
          };
        }
      }
    }
  };
  return Logger;
});