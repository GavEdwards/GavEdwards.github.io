//////////////// Sticky Nav bar/opacity changing /////////////
jQuery(document).ready(function ($) {
        $(window).scroll(function () {
            var height = $('.header').height();
            var navheight = $('#nav-bar').height();
            var scrollTop = 1; //height-navheight;
            if ($(window).scrollTop() >= scrollTop) {
                $('#nav-bar').css({
                    position: 'fixed'
                    , top: '0'
                    , background: '#1976D2'
                    , boxShadow: '0 2px 5px 0 rgba(0,0,0,0.24)'
                , });
                $('#x').css({
                    height: navheight
                });
            }
            if ($(window).scrollTop() < scrollTop) {
                $('#nav-bar').removeAttr('style');
                $('#x').css({
                    height: '0%'
                });
            }
        });
    });


    //////////////// Expanding Boxes ///////////////////////
$('.what-tag').mouseenter(function (){
    $(this).css("background", "#fafafa");
    $(this).css("transform", "scale(1.0)");
    $(this).css("box-shadow", "0px 0px 7px 0px rgba(0, 0, 0, 0.7)");

});

$('.what-tag').mouseleave(function (){
    $(this).removeAttr('style');
});
                     
$('.what-tag').click(function () {
    $(this).toggleClass('what-clicked');
    var scrollTo;
    //if opened go to element top, else go to main head top
    if ($(this).hasClass('what-clicked')) {
        $(this).find('.what-content').css("display", "block");
        scrollTo = "#" + $(this).attr('id');
        $('html, body').animate({
        scrollTop: $(scrollTo).offset().top - $('#nav-bar').height() * 2
    }, 'slow');
        
    }
    else {
        
        $(this).find('.what-content').css("display", "none");
        scrollTo = '#main-head';
        $('html, body').animate({
        scrollTop: $(scrollTo).offset().top  }, 'slow');
    }

});

////////////////////////////////////
///////////// MOBILE NAV //////////////////////////

$('.fa-bars').click(function(){
    $('#nav-bar').toggleClass('clicked-colour');
    $('#nav-items').toggleClass('clicked-navwrap');
    $('li' , '#nav-bar').toggleClass('clicked-li');
    $('.social').toggleClass('clicked-li');
    $('.nav-left').toggleClass('clicked-left');
    $('.nav-right').toggleClass('clicked-right');
    $('#setPref').children('.options').toggleClass('clicked-pref');
});
///////////// POP UP BOX //////////////////////////
// Get the modal
var popup = document.getElementById('pop-up');
var popupVid = document.getElementById('pop-upVid');	

// When the user clicks on the button, open the modal 
function demoPopup() {
        popup.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
function closePopup() {
        popup.style.display = "none";
    } // When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    if (event.target == popupVid) {
            popupVid.style.display = "none";
            
            $("#main-vid").each(function() { 
            var src= $(this).attr('src');
            $(this).attr('src',src);  
            });
        
        }
}
function vidPopup() {
        popupVid.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
function closeVidPopup() {
        popupVid.style.display = "none";
    
            popupVid.style.display = "none";
            
            $("#main-vid").each(function() { 
            var src= $(this).attr('src');
            $(this).attr('src',src);  
            });
        
        
    } // When the user clicks anywhere outside of the modal, close it


function confirmSignUp(){
        popup.style.display = "block";
    }
	
    ////////////// VIDEO RESIZE ////////////////////
var $video = $('video')
    , $window = $(window);
$(window).resize(function () {
    var videoWidth = $video.width();
    windowWidth = $window.width();
}).resize();
$video.onclick = function () {
        $video.style.padding = "400px";
        $video.style.background = "black";
    }
 