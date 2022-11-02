// 每次调用$.get $.post $.ajax的时候会先调用这个函数$.ajaxPrefilter 这个函数可以拿到传递进去的那些参数 只有这个函数真正完成之后才会调用Ajax
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
});