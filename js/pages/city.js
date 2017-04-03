/**
 * Created by liuyang on 2017/4/3.
 */

//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getCityList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getCityList() {
    $.ajax({
        url: '/admin/controller/city.list.php',
        success: function (data) {
            var result = JSON.parse(data);
            var cityNum = result.number;

        }
    })
}

$(".dd-handle").click(function () {
    $("#parent-node").attr(
        'value',
        $(this).parents().attr('data-id') + ":" +
        $(this).parents().attr('data-name')
    );
});

$(".clear-parent-node").click(function () {
    $("#parent-node").attr('value', '');
});

/*
 var dd = $('.dd');
 listening dd's changing

 dd.on('change', function () {
 var $this = $(this);
 var serializedData = window.JSON.stringify($($this).nestable('serialize'));

 $this.parents('div.body').find('textarea').val(serializedData);
 });

 */

function generationTree(cities, flags, preId, currId, html) {

}