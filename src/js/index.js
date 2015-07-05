//全局变量可用闭包优化
var TPL = {};
var HOGANCONFIG = {delimiters: '<% %>'};

$(document).ready(function() {
	//初始化逻辑
	init();
	//绑定事件
	bindEvent();
});

function init() {
	$("#userList").data('user', 123);
	console.log($("#userList").data('user'));
	
}

function renderTpl(tplName, data) {
	var $tpl = $("script[data-tpl='" + tplName + "']");
	if (!$tpl) {
		return false;
	}

	if (!TPL[tplName]) {
		TPL[tplName] = Hogan.compile($tpl.html(), HOGANCONFIG);
	}

	return TPL[tplName].render(data);
}

function bindEvent() {
	$("#btnLoad").on('click', function() {
		$.when(getUser())
	　　		.done(function(data) {
				var output = renderTpl('userinfo', data);
				$("#userList").append(output);
			})
	　　		.fail(function(msg) { 
				console.log(msg); 
			})
			.always(function() {
				console.log('always');
			});
	});

	$("#btnSet").on('click', function() {
		$.when(setUser())
	　　		.done(function(data) { 
				alert(data);
			})
	　　		.fail(function(msg) { 
				console.log(msg); 
			})
			.always(function() {
				console.log('always');
			});
	});	
}

function getUser() {
	var dtd = $.Deferred();	
	$.get('/users/getUser',
		{
			uid: 1
		}, 
		function(ret) {
			if (ret.state == 'ok') {
				dtd.resolve(ret.data);
			} else {
				dtd.reject('get data error');
			}
		});

	return dtd;
}

function setUser() {
	var dtd = $.Deferred();	
	$.post('/users/setUser',
		{
			uid: 1,
			age: 19
		}, 
		function(ret) {
			if (ret.state == 'ok') {
				dtd.resolve(ret.data);
			} else {
				dtd.reject('set data error');
			}
		});

	return dtd;
}