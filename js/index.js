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
    console.log(this);
};

AudioFace.music.AudioM.prototype = {
    constructor : AudioFace.music.AudioM,

    init: function() {
  
        this.Audio = document.querySelector('#myAudio');

     
   
    },

    audioPlay:function(element,element1,element2){
     
          var _self = this;
          
           $(element).on('click',function(){
          
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
            var songN = $(this).attr('name');
            var singer = $(this).attr('singer')
    var path = $(this).attr('path');
        _self.Audio.src = path;
        _self.Audio.play();
       
        $('.xmpartist').html(singer);
       

      
     })
    },

    audioControl: function(element,element1) {
        var _self = this;
        $(element).on('click',function(){
            if(!_self.Audio.paused){
              $(this).removeClass(element1);
            _self.Audio.pause();
            }else{
              $(this).addClass(element1);
                _self.Audio.play()
            }
        })
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

     audioNext:function(element){
        
    }

}
