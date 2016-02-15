/*
	QA 技术概览

	1.页面测试：
		页面测试，顾名思义，用来测试页面的表示和前端功能。这同时涉及单元测试和集成测试。我们会
		用Mocha进行页面测试。
	2.跨页测试：
		跨页测试是从一个页面转到另一个页面的功能的测试。比如电子商务网站上的结账功能，通常要跨
		多个页面。因为这种测试会涉及多个组件，所以一般被当作集成测试。这个测试使用的是Zombie.js.
	3.逻辑测试：
		会对逻辑域进行单元和集成测试
	4.去毛：
		JSHint去毛，找出潜在的错误
	5.链接检查：
		LinkChecker



	nodemon监控工具

	// 使用--save-dev而不是--save，告诉npm要把这个包放在开发依赖项中，
	// 不要放在运行依赖项中。这样，当我们部署网站的现场实例时，可以减少项目的依赖项。
	npm install --save-dev mocha

	Mocha要在浏览器中运行，所以我们要把Mocha资源放在public目录下，以便让客户端访问到。
	我们会把这些资源放在子目录public/vendor中
	mkdir public/vendor
	cp node_modules/mocha/mocha.js public/vendor
	cp node_modules/mocha/mocha.css public/vendor

	测试通常需要一个assert(或expect)函数。Node框架中有这个函数，但浏览器中没有，所以我们要
	用Chai断言库。
	npm install --save-dev chai
	cp node_modules/chai/chai.js public/vendor

	通过URL参数来打开测试


	持续集成：CI
		JetBrains 卓越的 TeamCity(http://www.jetbrains.com/teamcity/）

	Grunt自动化
		安装自动化插件实现



 */