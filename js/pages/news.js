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
                location.href = "index.html";
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
                        "<td>" + result.info[item + ""]['title'] + "</td>" +
                        "<td>" + result.info[item + ""]['content'] + "</td>" +
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

    var form_data = new FormData();
    var files = $('#ff').prop('files');
    var file_num = files.length;

    for (var i = 0; i < file_num; i++) {
        form_data.append('pictures' + i, files[i]);
    }
    form_data.append('file_num', file_num);
    form_data.append('title', $('#title').val());
    form_data.append('content', $('#content').val());

    swal({
        title: "确认添加资讯",
        type: "info",
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
                if (data == 1) {
                    swal("添加成功");
                } else {
                    swal("添加失败");
                }

            }
        });
    });
});