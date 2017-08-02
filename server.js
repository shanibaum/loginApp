/**
 * Created by shani on 01/08/2017.
 */
var port        = process.env.port || 3000;
var express     = require('express');
var app         = express();
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var router      = express.Router();
var appRoutes   = require("./app/routes/api")(router);

var path        = require('path');
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);
mongoose.connect('mongodb://localhost:27017/login',function (err) {
     if(err){
         console.log(err + ' Error');
     }else{
         console.log("Successfully connected!");
     }
 });

app.get('*',function(req,res){
    res.sendfile(path.join(__dirname + '/public/app/views/index.html'));
});



app.listen(port, function(){
    console.log('Server started on port '+port);
});

