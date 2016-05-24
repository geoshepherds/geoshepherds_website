$(document).ready(function() {
    
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

}); //end all