#node-fakir

*magic rest client*

[![NPM](https://nodei.co/npm/fakir.png?downloads=true&stars=true)](https://nodei.co/npm/fakir/)

## Description

You only deal with rest + json + callback-based apps? look no further:

## How it works


### Coffee
```coffeescript
Fakir = require 'fakir'

api = new Fakir
  hello: (msg)    -> "POST $msg TO http://foo.bar"
  price: (ticker) -> "GET http://foo.bar/stock/$ticker"

# and call them!
api.hello "world"

# all functions takes a "callback(err, data)"
api.price "PEAR", (err, price) -> console.log "PEAR: #{price}"
```

### JS

Of course Coffee and JS interfaces are strictly the same, and share the same features:

```javascript
var Fakir = require('fakir', true); 
var api = new Fakir({
    'hello': function (msg) { 
        return "POST $msg TO http://foo.bar";
    },
    'price': function (ticker) { 
        return "GET http://foo.bar/stock/$ticker";
    }
}, true) // add 'true' at the end to mock/debug the routes

// chaining is supported, but not yet futures: functions are called immediately 
api.hello("world").price("PEAR", function(err, price) { 
    return console.log("PEAR: #{price}");
})

```

### Changelog

#### 0.0.1: 
 * moved routes into the Fakir constructor
 * removed add() function
 * fixed a closure bug with the for loop
 * fixed a critical bug with optional callback
 * added an optional mock parameter to test routes
 * various cleaning
 
#### 0.0.0: Initial version



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/daizoru/node-fakir/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

