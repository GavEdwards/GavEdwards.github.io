////////////////////////////////////
///////////// MOBILE NAV //////////////////////////
function navClick() {
    $('#menu').toggleClass('menu-click');
}

$(document).ready(function () {
    
    $('.pop-up-button').click(function () {
        $(this).next().toggleClass('active-pop-up');
        $('#nav-button').toggleClass('hide-nav');

    });
    

});

//MAKE IT SO ONLY REMOVES FROM CALLED FROM OIBJECT
function closePopup(pop) {
    
   var video = $(pop).parent().find(".pop-video").attr("src");
        $(pop).parent().find(".pop-video").attr("src","");
        $(pop).parent().find(".pop-video").attr("src",video);
    
    $(pop).parent().parent().parent().removeClass('active-pop-up');
    //$('.pop-up-container').removeClass('active-pop-up');
        $('#nav-button').removeClass('hide-nav');
}

function arrowClick() {
    var PP = $.fn.pagepiling;
    PP.moveSectionDown();
}