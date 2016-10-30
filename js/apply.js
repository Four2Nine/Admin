/**
 * Created by liuyang on 2016/10/28.
 */

var pageNum = 1;
var itemNum = 10;

$(document).ready(function () {

    $.ajax({
        url: "/admin/controller/apply.con.php",
        type: "get",
        data: {currentPage: 1},
        success: function (data) {
            var result = JSON.parse(data);

            pageNum = Math.ceil(result.pageNum/itemNum);
            currentPage = result.currentPage;
            if (currentPage != 1) {
                $(".previous").attr("class", "previous");
            } else {
                $(".previous").attr("class", "previous disabled");
            }
            if (currentPage != pageNum) {
                $(".next").attr("class", "next");
            } else {
                $(".next").attr("class", "next disabled");
            }
            $("#current-page-slash-all-page").find("a").html(currentPage+"/"+pageNum);

            if (result.apply_info_status != CORRECT) {

            } else {
                if (result.apply_info.length == 0) {
                    $("table tbody>tr>td").html("暂时没有报名表");
                } else {
                    var html = "";
                    for (var item in result.apply_info) {
                        html += "<tr>" +
                            "<td>" + item + "</td>" +
                            "<td>" + result.apply_info[item + ""]['project_id'] + "</td>" +
                            "<td>" + result.apply_info[item + ""]['name'] + "</td>" +
                            "<td>" + result.apply_info[item + ""]['phone_number'] + "</td>" +
                            "<td>" + result.apply_info[item + ""]['email'] + "</td>" +
                            "<td>" + result.apply_info[item + ""]['wechat'] + "</td>" +
                            "<td>" + result.apply_info[item + ""]['status'] + "</td>" +
                            "<td><span class='glyphicon glyphicon-list-alt'></span></td>" +
                            "</tr>";
                    }

                    $("table tbody").html(html).fadeIn(300);
                }
            }
        }
    });
});