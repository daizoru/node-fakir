var Fakir = require("fakir");
new Fakir({
    sendMail: function(id, token, msg) {
      return "POST $msg TO http://localhost/user/$id/mail&token=$token";
    },
    makeVoucher: function(id, token) {
      return "GET http://localhost/user/$id/voucher&token=$token";
    }
}, true).makeVoucher("foo", "bar", function(err, voucher) {
    return console.log("got voucher: " + JSON.stringify(voucher));
}).sendMail(42, "some_token", {"hello":"world"});


