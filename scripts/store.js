$(document).ready(function() { 

    $('.signupCTA').delay(1000).animate({
        opacity: 1
    }, 400, function() {
        $('.notifyUser').animate({
            opacity: 1,
            marginLeft: 0
        }, 600);
    });

});//end document ready function