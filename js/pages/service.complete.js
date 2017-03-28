/**
 * Created by liuyang on 2017/3/27.
 */

var id = getQueryString("id");

//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getCompleteInfo(id);
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getCompleteInfo(id) {
    $.ajax({
        url: "/admin/controller/service.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            $("input[name=id]").val(id);
            $("input[name=company-name]").val(result['company_name']);
            $("input[name=company-website]").val(result['company_website']);
            $("input[name=contact-name]").val(result['contact_name']);
            $("input[name=contact-phone-number]").val(result['contact_phone_number']);
            $("input[name=contact-email]").val(result['contact_email']);
            $("input[name=service-city]").val(result['service_city']);
            $("input[name=service-type]").val(result['service_type']);
            $("input[name=industry]").val(result['industry']);
            $("input[name=service-price]").val(result['service_price']);
            $("input[name=banner-text]").val(result['banner_text']);
            $("textarea[name=additional]").val(result['additional']);
        }
    })
}