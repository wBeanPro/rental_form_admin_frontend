var tenants_information;
(function ($) {

    'use strict';

    function getAllData() {
        $.ajax({
            type: "POST",
            url: "https://trackyourcamper.com:3001/api/getAllData",
            success: function(data)
            {
                console.log(data);
                tenants_information = data;
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
                    html_str +=         '<div class="tenant_id">#'+tenant.id+'</div>';
                    html_str +=         '<div class="mt-5">';
                    html_str +=             '<h4 class="mb-0 text-center">'+tenant.name+'</h4>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">'+tenant.email+'</span>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">'+tenant.phone+'</span>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">'+tenant.address+'</span>';
                    html_str +=                 '<span class="text-muted d-block mt-2 mb-2 pl-2">Move in Date: '+tenant.move_date+'</span>';
                    html_str +=                 '<div class="d-flex justify-content-between px-2 mb-2 mt-4">';
                    html_str +=                     '<button class="btn btn-primary btn-sm btn-detail" tenant_index="'+i+'">View in Detail</button>';
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
                $('.btn-detail').click(function(){
                    let index = $(this).attr('tenant_index');
                    let tenant_info = tenants_information[index];
                    $('#tenant_name').html(tenant_info.name);
                    $('#tenant_email').html(tenant_info.email);
                    $('#tenant_phone').html(tenant_info.phone);
                    $('#tenant_move_date').html(tenant_info.move_date);
                    $('#tenant_address').html(tenant_info.address);
                    $('#tenant_num_applicants').html(tenant_info.num_applicants);
                    $('#tenant_num_adults').html(tenant_info.num_adults);
                    $('#tenant_num_pets').html(tenant_info.num_pets);
                    $('#tenant_names_applicants').html(tenant_info.applicants_name);
                    $('#tenant_evictions').html(tenant_info.evictions);
                    $('#tenant_felony').html(tenant_info.felony);
                    $('#tenant_criminal').html(tenant_info.criminal);
                    $('#tenant_reson').html(tenant_info.reason_relocation);
                    $('#tenant_applicant_occupation').html(tenant_info.applicants_occupation);
                    $('#tenant_ssn').html(tenant_info.ss_number);
                    $('#tenant_payment').html(tenant_info.payment_method);
                    $('#tenant_card_num').html(tenant_info.card_number);
                    $('#tenant_expiry').html(tenant_info.expire_date);
                    $('#tenant_cvv').html(tenant_info.cvv);
                    $('#tenant_zipcode').html(tenant_info.zip_code);
                    $('#tenant_balance').html(tenant_info.balance);
                    $('#tenant_employ_status').html(tenant_info.current_employ_status);
                    $('#tenant_e_length').html(tenant_info.employment_length);
                    $('#tenant_employer').html(tenant_info.current_employer);
                    $('#tenant_occupation').html(tenant_info.occupation);
                    $('#tenant_salary').html(tenant_info.monthly_salary);
                    $('#tenant_front_card').attr('src', "https://trackyourcamper.com:3001/images/"+tenant_info.front_idcard);
                    $('#tenant_back_card').attr('src', "https://trackyourcamper.com:3001/images/"+tenant_info.back_idcard);
                    $('#tenant_selfie').attr('src', "https://trackyourcamper.com:3001/images/"+tenant_info.selfie);
                    $('#tenant_signature').attr('src', "https://trackyourcamper.com:3001/images/"+tenant_info.signature);
                    if(tenant_info.approval_status==0){
                        $('#modal_checkbox').bootstrapToggle('off')
                    }else $('#modal_checkbox').bootstrapToggle('on')
                    $('#detail_form').modal();
                });  
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
