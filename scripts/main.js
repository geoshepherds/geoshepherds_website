$(document).ready(function() {
    
    
    $('.uiNav').delay(400).animate({
        bottom: '10px',
        opacity: 1
    }, 600);
    
/*--------------------------------------------------------------------------
------------------------     HOME PAGE      -------------------------------
--------------------------------------------------------------------------*/    
    
    
    
    
/*--------------------------------------------------------------------------
------------------------     NAVIGATION      -------------------------------
--------------------------------------------------------------------------*/
    var $hamburger = $('#hamburger');
    var $lineTop = $('.top');
    var $lineMiddle = $('.middle');
    var $lineBottom = $('.bottom');
    var $navBox = $('#navBox');
    var $navList = $('#navList');
    var $navListItem = $('#navList > ul > li');
    var $navListLink = $('#navList > ul > li > a');
    
    $hamburger.click(function() {
        $hamburger.toggleClass('hamburger');
        $lineTop.toggleClass('active');
        $lineMiddle.toggleClass('active');
        $lineBottom.toggleClass('active');
        $navBox.toggleClass('active');
        $navList.toggleClass('active');
    });
    
    $navListItem
        .mouseenter(function() {
        if (!$(this).children('a').hasClass('active')) {
            $(this).children('a').css('color', '#fff');
            $(this).children().children('span').delay(100).animate({
                margin: '0px',
                opacity: 1
            }, 300); //show subtext
        }
    })
        .mouseleave(function() {
        if (!$(this).children('a').hasClass('active')) {
            $(this).children('a').css('color', 'rgba(255,255,255,0.7)');
            
            $(this).children().children('span').animate({
                margin: '-23px'
            }, {
                duration: 300,
                queue: false
            })
                .animate({
                opacity: 0
            }, {
                duration: 180
            }); //hide subtext
        } 
    }); //and navlist item hover
    
/*--------------------------------------------------------------------------
------------------------     ABOUT      -------------------------------
--------------------------------------------------------------------------*/    


    var windowTop = 0;   
    
    $(window).scroll(function (event) {
        $('.uiAbout').fadeOut(200);
        windowTop = $(this).scrollTop();
        if (windowTop >= 800) {
            $('.aboutHeader').addClass('fixed');
        } else {
            $('.aboutHeader').removeClass('fixed');
        }
    });
    
    $('.uiAbout').delay(600).animate({
        opacity: 1,
        bottom: '10px'
    }, 600);
    
    
    
    
   
    //  PROFILE PICS LOOP  //

    var positionAngie = 0;
    var positionOwain = 0;
    
    function changeImg(id) {
        
        if(id == '#angie') {
            if(positionAngie === 100) {
                positionAngie = -50;
            }
            positionAngie += 50;
            $(id).css('background-position', positionAngie + '%');
        }
        
        if(id == '#owain') {
            if(positionOwain === 100) {
                positionOwain = -50;
            }
            positionOwain += 50;
            $(id).css('background-position', positionOwain + '%');
        }
    }
    
    (function owainLoop() {
        var rand = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;
        setTimeout(function() {
            changeImg('#owain');
            owainLoop();  
        }, rand);
    }());
    
    (function angieLoop() {
        var rand = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;
        setTimeout(function() {
            changeImg('#angie');
            angieLoop();  
        }, rand);
    }());  
    
    
/*--------------------------------------------------------------------------
------------------------  INDIVIDUAL PROJECTS    ---------------------------
--------------------------------------------------------------------------*/ 
    //remove threejs function on mobile
    if ($(window).width() < 501) {
        
        $('#l8mThreeJS').hide();
    }
    
}); //end all