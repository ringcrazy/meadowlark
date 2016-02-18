路由：
路由是网站或Web服务中最重要的一个方面， 好在Express中的路由简单、 灵活、 健壮。
路由是将请求（ 由URL和HTTP方法指定） 路由到处理它们的代码去的一种机制。

网站管理员有责任让分配的URI保持2年、 20 年、 200 年不变。 这需要思考、 组织和决心。

IA： 信息架构
绝不在URL中暴露技术细节
避免在URL中出现无意义的信息
避免无谓的长URL
单词分隔符要保持一致
绝不要用空格或不可录入的字符
在URL中用小写字母

路由和SEO：
尽量使用有意义的名字

子域名：
除了路径， 子域名一般也是URL中用来路由请求的部分。
虚拟主机 vhost
比 如 REST API(api.meadowlarktravel.com) 或
管 理 界 面(admin.meadowlarktravel.com)

路由处理器是中间件： 可以创建可以用在任何路由中的通用函数
比如 说, 我们有种机制在特定页面上显示特殊优惠。 特殊优惠经常换, 并且不是每个页面上都 显示。
我们可以创建一个函数, 将 specials 注入到 res.locals 属性中

function specials(req, res, next) {
    res.locals.specials = getSpecialsFromDatabase();
    next();
}
app.get('/page-with-specials', specials, function(req, res) {
    res.render('page-with-specials');
});

我们也可以用这种方式实现授权机制。 比如说我们的用户授权代码会设定一个会话变量
req.session.authorized, 则可以像下面这样做一个可重复使用的授权过滤器:
    function authorize(req, res, next) {
        if (req.session.authorized) return next();
        res.render('not-authorized');
    }
app.get('/secret', authorize, function() {
    res.render('secret');
});
app.get('/sub-rosa', authorize, function() {
    res.render('sub-rosa');
});

路由路径和正则表达式：
路由中指定的路径(比如 / foo) 最终会被 Express 转换成一个正则表达式。
某些正则表达 式中的元字符可以用在路由路径中: +、 ? 、 * 、(和)。
用同一 个路由处理 / user 和 / username 两个 URL:
    app.get('/user(name)?', function(req, res) {
        res.render('user');
    });

路由参数：
app.get('/staff/:name', function(req, res) {
    var info = staff[req.params.name];
    if (!info) return next(); // 最终将会落入 404 
    res.render('staffer', info);
})
我们在路由中如何使用: name。 它会跟任何字符串匹配(不包括反斜杠),
    并将其跟 键 name 一起放到 req.params 对象中。
我们会经常用到这个参数, 特别是在创建 REST API 时。

组织路由：
原则：
给路由处理器用命名函数
路由不应该神秘
路由组织应该是可扩展的
不要忽视自动化的基于视图的路由处理器

在模块中声明路由：
module.exports = function(app) {
        app.get('/', function(req, res) {￼}))
    //... 
};
require('./routes.js')(app);

按逻辑对处理器分组
更极端的做法是给每个处理器建一个 JavaScript 文件

自动化渲染视图
	只要把 HTML 文件放到一个目录中, 然后很快你的网站就能提供
	var autoViews = {};
	var fs = require('fs');
	app.use(function(req, res, next) {
	    var path = req.path.toLowerCase();
	    // 检查缓存;如果它在那里,渲染这个视图
	    if (autoViews[path]) return res.render(autoViews[path]); // 如果它不在缓存里,那就看看有没有 .handlebars 文件能匹配
	    if (fs.existsSync(__dirname + '/views' + path + '.handlebars')) {
	        autoViews[path] = path.replace(/^\//, '');
	        return res.render(autoViews[path]);
	    }
	    // 没发现视图;转到 404 处理器 next();
	});

其他的路由组织方式
	最流行的两种路由组织方式是命名空间路由(namespaced routing)和
	随机应变路由 (resourceful routing)。当很多路由都以相同的前缀开始时,
	命名空间路由很不错(比如 / vacations)。有个 Node 模块叫 express-namespace,
	它让这种方式变得很容易。随机应变路 由基于一个对象中的方法自动添加路由。
	如果网站的逻辑是天然面向对象的,这项技术就
	很好用。express-resource 包是如何实现这种路由组织风格的范例。
