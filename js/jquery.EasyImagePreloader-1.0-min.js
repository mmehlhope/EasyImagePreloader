// Easy Image Preloader
// Created by Matt Mehlhope (mmehlhope@gmail.com), inspired by Abhin Sharma of Nettuts+
// Production Version 1.01
// MIT (http://www.opensource.org/licenses/mit-license.php)
// GPL (http://www.opensource.org/licenses/gpl-license.php)
(function(b,c){var a={defaults:{useFadeDelay:false,fadeDelay:100,preload_parent:"i",checkIntervalDelay:300,fadein:500,onDone:function(){},onEachLoad:function(d){}},init:function(d){return this.each(function(){var m=a,j=b(this),h=b.extend(m.defaults,d),k=j.find("img").css({visibility:"hidden",opacity:0}),e=0,f=[],l,g=h.fadeDelay;k.each(function(n){var p=b(this),o={background:"#fff url(http://cdn.mehlhope.net/easyImagePreloader/loadingAnimation.gif) center center no-repeat",display:"block"};if(p.parent(h.preload_parent).length==0){p.wrap(b("<i/>").css(o))}else{p.parent("i").addClass("preloader")}f[n]=false});function i(){if(e>=f.length){clearInterval(l);h.onDone();return}for(var n=0;n<k.length;n++){if(k[n].complete===true){if(f[n]===false){f[n]=true;h.onEachLoad(k[n]);g=g+h.fadeDelay;e++}b(k[n]).css("visibility","visible").delay(h.useFadeDelay?g:0).animate({opacity:1},h.fadein,function(){b(this).parent("i").removeAttr("style")})}}}l=setInterval(i,h.checkIntervalDelay)})}};b.fn.easyImagePreloader=function(d){if(a[d]){return a[d].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof d==="object"||!d){return a.init.apply(this,arguments)}else{b.error("Method "+d+" does not exist for $.easyImagePreloader")}}}})(jQuery);