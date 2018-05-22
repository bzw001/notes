!function(t) {
    function e(i) {
        if (n[i])
            return n[i].exports;
        var o = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(o.exports, o, o.exports, e),
        o.loaded = !0,
        o.exports
    }
    var n = {};
    return e.m = t,
    e.c = n,
    e.p = "//imgcache.qq.com/qcloud/main/scripts/",
    e(0)
}({
    0: function(t, e, n) {
        "use strict";
        function i() {
            var t = $(window);
            [new o({
                $root: $("#heroBanner"),
                options: window.G_BannerOptions || d
            }), new r({
                $root: $("#productWrapper")
            }), new a({
                $root: $("#solutionWrapper")
            }), new s({
                $root: $("#customerWrapper")
            }), new c({
                $root: $("#marketWrapper")
            }), new u({
                $root: $("#regionWrapper")
            }), new l({
                $root: $("#developerWrapper")
            }), new h({
                $root: $("#certWrapper")
            })];
            t.trigger("scroll")
        }
        var o = n("+V/N")
          , r = n("9n8x")
          , a = n("qcm8")
          , s = n("DzxX")
          , c = n("xnl8")
          , u = n("70lU")
          , l = n("forf")
          , h = n("eSCn")
          , d = (n("TN2A"),
        {
            enableAnimation: !1
        });
        i()
    },
    TN2A: function(t, e, n) {
        "use strict";
        var i = n("51LH")
          , o = i.getResponsiveMode
          , r = i.getClientWidth
          , a = n("+V/N")
          , s = a.handleResponsive
          , c = r()
          , u = {
            handleResize: function(t) {
                var e = r();
                if (t || e !== c) {
                    var n = o();
                    this[n + "Render"](),
                    c = e
                }
            },
            mobileRender: function() {
                s("mbg")
            },
            padRender: function() {
                s("bg")
            },
            pcRender: function() {
                s("bg")
            }
        };
        t.exports = u
    },
    1: function(t, e) {
        t.exports = _
    },
    dwAR: function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , r = n("Sawl")
          , a = 600
          , s = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                i(this, t),
                this.$root = e.$root,
                this.options = e.options || {},
                this.screenMode = this.getScreenMode(),
                this._bindBaseEvents(),
                this.onInit(),
                this.onReady()
            }
            return o(t, [{
                key: "_bindBaseEvents",
                value: function() {
                    var t = this
                      , e = this
                      , n = $(window);
                    n.on("resize", _.throttle(function() {
                        t.onResize();
                        var e = r.getWindowWidth();
                        e <= a && "wide" === t.screenMode && (t.screenMode = "narrow",
                        t.onNarrow()),
                        e > a && "narrow" === t.screenMode && (t.screenMode = "wide",
                        t.onWiden()),
                        t.onAfterResize()
                    }, 100)),
                    n.on("scroll", _.throttle(function() {
                        t.onScroll(),
                        t.isBeforeScrollIntoView() && e.onBeforeScrollIntoView()
                    }, 100))
                }
            }, {
                key: "getScreenMode",
                value: function() {
                    return r.getWindowWidth() < a ? "narrow" : "wide"
                }
            }, {
                key: "onInit",
                value: function() {}
            }, {
                key: "onReady",
                value: function() {}
            }, {
                key: "onResize",
                value: function() {}
            }, {
                key: "onNarrow",
                value: function() {}
            }, {
                key: "onWiden",
                value: function() {}
            }, {
                key: "onAfterResize",
                value: function() {}
            }, {
                key: "onScroll",
                value: function() {}
            }, {
                key: "isBeforeScrollIntoView",
                value: function() {
                    if (!this.$root || !this.$root.length)
                        return !1;
                    var t = $(window)
                      , e = t.height()
                      , n = t.scrollTop()
                      , i = this.$root.offset().top
                      , o = "wide" === this.getScreenMode() ? .6 : 1
                      , r = n + (1 + o) * e;
                    return r > i
                }
            }, {
                key: "onBeforeScrollIntoView",
                value: function() {}
            }, {
                key: "onIntoView",
                value: function() {}
            }, {
                key: "$",
                value: function(t) {
                    function e(e) {
                        return t.apply(this, arguments)
                    }
                    return e.toString = function() {
                        return t.toString()
                    }
                    ,
                    e
                }(function(t) {
                    return this.$root ? this.$root.find(t) : $(t)
                })
            }]),
            t
        }();
        t.exports = s
    },
    Sawl: function(t, e) {
        "use strict";
        t.exports = {
            getWindowWidth: function() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            },
            loadImage: function(t, e) {
                var n = _.extend({
                    loader: "pureImage"
                }, e);
                "pureImage" === n.loader && ((new Image).srcUrl = t),
                "bgImage" === n.loader && $("<div>").css({
                    width: 0,
                    height: 0,
                    overflow: "hidden",
                    "background-image": "url(" + t + ")"
                }).appendTo("body")
            },
            isPhone: function() {
                var t = navigator.userAgent;
                return !(!/AppleWebKit.*Mobile/i.test(t) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(t) || /iPad/i.test(t))
            },
            isSupportTouchEvent: function() {
                var t = navigator.userAgent.toLowerCase();
                return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(t)
            },
            getBrowserType: function() {
                var t = navigator.userAgent;
                return t.indexOf("Opera") > -1 ? "opera" : t.indexOf("Firefox") > -1 ? "firefox" : t.indexOf("Chrome") > -1 ? "chrome" : t.indexOf("Safari") > -1 ? "safari" : t.indexOf("compatible") > -1 && t.indexOf("MSIE") > -1 ? "ie" : "unknown"
            }
        }
    },
    qI2I: function(t, e, n) {
        "use strict";
        function i(t, e) {
            return b ? e ? b + t.charAt(0).toUpperCase() + t.substr(1) : ["-", b, "-", t].join("") : t
        }
        function o(t) {
            return m + t.charAt(0).toUpperCase() + t.substr(1)
        }
        function r(t, e, n) {
            return n === p ? d.defaultView.getComputedStyle(t, null)[i(e, !0)] : void (t.style[i(e, !0)] = n)
        }
        function a() {
            var t = 0
              , e = 0;
            return f.screen.deviceXDPI !== p ? (t = f.screen.deviceXDPI,
            e = f.screen.deviceYDPI) : (y.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden",
            d.body.appendChild(y),
            t = parseInt(y.offsetWidth),
            e = parseInt(y.offsetHeight),
            y.parentNode.removeChild(y)),
            {
                X: t,
                Y: e
            }
        }
        function s(t) {
            var e = {
                transformProperty: "translateX",
                nextRatio: .4,
                speedThreshold: 4,
                disableBoundaryMove: !1,
                boundaryAnimationName: "",
                disableTouch: !1,
                touchArea: d.documentElement,
                autoAnimationDuration: 200,
                slideRatio: 2 / 3,
                lockOnAnimating: !0,
                preventDefault: "auto",
                autoRunTimeSpan: 1e3
            };
            return t && (t.transformProperty !== p && (e.transformProperty = t.transformProperty),
            t.disableTouch !== p && (e.disableTouch = t.disableTouch),
            t.touchArea !== p && (e.touchArea = t.touchArea),
            t.disableBoundaryMove !== p && (e.disableBoundaryMove = t.disableBoundaryMove),
            t.boundaryAnimationName !== p && (e.boundaryAnimationName = t.boundaryAnimationName),
            t.nextRatio !== p && (e.nextRatio = t.nextRatio),
            t.speedThreshold !== p && (e.speedThreshold = t.speedThreshold),
            t.autoAnimationDuration !== p && (e.autoAnimationDuration = t.autoAnimationDuration),
            t.slideRatio !== p && (e.slideRatio = t.slideRatio),
            t.lockOnAnimating !== p && (e.lockOnAnimating = t.lockOnAnimating),
            t.preventDefault !== p && (e.preventDefault = t.preventDefault)),
            e
        }
        function c(t, e, n, i) {
            this.enableTransform = i.enableTransform,
            this.dom = t,
            this.banners = i.banners,
            this.step = parseInt(e) || 0,
            this.count = parseInt(n) || 0,
            this.itemIndex = 0,
            this.curDistance = 0,
            this.distance = 0,
            this.preDistance = 0,
            this.handlers = {},
            this.status = w.READY,
            this.enableSwitch = !0,
            this.option = s(i),
            this.autoRunTimer = [],
            this._init()
        }
        var u, l = n("51LH"), h = l.getResponsiveMode, d = document, f = window, p = void 0, m = "", b = "", v = ["webkit", "ms", "o", "moz"], y = d.createElement("div"), w = {
            READY: 1,
            TOUCH_START: 2,
            TOUCH_MOVE: 3,
            TOUCH_END: 4,
            ANIMATING: 5
        }, g = {
            X: "X",
            Y: "Y"
        }, T = y.style, x = "transform";
        u = x.charAt(0).toUpperCase() + x.substr(1);
        for (var A, I, k = 0; A = v[k]; k++)
            if (I = A + u,
            I in T) {
                b = A;
                break
            }
        x in T || (m = b);
        var _ = function() {
            return f.requestAnimationFrame || f.webkitRequestAnimationFrame || f.mozRequestAnimationFrame || f.oRequestAnimationFrame || f.msRequestAnimationFrame || function(t) {
                f.setTimeout(t, 1e3 / 60)
            }
        }();
        c.prototype = {
            link: function(t) {
                t instanceof c && (this.on("touchmove", function(e, n) {
                    t.move(n)
                }),
                this.on("locate", function(e) {
                    t.locate(e)
                }),
                this.on("animationinterrupt", function() {
                    t.animationInterrupt()
                }))
            },
            locate: function() {
                var t, e, n = !0, i = 0, o = this;
                if ("boolean" == typeof arguments[0] && (n = arguments[0],
                i++),
                t = arguments[i],
                e = arguments[i + 1],
                t === p && (t = this.itemIndex),
                t = parseInt(t) || 0,
                this._isCircleLayout || (t < 0 && (t = 0),
                t > this.count - 1 && (t = this.count - 1)),
                this.lastDistance = this.curDistance,
                this.curDistance = 0 - this.step * t,
                this.banners.css("zIndex", 0),
                this.enableTransform)
                    if (n) {
                        if ("ms" == b)
                            return $(this.dom).stop(!0, !0).animate({
                                marginLeft: this.curDistance
                            }, 300, function() {
                                e && e(t),
                                o._emit("locateEnd", [t]),
                                o.loopStartOrEnd()
                            }),
                            o.itemIndex = t,
                            void o._emit("locate", [t]);
                        this._animate(this._makeTransformValue(this.curDistance), function() {
                            e && e(t),
                            o._emit("locateEnd", [t])
                        })
                    } else {
                        if ("ms" == b)
                            return $(this.dom).css("marginLeft", this.curDistance),
                            o.itemIndex = t,
                            void o._emit("locate", [t]);
                        this._transform(this._makeTransformValue(this.curDistance))
                    }
                else {
                    if (n)
                        return this.status = w.ANIMATING,
                        o._emit("locate", [t]),
                        void this.banners.eq(t).animate({
                            opacity: 1
                        }, "slow", function() {
                            e && e(t),
                            o.itemIndex = t,
                            $(this).css("zIndex", 0),
                            o._emit("locateEnd", [t]),
                            o.loopStartOrEnd(),
                            o.status = w.READY
                        }).siblings().animate({
                            opacity: 0
                        }, "fast", function() {
                            $(this).css("zIndex", -1)
                        });
                    this.banners.eq(t).css({
                        opacity: 1,
                        zIndex: 0
                    }).siblings().css({
                        opacity: 0,
                        zIndex: -1
                    })
                }
                this.itemIndex = t,
                this._emit("locate", [t])
            },
            next: function() {
                this.locate(this.itemIndex + 1)
            },
            prev: function() {
                this.locate(this.itemIndex - 1)
            },
            disable: function() {
                this.enableSwitch = !1
            },
            enable: function() {
                this.enableSwitch = !0
            },
            move: function(t) {
                var e, n = 0;
                t = parseFloat(t),
                e = Math.abs(t),
                e >= 1 ? n = t : e > 0 && (n = parseInt(this.step * t) || 0),
                n && this._move(function() {
                    this._transform(this._makeTransformValue(this.curDistance + n / 2)),
                    n = p
                })
            },
            updateStep: function(t) {
                t = parseInt(t),
                "ms" == b && $(this.dom).css("marginLeft", 0),
                t && (this.step = t,
                this.locate(!1))
            },
            animationInterrupt: function() {
                var t = this._getCurrentDistance();
                return this._transform(this._makeTransformValue(t)),
                this._animateEnd(),
                t
            },
            on: function(t, e) {
                this.handlers[t] || (this.handlers[t] = []),
                this.handlers[t].push(e)
            },
            _emit: function(t, e) {
                var n = this.handlers[t];
                if (n && n.length)
                    for (var i, o = 0; i = n[o]; o++)
                        i.apply && i.apply(this, e || [])
            },
            _init: function() {
                this._initTransformProperty(),
                this.option.disableTouch || this._initAnimation();
                var t = this
                  , e = this.option.touchArea
                  , n = function() {
                    t.areaDistance = t.direction == g.Y ? e.offsetHeight : e.offsetWidth,
                    t.areaDistance || (t.areaDistance = t.direction == g.Y ? f.innerHeight : f.innerWidth)
                };
                f.addEventListener("resize", n, !1),
                n()
            },
            _initAnimation: function() {
                var t = this
                  , e = this.option.touchArea;
                $(e).on("click", ".pre", function(e) {
                    return (!t.option.autoAnimationDuration || t.status != w.ANIMATING) && (t.preAutoRun(),
                    void t.prev())
                }),
                $(e).on("click", ".next", function(e) {
                    return (!t.option.autoAnimationDuration || t.status != w.ANIMATING) && (t.preAutoRun(),
                    void t.next())
                }),
                $(e).find(".hero-tab a").on("click", function() {
                    if (t.option.autoAnimationDuration && t.status == w.ANIMATING)
                        return !1;
                    t.preAutoRun();
                    var e = parseInt($(this).attr("ix"), 10) + 1;
                    e !== t.itemIndex && t.locate(!0, e)
                }),
                $(e).on("mouseenter", function() {
                    t.stopAutoRun()
                }),
                $(e).on("mouseleave", function() {
                    t.preAutoRun()
                }),
                f.navigator.msPointerEnabled ? (e.addEventListener("MSPointerDown", function(e) {
                    e.pointerType == e.MSPOINTER_TYPE_TOUCH && t._touchStart(e, e)
                }, !1),
                e.addEventListener("MSPointerMove", function(e) {
                    e.pointerType == e.MSPOINTER_TYPE_TOUCH && t._touchMove(e, e)
                }, !1),
                e.addEventListener("MSPointerUp", function(e) {
                    e.pointerType == e.MSPOINTER_TYPE_TOUCH && t._touchEnd(e)
                }, !1)) : (e.addEventListener("touchstart", function(e) {
                    t._touchStart(e, e.targetTouches[0])
                }, !1),
                e.addEventListener("touchmove", function(e) {
                    t._touchMove(e, e.targetTouches[0])
                }, !1),
                e.addEventListener("touchend", function(e) {
                    t._touchEnd(e)
                }, !1))
            },
            _initTransformProperty: function() {
                var t, e, n = this.option.transformProperty, i = g.X, o = !0, s = this, c = function(t) {
                    var e = (s.curDistance + s.lastDistance) / 2
                      , n = e % 360;
                    n > 180 ? n -= 360 : n < -180 && (n += 360);
                    var i = t - n;
                    return e + i
                };
                switch (n) {
                default:
                case "translateX":
                    n = "translate3d",
                    t = "{val}px,0,0",
                    e = function(t) {
                        return 6 == t.length ? parseInt(t[4]) : 16 == t.length ? parseInt(t[12]) : void 0
                    }
                    ;
                    break;
                case "translateY":
                    n = "translate3d",
                    t = "0,{val}px,0",
                    i = g.Y,
                    e = function(t) {
                        return 6 == t.length ? parseInt(t[5]) : 16 == t.length ? parseInt(t[13]) : void 0
                    }
                    ;
                    break;
                case "translateZ":
                    n = "translate3d",
                    t = "0,0,{val}px",
                    e = function(t) {
                        return parseInt(t[14])
                    }
                    ;
                    break;
                case "rotateX":
                    t = "{val}deg",
                    i = g.Y,
                    o = !0,
                    e = function(t) {
                        var e = parseFloat(t[5]).toFixed(2)
                          , n = parseFloat(t[6])
                          , i = Math.acos(e) / Math.PI * 180
                          , o = n >= 0 ? i : 0 - i;
                        return c(o)
                    }
                    ;
                    break;
                case "rotateY":
                    t = "{val}deg",
                    o = !0,
                    e = function(t) {
                        var e = parseFloat(t[0]).toFixed(2)
                          , n = parseFloat(t[8])
                          , i = Math.acos(e) / Math.PI * 180
                          , o = n >= 0 ? i : 0 - i;
                        return c(o)
                    }
                    ;
                    break;
                case "rotateZ":
                    t = "{val}deg",
                    o = !0,
                    e = function(t) {
                        var e = 0
                          , n = 0;
                        6 == t.length ? (e = parseFloat(t[0]).toFixed(2),
                        n = parseFloat(t[1])) : 16 == t.length;
                        var i = Math.acos(e) / Math.PI * 180
                          , o = n >= 0 ? i : 0 - i;
                        return c(o)
                    }
                }
                this._makeTransformValue = function(e) {
                    var i = {};
                    return i[n] = t.replace("{val}", e),
                    i
                }
                ,
                this._getCurrentDistance = function() {
                    var t = r(this.dom, "transform");
                    t = t.replace(/^matrix(?:3d)?\((.+)\)$/, "$1");
                    var n = t.split(",") || [];
                    return e(n)
                }
                ,
                this.DPI = a()[i],
                this.direction = i,
                this._isCircleLayout = o
            },
            _transform: function(t) {
                this._curTransformObj || (this._curTransformObj = {});
                for (var e in t)
                    this._curTransformObj[e] = t[e];
                var n = [];
                for (var i in this._curTransformObj)
                    n.push(i, "(", this._curTransformObj[i], ")");
                n.length && r(this.dom, "transform", n.join(""))
            },
            _parseDistance: function(t) {
                return parseInt(parseFloat(t) / this.areaDistance * this.step)
            },
            _touchStart: function(t, e) {
                if (this.enableSwitch) {
                    var n = this.curDistance;
                    if (this.status == w.ANIMATING) {
                        if (this.boundaryMode || this.option.lockOnAnimating)
                            return;
                        n = this.animationInterrupt(),
                        this._emit("animationinterrupt")
                    }
                    this.oriDistance = 0,
                    this.distance = 0,
                    this.preDistance = n - this.curDistance,
                    this.status = w.TOUCH_START,
                    this.startTime = new Date,
                    this.motionable = !0,
                    this.touchDirection = 0,
                    this.startPos = {
                        X: e.pageX,
                        Y: e.pageY
                    },
                    this.startValue = this.startPos[this.direction],
                    this._emit("touchstart", [t])
                }
            },
            _touchMove: function(t, e) {
                if (this.enableSwitch) {
                    if ("auto" === this.option.preventDefault) {
                        if (!this.touchDirection) {
                            var n = Math.abs(e.pageX - this.startPos.X)
                              , i = Math.abs(e.pageY - this.startPos.Y);
                            0 == n && 0 == i || (this.touchDirection = n > i ? g.X : g.Y)
                        }
                        if (this.touchDirection != this.direction)
                            return;
                        t.preventDefault()
                    } else
                        this.option.preventDefault === !0 && t.preventDefault();
                    if (this.motionable) {
                        var o = e["page" + this.direction];
                        this.oriDistance = o - this.startValue,
                        this.status != w.TOUCH_START && this.status != w.TOUCH_MOVE || this.oriDistance && (this.distance = this._parseDistance(this.oriDistance) + this.preDistance / this.option.slideRatio,
                        this.timeSpan = new Date - this.startTime,
                        this._move(function() {
                            var t = !0;
                            if (0 === this.itemIndex && this.distance > 0 || this.itemIndex == this.count - 1 && this.distance < 0)
                                if (this.option.disableBoundaryMove)
                                    t = !1;
                                else {
                                    var e = c.ext.boundaryAnimation[this.option.boundaryAnimationName];
                                    e && e.touchMove && (this.boundaryMode = !0,
                                    e.touchMove.call(this),
                                    t = !1)
                                }
                            t && (this.boundaryMode = !1,
                            this.option.slideRatio && (this.status = w.TOUCH_MOVE,
                            this._transform(this._makeTransformValue(this.curDistance + this.distance * this.option.slideRatio))))
                        }),
                        this._emit("touchmove", [t, this.distance]))
                    }
                }
            },
            _touchEnd: function(t) {
                if (this.enableSwitch && this.motionable) {
                    if (this.motionable = !1,
                    this.boundaryMode) {
                        var e = c.ext.boundaryAnimation[this.option.boundaryAnimationName];
                        e && e.touchEnd && e.touchEnd.call(this)
                    } else if (0 !== this.distance || 0 !== this.preDistance) {
                        var n = this.itemIndex;
                        this.oriDistance && (Math.abs(this.oriDistance / this.DPI) / this.timeSpan * 1e3 > this.option.speedThreshold || Math.abs(this.oriDistance) > this.areaDistance * this.option.nextRatio) && (this.oriDistance < 0 ? n++ : n--),
                        this.locate(n)
                    } else
                        this.status == w.READY;
                    this._emit("touchend", [t]),
                    this.preAutoRun()
                }
            },
            _move: function(t) {
                if (this._curFrameFn = t,
                !this.moveFrameFilled) {
                    this.moveFrameFilled = !0;
                    var e = this;
                    _(function() {
                        e.moveFrameFilled = !1,
                        e.status != w.ANIMATING && e._curFrameFn && e._curFrameFn.call(e),
                        e._curFrameFn = p
                    })
                }
            },
            _animate: function(t, e) {
                this.status = w.ANIMATING,
                this.option.autoAnimationDuration = "mobile" == h() ? 200 : 500,
                r(this.dom, "transition", [i("transform"), " ", this.option.autoAnimationDuration, "ms ease-out"].join(""));
                var n = this
                  , a = this.dom.endFn = function(t) {
                    t && t.target !== n.dom || (n._animateEnd(),
                    t && t.stopPropagation(),
                    e && e())
                }
                ;
                this.dom.addEventListener("transitionEnd", a, !1),
                this.dom.addEventListener(o("transitionEnd"), a, !1),
                this.dom.animationTimer = setTimeout(a, this.option.autoAnimationDuration + 50),
                this._transform(t)
            },
            _animateEnd: function() {
                this.status = w.READY,
                r(this.dom, "transition", ""),
                this.dom.removeEventListener("transitionEnd", this.dom.endFn, !1),
                this.dom.removeEventListener(o("transitionEnd", !0), this.dom.endFn, !1),
                clearTimeout(this.dom.animationTimer),
                this.dom.endFn = null,
                this.loopStartOrEnd()
            },
            transformSwitch: function(t) {
                this.enableTransform = !!t,
                t || $(this.dom).css("transform", "none")
            },
            loopStartOrEnd: function() {
                if (!this._isCircleLayout)
                    return !1;
                var t = this.itemIndex;
                t > this.count ? t = 1 : t < 1 && (t = this.count),
                t !== this.itemIndex && this.locate(!1, t),
                this.itemIndex = t
            },
            preAutoRun: function() {
                var t = this;
                t.stopAutoRun(),
                t.autoRunTimer.push(setTimeout(function() {
                    t.autoRun()
                }, 1 * t.option.autoRunTimeSpan))
            },
            autoRun: function() {
                var t = this;
                t.autoRunTimer.push(setInterval(function() {
                    t.next()
                }, 5 * t.option.autoRunTimeSpan))
            },
            stopAutoRun: function() {
                for (var t = 0; t < this.autoRunTimer.length; t++)
                    clearTimeout(this.autoRunTimer[t]);
                this.autoRunTimer = []
            }
        },
        c.prototype.constructor = c,
        c.ext = {},
        c.ext.boundaryAnimation = {},
        t.exports = c
    },
    "51LH": function(t, e) {
        "use strict";
        var n = function() {
            return document.documentElement.clientWidth
        };
        t.exports = {
            getClientWidth: n,
            getResponsiveMode: function() {
                var t = n();
                return t <= 414 ? "mobile" : t > 414 && t <= 768 ? "pad" : t > 768 ? "pc" : void 0
            },
            isPhone: function() {
                var t = navigator.userAgent;
                return !(!/AppleWebKit.*Mobile/i.test(t) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(t) || /iPad/i.test(t))
            },
            getWindowWidth: function() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            }
        }
    },
    "VGm/": function(t, e) {
        "use strict";
        for (var n, i = 0, o = "webkit moz ms o".split(" "), r = window.requestAnimationFrame, a = window.cancelAnimationFrame, s = 0; s < o.length && (!r || !a); s++)
            n = o[s],
            r = r || window[n + "RequestAnimationFrame"],
            a = a || window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"];
        r && a || (r = function(t, e) {
            var n = (new Date).getTime()
              , o = Math.max(0, 16 - (n - i))
              , r = window.setTimeout(function() {
                t(n + o)
            }, o);
            return i = n + o,
            r
        }
        ,
        a = function(t) {
            window.clearTimeout(t)
        }
        ),
        t.exports.requestAnimationFrame = r,
        t.exports.cancelAnimationFrame = a
    },
    "/o+i": function(t, e) {
        "use strict";
        function n(t, e, n, i, o, r, a) {
            this.x1 = t,
            this.y1 = e,
            this.x2 = n,
            this.y2 = i,
            this.detalX = n - t,
            this.detalY = i - e,
            this.angle = Math.atan2(i - e, n - t),
            this.x = t,
            this.y = e,
            this.context = o,
            this.lineW = r,
            this.cubeActive = !1,
            this.canW = this.context.canvas.width,
            this.canH = this.context.canvas.height,
            this.fillStyle = a
        }
        function i(t, e, n, i) {
            this.nIndex = 0,
            this.p = t,
            this.totalLength = u(1, this.p),
            this.context = e,
            this.lineW = n,
            this.cubeActive = !1,
            this.canW = this.context.canvas.width,
            this.canH = this.context.canvas.height,
            this.fillStyle = i
        }
        function o(t, e) {
            var n = 1 - t;
            return n * n * n * e[0][0] + 3 * n * n * t * e[1][0] + 3 * n * t * t * e[2][0] + t * t * t * e[3][0]
        }
        function r(t, e) {
            var n = 1 - t;
            return n * n * n * e[0][1] + 3 * n * n * t * e[1][1] + 3 * n * t * t * e[2][1] + t * t * t * e[3][1]
        }
        function a(t, e) {
            var n = 1 - t;
            return -3 * e[0][0] * n * n + 3 * e[1][0] * n * n - 6 * e[1][0] * n * t + 6 * e[2][0] * n * t - 3 * e[2][0] * t * t + 3 * e[3][0] * t * t
        }
        function s(t, e) {
            var n = 1 - t;
            return -3 * e[0][1] * n * n + 3 * e[1][1] * n * n - 6 * e[1][1] * n * t + 6 * e[2][1] * n * t - 3 * e[2][1] * t * t + 3 * e[3][1] * t * t
        }
        function c(t, e) {
            var n = a(t, e)
              , i = s(t, e);
            return Math.sqrt(n * n + i * i)
        }
        function u(t, e) {
            var n = 1e4
              , i = n * t;
            if (1 & i && i++,
            0 == i)
                return 0;
            for (var o = i / 2, r = 0, a = 0, s = t / i, u = 0; u < o; u++)
                r += c((2 * u + 1) * s, e);
            for (var l = 1; l < o; l++)
                a += c(2 * l * s, e);
            return (c(0, e) + c(1, e) + 2 * a + 4 * r) * s / 3
        }
        function l(t, e, n) {
            for (var i, o = t * e, r = t; ; ) {
                if (i = r - (u(r, n) - o) / c(r, n),
                Math.abs(r - i) < 1e-4)
                    break;
                r = i
            }
            return i
        }
        function h(t, e, n, i) {
            this.size = e,
            this.curSize = i,
            this.oriSize = i,
            this.context = n,
            this.point = t,
            this.isABack = !1
        }
        function d(t) {
            t.beginPath(),
            t.clearRect(0, 0, t.canvas.width, t.canvas.height)
        }
        function f(t, e, n, i) {
            var o = document.createElement("canvas");
            return i.appendChild(o),
            o.className = n,
            o.width = t,
            o.height = e,
            o
        }
        function p(t) {
            var e, o, r = t.lines || [], a = t.w || 0, s = t.h || 0, c = t.wrap, u = t.opacity || .89, l = t.fillStyle || "rgba(0,215,255,1)", d = t.isCubeA || !1, p = t.speedLine || 2, m = t.speedCurve || 2, b = [], v = f(a, s, "layer1", c), y = v.getContext("2d");
            d && (e = f(a, s, "layer2", c),
            o = e.getContext("2d")),
            r.forEach(function(t, e) {
                b[e] = [],
                t.forEach(function(t, r) {
                    var a, s = t.length;
                    switch (s) {
                    case 4:
                        if (a = new n(t[0][0],t[0][1],t[1][0],t[1][1],y,t[2],l),
                        a.name = "line",
                        t[3] > 0) {
                            var c = new h(t[1],t[3] + 1,o,t[3]);
                            a.blinkCube = c
                        }
                        a.speed = p,
                        a.speedX = a.speed * Math.cos(a.angle),
                        a.speedY = a.speed * Math.sin(a.angle);
                        break;
                    case 6:
                        if (a = new i(t.slice(0, 4),y,t[4],l),
                        a.name = "curve",
                        t[5] && t[5] > 0) {
                            var c = new h(t[3],t[5] + 1,o,t[5]);
                            a.blinkCube = c
                        }
                        a.STEP = Math.floor(a.totalLength / m);
                        break;
                    default:
                        console.log("\u8f93\u5165\u6570\u636e\u6709\u8bef")
                    }
                    b[e].push(a)
                })
            }),
            b.forEach(function(t, e) {
                t.len = t.length,
                t.curIndex = 0
            }),
            this.active = !1,
            this.orderLines = b,
            this.ctxLayer2 = o,
            this.ctxLayer1 = y,
            this.opacity = u,
            this.w = a,
            this.h = s,
            this.canvas1 = v,
            this.canvas2 = e,
            this.orderLines.finishedNum = b.length,
            this.orderLines.reset = function(t) {
                t.orderLines.forEach(function(e) {
                    e.forEach(function(t, e) {
                        t.reset(),
                        t.blinkCube && t.blinkCube.reset()
                    }),
                    t.orderLines.finishedNum = t.orderLines.length,
                    e.curIndex = 0
                })
            }
        }
        function m(t, e, n, i) {
            t.globalCompositeOperation = "destination-in",
            t.fillStyle = "hsla(180, 100%, 50%," + e + ")",
            t.beginPath(),
            t.fillRect(0, 0, n, i),
            t.globalCompositeOperation = "source-over"
        }
        n.prototype.draw = function() {
            this.context.beginPath(),
            this.context.arc(this.x, this.y, this.lineW, 0, 2 * Math.PI),
            this.context.fillStyle = this.fillStyle,
            this.context.fill()
        }
        ,
        n.prototype.update = function() {
            this.cubeActive || (this.dis = Math.sqrt(Math.pow(this.x2 - this.x, 2) + Math.pow(this.y2 - this.y, 2)),
            this.dis > this.speed ? (this.x += this.speedX,
            this.y += this.speedY) : this.cubeActive = !0,
            this.draw())
        }
        ,
        n.prototype.reset = function() {
            this.x = this.x1,
            this.y = this.y1,
            this.cubeActive = !1
        }
        ,
        i.prototype.draw = function() {
            this.context.beginPath(),
            this.context.arc(this.x, this.y, this.lineW, 0, 2 * Math.PI),
            this.context.fillStyle = this.fillStyle,
            this.context.fill(),
            this.context.restore()
        }
        ,
        i.prototype.update = function() {
            if (this.nIndex >= 0 && this.nIndex <= this.STEP) {
                var t = this.nIndex / this.STEP;
                t = l(t, this.totalLength, this.p),
                this.x = o(t, this.p),
                this.y = r(t, this.p),
                this.draw(),
                this.nIndex++
            } else
                this.cubeActive = !0
        }
        ,
        i.prototype.reset = function() {
            this.nIndex = 0,
            this.cubeActive = !1
        }
        ,
        h.prototype.update = function() {
            this.isABack ? this.curSize > this.oriSize && (this.curSize -= .05,
            this.draw()) : this.curSize < this.size ? (this.curSize += .1,
            this.draw()) : (this.isABack = !0,
            this.draw())
        }
        ,
        h.prototype.draw = function() {
            this.context.save(),
            this.context.beginPath(),
            this.context.fillStyle = "rgba(3,104,193,1)",
            this.context.shadowBlur = 20,
            this.context.shadowColor = "rgba(0,180,255,1)",
            this.context.fillRect(this.point[0] - this.curSize / 2, this.point[1] - this.curSize / 2, this.curSize, this.curSize),
            this.context.closePath(),
            this.context.fill(),
            this.context.restore()
        }
        ,
        h.prototype.reset = function() {
            this.isABack = !1,
            this.curSize = this.oriSize
        }
        ,
        p.prototype.update = function() {
            var t = this.orderLines.length
              , e = this;
            e.active ? (e.canvas1.style.display = "block",
            e.canvas2 && (e.canvas2.style.display = "block"),
            t > 0 && (e.ctxLayer2 && d(e.ctxLayer2),
            m(e.ctxLayer1, e.opacity, e.w, e.h),
            e.orderLines.forEach(function(t, n) {
                if (t.curIndex < t.len) {
                    var i = t[t.curIndex]
                      , o = t.curIndex - 1 > 0 ? t.curIndex - 1 : 0
                      , r = t[o];
                    i.update(),
                    r.cubeActive && r.blinkCube && r.blinkCube.update(),
                    i.cubeActive && t.curIndex === t.len - 1 && e.orderLines.finishedNum--,
                    i.cubeActive && t.curIndex < t.len && t.curIndex++,
                    0 === e.orderLines.finishedNum && e.orderLines.reset(e)
                }
            }))) : (e.canvas1.style.display = "none",
            e.canvas2 && (e.canvas2.style.display = "none"))
        }
        ,
        t.exports.BannerAnimateWrapper = p
    },
    "9n8x": function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = n("Sawl")
          , c = n("dwAR")
          , u = n("wh6W")
          , l = "actived"
          , h = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            a(e, [{
                key: "onInit",
                value: function() {
                    this.$tabs = this.$(".J-pdTab"),
                    this.$mTabs = this.$(".J-pdMTab"),
                    this.$tabGroups = this.$(".home-product-tab"),
                    this.$tabPanels = this.$(".J-pdTabPanel"),
                    this.$tabContents = this.$(".J-pdTabContent"),
                    this.expanded = !1,
                    this.renderView(),
                    this.bindEvents(),
                    this.bindAriaEvents()
                }
            }, {
                key: "onResize",
                value: function() {
                    "wide" === this.getScreenMode() && this._renderTab()
                }
            }, {
                key: "onNarrow",
                value: function() {
                    this._renderNarrowView()
                }
            }, {
                key: "onWiden",
                value: function() {
                    this._renderWideView()
                }
            }, {
                key: "renderView",
                value: function() {
                    this._renderTab(),
                    "wide" === this.getScreenMode() ? this._renderWideView() : this._renderNarrowView()
                }
            }, {
                key: "_renderTab",
                value: function() {
                    var t = this
                      , e = $(window);
                    e.width();
                    t.currTab = t.currTab || t.$(".J-pdTab").data("target");
                    var n = t.$tabs.filter('[data-target="' + t.currTab + '"]')
                      , i = t.$mTabs.filter('[data-target="' + t.currTab + '"]');
                    n.closest("ul").next();
                    t.$tabs.removeClass(l),
                    t.$mTabs.removeClass(l),
                    n.addClass(l),
                    i.addClass(l),
                    this._renderUnderline(n, !0)
                }
            }, {
                key: "_renderUnderline",
                value: function(t, e) {
                    var n = t.closest("ul").next()
                      , i = t.index() * t.width();
                    e ? n.css({
                        "-webkit-transition-property": "none",
                        "transition-property": "none"
                    }) : n.css({
                        "-webkit-transition-property": "",
                        "transition-property": ""
                    }),
                    this.$(".J-pdUnderline").css("visibility", "hidden"),
                    n.css({
                        visibility: "visible",
                        left: i,
                        width: t.width()
                    })
                }
            }, {
                key: "_renderWideView",
                value: function() {
                    var t = this
                      , e = t.$('.J-pdTabContent[data-id="' + t.currTab + '"]')
                      , n = e.closest(".J-pdTabPanel");
                    t.$tabPanels.hide(),
                    n.show(),
                    e.show().siblings().hide(),
                    this.$tabPanels.find("ul").show(),
                    t.$tabGroups.show()
                }
            }, {
                key: "_renderNarrowView",
                value: function() {
                    var t = this
                      , e = t.$('.J-pdTabContent[data-id="' + t.currTab + '"]');
                    e.closest(".J-pdTabPanel");
                    t.$tabPanels.css({
                        height: "initial"
                    }).show(),
                    t.$tabContents.show(),
                    t.$tabContents.children("ul").hide(),
                    e.children("ul").show(),
                    t.$tabGroups.filter(".J-pdMHiddenContent").toggle(t.expanded)
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var t = this;
                    $(window);
                    this.$root.on("click", ".J-pdTab", function() {
                        var e = $(this)
                          , n = t.currTab
                          , i = e.data("target");
                        t.currTab = i,
                        t.$tabs.removeClass(l).find("a").attr("aria-selected", !1),
                        e.addClass(l).find("a").attr("aria-selected", !0),
                        t.performWideModeAnimation(n, i)
                    }),
                    this.$root.on("click", ".J-pdMTab", function() {
                        var e = $(this)
                          , n = t.currTab
                          , i = e.data("target");
                        t.$mTabs.removeClass(l),
                        n == i ? t.currTab = "" : (t.currTab = i,
                        e.addClass(l)),
                        t.performNarrowModeAnimation(n, i)
                    }),
                    this.$root.on("click", ".J-pdTrigger", function() {
                        var e = $(this);
                        t.expanded = !t.expanded,
                        e.toggleClass("show", t.expanded).text(t.expanded ? "\u6536\u8d77" : "\u5c55\u5f00"),
                        t.$tabGroups.filter(".J-pdMHiddenContent").toggle(t.expanded)
                    })
                }
            }, {
                key: "bindAriaEvents",
                value: function() {
                    var t = this;
                    u.bindCommonKeyEvents(t.$tabs, "a", {
                        onConfirm: function(t) {
                            $(this).parent().trigger("click")
                        },
                        onMove: function(e, n) {
                            var i = $(this).parent()
                              , o = t.$tabs
                              , r = o.length
                              , a = o.index(i)
                              , s = (r + a + n) % r;
                            o.eq(s).find("a").focus(),
                            e.preventDefault()
                        }
                    }),
                    u.bindCommonKeyEvents(t.$tabContents, "a", {
                        onEsc: function(e) {
                            t.$tabs.filter(".actived").find("a").focus()
                        }
                    })
                }
            }, {
                key: "performWideModeAnimation",
                value: function(t, e) {
                    if (t !== e) {
                        var n = this
                          , i = (n.$tabs.filter('[data-target="' + t + '"]'),
                        n.$('.J-pdTabContent[data-id="' + t + '"]'))
                          , o = i.closest(".J-pdTabPanel")
                          , r = i.height();
                        if (t !== e) {
                            var a = n.$tabs.filter('[data-target="' + e + '"]')
                              , s = n.$('.J-pdTabContent[data-id="' + e + '"]')
                              , c = s.closest(".J-pdTabPanel")
                              , u = void 0
                              , l = n.userHeightAnimation() && !1;
                            if (o[0] == c[0])
                                n._renderUnderline(a),
                                l ? (o.height(r),
                                i.stop(!0, !0).fadeOut("fast", function() {
                                    s.css("opacity", 0).show(),
                                    u = s.height(),
                                    s.stop(!0, !0).animate({
                                        opacity: 1
                                    }, "fast"),
                                    o.animate({
                                        height: u
                                    }, 300)
                                })) : i.stop(!0, !0).fadeOut("fast", function() {
                                    s.fadeIn()
                                });
                            else if (n._renderUnderline(a, !0),
                            s.show().siblings().hide(),
                            l) {
                                var h = $.Deferred();
                                o.slideUp("fast", function() {
                                    h.resolve()
                                }).css({
                                    height: "initial"
                                });
                                var d = $.Deferred();
                                c.css({
                                    height: "initial"
                                }).slideDown("fast", function() {
                                    d.resolve()
                                }),
                                $.when(h, d).done(function() {
                                    n.ensureTabInView(a)
                                })
                            } else
                                o.hide(),
                                c.show(),
                                n.ensureTabInView(a)
                        }
                    }
                }
            }, {
                key: "ensureTabInView",
                value: function(t) {
                    var e = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                      , n = t.offset().top;
                    n < e && window.scrollTo(0, n)
                }
            }, {
                key: "performNarrowModeAnimation",
                value: function(t, e) {
                    var n = self.$('.J-pdTabContent[data-id="' + t + '"]')
                      , i = (n.closest(".J-pdTabPanel"),
                    n.find("ul"));
                    if (t === e)
                        return void i.slideToggle("fast");
                    var o = self.$('.J-pdTabContent[data-id="' + e + '"]')
                      , r = (o.closest(".J-pdTabPanel"),
                    o.find("ul"));
                    i.hide(),
                    r.show(),
                    $("html, body").not(":animated").animate({
                        scrollTop: o.offset().top
                    }, "fast")
                }
            }, {
                key: "userHeightAnimation",
                value: function() {
                    return !("safari" === s.getBrowserType() && !/iPad/i.test(navigator.userAgent))
                }
            }]),
            e
        }(c);
        t.exports = h
    },
    "+V/N": function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = n(1)
          , c = n("dwAR")
          , u = n("qI2I")
          , l = n("Sawl")
          , h = n("VGm/")
          , d = h.requestAnimationFrame
          , f = h.cancelAnimationFrame
          , p = n("/o+i")
          , m = p.BannerAnimateWrapper
          , b = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            a(e, [{
                key: "onInit",
                value: function() {
                    if (this.$bannerWrapper = $("#heroBanner"),
                    this.$banners = $(".J-hero-img"),
                    this.length = this.$banners.length,
                    this.enableAnimation = this.isAnimationSupport(),
                    this.enableTransform = l.isSupportTouchEvent(),
                    this.bindEvents(),
                    this.setBgImageByMode(this.getScreenMode()),
                    this.enableTransform ? this.setupTouchableBanner() : this.setupNormalBanner(),
                    this.enableAnimation)
                        try {
                            this.setupAnimation(this.options.animations)
                        } catch (t) {
                            this.enableAnimation = !1,
                            console.error(t)
                        }
                }
            }, {
                key: "setupNormalBanner",
                value: function() {
                    function t(t) {
                        if (t = (t + c) % c,
                        t !== u) {
                            var e = r.eq(t)
                              , n = r.eq(u);
                            a.eq(t).addClass("selected").siblings().removeClass("selected"),
                            o.$bannerWrapper.css("background-color", e.data("bgcolor")),
                            e.css("z-index", 0).animate({
                                opacity: 1
                            }, "slow"),
                            n.animate({
                                opacity: 0
                            }, "fast", function() {
                                n.css("z-index", -1)
                            }),
                            o.enableAnimation && o.updateAnimatedBanner(t),
                            u = t
                        }
                    }
                    function e() {
                        i || (i = setInterval(function() {
                            t(u + 1)
                        }, l))
                    }
                    function n() {
                        i && (clearInterval(i),
                        i = null)
                    }
                    var i, o = this, r = o.$banners, a = o.$bannerWrapper.find(".hero-tab li"), s = o.$bannerWrapper.find(".switch-control"), c = o.length = r.length, u = 0, l = 5e3;
                    r.css({
                        display: "inline-block",
                        position: "absolute",
                        top: 0,
                        left: 0
                    }).eq(0).siblings().css({
                        opacity: 0,
                        "z-index": -1
                    }),
                    a.on("click", function() {
                        var e = a.index($(this));
                        t(e)
                    }),
                    s.on("click", function() {
                        var e = $(this).hasClass("next") ? 1 : -1;
                        t(u + e)
                    }),
                    o.$bannerWrapper.on("mouseenter", function(t) {
                        n()
                    }).on("mouseleave", function(t) {
                        e()
                    }).on("mousemove.init", function(t) {
                        n(),
                        o.$bannerWrapper.off("mousemove.init")
                    }),
                    e()
                }
            }, {
                key: "setupTouchableBanner",
                value: function() {
                    var t = this
                      , e = this.$banners
                      , n = this.$bannerWrapper
                      , i = e.first()
                      , o = e.last()
                      , r = i.clone(!0)
                      , a = o.clone(!0)
                      , s = $(".hero-tab li")
                      , c = t.length = e.length;
                    a.insertBefore(i),
                    r.insertAfter(o);
                    var l = t.layoutBanner()
                      , h = t.slider = new u($(".hero-img")[0],l,c,{
                        touchArea: $(".hero-inner")[0],
                        banners: $(".J-hero-img"),
                        enableTransform: this.enableTransform
                    });
                    h.locate(!1, 1),
                    h.preAutoRun(),
                    h.on("locate", function(t) {
                        var i = (t - 1 + c) % c
                          , o = e.eq(i);
                        s.eq(i).addClass("selected").siblings().removeClass("selected"),
                        n.css({
                            "background-color": o.data("bgcolor")
                        })
                    })
                }
            }, {
                key: "setupAnimation",
                value: function(t) {
                    for (var e = $(".J-bannerWrappedCanvas"), n = this.animateBanners = [], i = (this.animationTask = null,
                    this.getScreenMode()), o = this.length, r = 0; r < o; r++)
                        t[r].wrap = e[r],
                        n.push(new m(t[r]));
                    n[0].active = !0,
                    "wide" === i && this.toggleBannerAnimation()
                }
            }, {
                key: "updateAnimatedBanner",
                value: function(t) {
                    for (var e = 0; e < this.length; e++)
                        this.animateBanners[e].active = !1;
                    t < this.length && (this.animateBanners[t].active = !0)
                }
            }, {
                key: "toggleBannerAnimation",
                value: function() {
                    function t() {
                        n.forEach(function(t) {
                            t.update()
                        }),
                        e.animationTask = d(t)
                    }
                    var e = this
                      , n = e.animateBanners;
                    e.animationTask || t()
                }
            }, {
                key: "bindEvents",
                value: function() {
                    this.$banners.on("click", function() {
                        window.open($(this).data("href"))
                    }).on("mouseenter", "a.hero-btn", function() {
                        $(this).css("color", $(this).closest(".J-hero-img").attr("data-bgcolor"));
                    }).on("mouseleave", "a.hero-btn", function() {
                        $(this).css("color", "#fff")
                    })
                }
            }, {
                key: "layoutBanner",
                value: function(t) {
                    var e = $(".J-hero-img")
                      , n = $("#heroBanner").width()
                      , i = "";
                    return i = n * e.length + "px",
                    e.each(function() {
                        var t = $(this);
                        t.css({
                            width: n + "px",
                            display: "inline-block"
                        }),
                        t.css({
                            opacity: 1,
                            position: "relative"
                        })
                    }),
                    $(".hero-img").css("width", i),
                    n
                }
            }, {
                key: "setBgImageByMode",
                value: function(t) {
                    var e = "wide" == t ? "bg" : "mbg";
                    $(".J-hero-img").each(function() {
                        $(this).css("background-image", "url(" + $(this).data(e) + ")")
                    })
                }
            }, {
                key: "onAfterResize",
                value: function() {
                    var t = this.getScreenMode();
                    this.slider && this.slider.updateStep(this.layoutBanner(t))
                }
            }, {
                key: "onWiden",
                value: function() {
                    this.setBgImageByMode("wide"),
                    this.enableAnimation && this.toggleBannerAnimation()
                }
            }, {
                key: "isAnimationSupport",
                value: function() {
                    var t = navigator.userAgent.toLowerCase();
                    return !/msie\s[9|8|7|6]/.test(t) && (!(!this.options.enableAnimation || (this.options.animations || []).length !== this.length) && s.every(this.options.animations, function(t) {
                        return s.isObject(t)
                    }))
                }
            }, {
                key: "onNarrow",
                value: function() {
                    this.setBgImageByMode("narrow"),
                    this.enableAnimation && this.animationTask && (f(this.animationTask),
                    this.animationTask = null)
                }
            }]),
            e
        }(c);
        t.exports = b
    },
    2: function(t, e) {
        t.exports = jQuery
    },
    qcm8: function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = n("dwAR")
          , c = (n(1),
        n("Sawl"))
          , u = n("wh6W")
          , l = "actived"
          , h = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            a(e, [{
                key: "onInit",
                value: function() {
                    this.$wWrapper = this.$(".J-sltWideWrapper"),
                    this.$nWrapper = this.$(".J-sltNarrowWrapper"),
                    this.$tabs = this.$(".J-sltTab"),
                    this.$sltBackground = $(".J-sltBackground"),
                    this.$mItems = this.$(".J-sltMItem"),
                    this.wPreload = !1,
                    this.nPreload = !1,
                    this.currTab = this.$tabs.eq(0).data("target"),
                    this.nextTab,
                    this.bindEvents(),
                    this.bindAriaEvents()
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var t = this
                      , e = ($(window),
                    void 0)
                      , n = $(".J-sltTab").closest(".J-sltTabGroup");
                    t.$wWrapper.on("click", ".J-sltTab", function() {
                        var n = $(this).data("target");
                        clearTimeout(e),
                        t.currTab != n && (t.currTab = n,
                        t.performTransaction($(this)))
                    }),
                    t.$wWrapper.on("mouseenter", ".J-sltTab", function() {
                        var n = this
                          , i = $(this).data("target");
                        this.nextTab = i,
                        clearTimeout(e),
                        e = setTimeout(function() {
                            n.nextTab != t.currTab && i == n.nextTab && (t.currTab = i,
                            t.performTransaction($(n)))
                        }, 200)
                    }),
                    n.on("mouseleave", function() {
                        clearTimeout(e)
                    }),
                    t.$nWrapper.on("click", ".J-sltMItemTitle", function(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                          , i = $(this)
                          , o = i.closest(".J-sltMItem")
                          , r = i.next(".J-sltMItemCont");
                        return "expand" != n.action && i.hasClass(l) ? (i.removeClass(l),
                        void r.slideUp("fast")) : (t.currTab = i.data("target"),
                        t.$(".J-sltMItemTitle").removeClass(l),
                        t.$(".J-sltMItemCont").hide(),
                        i.addClass(l),
                        r.show(),
                        void (n.noScrollToTop || $("html, body").not(":animated").animate({
                            scrollTop: o.offset().top
                        }, "fast")))
                    })
                }
            }, {
                key: "bindAriaEvents",
                value: function() {
                    var t = this;
                    u.bindCommonKeyEvents(this.$tabs, "a", {
                        onConfirm: function(t) {
                            $(this).closest(".J-sltTab").trigger("click")
                        },
                        onMove: function(e, n) {
                            var i = $(this).parent()
                              , o = t.$tabs
                              , r = o.length
                              , a = o.index(i)
                              , s = (r + a + n) % r;
                            o.eq(s).find("a").focus(),
                            e.preventDefault()
                        }
                    }),
                    u.bindCommonKeyEvents(t.$(".J-sltTabContent"), "a", {
                        onEsc: function(e) {
                            t.$tabs.filter(".actived").find("a").focus()
                        }
                    })
                }
            }, {
                key: "performTransaction",
                value: function(t) {
                    var e = this
                      , n = this
                      , i = this.currTab = t.data("target")
                      , o = n.$(".J-sltTabContent:visible")
                      , r = n.$('.J-sltTabContent[data-id="' + i + '"]')
                      , a = t.data("img");
                    t.addClass(l).attr("aria-selected", !0).siblings().removeClass(l).attr("aria-selected", !1),
                    o.stop(!0, !0).fadeOut("fast", function() {
                        i == e.currTab && (n.$(".J-sltTabContent").hide(),
                        r.stop(!0, !0).fadeIn(300))
                    }),
                    n.$sltBackground.css({
                        "background-image": "url(" + a + ")"
                    })
                }
            }, {
                key: "onNarrow",
                value: function() {
                    var t = this;
                    t.$nWrapper.find('.J-sltMItemTitle[data-target="' + t.currTab + '"]').trigger("click", {
                        action: "expand",
                        noScrollToTop: !0
                    })
                }
            }, {
                key: "onWiden",
                value: function() {
                    var t = this;
                    t.performTransaction(t.$wWrapper.find('.J-sltTab[data-target="' + t.currTab + '"]'))
                }
            }, {
                key: "onBeforeScrollIntoView",
                value: function() {
                    var t = this
                      , e = t.getScreenMode();
                    "wide" !== e || t.wPreload || (t.wPreload = !0,
                    t.doPreloadWideImage(),
                    t.nPreload = !0,
                    t.doPreloadNarrowImage()),
                    "narrow" !== e || t.nPreload || (t.nPreload = !0,
                    t.doPreloadNarrowImage())
                }
            }, {
                key: "doPreloadWideImage",
                value: function() {
                    var t = this;
                    t.$tabs.each(function() {
                        var e = $(this)
                          , n = e.data("img")
                          , i = e.data("target");
                        t.$('.J-sltTabContent[data-id="' + i + '"]');
                        c.loadImage(n, {
                            loader: "bgImage"
                        }),
                        t.$("img").each(function() {
                            var t = $(this);
                            !t.prop("src") && t.data("src") && t.prop("src", t.data("src"))
                        })
                    })
                }
            }, {
                key: "doPreloadNarrowImage",
                value: function() {
                    var t = this;
                    t.$nWrapper.find("img").each(function() {
                        var t = $(this);
                        !t.prop("src") && t.data("src") && t.prop("src", t.data("src"))
                    })
                }
            }]),
            e
        }(s);
        t.exports = h
    },
    DzxX: function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = n("Sawl")
          , c = n("dwAR")
          , u = n("wh6W")
          , l = "actived"
          , h = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            a(e, [{
                key: "onInit",
                value: function() {
                    this.$tabs = this.$(".J-customerTab"),
                    this.$tabsWrapper = this.$tabs.parent(),
                    this.$panel = this.$(".J-customerPanel"),
                    this.$contents = this.$(".J-customerContent"),
                    this.$underline = this.$(".J-customerUnderline"),
                    this.preload = !1,
                    this.renderView(),
                    this.bindEvents(),
                    this.bindAriaEvents()
                }
            }, {
                key: "onBeforeScrollIntoView",
                value: function() {
                    this.preload || (this.preload = !0,
                    this.doPreloadImage())
                }
            }, {
                key: "renderView",
                value: function() {
                    this.renderUnderline(!0)
                }
            }, {
                key: "renderUnderline",
                value: function(t) {
                    var e = this.$tabs.filter("." + l);
                    t ? this.$underline.css({
                        "-webkit-transition-property": "none",
                        "transition-property": "none"
                    }) : this.$underline.css({
                        "-webkit-transition-property": "",
                        "transition-property": ""
                    }),
                    this.$underline.css({
                        visibility: "visible",
                        left: e.offset().left - this.$tabsWrapper.offset().left,
                        width: e.width()
                    })
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var t = this;
                    $(window);
                    this.$root.on("click", ".J-customerTab", function() {
                        var e = $(this)
                          , n = e.data("target")
                          , i = t.$contents.filter(":visible")
                          , o = t.$contents.filter('[data-id="' + n + '"]');
                        e.addClass(l).siblings().removeClass(l),
                        i.fadeOut("fast", function() {
                            o.fadeIn("fast")
                        }),
                        t.renderUnderline()
                    })
                }
            }, {
                key: "bindAriaEvents",
                value: function() {
                    var t = this;
                    u.bindCommonKeyEvents(this.$tabs, "a", {
                        onConfirm: function(t) {
                            $(this).closest(".J-customerTab").trigger("click")
                        },
                        onMove: function(e, n) {
                            var i = $(this).parent()
                              , o = t.$tabs
                              , r = o.length
                              , a = o.index(i)
                              , s = (r + a + n) % r;
                            o.eq(s).find("a").focus(),
                            e.preventDefault()
                        }
                    }),
                    u.bindCommonKeyEvents(t.$panel, "a", {
                        onEsc: function(e) {
                            t.$tabs.filter(".actived").find("a").focus()
                        }
                    })
                }
            }, {
                key: "doPreloadImage",
                value: function() {
                    var t = this;
                    t.$("img").each(function() {
                        var t = $(this);
                        t.prop("src") || !t.data("p-src") && !t.data("m-src") || (s.isPhone() ? t.prop("src", t.data("m-src")) : t.prop("src", t.data("p-src")))
                    })
                }
            }, {
                key: "onResize",
                value: function() {
                    this.renderView()
                }
            }]),
            e
        }(c);
        t.exports = h
    },
    xnl8: function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = n("dwAR")
          , s = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            e
        }(a);
        t.exports = s
    },
    "70lU": function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = n("dwAR")
          , c = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            a(e, [{
                key: "onInit",
                value: function() {
                    this.wPreload = !1,
                    this.nPreload = !1
                }
            }, {
                key: "onBeforeScrollIntoView",
                value: function() {
                    "wide" !== this.getScreenMode() || this.wPreload || (this.wPreload = !0,
                    this.doPreloadImage()),
                    "narrow" !== this.getScreenMode() || this.mPreload || (this.mPreload = !0,
                    this.doPreloadImage())
                }
            }, {
                key: "doPreloadImage",
                value: function() {
                    var t = this;
                    t.$("img").each(function() {
                        var e = $(this)
                          , n = e.data("load") || "";
                        "narrow" == t.getScreenMode() ? !e.prop("src") && "narrow" === n && e.data("src") && e.prop("src", e.data("src")) : !e.prop("src") && e.data("src") && e.prop("src", e.data("src"))
                    })
                }
            }]),
            e
        }(s);
        t.exports = c
    },
    forf: function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                var n = []
                  , i = !0
                  , o = !1
                  , r = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !e || n.length !== e); i = !0)
                        ;
                } catch (t) {
                    o = !0,
                    r = t
                } finally {
                    try {
                        !i && s.return && s.return()
                    } finally {
                        if (o)
                            throw r
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e))
                    return e;
                if (Symbol.iterator in Object(e))
                    return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
          , s = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , c = n(1)
          , u = n("+cXR").net
          , l = n("dwAR")
          , h = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            s(e, [{
                key: "onInit",
                value: function() {
                    this.$devMainTabs = this.$(".J-devMainTab"),
                    this.$columnTab = this.$(".J-devColumnTab"),
                    this.$askTab = this.$(".J-devAskTab"),
                    this.$labTab = this.$(".J-devLabTab");
                    var t = [this.$columnTab.find(".J-devTabPanel"), this.$askTab.find(".J-devTabPanel"), this.$labTab.find(".J-devTabPanel")];
                    this.$columnPanel = t[0],
                    this.$askPanel = t[1],
                    this.$labPanel = t[2],
                    this.bindEvents(),
                    this.loadLatestData()
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var t = this;
                    this.$devMainTabs.on("click", ".J-devTabTitle", function(n) {
                        if ("narrow" === t.getScreenMode()) {
                            var i = $(this).closest(".J-devMainTab")
                              , o = i.hasClass(e.CLASS_ACTIVED);
                            t.$devMainTabs.removeClass(e.CLASS_ACTIVED),
                            o || i.addClass(e.CLASS_ACTIVED),
                            n.preventDefault()
                        }
                    })
                }
            }, {
                key: "loadLatestData",
                value: function() {
                    var t = this
                      , e = [this.$columnTab.data("ids"), this.$askTab.data("ids"), this.$labTab.data("ids")].map(function(t) {
                        return t ? "number" == typeof t ? [t] : t.split(",").map(function(t) {
                            return parseInt(t, 10)
                        }).filter(function(t) {
                            return !c.isNaN(t)
                        }) : []
                    })
                      , n = a(e, 3)
                      , i = n[0]
                      , o = n[1]
                      , r = n[2];
                    if (![i, o, r].every(function(t) {
                        return 0 === t.length
                    })) {
                        var s = [i, o, r];
                        this.articleIds = s[0],
                        this.askIds = s[1],
                        this.labIds = s[2];
                        var l = {
                            articleIds: i,
                            askIds: o,
                            labIds: r
                        };
                        u.post("/home/ajax/", {
                            action: "getDeveloperData",
                            data: l
                        }).done(function(e) {
                            t.render(e)
                        })
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : data
                      , e = t.articleList
                      , n = t.askList
                      , i = t.labList;
                    if (Array.isArray(e) && Array.isArray(this.articleIds)) {
                        var o = "";
                        this.articleIds.forEach(function(t, n) {
                            var i = c.find(e, function(e) {
                                return e.id === t
                            });
                            i && (o += '\n\t\t\t\t\t\t\t<a href="https://cloud.tencent.com/developer/article/' + i.id + '"\n\t\t\t\t\t\t\t   hotrep="hp.developer.column.item' + (n + 1) + '" class="home-community-item">\n\t\t\t\t\t\t\t\t<p class="item-title">' + i.title + '</p>\n\t\t\t\t\t\t\t\t<ul class="item-infos">\n\t\t\t\t\t\t\t\t\t<li class="item-info"><i class="info-icon view"></i>' + i.readNum + "</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</a>")
                        }),
                        o && this.$columnPanel.html(o)
                    }
                    if (Array.isArray(n) && Array.isArray(this.askIds)) {
                        var r = "";
                        this.askIds.forEach(function(t, e) {
                            var i = c.find(n, function(e) {
                                return e.id === t
                            });
                            i && (r += '\n\t\t\t\t\t\t<a href="https://cloud.tencent.com/developer/ask/' + i.id + '" hotrep="hp.developer.ask.item' + (e + 1) + '" class="home-community-item">\n\t\t\t\t\t\t\t<p class="item-title">' + i.title + '</p>\n\t\t\t\t\t\t\t<ul class="item-infos">\n\t\t\t\t\t\t\t\t<li class="item-info"><i class="info-icon dialog"></i>' + i.readNum + "</li> \n\t\t\t\t\t\t\t</ul> \n\t\t\t\t\t\t</a>")
                        }),
                        r && this.$askPanel.html(r)
                    }
                    if (Array.isArray(i) && Array.isArray(this.labIds)) {
                        var a = "";
                        this.labIds.forEach(function(t, e) {
                            var n = c.find(i, function(e) {
                                return e.id === t
                            });
                            n && (a += '\n\t\t\t\t\t\t<a href="https://cloud.tencent.com/developer/labs/lab/' + n.id + '?utm_source=qcIndex&utm_medium=qclab" hotrep="hp.developer.lab.item' + (e + 1) + '" class="home-community-item">\n\t\t\t\t\t\t\t\t<p class="item-title">' + n.title + '</p>\n\t\t\t\t\t\t\t\t<ul class="item-infos">\n\t\t\t\t\t\t\t\t\t<li class="item-info"><i class="info-icon time"></i>' + n.costTimeStr + '</li>\n\t\t\t\t\t\t\t\t\t<li class="item-info"><i class="info-icon user"></i>' + n.totalRecvNum + "</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</a>")
                        }),
                        a && this.$labPanel.html(a)
                    }
                }
            }]),
            e
        }(l);
        h.CLASS_ACTIVED = "actived",
        t.exports = h
    },
    "+cXR": function(t, e, n) {
        (function(e) {
            "use strict";
            function n(t, e) {
                for (var n = e.split("."), i = t, o = n.length, r = 0; r < o; r += 1)
                    "undefined" == typeof i[n[r]] && (i[n[r]] = {}),
                    i = i[n[r]];
                return i
            }
            t.exports = n(e, "qcloud.main")
        }
        ).call(e, function() {
            return this
        }())
    },
    eSCn: function(t, e, n) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function r(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = n("dwAR")
          , c = function(t) {
            function e() {
                return i(this, e),
                o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return r(e, t),
            a(e, [{
                key: "onInit",
                value: function() {
                    this.preload = !1
                }
            }, {
                key: "onBeforeScrollIntoView",
                value: function() {
                    this.preload || (this.preload = !0,
                    this.doPreloadImage())
                }
            }, {
                key: "doPreloadImage",
                value: function() {
                    var t = this;
                    t.$("img").each(function() {
                        var t = $(this);
                        !t.prop("src") && t.data("src") && t.prop("src", t.data("src")).css("visibility", "visible")
                    })
                }
            }]),
            e
        }(s);
        t.exports = c
    },
    wh6W: function(t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = {
            bindCommonKeyEvents: function(t, e, n) {
                "undefined" == typeof n && (n = e,
                e = ""),
                n = i.extend({
                    onConfirm: i.noop,
                    onNext: i.noop,
                    onPrev: i.noop,
                    onPrevTab: i.noop,
                    onTab: i.noop,
                    onEsc: i.noop,
                    onMove: i.noop
                }, n),
                i(t).off("keydown.aria").on("keydown.aria", e, function(t) {
                    switch (t.keyCode) {
                    case 13:
                    case 32:
                        n.onConfirm.call(this, t);
                        break;
                    case 37:
                    case 38:
                        n.onPrev.call(this, t),
                        n.onMove.call(this, t, -1);
                        break;
                    case 39:
                    case 40:
                        n.onNext.call(this, t),
                        n.onMove.call(this, t, 1);
                        break;
                    case 9:
                        n.onTab.call(this, t);
                        break;
                    case 27:
                        n.onEsc.call(this, t)
                    }
                })
            }
        }
    }
});
