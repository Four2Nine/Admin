/**
 * Created by Lishuai on 2016/10/30.
 */

$(document).ready(function () {
    $.ajax({
        url: "/Admin/controller/slider.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            //alert(result);
            for (var count = 1; count < 4; count++) {
                $(".media:eq(" + count + ")>a>img").attr("src", "/theACP/images/slider/" + result.sliderInfo[count].img_path);
                $(".media-heading:eq(" + (count - 1) + ")").html(result.sliderInfo[count].title);
                $(".media-body:eq(" + (count - 1) + ")>p").html(result.sliderInfo[count].subtitle);  //这个函数有问题

                //在""中的变量要用字符拼接的形式完成，加减操作在括号中完成
            }

        }
    })
});
$("#model-form").submit(function (event) {

    event.preventDefault();
    var $form = $(this);
    var file = $('#exampleInputFile').prop('files')[0];
    //传一个就是取值
    var form_data = new FormData();
    form_data.append('slider_id', $('#slider-id').val());   //可能有问题
    form_data.append('title', $('#title').val());
    form_data.append('subtitle', $('#subtitle').val());
    form_data.append('picture',file);
    var title = $("#title").val();
    var subtitle = $("#subtitle").val();

    if(checkempty(title)){
        return false;
    }
    if(checkempty(subtitle)){
        return false;
    }
    if(!checkimg()){
        return false;
    }

    $.ajax({
        url: "/Admin/controller/slider.update.con.php",
        type: "post",
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data:form_data,
        success: function (data) {
            //alert("添加成功");
            location.href = "/Admin/slider.html"
        },
        complete: function () {
            $inputs.prop("disabled", false);
        }
    });
});


//进行upload检测

// $("#model-form").submit(function (event) {
//     event.preventDefault();
//     var $form = $(this);
//     var serializedData = $form.serialize();
//
//     var title = $("#title").val();
//     var subtitle = $("#subtitle").val();
//     var pic = $("#exampleInputFile").val();
//
//
//     if(checkempty(title)){
//         return false;
//     }
//     if(checkempty(subtitle)){
//         return false;
//     }
//     if(!checkimg()){
//         return false;
//     }
//
//     var data = {slider_id:$("#slider-id").val(), title:title, subtitle:subtitle,pictures:pic};
//
//
//     $.ajax({
//         url: "/Admin/controller/slider.update.con.php",
//         type: "post",
//         data: data,
//         success: function (data) {
//
//             var result = JSON.parse(data);
//             location.href = "/Admin/slider.html";
//         }
//     });
// });


//选择具体的模态框
function loadModal(id) {
    $("#slider-id").attr("value", id);
}

//检查图片格式
function checkimg() {
    var text = $("#");
    var picture = $("#exampleInputFile").val();
    var patt = (/\.jpg$|\.jpeg$|\.gif$|\.png$/i);
    if (picture == "") {
        alert('提交内容不能为空');
        return false;
    }
    if (!patt.test(picture)) {
        alert('请提交正确的图片');
        return false;
    }
    return true;
}
function checkempty(text) {
    if (text == "") {
        alert('标题/副标题不能为空');
        return true;
    }
    return false;
}
