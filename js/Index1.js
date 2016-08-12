!(function(document,window,$){
 $('.Pageload').on('click',function(){
  $('.homepage').css({opacity:0,'z-index':-1})
})
 // $('.icon-play').on('click',function(){

 // })
    var num = 0,
    $list = $('.container');
    loadData($list,num)
   function loadData($ele,num){
   	    $.ajax({
    	url:'json/music.json',
         async:false,
    	success:function(data){
    		
    		var str = ' ';
    		$.each(data,function(i,item){
    			
                if(i==0){
                    str+=[
                    '<li class="musiclist" id="#musiclist" singer='+item.Singer+' path="'+item.songSrc+'" name="'+item.songName+'">'+'<span>'+("0"+(i+1))+'</span>'+'<div>'+item.songName+'<br>'+item.Singer+'</div></li>'
                ].join('');
            }
                else if(i<10){
                	 str+=[
                    '<li class="musiclist" id="#musiclist" singer='+item.Singer+' path="'+item.songSrc+'" name="'+item.songName+'">'+'<span>'+("0"+(i+1))+'</span>'+'<div>'+item.songName+'<br>'+item.Singer+'</div> </li>'
                ].join('');
                }
            
            else{
    			str+=[
					'<li class="musiclist" id="#musiclist" singer='+item.Singer+' path="'+item.songSrc+'" name="'+item.songName+'">'+'<span>'+(i+1)+'</span>'+'<div>'+item.songName+'<br>'+item.Singer+'</div></li>'
    			].join('');
            }
    		})
    		
    		$list.append(str);

        
    	},
    	error:function(){
    		alert('请求失败')
    	}

    })
   }
})(document,window,Zepto)