var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = "harrypotter";

module.exports = function(router){
    //Login Route
    //http://localhost:port/api/authenticate
    router.post('/authenticate',function (req,res) {
        User.findOne({username:req.body.username})
            .select('username password')
            .exec(function(err,user){
                if(err){
                    throw err;
                }
                if(!user){
                    res.json({success:false,message:"Could Not Authenticated User ."})
                }else if(user){
                    if(req.body.password){
                        var validPassword = user.comparePasswords(req.body.password);
                    }else{
                        res.json({success:false,message:"Password not provided ."})
                    }
                    if(!validPassword){
                        res.json({success:false,message:"Could Not Authenticated Password ."})
                    } else{
                        var token = jwt.sign({'username' : user.username},secret, { expiresIn: '24h' });
                        res.json({success:true,message:"User Authenticated !", token:token})
                    }
                }
            })
});
    router.use(function (req,res,next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            jwt.verify(token, secret, function(err, decoded) {
              if(err){
                  res.json({success:false,message:"Token Invalid ."})
              }else{
                  req.decoded = decoded;
                  next();
              }
            });

        }else{
            res.json({success:false,message:"No Token Founded ."})
        }
    });
    router.post('/userData',function (req,res) {
        res.send(req.decoded);
    })
    return router;

}


