Fakir = require 'fakir'
fakir = new Fakir()

fakir.add sendMail: (id, token, msg) -> "POST $msg TO http://localhost/user/$id/mail&token=$token"
fakir.add makeVoucher: (id, token)      -> "GET http://localhost/user/$id/voucher&token=$token"

fakir.makeVoucher "foo","bar", (err, voucher) ->
  console.log "got voucher: "+JSON.stringify voucher
