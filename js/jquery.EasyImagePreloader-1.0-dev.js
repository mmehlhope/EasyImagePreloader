// Easy Image Preloader
// Created by Matt Mehlhope (mmehlhope@gmail.com), inspired by Abhin Sharma of Nettuts+
// Development version 1.0

// MIT License

// Copyright (c) 2010 Edwin Martin

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
		
// GPL License

// Copyright (C) 2010 Edwin Martin

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>


;(function($, undefined) {

	var easyImagePreloader = {

		defaults: {
			useFadeDelay: false, // set to true to enable staggered fade in effect
			fadeDelay: 100, // delay between staggered fade
			preload_parent: "i",
			checkIntervalDelay: 300, // how often the images are checked for their loading state, in milliseconds
			fadein: 500, // the time in milliseconds it takes for an image to fade in
			onDone: function() {}, // callback for when all images are complete
			onEachLoad: function( image ){} // @param image -- callback after each image is loaded
		},

		init: function( options ) {

			return this.each(function() {

				var self = easyImagePreloader,
					$this = $(this), 
					settings = $.extend(self.defaults, options),
					images = $this.find("img").css({ "visibility" : "hidden" , opacity: 0 }), 
					counter = 0,
					i = 0,
					imageCompletionArray = [],
					checkImagesInterval,
					fadeDelay = settings.fadeDelay;

				//
				// Loops through the images in the selector and wraps them in the preloader
				//
				images.each(function() {

					var $this = $(this),
						preloaderCSS = {
							background: "#fff url(http://cdn.mehlhope.net/images/easyImagePreloader/loadingAnimation.gif) center center no-repeat",
							display: "block",
						};

					if ( $this.parent(settings.preload_parent).length == 0 ) {
						$this.wrap( $('<i/>').css(preloaderCSS) );
					}
					else {
						$this.parent('i').addClass("preloader");
					}

					// Flag each index of the array as false for each item that is detected on the page
					imageCompletionArray[i++] = false;

				});		

				//
				// Loop that is run to check the state of the images
				//
				function checkImages() {

					if ( counter >= imageCompletionArray.length ) {
						// stop looping through the images, we're done!
						clearInterval(checkImagesInterval);
						// run onDone callback
						settings.onDone();
						return;
					}
					for ( var i = 0 ; i < images.length; i++ ) {

						if( images[i].complete === true ) {
							
							if (imageCompletionArray[i] === false) {

								// Flag this image as complete in the array
								imageCompletionArray[i] = true;
								// run the per-image callback
								settings.onEachLoad(images[i]);
								// increment the fade delay
								fadeDelay = fadeDelay + settings.fadeDelay;

								counter++;
							}
							

							// Fade in the image since it is now loaded
							if (settings.useFadeDelay) {
								$(images[i]).css("visibility", "visible").delay(fadeDelay).animate({opacity: 1}, settings.fadein, function() { 
									// Remove the wrapper, but keep the image!
									$(this).parent('i').removeAttr('style');
								});
							}
							else {
								$(images[i]).css("visibility", "visible").animate({opacity: 1}, settings.fadein, function() { 
									// Remove the wrapper, but keep the image!
									$(this).parent('i').removeAttr('style');
								});
							}
							
						}
					}
				}

				// Start the interval to check image states
				checkImagesInterval = setInterval(checkImages, settings.checkIntervalDelay);
			});
		}
	};

	// lets define the actual plugin!
	$.fn.easyImagePreloader = function( method ) {

	    if ( easyImagePreloader[method] ) {
			return easyImagePreloader[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return easyImagePreloader.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist for $.easyImagePreloader' );
		} 	
	};

})(jQuery);