restler = require 'restler'
class module.exports
  constructor: ->
  add: (functions) ->
    for name, func of functions
      nb_args = func.length
      reg = "function \\("
      for i in [0...nb_args]
        if i > 0
          reg += ", "
        reg += "([a-zA-Z0-9_]+)"
      reg += "\\)"
      match = new RegExp(reg).exec func.toString()
      i#log pretty match
      args = match[1...1+nb_args]

      reg2 = "return \"(.*)\""
      match = new RegExp(reg2).exec func.toString()
      pattern = match[1]
      
      parts = pattern.split ' '
      switch parts[0].toUpperCase()
        when 'GET'
          @[name] = (_args..., cb) =>
            url = parts[1]
            for i in [0..._args.length]
              arg_value = _args[i]
              arg_key = args[i]
              reg3 = new RegExp("\\$#{arg_key}",'gi')
              url = url.replace reg3, arg_value
            restler.get(url).on 'complete', (result) ->
              if result instanceof Error
                cb result, undefined
              else
                cb undefined, result
            @
          
        when 'POST'
          @[name] = (_args..., cb) =>
            url = parts[3]
            post_data = {}
            for i in [0..._args.length]
              arg_value = _args[i]
              arg_key = args[i]
              if arg_key is parts[1]
                post_data = arg_value
              reg3 = new RegExp("\\$#{arg_key}",'gi')
              url = url.replace reg3, arg_value
            restler.post(url, data: post_data).on 'complete', (result) ->
              if result instanceof Error
                cb result, undefined
              else
                cb undefined, result
            @
        else
          throw "unsupported #{parts}"
    @
