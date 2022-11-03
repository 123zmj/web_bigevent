$(function() {
    // 定义layer和form
    var form = layui.form;
    var layer = layui.layer;

    // 密码验证规则
    form.verify({
        password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        confirmNewPwd: function(value) {
            var newPwd = $('.layui-input-block [name=newPwd]').val();
            if (value !== newPwd) {
                return '确认密码与新密码不一致';
            }
        },
        // 新密码和原密码不能一致
        samePwd: function(value) {
            var oldPwd = $('.layui-input-block [name=oldPwd]').val();
            if (oldPwd === value) {
                return '新密码不能和原密码一致';
            }
        }
    });


    // 表单提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单提交的默认行为
        e.preventDefault();
        // 发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 清空表单
                $('.layui-form')[0].reset();
            }
        });
    })
})