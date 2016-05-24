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

});//end document ready function