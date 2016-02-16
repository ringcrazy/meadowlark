// 程序主文件

var express = require('express');
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');
var app = express();

// 模块名称前添加 ./表示根目录， ../ 表示上级目录
var fortunes = require('./lib/fortune.js');
var weather = require('./lib/weather.js');

app.set('port', process.env.PORT || 3000);

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 静态文件中间件，中间件是一种模块化手段，它使得请求的处理更加容易。
// static 中间件可以将一个或多个目录指派为包含静态资源的目录，其中的资源不经过
// 任何处理直接发送到客户端，你可以在其中放图片、Css文件、客户端Javascript文件之类的资源。
app.use(express.static(__dirname + '/public'));

// 通过中间件来检测查询字符串
// res.locals对象是要传给视图的上下文的一部分
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// middleware to add weather data to context
app.use(function(req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = weather.getWeatherData();
    next();

});


// 使用中间件 body-parser
app.use(require('body-parser')());

// 文件上传
app.use('/upload', function(req, res, next) {
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: function() {
            return __dirname + '/public/uploads/' + now;
        },
        uploadUrl: function() {
            return '/uploads/' + now;
        },
    })(req, res, next);
});

app.get('/newsletter', function(req, res) {
    res.render('newsletter', {
        csrf: 'CSRF token goes here'
    });
});
app.get('/newsletter-ajax', function(req, res) {
    res.render('newsletter_ajax');
});

app.post('/process', function(req, res) {
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/thank-you');
});


// ajax请求
app.post('/processAjax', function(req, res) {
    if (req.xhr || req.accepts('json,html') === 'json') {
        // 如果发生错误,应该发送 { error: 'error description' }
        res.send({
            success: true
        });
    } else {
        // 如果发生错误,应该重定向到错误页面
        res.redirect(303, '/thank-you');
    }
});

app.get('/thank-you', function(req, res) {
    res.render('thank-you');
});



// 路由方法
app.get('/', function(req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');

    res.render('home');
});

app.get('/contest/vocation-photo', function(req, res) {
    var now = new Date();
    res.render('contest/vocation-photo', {
        year: now.getFullYear(),
        month: now.getMonth
    });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});


// 在路由中指明视图应该使用哪个页面测试文件
app.get('/about', function(req, res) {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');

    res.render('about', {
        fortune: fortunes.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});

// 定制404页面, app.use是Express添加中间件的一种方法
app.use(function(req, res) {
    // res.type('text/plain');
    // res.status(404);
    // res.send('404- Not Found');
    res.status(404);
    res.render('404');
});

// 定制500页面
app.use(function(err, req, res, next) {
    // console.error(err.stack);
    // res.type('text/plain');
    // res.status(500);
    // res.send('500 - Server Error');
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



// if( app.thing == null ) console.log( 'bleat!' );

// 监听端口
app.listen(app.get('port'), function() {
    // console.log("hello world");
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl - C to terminate.');
});
