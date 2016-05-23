$(document).ready(function() {
    var $hamburger = $('#hamburger');
    var $lineTop = $('.top');
    var $lineMiddle = $('.middle');
    var $lineBottom = $('.bottom');
    var $navBox = $('#navBox');
    var $navList = $('#navList');
    var $navListItem = $('#navList > li');
    var $navListLink = $('#navList > li > a');
    
    $hamburger.click(function() {
        $hamburger.toggleClass('hamburger');
        $lineTop.toggleClass('active');
        $lineMiddle.toggleClass('active');
        $lineBottom.toggleClass('active');
        $navBox.toggleClass('active');
        $navList.toggleClass('active');
    });
    
    $navListItem.hover(function() {
        if ($(this).children().hasClass('active')) {
            
            $(this).next().removeClass('hover'); //show subtext
            $(this).children().removeClass('hover'); //change opacity on hovered li
            
        } else {
       
            $(this).next().toggleClass('hover'); //show subtext
            $(this).children().toggleClass('hover'); //change opacity on hovered li
        }
        
    });
    
    $navListLink.click(function(event) {
        var $activeLi = $('#navList > li > a.active');
        var $hrNav = $('#hrNav');
        //event.preventDefault();
        $(this).parent().next().removeClass('hover');
        $activeLi.toggleClass('active'); //remove active class from prev active li
        $hrNav.remove(); //remove all nav hr's
        $(this).toggleClass('active'); //set active class on link
        $(this).parent().append('<hr id="hrNav">'); //append hr below parent li
    });  
    

})