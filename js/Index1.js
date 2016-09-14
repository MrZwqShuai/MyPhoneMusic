!(function(document, window, $) {
    var arr = new Array();
    $('.Pageload').on('tap', function() {
            $('.homepage').css({ opacity: 0, 'z-index': -1 })
        })
  $('nav span').on('tap',function(){
    var index = $(this).index() ;
    var pages = $('.songCon').children() ;
    $(this).addClass('m4 m5').siblings().removeClass('m4 m5') ;
    pages.eq(index).show().siblings().hide() ;
  }) 

})(document, window, Zepto)
