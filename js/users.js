var itemsNumberPerPage = 30;
var pageNum = 1;
var currentPage = getQueryString("p");

if (currentPage == null || currentPage.toString().length < 1) {
    currentPage = 1;
}

$(document).ready(function () {
    //验证登录状态
    $.ajax({
        url: "/Admin/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status == CORRECT) {
                //验证登录成功
                $("#cu-admin-notification").fadeOut(500);

                getPagerAndUserInfo();

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


$("#user-form").submit(function (event) {
    var $form = $(this);
    event.preventDefault();

    var id = $("#user_id").attr("value");
    var serializedData = $form.serialize();
    if (id == "") return false;

    $.ajax({
        url: "/Admin/controller/users.update.con.php",
        data: serializedData,
        type: "post",
        success: function (data) {
            alert(data);
            if (data == 1) {
                alert("修改成功");
                location.href = "/Admin/dashboard.html";
            }
        }
    });
});

function getPagerAndUserInfo() {
    $.ajax({
        url: "/Admin/controller/users.list.con.php",
        type: "get",
        data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);
            var applyNum = result.applyNum;
            $("#cu-apply-num").html("&nbsp;" + applyNum + "&nbsp;名会员");

            //设置分页
            if (applyNum > 0) {
                pageNum = Math.ceil(applyNum / itemsNumberPerPage);
            }
            if (currentPage == 1) {
                $("ul.pagination li:eq(1)").attr("class", "disabled");
            }

            if (currentPage == pageNum) {
                $("ul.pagination li:last").attr("class", "disabled");
            }

            for (var i = 1; i <= pageNum; i++) {

                if (i == currentPage) {
                    $("ul.pagination li:eq(-2)").after(
                        "<li class='active' onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                    );
                } else {
                    $("ul.pagination li:eq(-2)").after(
                        "<li onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                    );
                }

            } //end-for


            //显示会员表格的内容
            if (applyNum == 0) {
                $("#cu-apply-table").find("tbody>tr>td").html("暂时没有会员");
            } else {
                var html = "";
                for (var item in result.applyInfo) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['username'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['password'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['balance'] + "</td>" +
                        "<td><button class='glyphicon glyphicon-list-alt' onclick='deleteUser(" + item + ")'  " +
                        "></button></td>" +
                        "<td><button class='glyphicon glyphicon-list-alt' onclick='detailUser(" + item + ")'  " +
                        "data-toggle='modal' data-target='#myModal'></button></td>" +
                        "</tr>";
                }

                $("#cu-apply-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
}

function goPage(page) {
    location.href = "/Admin/users.html?p=" + page;
}

function prevPage() {
    var page = Math.max(currentPage - 1, 1);
    location.href = "/Admin/users.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, currentPage + 1);
    location.href = "/Admin/users.html?p=" + page;
}

//根据会员id，删除会员
function deleteUser(id) {
    $("#user_id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/users.delete.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            if (data == 1) {
                location.href = "/Admin/users.html";
            }
        }
    })
}

//根据会员id，获取会员的信息
function detailUser(id) {

    $("#user_id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/users.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "";
            for (var item in result.detail) {
                if (item == "id") {
                    html += "<tr>" +
                        "<td>会员ID</td>" +
                        "<td>" + result.detail['id'] + "</td>" +
                        "</tr>";
                } else if (item == "username") {
                    html += "<tr>" +
                        "<td>会员名</td>" +
                        "<td><input class='input' name='username' type='text' value='" + result.detail['username'] + "'/></td>" +
                        "</tr>";
                } else if (item == "password") {
                    html += "<tr>" +
                        "<td>密码</td>" +
                        "<td>" +
                        "<input class='input' name='password' type='password' value='" + result.detail['password'] + "'>" +
                        "</td>" +
                        "</tr>";
                }
                else if (item == "balance") {
                    html += "<tr>" +
                        "<td>余额</td>" +
                        "<td>" +
                        "<input class='input' name='balance' type='text' value='" + result.detail['balance'] + "'/>" +
                        "</td>" +
                        "</tr>";
                }
            }
            $("#cu-apply-detail-table").find("tbody").html(html);
        }
    })
}

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

