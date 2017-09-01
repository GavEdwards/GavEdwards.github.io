////////////////////////////////////
///////////// MOBILE NAV //////////////////////////

function navClick() {
         $('#menu').toggleClass('menu-click');
    }
	

	$(document).ready(function(){

	$('.pop-up-button').click(function(){
        
		 $(this).next().toggleClass('FAQ-pop-up');
		 
    });
	
	});
	
	function closePopup() {
         $('.pop-up').removeClass('FAQ-pop-up');
    }