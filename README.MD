###一个简单的前后端开发脚手架
####服务器
1. express
2. hjs模板引擎
3. 建议使用async编写异步js代码

####前端
1. bower管理第三包资源
2. gulp进行js压缩、less编译、图片压缩、页面assets合并
3. 使用hjs前端模板，js中有模板cache机制
4. 建议使用promise编写ajax等异步js代码

####使用
- 安装
    1. git clone 到本地
    2. npm install
    3. bower install
- 开发
    1. cd 文件目录
    2. 开一个terminal，执行gulp dev
    3. ./bin/www 启动express服务器，访问 http://127.0.0.1:3121/ 
- 构建    
    1. 打开gulpfile，把dev改为false
    2. 设置node环境env为production
    3. 执行gulp build
    4. ./bin/www 启动express服务器，访问 http://127.0.0.1:3121/ ，查看页面源码可以看到js、css文件都被合并成一个文件了

####其他
- 当前的脚手架没有整合前端模块依赖方案，后续可整合requirejs、seajs完成
- 上述所有事情都可以通过webpack搞定:D，包括requirejs那鬼畜的amd



