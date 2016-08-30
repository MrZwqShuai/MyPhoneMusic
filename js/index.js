'use strict'
var AudioFace = {}
AudioFace.music = {
}
AudioFace.music.AudioM = function(Songname, URL, element, element1, element2) {
    this.element = element;
    this.element1 = element1;
    this.element2 = element2;
    this.name = Songname
    this.init();
    this.audioPlay();
    this.audioControl(element);
    this.audioPlay(element);
    this.audioloadData();
    this.loadImg('images/1.jpeg',this.back)
};
AudioFace.music.AudioM.prototype = {
    constructor: AudioFace.music.AudioM,
    init: function() {
        this.Audio = document.querySelector('#myAudio');
        this.Audio.loop = true;
        // 当前播放索引
        this.currentIndex = -1;
    },
    playpause: function(element, element1) {
        var _self = this;
        this.Audio.addEventListener('pause', function() {
            clearInterval(_self.run);
            $(element).removeClass(element1);

        });
        this.Audio.addEventListener('playing', function() {
            $(element).addClass(element1);
                
        });
    },
    // 监听播放
    audioPlay: function(element, element1, element2, element3, element4, element5, element6, element7) {
        var _self = this;
        $(element).on('tap', function() {
            _self.Audio.addEventListener('loadstart', function() {
                this.Loadtext = "正在加载";
                $('.xmpartist').html(this.Loadtext);
            }, false);
            _self.Audio.addEventListener('canplaythrough', function() {
                $('.xmpartist').html(singer);
                $('.xmpname').html(songN);
                $(element2).addClass(element1);
                $(element3).addClass(element4);
            });
            _self.Audio.addEventListener('error', function() {
                this.Ftext = "加载失败";
                $('.xmpname').html(this.Ftext);
            }, false);
            _self.currentIndex = Number($(this).children('.Num').text()) - 1;
            _self.Audio.src = _self.arr[_self.currentIndex];
            _self.Audio.play();
            _self.audioLrcParse(element5, element6, element7, _self.currentIndex);
            var songN = $(this).attr('name');
            var singer = $(this).attr('singer');
            $('.xmpartist').html(singer);
        })
    },
    // 播放暂停
    audioControl: function(element, element1, element3) {
        var _self = this;
        $(element).on('tap', function() {
            _self.playpause(element, element1);
            if (!_self.Audio.paused) {
                _self.Audio.pause(); 
                $(element3).css({
                    'right': '0rem',
                    'animation': 'none',
                    '-webkit-animation': 'none'
                })
            } else {
                _self.Audio.play();
                $(element3).css({
                    'right': '-2.2rem',
                    'animation': 'rotate 4s .5s linear infinite',
                    '-webkit-animation': 'rotate 4s .5s linear infinite',
                    ' animation-delay': '1.8s',
                    '-webkit-animation-delay': '1.8s'
                })
            }
        })
    },
    loadImg: function(url,callback){
        var img  = new Image() ;
        img.src = url ;
        if(img.complete){
            callback.call(img) ;
            return ;
        }
        img.onload = function(){
            callback.call(img) ;
        } ;

        
    },
    back: function(){
        console.log('success');
    },
    animate: function(element, element1, element2, element3, element4) {
        var _self = this;
        $(element).on('tap', function() {
            $(element1).css({
                'transform': 'translate3D(0,0,0)',
                '-webkit-transform': 'translate3d(0,0,0)'
            })
        })
        $(element4).on('tap', function() {
                $(element1).css({
                    'transform': 'translate3D(0,100%,0)',
                    '-webkit-transform': 'translate3d(0,100%,0)'
                })
            })
            // 监听icon-play事件
        this.Audio.addEventListener('canplaythrough', function() {
            if (!_self.Audio.paused) {
                $(element3).css({
                    'right': '-2.2rem',
                    'animation': 'rotate 4s .5s linear infinite',
                    '-webkit-animation': 'rotate 4s .5s linear infinite',
                    '-moz-animation': 'rotate 4s .5s linear infinite',
                    '-ms-animation': 'rotate 4s .5s linear infinite',
                    '-o-animation': 'rotate 4s .5s linear infinite',
                    '-o-animation-delay': '1.8s',
                    '-moz-animation-delay': '1.8s',
                    '-ms-animation-delay': '1.8s',
                    '-webkit-animation-delay': '1.8s',
                    'animation-delay': '1.8s'
                })
            } else {
                $(element2).on('tap', function() {})
            }
        });
    },
    // 播放进度
    audioProcess: function(element, element1, element2, element3) {
        var _self = this;
        var totaltimer = 0;
        this.Audio.addEventListener('canplaythrough', function() {
            totaltimer = _self.Audio.duration;
            var m = parseInt(_self.Audio.duration / 60);
            var s = parseInt(_self.Audio.duration % 60);
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            $(element).html(m + ':' + s);
            $(element2).on('touchstart', function(e) {
                var touch = e.targetTouches[0];
                var ev = e || windwo.event;
                var x = touch.clientX;
                var y = touch.clientY;
                var l = touch.offsetLeft;
                var t = touch.offsetTop;
                _self.Audio.pause();
                $(element2).on('touchmove', function(e) {
                    var ev = e.targetTouches[0];
                    var X = ev.clientX;
                    var chaX = X - x;
                    if (chaX <= 0) chaX = 0;
                    _self.MW = $('.progress-line').width() - $(this).width();
                    if (chaX >= _self.MW) chaX = _self.MW;
                    var per = chaX / _self.MW;
                    _self.Audio.pause();
                    document.querySelector(element3).style.width = chaX + 'px';
                    document.querySelector(element2).style.left = chaX + 'px';
                    // document.querySelector(element2).style.left = _self.p;
                    _self.Audio.currentTime = per * totaltimer;
                });
                $(element2).on('touchend', function(e) {
                    $(element2).off('touchstart');
                    _self.Audio.play();
                })
            })
        });
        this.Audio.addEventListener('timeupdate', function() {
            var M = parseInt(_self.Audio.currentTime / 60);
            var S = parseInt(_self.Audio.currentTime % 60);
            _self.MW = $('.progress-line').width() - $(this).width();
            M = M < 10 ? '0' + M : M;
            S = S < 10 ? '0' + S : S;
            $(element1).html(M + ':' + S);
            _self.p = parseInt(_self.Audio.currentTime / _self.Audio.duration * 100) + '%';
            document.querySelector(element3).style.width = _self.p;
            document.querySelector(element2).style.left = _self.p;
        });
        // 拖拽
        $('.real-line').on('touchstart', function(e) {
            var e = e.targetTouches[0];
            var xx = e.clientX;
            var nxx = xx - this.parentElement.offsetLeft;
            var per1 = nxx / this.parentElement.offsetWidth;
            document.querySelector(element3).style.width = per1 * 100 + '%';
            document.querySelector(element2).style.left = per1 * 100 + '%';
            _self.Audio.currentTime = per1 * totaltimer;
            _self.Audio.play();
        })
        $('.real-line').on('touchstart', function(e) {
            $(element2).off('touchstart');
        })
    },
    // 切换下一首
    audioNext: function(element, element1, element2, element3, element4, element5, element6) {
        var _self = this;
        $(element).on('tap', function() {
            if (_self.currentIndex == ($('.musiclist').length-1)) {
                _self.currentIndex = 0;
            } else {
                _self.currentIndex++;
            }
            _self.Audio.src = _self.arr[_self.currentIndex];
            _self.Audio.play();
            _self.Audio.addEventListener('canplaythrough', function() {
                var singer = _self.arr2[_self.currentIndex];
                var songN = _self.arr1[_self.currentIndex];
                $('.xmpartist').html(singer);
                $('.xmpname').html(songN);
                $(element2).addClass(element3);
            });
            _self.audioLrcParse(element4, element5, element6, _self.currentIndex);
            var singer = $(element1).attr('singer')
        });
    },
    // 上一首
    audioPrev: function(element, element1, element2, element3, element4, element5, element6) {
        var _self = this;
        $(element).on('tap', function() {
            if (_self.currentIndex == 0) {
                _self.currentIndex = ($('.musiclist').length-1);
            } else {
                _self.currentIndex--;
            }
            _self.Audio.src = _self.arr[_self.currentIndex];
            _self.Audio.play();
            _self.Audio.addEventListener('canplaythrough', function() {
                var singer = _self.arr2[_self.currentIndex];
                var songN = _self.arr1[_self.currentIndex];
                $('.xmpartist').html(singer);
                $('.xmpname').html(songN);
                $(element2).addClass(element3);
            });
            _self.audioLrcParse(element4, element5, element6, _self.currentIndex)
            var singer = $(element1).attr('singer')
        })
    },
    // 歌词解析
    audioLrcParse: function(element1, element2, element3, lrcIndex) {
        var _self = this
        var songlrc = this.arr3;
        var Lyrics = /([\d{2}:\d{2}\.\d{2}]+)([^\[]+)/g;
        _self.arrTime = [];
        var arrLrc = [];
        var Ellist = $(element1).find('li');
        if (Ellist.length != 0) {
            Ellist.remove();
            arrLrc = [];
        }
       // 歌词时间分割
        while (Lyrics.exec(songlrc[lrcIndex])) {
            var aa = RegExp.$1.split(':');
            var Aa = RegExp.$2.replace(/[\[\]]/g, '');
            var minute = parseInt(aa[0]) * 60 * 1000; //分钟
            var second = parseInt(aa[1]) * 1000;
            var millisecond = parseInt(parseFloat(aa[1]) % 1 * 100);
            var totaltime = minute + second + millisecond;
            _self.arrTime.push(totaltime);
            arrLrc.push(Aa);
        }
        
        for (var i = 0; i < arrLrc.length; i++) {
            var lrcLi = '<li>' + arrLrc[i] + '</li>';
            $(element1).append(lrcLi);
        }
        // 歌词同步
        _self.run = setInterval(function() {//只执行了一次
            var nowTime = parseInt(_self.Audio.currentTime);
            for (var t in _self.arrTime) { //这里数组不应该有之前的数组
                if (parseInt(_self.arrTime[t] / 1000) == (nowTime)) {
                    var Height = $(element2).height();
                    var height = $(element3).eq(t).height();
                    $(element1).find('li').eq(t).addClass('m3').siblings().removeClass('m3');
                    $(element1).css({
                            'transform': 'translate3D(0,' +( Height / 2 - t * height )+ 'px,  0)',
                            '-webkit-transform': 'translate3D( 0,' +( Height / 2 - t * height )+ 'px, 0)'
                        });
                }
            }
          
        }, 1000);
    },
    // 获取json数据
    audioloadData: function() {
        var _self = this;
        var arr = new Array();
        var arr1 = new Array();
        var arr2 = new Array();
        var arr3 = new Array();
        var num = 0,
            $list = $('.container');
        loadData($list, num);
        function loadData($ele, num) {
            $.ajax({
                url: 'json/music.json',
                async: false,
                success: function(data) {
                    var str = '';
                    var index = 0;
                    $.each(data, function(i, item) {
                        arr[index] = item.songSrc;
                        arr1[index] = item.songName;
                        arr2[index] = item.Singer;
                        arr3[index] = item.songlrc;
                        index = index + 1;
                        if (i == 0) {
                            str += [
                                '<li class="musiclist"  singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span>' + ("0" + (i + 1)) + '</span>' + '<div>' + item.songName + '<br>' + item.Singer + '</div></li>'
                            ].join('');
                        } else if (i < 10) {
                            str += [
                                '<li class="musiclist"  singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span>' + ("0" + (i + 1)) + '</span>' + '<div>' + item.songName + '<br>' + item.Singer + '</div> </li>'
                            ].join('');
                        } else {
                            str += [
                                '<li class="musiclist"  singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span>' + (i + 1) + '</span>' + '<div>' + item.songName + '<br>' + item.Singer + '</div></li>'
                            ].join('');
                        }
                    })
                    $list.append(str);
                    _self.arr = arr;
                    _self.arr1 = arr1;
                    _self.arr2 = arr2;
                    _self.arr3 = arr3;
                },
                error: function() {
                    alert('请求失败')
                }
            })
        }
    }
}
