/**
 * Created by liuyang on 2017/3/19.
 */

//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getNewsList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getNewsList() {
    $.ajax({
        url: "/admin/controller/news.list.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            var projectNum = result.number;

            //显示项目表格的内容
            if (projectNum == 0) {
                $("#cu-news-table").find("tbody>tr>td").html("暂时没有资讯，请添加");
            } else {
                var html = "";
                for (var item in result.info) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td style='max-width: 200px;'>" + result.info[item + ""]['title'] + "</td>" +
                        "<td style='max-width: 200px;'>" + result.info[item + ""]['content'].substring(0, 50) + "</td>" +
                        "<td>" + result.info[item + ""]['pushTime'] + "</td>" +
                        "<td>" +
                        "<div class='btn-group' role='group'>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='detailNews(" + item + ")' data-toggle='modal' data-target='#detailNewsModal'>details</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='deleteNews(" + item + ")'>delete</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }

                $("#cu-news-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
}

$("#add_news_form").submit(function (event) {

    event.preventDefault();
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");
    $inputs.prop("disabled", true);

    var title = $("#title");
    var content = $("#content");
    var url = $("#url");
    var image = $("#image");

    var form_data = new FormData();

    var image__file = image.prop("files")[0];

    if (image__file == undefined) {
        form_data.append('image-flag', 0);
    } else if (image__file.size > 5242880) {
        $("#image-error").html("图片不能大于5MB");

        $inputs.prop("disabled", false);
        image.parents('.form-line').addClass('error');
        return false;
    } else {
        form_data.append('image-flag', 1);
        form_data.append('image', image__file);
    }

    form_data.append('title', title.val());
    form_data.append('content', content.val());
    form_data.append('url', url.val());

    swal({
        title: "确认添加资讯",
        type: "info",
        confirmButtonText: "确认添加",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {

        $.ajax({
            url: "/admin/controller/news.addItem.con.php",
            type: "post",
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                $inputs.prop("disabled", false);
                if (data == 1) {
                    swal({
                        title: "添加成功",
                        type: "info",
                        confirmButtonText: "返回资讯列表",
                        cancelButtonText: "关闭",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function () {
                        location.href = "news.html";
                    });
                } else {
                    swal("添加失败");
                }

            }
        });
    });
});

$("#update_news_form").submit(function (event) {
    event.preventDefault();
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");

    var id = $("#id");

    if (id.val() == "") {
        showNotification("alert-danger", "发生错误", "top", "right", "animated fadeInRight", "animated fadeOutRight");
        return false;
    }
    $inputs.prop("disabled", true);

    var title = $("#title");
    var content = $("#content");
    var url = $("#url");
    var image = $("#image");

    var form_data = new FormData();

    var image__file = image.prop("files")[0];

    if (image__file == undefined) {
        form_data.append('image-flag', 0);
    } else if (image__file.size > 5242880) {
        $("#image-error").html("图片不能大于5MB");

        $inputs.prop("disabled", false);
        image.parents('.form-line').addClass('error');
        return false;
    } else {
        form_data.append('image-flag', 1);
        form_data.append('image', image__file);
    }

    form_data.append('id', id.val());
    form_data.append('title', title.val());
    form_data.append('content', content.val());
    form_data.append('url', url.val());

    $.ajax({
        url: "/admin/controller/news.update.con.php",
        type: "post",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (data) {
            $inputs.prop("disabled", false);
            $("#detailNewsModal").modal('hide');
            var result = JSON.parse(data);
            if (result == 1) {
                showNotification("alert-success", "资讯已修改", "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getNewsList();
            } else {
                showNotification("alert-danger", "资讯修改失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    });
});

function detailNews(id) {
    $.ajax({
        url: "/admin/controller/news.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            $("#id").prop("value", result['detail']['id']);
            $("#title").prop("value", result['detail']['title']);
            $("#content").prop("value", result['detail']['content']);
            $("#url").prop("value", result['detail']['url']);

            var image_name = result['detail']['image_path'];
            var image = $("#head-img");
            if (image_name == "") {
                image.hide();
            } else {
                image.show();
                image.prop("src", "../images/news/" + result['detail']['image_path']);
            }
        }
    })
}

function deleteNews(id) {
    swal({
        title: "删除资讯",
        text: "此操作不能撤销!",
        type: "info",
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/news.delete.con.php",
            data: {id: id},
            type: "post",

            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getNewsList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}