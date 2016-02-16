// 程序主文件

var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
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

// 路由方法
app.get('/', function(req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');

    res.render('home');
});

// 模块名称前添加 ./表示根目录， ../ 表示上级目录
var fortunes = require('./lib/fortune.js');

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
