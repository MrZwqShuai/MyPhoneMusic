'use strict'
var AudioFace = {

}
AudioFace.music = {
    // var currentIndex=-1;
    // //  播放器元素对象
   
    // // 歌曲列表
    // var mlist=["music/youdiantian.mp3","music/tingmamadehua.mp3","music/qingtian.mp3"];
    // // 图片路径
    // var imglist=["blank.png","Lana Del Rey.jpg","0039Pp2W372JsM.jpg"];
    // //歌曲路径
    // var msrc=["music/youdiantian.mp3","music/tingmamadehua.mp3","music/qingtian.mp3"];
    // //进度条
    // var stick=document.getElementById("stick");

}
AudioFace.music.AudioM = function(Songname,URL,element,element1,element2) {
    this.element = element;
    this.element1 = element1;
    this.element2 = element2;
    this.name = Songname
    this.init();
    this.audioPlay();
    this.audioControl(element);
    this.audioPlay(element);
    this.audioProcess();
    this.audioloadData();
    console.log(this);
};

AudioFace.music.AudioM.prototype = {
    constructor : AudioFace.music.AudioM,

    init: function() {
  
        this.Audio = document.querySelector('#myAudio');
        this.Audio.loop=true;
        // 当前播放索引
        this.currentIndex = -1;

   
    },
   
    // 监听播放
    audioPlay:function(element,element1,element2){
      
          var _self = this;
          
           $(element).on('tap',function(){
       
            _self.Audio.addEventListener('loadstart',function(){
                  this.Loadtext = "正在加载";
                   $('.xmpartist').html(this.Loadtext);
            },false);
           
            _self.Audio.addEventListener('canplaythrough',function(){
                 $('.xmpartist').html(singer);  
                  $('.xmpname').html( songN);
                  $(element2).addClass(element1);
            });
             _self.Audio.addEventListener('error',function(){
                  this.Ftext = "加载失败"; 
                  $('.xmpname').html( this.Ftext);
            },false);
            
           _self.currentIndex = Number($(this).children('.Num').text())-1;
      
        _self.Audio.src = _self.arr[ _self.currentIndex];
        _self.Audio.play();
       var songN = $(this).attr('name');
            var singer = $(this).attr('singer');
        $('.xmpartist').html(singer);
        

      
     })
    },
    // 播放暂停
    audioControl: function(element,element1,element3) {
        var _self = this;
        $(element).on('tap',function(){
         if(!_self.Audio.paused){
              $(this).removeClass(element1);
           
               _self.Audio.pause();
                     $(element3).css({'right': '0rem',
                   'animation':'none',
                  '-webkit-animation':'none'
              })
              }else{
              $(this).addClass(element1);

                _self.Audio.play();
                  $(element3).css({'right': '-2.2rem',
                  'animation':'rotate 4s .5s linear infinite',
                  '-webkit-animation':'rotate 4s .5s linear infinite',
                    ' animation-delay':'1.8s',
                   '-webkit-animation-delay':'1.8s'
              })
          
            }
          
        })
    },
     animate: function(element,element1,element2,element3,element4){
        var _self = this;
      $(element).on('tap',function(){
        $(element1).css({'transform': 'translate3D(0,0,0)',
                '-webkit-transform': 'translate3d(0,0,0)'
              })
      })
      $(element4).on('tap',function(){
        $(element1).css({'transform': 'translate3D(0,100%,0)',
                '-webkit-transform': 'translate3d(0,100%,0)'
              })
      })
   
     // 监听icon-play事件
      this.Audio.addEventListener('canplaythrough',function(){
            if(!_self.Audio.paused){
            $(element3).css({'right': '-2.2rem',
                  'animation':'rotate 4s .5s linear infinite',
                  '-webkit-animation':'rotate 4s .5s linear infinite',
                    ' animation-delay':'1.8s',
                   '-webkit-animation-delay':'1.8s'
              })
            }else{
                 $(element2).on('tap',function(){
        console.log(1)
      })
            }
       



            });
      
    },
    audioProcess:function(){
           this.Audio.oncanplaythrough = function(){
         //   var m = parseInt(this.duration/60);
         //   var s = parseInt(this.duration%60);
         //   m = m < 10 ? '0' + m : m;
         //   s = s < 10 ? '0' + s : s;
         //   $('#TotalTimer').html(m+':'+s)
         //    };
         //  this.Audio.ontimeupdate = function(){
         //    var M = parseInt(this.currentTime/60);
         //    var S = parseInt(this.currentTime%60);
         //    M = M < 10 ? '0' + M : M;
         //    S = S < 10 ? '0' + S : S;
            
         //    document.getElementById('TotalTimer').innerHTML = (M+':'+S)
         
         }
    },
    // 切换下一首
     audioNext:function(element,element1,element2,element3){
        var _self = this;
        $(element).on('tap',function(){ 
          
            if(_self.currentIndex==28){
                _self.currentIndex=0;
                
                
            }else{
                 _self.currentIndex++ ; 
          
            }
           
           
          
          _self.Audio.src = _self.arr[_self.currentIndex];
            _self.Audio.play();
            _self.Audio.addEventListener('canplaythrough',function(){
                var singer = _self.arr2[_self.currentIndex];
                var songN = _self.arr1[_self.currentIndex];
                 $('.xmpartist').html(singer);  
                  $('.xmpname').html( songN);
                  $(element2).addClass(element3);
                   });
             
             
           

            var singer = $(element1).attr('singer')
            
        })
    },
    // 下一首
    audioPrev:function(element,element1,element2,element3){
       var _self = this;
        $(element).on('tap',function(){ 
          
            if(_self.currentIndex==0){
                _self.currentIndex=28;
                
                
            }else{
                 _self.currentIndex-- ; 
          
            }
           
           
          
          _self.Audio.src = _self.arr[_self.currentIndex];
            _self.Audio.play();
            _self.Audio.addEventListener('canplaythrough',function(){
                var singer = _self.arr2[_self.currentIndex];
                var songN = _self.arr1[_self.currentIndex];
                 $('.xmpartist').html(singer);  
                  $('.xmpname').html( songN);
                  $(element2).addClass(element3);
                   });
             
             
           

            var singer = $(element1).attr('singer')
            
        })
    },

    // 获取json数据
    audioloadData:function(element){
         var _self = this;
        var arr = new Array();
        var arr1 = new Array();
        var arr2 = new Array();
         var num = 0,
      $list = $('.container');
        loadData($list,num);
        function loadData($ele,num){
        $.ajax({
        url:'json/music.json',
         async:false,
        success:function(data){
            

                
            var str = '';
        
            var index = 0;
            $.each(data,function(i,item){

                
                arr[index] = item.songSrc;
                arr1[index] = item.songName;
                arr2[index] = item.Singer;
                index = index+1;


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
            _self.arr = arr;
            _self.arr1 = arr1;
            _self.arr2= arr2;
         
          
        },
        error:function(){
            alert('请求失败')
        }

    })
   }
    }

}
