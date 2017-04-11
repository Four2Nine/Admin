/**
 * Created by liuyang on 2017/3/27.
 */

var limmitSize = 5242880;

var id = getQueryString("id");
if (id == null) {
    showNotification(
        "alert-danger",
        errorCode2errorInfo(REQUIRED_ID),
        "top",
        "center", "", "");

    setTimeout(function () {
        location.href = "dashboard.html";
    }, 1000);
}

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
            $("#logo-img-prev").prop("src", "../images/service/" + result['company_logo']);
            $("#banner-img-prev").prop("src", "../images/service/" + result['banner_image']);
            $("#detail-img-prev").prop("src", "../images/service/" + result['service_detail_image']);
        }
    })
}

$("#service-basic__form").submit(function (event) {

    event.preventDefault();
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");

    var serializedData = $form.serialize();

    $inputs.prop("disabled", true);

    var name = $("#company-name");
    var url = $("#company-website");
    var contact = $("#contact-name");
    var phone = $("#contact-phone-number");
    var email = $("#contact-email");

    if (checkEmpty(name)) {
        name.parents('.form-line').addClass('error');
        $("#company-name-error").html("不能为空");
        $inputs.prop("disabled", false);
        return false;
    }
    if (checkEmpty(url)) {
        url.parents('.form-line').addClass('error');
        $("#company-website-error").html("不能为空");
        $inputs.prop("disabled", false);
        return false;
    }
    if (checkEmpty(contact)) {
        contact.parents('.form-line').addClass('error');
        $("#contact-name-error").html("不能为空");
        $inputs.prop("disabled", false);
        return false;
    }
    if (checkEmpty(phone)) {
        phone.parents('.form-line').addClass('error');
        $("#contact-phone-number-error").html("不能为空");
        $inputs.prop("disabled", false);
        return false;
    }
    if (checkEmpty(email)) {
        email.parents('.form-line').addClass('error');
        $("#contact-email-error").html("不能为空");
        $inputs.prop("disabled", false);
        return false;
    }

    $(".form-control").parents(".form-line").remove('error');
    $(".error").html("");

    $.ajax({
        url: "/admin/controller/service.update.base.con.php",
        type: "post",
        data: serializedData,
        success: function (data) {
            $inputs.prop("disabled", false);
            if (data == 1) {
                showNotification(
                    "alert-success",
                    "修改成功",
                    "top", "right",
                    "animated fadeInRight", "animated fadeOutRight");
                getCompleteInfo(id);
            } else {
                showNotification(
                    "alert-danger",
                    "修改失败",
                    "top", "right",
                    "animated fadeInRight", "animated fadeOutRight");
            }
        }
    })
});

$("#service-advance__form").submit(function (event) {
    event.preventDefault();
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");

    $inputs.prop("disabled", true);

    var logo_img = $("#logo");
    var city = $("#service-city");
    var type = $("#service-type");
    var industry = $("#industry");
    var price = $("#service-price");
    var banner_img = $("#banner-image");
    var banner_text = $("#banner-text");
    var detail_img = $("#service-detail-image");
    var additional = $("#additional");

    var form_data = new FormData();

    var logo_img__file = logo_img.prop("files")[0];
    var banner_img__file = banner_img.prop("files")[0];
    var detail_img__file = detail_img.prop("files")[0];

    if (logo_img__file == undefined) {
        form_data.append('logo-flag', 0);
    } else if (logo_img__file.size > limmitSize) {
        $("#logo-error").html("图片不能大于5MB");
        $inputs.prop("disabled", false);

        logo_img.parents('.form-line').addClass('error');
        return false;
    } else {
        form_data.append('logo-flag', 1);
        form_data.append('logo', logo_img__file);
    }

    if (banner_img__file == undefined) {
        form_data.append('banner-flag', 0);
    } else if (banner_img__file.size > limmitSize) {
        $("#banner-image-error").html("图片不能大于5MB");
        $inputs.prop("disabled", false);
        banner_img.parents('.form-line').addClass('error');

        return false;
    } else {
        form_data.append('banner-flag', 1);
        form_data.append('banner-image', banner_img__file);
    }

    if (detail_img__file == undefined) {
        form_data.append('detail-flag', 0);
    } else if (detail_img__file.size > limmitSize) {
        $("#service-detail-image-error").html("图片不能大于5MB");
        $inputs.prop("disabled", false);
        detail_img.parents('.form-line').addClass('error');

        return false;
    } else {
        form_data.append('detail-flag', 1);
        form_data.append('detail-img', detail_img__file);
    }

    form_data.append('id', $("#id").val());
    form_data.append('service-city', city.val());
    form_data.append('service-type', type.val());
    form_data.append('industry', industry.val());
    form_data.append('price', price.val());
    form_data.append('banner_text', banner_text.val());
    form_data.append('additional', additional.val());

    $.ajax({
        url: "/admin/controller/service.update.advance.con.php",
        type: "post",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (data) {
            $inputs.prop("disabled", false);
            if (data == 1) {
                showNotification(
                    "alert-success",
                    "修改成功",
                    "top", "right",
                    "animated fadeInRight", "animated fadeOutRight");
                getCompleteInfo(id);
            } else {
                showNotification(
                    "alert-danger",
                    "修改失败",
                    "top", "right",
                    "animated fadeInRight", "animated fadeOutRight");
            }
        }
    })
});