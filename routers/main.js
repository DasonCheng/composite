var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var router = express.Router();

var db = mongoose.connect('mongodb://banmagou:yhetgamebanmagou@localhost:27017/banmagou');

var goodsSchema = mongoose.Schema({
    id: Number,
    image: String,
    name: String,
    price: Number,
    brokerage: Number,
    salesCount: Number
}, { collection: 'goods' });

var items = mongoose.model('items', goodsSchema);



router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    items.find().limit(10).exec(function(err, goods) {
        if (err) return console.error(err);
        res.render('index', {
            goods: goods
        });
    });
});
router.post('/', function(req, res) {
    items.find().limit(6).skip((req.body.page - 1) * 6 + 10).exec(function(err, goods) {
        if (err) return console.error(err);
        res.send(goods);
    });
});

router.get('/upload', function(req, res) {
    res.render('upload', {

    });
});

router.get('/test', function(req, res) {
    res.render('test', {

    });
});
router.get('/video', function(req, res) {
    res.render('video', {

    });
});
router.get('/echarts', function(req, res) {
    res.render('echarts', {

    });
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, 'Orange' + '-' + Date.now() + file.originalname.match(/\.[^\.]+$/)[0]);
    }
});
router.post('/upload', function(req, res) {
    var upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
            if (file.mimetype.match(/^[^\/]+/)[0] == 'image') {
                cb(null, true);
            } else {
                cb(new Error('I don\'t have a clue!'));
                cb(null, false);
            }
        },
        limits: { fileSize: 1024 * 1024 * 2 }
    }).single('photo');

    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return;
        }
        console.log(req.file);
        res.status(204).end();
        // Everything went fine
    });
});
/*router.get('/', function(req, res) {
    items.find().limit(10).exec(function(err, goods) {
        if (err) return console.error(err);
        res.render('home', {
            goods: goods
        });
    });
});*/
module.exports = router;
