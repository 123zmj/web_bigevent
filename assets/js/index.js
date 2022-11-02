$(function() {
    // 调用函数获取用户基本信息
    getUserInfo();


    // 点击退出事件
    $('#btnLogout').on('click', function() {
        // 模态框
        layer.confirm('你确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token');
            // 重新跳转到登录页
            location.href = './login.html';
            layer.close(index);
        });
    })
})


var layer = layui.layer;
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败');
            }
            // 渲染用户头像
            renderAvatar(res.data);
        },
        // // 不论成功或者失败都会调用
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转
        //         location.href = './login.html';
        //     }
        // }
    });
}


// 渲染用户头像
function renderAvatar(user) {
    // 1 用户名 
    // 如果用户有昵称就以昵称为主 如果用户没有昵称就使用用户名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 2 头像
    if (user.user_pic) {
        $('.layui-nav-img').show().attr('src', user.user_pic).siblings('.text-avatar').hide();
    }
    $('.text-avatar').show().html(name[0].toUpperCase()).siblings('.layui-nav-img').hide();
}