!(function(document,window,$){
		var arr = new Array();
 $('.Pageload').on('click',function(){
  $('.homepage').css({opacity:0,'z-index':-1})
})
 // $('.icon-play').on('click',function(){

 // })
   
    $(window).on('mousemove',function(){
    	if($(window).scrollTop()>=$(document).height()-$(window).height()){
    		console.log("到底了")
    	}
    })

})(document,window,Zepto)
