'use strict'
var AudioFace = {}
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
    this.audioLrcParse();
    console.log(this);
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
        this.Audio.addEventListener('pause', function() {
            console.log('暂停a ');
            $(element).removeClass(element1);
        });
        this.Audio.addEventListener('playing', function() {
            console.log('播放中');
            $(element).addClass(element1);
        });
    },
    // 监听播放
    audioPlay: function(element, element1, element2, element3, element4) {
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
                $(element2).on('tap', function() {
                })
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
    audioNext: function(element, element1, element2, element3) {
        var _self = this;
        $(element).on('tap', function() {
            if (_self.currentIndex == 28) {
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
            var singer = $(element1).attr('singer')
        })
    },
    // 上一首
    audioPrev: function(element, element1, element2, element3) {
        var _self = this;
        $(element).on('tap', function() {
            if (_self.currentIndex == 0) {
                _self.currentIndex = 28;
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
            var singer = $(element1).attr('singer')
        })
    },
    // 歌词解析
    audioLrcParse: function(element1,element2,element3) {
        var _self = this
        var songlrc = this.arr3[0];
        var Lyrics = /([\d{2}:\d{2}\.\d{2}]+)([^\[]+)/g;
        var arrTime = [];
        var arrLrc = [];
        while (Lyrics.exec(songlrc)) {
            var aa = RegExp.$1.split(':');
            var minute = parseInt(aa[0]); //分钟
            var second = parseInt(aa[1]);
            console.log(minute,second)
            var totaltime = minute * 60 + second;
            arrTime.push(totaltime);
            var aa = RegExp.$2.replace(/[\[\]]/g, '');
            arrLrc.push(aa);
        }
        arrLrc.push(aa);
        for (var i = 0; i < arrLrc.length; i++) {
            var lrcLi = '<li>' + arrLrc[i] + '</li>';
            $(element1).append(lrcLi);
        }
        setInterval(function(){
                  _self.Audio.addEventListener('timeupdate', function() {
            var nowTime = parseInt(this.currentTime);
            for (var i in arrTime) {
                var index = 0;
                if (arrTime[i] == nowTime) {
                    index++;
                    var Height = $(element2).height();
                    var height = $(element3).eq(i).height();
                    $(element1).find('li').eq(i).addClass('m3').siblings().removeClass('m3');
                    $(element1).css('marginTop', '' + (Height / 2 - i * height) + 'px');
                }
            }
        }) 
              },50);
 
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
                                '<li class="musiclist" id="#musiclist" singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span>' + ("0" + (i + 1)) + '</span>' + '<div>' + item.songName + '<br>' + item.Singer + '</div></li>'
                            ].join('');
                        } else if (i < 10) {
                            str += [
                                '<li class="musiclist" id="#musiclist" singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span>' + ("0" + (i + 1)) + '</span>' + '<div>' + item.songName + '<br>' + item.Singer + '</div> </li>'
                            ].join('');
                        } else {
                            str += [
                                '<li class="musiclist" id="#musiclist" singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span>' + (i + 1) + '</span>' + '<div>' + item.songName + '<br>' + item.Singer + '</div></li>'
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
