// Easy Image Preloader
// Created by Matt Mehlhope
// Development version 1.0

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
							background: "transparent url(/common/images/misc/imagePreloader.gif) center center no-repeat",
							display: "block"
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

						clearInterval(checkImagesInterval);
						if (settings.useProgressBar) {
							self.removeProgressBar();
						}
						settings.onDone();
						return;
					}
					for ( var i = 0 ; i < images.length; i++ ) {

						if( images[i].complete === true ) {
							
							if (imageCompletionArray[i] === false) {

								// Flag this image as complete in the array
								imageCompletionArray[i] = true;
								//settings.oneachload(images[i]);
								fadeDelay = fadeDelay + settings.delay;
								counter++;
								percentComplete = Math.ceil((counter / images.length) * 100);
								//self.updateProgressBar(percentComplete);
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