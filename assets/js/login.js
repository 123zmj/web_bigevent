$(function() {
    // 去登陆去注册
    // 1 点击 去注册账号 的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide().siblings('.reg-box').show();
    });
    // 2 点击 去登陆 的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide().siblings('.login-box').show();
    });


    // 自定义校验规则
    // 1 从layUI获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 2 通过form.verify自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致';
            }
        }
    });



    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1 阻止表单的默认提交行为
        e.preventDefault();
        // 2 发起Ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);;
            }
            layer.msg('注册成功, 请登录');
            // 注册成功之后 直接跳转到登陆页面
            $('#link_login').click();
        });
    });



    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 1 阻止默认提交行为
        e.preventDefault();
        // 2 发起Ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                layer.msg('登陆成功！');
                // 将登陆成功之后的token字符串保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = './index.html';
            }
        });
    });
})