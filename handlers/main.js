var fortune = require('./lib/fortune.js');
exports.home=function(req, res){
	res.render('home');
};
exports.about=funciton(req, res){
	res.about('about', {
		fortune:fortune.getFortune(),
		pageTestScript:'/qa/tests-about.js'
	});
};