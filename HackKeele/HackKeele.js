////////////////////////////////////
///////////// MOBILE NAV //////////////////////////

function navClick() {
         $('#menu').toggleClass('menu-click');
    }
	

	$(document).ready(function(){

	$('.pop-up-button').click(function(){
        
		 $(this).next().toggleClass('active-pop-up');
		 
    });
	
	});
	
//MAKE IT SO ONLY REMOVES FROM CALLED FROM OIBJECT
	function closePopup() {
         $('.pop-up-container').removeClass('active-pop-up');
    }


        function arrowClick(){
            var PP = $.fn.pagepiling;
            PP.moveSectionDown();
        }