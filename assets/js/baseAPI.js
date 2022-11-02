// 每次调用$.get $.post $.ajax的时候会先调用这个函数$.ajaxPrefilter 这个函数可以拿到传递进去的那些参数 只有这个函数真正完成之后才会调用Ajax
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 如果请求路径里面包含/my
    if (options.url.indexOf('/my') != -1) {
        // 统一为有权限的接口设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }


    // 全局统一挂载complete
    options.complete = function(res) {
        // 不论成功或者失败都会调用
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转
            location.href = './login.html';
        }
    }
});