var Fakir = require("fakir");
var fakir = new Fakir();
fakir.add({
    sendMail: function(id, token, msg) {
      return "POST $msg TO http://localhost/user/$id/mail&token=$token";
    },
    makeVoucher: function(id, token) {
      return "GET http://localhost/user/$id/voucher&token=$token";
    }
}).makeVoucher("foo", "bar", function(err, voucher) {
    return console.log("got voucher: " + JSON.stringify(voucher));
});
