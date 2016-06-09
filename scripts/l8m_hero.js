$('body').waitForImages({
            waitForAll: true,
            finished: function() {
                // Loaded all images referenced in CSS.
                $('#loader').fadeOut(800, function() {           
                    $('#pageContent').fadeIn(800, runL8M); 
                });
            }
        });


 
function runL8M() {

    $('.rgb').mousemove(function(e){

      var offs = $(this).offset(),
          p    = {x:offs.left, y:offs.top},
          mPos = {x:e.pageX, y:e.pageY},
          x    = mPos.x - p.x - 100,
          y    = mPos.y - p.y - 100;
        $('.false').show();
        $('.false', this).css({left:x, top:y, backgroundPosition: -x+'px '+-y+'px'});

    });

    $('#l8mTitle').mouseout(function(e) {
      $('.false').hide();

    });




    //jQuery Lightbox to show images

    //Problem: User when clicking on image goes to dead end poor user experience
    //Solution: Create overlay with the large image - Lightbox

    var $overlay = $('<div id="overlay"></div>');
    var $image = $("<img id='lightboxImg'>");
    var $caption = $("<p></p>");

    //Add image to overlay
    $overlay.append($image);

    //Add caption to overlay
    $overlay.append($caption);

    //Add overlay
    $("body").append($overlay);  


    //Capture the click event on a link to an image (<ul> with id imageGallery)
    $(".pic a").click(function(event){

        event.preventDefault();
        var imageLocation = $(this).attr("href");

        var imageCaption = $(this).children("img").attr("alt");

        //Update overlay with the image linked in the link
        $image.attr("src", imageLocation);

        //Center image in viewport

        $('#lightboxImg').css({'padding': '2% 0 5% 0'})

        //Get child's alt attribute and set caption
        $caption.text(imageCaption);

        //Show the overlay
        $overlay.fadeIn(200);

    });  

    //When overlay is clicked 
    $overlay.click(function() {
      //Hide the overlay
      $overlay.fadeOut(200);
    });  





    // TIME SLIDER FUNCTIONALITY

    var $newImg = $('#newImg');
    var $oldImg = $('#oldImg');
    var $sliderCtrl = $('#sliderControl');
    var $rangeSlider = $('#rangeSlider');
    var $sliderHandle = $('#sliderHandle');

    var $timeSlider = $('#timelineSlider'); 

    var totalWidth = $('#timelineSlider').width();
    var sliderPosition;
    var sliderPercentage

  
    //set initial slider position to middle of image
    totalWidth = Math.round(totalWidth);
    var initialPos = (totalWidth / 2 - 25) / totalWidth * 100;
    $rangeSlider.css("left", initialPos + "%");
    console.log(totalWidth);
    $sliderCtrl.mousedown(function() {
        $timeSlider.mousemove(function(event) {
            // get the mouse x (horizontal) position and offset of the div
            var offset = $(this).offset();
            var divX = (event.pageX - offset.left);



            sliderPosition = (divX - 25) / totalWidth * 100;
            imgSliderPos = 100 - (divX / totalWidth * 100);

            if (sliderPosition >= -2.2 && sliderPosition <= 97.8) {
                //set crop of new image to mouse position
                $rangeSlider.css("left", sliderPosition + "%");
                $rangeSlider.css("left", sliderPosition + "%");
                //move sliderCtrl to mouse position
                $newImg.css("width", imgSliderPos + "%");
            }

            if (imgSliderPos < 0.5) {
                $('#newDate').css('opacity', '0');
            } else if (imgSliderPos > 99.5) {
                $('#oldDate').css('opacity', '0');
            } else {
                $('#newDate').css('opacity', '1');
                $('#oldDate').css('opacity', '1');
            }

        });

    }).mouseup(function() {
        $timeSlider.off('mousemove');
    });

    $timeSlider.mouseleave(function() {
        $timeSlider.off('mousemove');   
    }).mouseup(function() {
        $timeSlider.off('mousemove');
    });

    //$sliderCtrl.bind('touchstart', function(event) {
    //    
    //    //event.preventDefault();
    //    $timeSlider.bind('touchmove', function(event) {
    //        
    //        // get the mouse x (horizontal) position and offset of the div
    //        var offset = $(this).offset();
    //        var divX = (event.pageX - offset.left);
    //        
    //  }
    //
    //
    //
    //        sliderPosition = (divX - 25) / totalWidth * 100;
    //        imgSliderPos = 100 - (divX / totalWidth * 100);
    //
    //        if (sliderPosition >= -2.2 && sliderPosition <= 97.8) {
    //            //set crop of new image to mouse position
    //            $rangeSlider.css("left", sliderPosition + "%");
    //            $rangeSlider.css("left", sliderPosition + "%");
    //            //move sliderCtrl to mouse position
    //            $newImg.css("width", imgSliderPos + "%");
    //        }
    //     
    //    });
    //});





    /* L8M BAND GALLERY LOOP */

    var galleryLoop;
    //start loop
    setupLoop();

    //Gallery click functionality
    $('.thumbnail').click(function() {
        clearInterval(galleryLoop);


        var galleryView = $(this).attr('id'); //capture id from clicked thumbnail

        $('.thumbnail.active').removeClass('active'); //remove active class from current active thumbnail
        $(this).addClass('active'); //set clicked galleryhead to active

        $('#bandImgGallery img.active').removeClass('active'); //remove active class from current active img
        $('.' + galleryView).addClass('active'); //add active class to img with same id as clicked galleryhead

        setupLoop();
    })


    function setupLoop() {
        galleryLoop = setInterval(function() { myTimer() }, 4000);
    }


    function myTimer() {

        if ($('.thumbnail.active').attr('id') === 'geology') {
            $('div #geology').removeClass('active');
            $('img.geology').removeClass('active');
            $('img.urban').addClass('active');
            $('div #urban').addClass('active');
        } else {
            $('.thumbnail.active').next().addClass('active');
            $('#bandImgGallery img.active').next().addClass('active');
            $('#bandImgGallery img.active').first().removeClass('active');
            $('.thumbnail.active').first().removeClass('active');
        }

    }








    //L8M Quote Form
    var $inputArea = $('.inputArea');
    var $inputName = $('#inputName');
    var $inputEmail = $('#inputEmail');
    var $hp = $('#inputSubject'); //hp
    var $submit = $('#submitQuoteBtn');
    var $eula = $('.eula');
    var $singleEula = $('.singleEula');
    var $multiEula = $('.multiEula');
    var $singleProdGroup = $('#singleProdGroup');
    var $multiProdGroup = $('#multiProdGroup');
    var $chooseEula = $('#chooseEula');
    var $singleChooseProduct = $('#singleChooseProduct');
    var $multiChooseProduct = $('#multiChooseProduct');
    var selectedProducts = [];
    var $submitMsg = $('#submitMsg');



    //Hide hints
    $('.hint').hide();
    //Disable submit button
    $submit.prop("disabled", true);
    //Set initial eulaInput to Single Organsiation
    $('#eulaInput').val("Single Organisation");
    //Hide submit msg
    $submitMsg.hide();


    function validateInput(item) {
        if ($hp.val().length === 0) {
            if ($(item).val().length === 0) {
                $(item).prev().toggleClass('focus');
                $(item).next().show();
                validateForm();
            } else {
                $(item).next().hide();
                validateForm();
            }
        }
    }


    function updateSelection(item) {
         //push clicked product into selectedproducts array if class selected. Otherwise remove it from the array
        if ($(item).hasClass('selected') && $(item).children().text() !== 'OK') {           
                selectedProducts.push($(item).children('.aoi').text());    
        } else if ($(item).children().text() !== 'OK') {
            var clickedProductIndex = jQuery.inArray($(item).children('.aoi').text(), selectedProducts);
            selectedProducts.splice(clickedProductIndex, 1);
        }
    }


    //check if required fields have been filled out. If so, enable submit button
    function validateForm() {
        if ($inputEmail.val().length !== 0 && $inputName.val().length !== 0) {
            if ($singleChooseProduct.text().length !== 0 || $multiChooseProduct.text().length) {
                $submit.prop('disabled', false);
            } else {
                $submit.prop('disabled', true);
            }
        } else {
            $submit.prop('disabled', true);
        }
    }


    //set the product group depending on eula chosen
    function setProdGroup() {
        if ($('#chooseEula').text() == 'Single Organisation') {
            $('#eulaInput').val("Single Organisation");
            $multiProdGroup.hide();
            $singleProdGroup.show();
        } else if ($('#chooseEula').text() == 'Multiple Organisations') {
            $('#eulaInput').val("Multiple Organisations");
            $singleProdGroup.hide();
            $multiProdGroup.show();        
        }
    }




    //// FORM EVENT HANDLERS ///////

    //show ul on click
    $('.dropDownToggle').click(function() {
        $(this).next().show();
    });
    
    //toggle class focus of the label if input has value
    $inputArea.focus(function() {

         var isChrome = !!window.chrome && !!window.chrome.webstore;

            if (isChrome) {
                console.log(isChrome);
                $(this).attr('autocomplete', 'off');
            }

        $submitMsg.hide();
         if ($(this).val().length === 0) {
            $(this).prev().toggleClass('focus');
         }
    });

    //hide and show input hints if required fields have not been filled out on blur
    $inputArea.blur(function() {

        if ($(this).attr('id') === 'inputEmail' && $(this).val().length !== 0) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (filter.test($(this).val())) {
                validateInput(this);
            } else {
                $(this).next().show();
            }


        } else {
            validateInput(this);
        }
    });


    $eula.children().click(function() {
        $submitMsg.hide();
        $submit.prop('disabled', true); //disable submit button
        selectedProducts = []; //empty selected products array
        $singleEula.children().removeClass('selected'); //remove selected class from single eula li
        $singleChooseProduct.text(''); //clear text field for single eula products
        $multiEula.children().removeClass('selected'); //remove selected class from multi eula li
        $multiChooseProduct.text(''); //clear text field for single eula products
        $('#singleProductInput').val('');
        $('#multiProductInput').val('');
        var chosenEula = $(this).children().text();    
        $('#chooseEula').text(chosenEula); //update text field with chosen eula 
        setProdGroup(); 
        $(this).parent().hide();
        
    });

    $singleEula.children().click(function(event) {
        event.stopPropagation(); //prevent product drop-down closing when clicking li
        if ($(this).children().text() !== 'OK') {
            $(this).toggleClass('selected');
        } 
        updateSelection(this);

    });

    $multiEula.children().click(function(event) {
        event.stopPropagation();//prevent product drop-down closing when clicking li
        if ($(this).children().text() !== 'OK') {
            $(this).toggleClass('selected');
        }
        updateSelection(this);

    })


    //updated text fields for respective eula product fields with the items in the selectedproducts array
    $('#singleOkBtn').click(function() {
        console.log('hello');
        $submitMsg.hide();
        $singleChooseProduct.text(selectedProducts.join(', '));
        $singleProdGroup.removeClass('open');
        $('#singleProductInput').val(selectedProducts.join(', '));
        $(this).parent().hide();
        validateForm();
    })

    $('#multiOkBtn').click(function() {
        console.log('hello');
        $submitMsg.hide();
        $multiChooseProduct.text(selectedProducts.join(', '));
        $multiProdGroup.removeClass('open');
        $('#multiProductInput').val(selectedProducts.join(', '));
        $(this).parent().hide();
        validateForm();
    })




    //// Form submit function

    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#l8mQuoteForm").submit(function(event){

        // Prevent default posting of form
        event.preventDefault();

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea, span");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycby_sM6HiZXkI6VUboL3vd3tdoP3Ryj9wP4UeYDyd6YHPyAA_P-x/exec",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.success(function (response, textStatus, jqXHR){

            var successMsg = '<p class="large">';
            successMsg += 'Thank you for your interest!';
            successMsg += '<br>';
            successMsg += 'We will be in touch shortly with your quote.';
            successMsg += '</p>';

            $submitMsg.show();
            $submitMsg.html(successMsg);

        });

        // Callback handler that will be called on failure
        request.error(function (jqXHR, textStatus, errorThrown){

            var failMsg = '<p class="large">';
            failMsg += 'Something went wrong when submitting your form.';
            failMsg += '<br>';
            failMsg += 'Please try again.';
            failMsg += '</p>';


            $submitMsg.show();
            $submitMsg.html(failMsg);
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });


    });

}

