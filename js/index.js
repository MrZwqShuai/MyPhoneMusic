
setShareInfo({
    title: '刘德华',
    summary: '222',
    pic: 'http://qzonestyle.gtimg.cn/aoi/sola/20150617094556_OvfOpoRKRB.png',
    url:            'https://mrzwqshuai.github.io/MyPhoneMusic/?tjrid=123456',
    callback: function (result) {

    alert('result成功分享')
    alert(result.retCode)
    document.write(result.retCode)
    } 
});
alert(99)
console.log('setShareInfo222', setShareInfo)
var AudioFace = {}
AudioFace.music = {}
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
    this.loadImg(this.back);
    this.addHeart();
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
            if($(this).next().attr('class')=='heart-img'){
                _self.currentIndex = Number($(this).index())/2;
            }else {
                _self.currentIndex = Number($(this).index()) ;

            }
            _self.Audio.src = $(this).attr('path');
            _self.Audio.play();
            _self.audioLrcParse(element5, element6, element7, _self.currentIndex);
            _self.toggleImg($('.t-img img'), _self.currentIndex);
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
    addHeart: function() {
        var _self = this;
        var strMeruKey = "memMenuTitle";
        var arrdisplay = [];
        for (var i = 0; i < $('.heart-img').length; i++) {
            arrdisplay[i] = 0;
        }
        function fnStoredisplay() {
                arrdisplay[_self.index] = (_self.sign === false ? 1 : 0);
            if (window.localStorage) {
                localStorage.setItem(strMeruKey, arrdisplay);
            }
        }
        function fnAddheart(element,index,classname) {
                $(element).eq(index).addClass(classname) ;
                var $li = $('.musiclist').eq(index).clone() ;
                 $('.rec-container').append($li) ;
        }
        $('.heart-img').on('tap', function() {
           var indexF =$(this).index() ;
           _self.index = indexF/2-0.5 ;
           _self.sign = $(this).hasClass('heart-img1');
            if (_self.sign === false) {
                fnAddheart('.heart-img',_self.index,'heart-img1')
            } else {
                $('.heart-img').eq(_self.index).removeClass('heart-img1');
                  var $li = $('.musiclist').eq(_self.index).clone() ;
            }
            fnStoredisplay();
            
            return false;
        })
        var strstoreDate = window.localStorage.getItem(strMeruKey);
        if(strstoreDate){
           arrdisplay = strstoreDate.split(',') ; 
       }
        if (strstoreDate) {
            strstoreDate.split(',').forEach(function(display, index) {
                if (display == 0) {
                    $('.heart-img').eq(index).removeClass('heart-img1');
                } else {
                     fnAddheart('.heart-img',index,'heart-img1')
                }
            })
        }
    },
    // 图片预加载
    loadImg: function(callback) {
        this.toggleImg();
        var arrImg = ['images/heart-img2', 'images/heart-img1', 'images/1.jpeg', 'images/3.jpeg', 'images/111.jpg', 'images/return.png', 'images/mingren.jpg', 'images/img.jpg', 'images/play_play.png', 'images/play_pause.png', 'images/play_next.png', 'images/play_prev.png', 'images/1_02.png', 'images/cd185.png', 'images/line.png', 'images/Music.png'];
        this.imgArr.push(arrImg);
        if (document.images) {
            var img = new Image();
            for (var i = 0; i < this.imgArr.length; i++) {
                img[i] = new Image();
                img[i].src = this.imgArr[i];
            }
        }
        if (img.complete) {
            callback.call(img);
            return;
        }
        img.onload = function() {
            callback.call(img);
        };
    },
    back: function() {
        console.log('success');
    },
    toggleImg: function(ele, index) {
        var _self = this;
        _self.imgArr = ['http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000', 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000', 'http://y.gtimg.cn/music/photo_new/T001R300x300M000003ZQQb64D5317.jpg?max_age=2592000', 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003K4mFV3B9UfM.jpg?max_age=2592000', 'http://y.gtimg.cn/music/photo_new/T002R300x300M000001sKd2l0dVkXa.jpg', 'http://y.gtimg.cn/music/photo_new/T002R300x300M000004CFwog26ax08.jpg', 'http://img.xiami.net/images/album/img0/3557921258599818_2.jpg', 'http://img.xiami.net/images/album/img69/7169/5100191335342155_2.jpg', 'http://img.xiami.net/images/album/img54/173854/1297173854_2.jpg', 'http://img.xiami.net/images/album/img58/3058/154291468997051_2.jpg', 'http://img.xiami.net/images/album/img69/7169/965946861397635527_2.jpg', 'http://img.xiami.net/images/album/img42/442/19261378203144_2.jpg', 'http://img.xiami.net/images/album/img58/23258/3207771470901509_2.jpg', 'http://img.xiami.net/images/album/img52/7052/3682971265854129_2.jpg', 'http://img.xiami.net/images/album/img86/773286/7732861412773286_2.jpg', 'http://img.xiami.net/images/album/img39/2739/145831376589249_2.jpg', 'http://img.xiami.net/images/album/img24/61224/15222071141472178795_2.jpg', 'http://img.xiami.net/images/album/img58/23258/4314411300697056_2.jpg', 'http://img.xiami.net/images/album/img69/7169/4217651472021043_2.jpg', 'http://img.xiami.net/images/album/img12/55712/20080783461411725324_2.jpg', 'http://img.xiami.net/images/album/img60/63760/3414911358479166_2.jpg', 'http://img.xiami.net/images/album/img66/7366/4324541301473658_2.jpg', 'http://img.xiami.net/images/album/img66/7366/3141491397734019_2.jpg', 'http://img.xiami.net/images/album/img94/83094/4175261470897820_2.jpg', 'http://img.xiami.net/images/album/img66/7366/3967281289900657_2.jpg', 'http://img.xiami.net/images/album/img39/2739/32927_2.jpg', 'http://img.xiami.net/images/album/img64/1164/57681417575958_2.jpg', 'http://img.xiami.net/images/album/img66/7366/170711_2.jpg', 'http://img.xiami.net/images/album/img83/123483/5619081355304243_2.png', 'http://img.xiami.net/images/album/img83/2075780083/5373969721437396972_2.jpg', 'http://img.xiami.net/images/album/img79/23979/1709891387951723_2.jpg'];
        $(ele).attr('src', _self.imgArr[index]);
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
            if (_self.currentIndex == ($('.musiclist').length - 1)) {
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
            _self.toggleImg($('.t-img img'), _self.currentIndex);
            var singer = $(element1).attr('singer')
        });
    },
    // 上一首
    audioPrev: function(element, element1, element2, element3, element4, element5, element6) {
        var _self = this;
        $(element).on('tap', function() {
            if (_self.currentIndex == 0) {
                _self.currentIndex = ($('.musiclist').length - 1);
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
            _self.audioLrcParse(element4, element5, element6, _self.currentIndex);
            _self.toggleImg($('.t-img img'), _self.currentIndex);
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
        _self.run = setInterval(function() { //只执行了一次
            var nowTime = parseInt(_self.Audio.currentTime);
            for (var t in _self.arrTime) { //这里数组不应该有之前的数组
                if (parseInt(_self.arrTime[t] / 1000) == (nowTime)) {
                    var Height = $(element2).height();
                    var height = $(element3).eq(t).height();
                    $(element1).find('li').eq(t).addClass('m3').siblings().removeClass('m3');
                    $(element1).css({
                        'transform': 'translate3D(0,' + (Height / 2 - t * height) + 'px,  0)',
                        '-webkit-transform': 'translate3D( 0,' + (Height / 2 - t * height) + 'px, 0)'
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
                                                    str += [
                                '<li class="musiclist"  singer=' + item.Singer + ' path="' + item.songSrc + '" name="' + item.songName + '">' + '<span class="Num"></span>' + '<div class="showSname">' + item.songName + '<br>' + item.Singer + '</div></li><i class="heart-img"></i>'
                            ].join('');
                                   
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
