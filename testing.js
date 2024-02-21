/* Data + secret  =>  JWT code QUA PHƯƠNG THỨC SIGNS => Token

Token + secret => Dùng để decode qua phương thức verify => Data và iat
iat là ngày hết hạn của token

var jwt = require('jsonwebtoken');
var data = {
  username:"Nguyenthanhtri"
}
var secret = "Nguyenthanhtri123"
var token = jwt.sign(data, secret, {expiresIn: 30});
console.log(token);

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5ndXllbnRoYW5odHJpIiwiaWF0IjoxNzA1NjM2ODI2fQ.azqd6nteVm3rRpSCQhMSY5TChsQgV7KJSLnM7JOjFKk"
var result = jwt.verify(token, secret);
*/

