(function ($) {
  var spawnDrop = function (x, y, maxRadius, dropRate, dropSpreadTime, css, that) {
    var id = '#' + $(that).attr('id');
		//alert(id);
    //append() seems buggy so we use appendTo()
    $('<div></div>').appendTo(id).css({
      left: x,
      top: y
    }).css(css).animate({
      opacity: 0.0,
      width: maxRadius * 2,
      height: maxRadius * 2,
      left: '-=' + (maxRadius - 2.5),
      top: '-=' + (maxRadius - 2.5)
    }, dropSpreadTime, function () {
      $(this).remove();
    });
  };

  //dropRate is in drops per 1000000 pixels per second
  //for now, passing a new css value to droplets changes the css for all droplets
//all elements must have unique ids
  $.fn.droplets = function (options) {
    //default settings
    var defaultCss = {
      'position': 'absolute',
      'border': 'solid 1px',
      'border-radius': '100px',
      '-moz-border-radius': '100%',
      'width': '5px',
      'height': '5px',
      'overflow': 'hidden'
    };
    var defaultOptions = {
      maxRadius: 50,
      dropRate: 10,
      dropSpreadTime: 2000,
      buffer: false,
      css: defaultCss
    };
    var settings = $.extend(defaultOptions, options);
    // this.each(function () {
    var offset = $(this).offset();
    var that = $(this);

    var drop = function () {
      var x;
      var y;
      var width = that.outerWidth();
      var height = that.outerHeight();
      if (settings.buffer) {

        x = Math.random() * (width - settings.maxRadius * 2) + settings.maxRadius;
        y = Math.random() * (height - settings.maxRadius * 2) + settings.maxRadius;
      } else {
        x = Math.random() * (width);
        y = Math.random() * (height);
      }
      spawnDrop(x, y, settings.maxRadius, settings.dropRate, settings.dropSpreadTime, settings.css, that);
      var dropInterval = 1000000 * 1000 / (height * width) / settings.dropRate;

      //seconds per drop = 10000000pixels*(1000ms/s)/(2 drops/sec)/#pixels
      setTimeout(drop, dropInterval);
    };
    drop();
    // });
    return this;
  };
})(jQuery);
