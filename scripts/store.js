$(document).ready(function() { 

    $('.signupCTA').delay(1000).animate({
        'margin-top': 0,
        opacity: 1
    }, 600, function() {
        $('.notifyUser').animate({
            opacity: 1,
            marginLeft: 0
        }, 600);
    });
    
   
    
    // disable submit button as default
    $('#subscribeSubmit').prop('disabled', true);
    
    //Hide submit msg
    $('#subscribeSubmitMsg').hide();
    
    //Hide hints
    $('.hint').hide();
    
 

    //toggle class focus of the label if input has value
    $('#subscribeEmail').focus(function() {
        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        
        if (isChrome) {
            $('#subscribeEmail').attr('autocomplete', 'off');
        }
        
        $('#subscribeSubmitMsg').hide();
         if ($(this).val().length === 0) {
            $(this).prev().toggleClass('focus');
         }
    });
    
    //blur function
    $('#subscribeEmail').blur(function() {
    
        if ($(this).val().length !== 0) {
            
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                if (filter.test($(this).val())) {
                    $(this).next().hide();
                    $('#subscribeSubmit').prop('disabled', false);
                } else {
                    $(this).next().show();
                }
            
        } else {
            $(this).next().show();
            $(this).prev().toggleClass('focus');
            $('#subscribeSubmit').prop('disabled', true);
        }
    });

 
   
    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#subscribeForm").submit(function(event){

        // Prevent default posting of form
        event.preventDefault();

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $subscribeForm = $(this);


        // Let's select and cache all the fields
        var $subInputs = $subscribeForm.find("input");

        // Serialize the data in the form
        var serialData = $subscribeForm.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $subInputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwvmyhi1P24Afnz4NrHxzPy87-VuV_8RpA5Ckp7qhdL5afXcqM/exec",
            method: "post",
            data: serialData,
            dataType: "html",
//            success: function (response, textStatus, jqXHR){
//
//                var successMsg = '<p class="large">';
//                successMsg += 'Thank you for subscribing!';
//
//
//                $('#subscribeSubmitMsg').show();
//                $('#subscribeSubmitMsg').html(successMsg);
//
//            },
//            error: function (jqXHR, textStatus, errorThrown){
//
//                var failMsg = '<p class="large">';
//                failMsg += 'Something went wrong when submitting your form.';
//                failMsg += '<br>';
//                failMsg += 'Please try again.';
//                failMsg += '</p>';
//
//                $('#subscribeSubmitMsg').show();
//                $('#subscribeSubmitMsg').html(failMsg);
//            },
            complete: function () {
            // Reenable the inputs
                $subInputs.prop("disabled", false);
                var successMsg = '<p class="large">';
                successMsg += 'Thank you for subscribing!';


                $('#subscribeSubmitMsg').show();
                $('#subscribeSubmitMsg').html(successMsg);
            }
        });

    })
    
    
});//end document ready function