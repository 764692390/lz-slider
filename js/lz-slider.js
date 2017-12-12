/*构造函数*/
function LzSlides(ags) {
    /* ags参数说明
     *   el:'#box'  //最外层大box的id
     *   speed:300  //切换速度
     *   autoplay：'4000' //自动播放间隔时间
     * */
    this.config = ags || {};
    this.init(); /*初始化*/
};
/*touchstart事件绑定-手指按下*/
LzSlides.prototype.touchs = function() {
    var _this = this;
    this.box.addEventListener("touchstart", function(e) {
        clearTimeout(_this.timer);
        _this.startPoint = e.changedTouches[0].pageX;
    });
};
/*touchstart事件绑定-手指滑动*/
LzSlides.prototype.touchm = function() {
    var _this = this;
    _this.box.addEventListener("touchmove", function(e) {
        _this.startMove = e.changedTouches[0].pageX;
        var currPoint = e.changedTouches[0].pageX;
        var disX = currPoint - _this.startPoint;
        /*判断当前moves是否在运动*/
        if (_this.flag) {
            /*判断向左还是向右*/
            if (disX > 0) {
                _this.touchLeftAndRight = 'right';
                /*console.log('向右滑动:'+disX);*/
                if (_this.slides.length > 2) {
                    if (Math.abs(disX) > _this.ImgWidth / 2) {
                        _this.previou();
                        _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                    } else {
                        _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                        _this.slides[_this.previous].style.transform = 'translate3d(-' + (_this.ImgWidth - disX) + 'px, 0px, 0px)';
                    };
                } else if (_this.slides.length == 2) {
                    if (Math.abs(disX) > _this.ImgWidth / 2) {
                        _this.previou();
                        _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                    } else {
                        _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                        _this.slides[_this.nexts].style.transform = 'translate3d(-' + (_this.ImgWidth - disX) + 'px, 0px, 0px)';
                    };
                } else if (_this.slides.length == 1) {
                    _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                };

            } else {
                _this.touchLeftAndRight = 'left';
                /*console.log('向左滑动:'+disX);*/
                if (_this.slides.length > 2) {
                    if (Math.abs(disX) > _this.ImgWidth / 2) {
                        _this.next();
                        _this.isMousedowns = false; /*触发end事件了*/
                        _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                    } else {
                        _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                        _this.slides[_this.nexts].style.transform = 'translate3d(' + (_this.ImgWidth + disX) + 'px, 0px, 0px)';
                    };
                } else if (_this.slides.length == 2) {
                    if (Math.abs(disX) > _this.ImgWidth / 2) {
                        _this.next();
                        _this.isMousedowns = false; /*触发end事件了*/
                        _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                    } else {
                        _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                        _this.slides[_this.nexts].style.transform = 'translate3d(' + (_this.ImgWidth + disX) + 'px, 0px, 0px)';
                    };
                } else if (_this.slides.length == 1) {
                    _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                };
            };
        };
    });
};
/*touchstart事件绑定-当手指抬起的时候，判断图片滚动离左右的距离*/
LzSlides.prototype.touche = function() {
    var _this = this;
    _this.box.addEventListener("touchend", function(e) {
        _this.startEle = e.changedTouches[0].pageX;
        /*判断当前moves是否在运动*/
        if (_this.flag && _this.touchLeftAndRight != null) {
            if (_this.touchLeftAndRight == "left") {
                /*当滑动距离大于20切换到下一页， 否则返回到当前页*/
                if (Math.abs(Math.abs(_this.startPoint) - Math.abs(_this.startEle)) > 50 && _this.slides.length != 1) {
                    _this.next();
                } else if (_this.slides.length > 2) {
                    _this.moves(_this.slides[_this.index], 0, 100);
                    _this.moves(_this.slides[_this.nexts], +_this.ImgWidth, 100);
                    _this.slides[_this.previous].style.transform = 'translate3d(-' + _this.ImgWidth + 'px, 0px, 0px)';
                } else if (_this.slides.length == 2) {
                    _this.moves(_this.slides[_this.index], 0, 100);
                    _this.moves(_this.slides[_this.nexts], +_this.ImgWidth, 100);
                } else if (_this.slides.length == 1) {
                    _this.moves(_this.slides[_this.index], 0, 100);
                };
            } else if (_this.touchLeftAndRight == "right") {
                /*当滑动距离大于20切换到下一页， 否则返回到当前页*/
                if (Math.abs(Math.abs(_this.startPoint) - Math.abs(_this.startEle)) > 50 && _this.slides.length != 1) {
                    _this.previou();
                } else if (_this.slides.length > 2) {
                    _this.moves(_this.slides[_this.index], 0, 100);
                    _this.moves(_this.slides[_this.previous], '-' + _this.ImgWidth, 100);
                    _this.slides[_this.nexts].style.transform = 'translate3d(' + _this.ImgWidth + 'px, 0px, 0px)';
                } else if (_this.slides.length == 2) {
                    _this.moves(_this.slides[_this.index], 0, 100);
                    _this.moves(_this.slides[_this.nexts], '-' + _this.ImgWidth, 100);
                } else if (_this.slides.length == 1) {
                    _this.moves(_this.slides[_this.index], 0, 100);
                };
            };
        };
        _this.touchLeftAndRight = null; /*手指抬起清除方向*/
    });
};
/*onmousedown鼠标按下时*/
LzSlides.prototype.mousedowns = function() {
    var _this = this;
    this.box.onmousedown = function(ev) {
        var oEvent = ev || event;
        clearTimeout(_this.timer);
        _this.mousedownX = oEvent.clientX;
        _this.isMousedowns = true; /*触发dowm事件了*/
        document.onmousemove = function(ev) {
            var oEvent = ev || event;
            if (_this.isMousedowns) {
                _this.mousemoveX = oEvent.clientX;
                var disX = _this.mousemoveX - _this.mousedownX;
                /*判断当前moves是否在运动*/
                if (_this.flag) {
                    /*当滑动大于图片的一半时候直接下一屏*/

                    /*判断向左还是向右*/
                    if (disX > 0) {
                        _this.touchLeftAndRight = 'right';
                        /*console.log('向右滑动:'+disX);*/
                        if (_this.slides.length > 2) {
                            if (Math.abs(disX) > _this.ImgWidth / 2) {
                                _this.previou();
                                _this.isMousedowns = false; /*触发end事件了*/
                                _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                            } else {
                                _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                                _this.slides[_this.previous].style.transform = 'translate3d(-' + (_this.ImgWidth - disX) + 'px, 0px, 0px)';
                            };
                        } else if (_this.slides.length == 2) {
                            if (Math.abs(disX) > _this.ImgWidth / 2) {
                                __this.previou();
                                _this.isMousedowns = false; /*触发end事件了*/
                                _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                            } else {
                                _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                                _this.slides[_this.nexts].style.transform = 'translate3d(-' + (_this.ImgWidth - disX) + 'px, 0px, 0px)';
                            };
                        } else if (_this.slides.length == 1) {
                            _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                        };
                    } else {
                        _this.touchLeftAndRight = 'left';
                        /*console.log('向左滑动:'+disX);*/
                        if (_this.slides.length > 2) {
                            if (Math.abs(disX) > _this.ImgWidth / 2) {
                                _this.next();
                                _this.isMousedowns = false; /*触发end事件了*/
                                _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                            } else {
                                _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                                _this.slides[_this.nexts].style.transform = 'translate3d(' + (_this.ImgWidth + disX) + 'px, 0px, 0px)';
                            };
                        } else if (_this.slides.length == 2) {
                            if (Math.abs(disX) > _this.ImgWidth / 2) {
                                _this.next();
                                _this.isMousedowns = false; /*触发end事件了*/
                                _this.touchLeftAndRight = null; /*手指抬起清除方向*/
                            } else {
                                _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                                _this.slides[_this.nexts].style.transform = 'translate3d(' + (_this.ImgWidth + disX) + 'px, 0px, 0px)';
                            };
                        } else if (_this.slides.length == 1) {
                            _this.slides[_this.index].style.transform = 'translate3d(' + (0 + disX) + 'px, 0px, 0px)';
                        };
                    };
                };
                oEvent.preventDefault();
            }
        };

        document.onmouseup = function(ev) {
            _this.isMousedowns = false; /*触发end事件了*/
            var oEvent = ev || event;
            _this.mouseupX = oEvent.clientX;
            /*判断当前moves是否在运动*/
            if (_this.flag && _this.touchLeftAndRight != null) {
                if (_this.touchLeftAndRight == "left") {
                    /*当滑动距离大于20切换到下一页， 否则返回到当前页*/
                    if (Math.abs(Math.abs(_this.mousedownX) - Math.abs(_this.mouseupX)) > 50 && _this.slides.length != 1) {
                        _this.next();
                    } else if (_this.slides.length > 2) {
                        _this.moves(_this.slides[_this.index], 0, 100);
                        _this.moves(_this.slides[_this.nexts], +_this.ImgWidth, 100);
                        _this.slides[_this.previous].style.transform = 'translate3d(-' + _this.ImgWidth + 'px, 0px, 0px)';
                    } else if (_this.slides.length == 2) {
                        _this.moves(_this.slides[_this.index], 0, 100);
                        _this.moves(_this.slides[_this.nexts], +_this.ImgWidth, 100);
                    } else if (_this.slides.length == 1) {
                        _this.moves(_this.slides[_this.index], 0, 100);
                    };
                } else if (_this.touchLeftAndRight == "right") {
                    /*当滑动距离大于20切换到下一页， 否则返回到当前页*/
                    if (Math.abs(Math.abs(_this.mousedownX) - Math.abs(_this.mouseupX)) > 50 && _this.slides.length != 1) {
                        _this.previou();
                    } else if (_this.slides.length > 2) {
                        _this.moves(_this.slides[_this.index], 0, 100);
                        _this.moves(_this.slides[_this.previous], '-' + _this.ImgWidth, 100);
                        _this.slides[_this.nexts].style.transform = 'translate3d(' + _this.ImgWidth + 'px, 0px, 0px)';
                    } else if (_this.slides.length == 2) {
                        _this.moves(_this.slides[_this.index], 0, 100);
                        _this.moves(_this.slides[_this.nexts], '-' + _this.ImgWidth, 100);
                    } else if (_this.slides.length == 1) {
                        _this.moves(_this.slides[_this.index], 0, 100);
                    };
                };
            };
            _this.touchLeftAndRight = null; /*手指抬起清除方向*/
            oEvent.preventDefault();
        };
        oEvent.preventDefault();
        return false;
    };
};
/*获取元素 设置属性*/
LzSlides.prototype.getElme = function() {
    this.box = document.getElementById(this.config.el); /*最外层大box*/
    this.lzwrapper = this.box.querySelector('.lz-wrapper'); /*list的父级【ul】*/
    this.slides = this.box.querySelectorAll('.lz-slides'); /*li*/
    this.lzpagination = this.box.querySelector('.lz-pagination'); /*圆点的父级*/
    this.ImgWidth = this.slides[0].querySelector('img').offsetWidth; /*图片宽度*/
    this.ImgHeight = this.slides[0].querySelector('img').offsetHeight;
    this.lengths = this.slides.length;
};
/*设置圆点和样式*/
LzSlides.prototype.setStyle = function() {
    if (this.slides.length == 0) {
        return false;
    }
    /*清空圆点*/
    this.lzpagination.innerHTML = '';
    /*创建圆点*/
    if (this.slides.length > 2) {
        for (var i = 0; i < this.slides.length; i++) {
            var ospan = document.createElement('span');
            ospan.setAttribute('index', i); /*设置下标*/
            if (i == 0) {
                this.slides[i].style.transform = 'translate3d(0px, 0px, 0px)'
                ospan.setAttribute('class', 'pagination active');
                this.slides[i].setAttribute('class', "lz-slides active");
            } else if (i == 1) {
                this.slides[i].style.transform = 'translate3d(' + this.ImgWidth + 'px, 0px, 0px)'
                ospan.setAttribute('class', 'pagination');
            } else {
                this.slides[i].style.transform = 'translate3d(-' + this.ImgWidth + 'px, 0px, 0px)'
                ospan.setAttribute('class', 'pagination');
            }
            this.lzpagination.appendChild(ospan);
        };
        this.index = 0;
        this.nexts = 1;
        this.previous = this.slides.length - 1;
    } else if (this.slides.length == 2) {
        for (var i = 0; i < this.slides.length; i++) {
            var ospan = document.createElement('span');
            ospan.setAttribute('index', i); /*设置下标*/
            if (i == 0) {
                this.slides[i].style.transform = 'translate3d(0px, 0px, 0px)'
                ospan.setAttribute('class', 'pagination active');
                this.slides[i].setAttribute('class', "lz-slides active");
            } else if (i == 1) {
                this.slides[i].style.transform = 'translate3d(' + this.ImgWidth + 'px, 0px, 0px)'
                ospan.setAttribute('class', 'pagination');
            };
            this.lzpagination.appendChild(ospan);
        };
        this.index = 0;
        this.nexts = 1;
    } else if (this.slides.length == 1) {
        for (var i = 0; i < this.slides.length; i++) {
            var ospan = document.createElement('span');
            ospan.setAttribute('index', i); /*设置下标*/
            ospan.setAttribute('class', 'pagination active');
            this.slides[i].style.transform = 'translate3d(0px, 0px, 0px)'
            this.slides[i].setAttribute('class', "lz-slides active");
            this.lzpagination.appendChild(ospan);
        }
        this.index = 0;
    };
    /*设置图片的样式*/
    this.lzwrapper.style.width = this.ImgWidth + 'px';
    this.lzwrapper.style.height = this.ImgHeight + 'px';
    /*设置li的宽高*/
    for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].setAttribute('index', i);
        this.slides[i].style.width = this.ImgWidth + 'px';
        this.slides[i].style.height = this.ImgHeight + 'px';
    };
};
/*下一页next*/
LzSlides.prototype.next = function() {
    /*当轮播图的数量大于1才运动*/
    if (this.lengths > 2) {
        if (this.index == this.lengths - 2) {
            this.nexts = 0;
            this.index = this.lengths - 1;
            this.previous = this.lengths - 2;
        } else if (this.index == this.lengths - 1) {
            this.nexts = 1;
            this.index = 0;
            this.previous = this.lengths - 1;
        } else {
            this.index = this.index + 1
            this.nexts = this.index + 1;
            this.previous = this.index - 1;
        };
        this.moves(this.slides[this.index], 0);
        this.moves(this.slides[this.previous], '-' + this.ImgWidth);
        this.slides[this.nexts].style.transform = 'translate3d(' + this.ImgWidth + 'px, 0px, 0px)';
    } else if (this.lengths == 2) {
        if (this.index == 0) {
            this.nexts = 0;
            this.index = 1;
        } else if (this.index == 1) {
            this.nexts = 1;
            this.index = 0;
        };
        this.moves(this.slides[this.index], 0);
        this.moves(this.slides[this.nexts], '-' + this.ImgWidth);

    } else if (this.lengths == 1) {

    };
};
/*上一页previou*/
LzSlides.prototype.previou = function() {
    /*当轮播图的数量大于1才运动*/
    if (this.lengths > 2) {
        if (this.index == 1) {
            this.nexts = 1;
            this.index = 0;
            this.previous = this.lengths - 1;
        } else if (this.index == 0) {
            this.nexts = 0;
            this.index = this.lengths - 1;
            this.previous = this.lengths - 2;
        } else if (this.index == this.lengths - 1) {
            this.nexts = this.lengths - 1;
            this.index = this.lengths - 2;
            this.previous = this.lengths - 3;
        } else {
            this.index = this.index - 1
            this.nexts = this.index + 1;
            this.previous = this.index - 1;
        };
        this.moves(this.slides[this.index], 0);
        this.moves(this.slides[this.nexts], this.ImgWidth);
        this.slides[this.previous].style.transform = 'translate3d(-' + this.ImgWidth + 'px, 0px, 0px)';
    } else if (this.lengths == 2) {
        if (this.index == 0) {
            this.nexts = 0;
            this.index = 1;
        } else if (this.index == 1) {
            this.nexts = 1;
            this.index = 0;
        };
        this.moves(this.slides[this.index], 0);
        this.moves(this.slides[this.nexts], this.ImgWidth);
    } else if (this.lengths == 1) {

    };
};
/*movesend运动完成*/
LzSlides.prototype.movesEnd = function() {
    var _this = this;
    if (this.slides.length == 2) {
        this.slides[this.nexts].style.transform = 'translate3d(' + this.ImgWidth + 'px, 0px, 0px)';
    };
    this.flag = true;
    /*默认开启自动播放*/
    if (this.flag) {
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function() {
            if (_this.visibilityState == "visible") {
                _this.next();
            };
        }, this.config.autoplay);
    };
    for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].setAttribute('class', "lz-slides");
        this.lzpagination.children[i].setAttribute('class', 'pagination');
    };
    this.slides[this.index].setAttribute('class', "lz-slides active");
    this.lzpagination.children[this.index].setAttribute('class', 'pagination active');
};
/*运动方法*/
LzSlides.prototype.moves = function(obj, target, t) {
    /*
     *  obj:运动对象  target：终点   t:时间
     */

    var _this = this;
    this.flag = false;
    var time = null;
    var t = t || _this.config.speed;
    var start = parseFloat(obj.style.transform.match(/translate3d\((.*?)\)/)[1].split(',')[0]); /*起点*/
    var dis = target - start; /*起点和终点的距离*/
    var count = Math.floor(t / 3); /*运动的次数*/
    var n = 0; /*运动默认距离*/
    clearInterval(time); /*先轻定时器，在用定时器*/
    time = setInterval(function() {
        n++;
        var cur = start + dis * n / count;
        obj.style.transform = 'translate3d(' + cur + 'px, 0px, 0px)';
        /*条件满足清除定时器*/
        if (n == count) {
            clearInterval(time);
            /*运动完成回调*/
            _this.movesEnd();
            this.flag = true;
        };
    }, 3);
};
/*监听浏览器最小化和最大化*/
LzSlides.prototype.VisibilityState = function() {
    var _this = this;
    /* 各种浏览器兼容*/
    var hidden, state, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        visibilityChange = "webkitvisibilitychange";
    };

    /*添加监听器*/
    document.addEventListener(visibilityChange, function() {
        if (document.visibilityState == "hidden") {
            _this.visibilityState = "hidden"
        } else if (document.visibilityState == "visible") {
            _this.visibilityState = "visible";
        };
        /*默认开启自动播放*/
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function() {
            if (_this.visibilityState == "visible") {
                _this.next();
            };
        }, _this.config.autoplay);
    });
};
/*更新轮播图*/
LzSlides.prototype.updata = function() {
    var _this = this;
    this.box.removeEventListener("touchstart", function(e) {});
    this.box.removeEventListener("touchmove", function(e) {});
    this.box.removeEventListener("touchend", function(e) {});
    this.box.removeEventListener("visibilitychange", function(e) {});
    clearTimeout(_this.timer);
    /*重新初始化*/
    this.init();
};
/*初始化方法*/
LzSlides.prototype.init = function() {
    var _this = this;
    this.visibilityState = "visible"; /*默认窗口最大化*/
    this.nexts = ''; /*下一页下标等于空*/
    this.previous = ''; /*上一页下标等于空*/
    this.timer = null; /*定时器设置为空对象*/
    this.index = 0; /*默认下标是0*/
    this.flag = true; /*运动的时候阻止点击*/
    this.touchLeftAndRight = null; /*判断是否是左滑动还是右滑动*/
    this.startPoint = 0; /*初始化手指坐标点*/
    this.startMove = 0; /*初始化手指移动*/
    this.startEle = 0; /*初始化手指坐标点*/
    this.mousedownX = 0; /*鼠标按下时坐标*/
    this.mousemoveX = 0; /*鼠标滑动时坐标*/
    this.mouseupX = 0; /*鼠标抬起时坐标*/
    this.isMousedowns = false; /*默认没有点击左键*/
    this.getElme(); /*获取元素设置属性*/
    this.setStyle(); /*创建设置圆点样式*/
    /*绑定手机移动事件*/
    this.touchs();
    this.touchm();
    this.touche();
    /*pc端绑定事件*/
    this.mousedowns();
    this.VisibilityState(); /*监听窗口最大化和最小化*/
    /*默认开启自动播放*/
    if (this.flag) {
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function() {
            if (_this.visibilityState == "visible") {
                _this.next();
            };
        }, this.config.autoplay);
    };
};