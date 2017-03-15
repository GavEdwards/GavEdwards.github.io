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
//////////////// get/set user preferences //////////////////

$( document).ready(function() {
    
    if(localStorage.fontPref){
        document.body.style.fontSize = localStorage.fontPref;
        //alert("FONT PREFERNCE SAVED AS: " + localStorage.fontPref);
        $('select','#setPref').val(localStorage.fontPref);
    } else {
        //alert("FONT PREFERNCE SAVED AS NONE: " + localStorage.fontPref);
    }
    
    if(localStorage.colourPref){
            $('.header-wrap').css("background",  localStorage.colourPref);    
        //alert("FONT PREFERNCE SAVED AS: " + localStorage.fontPref);
        $('.header-wrap').val(localStorage.colourPref);
    } else {
        //alert("FONT PREFERNCE SAVED AS NONE: " + localStorage.fontPref);
    }
});
    

$('select','#setPref' ).on('change', function(){
    document.body.style.fontSize = $(this).val();
    
    if(localStorage.fontPref){
        localStorage.fontPref= String($(this).val());
        //alert("FONT PREFERNCE SAVED AS: " + localStorage.fontPref);
    } else {
        localStorage.setItem("fontPref", $(this).val());
        //alert("FONT PREFERNCE SAVED AS: " + localStorage.fontPref);
    }
});

$('input','#setPref' ).on('change', function(){
    
    $('.header-wrap').css("background", $(this).val());    
    if(localStorage.colourPref){
        localStorage.colourPref= String($(this).val());
        //alert("COLOUR PREFERNCE SAVED AS: " + localStorage.colourPref);
    } else {
        localStorage.setItem("colourPref",$(this).val());
        //alert("COLOUR PREFERNCE SAVED AS: " + localStorage.colourPref);
    }
});

function resetColour(){
    $('.header-wrap').css("background", "linear-gradient(to bottom, rgba(2, 131, 229, 1) 1%, rgba(91, 172, 229, 1) 59%, rgba(195, 215, 229, 1) 100%)");
    localStorage.colourPref= null;
}

////////// settings expand /////////////////
$('#setPref').click( function(e){
    $(this).toggleClass('open-color');
    $(this).children('.options').toggleClass('expand');
});

//prevent list closing when choosing options
$('.options','#setPref').children().click( function(e){
    event.stopPropagation();
});
    //////////////// Expanding Boxes ///////////////////////
