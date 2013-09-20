restler = require 'restler'
isFunction = (obj) -> !!(obj and obj.constructor and obj.call and obj.apply)
class module.exports
  constructor: (routes={}, @mock=no) ->
    for name, func of routes
      do (name, func) =>
        reg = "function \\("
        reg += "#{if i > 0 then ', ' else ''}([a-zA-Z0-9_]+)" for i in [0...func.length]
        reg += "\\)"
        match = new RegExp(reg).exec func.toString()
        args = match[1...]
        pattern = func()      
        parts = pattern.split ' '
        switch parts[0].toUpperCase()
          when 'GET'
            @[name] = (_args...) =>
              cb = if isFunction _args[_args.length - 1]
                  _args.pop()
                else
                  ->
              url = parts[1]
              for i in [0..._args.length]
                arg_value = _args[i]
                arg_key = args[i]
                reg3 = new RegExp("\\$#{arg_key}",'gi')
                url = url.replace reg3, arg_value
              if @mock
                console.log "getting #{url}"
                cb undefined, "ok"
                return @
              restler.get(url).on 'complete', (result) ->
                if result instanceof Error
                  cb result, undefined
                else
                  cb undefined, result
              @
            
          when 'POST'
            @[name] = (_args...) =>
              cb = if isFunction _args[_args.length - 1]
                  _args.pop()
                else
                  ->
              url = parts[3]
              post_data = {}
              for i in [0..._args.length]
                arg_value = _args[i]
                arg_key = args[i]
                if arg_key is parts[1].substring(1)
                  post_data = arg_value
                reg3 = new RegExp("\\$#{arg_key}",'gi')
                url = url.replace reg3, arg_value
              if @mock
                console.log "posting #{JSON.stringify post_data} TO #{url}"
                cb undefined, "ok"
                return @
              restler.post(url, data: post_data).on 'complete', (result) ->
                if result instanceof Error
                  cb result, undefined
                else
                  cb undefined, result
              @
          else
            throw "unsupported #{parts}"
      
