// 模块封装功能既强大又简单，它能改善项目的总体设计和可维护性，还能使测试变得更加简单

var fortunes=[
	"Conquer your fears or they will conquer you.",
	"Rivers need springs",
	"Do not fear what you don't know",
	"You will have a pleasant surprise",
	"Whenever possible, keep it simple"
];

// 如何你想让一个东西在模块外可见，必须把它加到exports上
exports.getFortune=function(){
	var idx = Math.floor(Math.random()*fortunes.length);
	return fortunes[idx];
};