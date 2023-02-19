const jwt = require("jsonwebtoken");
var User = require("../models/user.model");

exports.verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if(err){
        res.status(500)
        .send({
          message: 'Token is unauthorized'
        })
      }else{
        User.findOne({
            _id: decode.id
          })
          .exec((err, user) => {
            if (err) {
              res.status(500)
                .send({
                  message: err
                });
            } else {
              req.user = user;
              next();
            }
          })
      }
    });
  } else {
    req.user = undefined;
    next();
  }
};
// module.exports = verifyToken;