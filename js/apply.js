/**
 * Created by liuyang on 2016/10/28.
 */

var itemsNumberPerPage = 30;
var pageNum = 1;
var currentPage = getQueryString("p");

if (currentPage == null || currentPage.toString().length < 1) {
    currentPage = 1;
}

$( "#start-date" ).datepicker();

$(document).ready(function () {
    $.ajax({
        url: "/Admin/controller/apply.con.php",
        type: "get",
        data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);
            var applyNum = result.applyNum;

            //设置分页
            if(applyNum > 0 ){
                pageNum = Math.ceil(applyNum/itemsNumberPerPage);
            }
            if (currentPage == 1) {
                $("ul.pagination li:first").attr("class", "disabled");
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


            //显示报名表格的内容
            if (applyNum == 0) {
                $("table tbody>tr>td").html("暂时没有报名表");
            } else {
                var html = "";
                for (var item in result.applyInfo) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['project_id'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['name'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['phone_number'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['email'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['wechat'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['status'] + "</td>" +
                        "<td><span class='glyphicon glyphicon-list-alt'></span></td>" +
                        "</tr>";
                }

                $("table tbody").html(html).fadeIn(300);
            }

        }
    });
});

function goPage(page) {
    location.href = "/Admin/apply.html?p=" + page;
}

function prevPage() {
    var page = Math.max(currentPage - 1, 1);
    location.href = "/Admin/apply.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, currentPage + 1);
    location.href = "/Admin/apply.html?p=" + page;
}