var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var router = require('./routers/main');
var exphbs = require('express-handlebars');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views',__dirname+'/views');

app.set('view engine','jade');
/*app.engine('html', exphbs({
    extname: '.html'
}));
app.set('view engine', 'html');*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);

app.listen(app.get('port'), function() {
    console.log('Exprese started on http://localhost/:' + app.get('port') + ';press Ctrl+C to terminate!');
});
