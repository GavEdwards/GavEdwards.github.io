# GavEdwards.github.io
/* Copyright (C) 2017 Ascot Business Solutions Ltd - All Rights Reserved */
FileDirector Website 

/////// FileDirector and FileDirector Cloud Documentation /////////
/////// Designed and Developed by Gavin Edwards for Ascot Business Solutions///////

The page body is split into 3 div sections
- Navigation bar at the top is fixed to the top of the page and uses a sticky nav feature in javacript
- Header section of pages in a div with class "header-wrap"
- Content of pages is wrapped in a div with class "content-wrap"

The 'content' section mentioned above acts like the main body of the page,
it is split into multiple component sections,
including a div which is for main content information,
this includes elements such as such as main title and tagline and is wrapped in a div with class="header-content"

Content after this is wrapped in div class="content-info".

This content then follows the plan of:

<div class="content-1 content"> (can be content 1-4)
	 <div class="content-width-wrap">
		 <div class="content-left"> </div>
		 <div class="content-right"> </div>
	</div>
</div>

CSS Class Behaviours

class="content-img" signifies an image will be placed inside that div (use for center aligning and styling of images)
class="content-width-wrap" constrains the content to the sites max-width
class="content" specifys the behaviour of every content div (so all main content sections can be edited at once)
class="content-1" can be numbered 1-4 (specifys the colour of the content div)
class="content-top" this is the content div that should be placed at the top of the information instead of e.g. "content-1"
class="content-left" this signifies the content should be aligned on the left side
class="content-right" this signifies the content should be aligned on the right side

The 'Features' page has a seperate CSS stylesheet but with very similar behaviour. 
It is built with Angular.js and written inside the features.html document 
It loads products via Ajax from the products folder.

