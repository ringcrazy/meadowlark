1.文件系统持久化
	实现持久化的一种方式是将数据存到扁平文件中
	（“扁平”的意思是文件没有内在结构，只是一串字节），
	Node通过fs（文件系统）模块实现文件系统持久化。

2.云持久化
	云存储越来越流行了，强烈建议利用这些便宜又好用的服务。

3.数据库持久化
	（1）关系型数据管理系统（RDBMS）
	（2）文档数据库NoSQL

	性能
	MongoDB
	Mongoose
	Redis:会话存储