(function ($) {

    'use strict';

    function getAllData() {
        $.ajax({
            type: "POST",
            url: "https://trackyourcamper.com:3001/api/getAllData",
            success: function(data)
            {
                console.log(data);
                var html_str = "";
                jQuery.each(data, function( i, tenant ) {
                    html_str += '<div class="col-lg-3 col-md-4 col-sm-6">';
                    html_str +=     '<div class="card">';
                    html_str +=         '<div class="upper"></div>';
                    html_str +=         '<div class="user text-center">';
                    html_str +=             '<div class="profile">';
                    html_str +=                 '<img src="https://trackyourcamper.com:3001/images/'+tenant.selfie+'" class="rounded-circle" width="80">';
                    html_str +=             '</div>';
                    html_str +=         '</div>';
                    html_str +=         '<div class="mt-5">';
                    html_str +=             '<h4 class="mb-0 text-center">Benjamin Tims</h4>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">'+tenant.email+'</span>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">'+tenant.phone+'</span>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">'+tenant.address+'</span>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">Move in Date: '+tenant.move_date+'</span>';
                    html_str +=                 '<div class="d-flex justify-content-between px-2 mb-2 mt-4">';
                    html_str +=                     '<button class="btn btn-primary btn-sm btn-detail">View in Detail</button>';
                    if(tenant.approval_status==0){
                        html_str +=                 '<input type="checkbox" data-size="sm" data-toggle="toggle" data-on="Approved" data-off="Pending" data-onstyle="success" data-offstyle="danger">';
                    }else {
                        html_str +=                 '<input type="checkbox" data-size="sm" checked data-toggle="toggle" data-on="Approved" data-off="Pending" data-onstyle="success" data-offstyle="danger">';
                    }
                    html_str +=                 '</div>';
                    html_str +=             '</div>';
                    html_str +=         '</div>';
                    html_str +=     '</div>';
                    html_str += '</div>';
                });
                $('#data_panel').html(html_str);
                $('input[type="checkbox"]').bootstrapToggle();
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
            getAllData();
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
