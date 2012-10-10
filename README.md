# Easy Image Preloader
### Created by Matt Mehlhope, inspired by Abhin Sharma of Nettuts+

The Easy Image Preloader is a very simple way to ensure the images within a container are loaded in a user friendly and aesthetically pleasing manner. Being a jQuery plugin, it does have a hard requirement of jQuery, obviously.

## Example
You can view an example page [here](http://mmehlhope.github.com/EasyImagePreloader/) which uses the optional `useFadeDelay:true` argument to create the staggered effect.

## Usage
To use the plugin, you will run the `$.easyImagePreloader();` method on the parent container for the images you wish to load. If you want ALL images to be loaded (not generally recommended), you can use the `body` or your `'#wrapper'` equivalent.

#### A Collection of Images
`$('.gallery').easyImagePreloader(); // a collection of images in a gallery`
#### All images on the page
`$('body').easyImagePreloader(); // for all images on the page`

## Options
As always, to use any of the following methods simply pass them as an argument when using the plugin.
`$('.gallery').easyImagePreloader({
  option: value,
  option: value
});`

#### useFadeDelay - *Default, False.* 
By changing this to true, all images on the page will load in a staggered effect. The delay between each image is controlled by `fadeDelay`

#### fadeDelay - *Default, 100*
If `useFadeDelay: true`, you can alter this value to change the length between the staggered load of the images

#### preload_parent - *Default, 'i'*
This is the container that is wrapped around each image for the preload effect to be applied. You can change this to whatever you want, but the `i` tag is very unobtrusive and will also pass W3C validation.

#### checkIntervalDelay - *Default, 300*
This is the interval time, in milliseconds, that the script will check the loaded state of the images. The faster this is (the lower the number), the more often it checks, but the more processing intensive the script becomes.

#### fadein - *Default, 500*
The time, in milliseconds, it will take for each image to fade in once it has been loaded.

#### onDone - *Default, none. Callback function is used*
A callback function to be fired once all images have been loaded.
`$('.gallery').easyImagePreloader({
  onDone: function() { alert('All images have been loaded!'); }
});`

#### onEachLoad - *Default, none. Callback function is used*
A callback function to be run after each image is loaded.
`$('.gallery').easyImagePreloader({
  onEachLoad: function( image ) { console.log(image); }
});`