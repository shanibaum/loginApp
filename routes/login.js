/**
 * Created by shani on 01/08/2017.
 */
var express = require('express');
var router = express.Router();
// var mongojs = require('mongojs');
router.get('/login',function (req,res) {
    res.send('Login Page !');
});
module.exports = router;
 var a;