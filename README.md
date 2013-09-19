#node-fakir

*magic rest client*

[![NPM](https://nodei.co/npm/petri.png?downloads=true&stars=true)](https://nodei.co/npm/petri/)

## Description

You only deal with rest + json + callback-based apps? look no further:

## How it works


### Coffee
```coffeescript
Fakir = require 'fakir'

api = new Fakir()

# then add endpoints
api.add hello: (msg)    -> "POST $msg TO http://foo.bar"
api.add price: (ticker) -> "GET http://foo.bar/stock/$ticker"

# and call them!
api.hello "world"

# all functions takes a "callback(err, data)"
api.price "PEAR", (err, price) -> console.log "PEAR: #{price}"
```

### JS

Of course Coffee and JS inrterfaces are strictly the same, and share the same features:

```javascript
var Fakir = require('fakir');
var api = new Fakir();

// you can also add multiple endpoints at once
api.add({
    'hello': function (msg) { 
        return "POST $msg TO http://foo.bar";
    },
    'price': function (ticker) { 
        return "GET http://foo.bar/stock/$ticker";
    }
})

// chaining is supported
api.hello("world").price("PEAR", function(err, price) { 
    return console.log("PEAR: #{price}");
})

```
