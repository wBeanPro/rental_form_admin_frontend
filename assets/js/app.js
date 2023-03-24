(function ($) {

    'use strict';

    function getAllData() {
        $.ajax({
            type: "POST",
            url: "https://trackyourcamper.com:3001/api/getAllData",
            success: function(data)
            {
                console.log(data);
                // sessionStorage.setItem("login_status", true);
                // $('#login_part').hide();
                // $('#main_part').show();
            }
        });
    }

    function init() {
        let login_status = sessionStorage.getItem("login_status");
        if(!login_status) {
            $('#main_part').hide();
            $('#login_part').show();
        }else {
            $('#main_part').show();
            $('#login_part').hide();
        }
        $('.btn-detail').click(function(){
            $('#detail_form').modal();
        });  
        $("#admin_login").submit(function(e) {
            e.preventDefault(); 
            var form = $(this);
            $.ajax({
                type: "POST",
                url: "https://trackyourcamper.com:3001/api/login",
                data: form.serialize(), // serializes the form's elements.
                success: function(data)
                {
                    sessionStorage.setItem("login_status", true);
                    $('#login_part').hide();
                    $('#main_part').show();
                    getAllData();
                }
            });
        });
    }
    init();

})(jQuery)
