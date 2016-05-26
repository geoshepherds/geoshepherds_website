$(document).ready(function() {

    //check for window width on load
    svgSizing();

    //check for window width to display correct g on resize
    $(window).resize(function() {
        svgSizing();        
    });

    function svgSizing() {
        if ($(window).width() > 992) {
            $('div#svgDesktop').show();
            $('div#svgMobile').hide();
            $('div#svgTablet').hide();  

            animateProcess('D');
        } else if ($(window).width() < 993 && $(window).width() > 800) {
            $('div#svgDesktop').hide();
            $('div#svgMobile').hide();
            $('div#svgTablet').show();

            animateProcess('T');
        } else if ($(window).width() <= 800) {
            $('div#svgDesktop').hide();  
            $('div#svgTablet').hide();        
            $('div#svgMobile').show(); 

            animateProcess('M');
        }
    }



    function animateProcess(view) {


        // Main page
        var $servicesArea = $('#services');
        var $servicesHead = $('#serviceHead');
        var $processHead = $('#processHead');

        var $circleOne = $('#circleOne' + view);
        var $circleTwo = $('#circleTwo' + view);
        var $circleThree = $('#circleThree' + view);
        var $circleFour = $('#circleFour' + view);
        var $circleFive = $('#circleFive' + view);
        var $lineOne = $('#lineOne' + view);
        var $lineTwo = $('#lineTwo' + view);
        var $lineThree = $('#lineThree' + view);
        var $lineFour = $('#lineFour' + view);

        var $research = $('#research');
        var $researchHead = $('#research > h3');
        var $researchSub = $('#research > h6');
        var $researchText = $('#research > p');
        var $data = $('#data');
        var $dataHead = $('#data > h3');
        var $dataSub = $('#data > h6');
        var $dataText = $('#data > p');
        var $concept = $('#concept');
        var $conceptHead = $('#concept > h3');
        var $conceptSub = $('#concept > h6');
        var $conceptText = $('#concept > p');    
        var $development = $('#development');
        var $developmentHead = $('#development > h3');
        var $developmentSub = $('#development > h6');
        var $developmentText = $('#development > p');  
        var $delivery = $('#delivery');
        var $deliveryHead = $('#delivery > h3');
        var $deliverySub = $('#delivery > h6');
        var $deliveryText = $('#delivery > p')






        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
            //return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
            return (elemBottom <= docViewTop);
        }  


        function showElement(myelement, mycontent) {

            $(window).scroll(function() {
                if(isScrolledIntoView(myelement)) {
                    mycontent.addClass('draw');
                } else {
                    //mycontent.removeClass('draw');
                }        
            });
        }

        function showLine(myelement, myline) {

            $(window).scroll(function() {
                if(isScrolledIntoView(myelement)) {
                    myline.addClass('draw');
                }
                else {
                    //myline.removeClass('draw');                
                }        
            });
        }



        showElement($servicesHead, $circleOne);
        showElement($servicesHead, $researchHead);
        showElement($servicesHead, $researchSub);
        showElement($servicesHead, $researchText);
        showLine($servicesArea, $lineOne);
        showElement($servicesArea, $circleTwo);
        showElement($servicesArea, $dataHead);
        showElement($servicesArea, $dataSub);
        showElement($servicesArea, $dataText);
        showLine($processHead, $lineTwo);
        showElement($processHead, $circleThree);
        showElement($processHead, $conceptHead);
        showElement($processHead, $conceptSub);
        showElement($processHead, $conceptText);
        showLine($research, $lineThree);
        showElement($research, $circleFour);
        showElement($research, $developmentHead);
        showElement($research, $developmentSub);
        showElement($research, $developmentText);
        showLine($data, $lineFour);
        showElement($data, $circleFive);
        showElement($data, $deliveryHead);
        showElement($data, $deliverySub);
        showElement($data, $deliveryText);

    }   //end animate process


});

