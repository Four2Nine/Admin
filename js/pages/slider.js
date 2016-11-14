/**
 * Created by liuyang on 2016/11/13.
 */

//验证登录状态
$.ajax({
    url: "/Admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getSliderList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "/Admin/index.html";
            }, 1000);
        }
    }
});

function getSliderList() {
    $.ajax({
        url: "/Admin/controller/slider.list.con.php",
        success: function (data) {
            var result = JSON.parse(data);

            var html = "";
            for (var item in result.info) {
                var path = result.info[item + ""]['img_path'];
                html += "<tr>" +
                    "<td>" + item + "</td>" +
                    "<td>" +
                    "<a href='javascript:void(0);' class='thumbnail'>" +
                    "<img src='../../theACP/images/slider/" + path + "' class='img-responsive'>" +
                    "</a>" +
                    "</td>" +
                    "<td>" + result.info[item + ""]['title'] + "</td>" +
                    "<td>" + result.info[item + ""]['subtitle'] + "</td>" +
                    "<td>" +
                    "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                    "onclick='detailSlider(" + item + ")' data-toggle='modal' data-target='#detailSliderModal'>details</button>" +
                    "</td>" +
                    "</tr>";
            }
            $("#cu-slider-table").find("tbody").html(html).fadeIn(300);
        }
    });
}

function detailSlider(id) {
    $("#slider-id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/slider.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            for (var item in result.detail) {
                if (item == "img_path") {
                    $("#slider-img").attr("src", "../../theACP/images/slider/" + result.detail['img_path']);
                } else if (item == "title") {
                    $("#title").attr("value", result.detail['title']);
                } else if (item == "subtitle") {
                    $("#subtitle").html(result.detail['subtitle']);
                }
            }
        }
    });
}

$("#slider-form").submit(function (event) {
    event.preventDefault();

    var file = $('#picture');
    var title = $("#title");
    var subtitle = $("#subtitle");

    var form_data = new FormData();
    form_data.append('slider_id', $('#slider-id').val());
    form_data.append('title', title.val());
    form_data.append('subtitle', subtitle.val());
    form_data.append('is_update_picture', file.prop('files')[0] != undefined);
    if (file.prop('files')[0] == undefined) {
        form_data.append('picture', "");
    } else {
        form_data.append('picture', file.prop('files')[0]);
    }

    //check
    if (!checkPicture(file)) {
        return false;
    }

    if (!checkTitle(title)) {
        return false;
    }

    if (!checkTitle(subtitle)) {
        return false;
    }

    $.ajax({
        url: "/Admin/controller/slider.update.con.php",
        type: "post",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (data) {
            $("#detailSliderModal").modal('hide');

            var result = JSON.parse(data);

            if (result.affected_rows == 1 || result.is_update_picture) {
                //修改成功
                var text = "轮播图信息已修改";
                if (result.is_update_picture) {
                    text += "&nbsp;&nbsp;图片已替换。由于浏览器缓存，更改的图片并不会立即显示。建议手动刷新!"
                }
                showNotification("alert-success", text, "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getSliderList();

            } else {
                showNotification("alert-danger", "轮播图信息修改失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    });
});

//失去焦点时判断 input 的合法性
$("#picture").blur(function () {
    checkPicture($(this));
});
$("#title").blur(function () {
    checkTitle($(this))
});
$("#subtitle").blur(function () {
    checkSubtitle($(this));
});