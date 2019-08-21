/* jquery.nicescroll 3.6.8 InuYaksa*2015 MIT http://nicescroll.areaaperta.com */
(function (f) {
    "function" === typeof define && define.amd ? define(["apps/static/news_files/jquery"], f) : "object" === typeof exports ? module.exports = f(require("apps/static/news_files/jquery")) : f(jQuery)
})(function (f) {
    var B = !1, F = !1, O = 0, P = 2E3, A = 0, J = ["webkit", "ms", "moz", "o"], v = window.requestAnimationFrame || !1,
        w = window.cancelAnimationFrame || !1;
    if (!v) for (var Q in J) {
        var G = J[Q];
        if (v = window[G + "RequestAnimationFrame"]) {
            w = window[G + "CancelAnimationFrame"] || window[G + "CancelRequestAnimationFrame"];
            break
        }
    }
    var x = window.MutationObserver || window.WebKitMutationObserver ||
        !1, K = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "6px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 60,
        mousescrollstep: 24,
        touchbehavior: !1,
        hwacceleration: !0,
        usetransition: !0,
        boxzoom: !1,
        dblclickzoom: !0,
        gesturezoom: !0,
        grabcursorenabled: !0,
        autohidemode: !0,
        background: "",
        iframeautoresize: !0,
        cursorminheight: 32,
        preservenativescrolling: !0,
        railoffset: !1,
        railhoffset: !1,
        bouncescroll: !0,
        spacebarenabled: !0,
        railpadding: {top: 0, right: 0, left: 0, bottom: 0},
        disableoutline: !0,
        horizrailenabled: !0,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: !0,
        enablemousewheel: !0,
        enablekeyboard: !0,
        smoothscroll: !0,
        sensitiverail: !0,
        enablemouselockapi: !0,
        cursorfixedheight: !1,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: !0,
        enablescrollonselection: !0,
        overflowx: !0,
        overflowy: !0,
        cursordragspeed: .3,
        rtlmode: "auto",
        cursordragontouch: !1,
        oneaxismousemode: "auto",
        scriptpath: function () {
            var f = document.getElementsByTagName("script"), f = f.length ? f[f.length -
            1].src.split("?")[0] : "";
            return 0 < f.split("/").length ? f.split("/").slice(0, -1).join("/") + "/" : ""
        }(),
        preventmultitouchscrolling: !0,
        disablemutationobserver: !1
    }, H = !1, R = function () {
        if (H) return H;
        var f = document.createElement("DIV"), c = f.style, k = navigator.userAgent, l = navigator.platform,
            d = {haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document};
        d.isopera = "opera" in window;
        d.isopera12 = d.isopera && "getUserMedia" in navigator;
        d.isoperamini = "[object OperaMini]" ===
            Object.prototype.toString.call(window.operamini);
        d.isie = "all" in document && "attachEvent" in f && !d.isopera;
        d.isieold = d.isie && !("msInterpolationMode" in c);
        d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || 7 == document.documentMode);
        d.isie8 = d.isie && "documentMode" in document && 8 == document.documentMode;
        d.isie9 = d.isie && "performance" in window && 9 == document.documentMode;
        d.isie10 = d.isie && "performance" in window && 10 == document.documentMode;
        d.isie11 = "msRequestFullscreen" in f && 11 <= document.documentMode;
        d.isieedge12 =
            navigator.userAgent.match(/Edge\/12\./);
        d.isieedge = "msOverflowStyle" in f;
        d.ismodernie = d.isie11 || d.isieedge;
        d.isie9mobile = /iemobile.9/i.test(k);
        d.isie9mobile && (d.isie9 = !1);
        d.isie7mobile = !d.isie9mobile && d.isie7 && /iemobile/i.test(k);
        d.ismozilla = "MozAppearance" in c;
        d.iswebkit = "WebkitAppearance" in c;
        d.ischrome = "chrome" in window;
        d.ischrome38 = d.ischrome && "touchAction" in c;
        d.ischrome22 = !d.ischrome38 && d.ischrome && d.haspointerlock;
        d.ischrome26 = !d.ischrome38 && d.ischrome && "transition" in c;
        d.cantouch = "ontouchstart" in
            document.documentElement || "ontouchstart" in window;
        d.hasw3ctouch = (window.PointerEvent || !1) && (0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints);
        d.hasmstouch = !d.hasw3ctouch && (window.MSPointerEvent || !1);
        d.ismac = /^mac$/i.test(l);
        d.isios = d.cantouch && /iphone|ipad|ipod/i.test(l);
        d.isios4 = d.isios && !("seal" in Object);
        d.isios7 = d.isios && "webkitHidden" in document;
        d.isios8 = d.isios && "hidden" in document;
        d.isandroid = /android/i.test(k);
        d.haseventlistener = "addEventListener" in f;
        d.trstyle = !1;
        d.hastransform = !1;
        d.hastranslate3d = !1;
        d.transitionstyle = !1;
        d.hastransition = !1;
        d.transitionend = !1;
        l = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
        for (k = 0; k < l.length; k++) if (void 0 !== c[l[k]]) {
            d.trstyle = l[k];
            break
        }
        d.hastransform = !!d.trstyle;
        d.hastransform && (c[d.trstyle] = "translate3d(1px,2px,3px)", d.hastranslate3d = /translate3d/.test(c[d.trstyle]));
        d.transitionstyle = !1;
        d.prefixstyle = "";
        d.transitionend = !1;
        for (var l = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "),
                 q = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "), t = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "), k = 0; k < l.length; k++) if (l[k] in c) {
            d.transitionstyle = l[k];
            d.prefixstyle = q[k];
            d.transitionend = t[k];
            break
        }
        d.ischrome26 && (d.prefixstyle = q[1]);
        d.hastransition = d.transitionstyle;
        a:{
            k = ["grab", "-webkit-grab", "-moz-grab"];
            if (d.ischrome && !d.ischrome38 || d.isie) k = [];
            for (l = 0; l < k.length; l++) if (q = k[l], c.cursor = q, c.cursor == q) {
                c = q;
                break a
            }
            c =
                "url(//patriciaportfolio.googlecode.com/files/openhand.cur),n-resize"
        }
        d.cursorgrabvalue = c;
        d.hasmousecapture = "setCapture" in f;
        d.hasMutationObserver = !1 !== x;
        return H = d
    }, S = function (h, c) {
        function k() {
            var b = a.doc.css(e.trstyle);
            return b && "matrix" == b.substr(0, 6) ? b.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
        }

        function l() {
            var b = a.win;
            if ("zIndex" in b) return b.zIndex();
            for (; 0 < b.length && 9 != b[0].nodeType;) {
                var g = b.css("zIndex");
                if (!isNaN(g) && 0 != g) return parseInt(g);
                b = b.parent()
            }
            return !1
        }

        function d(b,
                   g, u) {
            g = b.css(g);
            b = parseFloat(g);
            return isNaN(b) ? (b = z[g] || 0, u = 3 == b ? u ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, a.isie8 && b && (b += 1), u ? b : 0) : b
        }

        function q(b, g, u, c) {
            a._bind(b, g, function (a) {
                a = a ? a : window.event;
                var c = {
                    original: a,
                    target: a.target || a.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function () {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        return !1
                    },
                    stopImmediatePropagation: function () {
                        a.stopImmediatePropagation ?
                            a.stopImmediatePropagation() : a.cancelBubble = !0
                    }
                };
                "mousewheel" == g ? (a.wheelDeltaX && (c.deltaX = -.025 * a.wheelDeltaX), a.wheelDeltaY && (c.deltaY = -.025 * a.wheelDeltaY), c.deltaY || c.deltaX || (c.deltaY = -.025 * a.wheelDelta)) : c.deltaY = a.detail;
                return u.call(b, c)
            }, c)
        }

        function t(b, g, c) {
            var d, e;
            0 == b.deltaMode ? (d = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaX), e = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaY)) : 1 == b.deltaMode && (d = -Math.floor(b.deltaX * a.opt.mousescrollstep), e = -Math.floor(b.deltaY * a.opt.mousescrollstep));
            g && a.opt.oneaxismousemode && 0 == d && e && (d = e, e = 0, c && (0 > d ? a.getScrollLeft() >= a.page.maxw : 0 >= a.getScrollLeft()) && (e = d, d = 0));
            a.isrtlmode && (d = -d);
            d && (a.scrollmom && a.scrollmom.stop(), a.lastdeltax += d, a.debounced("mousewheelx", function () {
                var b = a.lastdeltax;
                a.lastdeltax = 0;
                a.rail.drag || a.doScrollLeftBy(b)
            }, 15));
            if (e) {
                if (a.opt.nativeparentscrolling && c && !a.ispage && !a.zoomactive) if (0 > e) {
                    if (a.getScrollTop() >= a.page.maxh) return !0
                } else if (0 >= a.getScrollTop()) return !0;
                a.scrollmom && a.scrollmom.stop();
                a.lastdeltay += e;
                a.synched("mousewheely", function () {
                    var b = a.lastdeltay;
                    a.lastdeltay = 0;
                    a.rail.drag || a.doScrollBy(b)
                }, 15)
            }
            b.stopImmediatePropagation();
            return b.preventDefault()
        }

        var a = this;
        this.version = "3.6.8";
        this.name = "nicescroll";
        this.me = c;
        this.opt = {doc: f("body"), win: !1};
        f.extend(this.opt, K);
        this.opt.snapbackspeed = 80;
        if (h) for (var r in a.opt) void 0 !== h[r] && (a.opt[r] = h[r]);
        a.opt.disablemutationobserver && (x = !1);
        this.iddoc = (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
        this.ispage = /^BODY|HTML/.test(a.opt.win ?
            a.opt.win[0].nodeName : this.doc[0].nodeName);
        this.haswrapper = !1 !== a.opt.win;
        this.win = a.opt.win || (this.ispage ? f(window) : this.doc);
        this.docscroll = this.ispage && !this.haswrapper ? f(window) : this.win;
        this.body = f("body");
        this.iframe = this.isfixed = this.viewport = !1;
        this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
        this.istextarea = "TEXTAREA" == this.win[0].nodeName;
        this.forcescreen = !1;
        this.canshowonmouseevent = "scroll" != a.opt.autohidemode;
        this.page = this.view = this.onzoomout = this.onzoomin =
            this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
        this.scroll = {x: 0, y: 0};
        this.scrollratio = {x: 0, y: 0};
        this.cursorheight = 20;
        this.scrollvaluemax = 0;
        if ("auto" == this.opt.rtlmode) {
            r = this.win[0] == window ? this.body : this.win;
            var p = r.css("writing-mode") || r.css("-webkit-writing-mode") || r.css("-ms-writing-mode") || r.css("-moz-writing-mode");
            "horizontal-tb" == p || "lr-tb" == p || "" == p ? (this.isrtlmode =
                "rtl" == r.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == p || "tb" == p || "tb-rl" == p || "rl-tb" == p, this.isvertical = "vertical-rl" == p || "tb" == p || "tb-rl" == p)
        } else this.isrtlmode = !0 === this.opt.rtlmode, this.isvertical = !1;
        this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;
        do this.id = "ascrail" + P++; while (document.getElementById(this.id));
        this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail =
            !1;
        this.visibility = !0;
        this.hidden = this.locked = this.railslocked = !1;
        this.cursoractive = !0;
        this.wheelprevented = !1;
        this.overflowx = a.opt.overflowx;
        this.overflowy = a.opt.overflowy;
        this.nativescrollingarea = !1;
        this.checkarea = 0;
        this.events = [];
        this.saved = {};
        this.delaylist = {};
        this.synclist = {};
        this.lastdeltay = this.lastdeltax = 0;
        this.detected = R();
        var e = f.extend({}, this.detected);
        this.ishwscroll = (this.canhwscroll = e.hastransform && a.opt.hwacceleration) && a.haswrapper;
        this.hasreversehr = this.isrtlmode ? this.isvertical ?
            !(e.iswebkit || e.isie || e.isie11) : !(e.iswebkit || e.isie && !e.isie10 && !e.isie11) : !1;
        this.istouchcapable = !1;
        e.cantouch || !e.hasw3ctouch && !e.hasmstouch ? !e.cantouch || e.isios || e.isandroid || !e.iswebkit && !e.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0;
        a.opt.enablemouselockapi || (e.hasmousecapture = !1, e.haspointerlock = !1);
        this.debounced = function (b, g, c) {
            a && (a.delaylist[b] || (g.call(a), a.delaylist[b] = {
                h: v(function () {
                    a.delaylist[b].fn.call(a);
                    a.delaylist[b] = !1
                }, c)
            }), a.delaylist[b].fn = g)
        };
        var I = !1;
        this.synched =
            function (b, g) {
                a.synclist[b] = g;
                (function () {
                    I || (v(function () {
                        if (a) {
                            I = !1;
                            for (var b in a.synclist) {
                                var g = a.synclist[b];
                                g && g.call(a);
                                a.synclist[b] = !1
                            }
                        }
                    }), I = !0)
                })();
                return b
            };
        this.unsynched = function (b) {
            a.synclist[b] && (a.synclist[b] = !1)
        };
        this.css = function (b, g) {
            for (var c in g) a.saved.css.push([b, c, b.css(c)]), b.css(c, g[c])
        };
        this.scrollTop = function (b) {
            return void 0 === b ? a.getScrollTop() : a.setScrollTop(b)
        };
        this.scrollLeft = function (b) {
            return void 0 === b ? a.getScrollLeft() : a.setScrollLeft(b)
        };
        var D = function (a, g,
                          c, d, e, f, k) {
            this.st = a;
            this.ed = g;
            this.spd = c;
            this.p1 = d || 0;
            this.p2 = e || 1;
            this.p3 = f || 0;
            this.p4 = k || 1;
            this.ts = (new Date).getTime();
            this.df = this.ed - this.st
        };
        D.prototype = {
            B2: function (a) {
                return 3 * a * a * (1 - a)
            }, B3: function (a) {
                return 3 * a * (1 - a) * (1 - a)
            }, B4: function (a) {
                return (1 - a) * (1 - a) * (1 - a)
            }, getNow: function () {
                var a = 1 - ((new Date).getTime() - this.ts) / this.spd, g = this.B2(a) + this.B3(a) + this.B4(a);
                return 0 > a ? this.ed : this.st + Math.round(this.df * g)
            }, update: function (a, g) {
                this.st = this.getNow();
                this.ed = a;
                this.spd = g;
                this.ts = (new Date).getTime();
                this.df = this.ed - this.st;
                return this
            }
        };
        if (this.ishwscroll) {
            this.doc.translate = {x: 0, y: 0, tx: "0px", ty: "0px"};
            e.hastranslate3d && e.isios && this.doc.css("-webkit-backface-visibility", "hidden");
            this.getScrollTop = function (b) {
                if (!b) {
                    if (b = k()) return 16 == b.length ? -b[13] : -b[5];
                    if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow()
                }
                return a.doc.translate.y
            };
            this.getScrollLeft = function (b) {
                if (!b) {
                    if (b = k()) return 16 == b.length ? -b[12] : -b[4];
                    if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow()
                }
                return a.doc.translate.x
            };
            this.notifyScrollEvent = function (a) {
                var g = document.createEvent("UIEvents");
                g.initUIEvent("scroll", !1, !0, window, 1);
                g.niceevent = !0;
                a.dispatchEvent(g)
            };
            var y = this.isrtlmode ? 1 : -1;
            e.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function (b, g) {
                a.doc.translate.y = b;
                a.doc.translate.ty = -1 * b + "px";
                a.doc.css(e.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                g || a.notifyScrollEvent(a.win[0])
            }, this.setScrollLeft = function (b, g) {
                a.doc.translate.x = b;
                a.doc.translate.tx = b * y + "px";
                a.doc.css(e.trstyle,
                    "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                g || a.notifyScrollEvent(a.win[0])
            }) : (this.setScrollTop = function (b, g) {
                a.doc.translate.y = b;
                a.doc.translate.ty = -1 * b + "px";
                a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                g || a.notifyScrollEvent(a.win[0])
            }, this.setScrollLeft = function (b, g) {
                a.doc.translate.x = b;
                a.doc.translate.tx = b * y + "px";
                a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                g || a.notifyScrollEvent(a.win[0])
            })
        } else this.getScrollTop =
            function () {
                return a.docscroll.scrollTop()
            }, this.setScrollTop = function (b) {
            return setTimeout(function () {
                a && a.docscroll.scrollTop(b)
            }, 1)
        }, this.getScrollLeft = function () {
            return a.hasreversehr ? a.detected.ismozilla ? a.page.maxw - Math.abs(a.docscroll.scrollLeft()) : a.page.maxw - a.docscroll.scrollLeft() : a.docscroll.scrollLeft()
        }, this.setScrollLeft = function (b) {
            return setTimeout(function () {
                if (a) return a.hasreversehr && (b = a.detected.ismozilla ? -(a.page.maxw - b) : a.page.maxw - b), a.docscroll.scrollLeft(b)
            }, 1)
        };
        this.getTarget =
            function (a) {
                return a ? a.target ? a.target : a.srcElement ? a.srcElement : !1 : !1
            };
        this.hasParent = function (a, g) {
            if (!a) return !1;
            for (var c = a.target || a.srcElement || a || !1; c && c.id != g;) c = c.parentNode || !1;
            return !1 !== c
        };
        var z = {thin: 1, medium: 3, thick: 5};
        this.getDocumentScrollOffset = function () {
            return {
                top: window.pageYOffset || document.documentElement.scrollTop,
                left: window.pageXOffset || document.documentElement.scrollLeft
            }
        };
        this.getOffset = function () {
            if (a.isfixed) {
                var b = a.win.offset(), g = a.getDocumentScrollOffset();
                b.top -= g.top;
                b.left -= g.left;
                return b
            }
            b = a.win.offset();
            if (!a.viewport) return b;
            g = a.viewport.offset();
            return {top: b.top - g.top, left: b.left - g.left}
        };
        this.updateScrollBar = function (b) {
            var g, c, e;
            if (a.ishwscroll) a.rail.css({height: a.win.innerHeight() - (a.opt.railpadding.top + a.opt.railpadding.bottom)}), a.railh && a.railh.css({width: a.win.innerWidth() - (a.opt.railpadding.left + a.opt.railpadding.right)}); else {
                var f = a.getOffset();
                g = f.top;
                c = f.left - (a.opt.railpadding.left + a.opt.railpadding.right);
                g += d(a.win, "border-top-width", !0);
                c += a.rail.align ? a.win.outerWidth() - d(a.win, "border-right-width") - a.rail.width : d(a.win, "border-left-width");
                if (e = a.opt.railoffset) e.top && (g += e.top), e.left && (c += e.left);
                a.railslocked || a.rail.css({
                    top: g,
                    left: c,
                    height: (b ? b.h : a.win.innerHeight()) - (a.opt.railpadding.top + a.opt.railpadding.bottom)
                });
                a.zoom && a.zoom.css({top: g + 1, left: 1 == a.rail.align ? c - 20 : c + a.rail.width + 4});
                if (a.railh && !a.railslocked) {
                    g = f.top;
                    c = f.left;
                    if (e = a.opt.railhoffset) e.top && (g += e.top), e.left && (c += e.left);
                    b = a.railh.align ? g + d(a.win, "border-top-width",
                        !0) + a.win.innerHeight() - a.railh.height : g + d(a.win, "border-top-width", !0);
                    c += d(a.win, "border-left-width");
                    a.railh.css({
                        top: b - (a.opt.railpadding.top + a.opt.railpadding.bottom),
                        left: c,
                        width: a.railh.width
                    })
                }
            }
        };
        this.doRailClick = function (b, g, c) {
            var d;
            a.railslocked || (a.cancelEvent(b), g ? (g = c ? a.doScrollLeft : a.doScrollTop, d = c ? (b.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (b.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, g(d)) : (g = c ? a.doScrollLeftBy : a.doScrollBy, d = c ? a.scroll.x : a.scroll.y,
                b = c ? b.pageX - a.railh.offset().left : b.pageY - a.rail.offset().top, c = c ? a.view.w : a.view.h, g(d >= b ? c : -c)))
        };
        a.hasanimationframe = v;
        a.hascancelanimationframe = w;
        a.hasanimationframe ? a.hascancelanimationframe || (w = function () {
            a.cancelAnimationFrame = !0
        }) : (v = function (a) {
            return setTimeout(a, 15 - Math.floor(+new Date / 1E3) % 16)
        }, w = clearTimeout);
        this.init = function () {
            a.saved.css = [];
            if (e.isie7mobile || e.isoperamini) return !0;
            e.hasmstouch && a.css(a.ispage ? f("html") : a.win, {_touchaction: "none"});
            var b = e.ismodernie || e.isie10 ? {"-ms-overflow-style": "none"} :
                {"overflow-y": "hidden"};
            a.zindex = "auto";
            a.zindex = a.ispage || "auto" != a.opt.zindex ? a.opt.zindex : l() || "auto";
            !a.ispage && "auto" != a.zindex && a.zindex > A && (A = a.zindex);
            a.isie && 0 == a.zindex && "auto" == a.opt.zindex && (a.zindex = "auto");
            if (!a.ispage || !e.cantouch && !e.isieold && !e.isie9mobile) {
                var c = a.docscroll;
                a.ispage && (c = a.haswrapper ? a.win : a.doc);
                e.isie9mobile || a.css(c, b);
                a.ispage && e.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(f("html"), {"overflow-y": "hidden"}) : "HTML" == a.doc[0].nodeName && a.css(f("body"), b));
                !e.isios ||
                a.ispage || a.haswrapper || a.css(f("body"), {"-webkit-overflow-scrolling": "touch"});
                var d = f(document.createElement("div"));
                d.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: a.opt.cursorwidth,
                    height: 0,
                    "background-color": a.opt.cursorcolor,
                    border: a.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": a.opt.cursorborderradius,
                    "-moz-border-radius": a.opt.cursorborderradius,
                    "border-radius": a.opt.cursorborderradius
                });
                d.hborder = parseFloat(d.outerHeight() - d.innerHeight());
                d.addClass("nicescroll-cursors");
                a.cursor = d;
                var m = f(document.createElement("div"));
                m.attr("id", a.id);
                m.addClass("nicescroll-rails nicescroll-rails-vr");
                var k, h, p = ["left", "right", "top", "bottom"], L;
                for (L in p) h = p[L], (k = a.opt.railpadding[h]) ? m.css("padding-" + h, k + "px") : a.opt.railpadding[h] = 0;
                m.append(d);
                m.width = Math.max(parseFloat(a.opt.cursorwidth), d.outerWidth());
                m.css({width: m.width + "px", zIndex: a.zindex, background: a.opt.background, cursor: "default"});
                m.visibility = !0;
                m.scrollable = !0;
                m.align = "left" == a.opt.railalign ? 0 : 1;
                a.rail = m;
                d = a.rail.drag =
                    !1;
                !a.opt.boxzoom || a.ispage || e.isieold || (d = document.createElement("div"), a.bind(d, "click", a.doZoom), a.bind(d, "mouseenter", function () {
                    a.zoom.css("opacity", a.opt.cursoropacitymax)
                }), a.bind(d, "mouseleave", function () {
                    a.zoom.css("opacity", a.opt.cursoropacitymin)
                }), a.zoom = f(d), a.zoom.css({
                    cursor: "pointer",
                    zIndex: a.zindex,
                    backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0px 0px"
                }), a.opt.dblclickzoom && a.bind(a.win, "dblclick", a.doZoom), e.cantouch && a.opt.gesturezoom &&
                (a.ongesturezoom = function (b) {
                    1.5 < b.scale && a.doZoomIn(b);
                    .8 > b.scale && a.doZoomOut(b);
                    return a.cancelEvent(b)
                }, a.bind(a.win, "gestureend", a.ongesturezoom)));
                a.railh = !1;
                var n;
                a.opt.horizrailenabled && (a.css(c, {overflowX: "hidden"}), d = f(document.createElement("div")), d.css({
                    position: "absolute",
                    top: 0,
                    height: a.opt.cursorwidth,
                    width: 0,
                    backgroundColor: a.opt.cursorcolor,
                    border: a.opt.cursorborder,
                    backgroundClip: "padding-box",
                    "-webkit-border-radius": a.opt.cursorborderradius,
                    "-moz-border-radius": a.opt.cursorborderradius,
                    "border-radius": a.opt.cursorborderradius
                }), e.isieold && d.css("overflow", "hidden"), d.wborder = parseFloat(d.outerWidth() - d.innerWidth()), d.addClass("nicescroll-cursors"), a.cursorh = d, n = f(document.createElement("div")), n.attr("id", a.id + "-hr"), n.addClass("nicescroll-rails nicescroll-rails-hr"), n.height = Math.max(parseFloat(a.opt.cursorwidth), d.outerHeight()), n.css({
                    height: n.height + "px",
                    zIndex: a.zindex,
                    background: a.opt.background
                }), n.append(d), n.visibility = !0, n.scrollable = !0, n.align = "top" == a.opt.railvalign ?
                    0 : 1, a.railh = n, a.railh.drag = !1);
                a.ispage ? (m.css({
                    position: "fixed",
                    top: 0,
                    height: "100%"
                }), m.align ? m.css({right: 0}) : m.css({left: 0}), a.body.append(m), a.railh && (n.css({
                    position: "fixed",
                    left: 0,
                    width: "100%"
                }), n.align ? n.css({bottom: 0}) : n.css({top: 0}), a.body.append(n))) : (a.ishwscroll ? ("static" == a.win.css("position") && a.css(a.win, {position: "relative"}), c = "HTML" == a.win[0].nodeName ? a.body : a.win, f(c).scrollTop(0).scrollLeft(0), a.zoom && (a.zoom.css({
                    position: "absolute",
                    top: 1,
                    right: 0,
                    "margin-right": m.width + 4
                }), c.append(a.zoom)),
                    m.css({
                        position: "absolute",
                        top: 0
                    }), m.align ? m.css({right: 0}) : m.css({left: 0}), c.append(m), n && (n.css({
                    position: "absolute",
                    left: 0,
                    bottom: 0
                }), n.align ? n.css({bottom: 0}) : n.css({top: 0}), c.append(n))) : (a.isfixed = "fixed" == a.win.css("position"), c = a.isfixed ? "fixed" : "absolute", a.isfixed || (a.viewport = a.getViewport(a.win[0])), a.viewport && (a.body = a.viewport, 0 == /fixed|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {position: "relative"})), m.css({position: c}), a.zoom && a.zoom.css({position: c}), a.updateScrollBar(),
                    a.body.append(m), a.zoom && a.body.append(a.zoom), a.railh && (n.css({position: c}), a.body.append(n))), e.isios && a.css(a.win, {
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    "-webkit-touch-callout": "none"
                }), e.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), e.iswebkit && a.opt.disableoutline && a.win.css("outline", "none"));
                !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({opacity: a.opt.cursoropacitymax}), a.railh && a.railh.css({opacity: a.opt.cursoropacitymax})) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ?
                    (a.autohidedom = f().add(a.rail), e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), a.railh && e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = f().add(a.rail), a.railh && (a.autohidedom = a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = f().add(a.cursor), a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, a.hide(), a.railslocked =
                        !1);
                if (e.isie9mobile) a.scrollmom = new M(a), a.onmangotouch = function () {
                    var b = a.getScrollTop(), c = a.getScrollLeft();
                    if (b == a.scrollmom.lastscrolly && c == a.scrollmom.lastscrollx) return !0;
                    var g = b - a.mangotouch.sy, d = c - a.mangotouch.sx;
                    if (0 != Math.round(Math.sqrt(Math.pow(d, 2) + Math.pow(g, 2)))) {
                        var e = 0 > g ? -1 : 1, f = 0 > d ? -1 : 1, u = +new Date;
                        a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
                        80 < u - a.mangotouch.tm || a.mangotouch.dry != e || a.mangotouch.drx != f ? (a.scrollmom.stop(), a.scrollmom.reset(c, b), a.mangotouch.sy = b, a.mangotouch.ly =
                            b, a.mangotouch.sx = c, a.mangotouch.lx = c, a.mangotouch.dry = e, a.mangotouch.drx = f, a.mangotouch.tm = u) : (a.scrollmom.stop(), a.scrollmom.update(a.mangotouch.sx - d, a.mangotouch.sy - g), a.mangotouch.tm = u, g = Math.max(Math.abs(a.mangotouch.ly - b), Math.abs(a.mangotouch.lx - c)), a.mangotouch.ly = b, a.mangotouch.lx = c, 2 < g && (a.mangotouch.lazy = setTimeout(function () {
                            a.mangotouch.lazy = !1;
                            a.mangotouch.dry = 0;
                            a.mangotouch.drx = 0;
                            a.mangotouch.tm = 0;
                            a.scrollmom.doMomentum(30)
                        }, 100)))
                    }
                }, m = a.getScrollTop(), n = a.getScrollLeft(), a.mangotouch =
                    {
                        sy: m,
                        ly: m,
                        dry: 0,
                        sx: n,
                        lx: n,
                        drx: 0,
                        lazy: !1,
                        tm: 0
                    }, a.bind(a.docscroll, "scroll", a.onmangotouch); else {
                    if (e.cantouch || a.istouchcapable || a.opt.touchbehavior || e.hasmstouch) {
                        a.scrollmom = new M(a);
                        a.ontouchstart = function (b) {
                            if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                            a.hasmoving = !1;
                            if (!a.railslocked) {
                                var c;
                                if (e.hasmstouch) for (c = b.target ? b.target : !1; c;) {
                                    var g = f(c).getNiceScroll();
                                    if (0 < g.length && g[0].me == a.me) break;
                                    if (0 < g.length) return !1;
                                    if ("DIV" == c.nodeName && c.id == a.id) break;
                                    c = c.parentNode ?
                                        c.parentNode : !1
                                }
                                a.cancelScroll();
                                if ((c = a.getTarget(b)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return a.stopPropagation(b);
                                !("clientX" in b) && "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                                a.forcescreen && (g = b, b = {original: b.original ? b.original : b}, b.clientX = g.screenX, b.clientY = g.screenY);
                                a.rail.drag = {
                                    x: b.clientX,
                                    y: b.clientY,
                                    sx: a.scroll.x,
                                    sy: a.scroll.y,
                                    st: a.getScrollTop(),
                                    sl: a.getScrollLeft(),
                                    pt: 2,
                                    dl: !1
                                };
                                if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl =
                                    "f"; else {
                                    var g = f(window).width(), d = f(window).height(),
                                        d = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - d),
                                        g = Math.max(0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - g);
                                    a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < d ? "v" : !1 : a.rail.scrollable && !a.railh.scrollable ? 0 < g ? "h" : !1 : !1;
                                    a.rail.drag.ck || (a.rail.drag.dl = "f")
                                }
                                a.opt.touchbehavior && a.isiframe && e.isie && (g = a.win.position(), a.rail.drag.x += g.left, a.rail.drag.y += g.top);
                                a.hasmoving =
                                    !1;
                                a.lastmouseup = !1;
                                a.scrollmom.reset(b.clientX, b.clientY);
                                if (!e.cantouch && !this.istouchcapable && !b.pointerType) {
                                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !a.ispage && e.hasmousecapture && c.setCapture(), a.opt.touchbehavior ? (c.onclick && !c._onclick && (c._onclick = c.onclick, c.onclick = function (b) {
                                        if (a.hasmoving) return !1;
                                        c._onclick.call(this, b)
                                    }), a.cancelEvent(b)) : a.stopPropagation(b);
                                    /SUBMIT|CANCEL|BUTTON/i.test(f(c).attr("type")) && (pc = {
                                        tg: c,
                                        click: !1
                                    }, a.preventclick = pc)
                                }
                            }
                        };
                        a.ontouchend = function (b) {
                            if (!a.rail.drag) return !0;
                            if (2 == a.rail.drag.pt) {
                                if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                                a.scrollmom.doMomentum();
                                a.rail.drag = !1;
                                if (a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), e.hasmousecapture && document.releaseCapture(), !e.cantouch)) return a.cancelEvent(b)
                            } else if (1 == a.rail.drag.pt) return a.onmouseup(b)
                        };
                        var q = a.opt.touchbehavior && a.isiframe && !e.hasmousecapture;
                        a.ontouchmove = function (b, c) {
                            if (!a.rail.drag || b.targetTouches && a.opt.preventmultitouchscrolling && 1 < b.targetTouches.length || b.pointerType &&
                                2 != b.pointerType && "touch" != b.pointerType) return !1;
                            if (2 == a.rail.drag.pt) {
                                if (e.cantouch && e.isios && void 0 === b.original) return !0;
                                a.hasmoving = !0;
                                a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick || !1, a.preventclick.tg.onclick = a.onpreventclick);
                                b = f.extend({original: b}, b);
                                "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                                if (a.forcescreen) {
                                    var g = b;
                                    b = {original: b.original ? b.original : b};
                                    b.clientX = g.screenX;
                                    b.clientY = g.screenY
                                }
                                var d,
                                    g = d = 0;
                                q && !c && (d = a.win.position(), g = -d.left, d = -d.top);
                                var u = b.clientY + d;
                                d = u - a.rail.drag.y;
                                var m = b.clientX + g, k = m - a.rail.drag.x, h = a.rail.drag.st - d;
                                a.ishwscroll && a.opt.bouncescroll ? 0 > h ? h = Math.round(h / 2) : h > a.page.maxh && (h = a.page.maxh + Math.round((h - a.page.maxh) / 2)) : (0 > h && (u = h = 0), h > a.page.maxh && (h = a.page.maxh, u = 0));
                                var l;
                                a.railh && a.railh.scrollable && (l = a.isrtlmode ? k - a.rail.drag.sl : a.rail.drag.sl - k, a.ishwscroll && a.opt.bouncescroll ? 0 > l ? l = Math.round(l / 2) : l > a.page.maxw && (l = a.page.maxw + Math.round((l - a.page.maxw) /
                                    2)) : (0 > l && (m = l = 0), l > a.page.maxw && (l = a.page.maxw, m = 0)));
                                g = !1;
                                if (a.rail.drag.dl) g = !0, "v" == a.rail.drag.dl ? l = a.rail.drag.sl : "h" == a.rail.drag.dl && (h = a.rail.drag.st); else {
                                    d = Math.abs(d);
                                    var k = Math.abs(k), C = a.opt.directionlockdeadzone;
                                    if ("v" == a.rail.drag.ck) {
                                        if (d > C && k <= .3 * d) return a.rail.drag = !1, !0;
                                        k > C && (a.rail.drag.dl = "f", f("body").scrollTop(f("body").scrollTop()))
                                    } else if ("h" == a.rail.drag.ck) {
                                        if (k > C && d <= .3 * k) return a.rail.drag = !1, !0;
                                        d > C && (a.rail.drag.dl = "f", f("body").scrollLeft(f("body").scrollLeft()))
                                    }
                                }
                                a.synched("touchmove",
                                    function () {
                                        a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), a.rail.scrollable && a.setScrollTop(h), a.scrollmom.update(m, u), a.railh && a.railh.scrollable ? (a.setScrollLeft(l), a.showCursor(h, l)) : a.showCursor(h), e.isie10 && document.selection.clear())
                                    });
                                e.ischrome && a.istouchcapable && (g = !1);
                                if (g) return a.cancelEvent(b)
                            } else if (1 == a.rail.drag.pt) return a.onmousemove(b)
                        }
                    }
                    a.onmousedown = function (b, c) {
                        if (!a.rail.drag || 1 == a.rail.drag.pt) {
                            if (a.railslocked) return a.cancelEvent(b);
                            a.cancelScroll();
                            a.rail.drag = {x: b.clientX, y: b.clientY, sx: a.scroll.x, sy: a.scroll.y, pt: 1, hr: !!c};
                            var g = a.getTarget(b);
                            !a.ispage && e.hasmousecapture && g.setCapture();
                            a.isiframe && !e.hasmousecapture && (a.saved.csspointerevents = a.doc.css("pointer-events"), a.css(a.doc, {"pointer-events": "none"}));
                            a.hasmoving = !1;
                            return a.cancelEvent(b)
                        }
                    };
                    a.onmouseup = function (b) {
                        if (a.rail.drag) {
                            if (1 != a.rail.drag.pt) return !0;
                            e.hasmousecapture && document.releaseCapture();
                            a.isiframe && !e.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents);
                            a.rail.drag = !1;
                            a.hasmoving && a.triggerScrollEnd();
                            return a.cancelEvent(b)
                        }
                    };
                    a.onmousemove = function (b) {
                        if (a.rail.drag) {
                            if (1 == a.rail.drag.pt) {
                                if (e.ischrome && 0 == b.which) return a.onmouseup(b);
                                a.cursorfreezed = !0;
                                a.hasmoving = !0;
                                if (a.rail.drag.hr) {
                                    a.scroll.x = a.rail.drag.sx + (b.clientX - a.rail.drag.x);
                                    0 > a.scroll.x && (a.scroll.x = 0);
                                    var c = a.scrollvaluemaxw;
                                    a.scroll.x > c && (a.scroll.x = c)
                                } else a.scroll.y = a.rail.drag.sy + (b.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), c = a.scrollvaluemax, a.scroll.y > c && (a.scroll.y =
                                    c);
                                a.synched("mousemove", function () {
                                    a.rail.drag && 1 == a.rail.drag.pt && (a.showCursor(), a.rail.drag.hr ? a.hasreversehr ? a.doScrollLeft(a.scrollvaluemaxw - Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed))
                                });
                                return a.cancelEvent(b)
                            }
                        } else a.checkarea = 0
                    };
                    if (e.cantouch || a.opt.touchbehavior) a.onpreventclick = function (b) {
                        if (a.preventclick) return a.preventclick.tg.onclick =
                            a.preventclick.click, a.preventclick = !1, a.cancelEvent(b)
                    }, a.bind(a.win, "mousedown", a.ontouchstart), a.onclick = e.isios ? !1 : function (b) {
                        return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(b)) : !0
                    }, a.opt.grabcursorenabled && e.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {cursor: e.cursorgrabvalue}), a.css(a.rail, {cursor: e.cursorgrabvalue})); else {
                        var r = function (b) {
                            if (a.selectiondrag) {
                                if (b) {
                                    var c = a.win.outerHeight();
                                    b = b.pageY - a.selectiondrag.top;
                                    0 < b && b < c && (b = 0);
                                    b >= c && (b -= c);
                                    a.selectiondrag.df = b
                                }
                                0 != a.selectiondrag.df &&
                                (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), a.debounced("doselectionscroll", function () {
                                    r()
                                }, 50))
                            }
                        };
                        a.hasTextSelected = "getSelection" in document ? function () {
                            return 0 < document.getSelection().rangeCount
                        } : "selection" in document ? function () {
                            return "None" != document.selection.type
                        } : function () {
                            return !1
                        };
                        a.onselectionstart = function (b) {
                            a.ispage || (a.selectiondrag = a.win.offset())
                        };
                        a.onselectionend = function (b) {
                            a.selectiondrag = !1
                        };
                        a.onselectiondrag = function (b) {
                            a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll",
                                function () {
                                    r(b)
                                }, 250)
                        }
                    }
                    e.hasw3ctouch ? (a.css(a.rail, {"touch-action": "none"}), a.css(a.cursor, {"touch-action": "none"}), a.bind(a.win, "pointerdown", a.ontouchstart), a.bind(document, "pointerup", a.ontouchend), a.bind(document, "pointermove", a.ontouchmove)) : e.hasmstouch ? (a.css(a.rail, {"-ms-touch-action": "none"}), a.css(a.cursor, {"-ms-touch-action": "none"}), a.bind(a.win, "MSPointerDown", a.ontouchstart), a.bind(document, "MSPointerUp", a.ontouchend), a.bind(document, "MSPointerMove", a.ontouchmove), a.bind(a.cursor, "MSGestureHold",
                        function (a) {
                            a.preventDefault()
                        }), a.bind(a.cursor, "contextmenu", function (a) {
                        a.preventDefault()
                    })) : this.istouchcapable && (a.bind(a.win, "touchstart", a.ontouchstart), a.bind(document, "touchend", a.ontouchend), a.bind(document, "touchcancel", a.ontouchend), a.bind(document, "touchmove", a.ontouchmove));
                    if (a.opt.cursordragontouch || !e.cantouch && !a.opt.touchbehavior) a.rail.css({cursor: "default"}), a.railh && a.railh.css({cursor: "default"}), a.jqbind(a.rail, "mouseenter", function () {
                        if (!a.ispage && !a.win.is(":visible")) return !1;
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0
                    }), a.jqbind(a.rail, "mouseleave", function () {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor()
                    }), a.opt.sensitiverail && (a.bind(a.rail, "click", function (b) {
                        a.doRailClick(b, !1, !1)
                    }), a.bind(a.rail, "dblclick", function (b) {
                        a.doRailClick(b, !0, !1)
                    }), a.bind(a.cursor, "click", function (b) {
                        a.cancelEvent(b)
                    }), a.bind(a.cursor, "dblclick", function (b) {
                        a.cancelEvent(b)
                    })), a.railh && (a.jqbind(a.railh, "mouseenter", function () {
                        if (!a.ispage && !a.win.is(":visible")) return !1;
                        a.canshowonmouseevent &&
                        a.showCursor();
                        a.rail.active = !0
                    }), a.jqbind(a.railh, "mouseleave", function () {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor()
                    }), a.opt.sensitiverail && (a.bind(a.railh, "click", function (b) {
                        a.doRailClick(b, !1, !0)
                    }), a.bind(a.railh, "dblclick", function (b) {
                        a.doRailClick(b, !0, !0)
                    }), a.bind(a.cursorh, "click", function (b) {
                        a.cancelEvent(b)
                    }), a.bind(a.cursorh, "dblclick", function (b) {
                        a.cancelEvent(b)
                    })));
                    e.cantouch || a.opt.touchbehavior ? (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.ontouchend), a.bind(document, "mousemove",
                        a.ontouchmove), a.onclick && a.bind(document, "click", a.onclick), a.opt.cursordragontouch ? (a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.cursorh && a.bind(a.cursorh, "mousedown", function (b) {
                        a.onmousedown(b, !0)
                    }), a.cursorh && a.bind(a.cursorh, "mouseup", a.onmouseup)) : (a.bind(a.rail, "mousedown", function (a) {
                        a.preventDefault()
                    }), a.railh && a.bind(a.railh, "mousedown", function (a) {
                        a.preventDefault()
                    }))) : (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.onmouseup), a.bind(document,
                        "mousemove", a.onmousemove), a.onclick && a.bind(document, "click", a.onclick), a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.railh && (a.bind(a.cursorh, "mousedown", function (b) {
                        a.onmousedown(b, !0)
                    }), a.bind(a.cursorh, "mouseup", a.onmouseup)), !a.ispage && a.opt.enablescrollonselection && (a.bind(a.win[0], "mousedown", a.onselectionstart), a.bind(document, "mouseup", a.onselectionend), a.bind(a.cursor, "mouseup", a.onselectionend), a.cursorh && a.bind(a.cursorh, "mouseup", a.onselectionend),
                        a.bind(document, "mousemove", a.onselectiondrag)), a.zoom && (a.jqbind(a.zoom, "mouseenter", function () {
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0
                    }), a.jqbind(a.zoom, "mouseleave", function () {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor()
                    })));
                    a.opt.enablemousewheel && (a.isiframe || a.mousewheel(e.isie && a.ispage ? document : a.win, a.onmousewheel), a.mousewheel(a.rail, a.onmousewheel), a.railh && a.mousewheel(a.railh, a.onmousewheelhr));
                    a.ispage || e.cantouch || /HTML|^BODY/.test(a.win[0].nodeName) || (a.win.attr("tabindex") ||
                    a.win.attr({tabindex: O++}), a.jqbind(a.win, "focus", function (b) {
                        B = a.getTarget(b).id || !0;
                        a.hasfocus = !0;
                        a.canshowonmouseevent && a.noticeCursor()
                    }), a.jqbind(a.win, "blur", function (b) {
                        B = !1;
                        a.hasfocus = !1
                    }), a.jqbind(a.win, "mouseenter", function (b) {
                        F = a.getTarget(b).id || !0;
                        a.hasmousefocus = !0;
                        a.canshowonmouseevent && a.noticeCursor()
                    }), a.jqbind(a.win, "mouseleave", function () {
                        F = !1;
                        a.hasmousefocus = !1;
                        a.rail.drag || a.hideCursor()
                    }))
                }
                a.onkeypress = function (b) {
                    if (a.railslocked && 0 == a.page.maxh) return !0;
                    b = b ? b : window.e;
                    var c =
                        a.getTarget(b);
                    if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp) || f(c).attr("contenteditable")) return !0;
                    if (a.hasfocus || a.hasmousefocus && !B || a.ispage && !B && !F) {
                        c = b.keyCode;
                        if (a.railslocked && 27 != c) return a.cancelEvent(b);
                        var g = b.ctrlKey || !1, d = b.shiftKey || !1, e = !1;
                        switch (c) {
                            case 38:
                            case 63233:
                                a.doScrollBy(72);
                                e = !0;
                                break;
                            case 40:
                            case 63235:
                                a.doScrollBy(-72);
                                e = !0;
                                break;
                            case 37:
                            case 63232:
                                a.railh && (g ? a.doScrollLeft(0) : a.doScrollLeftBy(72),
                                    e = !0);
                                break;
                            case 39:
                            case 63234:
                                a.railh && (g ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), e = !0);
                                break;
                            case 33:
                            case 63276:
                                a.doScrollBy(a.view.h);
                                e = !0;
                                break;
                            case 34:
                            case 63277:
                                a.doScrollBy(-a.view.h);
                                e = !0;
                                break;
                            case 36:
                            case 63273:
                                a.railh && g ? a.doScrollPos(0, 0) : a.doScrollTo(0);
                                e = !0;
                                break;
                            case 35:
                            case 63275:
                                a.railh && g ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                                e = !0;
                                break;
                            case 32:
                                a.opt.spacebarenabled && (d ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), e = !0);
                                break;
                            case 27:
                                a.zoomactive &&
                                (a.doZoom(), e = !0)
                        }
                        if (e) return a.cancelEvent(b)
                    }
                };
                a.opt.enablekeyboard && a.bind(document, e.isopera && !e.isopera12 ? "keypress" : "keydown", a.onkeypress);
                a.bind(document, "keydown", function (b) {
                    b.ctrlKey && (a.wheelprevented = !0)
                });
                a.bind(document, "keyup", function (b) {
                    b.ctrlKey || (a.wheelprevented = !1)
                });
                a.bind(window, "blur", function (b) {
                    a.wheelprevented = !1
                });
                a.bind(window, "resize", a.lazyResize);
                a.bind(window, "orientationchange", a.lazyResize);
                a.bind(window, "load", a.lazyResize);
                if (e.ischrome && !a.ispage && !a.haswrapper) {
                    var t =
                        a.win.attr("style"), m = parseFloat(a.win.css("width")) + 1;
                    a.win.css("width", m);
                    a.synched("chromefix", function () {
                        a.win.attr("style", t)
                    })
                }
                a.onAttributeChange = function (b) {
                    a.lazyResize(a.isieold ? 250 : 30)
                };
                a.isie11 || !1 === x || (a.observerbody = new x(function (b) {
                    b.forEach(function (b) {
                        if ("attributes" == b.type) return f("body").hasClass("modal-open") && f("body").hasClass("modal-dialog") && !f.contains(f(".modal-dialog")[0], a.doc[0]) ? a.hide() : a.show()
                    });
                    if (document.body.scrollHeight != a.page.maxh) return a.lazyResize(30)
                }),
                    a.observerbody.observe(document.body, {
                        childList: !0,
                        subtree: !0,
                        characterData: !1,
                        attributes: !0,
                        attributeFilter: ["class"]
                    }));
                a.ispage || a.haswrapper || (!1 !== x ? (a.observer = new x(function (b) {
                    b.forEach(a.onAttributeChange)
                }), a.observer.observe(a.win[0], {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1
                }), a.observerremover = new x(function (b) {
                    b.forEach(function (b) {
                        if (0 < b.removedNodes.length) for (var c in b.removedNodes) if (a && b.removedNodes[c] == a.win[0]) return a.remove()
                    })
                }), a.observerremover.observe(a.win[0].parentNode,
                    {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (a.bind(a.win, e.isie && !e.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), e.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.bind(a.win, "DOMNodeRemoved", function (b) {
                    b.target == a.win[0] && a.remove()
                })));
                !a.ispage && a.opt.boxzoom && a.bind(window, "resize", a.resizeZoom);
                a.istextarea && (a.bind(a.win, "keydown", a.lazyResize), a.bind(a.win, "mouseup", a.lazyResize));
                a.lazyResize(30)
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var N =
                    function () {
                        a.iframexd = !1;
                        var c;
                        try {
                            c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
                        } catch (g) {
                            a.iframexd = !0, c = !1
                        }
                        if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                        a.forcescreen = !0;
                        a.isiframe && (a.iframe = {
                            doc: f(c),
                            html: a.doc.contents().find("html")[0],
                            body: a.doc.contents().find("body")[0]
                        }, a.getContentSize = function () {
                            return {
                                w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
                                h: Math.max(a.iframe.html.scrollHeight,
                                    a.iframe.body.scrollHeight)
                            }
                        }, a.docscroll = f(a.iframe.body));
                        if (!e.isios && a.opt.iframeautoresize && !a.isiframe) {
                            a.win.scrollTop(0);
                            a.doc.height("");
                            var d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight);
                            a.doc.height(d)
                        }
                        a.lazyResize(30);
                        e.isie7 && a.css(f(a.iframe.html), b);
                        a.css(f(a.iframe.body), b);
                        e.isios && a.haswrapper && a.css(f(c.body), {"-webkit-transform": "translate3d(0,0,0)"});
                        "contentWindow" in this ? a.bind(this.contentWindow, "scroll", a.onscroll) : a.bind(c, "scroll", a.onscroll);
                        a.opt.enablemousewheel && a.mousewheel(c, a.onmousewheel);
                        a.opt.enablekeyboard && a.bind(c, e.isopera ? "keypress" : "keydown", a.onkeypress);
                        if (e.cantouch || a.opt.touchbehavior) a.bind(c, "mousedown", a.ontouchstart), a.bind(c, "mousemove", function (b) {
                            return a.ontouchmove(b, !0)
                        }), a.opt.grabcursorenabled && e.cursorgrabvalue && a.css(f(c.body), {cursor: e.cursorgrabvalue});
                        a.bind(c, "mouseup", a.ontouchend);
                        a.zoom && (a.opt.dblclickzoom && a.bind(c, "dblclick", a.doZoom), a.ongesturezoom && a.bind(c, "gestureend", a.ongesturezoom))
                    };
                this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function () {
                    N.call(a.doc[0], !1)
                }, 500);
                a.bind(this.doc, "load", N)
            }
        };
        this.showCursor = function (b, c) {
            a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);
            if (a.rail) {
                a.autohidedom && (a.autohidedom.stop().css({opacity: a.opt.cursoropacitymax}), a.cursoractive = !0);
                a.rail.drag && 1 == a.rail.drag.pt || (void 0 !== b && !1 !== b && (a.scroll.y = Math.round(1 * b / a.scrollratio.y)), void 0 !== c && (a.scroll.x = Math.round(1 * c / a.scrollratio.x)));
                a.cursor.css({
                    height: a.cursorheight,
                    top: a.scroll.y
                });
                if (a.cursorh) {
                    var d = a.hasreversehr ? a.scrollvaluemaxw - a.scroll.x : a.scroll.x;
                    !a.rail.align && a.rail.visibility ? a.cursorh.css({
                        width: a.cursorwidth,
                        left: d + a.rail.width
                    }) : a.cursorh.css({width: a.cursorwidth, left: d});
                    a.cursoractive = !0
                }
                a.zoom && a.zoom.stop().css({opacity: a.opt.cursoropacitymax})
            }
        };
        this.hideCursor = function (b) {
            a.cursortimeout || !a.rail || !a.autohidedom || a.hasmousefocus && "leave" == a.opt.autohidemode || (a.cursortimeout = setTimeout(function () {
                a.rail.active && a.showonmouseevent || (a.autohidedom.stop().animate({opacity: a.opt.cursoropacitymin}),
                a.zoom && a.zoom.stop().animate({opacity: a.opt.cursoropacitymin}), a.cursoractive = !1);
                a.cursortimeout = 0
            }, b || a.opt.hidecursordelay))
        };
        this.noticeCursor = function (b, c, d) {
            a.showCursor(c, d);
            a.rail.active || a.hideCursor(b)
        };
        this.getContentSize = a.ispage ? function () {
            return {
                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }
        } : a.haswrapper ? function () {
            return {
                w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) +
                    parseInt(a.win.css("paddingRight")),
                h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
            }
        } : function () {
            return {w: a.docscroll[0].scrollWidth, h: a.docscroll[0].scrollHeight}
        };
        this.onResize = function (b, c) {
            if (!a || !a.win) return !1;
            if (!a.haswrapper && !a.ispage) {
                if ("none" == a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), !1;
                a.hidden || a.visibility || a.showRail().showRailHr()
            }
            var d = a.page.maxh, e = a.page.maxw, f = a.view.h, k = a.view.w;
            a.view = {
                w: a.ispage ? a.win.width() :
                    parseInt(a.win[0].clientWidth), h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
            };
            a.page = c ? c : a.getContentSize();
            a.page.maxh = Math.max(0, a.page.h - a.view.h);
            a.page.maxw = Math.max(0, a.page.w - a.view.w);
            if (a.page.maxh == d && a.page.maxw == e && a.view.w == k && a.view.h == f) {
                if (a.ispage) return a;
                d = a.win.offset();
                if (a.lastposition && (e = a.lastposition, e.top == d.top && e.left == d.left)) return a;
                a.lastposition = d
            }
            0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, a.cursorheight = 0, a.setScrollTop(0),
            a.rail && (a.rail.scrollable = !1)) : (a.page.maxh -= a.opt.railpadding.top + a.opt.railpadding.bottom, a.rail.scrollable = !0);
            0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, a.cursorwidth = 0, a.setScrollLeft(0), a.railh && (a.railh.scrollable = !1)) : (a.page.maxw -= a.opt.railpadding.left + a.opt.railpadding.right, a.railh && (a.railh.scrollable = a.opt.horizrailenabled));
            a.railslocked = a.locked || 0 == a.page.maxh && 0 == a.page.maxw;
            if (a.railslocked) return a.ispage || a.updateScrollBar(a.view), !1;
            a.hidden ||
            a.visibility ? !a.railh || a.hidden || a.railh.visibility || a.showRailHr() : a.showRail().showRailHr();
            a.istextarea && a.win.css("resize") && "none" != a.win.css("resize") && (a.view.h -= 20);
            a.cursorheight = Math.min(a.view.h, Math.round(a.view.h / a.page.h * a.view.h));
            a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorheight);
            a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w / a.page.w * a.view.w));
            a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight,
                a.cursorwidth);
            a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder - (a.opt.railpadding.top + a.opt.railpadding.bottom);
            a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder - (a.opt.railpadding.left + a.opt.railpadding.right));
            a.ispage || a.updateScrollBar(a.view);
            a.scrollratio = {x: a.page.maxw / a.scrollvaluemaxw, y: a.page.maxh / a.scrollvaluemax};
            a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() *
                (1 / a.scrollratio.y)), a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
            a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
            return a
        };
        this.resize = a.onResize;
        this.hlazyresize = 0;
        this.lazyResize = function (b) {
            a.haswrapper || a.hide();
            a.hlazyresize && clearTimeout(a.hlazyresize);
            a.hlazyresize = setTimeout(function () {
                a && a.show().resize()
            }, 240);
            return a
        };
        this.jqbind = function (b, c, d) {
            a.events.push({e: b, n: c, f: d, q: !0});
            f(b).bind(c, d)
        };
        this.mousewheel =
            function (b, c, d) {
                b = "jquery" in b ? b[0] : b;
                if ("onwheel" in document.createElement("div")) a._bind(b, "wheel", c, d || !1); else {
                    var e = void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    q(b, e, c, d || !1);
                    "DOMMouseScroll" == e && q(b, "MozMousePixelScroll", c, d || !1)
                }
            };
        e.haseventlistener ? (this.bind = function (b, c, d, e) {
            a._bind("jquery" in b ? b[0] : b, c, d, e || !1)
        }, this._bind = function (b, c, d, e) {
            a.events.push({e: b, n: c, f: d, b: e, q: !1});
            b.addEventListener(c, d, e || !1)
        }, this.cancelEvent = function (a) {
            if (!a) return !1;
            a = a.original ? a.original :
                a;
            a.cancelable && a.preventDefault();
            a.stopPropagation();
            a.preventManipulation && a.preventManipulation();
            return !1
        }, this.stopPropagation = function (a) {
            if (!a) return !1;
            a = a.original ? a.original : a;
            a.stopPropagation();
            return !1
        }, this._unbind = function (a, c, d, e) {
            a.removeEventListener(c, d, e)
        }) : (this.bind = function (b, c, d, e) {
            var f = "jquery" in b ? b[0] : b;
            a._bind(f, c, function (b) {
                (b = b || window.event || !1) && b.srcElement && (b.target = b.srcElement);
                "pageY" in b || (b.pageX = b.clientX + document.documentElement.scrollLeft, b.pageY = b.clientY +
                    document.documentElement.scrollTop);
                return !1 === d.call(f, b) || !1 === e ? a.cancelEvent(b) : !0
            })
        }, this._bind = function (b, c, d, e) {
            a.events.push({e: b, n: c, f: d, b: e, q: !1});
            b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d
        }, this.cancelEvent = function (a) {
            a = window.event || !1;
            if (!a) return !1;
            a.cancelBubble = !0;
            a.cancel = !0;
            return a.returnValue = !1
        }, this.stopPropagation = function (a) {
            a = window.event || !1;
            if (!a) return !1;
            a.cancelBubble = !0;
            return !1
        }, this._unbind = function (a, c, d, e) {
            a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = !1
        });
        this.unbindAll = function () {
            for (var b = 0; b < a.events.length; b++) {
                var c = a.events[b];
                c.q ? c.e.unbind(c.n, c.f) : a._unbind(c.e, c.n, c.f, c.b)
            }
        };
        this.showRail = function () {
            0 == a.page.maxh || !a.ispage && "none" == a.win.css("display") || (a.visibility = !0, a.rail.visibility = !0, a.rail.css("display", "block"));
            return a
        };
        this.showRailHr = function () {
            if (!a.railh) return a;
            0 == a.page.maxw || !a.ispage && "none" == a.win.css("display") || (a.railh.visibility = !0, a.railh.css("display", "block"));
            return a
        };
        this.hideRail = function () {
            a.visibility =
                !1;
            a.rail.visibility = !1;
            a.rail.css("display", "none");
            return a
        };
        this.hideRailHr = function () {
            if (!a.railh) return a;
            a.railh.visibility = !1;
            a.railh.css("display", "none");
            return a
        };
        this.show = function () {
            a.hidden = !1;
            a.railslocked = !1;
            return a.showRail().showRailHr()
        };
        this.hide = function () {
            a.hidden = !0;
            a.railslocked = !0;
            return a.hideRail().hideRailHr()
        };
        this.toggle = function () {
            return a.hidden ? a.show() : a.hide()
        };
        this.remove = function () {
            a.stop();
            a.cursortimeout && clearTimeout(a.cursortimeout);
            for (var b in a.delaylist) a.delaylist[b] &&
            w(a.delaylist[b].h);
            a.doZoomOut();
            a.unbindAll();
            e.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
            !1 !== a.observer && a.observer.disconnect();
            !1 !== a.observerremover && a.observerremover.disconnect();
            !1 !== a.observerbody && a.observerbody.disconnect();
            a.events = null;
            a.cursor && a.cursor.remove();
            a.cursorh && a.cursorh.remove();
            a.rail && a.rail.remove();
            a.railh && a.railh.remove();
            a.zoom && a.zoom.remove();
            for (b = 0; b < a.saved.css.length; b++) {
                var c = a.saved.css[b];
                c[0].css(c[1], void 0 === c[2] ? "" : c[2])
            }
            a.saved =
                !1;
            a.me.data("__nicescroll", "");
            var d = f.nicescroll;
            d.each(function (b) {
                if (this && this.id === a.id) {
                    delete d[b];
                    for (var c = ++b; c < d.length; c++, b++) d[b] = d[c];
                    d.length--;
                    d.length && delete d[d.length]
                }
            });
            for (var k in a) a[k] = null, delete a[k];
            a = null
        };
        this.scrollstart = function (b) {
            this.onscrollstart = b;
            return a
        };
        this.scrollend = function (b) {
            this.onscrollend = b;
            return a
        };
        this.scrollcancel = function (b) {
            this.onscrollcancel = b;
            return a
        };
        this.zoomin = function (b) {
            this.onzoomin = b;
            return a
        };
        this.zoomout = function (b) {
            this.onzoomout =
                b;
            return a
        };
        this.isScrollable = function (a) {
            a = a.target ? a.target : a;
            if ("OPTION" == a.nodeName) return !0;
            for (; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                var c = f(a), c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(c)) return a.clientHeight != a.scrollHeight;
                a = a.parentNode ? a.parentNode : !1
            }
            return !1
        };
        this.getViewport = function (a) {
            for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                var c = f(a);
                if (/fixed|absolute/.test(c.css("position"))) return c;
                var d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(d) && a.clientHeight != a.scrollHeight || 0 < c.getNiceScroll().length) return c;
                a = a.parentNode ? a.parentNode : !1
            }
            return !1
        };
        this.triggerScrollEnd = function () {
            if (a.onscrollend) {
                var b = a.getScrollLeft(), c = a.getScrollTop();
                a.onscrollend.call(a, {type: "scrollend", current: {x: b, y: c}, end: {x: b, y: c}})
            }
        };
        this.onmousewheel = function (b) {
            if (!a.wheelprevented) {
                if (a.railslocked) return a.debounced("checkunlock", a.resize, 250), !0;
                if (a.rail.drag) return a.cancelEvent(b);
                "auto" == a.opt.oneaxismousemode && 0 != b.deltaX && (a.opt.oneaxismousemode = !1);
                if (a.opt.oneaxismousemode && 0 == b.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(b) : !0;
                var c = +new Date, d = !1;
                a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
                a.checkarea = c;
                if (a.nativescrollingarea) return !0;
                if (b = t(b, !1, d)) a.checkarea = 0;
                return b
            }
        };
        this.onmousewheelhr = function (b) {
            if (!a.wheelprevented) {
                if (a.railslocked || !a.railh.scrollable) return !0;
                if (a.rail.drag) return a.cancelEvent(b);
                var c = +new Date, d = !1;
                a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
                a.checkarea = c;
                return a.nativescrollingarea ? !0 : a.railslocked ? a.cancelEvent(b) : t(b, !0, d)
            }
        };
        this.stop = function () {
            a.cancelScroll();
            a.scrollmon && a.scrollmon.stop();
            a.cursorfreezed = !1;
            a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
            a.noticeCursor();
            return a
        };
        this.getTransitionSpeed = function (b) {
            b = Math.min(Math.round(10 * a.opt.scrollspeed), Math.round(b / 20 * a.opt.scrollspeed));
            return 20 <
            b ? b : 0
        };
        a.opt.smoothscroll ? a.ishwscroll && e.hastransition && a.opt.usetransition && a.opt.smoothscroll ? (this.prepareTransition = function (b, c) {
            var d = c ? 20 < b ? b : 0 : a.getTransitionSpeed(b),
                f = d ? e.prefixstyle + "transform " + d + "ms ease-out" : "";
            a.lasttransitionstyle && a.lasttransitionstyle == f || (a.lasttransitionstyle = f, a.doc.css(e.transitionstyle, f));
            return d
        }, this.doScrollLeft = function (b, c) {
            var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
            a.doScrollPos(b, d, c)
        }, this.doScrollTop = function (b, c) {
            var d = a.scrollrunning ?
                a.newscrollx : a.getScrollLeft();
            a.doScrollPos(d, b, c)
        }, this.doScrollPos = function (b, c, d) {
            var f = a.getScrollTop(), k = a.getScrollLeft();
            (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - k) * (b - k)) && a.cancelScroll();
            0 == a.opt.bouncescroll && (0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 0 > b ? b = 0 : b > a.page.maxw && (b = a.page.maxw));
            if (a.scrollrunning && b == a.newscrollx && c == a.newscrolly) return !1;
            a.newscrolly = c;
            a.newscrollx = b;
            a.newscrollspeed = d || !1;
            if (a.timer) return !1;
            a.timer = setTimeout(function () {
                var d = a.getScrollTop(), f = a.getScrollLeft(),
                    k = Math.round(Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - d, 2))),
                    k = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(k);
                a.newscrollspeed && 1 >= a.newscrollspeed && (k *= a.newscrollspeed);
                a.prepareTransition(k, !0);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                0 < k && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
                    type: "scrollstart",
                    current: {x: f, y: d},
                    request: {x: b, y: c},
                    end: {x: a.newscrollx, y: a.newscrolly},
                    speed: k
                }), e.transitionend ? a.scrollendtrapped || (a.scrollendtrapped =
                    !0, a.bind(a.doc, e.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, k)), a.timerscroll = {
                    bz: new D(d, a.newscrolly, k, 0, 0, .58, 1),
                    bh: new D(f, a.newscrollx, k, 0, 0, .58, 1)
                }, a.cursorfreezed || (a.timerscroll.tm = setInterval(function () {
                    a.showCursor(a.getScrollTop(), a.getScrollLeft())
                }, 60)));
                a.synched("doScroll-set", function () {
                    a.timer = 0;
                    a.scrollendtrapped && (a.scrollrunning = !0);
                    a.setScrollTop(a.newscrolly);
                    a.setScrollLeft(a.newscrollx);
                    if (!a.scrollendtrapped) a.onScrollTransitionEnd()
                })
            }, 50)
        }, this.cancelScroll = function () {
            if (!a.scrollendtrapped) return !0;
            var b = a.getScrollTop(), c = a.getScrollLeft();
            a.scrollrunning = !1;
            e.transitionend || clearTimeout(e.transitionend);
            a.scrollendtrapped = !1;
            a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
            a.prepareTransition(0);
            a.setScrollTop(b);
            a.railh && a.setScrollLeft(c);
            a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
            a.timerscroll = !1;
            a.cursorfreezed = !1;
            a.showCursor(b, c);
            return a
        },
            this.onScrollTransitionEnd = function () {
                a.scrollendtrapped && a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
                a.scrollendtrapped = !1;
                a.prepareTransition(0);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                a.timerscroll = !1;
                var b = a.getScrollTop(), c = a.getScrollLeft();
                a.setScrollTop(b);
                a.railh && a.setScrollLeft(c);
                a.noticeCursor(!1, b, c);
                a.cursorfreezed = !1;
                0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
                0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw);
                if (b != a.newscrolly || c != a.newscrollx) return a.doScrollPos(c,
                    b, a.opt.snapbackspeed);
                a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
                a.scrollrunning = !1
            }) : (this.doScrollLeft = function (b, c) {
            var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
            a.doScrollPos(b, d, c)
        }, this.doScrollTop = function (b, c) {
            var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
            a.doScrollPos(d, b, c)
        }, this.doScrollPos = function (b, c, d) {
            function e() {
                if (a.cancelAnimationFrame) return !0;
                a.scrollrunning = !0;
                if (p = 1 - p) return a.timer = v(e) || 1;
                var b = 0, c, d, f = d = a.getScrollTop();
                if (a.dst.ay) {
                    f = a.bzscroll ?
                        a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly;
                    c = f - d;
                    if (0 > c && f < a.newscrolly || 0 < c && f > a.newscrolly) f = a.newscrolly;
                    a.setScrollTop(f);
                    f == a.newscrolly && (b = 1)
                } else b = 1;
                d = c = a.getScrollLeft();
                if (a.dst.ax) {
                    d = a.bzscroll ? a.dst.px + a.bzscroll.getNow() * a.dst.ax : a.newscrollx;
                    c = d - c;
                    if (0 > c && d < a.newscrollx || 0 < c && d > a.newscrollx) d = a.newscrollx;
                    a.setScrollLeft(d);
                    d == a.newscrollx && (b += 1)
                } else b += 1;
                2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 0 > f ? f = 0 : f > a.page.maxh && (f = Math.max(0, a.page.maxh)),
                    0 > d ? d = 0 : d > a.page.maxw && (d = a.page.maxw), d != a.newscrollx || f != a.newscrolly ? a.doScrollPos(d, f) : a.onscrollend && a.triggerScrollEnd()) : a.timer = v(e) || 1
            }

            c = void 0 === c || !1 === c ? a.getScrollTop(!0) : c;
            if (a.timer && a.newscrolly == c && a.newscrollx == b) return !0;
            a.timer && w(a.timer);
            a.timer = 0;
            var f = a.getScrollTop(), k = a.getScrollLeft();
            (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - k) * (b - k)) && a.cancelScroll();
            a.newscrolly = c;
            a.newscrollx = b;
            a.bouncescroll && a.rail.visibility || (0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh &&
                (a.newscrolly = a.page.maxh));
            a.bouncescroll && a.railh.visibility || (0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw));
            a.dst = {};
            a.dst.x = b - k;
            a.dst.y = c - f;
            a.dst.px = k;
            a.dst.py = f;
            var h = Math.round(Math.sqrt(Math.pow(a.dst.x, 2) + Math.pow(a.dst.y, 2)));
            a.dst.ax = a.dst.x / h;
            a.dst.ay = a.dst.y / h;
            var l = 0, n = h;
            0 == a.dst.x ? (l = f, n = c, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (l = k, n = b, a.dst.ax = 1, a.dst.px = 0);
            h = a.getTransitionSpeed(h);
            d && 1 >= d && (h *= d);
            a.bzscroll = 0 < h ? a.bzscroll ? a.bzscroll.update(n, h) :
                new D(l, n, h, 0, 1, 0, 1) : !1;
            if (!a.timer) {
                (f == a.page.maxh && c >= a.page.maxh || k == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
                var p = 1;
                a.cancelAnimationFrame = !1;
                a.timer = 1;
                a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
                    type: "scrollstart",
                    current: {x: k, y: f},
                    request: {x: b, y: c},
                    end: {x: a.newscrollx, y: a.newscrolly},
                    speed: h
                });
                e();
                (f == a.page.maxh && c >= f || k == a.page.maxw && b >= k) && a.checkContentSize();
                a.noticeCursor()
            }
        }, this.cancelScroll = function () {
            a.timer && w(a.timer);
            a.timer = 0;
            a.bzscroll = !1;
            a.scrollrunning =
                !1;
            return a
        }) : (this.doScrollLeft = function (b, c) {
            var d = a.getScrollTop();
            a.doScrollPos(b, d, c)
        }, this.doScrollTop = function (b, c) {
            var d = a.getScrollLeft();
            a.doScrollPos(d, b, c)
        }, this.doScrollPos = function (b, c, d) {
            var e = b > a.page.maxw ? a.page.maxw : b;
            0 > e && (e = 0);
            var f = c > a.page.maxh ? a.page.maxh : c;
            0 > f && (f = 0);
            a.synched("scroll", function () {
                a.setScrollTop(f);
                a.setScrollLeft(e)
            })
        }, this.cancelScroll = function () {
        });
        this.doScrollBy = function (b, c) {
            var d = 0, d = c ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly :
                a.getScrollTop(!0)) - b;
            if (a.bouncescroll) {
                var e = Math.round(a.view.h / 2);
                d < -e ? d = -e : d > a.page.maxh + e && (d = a.page.maxh + e)
            }
            a.cursorfreezed = !1;
            e = a.getScrollTop(!0);
            if (0 > d && 0 >= e) return a.noticeCursor();
            if (d > a.page.maxh && e >= a.page.maxh) return a.checkContentSize(), a.noticeCursor();
            a.doScrollTop(d)
        };
        this.doScrollLeftBy = function (b, c) {
            var d = 0,
                d = c ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;
            if (a.bouncescroll) {
                var e = Math.round(a.view.w / 2);
                d < -e ? d = -e : d > a.page.maxw + e && (d = a.page.maxw +
                    e)
            }
            a.cursorfreezed = !1;
            e = a.getScrollLeft(!0);
            if (0 > d && 0 >= e || d > a.page.maxw && e >= a.page.maxw) return a.noticeCursor();
            a.doScrollLeft(d)
        };
        this.doScrollTo = function (b, c) {
            a.cursorfreezed = !1;
            a.doScrollTop(b)
        };
        this.checkContentSize = function () {
            var b = a.getContentSize();
            b.h == a.page.h && b.w == a.page.w || a.resize(!1, b)
        };
        a.onscroll = function (b) {
            a.rail.drag || a.cursorfreezed || a.synched("scroll", function () {
                a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
                a.noticeCursor()
            })
        };
        a.bind(a.docscroll, "scroll", a.onscroll);
        this.doZoomIn = function (b) {
            if (!a.zoomactive) {
                a.zoomactive = !0;
                a.zoomrestore = {style: {}};
                var c = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                    d = a.win[0].style, k;
                for (k in c) {
                    var h = c[k];
                    a.zoomrestore.style[h] = void 0 !== d[h] ? d[h] : ""
                }
                a.zoomrestore.style.width = a.win.css("width");
                a.zoomrestore.style.height = a.win.css("height");
                a.zoomrestore.padding = {
                    w: a.win.outerWidth() - a.win.width(), h: a.win.outerHeight() -
                        a.win.height()
                };
                e.isios4 && (a.zoomrestore.scrollTop = f(window).scrollTop(), f(window).scrollTop(0));
                a.win.css({position: e.isios4 ? "absolute" : "fixed", top: 0, left: 0, zIndex: A + 100, margin: 0});
                c = a.win.css("backgroundColor");
                ("" == c || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c)) && a.win.css("backgroundColor", "#fff");
                a.rail.css({zIndex: A + 101});
                a.zoom.css({zIndex: A + 102});
                a.zoom.css("backgroundPosition", "0px -18px");
                a.resizeZoom();
                a.onzoomin && a.onzoomin.call(a);
                return a.cancelEvent(b)
            }
        };
        this.doZoomOut =
            function (b) {
                if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), e.isios4 && f(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({"z-index": a.zindex}), a.zoom.css({"z-index": a.zindex}), a.zoomrestore = !1, a.zoom.css("backgroundPosition", "0px 0px"), a.onResize(), a.onzoomout && a.onzoomout.call(a), a.cancelEvent(b)
            };
        this.doZoom = function (b) {
            return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b)
        };
        this.resizeZoom = function () {
            if (a.zoomactive) {
                var b = a.getScrollTop();
                a.win.css({
                    width: f(window).width() -
                        a.zoomrestore.padding.w + "px", height: f(window).height() - a.zoomrestore.padding.h + "px"
                });
                a.onResize();
                a.setScrollTop(Math.min(a.page.maxh, b))
            }
        };
        this.init();
        f.nicescroll.push(this)
    }, M = function (f) {
        var c = this;
        this.nc = f;
        this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
        this.snapy = this.snapx = !1;
        this.demuly = this.demulx = 0;
        this.lastscrolly = this.lastscrollx = -1;
        this.timer = this.chky = this.chkx = 0;
        this.time = function () {
            return +new Date
        };
        this.reset = function (f, h) {
            c.stop();
            var d = c.time();
            c.steptime =
                0;
            c.lasttime = d;
            c.speedx = 0;
            c.speedy = 0;
            c.lastx = f;
            c.lasty = h;
            c.lastscrollx = -1;
            c.lastscrolly = -1
        };
        this.update = function (f, h) {
            var d = c.time();
            c.steptime = d - c.lasttime;
            c.lasttime = d;
            var d = h - c.lasty, q = f - c.lastx, t = c.nc.getScrollTop(), a = c.nc.getScrollLeft(), t = t + d,
                a = a + q;
            c.snapx = 0 > a || a > c.nc.page.maxw;
            c.snapy = 0 > t || t > c.nc.page.maxh;
            c.speedx = q;
            c.speedy = d;
            c.lastx = f;
            c.lasty = h
        };
        this.stop = function () {
            c.nc.unsynched("domomentum2d");
            c.timer && clearTimeout(c.timer);
            c.timer = 0;
            c.lastscrollx = -1;
            c.lastscrolly = -1
        };
        this.doSnapy = function (f,
                                 h) {
            var d = !1;
            0 > h ? (h = 0, d = !0) : h > c.nc.page.maxh && (h = c.nc.page.maxh, d = !0);
            0 > f ? (f = 0, d = !0) : f > c.nc.page.maxw && (f = c.nc.page.maxw, d = !0);
            d ? c.nc.doScrollPos(f, h, c.nc.opt.snapbackspeed) : c.nc.triggerScrollEnd()
        };
        this.doMomentum = function (f) {
            var h = c.time(), d = f ? h + f : c.lasttime;
            f = c.nc.getScrollLeft();
            var q = c.nc.getScrollTop(), t = c.nc.page.maxh, a = c.nc.page.maxw;
            c.speedx = 0 < a ? Math.min(60, c.speedx) : 0;
            c.speedy = 0 < t ? Math.min(60, c.speedy) : 0;
            d = d && 60 >= h - d;
            if (0 > q || q > t || 0 > f || f > a) d = !1;
            f = c.speedx && d ? c.speedx : !1;
            if (c.speedy && d && c.speedy ||
                f) {
                var r = Math.max(16, c.steptime);
                50 < r && (f = r / 50, c.speedx *= f, c.speedy *= f, r = 50);
                c.demulxy = 0;
                c.lastscrollx = c.nc.getScrollLeft();
                c.chkx = c.lastscrollx;
                c.lastscrolly = c.nc.getScrollTop();
                c.chky = c.lastscrolly;
                var p = c.lastscrollx, e = c.lastscrolly, v = function () {
                    var d = 600 < c.time() - h ? .04 : .02;
                    c.speedx && (p = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = p, 0 > p || p > a) && (d = .1);
                    c.speedy && (e = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = e, 0 > e || e > t) && (d = .1);
                    c.demulxy = Math.min(1, c.demulxy +
                        d);
                    c.nc.synched("domomentum2d", function () {
                        c.speedx && (c.nc.getScrollLeft(), c.chkx = p, c.nc.setScrollLeft(p));
                        c.speedy && (c.nc.getScrollTop(), c.chky = e, c.nc.setScrollTop(e));
                        c.timer || (c.nc.hideCursor(), c.doSnapy(p, e))
                    });
                    1 > c.demulxy ? c.timer = setTimeout(v, r) : (c.stop(), c.nc.hideCursor(), c.doSnapy(p, e))
                };
                v()
            } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop())
        }
    }, y = f.fn.scrollTop;
    f.cssHooks.pageYOffset = {
        get: function (h, c, k) {
            return (c = f.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : y.call(h)
        }, set: function (h,
                          c) {
            var k = f.data(h, "__nicescroll") || !1;
            k && k.ishwscroll ? k.setScrollTop(parseInt(c)) : y.call(h, c);
            return this
        }
    };
    f.fn.scrollTop = function (h) {
        if (void 0 === h) {
            var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollTop() : y.call(this)
        }
        return this.each(function () {
            var c = f.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollTop(parseInt(h)) : y.call(f(this), h)
        })
    };
    var z = f.fn.scrollLeft;
    f.cssHooks.pageXOffset = {
        get: function (h, c, k) {
            return (c = f.data(h, "__nicescroll") || !1) && c.ishwscroll ?
                c.getScrollLeft() : z.call(h)
        }, set: function (h, c) {
            var k = f.data(h, "__nicescroll") || !1;
            k && k.ishwscroll ? k.setScrollLeft(parseInt(c)) : z.call(h, c);
            return this
        }
    };
    f.fn.scrollLeft = function (h) {
        if (void 0 === h) {
            var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollLeft() : z.call(this)
        }
        return this.each(function () {
            var c = f.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollLeft(parseInt(h)) : z.call(f(this), h)
        })
    };
    var E = function (h) {
        var c = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function (d) {
            f.each(c, d);
            return c
        };
        this.push = function (d) {
            c[c.length] = d;
            c.length++
        };
        this.eq = function (d) {
            return c[d]
        };
        if (h) for (var k = 0; k < h.length; k++) {
            var l = f.data(h[k], "__nicescroll") || !1;
            l && (this[this.length] = l, this.length++)
        }
        return this
    };
    (function (f, c, k) {
        for (var l = 0; l < c.length; l++) k(f, c[l])
    })(E.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function (f, c) {
        f[c] = function () {
            var f = arguments;
            return this.each(function () {
                this[c].apply(this, f)
            })
        }
    });
    f.fn.getNiceScroll =
        function (h) {
            return void 0 === h ? new E(this) : this[h] && f.data(this[h], "__nicescroll") || !1
        };
    f.expr[":"].nicescroll = function (h) {
        return void 0 !== f.data(h, "__nicescroll")
    };
    f.fn.niceScroll = function (h, c) {
        void 0 !== c || "object" != typeof h || "jquery" in h || (c = h, h = !1);
        c = f.extend({}, c);
        var k = new E;
        void 0 === c && (c = {});
        h && (c.doc = f(h), c.win = f(this));
        var l = !("doc" in c);
        l || "win" in c || (c.win = f(this));
        this.each(function () {
            var d = f(this).data("__nicescroll") || !1;
            d || (c.doc = l ? f(this) : c.doc, d = new S(c, f(this)), f(this).data("__nicescroll",
                d));
            k.push(d)
        });
        return 1 == k.length ? k[0] : k
    };
    window.NiceScroll = {
        getjQuery: function () {
            return f
        }
    };
    f.nicescroll || (f.nicescroll = new E, f.nicescroll.options = K)
});