Require-JSLogger
================

A native javascript debug console hack for require.js.
(Basically used on Chrome, for debugging mobile web/webapp)

This utility can be used to set the Debug Level of **global** console

In addition, add console.dir('Message', Obj) to default console.

##Install##

Step.1 Add to require path
```javascript 

require.config({
    //other congfigures
    paths: {
        logger : 'myJSFolder/logger'
        //.... A lot of other path
    }
});
```


Step.2 Use in function
```javascript
require([
        'order!logger'
        //A lot of other js
        ],function (Logger) {
        
        Logger.setLevel('DEBUG');
});
```
Available Level
* DEPLOY - hide **All** console message
* ERROR - display only **console.error()**
* WARN - display only **console.warn()** and **console.error()**
* INFO - display all message except **console.debug()**
* DEBUG - all console message will show
        

##Usage##

You can use your console normally.
* console.error(txt)
* console.warn(txt)
* console.log(txt)
* console.info(txt)
* **console.dir(txt, obj)** Enhanced !!
* console.debug(txt)