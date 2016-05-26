$(document).ready(function() {
    
  
    
    // Main page
    var $servicesArea = $('#services');
    var $servicesHead = $('#serviceHead');
    var $processHead = $('#processHead');
    var $circleOne = $('#circleOne');
    var $circleTwo = $('#circleTwo');
    var $circleThree = $('#circleThree');
    var $circleFour = $('#circleFour');
    var $circleFive = $('#circleFive');
    var $lineOne = $('#lineOne');
    var $lineTwo = $('#lineTwo');
    var $lineThree = $('#lineThree');
    var $lineFour = $('#lineFour');
    var $research = $('#research');
    var $researchHead = $('#research > h3');
    var $researchSub = $('#research > h5');
    var $researchText = $('#research > p');
    var $data = $('#data');
    var $dataHead = $('#data > h3');
    var $dataSub = $('#data > h5');
    var $dataText = $('#data > p');
    var $concept = $('#concept');
    var $conceptHead = $('#concept > h3');
    var $conceptSub = $('#concept > h5');
    var $conceptText = $('#concept > p');    
    var $development = $('#development');
    var $developmentHead = $('#development > h3');
    var $developmentSub = $('#development > h5');
    var $developmentText = $('#development > p');  
    var $delivery = $('#delivery');
    var $deliveryHead = $('#delivery > h3');
    var $deliverySub = $('#delivery > h5');
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
    
    
    
    
   
});