/**
 * Created by Lishuai on 2016/10/30.
 */

$(document).ready(function () {

    //验证登录状态
    $.ajax({
        url: "/Admin/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status == CORRECT) {
                //验证登录成功
                $("#cu-admin-notification").fadeOut(500);

                getSliderInfo();

            } else {
                $("#cu-admin-notification").html(
                    "error code: " + result.status + '<br>' + errorCode2errorInfo(result.status) + "正在跳转至登录页面..."
                );
                setTimeout(function () {
                    location.href = "/Admin/index.html";
                }, 1200);
            }
        }
    });
});


$("#model-form").submit(function (event) {

    event.preventDefault();
    var file = $('#exampleInputFile').prop('files')[0];
    var title = $("#title").val();
    var subtitle = $("#subtitle").val();

    //传一个就是取值
    var form_data = new FormData();
    form_data.append('slider_id', $('#slider-id').val());   //可能有问题
    form_data.append('title', title);
    form_data.append('subtitle', subtitle);
    form_data.append('picture',file);

    if (checkEmpty(title)) {
        return false;
    }
    if (checkEmpty(subtitle)) {
        return false;
    }
    if (!checkImg()) {
        return false;
    }

    $.ajax({
        url: "/Admin/controller/slider.update.con.php",
        type: "post",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data:form_data,
        success: function () {
            location.href = "/Admin/slider.html"
        }
    });
});

//退出登录
$("#cu-logout").click(function () {
    $.ajax({
        url: "/Admin/controller/logout.con.php",
        success: function (data) {

            if (data == CORRECT) {
                location.href = "/Admin/index.html";
            }
        }
    })
});

function getSliderInfo() {
    $.ajax({
        url: "/Admin/controller/slider.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            //alert(result);
            for (var count = 1; count < 4; count++) {
                $(".media:eq(" + count + ")>a>img").attr("src", "/theACP/images/slider/" + result.sliderInfo[count].img_path);
                $(".media-heading:eq(" + (count - 1) + ")").html(result.sliderInfo[count].title);
                $(".media-body:eq(" + (count - 1) + ")>p").html(result.sliderInfo[count].subtitle);  //这个函数有问题

                //在""中的变量要用字符拼接的形式完成，加减操作在括号中完成
            }

        }
    });
}

//向模态框传入Slider的ID
function loadModal(id) {
    $("#slider-id").attr("value", id);
}

//检查图片格式
function checkImg() {
    var picture = $("#exampleInputFile").val();
    var pattern = (/\.jpg$/);

    if (!pattern.test(picture)) {
        alert('图片格式只能为jpg');
        return false;
    }
    return true;
}

//检查标题和副标题
function checkEmpty(text) {
    if (text == "") {
        alert('标题/副标题不能为空');
        return true;
    }
    return false;
}