$('.what-tag').mouseenter(function (){
    $(this).css("background", "#fafafa");
    $(this).css("transform", "scale(1.05)");
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
//////////////////// SET PRICES ///////////////////////////////


$('#currency').on('change', function(){
    
	$.ajax({
	type: "GET",	 
	url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20%28%27GBPUSD%27,%20%27GBPEUR%27,%27GBPAUD%27,%27GBPJPY%27,%27GBPCAD%27%29&env=store://datatables.org/alltableswithkeys",

	dataType: "xml",
}).done(function(currency) {
	//reset pricing to default
	loadPrice();
	//initialise rates
	var rate1 = $(currency).find('#GBPUSD').find('Rate').text();
	var rate2 = $(currency).find('#GBPEUR').find('Rate').text();
	var rate3 = $(currency).find('#GBPAUD').find('Rate').text();
	var rate4 = $(currency).find('#GBPJPY').find('Rate').text();
	var rate5 = $(currency).find('#GBPCAD').find('Rate').text();
	
	var selectedRate;
	var symbol;
	switch( $('#currency').val() ){
		case "USD": 	selectedRate = rate1;
						symbol = "$" ;
						break;
		case "EUR": 	selectedRate = rate2;
						symbol = "&euro;";
						break;
		case "AUD": 	selectedRate = rate3;
						symbol = "&#36;";
						break;
		case "JPY": 	selectedRate = rate4;
						symbol = "&#165;";
						break;
		case "CAD": 	selectedRate = rate5;
						symbol = "&#36";
						break;
		
	}
	
	document.getElementById("getprice1").innerHTML = symbol + Math.round((Number(document.getElementById("getprice1").innerHTML) * Number(selectedRate))*100)/100;
	
 
});
	
	
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
        }
}
function vidPopup() {
        popupVid.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
function closeVidPopup() {
        popupVid.style.display = "none";
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
    //////////////VIDEO CUSTOM CONTROLS ////////////////////
    //Play/Pause control clicked
var $btnPlay = $('.btnPlay');
$btnPlay.on('click', function () {
    if ($video[0].paused) {
        $video[0].play();
        $('i', $btnPlay).removeClass('fa-play');
        $('i', $btnPlay).addClass('fa-pause');
    }
    else {
        $video[0].pause();
        $('i', $btnPlay).removeClass('fa-pause');
        $('i', $btnPlay).addClass('fa-play');
    }
    return false;
});
$video.on('ended', function () {
    $('i', $btnPlay).removeClass('fa-pause');
    $('i', $btnPlay).addClass('fa-play');
});
//get HTML5 video time duration
$video.on('loadedmetadata', function () {
    $('.duration').text($video[0].duration);
});
//update HTML5 video current play time
$video.on('timeupdate', function () {
    $('.current').text(Math.floor($video[0].currentTime / 60) + "." + Math.round($video[0].currentTime % 60));
});
//get HTML5 video time duration
$video.on('loadedmetadata', function () {
    $('.duration').text(Math.floor($video[0].duration / 60) + "." + Math.round($video[0].duration % 60));
});
//update HTML5 video current play time
$video.on('timeupdate', function () {
    var currentPos = $video[0].currentTime; //Get currenttime
    var maxduration = $video[0].duration; //Get video duration
    var percentage = 100 * currentPos / maxduration; //in %
    $('.timeBar').css('width', percentage + '%');
});
var timeDrag = false; /* Drag status */
$('.progressBar').mousedown(function (e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function (e) {
    if (timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function (e) {
    if (timeDrag) {
        updatebar(e.pageX);
    }
});
//update Progress Bar control
var updatebar = function (x) {
    var progress = $('.progressBar');
    var maxduration = $video[0].duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();
    //Check within range
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage + '%');
    $video[0].currentTime = maxduration * percentage / 100;
};
//Mute/Unmute control clicked
$('.muted').click(function () {
    $video[0].muted = !$video[0].muted;
    if ($video[0].muted == true) {
        $('i', '.muted').removeClass('fa-volume-up');
        $('i', '.muted').addClass('fa-volume-off');
    }
    else {
        $('i', '.muted').removeClass('fa-volume-off');
        $('i', '.muted').addClass('fa-volume-up');
    }
    return false;
});
//Volume control clicked
$('.volumeBar').on('mousedown', function (e) {
    var position = e.pageX - $('.volumeBar').offset().left;
    var percentage = 100 * position / $('.volumeBar').width();
    $('.volume').css('width', percentage + '%');
    $video[0].volume = percentage / 100;
});
////////////////////////////////TODO add function whee when video has finished playong show other videos for users to watch


/////// load prices ///////////////////
function loadPrice(){
 $.ajax({
            type : "GET",
            url : "prices.csv",
            dataType : "text",
            async : false,
            success : 
        function(data)
            {
                processData(data);
            }
        });
    
function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    
    console.log(headers);
    for(var i =0; i<lines.length; i++){
    console.log(lines[i]);
    }
    //$(this).parent(".product-type").children(".display-info").innerHTML = lines[1][2];
    document.getElementById('getprice1').innerHTML =  lines[1][2];
    document.getElementById('getprice2').innerHTML = lines[2][2];
}
    function changeData(){
    document.getElementById("#getprice1").innerHTML = lines[1][2];
    document.getElementById('#getprice2').innerHTML = lines[2][2];
}


}
