/**
 * Created by shani on 01/08/2017.
 */
var express = require('express');
var router = express.Router();
// var mongojs = require('mongojs');
router.get('/',function (req,res) {
    res.send('Index Page !');
});
module.exports = router;
