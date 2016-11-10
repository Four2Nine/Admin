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

                getPagerAndProjectList();

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


$("#project-form").submit(function (event) {

    event.preventDefault();

    var $form = $(this);
    var id = $("#project_id").attr("value");
    var serializedData = $form.serialize();
    if (id == "") return false;
    $.ajax({
        url: "/Admin/controller/project.update.con.php",
        data: serializedData,
        type: "post",
        success: function (data) {
            if (data == 1) {
                location.href = "/Admin/project.html";
            }
        }
    });
});

function getPagerAndProjectList() {
    $.ajax({
        url: "/Admin/controller/project.con.php",
        type: "get",
        data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);
            var projectNum = result.number;
            $("#cu-project-num").html("&nbsp;" + projectNum + "&nbsp;个项目");

            //设置分页
            if (projectNum > 0) {
                pageNum = Math.ceil(projectNum / itemsNumberPerPage);
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


            //显示项目表格的内容
            if (projectNum == 0) {
                $("#cu-project-table").find("tbody>tr>td").html("暂时没有项目");
            } else {
                var html = "";
                for (var item in result.info) {
                    html += "<tr>" +
                        "<th>" + item + "</th>" +
                        "<th>" + result.info[item + ""]['name'] + "</th>" +
                        "<th>" + result.info[item + ""]['city'] + "</th>" +
                        "<th>" + result.info[item + ""]['date'] + "</th>" +
                        "<th>" + result.info[item + ""]['day'] + "</th>" +
                        "<th>" + result.info[item + ""]['pushDate'] + "</th>" +
                        "<th><button class='glyphicon glyphicon-list-alt' onclick='deleteProject(" + item + ")'  " +
                        "></button></th>" +
                        "<th><button class='glyphicon glyphicon-list-alt' onclick='detailProject(" + item + ")'  " +
                        "data-toggle='modal' data-target='#myModal'></button></th>" +
                        "</tr>";
                }

                $("#cu-project-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
}

function goPage(page) {
    location.href = "/Admin/project.html?p=" + page;
}

function prevPage() {
    var page = Math.max(currentPage - 1, 1);
    location.href = "/Admin/project.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, currentPage + 1);
    location.href = "/Admin/project.html?p=" + page;
}

//根据项目id，删除指定项目
function deleteProject(id) {

    $("#project_id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/project.delete.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            if (data == 1) {
                location.href = "/Admin/project.html";
            }
        }
    });
}

// 根据项目id，获取项目的详细信息
function detailProject(id) {
    $("#project_id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/project.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "";
            for (var item in result.detail) {
                if (item == "id") {
                    html += "<tr>" +
                        "<td>项目ID</td>" +
                        "<td>" + result.detail['id'] + "</td>" +
                        "</tr>";
                } else if (item == "acpname") {
                    html += "<tr>" +
                        "<td>项目名称</td>" +
                        "<td>" +
                        "<input class='input' type='text' value='" + result.detail['acpname'] + "' readonly>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpcity") {
                    html += "<tr>" +
                        "<td>城市</td>" +
                        "<td>" +
                        "<input class='input' name='acpcity' type='text' value='" + result.detail['acpcity'] + "'>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpdate") {
                    html += "<tr>" +
                        "<td>出发时间</td>" +
                        "<td>" +
                        "<input class='input' name='acpdate' type='text' value='" + result.detail['acpdate'] + "'>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpday") {
                    html += "<tr>" +
                        "<td>行程天数</td>" +
                        "<td>" +
                        "<input class='input' name='acpday' type='number' value='" + result.detail['acpday'] + "'>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acptheme") {
                    html += "<tr>" +
                        "<td>行程主题</td>" +
                        "<td><textarea class='input' name='acptheme'>" + result.detail['acptheme'] + "</textarea>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpbright") {
                    html += "<tr>" +
                        "<td>行程亮点</td>" +
                        "<td>" +
                        "<textarea class='input' name='acpbright'>" + result.detail['acpbright'] + "</textarea>" +
                        "</td>" +
                        "</tr>";
                }//end-if
            }//end-for

            $("#cu-project-detail-table").find("tbody").html(html);
        }//end-success
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

