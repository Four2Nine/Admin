$(document).ready(function () {
    // Bind to the submit event of our form
    $("#additem-form").submit(function (event) {

        // setup some local variables
        event.preventDefault();
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        var form_data = new FormData();
        var files = $('#ff').prop('files');
        var file_num = files.length;

        for (var i = 0; i < file_num; i++) {
            form_data.append('pictures'+i, files[i]);
        }
        form_data.append('file_num', file_num);
        form_data.append('aname', $('#aname').val());
        form_data.append('acity', $('#acity').val());
        form_data.append('adate', $('#adate').val());
        form_data.append('aday', $('#aday').val());
        form_data.append('atheme', $('#atheme').val());
        form_data.append('abright', $('#abright').val());
        form_data.append('amean', $('#amean').val());
        form_data.append('adetail', $('#adetail').val());
        form_data.append('atip', $('#atip').val());


        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.

        //$inputs.prop("disabled", true);

        // Fire off the request to /form.php
        $.ajax({
            url: "/Admin/controller/additem.con.php",
            type: "post",
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {

                alert("添加成功");
                location.href = "/Admin/project.html"
                // var result = JSON.parse(data);
                //
                // if (result == CORRECT) {
                //     alert("OK");
                //     //location.href = "/Admin/addpro.html";
                // } else {
                //     alert("ERROR");
                //     //location.href = "/Admin/index.html";
                // }
            },
            complete: function () {
                $inputs.prop("disabled", false);
            }
        });


    });
});