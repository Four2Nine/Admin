
var itemsNumberPerPage = 30;
var pageNum = 1;
var currentPage = getQueryString("p");

if (currentPage == null || currentPage.toString().length < 1) {
    currentPage = 1;
}

var startDate = $("#start-date");
var endDate = $("#end-date");

startDate.datepicker({
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    dateFormat:"yy-mm-dd",
    autoSize: true
});
endDate.datepicker({
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    dateFormat:"yy-mm-dd",
    autoSize: true
});



$("#upda").click(function () {
    $("#upda-form").submit(function (event) {
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");
    var id = $("#project-id").attr("value");
    var serializedData = $form.serialize();
    if(id=="") return false;
    //alert(serializedData);
    $.ajax({
        url: "/Admin/controller/project.update.con.php",
        data: serializedData,
        type: "post",
        success: function (data) {
            alert(data);
            if (data == 1) {
                //alert("修改成功");
                location.href = "/Admin/dashboard.html";
            }
        }
    });
    })
});


$(document).ready(function () {
    $.ajax({
        url: "/Admin/controller/project.con.php",
        type: "get",
        data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);
            var applyNum = result.applyNum;
            $("#cu-apply-num").html("&nbsp;"+applyNum+"&nbsp;个项目");

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


            //显示项目表格的内容
            if (applyNum == 0) {
                $("#cu-apply-table").find("tbody>tr>td").html("暂时没有项目");
            } else {
                var html = "";
                for (var item in result.applyInfo) {
                    html += "<tr>" +
                        "<th>" + item + "</th>" +
                        "<th>" + result.applyInfo[item + ""]['acpname'] + "</th>" +
                        "<th>" + result.applyInfo[item + ""]['acpcity'] + "</th>" +
                        "<th>" + result.applyInfo[item + ""]['acpdate'] + "</th>" +
                        "<th>" + result.applyInfo[item + ""]['acpday'] + "</th>" +
                        "<th>" + result.applyInfo[item + ""]['acppushdate'] + "</th>" +
                        "<th><button class='glyphicon glyphicon-list-alt' onclick='deleDetail(" + item + ")'  " +
                        "></button></th>" +
                        "<th><button class='glyphicon glyphicon-list-alt' onclick='showDetail(" + item + ")'  " +
                        "data-toggle='modal' data-target='#myModal'></button></th>" +
                        "</tr>";
                }

                $("#cu-apply-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
});

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

function deleDetail(id) {
    $("#check_pass").hide();
    $("#check_refuse").hide();

    $("#project-id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/project.delete.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            if (data == 1) {
                alert("删除成功");
                location.href = "/Admin/project.html";
            }
            
            
        }
    })
}

// 根据报名表id，获取报名表的详细信息
function showDetail(id) {
    $("#check_pass").hide();
    $("#check_refuse").hide();

    $("#project-id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/project.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "";
            for (var item in result.projectDetail) {
                if (item == "id") {
                    html += "<tr>" +
                        "<td>项目ID</td>" +
                        "<td>" + result.projectDetail[item] + "</td>" +
                        "</tr>";
                } 
                /*else if (item == "acpname"){
                    html += "<tr>" +
                        "<td>项目名称</td>" +
                        "<td><input class='input w50' name='acpname' type='text' value=" + result.projectDetail[item] + 
                        "></td>"+
                        //"<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }*/
                else if (item == "acpname"){
                    html += "<tr>" +
                        "<td>项目名称</td>" +
                        "<td><textarea class='input' name='acpname' type='text'>" + result.projectDetail[item] + 
                        "</textarea></td>"+
                        //"<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }
               /* else if (item == "email"){
                    html += "<tr>" +
                        "<td>报名表时间</td>" +
                        "<td><input name='email' type='text' value=" + result.applyDetail[item] + 
                        "></td>"+
                        //"<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }*/
                else if (item == "acpcity"){
                    html += "<tr>" +
                        "<td>城市</td>" +
                        "<td><textarea class='input' name='acpcity' type='text'>" + result.projectDetail[item] + 
                        "</textarea></td>"+
                        "</tr>";
                }
                else if (item == "acpdate"){
                    html += "<tr>" +
                        "<td>出发时间</td>" +
                        "<td><textarea class='input' name='acpdate' type='text'>" + result.projectDetail[item] + 
                        "</textarea></td>"+
                        "</tr>";
                }
                else if (item == "acpday"){
                    html += "<tr>" +
                        "<td>行程天数</td>" +
                        "<td><textarea class='input' name='acpday' type='text'>" + result.projectDetail[item] + 
                        "</textarea></td>"+
                        "</tr>";
                }
                else if (item == "acptheme"){
                    html += "<tr>" +
                        "<td>行程主题</td>" +
                        "<td><textarea class='input' name='acptheme' type='text'>" + result.projectDetail[item] + 
                        "</textarea></td>"+
                        "</tr>";
                }
                else if (item == "acpbright"){
                    html += "<tr>" +
                        "<td>行程亮点</td>" +
                        "<td><textarea class='input' name='acpbright' type='text'>" + result.projectDetail[item] + 
                        "</textarea></td>"+
                        "</tr>";
                }


            }
            $("#cu-apply-detail-table").find("tbody").html(html);
        }
    })
}

