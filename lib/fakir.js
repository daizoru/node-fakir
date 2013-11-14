// Generated by CoffeeScript 1.6.3
(function() {
  var isFunction, restler,
    __slice = [].slice;

  restler = require('restler');

  isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  module.exports = (function() {
    function exports(routes, mock) {
      var func, name, _fn,
        _this = this;
      if (routes == null) {
        routes = {};
      }
      this.mock = mock != null ? mock : false;
      _fn = function(name, func) {
        var args, i, match, parts, pattern, reg, _i, _ref;
        reg = "function \\(";
        for (i = _i = 0, _ref = func.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          reg += "" + (i > 0 ? ', ' : '') + "([a-zA-Z0-9_]+)";
        }
        reg += "\\)";
        match = new RegExp(reg).exec(func.toString());
        args = match.slice(1);
        pattern = func();
        parts = pattern.split(' ');
        switch (parts[0].toUpperCase()) {
          case 'GET':
            return _this[name] = function() {
              var arg_key, arg_value, cb, reg3, url, _args, _j, _ref1;
              _args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              cb = isFunction(_args[_args.length - 1]) ? _args.pop() : function() {};
              url = parts[1];
              for (i = _j = 0, _ref1 = _args.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                arg_value = _args[i];
                arg_key = args[i];
                reg3 = new RegExp("\\$" + arg_key, 'gi');
                url = url.replace(reg3, arg_value);
              }
              if (_this.mock) {
                console.log("getting " + url);
                cb(void 0, "ok");
                return _this;
              }
              restler.get(url).on('complete', function(result) {
                if (result instanceof Error) {
                  return cb(result, void 0);
                } else {
                  return cb(void 0, result);
                }
              });
              return _this;
            };
          case 'POST':
            return _this[name] = function() {
              var arg_key, arg_value, cb, post_data, reg3, url, _args, _j, _ref1;
              _args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              cb = isFunction(_args[_args.length - 1]) ? _args.pop() : function() {};
              url = parts[3];
              post_data = {};
              for (i = _j = 0, _ref1 = _args.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                arg_value = _args[i];
                arg_key = args[i];
                if (arg_key === parts[1].substring(1)) {
                  post_data = arg_value;
                }
                reg3 = new RegExp("\\$" + arg_key, 'gi');
                url = url.replace(reg3, arg_value);
              }
              if (_this.mock) {
                console.log("posting " + (JSON.stringify(post_data)) + " TO " + url);
                cb(void 0, "ok");
                return _this;
              }
              restler.post(url, {
                data: post_data
              }).on('complete', function(result) {
                if (result instanceof Error) {
                  return cb(result, void 0);
                } else {
                  return cb(void 0, result);
                }
              });
              return _this;
            };
          default:
            throw "unsupported " + parts;
        }
      };
      for (name in routes) {
        func = routes[name];
        _fn(name, func);
      }
    }

    return exports;

  })();

}).call(this);