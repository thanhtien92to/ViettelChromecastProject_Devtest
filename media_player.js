// Copyright Google Inc. All Rights Reserved.
(function() {
        'use strict';
        var h, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (c.get || c.set)
                throw new TypeError("ES3 does not support getters and setters.");
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        }
            , ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, ca = function() {
            ca = function() {}
            ;
            ba.Symbol || (ba.Symbol = da)
        }, ea = 0, da = function(a) {
            return "jscomp_symbol_" + (a || "") + ea++
        }, ga = function() {
            ca();
            var a = ba.Symbol.iterator;
            a || (a = ba.Symbol.iterator = ba.Symbol("iterator"));
            "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return fa(this)
                }
            });
            ga = function() {}
        }, fa = function(a) {
            var b = 0;
            return ha(function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            })
        }, ha = function(a) {
            ga();
            a = {
                next: a
            };
            a[ba.Symbol.iterator] = function() {
                return this
            }
            ;
            return a
        }, m = function(a) {
            ga();
            var b = a[Symbol.iterator];
            return b ? b.call(a) : fa(a)
        }, ia = function(a) {
            if (!(a instanceof Array)) {
                a = m(a);
                for (var b, c = []; !(b = a.next()).done; )
                    c.push(b.value);
                a = c
            }
            return a
        }, q = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            for (var d in b)
                if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(b, d);
                    e && Object.defineProperty(a, d, e)
                } else
                    a[d] = b[d]
        }, ja = ja || {}, r = this, t = function(a) {
            return void 0 !== a
        }, ka = function() {}, la = function(a) {
            a.Ng = void 0;
            a.ef = function() {
                return a.Ng ? a.Ng : a.Ng = new a
            }
        }, ma = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array)
                        return "array";
                    if (a instanceof Object)
                        return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c)
                        return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                        return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                        return "function"
                } else
                    return "null";
            else if ("function" == b && "undefined" == typeof a.call)
                return "object";
            return b
        }, na = function(a) {
            return "array" == ma(a)
        }, qa = function(a) {
            var b = ma(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        }, v = function(a) {
            return "string" == typeof a
        }, w = function(a) {
            return "number" == typeof a
        }, ra = function(a) {
            return "function" == ma(a)
        }, sa = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }, ta = function(a, b, c) {
            if (!a)
                throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        }, ua = function(a, b, c) {
            ua = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? sa : ta;
            return ua.apply(null, arguments)
        }, va = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        }, x = Date.now || function() {
                return +new Date
            }
            , y = function(a, b) {
            a = a.split(".");
            var c = r;
            a[0]in c || !c.execScript || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift()); )
                !a.length && t(b) ? c[d] = b : c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {}
        }, wa = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.Of = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.ol = function(a, c, f) {
                for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
                    d[e - 2] = arguments[e];
                return b.prototype[c].apply(a, d)
            }
        };
        var cast = r.cast || {};
        var xa = function() {
            return !(!cast.__platform__ || !cast.__platform__.metrics)
        }
            , ya = function(a, b) {
            xa() && cast.__platform__.metrics.logBoolToUma(a, b)
        }
            , za = function(a) {
            xa() && cast.__platform__.metrics.logEventToUma(a)
        }
            , z = function(a, b) {
            xa() && cast.__platform__.metrics.logIntToUma(a, b)
        };
        var Aa = function(a) {
            if (Error.captureStackTrace)
                Error.captureStackTrace(this, Aa);
            else {
                var b = Error().stack;
                b && (this.stack = b)
            }
            a && (this.message = String(a))
        };
        wa(Aa, Error);
        Aa.prototype.name = "CustomError";
        var Ba = function(a, b) {
            var c = String(b).toLowerCase();
            a = String(a.substr(0, b.length)).toLowerCase();
            return 0 == (c < a ? -1 : c == a ? 0 : 1)
        }
            , Ca = function(a, b) {
            for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; )
                d += c.shift() + e.shift();
            return d + c.join("%s")
        }
            , Da = String.prototype.trim ? function(a) {
            return a.trim()
        }
            : function(a) {
                return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
            }
            , Ea = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
        var Fa = function(a, b) {
            b.unshift(a);
            Aa.call(this, Ca.apply(null, b));
            b.shift()
        };
        wa(Fa, Aa);
        Fa.prototype.name = "AssertionError";
        var Ga = function(a, b) {
            throw new Fa("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
        };
        var Ha = function(a, b, c) {
            b = b || new Uint8Array(a.length);
            var d = 0;
            for (c = c || 0; d < a.length; d++)
                b[d + c] = a.charCodeAt(d);
            return b
        };
        var Ia = Array.prototype.indexOf ? function(a, b, c) {
            return Array.prototype.indexOf.call(a, b, c)
        }
            : function(a, b, c) {
                c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                if (v(a))
                    return v(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                for (; c < a.length; c++)
                    if (c in a && a[c] === b)
                        return c;
                return -1
            }
            , Ja = Array.prototype.lastIndexOf ? function(a, b, c) {
            return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
        }
            : function(a, b, c) {
                c = null == c ? a.length - 1 : c;
                0 > c && (c = Math.max(0, a.length + c));
                if (v(a))
                    return v(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
                for (; 0 <= c; c--)
                    if (c in a && a[c] === b)
                        return c;
                return -1
            }
            , Ka = Array.prototype.forEach ? function(a, b, c) {
            Array.prototype.forEach.call(a, b, c)
        }
            : function(a, b, c) {
                for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)
                    f in e && b.call(c, e[f], f, a)
            }
            , La = Array.prototype.map ? function(a, b, c) {
            return Array.prototype.map.call(a, b, c)
        }
            : function(a, b, c) {
                for (var d = a.length, e = Array(d), f = v(a) ? a.split("") : a, g = 0; g < d; g++)
                    g in f && (e[g] = b.call(c, f[g], g, a));
                return e
            }
            , Ma = Array.prototype.some ? function(a, b, c) {
            return Array.prototype.some.call(a, b, c)
        }
            : function(a, b, c) {
                for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)
                    if (f in e && b.call(c, e[f], f, a))
                        return !0;
                return !1
            }
            , Oa = function(a) {
            var b;
            a: {
                b = Na;
                for (var c = a.length, d = v(a) ? a.split("") : a, e = 0; e < c; e++)
                    if (e in d && b.call(void 0, d[e], e, a)) {
                        b = e;
                        break a
                    }
                b = -1
            }
            return 0 > b ? null : v(a) ? a.charAt(b) : a[b]
        }
            , Pa = function(a) {
            if (!na(a))
                for (var b = a.length - 1; 0 <= b; b--)
                    delete a[b];
            a.length = 0
        }
            , Qa = function(a, b) {
            b = Ia(a, b);
            var c;
            (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
            return c
        }
            , Ra = function(a) {
            return Array.prototype.concat.apply([], arguments)
        }
            , Sa = function(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++)
                    c[d] = a[d];
                return c
            }
            return []
        };
        var Ta = function(a, b) {
            for (var c in a)
                if (b.call(void 0, a[c], c, a))
                    return !0;
            return !1
        }
            , Ua = function(a) {
            var b = [], c = 0, d;
            for (d in a)
                b[c++] = a[d];
            return b
        }
            , Va = function(a) {
            var b = [], c = 0, d;
            for (d in a)
                b[c++] = d;
            return b
        }
            , Wa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
            , Xa = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d)
                    a[c] = d[c];
                for (var f = 0; f < Wa.length; f++)
                    c = Wa[f],
                    Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
        var Ya;
        a: {
            var Za = r.navigator;
            if (Za) {
                var $a = Za.userAgent;
                if ($a) {
                    Ya = $a;
                    break a
                }
            }
            Ya = ""
        }
        var ab = function(a) {
            return -1 != Ya.indexOf(a)
        };
        var bb = "StopIteration"in r ? r.StopIteration : {
            message: "StopIteration",
            stack: ""
        }
            , cb = function() {};
        cb.prototype.next = function() {
            throw bb;
        }
        ;
        cb.prototype.Ij = function() {
            return this
        }
        ;
        var db = function(a, b) {
            this.Ra = {};
            this.aa = [];
            this.Da = this.K = 0;
            var c = arguments.length;
            if (1 < c) {
                if (c % 2)
                    throw Error("Uneven number of arguments");
                for (var d = 0; d < c; d += 2)
                    this.set(arguments[d], arguments[d + 1])
            } else
                a && this.addAll(a)
        };
        h = db.prototype;
        h.sb = function() {
            return this.K
        }
        ;
        h.xa = function() {
            eb(this);
            for (var a = [], b = 0; b < this.aa.length; b++)
                a.push(this.Ra[this.aa[b]]);
            return a
        }
        ;
        h.za = function() {
            eb(this);
            return this.aa.concat()
        }
        ;
        h.Vb = function(a) {
            return fb(this.Ra, a)
        }
        ;
        h.rb = function(a, b) {
            if (this === a)
                return !0;
            if (this.K != a.sb())
                return !1;
            b = b || gb;
            eb(this);
            for (var c, d = 0; c = this.aa[d]; d++)
                if (!b(this.get(c), a.get(c)))
                    return !1;
            return !0
        }
        ;
        var gb = function(a, b) {
            return a === b
        };
        db.prototype.oa = function() {
            return 0 == this.K
        }
        ;
        db.prototype.clear = function() {
            this.Ra = {};
            this.Da = this.K = this.aa.length = 0
        }
        ;
        db.prototype.remove = function(a) {
            return fb(this.Ra, a) ? (delete this.Ra[a],
                this.K--,
                this.Da++,
            this.aa.length > 2 * this.K && eb(this),
                !0) : !1
        }
        ;
        var eb = function(a) {
            if (a.K != a.aa.length) {
                for (var b = 0, c = 0; b < a.aa.length; ) {
                    var d = a.aa[b];
                    fb(a.Ra, d) && (a.aa[c++] = d);
                    b++
                }
                a.aa.length = c
            }
            if (a.K != a.aa.length) {
                for (var e = {}, c = b = 0; b < a.aa.length; )
                    d = a.aa[b],
                    fb(e, d) || (a.aa[c++] = d,
                        e[d] = 1),
                        b++;
                a.aa.length = c
            }
        };
        h = db.prototype;
        h.get = function(a, b) {
            return fb(this.Ra, a) ? this.Ra[a] : b
        }
        ;
        h.set = function(a, b) {
            fb(this.Ra, a) || (this.K++,
                this.aa.push(a),
                this.Da++);
            this.Ra[a] = b
        }
        ;
        h.addAll = function(a) {
            var b;
            a instanceof db ? (b = a.za(),
                a = a.xa()) : (b = Va(a),
                a = Ua(a));
            for (var c = 0; c < b.length; c++)
                this.set(b[c], a[c])
        }
        ;
        h.forEach = function(a, b) {
            for (var c = this.za(), d = 0; d < c.length; d++) {
                var e = c[d]
                    , f = this.get(e);
                a.call(b, f, e, this)
            }
        }
        ;
        h.clone = function() {
            return new db(this)
        }
        ;
        h.Ij = function(a) {
            eb(this);
            var b = 0
                , c = this.Da
                , d = this
                , e = new cb;
            e.next = function() {
                if (c != d.Da)
                    throw Error("The map has changed since the iterator was created");
                if (b >= d.aa.length)
                    throw bb;
                var e = d.aa[b++];
                return a ? e : d.Ra[e]
            }
            ;
            return e
        }
        ;
        var fb = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        };
        var hb = function(a) {
            if (a.xa && "function" == typeof a.xa)
                return a.xa();
            if (v(a))
                return a.split("");
            if (qa(a)) {
                for (var b = [], c = a.length, d = 0; d < c; d++)
                    b.push(a[d]);
                return b
            }
            return Ua(a)
        }
            , ib = function(a, b, c) {
            if (a.forEach && "function" == typeof a.forEach)
                a.forEach(b, c);
            else if (qa(a) || v(a))
                Ka(a, b, c);
            else {
                var d;
                if (a.za && "function" == typeof a.za)
                    d = a.za();
                else if (a.xa && "function" == typeof a.xa)
                    d = void 0;
                else if (qa(a) || v(a)) {
                    d = [];
                    for (var e = a.length, f = 0; f < e; f++)
                        d.push(f)
                } else
                    d = Va(a);
                for (var e = hb(a), f = e.length, g = 0; g < f; g++)
                    b.call(c, e[g], d && d[g], a)
            }
        };
        var jb = function(a) {
            jb[" "](a);
            return a
        };
        jb[" "] = ka;
        var mb = function(a, b) {
            var c = lb;
            return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
        };
        var nb = ab("Opera"), ob = ab("Trident") || ab("MSIE"), pb = ab("Edge"), qb = ab("Gecko") && !(-1 != Ya.toLowerCase().indexOf("webkit") && !ab("Edge")) && !(ab("Trident") || ab("MSIE")) && !ab("Edge"), rb = -1 != Ya.toLowerCase().indexOf("webkit") && !ab("Edge"), sb = function() {
            var a = r.document;
            return a ? a.documentMode : void 0
        }, tb;
        a: {
            var ub = ""
                , vb = function() {
                var a = Ya;
                if (qb)
                    return /rv\:([^\);]+)(\)|;)/.exec(a);
                if (pb)
                    return /Edge\/([\d\.]+)/.exec(a);
                if (ob)
                    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (rb)
                    return /WebKit\/(\S+)/.exec(a);
                if (nb)
                    return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();
            vb && (ub = vb ? vb[1] : "");
            if (ob) {
                var wb = sb();
                if (null != wb && wb > parseFloat(ub)) {
                    tb = String(wb);
                    break a
                }
            }
            tb = ub
        }
        var xb = tb, lb = {}, yb = function(a) {
            return mb(a, function() {
                for (var b = 0, c = Da(String(xb)).split("."), d = Da(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || ""
                        , k = d[f] || "";
                    do {
                        g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                        k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                        if (0 == g[0].length && 0 == k[0].length)
                            break;
                        b = Ea(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == k[1].length ? 0 : parseInt(k[1], 10)) || Ea(0 == g[2].length, 0 == k[2].length) || Ea(g[2], k[2]);
                        g = g[3];
                        k = k[3]
                    } while (0 == b)
                }
                return 0 <= b
            })
        }, zb;
        var Ab = r.document;
        zb = Ab && ob ? sb() || ("CSS1Compat" == Ab.compatMode ? parseInt(xb, 10) : 5) : void 0;
        var Bb = function(a, b, c, d, e) {
            this.reset(a, b, c, d, e)
        };
        Bb.prototype.nc = 0;
        Bb.prototype.Ag = null;
        var Cb = 0;
        Bb.prototype.reset = function(a, b, c, d, e) {
            this.nc = "number" == typeof e ? e : Cb++;
            this.Id = d || x();
            this.Gc = a;
            this.Ni = b;
            this.Ji = c;
            delete this.Ag
        }
        ;
        Bb.prototype.xh = function(a) {
            this.Gc = a
        }
        ;
        var Db = function(a) {
            this.Jc = a;
            this.Vd = this.og = this.Gc = this.Na = null
        }
            , Eb = function(a, b) {
            this.name = a;
            this.value = b
        };
        Eb.prototype.toString = function() {
            return this.name
        }
        ;
        var Fb = new Eb("SHOUT",1200)
            , Gb = new Eb("SEVERE",1E3)
            , Hb = new Eb("WARNING",900)
            , Ib = new Eb("INFO",800)
            , Jb = new Eb("CONFIG",700)
            , Kb = new Eb("FINE",500)
            , Lb = [new Eb("OFF",Infinity), Fb, Gb, Hb, Ib, Jb, Kb, new Eb("FINER",400), new Eb("FINEST",300), new Eb("ALL",0)]
            , Mb = null
            , Nb = function(a) {
            if (!Mb) {
                Mb = {};
                for (var b = 0, c; c = Lb[b]; b++)
                    Mb[c.value] = c,
                        Mb[c.name] = c
            }
            if (a in Mb)
                return Mb[a];
            for (b = 0; b < Lb.length; ++b)
                if (c = Lb[b],
                    c.value <= a)
                    return c;
            return null
        };
        Db.prototype.getName = function() {
            return this.Jc
        }
        ;
        Db.prototype.getParent = function() {
            return this.Na
        }
        ;
        Db.prototype.xh = function(a) {
            this.Gc = a
        }
        ;
        var Ob = function(a) {
            if (a.Gc)
                return a.Gc;
            if (a.Na)
                return Ob(a.Na);
            Ga("Root logger has no level set.");
            return null
        };
        Db.prototype.log = function(a, b, c) {
            if (a.value >= Ob(this).value)
                for (ra(b) && (b = b()),
                         a = new Bb(a,String(b),this.Jc),
                     c && (a.Ag = c),
                         c = "log:" + a.Ni,
                     r.console && (r.console.timeStamp ? r.console.timeStamp(c) : r.console.markTimeline && r.console.markTimeline(c)),
                     r.msWriteProfilerMark && r.msWriteProfilerMark(c),
                         c = this; c; ) {
                    var d = c
                        , e = a;
                    if (d.Vd)
                        for (var f = 0; b = d.Vd[f]; f++)
                            b(e);
                    c = c.getParent()
                }
        }
        ;
        Db.prototype.info = function(a, b) {
            this.log(Ib, a, b)
        }
        ;
        var Pb = {}
            , Qb = null
            , Rb = function() {
            Qb || (Qb = new Db(""),
                Pb[""] = Qb,
                Qb.xh(Jb))
        }
            , Sb = function() {
            Rb();
            return Qb
        }
            , A = function(a) {
            Rb();
            var b;
            if (!(b = Pb[a])) {
                b = new Db(a);
                var c = a.lastIndexOf(".")
                    , d = a.substr(c + 1)
                    , c = A(a.substr(0, c));
                c.og || (c.og = {});
                c.og[d] = b;
                b.Na = c;
                Pb[a] = b
            }
            return b
        };
        var Tb = function() {
            this.oj = x()
        }
            , Ub = new Tb;
        Tb.prototype.set = function(a) {
            this.oj = a
        }
        ;
        Tb.prototype.reset = function() {
            this.set(x())
        }
        ;
        Tb.prototype.get = function() {
            return this.oj
        }
        ;
        var Vb = function(a) {
            this.Nk = a || "";
            this.gl = Ub
        };
        h = Vb.prototype;
        h.Lh = !0;
        h.vj = !0;
        h.cl = !0;
        h.bl = !0;
        h.wj = !1;
        h.dl = !1;
        var Wb = function(a) {
            return 10 > a ? "0" + a : String(a)
        }
            , Xb = function(a, b) {
            a = (a.Id - b) / 1E3;
            b = a.toFixed(3);
            var c = 0;
            if (1 > a)
                c = 2;
            else
                for (; 100 > a; )
                    c++,
                        a *= 10;
            for (; 0 < c--; )
                b = " " + b;
            return b
        }
            , Yb = function(a) {
            Vb.call(this, a)
        };
        wa(Yb, Vb);
        var Zb = function() {
            this.Tk = ua(this.Kj, this);
            this.cf = new Yb;
            this.cf.vj = !1;
            this.cf.wj = !1;
            this.si = this.cf.Lh = !1;
            this.gk = {}
        };
        Zb.prototype.Kj = function(a) {
            if (!this.gk[a.Ji]) {
                var b;
                b = this.cf;
                var c = [];
                c.push(b.Nk, " ");
                if (b.vj) {
                    var d = new Date(a.Id);
                    c.push("[", Wb(d.getFullYear() - 2E3) + Wb(d.getMonth() + 1) + Wb(d.getDate()) + " " + Wb(d.getHours()) + ":" + Wb(d.getMinutes()) + ":" + Wb(d.getSeconds()) + "." + Wb(Math.floor(d.getMilliseconds() / 10)), "] ")
                }
                b.cl && c.push("[", Xb(a, b.gl.get()), "s] ");
                b.bl && c.push("[", a.Ji, "] ");
                b.dl && c.push("[", a.Gc.name, "] ");
                c.push(a.Ni);
                b.wj && (d = a.Ag) && c.push("\n", d instanceof Error ? d.message : d.toString());
                b.Lh && c.push("\n");
                b = c.join("");
                if (c = $b)
                    switch (a.Gc) {
                        case Fb:
                            ac(c, "info", b);
                            break;
                        case Gb:
                            ac(c, "error", b);
                            break;
                        case Hb:
                            ac(c, "warn", b);
                            break;
                        default:
                            ac(c, "debug", b)
                    }
            }
        }
        ;
        var bc = null
            , $b = r.console
            , ac = function(a, b, c) {
            if (a[b])
                a[b](c);
            else
                a.log(c)
        };
        var cc = /^(-)?P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
            , dc = function(a, b, c, d, e, f) {
            v(a) ? (this.ad = "y" == a ? b : 0,
                this.Ic = "m" == a ? b : 0,
                this.Wb = "d" == a ? b : 0,
                this.ac = "h" == a ? b : 0,
                this.gc = "n" == a ? b : 0,
                this.mc = "s" == a ? b : 0) : (this.ad = a || 0,
                this.Ic = b || 0,
                this.Wb = c || 0,
                this.ac = d || 0,
                this.gc = e || 0,
                this.mc = f || 0)
        };
        dc.prototype.rb = function(a) {
            return a.ad == this.ad && a.Ic == this.Ic && a.Wb == this.Wb && a.ac == this.ac && a.gc == this.gc && a.mc == this.mc
        }
        ;
        dc.prototype.clone = function() {
            return new dc(this.ad,this.Ic,this.Wb,this.ac,this.gc,this.mc)
        }
        ;
        dc.prototype.add = function(a) {
            this.ad += a.ad;
            this.Ic += a.Ic;
            this.Wb += a.Wb;
            this.ac += a.ac;
            this.gc += a.gc;
            this.mc += a.mc
        }
        ;
        var B = function() {
            this.Qd = this.Qd;
            this.Af = this.Af
        };
        B.prototype.Qd = !1;
        B.prototype.M = function() {
            this.Qd || (this.Qd = !0,
                this.G())
        }
        ;
        B.prototype.G = function() {
            if (this.Af)
                for (; this.Af.length; )
                    this.Af.shift()()
        }
        ;
        var ec = function(a, b) {
            a && a.log(Gb, b, void 0)
        }
            , C = function(a, b) {
            a && a.log(Hb, b, void 0)
        }
            , D = function(a, b) {
            a && a.info(b, void 0)
        }
            , fc = function(a, b) {
            a && a.log(Kb, b, void 0)
        };
        var gc = function(a, b) {
            this.type = a;
            this.currentTarget = this.target = b;
            this.defaultPrevented = this.Mc = !1;
            this.qj = !0
        };
        gc.prototype.stopPropagation = function() {
            this.Mc = !0
        }
        ;
        gc.prototype.preventDefault = function() {
            this.defaultPrevented = !0;
            this.qj = !1
        }
        ;
        var hc;
        (hc = !ob) || (hc = 9 <= Number(zb));
        var ic = hc
            , jc = ob && !yb("9");
        !rb || yb("528");
        qb && yb("1.9b") || ob && yb("8") || nb && yb("9.5") || rb && yb("528");
        qb && !yb("8") || ob && yb("9");
        var kc = function(a, b) {
            gc.call(this, a ? a.type : "");
            this.relatedTarget = this.currentTarget = this.target = null;
            this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
            this.key = "";
            this.charCode = this.keyCode = 0;
            this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
            this.yc = this.state = null;
            a && this.da(a, b)
        };
        wa(kc, gc);
        kc.prototype.da = function(a, b) {
            var c = this.type = a.type
                , d = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            if (b = a.relatedTarget) {
                if (qb) {
                    var e;
                    a: {
                        try {
                            jb(b.nodeName);
                            e = !0;
                            break a
                        } catch (f) {}
                        e = !1
                    }
                    e || (b = null)
                }
            } else
                "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d ? (this.offsetX = rb || void 0 !== a.offsetX ? a.offsetX : a.layerX,
                this.offsetY = rb || void 0 !== a.offsetY ? a.offsetY : a.layerY,
                this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
                this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
                this.screenX = a.screenX || 0,
                this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
                this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
                this.screenX = d.screenX || 0,
                this.screenY = d.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.state = a.state;
            this.yc = a;
            a.defaultPrevented && this.preventDefault()
        }
        ;
        kc.prototype.stopPropagation = function() {
            kc.Of.stopPropagation.call(this);
            this.yc.stopPropagation ? this.yc.stopPropagation() : this.yc.cancelBubble = !0
        }
        ;
        kc.prototype.preventDefault = function() {
            kc.Of.preventDefault.call(this);
            var a = this.yc;
            if (a.preventDefault)
                a.preventDefault();
            else if (a.returnValue = !1,
                    jc)
                try {
                    if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                        a.keyCode = -1
                } catch (b) {}
        }
        ;
        var lc = "closure_listenable_" + (1E6 * Math.random() | 0)
            , mc = 0;
        var nc = function(a, b, c, d, e) {
            this.listener = a;
            this.Ff = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.kf = e;
            this.key = ++mc;
            this.Ad = this.Ze = !1
        }
            , oc = function(a) {
            a.Ad = !0;
            a.listener = null;
            a.Ff = null;
            a.src = null;
            a.kf = null
        };
        var pc = function(a) {
            this.src = a;
            this.la = {};
            this.Pe = 0
        };
        pc.prototype.add = function(a, b, c, d, e) {
            var f = a.toString();
            a = this.la[f];
            a || (a = this.la[f] = [],
                this.Pe++);
            var g = qc(a, b, d, e);
            -1 < g ? (b = a[g],
            c || (b.Ze = !1)) : (b = new nc(b,this.src,f,!!d,e),
                b.Ze = c,
                a.push(b));
            return b
        }
        ;
        pc.prototype.remove = function(a, b, c, d) {
            a = a.toString();
            if (!(a in this.la))
                return !1;
            var e = this.la[a];
            b = qc(e, b, c, d);
            return -1 < b ? (oc(e[b]),
                Array.prototype.splice.call(e, b, 1),
            0 == e.length && (delete this.la[a],
                this.Pe--),
                !0) : !1
        }
        ;
        var rc = function(a, b) {
            var c = b.type;
            c in a.la && Qa(a.la[c], b) && (oc(b),
            0 == a.la[c].length && (delete a.la[c],
                a.Pe--))
        };
        pc.prototype.Fg = function(a, b, c, d) {
            a = this.la[a.toString()];
            var e = -1;
            a && (e = qc(a, b, c, d));
            return -1 < e ? a[e] : null
        }
        ;
        pc.prototype.hasListener = function(a, b) {
            var c = t(a)
                , d = c ? a.toString() : ""
                , e = t(b);
            return Ta(this.la, function(a) {
                for (var f = 0; f < a.length; ++f)
                    if (!(c && a[f].type != d || e && a[f].capture != b))
                        return !0;
                return !1
            })
        }
        ;
        var qc = function(a, b, c, d) {
            for (var e = 0; e < a.length; ++e) {
                var f = a[e];
                if (!f.Ad && f.listener == b && f.capture == !!c && f.kf == d)
                    return e
            }
            return -1
        };
        var sc = "closure_lm_" + (1E6 * Math.random() | 0)
            , tc = {}
            , uc = 0
            , E = function(a, b, c, d, e) {
            if (na(b))
                for (var f = 0; f < b.length; f++)
                    E(a, b[f], c, d, e);
            else
                c = vc(c),
                    a && a[lc] ? a.eb.add(String(b), c, !1, d, e) : wc(a, b, c, !1, d, e)
        }
            , wc = function(a, b, c, d, e, f) {
            if (!b)
                throw Error("Invalid event type");
            var g = !!e
                , k = xc(a);
            k || (a[sc] = k = new pc(a));
            c = k.add(b, c, d, e, f);
            if (!c.Ff) {
                d = yc();
                c.Ff = d;
                d.src = a;
                d.listener = c;
                if (a.addEventListener)
                    a.addEventListener(b.toString(), d, g);
                else if (a.attachEvent)
                    a.attachEvent(zc(b.toString()), d);
                else
                    throw Error("addEventListener and attachEvent are unavailable.");
                uc++
            }
        }
            , yc = function() {
            var a = Ac
                , b = ic ? function(c) {
                    return a.call(b.src, b.listener, c)
                }
                    : function(c) {
                        c = a.call(b.src, b.listener, c);
                        if (!c)
                            return c
                    }
            ;
            return b
        }
            , Bc = function(a, b, c, d, e) {
            if (na(b))
                for (var f = 0; f < b.length; f++)
                    Bc(a, b[f], c, d, e);
            else
                c = vc(c),
                    a && a[lc] ? a.eb.add(String(b), c, !0, d, e) : wc(a, b, c, !0, d, e)
        }
            , Cc = function(a, b, c, d, e) {
            if (na(b))
                for (var f = 0; f < b.length; f++)
                    Cc(a, b[f], c, d, e);
            else
                c = vc(c),
                    a && a[lc] ? a.eb.remove(String(b), c, d, e) : a && (a = xc(a)) && (b = a.Fg(b, c, !!d, e)) && Dc(b)
        }
            , Dc = function(a) {
            if (!w(a) && a && !a.Ad) {
                var b = a.src;
                if (b && b[lc])
                    rc(b.eb, a);
                else {
                    var c = a.type
                        , d = a.Ff;
                    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(zc(c), d);
                    uc--;
                    (c = xc(b)) ? (rc(c, a),
                    0 == c.Pe && (c.src = null,
                        b[sc] = null)) : oc(a)
                }
            }
        }
            , zc = function(a) {
            return a in tc ? tc[a] : tc[a] = "on" + a
        }
            , Fc = function(a, b, c, d) {
            var e = !0;
            if (a = xc(a))
                if (b = a.la[b.toString()])
                    for (b = b.concat(),
                             a = 0; a < b.length; a++) {
                        var f = b[a];
                        f && f.capture == c && !f.Ad && (f = Ec(f, d),
                            e = e && !1 !== f)
                    }
            return e
        }
            , Ec = function(a, b) {
            var c = a.listener
                , d = a.kf || a.src;
            a.Ze && Dc(a);
            return c.call(d, b)
        }
            , Ac = function(a, b) {
            if (a.Ad)
                return !0;
            if (!ic) {
                if (!b)
                    a: {
                        b = ["window", "event"];
                        for (var c = r, d; d = b.shift(); )
                            if (null != c[d])
                                c = c[d];
                            else {
                                b = null;
                                break a
                            }
                        b = c
                    }
                d = b;
                b = new kc(d,this);
                c = !0;
                if (!(0 > d.keyCode || void 0 != d.returnValue)) {
                    a: {
                        var e = !1;
                        if (0 == d.keyCode)
                            try {
                                d.keyCode = -1;
                                break a
                            } catch (g) {
                                e = !0
                            }
                        if (e || void 0 == d.returnValue)
                            d.returnValue = !0
                    }
                    d = [];
                    for (e = b.currentTarget; e; e = e.parentNode)
                        d.push(e);
                    a = a.type;
                    for (e = d.length - 1; !b.Mc && 0 <= e; e--) {
                        b.currentTarget = d[e];
                        var f = Fc(d[e], a, !0, b)
                            , c = c && f
                    }
                    for (e = 0; !b.Mc && e < d.length; e++)
                        b.currentTarget = d[e],
                            f = Fc(d[e], a, !1, b),
                            c = c && f
                }
                return c
            }
            return Ec(a, new kc(b,this))
        }
            , xc = function(a) {
            a = a[sc];
            return a instanceof pc ? a : null
        }
            , Gc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
            , vc = function(a) {
            if (ra(a))
                return a;
            a[Gc] || (a[Gc] = function(b) {
                    return a.handleEvent(b)
                }
            );
            return a[Gc]
        };
        var Hc = function() {
            B.call(this);
            this.eb = new pc(this);
            this.Jj = this;
            this.ih = null
        };
        wa(Hc, B);
        Hc.prototype[lc] = !0;
        Hc.prototype.addEventListener = function(a, b, c, d) {
            E(this, a, b, c, d)
        }
        ;
        Hc.prototype.removeEventListener = function(a, b, c, d) {
            Cc(this, a, b, c, d)
        }
        ;
        Hc.prototype.dispatchEvent = function(a) {
            var b, c = this.ih;
            if (c)
                for (b = []; c; c = c.ih)
                    b.push(c);
            var c = this.Jj
                , d = a.type || a;
            if (v(a))
                a = new gc(a,c);
            else if (a instanceof gc)
                a.target = a.target || c;
            else {
                var e = a;
                a = new gc(d,c);
                Xa(a, e)
            }
            var e = !0, f;
            if (b)
                for (var g = b.length - 1; !a.Mc && 0 <= g; g--)
                    f = a.currentTarget = b[g],
                        e = Ic(f, d, !0, a) && e;
            a.Mc || (f = a.currentTarget = c,
                e = Ic(f, d, !0, a) && e,
            a.Mc || (e = Ic(f, d, !1, a) && e));
            if (b)
                for (g = 0; !a.Mc && g < b.length; g++)
                    f = a.currentTarget = b[g],
                        e = Ic(f, d, !1, a) && e;
            return e
        }
        ;
        Hc.prototype.G = function() {
            Hc.Of.G.call(this);
            if (this.eb) {
                var a = this.eb, b = 0, c;
                for (c in a.la) {
                    for (var d = a.la[c], e = 0; e < d.length; e++)
                        ++b,
                            oc(d[e]);
                    delete a.la[c];
                    a.Pe--
                }
            }
            this.ih = null
        }
        ;
        var Ic = function(a, b, c, d) {
            b = a.eb.la[String(b)];
            if (!b)
                return !0;
            b = b.concat();
            for (var e = !0, f = 0; f < b.length; ++f) {
                var g = b[f];
                if (g && !g.Ad && g.capture == c) {
                    var k = g.listener
                        , l = g.kf || g.src;
                    g.Ze && rc(a.eb, g);
                    e = !1 !== k.call(l, d) && e
                }
            }
            return e && 0 != d.qj
        };
        Hc.prototype.Fg = function(a, b, c, d) {
            return this.eb.Fg(String(a), b, c, d)
        }
        ;
        Hc.prototype.hasListener = function(a, b) {
            return this.eb.hasListener(t(a) ? String(a) : void 0, b)
        }
        ;
        var Jc = function(a) {
            return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
        }
            , Kc = function(a) {
            a = String(a);
            if (Jc(a))
                try {
                    return eval("(" + a + ")")
                } catch (b) {}
            throw Error("Invalid JSON string: " + a);
        };
        var Lc = function(a, b, c) {
            this.wk = c;
            this.Uj = a;
            this.Uk = b;
            this.zf = 0;
            this.lf = null
        };
        Lc.prototype.get = function() {
            var a;
            0 < this.zf ? (this.zf--,
                a = this.lf,
                this.lf = a.next,
                a.next = null) : a = this.Uj();
            return a
        }
        ;
        Lc.prototype.put = function(a) {
            this.Uk(a);
            this.zf < this.wk && (this.zf++,
                a.next = this.lf,
                this.lf = a)
        }
        ;
        var Mc = function(a) {
            r.setTimeout(function() {
                throw a;
            }, 0)
        }, Nc, Oc = function() {
            var a = r.MessageChannel;
            "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !ab("Presto") && (a = function() {
                    var a = document.createElement("IFRAME");
                    a.style.display = "none";
                    a.src = "";
                    document.documentElement.appendChild(a);
                    var b = a.contentWindow
                        , a = b.document;
                    a.open();
                    a.write("");
                    a.close();
                    var c = "callImmediate" + Math.random()
                        , d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host
                        , a = ua(function(a) {
                        if (("*" == d || a.origin == d) && a.data == c)
                            this.port1.onmessage()
                    }, this);
                    b.addEventListener("message", a, !1);
                    this.port1 = {};
                    this.port2 = {
                        postMessage: function() {
                            b.postMessage(c, d)
                        }
                    }
                }
            );
            if ("undefined" !== typeof a && !ab("Trident") && !ab("MSIE")) {
                var b = new a
                    , c = {}
                    , d = c;
                b.port1.onmessage = function() {
                    if (t(c.next)) {
                        c = c.next;
                        var a = c.Sh;
                        c.Sh = null;
                        a()
                    }
                }
                ;
                return function(a) {
                    d.next = {
                        Sh: a
                    };
                    d = d.next;
                    b.port2.postMessage(0)
                }
            }
            return "undefined" !== typeof document && "onreadystatechange"in document.createElement("SCRIPT") ? function(a) {
                var b = document.createElement("SCRIPT");
                b.onreadystatechange = function() {
                    b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null
                }
                ;
                document.documentElement.appendChild(b)
            }
                : function(a) {
                    r.setTimeout(a, 0)
                }
        };
        var Pc = function() {
            this.ag = this.Md = null
        }
            , Rc = new Lc(function() {
                return new Qc
            }
            ,function(a) {
                a.reset()
            }
            ,100);
        Pc.prototype.add = function(a, b) {
            var c = Rc.get();
            c.set(a, b);
            this.ag ? this.ag.next = c : this.Md = c;
            this.ag = c
        }
        ;
        Pc.prototype.remove = function() {
            var a = null;
            this.Md && (a = this.Md,
                this.Md = this.Md.next,
            this.Md || (this.ag = null),
                a.next = null);
            return a
        }
        ;
        var Qc = function() {
            this.next = this.scope = this.ld = null
        };
        Qc.prototype.set = function(a, b) {
            this.ld = a;
            this.scope = b;
            this.next = null
        }
        ;
        Qc.prototype.reset = function() {
            this.next = this.scope = this.ld = null
        }
        ;
        var Wc = function(a, b) {
            Sc || Tc();
            Uc || (Sc(),
                Uc = !0);
            Vc.add(a, b)
        }, Sc, Tc = function() {
            if (-1 != String(r.Promise).indexOf("[native code]")) {
                var a = r.Promise.resolve(void 0);
                Sc = function() {
                    a.then(Xc)
                }
            } else
                Sc = function() {
                    var a = Xc;
                    !ra(r.setImmediate) || r.Window && r.Window.prototype && !ab("Edge") && r.Window.prototype.setImmediate == r.setImmediate ? (Nc || (Nc = Oc()),
                        Nc(a)) : r.setImmediate(a)
                }
        }, Uc = !1, Vc = new Pc, Xc = function() {
            for (var a; a = Vc.remove(); ) {
                try {
                    a.ld.call(a.scope)
                } catch (b) {
                    Mc(b)
                }
                Rc.put(a)
            }
            Uc = !1
        };
        var F = function(a, b) {
            this.g = 0;
            this.pj = void 0;
            this.dd = this.Tb = this.Na = null;
            this.hf = this.Bg = !1;
            if (a != ka)
                try {
                    var c = this;
                    a.call(b, function(a) {
                        Yc(c, 2, a)
                    }, function(a) {
                        if (!(a instanceof Zc))
                            try {
                                if (a instanceof Error)
                                    throw a;
                                throw Error("Promise rejected.");
                            } catch (e) {}
                        Yc(c, 3, a)
                    })
                } catch (d) {
                    Yc(this, 3, d)
                }
        }
            , $c = function() {
            this.next = this.context = this.td = this.ne = this.wc = null;
            this.Se = !1
        };
        $c.prototype.reset = function() {
            this.context = this.td = this.ne = this.wc = null;
            this.Se = !1
        }
        ;
        var ad = new Lc(function() {
                return new $c
            }
            ,function(a) {
                a.reset()
            }
            ,100)
            , bd = function(a, b, c) {
            var d = ad.get();
            d.ne = a;
            d.td = b;
            d.context = c;
            return d
        }
            , cd = function(a) {
            return new F(function(b, c) {
                    c(a)
                }
            )
        }
            , ed = function() {
            var a, b, c = new F(function(c, e) {
                    a = c;
                    b = e
                }
            );
            return new dd(c,a,b)
        };
        F.prototype.then = function(a, b, c) {
            return fd(this, ra(a) ? a : null, ra(b) ? b : null, c)
        }
        ;
        F.prototype.then = F.prototype.then;
        F.prototype.$goog_Thenable = !0;
        var gd = function(a, b) {
            fd(a, null, b, void 0)
        };
        F.prototype.cancel = function(a) {
            0 == this.g && Wc(function() {
                var b = new Zc(a);
                hd(this, b)
            }, this)
        }
        ;
        var hd = function(a, b) {
            if (0 == a.g)
                if (a.Na) {
                    var c = a.Na;
                    if (c.Tb) {
                        for (var d = 0, e = null, f = null, g = c.Tb; g && (g.Se || (d++,
                        g.wc == a && (e = g),
                            !(e && 1 < d))); g = g.next)
                            e || (f = g);
                        e && (0 == c.g && 1 == d ? hd(c, b) : (f ? (d = f,
                        d.next == c.dd && (c.dd = d),
                            d.next = d.next.next) : id(c),
                            jd(c, e, 3, b)))
                    }
                    a.Na = null
                } else
                    Yc(a, 3, b)
        }
            , ld = function(a, b) {
            a.Tb || 2 != a.g && 3 != a.g || kd(a);
            a.dd ? a.dd.next = b : a.Tb = b;
            a.dd = b
        }
            , fd = function(a, b, c, d) {
            var e = bd(null, null, null);
            e.wc = new F(function(a, g) {
                    e.ne = b ? function(c) {
                        try {
                            var e = b.call(d, c);
                            a(e)
                        } catch (n) {
                            g(n)
                        }
                    }
                        : a;
                    e.td = c ? function(b) {
                        try {
                            var e = c.call(d, b);
                            !t(e) && b instanceof Zc ? g(b) : a(e)
                        } catch (n) {
                            g(n)
                        }
                    }
                        : g
                }
            );
            e.wc.Na = a;
            ld(a, e);
            return e.wc
        };
        F.prototype.il = function(a) {
            this.g = 0;
            Yc(this, 2, a)
        }
        ;
        F.prototype.jl = function(a) {
            this.g = 0;
            Yc(this, 3, a)
        }
        ;
        var Yc = function(a, b, c) {
            if (0 == a.g) {
                a === c && (b = 3,
                    c = new TypeError("Promise cannot resolve to itself"));
                a.g = 1;
                var d;
                a: {
                    var e = c
                        , f = a.il
                        , g = a.jl;
                    if (e instanceof F)
                        ld(e, bd(f || ka, g || null, a)),
                            d = !0;
                    else {
                        var k;
                        if (e)
                            try {
                                k = !!e.$goog_Thenable
                            } catch (n) {
                                k = !1
                            }
                        else
                            k = !1;
                        if (k)
                            e.then(f, g, a),
                                d = !0;
                        else {
                            k = typeof e;
                            if ("object" == k && null != e || "function" == k)
                                try {
                                    var l = e.then;
                                    if (ra(l)) {
                                        md(e, l, f, g, a);
                                        d = !0;
                                        break a
                                    }
                                } catch (n) {
                                    g.call(a, n);
                                    d = !0;
                                    break a
                                }
                            d = !1
                        }
                    }
                }
                d || (a.pj = c,
                    a.g = b,
                    a.Na = null,
                    kd(a),
                3 != b || c instanceof Zc || nd(a, c))
            }
        }
            , md = function(a, b, c, d, e) {
            var f = !1
                , g = function(a) {
                f || (f = !0,
                    c.call(e, a))
            }
                , k = function(a) {
                f || (f = !0,
                    d.call(e, a))
            };
            try {
                b.call(a, g, k)
            } catch (l) {
                k(l)
            }
        }
            , kd = function(a) {
            a.Bg || (a.Bg = !0,
                Wc(a.fk, a))
        }
            , id = function(a) {
            var b = null;
            a.Tb && (b = a.Tb,
                a.Tb = b.next,
                b.next = null);
            a.Tb || (a.dd = null);
            return b
        };
        F.prototype.fk = function() {
            for (var a; a = id(this); )
                jd(this, a, this.g, this.pj);
            this.Bg = !1
        }
        ;
        var jd = function(a, b, c, d) {
            if (3 == c && b.td && !b.Se)
                for (; a && a.hf; a = a.Na)
                    a.hf = !1;
            if (b.wc)
                b.wc.Na = null,
                    od(b, c, d);
            else
                try {
                    b.Se ? b.ne.call(b.context) : od(b, c, d)
                } catch (e) {
                    pd.call(null, e)
                }
            ad.put(b)
        }
            , od = function(a, b, c) {
            2 == b ? a.ne.call(a.context, c) : a.td && a.td.call(a.context, c)
        }
            , nd = function(a, b) {
            a.hf = !0;
            Wc(function() {
                a.hf && pd.call(null, b)
            })
        }
            , pd = Mc
            , Zc = function(a) {
            Aa.call(this, a)
        };
        wa(Zc, Aa);
        Zc.prototype.name = "cancel";
        var dd = function(a, b, c) {
            this.kj = a;
            this.resolve = b;
            this.reject = c
        };
        var qd = function(a, b, c) {
            if (ra(a))
                c && (a = ua(a, c));
            else if (a && "function" == typeof a.handleEvent)
                a = ua(a.handleEvent, a);
            else
                throw Error("Invalid listener argument");
            return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0)
        };
        var rd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
            , sd = function(a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("="), e, f = null;
                    0 <= d ? (e = a[c].substring(0, d),
                        f = a[c].substring(d + 1)) : e = a[c];
                    b(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
                }
            }
        };
        var td = function() {};
        td.prototype.Rh = null;
        var vd = function(a) {
            var b;
            (b = a.Rh) || (b = {},
            ud(a) && (b[0] = !0,
                b[1] = !0),
                b = a.Rh = b);
            return b
        };
        var wd, xd = function() {};
        wa(xd, td);
        var yd = function(a) {
            return (a = ud(a)) ? new ActiveXObject(a) : new XMLHttpRequest
        }
            , ud = function(a) {
            if (!a.pi && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
                for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                    var d = b[c];
                    try {
                        return new ActiveXObject(d),
                            a.pi = d
                    } catch (e) {}
                }
                throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
            }
            return a.pi
        };
        wd = new xd;
        var H = function(a) {
            Hc.call(this);
            this.headers = new db;
            this.eg = a || null;
            this.Rb = !1;
            this.dg = this.s = null;
            this.Hi = this.je = "";
            this.yb = 0;
            this.ie = "";
            this.Ac = this.Kg = this.nf = this.xg = !1;
            this.Nb = 0;
            this.fa = null;
            this.lc = "";
            this.Zf = this.Rk = this.Ld = !1
        };
        wa(H, Hc);
        H.prototype.ma = A("goog.net.XhrIo");
        var zd = /^https?$/i
            , Ad = ["POST", "PUT"];
        H.prototype.send = function(a, b, c, d) {
            if (this.s)
                throw Error("[goog.net.XhrIo] Object is active with another request=" + this.je + "; newUri=" + a);
            b = b ? b.toUpperCase() : "GET";
            this.je = a;
            this.ie = "";
            this.yb = 0;
            this.Hi = b;
            this.xg = !1;
            this.Rb = !0;
            this.s = this.tg();
            this.dg = this.eg ? vd(this.eg) : vd(wd);
            this.s.onreadystatechange = ua(this.$i, this);
            this.Rk && "onprogress"in this.s && (this.s.onprogress = ua(function(a) {
                this.Zi(a, !0)
            }, this),
            this.s.upload && (this.s.upload.onprogress = ua(this.Zi, this)));
            try {
                fc(this.ma, Bd(this, "Opening Xhr")),
                    this.Kg = !0,
                    this.s.open(b, String(a), !0),
                    this.Kg = !1
            } catch (f) {
                fc(this.ma, Bd(this, "Error opening Xhr: " + f.message));
                Cd(this, f);
                return
            }
            a = c || "";
            var e = this.headers.clone();
            d && ib(d, function(a, b) {
                e.set(b, a)
            });
            d = Oa(e.za());
            c = r.FormData && a instanceof r.FormData;
            !(0 <= Ia(Ad, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            e.forEach(function(a, b) {
                this.s.setRequestHeader(b, a)
            }, this);
            this.lc && (this.s.responseType = this.lc);
            "withCredentials"in this.s && this.s.withCredentials !== this.Ld && (this.s.withCredentials = this.Ld);
            try {
                Dd(this),
                0 < this.Nb && (this.Zf = Ed(this.s),
                    fc(this.ma, Bd(this, "Will abort after " + this.Nb + "ms if incomplete, xhr2 " + this.Zf)),
                    this.Zf ? (this.s.timeout = this.Nb,
                        this.s.ontimeout = ua(this.Cj, this)) : this.fa = qd(this.Cj, this.Nb, this)),
                    fc(this.ma, Bd(this, "Sending request")),
                    this.nf = !0,
                    this.s.send(a),
                    this.nf = !1
            } catch (f) {
                fc(this.ma, Bd(this, "Send error: " + f.message)),
                    Cd(this, f)
            }
        }
        ;
        var Ed = function(a) {
            return ob && yb(9) && w(a.timeout) && t(a.ontimeout)
        }
            , Na = function(a) {
            return "content-type" == a.toLowerCase()
        };
        H.prototype.tg = function() {
            return this.eg ? yd(this.eg) : yd(wd)
        }
        ;
        H.prototype.Cj = function() {
            "undefined" != typeof ja && this.s && (this.ie = "Timed out after " + this.Nb + "ms, aborting",
                this.yb = 8,
                fc(this.ma, Bd(this, this.ie)),
                this.dispatchEvent("timeout"),
                this.abort(8))
        }
        ;
        var Cd = function(a, b) {
            a.Rb = !1;
            a.s && (a.Ac = !0,
                a.s.abort(),
                a.Ac = !1);
            a.ie = b;
            a.yb = 5;
            Fd(a);
            Gd(a)
        }
            , Fd = function(a) {
            a.xg || (a.xg = !0,
                a.dispatchEvent("complete"),
                a.dispatchEvent("error"))
        };
        H.prototype.abort = function(a) {
            this.s && this.Rb && (fc(this.ma, Bd(this, "Aborting")),
                this.Rb = !1,
                this.Ac = !0,
                this.s.abort(),
                this.Ac = !1,
                this.yb = a || 7,
                this.dispatchEvent("complete"),
                this.dispatchEvent("abort"),
                Gd(this))
        }
        ;
        H.prototype.G = function() {
            this.s && (this.Rb && (this.Rb = !1,
                this.Ac = !0,
                this.s.abort(),
                this.Ac = !1),
                Gd(this, !0));
            H.Of.G.call(this)
        }
        ;
        H.prototype.$i = function() {
            this.Qd || (this.Kg || this.nf || this.Ac ? Hd(this) : this.Fk())
        }
        ;
        H.prototype.Fk = function() {
            Hd(this)
        }
        ;
        var Hd = function(a) {
            if (a.Rb && "undefined" != typeof ja)
                if (a.dg[1] && 4 == Id(a) && 2 == Jd(a))
                    fc(a.ma, Bd(a, "Local request error detected and ignored"));
                else if (a.nf && 4 == Id(a))
                    qd(a.$i, 0, a);
                else if (a.dispatchEvent("readystatechange"),
                    4 == Id(a)) {
                    fc(a.ma, Bd(a, "Request complete"));
                    a.Rb = !1;
                    try {
                        var b = Jd(a), c;
                        a: switch (b) {
                            case 200:
                            case 201:
                            case 202:
                            case 204:
                            case 206:
                            case 304:
                            case 1223:
                                c = !0;
                                break a;
                            default:
                                c = !1
                        }
                        var d;
                        if (!(d = c)) {
                            var e;
                            if (e = 0 === b) {
                                var f = String(a.je).match(rd)[1] || null;
                                if (!f && r.self && r.self.location)
                                    var g = r.self.location.protocol
                                        , f = g.substr(0, g.length - 1);
                                e = !zd.test(f ? f.toLowerCase() : "")
                            }
                            d = e
                        }
                        if (d)
                            a.dispatchEvent("complete"),
                                a.dispatchEvent("success");
                        else {
                            a.yb = 6;
                            var k;
                            try {
                                k = 2 < Id(a) ? a.s.statusText : ""
                            } catch (l) {
                                fc(a.ma, "Can not get status: " + l.message),
                                    k = ""
                            }
                            a.ie = k + " [" + Jd(a) + "]";
                            Fd(a)
                        }
                    } finally {
                        Gd(a)
                    }
                }
        };
        H.prototype.Zi = function(a, b) {
            this.dispatchEvent(Kd(a, "progress"));
            this.dispatchEvent(Kd(a, b ? "downloadprogress" : "uploadprogress"))
        }
        ;
        var Kd = function(a, b) {
            return {
                type: b,
                lengthComputable: a.lengthComputable,
                loaded: a.loaded,
                total: a.total
            }
        }
            , Gd = function(a, b) {
            if (a.s) {
                Dd(a);
                var c = a.s
                    , d = a.dg[0] ? ka : null;
                a.s = null;
                a.dg = null;
                b || a.dispatchEvent("ready");
                try {
                    c.onreadystatechange = d
                } catch (e) {
                    ec(a.ma, "Problem encountered resetting onreadystatechange: " + e.message)
                }
            }
        }
            , Dd = function(a) {
            a.s && a.Zf && (a.s.ontimeout = null);
            w(a.fa) && (r.clearTimeout(a.fa),
                a.fa = null)
        };
        H.prototype.be = function() {
            return !!this.s
        }
        ;
        var Id = function(a) {
            return a.s ? a.s.readyState : 0
        }
            , Jd = function(a) {
            try {
                return 2 < Id(a) ? a.s.status : -1
            } catch (b) {
                return -1
            }
        }
            , Ld = function(a) {
            try {
                if (!a.s)
                    return null;
                if ("response"in a.s)
                    return a.s.response;
                switch (a.lc) {
                    case "":
                    case "text":
                        return a.s.responseText;
                    case "arraybuffer":
                        if ("mozResponseArrayBuffer"in a.s)
                            return a.s.mozResponseArrayBuffer
                }
                ec(a.ma, "Response type " + a.lc + " is not supported on this browser");
                return null
            } catch (b) {
                return fc(a.ma, "Can not get response: " + b.message),
                    null
            }
        };
        H.prototype.getResponseHeader = function(a) {
            if (this.s && 4 == Id(this))
                return a = this.s.getResponseHeader(a),
                    null === a ? void 0 : a
        }
        ;
        H.prototype.getAllResponseHeaders = function() {
            return this.s && 4 == Id(this) ? this.s.getAllResponseHeaders() : ""
        }
        ;
        var Bd = function(a, b) {
            return b + " [" + a.Hi + " " + a.je + " " + Jd(a) + "]"
        };
        var Md = function(a, b) {
            this.Ei = a;
            this.$f = b
        };
        Md.prototype.getKey = function() {
            return this.Ei
        }
        ;
        Md.prototype.clone = function() {
            return new Md(this.Ei,this.$f)
        }
        ;
        var Nd = function(a) {
            this.Ma = [];
            if (a)
                a: {
                    var b;
                    if (a instanceof Nd) {
                        if (b = a.za(),
                                a = a.xa(),
                            0 >= this.sb()) {
                            for (var c = this.Ma, d = 0; d < b.length; d++)
                                c.push(new Md(b[d],a[d]));
                            break a
                        }
                    } else
                        b = Va(a),
                            a = Ua(a);
                    for (d = 0; d < b.length; d++)
                        this.insert(b[d], a[d])
                }
        };
        h = Nd.prototype;
        h.insert = function(a, b) {
            var c = this.Ma;
            c.push(new Md(a,b));
            a = c.length - 1;
            b = this.Ma;
            for (c = b[a]; 0 < a; ) {
                var d = a - 1 >> 1;
                if (b[d].getKey() > c.getKey())
                    b[a] = b[d],
                        a = d;
                else
                    break
            }
            b[a] = c
        }
        ;
        h.remove = function() {
            var a = this.Ma
                , b = a.length
                , c = a[0];
            if (!(0 >= b)) {
                if (1 == b)
                    Pa(a);
                else {
                    a[0] = a.pop();
                    for (var a = 0, b = this.Ma, d = b.length, e = b[a]; a < d >> 1; ) {
                        var f = 2 * a + 1
                            , g = 2 * a + 2
                            , f = g < d && b[g].getKey() < b[f].getKey() ? g : f;
                        if (b[f].getKey() > e.getKey())
                            break;
                        b[a] = b[f];
                        a = f
                    }
                    b[a] = e
                }
                return c.$f
            }
        }
        ;
        h.kh = function() {
            var a = this.Ma;
            if (0 != a.length)
                return a[0].$f
        }
        ;
        h.xa = function() {
            for (var a = this.Ma, b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d].$f);
            return b
        }
        ;
        h.za = function() {
            for (var a = this.Ma, b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d].getKey());
            return b
        }
        ;
        h.Vb = function(a) {
            return Ma(this.Ma, function(b) {
                return b.getKey() == a
            })
        }
        ;
        h.clone = function() {
            return new Nd(this)
        }
        ;
        h.sb = function() {
            return this.Ma.length
        }
        ;
        h.oa = function() {
            return 0 == this.Ma.length
        }
        ;
        h.clear = function() {
            Pa(this.Ma)
        }
        ;
        var Od = function() {
            Nd.call(this)
        };
        wa(Od, Nd);
        Od.prototype.enqueue = function(a, b) {
            this.insert(a, b)
        }
        ;
        Od.prototype.hd = function() {
            return this.remove()
        }
        ;
        var Pd = function() {
            this.Ga = [];
            this.Xa = []
        }
            , Qd = function(a) {
            0 == a.Ga.length && (a.Ga = a.Xa,
                a.Ga.reverse(),
                a.Xa = [])
        };
        h = Pd.prototype;
        h.enqueue = function(a) {
            this.Xa.push(a)
        }
        ;
        h.hd = function() {
            Qd(this);
            return this.Ga.pop()
        }
        ;
        h.kh = function() {
            Qd(this);
            var a = this.Ga;
            return a[a.length - 1]
        }
        ;
        h.sb = function() {
            return this.Ga.length + this.Xa.length
        }
        ;
        h.oa = function() {
            return 0 == this.Ga.length && 0 == this.Xa.length
        }
        ;
        h.clear = function() {
            this.Ga = [];
            this.Xa = []
        }
        ;
        h.contains = function(a) {
            return 0 <= Ia(this.Ga, a) || 0 <= Ia(this.Xa, a)
        }
        ;
        h.remove = function(a) {
            var b;
            b = this.Ga;
            var c = Ja(b, a);
            0 <= c ? (Array.prototype.splice.call(b, c, 1),
                b = !0) : b = !1;
            return b || Qa(this.Xa, a)
        }
        ;
        h.xa = function() {
            for (var a = [], b = this.Ga.length - 1; 0 <= b; --b)
                a.push(this.Ga[b]);
            for (var c = this.Xa.length, b = 0; b < c; ++b)
                a.push(this.Xa[b]);
            return a
        }
        ;
        var I = function(a, b) {
            this.qb = this.Xc = this.Fb = "";
            this.xd = null;
            this.zc = this.jb = "";
            this.Ha = this.uk = !1;
            var c;
            a instanceof I ? (this.Ha = t(b) ? b : a.Ha,
                Rd(this, a.Fb),
                c = a.Xc,
                Sd(this),
                this.Xc = c,
                c = a.qb,
                Sd(this),
                this.qb = c,
                Td(this, a.xd),
                c = a.jb,
                Sd(this),
                this.jb = c,
                Ud(this, a.Eb.clone()),
                a = a.zc,
                Sd(this),
                this.zc = a) : a && (c = String(a).match(rd)) ? (this.Ha = !!b,
                Rd(this, c[1] || "", !0),
                a = c[2] || "",
                Sd(this),
                this.Xc = Vd(a),
                a = c[3] || "",
                Sd(this),
                this.qb = Vd(a, !0),
                Td(this, c[4]),
                a = c[5] || "",
                Sd(this),
                this.jb = Vd(a, !0),
                Ud(this, c[6] || "", !0),
                a = c[7] || "",
                Sd(this),
                this.zc = Vd(a)) : (this.Ha = !!b,
                this.Eb = new Wd(null,0,this.Ha))
        };
        I.prototype.toString = function() {
            var a = []
                , b = this.Fb;
            b && a.push(Xd(b, Yd, !0), ":");
            var c = this.qb;
            if (c || "file" == b)
                a.push("//"),
                (b = this.Xc) && a.push(Xd(b, Yd, !0), "@"),
                    a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
                    c = this.xd,
                null != c && a.push(":", String(c));
            if (c = this.jb)
                this.qb && "/" != c.charAt(0) && a.push("/"),
                    a.push(Xd(c, "/" == c.charAt(0) ? Zd : $d, !0));
            (c = this.Eb.toString()) && a.push("?", c);
            (c = this.zc) && a.push("#", Xd(c, ae));
            return a.join("")
        }
        ;
        I.prototype.resolve = function(a) {
            var b = this.clone()
                , c = !!a.Fb;
            c ? Rd(b, a.Fb) : c = !!a.Xc;
            if (c) {
                var d = a.Xc;
                Sd(b);
                b.Xc = d
            } else
                c = !!a.qb;
            c ? (d = a.qb,
                Sd(b),
                b.qb = d) : c = null != a.xd;
            d = a.jb;
            if (c)
                Td(b, a.xd);
            else if (c = !!a.jb) {
                if ("/" != d.charAt(0))
                    if (this.qb && !this.jb)
                        d = "/" + d;
                    else {
                        var e = b.jb.lastIndexOf("/");
                        -1 != e && (d = b.jb.substr(0, e + 1) + d)
                    }
                e = d;
                if (".." == e || "." == e)
                    d = "";
                else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                    for (var d = 0 == e.lastIndexOf("/", 0), e = e.split("/"), f = [], g = 0; g < e.length; ) {
                        var k = e[g++];
                        "." == k ? d && g == e.length && f.push("") : ".." == k ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                        d && g == e.length && f.push("")) : (f.push(k),
                            d = !0)
                    }
                    d = f.join("/")
                } else
                    d = e
            }
            c ? (Sd(b),
                b.jb = d) : c = "" !== a.Eb.toString();
            c ? Ud(b, a.Eb.clone()) : c = !!a.zc;
            c && (a = a.zc,
                Sd(b),
                b.zc = a);
            return b
        }
        ;
        I.prototype.clone = function() {
            return new I(this)
        }
        ;
        var Rd = function(a, b, c) {
            Sd(a);
            a.Fb = c ? Vd(b, !0) : b;
            a.Fb && (a.Fb = a.Fb.replace(/:$/, ""))
        }
            , Td = function(a, b) {
            Sd(a);
            if (b) {
                b = Number(b);
                if (isNaN(b) || 0 > b)
                    throw Error("Bad port number " + b);
                a.xd = b
            } else
                a.xd = null
        }
            , Ud = function(a, b, c) {
            Sd(a);
            b instanceof Wd ? (a.Eb = b,
                a.Eb.wh(a.Ha)) : (c || (b = Xd(b, be)),
                a.Eb = new Wd(b,0,a.Ha))
        }
            , Sd = function(a) {
            if (a.uk)
                throw Error("Tried to modify a read-only Uri");
        };
        I.prototype.wh = function(a) {
            this.Ha = a;
            this.Eb && this.Eb.wh(a);
            return this
        }
        ;
        var ce = function(a) {
            return a instanceof I ? a.clone() : new I(a,void 0)
        }
            , Vd = function(a, b) {
            return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
        }
            , Xd = function(a, b, c) {
            return v(a) ? (a = encodeURI(a).replace(b, de),
            c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
                a) : null
        }
            , de = function(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        }
            , Yd = /[#\/\?@]/g
            , $d = /[\#\?:]/g
            , Zd = /[\#\?]/g
            , be = /[\#\?@]/g
            , ae = /#/g
            , Wd = function(a, b, c) {
            this.K = this.V = null;
            this.ya = a || null;
            this.Ha = !!c
        }
            , ee = function(a) {
            a.V || (a.V = new db,
                a.K = 0,
            a.ya && sd(a.ya, function(b, c) {
                a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
            }))
        };
        h = Wd.prototype;
        h.sb = function() {
            ee(this);
            return this.K
        }
        ;
        h.add = function(a, b) {
            ee(this);
            this.ya = null;
            a = fe(this, a);
            var c = this.V.get(a);
            c || this.V.set(a, c = []);
            c.push(b);
            this.K += 1;
            return this
        }
        ;
        h.remove = function(a) {
            ee(this);
            a = fe(this, a);
            return this.V.Vb(a) ? (this.ya = null,
                this.K -= this.V.get(a).length,
                this.V.remove(a)) : !1
        }
        ;
        h.clear = function() {
            this.V = this.ya = null;
            this.K = 0
        }
        ;
        h.oa = function() {
            ee(this);
            return 0 == this.K
        }
        ;
        h.Vb = function(a) {
            ee(this);
            a = fe(this, a);
            return this.V.Vb(a)
        }
        ;
        h.za = function() {
            ee(this);
            for (var a = this.V.xa(), b = this.V.za(), c = [], d = 0; d < b.length; d++)
                for (var e = a[d], f = 0; f < e.length; f++)
                    c.push(b[d]);
            return c
        }
        ;
        h.xa = function(a) {
            ee(this);
            var b = [];
            if (v(a))
                this.Vb(a) && (b = Ra(b, this.V.get(fe(this, a))));
            else {
                a = this.V.xa();
                for (var c = 0; c < a.length; c++)
                    b = Ra(b, a[c])
            }
            return b
        }
        ;
        h.set = function(a, b) {
            ee(this);
            this.ya = null;
            a = fe(this, a);
            this.Vb(a) && (this.K -= this.V.get(a).length);
            this.V.set(a, [b]);
            this.K += 1;
            return this
        }
        ;
        h.get = function(a, b) {
            a = a ? this.xa(a) : [];
            return 0 < a.length ? String(a[0]) : b
        }
        ;
        h.toString = function() {
            if (this.ya)
                return this.ya;
            if (!this.V)
                return "";
            for (var a = [], b = this.V.za(), c = 0; c < b.length; c++)
                for (var d = b[c], e = encodeURIComponent(String(d)), d = this.xa(d), f = 0; f < d.length; f++) {
                    var g = e;
                    "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                    a.push(g)
                }
            return this.ya = a.join("&")
        }
        ;
        h.clone = function() {
            var a = new Wd;
            a.ya = this.ya;
            this.V && (a.V = this.V.clone(),
                a.K = this.K);
            return a
        }
        ;
        var fe = function(a, b) {
            b = String(b);
            a.Ha && (b = b.toLowerCase());
            return b
        };
        Wd.prototype.wh = function(a) {
            a && !this.Ha && (ee(this),
                this.ya = null,
                this.V.forEach(function(a, c) {
                    var b = c.toLowerCase();
                    c != b && (this.remove(c),
                        this.remove(b),
                    0 < a.length && (this.ya = null,
                        this.V.set(fe(this, b), Sa(a)),
                        this.K += a.length))
                }, this));
            this.Ha = a
        }
        ;
        Wd.prototype.extend = function(a) {
            for (var b = 0; b < arguments.length; b++)
                ib(arguments[b], function(a, b) {
                    this.add(b, a)
                }, this)
        }
        ;
        var ge = null
            , he = null
            , je = function(a) {
            var b = new Uint8Array(Math.ceil(3 * a.length / 4))
                , c = 0;
            ie(a, function(a) {
                b[c++] = a
            });
            return b.subarray(0, c)
        }
            , ie = function(a, b) {
            function c(b) {
                for (; d < a.length; ) {
                    var c = a.charAt(d++)
                        , e = he[c];
                    if (null != e)
                        return e;
                    if (!/^[\s\xa0]*$/.test(c))
                        throw Error("Unknown base64 encoding at char: " + c);
                }
                return b
            }
            ke();
            for (var d = 0; ; ) {
                var e = c(-1)
                    , f = c(0)
                    , g = c(64)
                    , k = c(64);
                if (64 === k && -1 === e)
                    break;
                b(e << 2 | f >> 4);
                64 != g && (b(f << 4 & 240 | g >> 2),
                64 != k && b(g << 6 & 192 | k))
            }
        }
            , ke = function() {
            if (!ge) {
                ge = {};
                he = {};
                for (var a = 0; 65 > a; a++)
                    ge[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
                        he[ge[a]] = a,
                    62 <= a && (he["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
            }
        };
        var le = function() {}
            , me = "function" == typeof Uint8Array
            , pe = function(a, b, c, d, e) {
            a.$ = null;
            b || (b = c ? [c] : []);
            a.ul = c ? String(c) : void 0;
            a.Te = 0 === c ? -1 : 0;
            a.Wa = b;
            a: {
                if (a.Wa.length && (b = a.Wa.length - 1,
                    (c = a.Wa[b]) && "object" == typeof c && !na(c) && !(me && c instanceof Uint8Array))) {
                    a.Cf = b - a.Te;
                    a.fb = c;
                    break a
                }
                a.Cf = Number.MAX_VALUE
            }
            a.pl = {};
            if (d)
                for (b = 0; b < d.length; b++)
                    c = d[b],
                        c < a.Cf ? (c += a.Te,
                            a.Wa[c] = a.Wa[c] || ne) : a.fb[c] = a.fb[c] || ne;
            e && e.length && Ka(e, va(oe, a))
        }
            , ne = Object.freeze ? Object.freeze([]) : []
            , J = function(a, b) {
            if (b < a.Cf) {
                b += a.Te;
                var c = a.Wa[b];
                return c === ne ? a.Wa[b] = [] : c
            }
            c = a.fb[b];
            return c === ne ? a.fb[b] = [] : c
        }
            , qe = function(a) {
            if (null == a || a instanceof Uint8Array)
                return a;
            if (v(a))
                return je(a);
            Ga("Cannot coerce to Uint8Array: " + ma(a));
            return null
        }
            , re = function(a) {
            if (a && 1 < a.length) {
                var b = ma(a[0]);
                Ka(a, function(a) {
                    ma(a) != b && Ga("Inconsistent type in JSPB repeated field array. Got " + ma(a) + " expected " + b)
                })
            }
        }
            , se = function(a, b, c) {
            b < a.Cf ? a.Wa[b + a.Te] = c : a.fb[b] = c
        }
            , ue = function(a, b, c) {
            var d = oe(a, te[0]);
            d && d !== b && void 0 !== c && (a.$ && d in a.$ && (a.$[d] = void 0),
                se(a, d, void 0));
            se(a, b, c)
        }
            , oe = function(a, b) {
            var c, d;
            Ka(b, function(b) {
                var e = J(a, b);
                null != e && (c = b,
                    d = e,
                    se(a, b, void 0))
            });
            return c ? (se(a, c, d),
                c) : 0
        }
            , we = function(a) {
            var b = ve;
            a.$ || (a.$ = {});
            if (!a.$[2]) {
                for (var c = J(a, 2), d = [], e = 0; e < c.length; e++)
                    d[e] = new b(c[e]);
                a.$[2] = d
            }
            b = a.$[2];
            b == ne && (b = a.$[2] = []);
            return b
        }
            , xe = function(a) {
            if (a.$)
                for (var b in a.$) {
                    var c = a.$[b];
                    if (na(c))
                        for (var d = 0; d < c.length; d++)
                            c[d] && c[d].Vc();
                    else
                        c && c.Vc()
                }
        };
        le.prototype.Vc = function() {
            xe(this);
            return this.Wa
        }
        ;
        le.prototype.toString = function() {
            xe(this);
            return this.Wa.toString()
        }
        ;
        le.prototype.getExtension = function(a) {
            if (this.fb) {
                this.$ || (this.$ = {});
                var b = a.ql;
                if (a.rl) {
                    if (a.tk())
                        return this.$[b] || (this.$[b] = La(this.fb[b] || [], function(b) {
                            return new a.Vj(b)
                        })),
                            this.$[b]
                } else if (a.tk())
                    return !this.$[b] && this.fb[b] && (this.$[b] = new a.Vj(this.fb[b])),
                        this.$[b];
                return this.fb[b]
            }
        }
        ;
        le.prototype.clone = function() {
            return new this.constructor(ye(this.Vc()))
        }
        ;
        var ye = function(a) {
            var b;
            if (na(a)) {
                for (var c = Array(a.length), d = 0; d < a.length; d++)
                    null != (b = a[d]) && (c[d] = "object" == typeof b ? ye(b) : b);
                return c
            }
            if (me && a instanceof Uint8Array)
                return new Uint8Array(a);
            c = {};
            for (d in a)
                null != (b = a[d]) && (c[d] = "object" == typeof b ? ye(b) : b);
            return c
        };
        var ze = 0
            , Ae = 0
            , Be = function(a) {
            if (a.constructor === Uint8Array)
                return a;
            if (a.constructor === ArrayBuffer)
                return new Uint8Array(a);
            if (a.constructor === Array)
                return new Uint8Array(a);
            if (a.constructor === String)
                return je(a);
            Ga("Type not convertible to Uint8Array.");
            return new Uint8Array(0)
        };
        var Ce = function() {
            this.B = []
        };
        Ce.prototype.length = function() {
            return this.B.length
        }
        ;
        Ce.prototype.end = function() {
            var a = this.B;
            this.B = [];
            return a
        }
        ;
        var De = function(a, b) {
            for (; 127 < b; )
                a.B.push(b & 127 | 128),
                    b >>>= 7;
            a.B.push(b)
        }
            , Ee = function(a, b) {
            if (0 <= b)
                De(a, b);
            else {
                for (var c = 0; 9 > c; c++)
                    a.B.push(b & 127 | 128),
                        b >>= 7;
                a.B.push(1)
            }
        };
        h = Ce.prototype;
        h.cg = function(a) {
            this.B.push(a >>> 0 & 255)
        }
        ;
        h.$c = function(a) {
            this.B.push(a >>> 0 & 255);
            this.B.push(a >>> 8 & 255)
        }
        ;
        h.j = function(a) {
            this.B.push(a >>> 0 & 255);
            this.B.push(a >>> 8 & 255);
            this.B.push(a >>> 16 & 255);
            this.B.push(a >>> 24 & 255)
        }
        ;
        h.Ih = function(a) {
            var b = a >>> 0;
            a = Math.floor((a - b) / 4294967296) >>> 0;
            ze = b;
            Ae = a;
            this.j(ze);
            this.j(Ae)
        }
        ;
        h.Hj = function(a) {
            this.B.push(a >>> 0 & 255);
            this.B.push(a >>> 8 & 255);
            this.B.push(a >>> 16 & 255);
            this.B.push(a >>> 24 & 255)
        }
        ;
        h.Gh = function(a) {
            var b = a, b = (a = 0 > b ? 1 : 0) ? -b : b, c;
            0 === b ? 0 < 1 / b ? ze = Ae = 0 : (Ae = 0,
                ze = 2147483648) : isNaN(b) ? (Ae = 0,
                ze = 2147483647) : 3.4028234663852886E38 < b ? (Ae = 0,
                ze = (a << 31 | 2139095040) >>> 0) : 1.1754943508222875E-38 > b ? (b = Math.round(b / Math.pow(2, -149)),
                Ae = 0,
                ze = (a << 31 | b) >>> 0) : (c = Math.floor(Math.log(b) / Math.LN2),
                b *= Math.pow(2, -c),
                b = Math.round(8388608 * b) & 8388607,
                Ae = 0,
                ze = (a << 31 | c + 127 << 23 | b) >>> 0);
            this.j(ze)
        }
        ;
        h.Fh = function(a) {
            this.B.push(a ? 1 : 0)
        }
        ;
        h.Gj = function(a) {
            Ee(this, a)
        }
        ;
        h.bg = function(a) {
            this.B.push.apply(this.B, a)
        }
        ;
        h.Zc = function(a) {
            for (var b = this.B.length, c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                if (128 > d)
                    this.B.push(d);
                else if (2048 > d)
                    this.B.push(d >> 6 | 192),
                        this.B.push(d & 63 | 128);
                else if (65536 > d)
                    if (55296 <= d && 56319 >= d && c + 1 < a.length) {
                        var e = a.charCodeAt(c + 1);
                        56320 <= e && 57343 >= e && (d = 1024 * (d - 55296) + e - 56320 + 65536,
                            this.B.push(d >> 18 | 240),
                            this.B.push(d >> 12 & 63 | 128),
                            this.B.push(d >> 6 & 63 | 128),
                            this.B.push(d & 63 | 128),
                            c++)
                    } else
                        this.B.push(d >> 12 | 224),
                            this.B.push(d >> 6 & 63 | 128),
                            this.B.push(d & 63 | 128)
            }
            return this.B.length - b
        }
        ;
        var Fe = function() {
            this.bd = [];
            this.nb = 0;
            this.ka = new Ce
        }
            , He = function(a, b) {
            Ge(a, b, 2);
            b = a.ka.end();
            a.bd.push(b);
            a.nb += b.length;
            b.push(a.nb);
            return b
        }
            , Ie = function(a, b) {
            for (var c = b.pop(), c = a.nb + a.ka.length() - c; 127 < c; )
                b.push(c & 127 | 128),
                    c >>>= 7,
                    a.nb++;
            b.push(c);
            a.nb++
        };
        Fe.prototype.reset = function() {
            this.bd = [];
            this.ka.end();
            this.nb = 0
        }
        ;
        var Je = function(a) {
            for (var b = new Uint8Array(a.nb + a.ka.length()), c = a.bd, d = c.length, e = 0, f = 0; f < d; f++) {
                var g = c[f];
                b.set(g, e);
                e += g.length
            }
            c = a.ka.end();
            b.set(c, e);
            a.bd = [b];
            return b
        }
            , Ge = function(a, b, c) {
            De(a.ka, 8 * b + c)
        };
        h = Fe.prototype;
        h.Hj = function(a, b) {
            null != b && null != b && (Ge(this, a, 0),
                Ee(this.ka, b))
        }
        ;
        h.j = function(a, b) {
            null != b && null != b && (Ge(this, a, 0),
                De(this.ka, b))
        }
        ;
        h.Ih = function(a, b) {
            if (null != b && null != b) {
                Ge(this, a, 0);
                a = this.ka;
                var c = b;
                b = 0 > c;
                var c = Math.abs(c)
                    , d = c >>> 0
                    , c = Math.floor((c - d) / 4294967296)
                    , c = c >>> 0;
                b && (c = ~c >>> 0,
                    d = (~d >>> 0) + 1,
                4294967295 < d && (d = 0,
                    c++,
                4294967295 < c && (c = 0)));
                ze = d;
                Ae = c;
                b = ze;
                for (d = Ae; 0 < d || 127 < b; )
                    a.B.push(b & 127 | 128),
                        b = (b >>> 7 | d << 25) >>> 0,
                        d >>>= 7;
                a.B.push(b)
            }
        }
        ;
        h.Gh = function(a, b) {
            null != b && (Ge(this, a, 5),
                this.ka.Gh(b))
        }
        ;
        h.Fh = function(a, b) {
            null != b && (Ge(this, a, 0),
                this.ka.Fh(b))
        }
        ;
        h.Gj = function(a, b) {
            null != b && (Ge(this, a, 0),
                Ee(this.ka, b))
        }
        ;
        h.Zc = function(a, b) {
            null != b && (a = He(this, a),
                this.ka.Zc(b),
                Ie(this, a))
        }
        ;
        h.bg = function(a, b) {
            null != b && (b = Be(b),
                Ge(this, a, 2),
                De(this.ka, b.length),
                a = this.ka.end(),
                this.bd.push(a),
                this.bd.push(b),
                this.nb += a.length + b.length)
        }
        ;
        var Le = function(a) {
            pe(this, a, 0, Ke, null)
        };
        wa(Le, le);
        var Ke = [2];
        Le.prototype.vh = function() {
            var a = new Fe, b;
            b = J(this, 1);
            null != b && a.Gj(1, b);
            b = J(this, 2);
            re(b);
            b = !b.length || b[0]instanceof Uint8Array ? b : La(b, qe);
            if (0 < b.length && null != b)
                for (var c = 0; c < b.length; c++)
                    a.bg(2, b[c]);
            b = J(this, 3);
            null != b && a.Zc(3, b);
            b = J(this, 4);
            null != b && a.bg(4, b);
            b = J(this, 5);
            null != b && a.Zc(5, b);
            b = J(this, 6);
            null != b && a.Zc(6, b);
            b = J(this, 7);
            null != b && a.j(7, b);
            b = J(this, 8);
            null != b && a.bg(8, b);
            b = J(this, 9);
            null != b && a.j(9, b);
            b = J(this, 10);
            null != b && a.j(10, b);
            return Je(a)
        }
        ;
        var Ne = function(a) {
            pe(this, a, "scs.sc", Me, null)
        };
        wa(Ne, le);
        var Me = [1, 2];
        Ne.prototype.vh = function() {
            var a = new Fe, b;
            b = J(this, 1);
            if (0 < b.length && null != b)
                for (var c = 0; c < b.length; c++) {
                    var d = a
                        , e = b[c];
                    null != e && (Ge(d, 1, 0),
                        Ee(d.ka, e))
                }
            b = we(this);
            if (0 < b.length && (c = Oe,
                null != b))
                for (d = 0; d < b.length; d++)
                    e = He(a, 2),
                        c(b[d], a),
                        Ie(a, e);
            return Je(a)
        }
        ;
        Ne.tl = "scs.sc";
        var ve = function(a) {
            pe(this, a, 0, null, te)
        };
        wa(ve, le);
        var te = [[2, 3, 4, 5]];
        ve.prototype.vh = function() {
            var a = new Fe;
            Oe(this, a);
            return Je(a)
        }
        ;
        var Oe = function(a, b) {
            var c;
            c = J(a, 1);
            null != c && b.Zc(1, c);
            c = J(a, 2);
            null != c && b.Zc(2, c);
            c = J(a, 3);
            null != c && b.Hj(3, c);
            c = J(a, 4);
            null != c && b.Gh(4, c);
            c = J(a, 5);
            null != c && b.Fh(5, c)
        };
        h = ve.prototype;
        h.getName = function() {
            return J(this, 1)
        }
        ;
        h.getStringValue = function() {
            return J(this, 2)
        }
        ;
        h.setStringValue = function(a) {
            ue(this, 2, a)
        }
        ;
        h.getFloatValue = function() {
            var a = J(this, 4);
            return null == a ? a : +a
        }
        ;
        h.setFloatValue = function(a) {
            ue(this, 4, a)
        }
        ;
        y("cast.player.api.VERSION", "1.0.0");
        y("cast.player.api.ErrorCode", {
            UNKNOWN: 0,
            PLAYBACK: 1,
            MEDIAKEYS: 2,
            NETWORK: 3,
            MANIFEST: 4
        });
        var Pe = ["cast.player.api.ErrorCode.UNKNOWN", "cast.player.api.ErrorCode.PLAYBACK", "cast.player.api.ErrorCode.MEDIAKEYS", "cast.player.api.ErrorCode.NETWORK", "cast.player.api.ErrorCode.MANIFEST"];
        y("cast.player.api.HlsSegmentFormat", {
            MPEG2_TS: 0,
            MPEG_AUDIO_ES: 1,
            PACKED_AUDIO_AC3: 2,
            nl: 3,
            MPEG_LAYER_3: 4
        });
        y("cast.player.api.CaptionsType", {
            UNKNOWN: "unknown",
            WEBVTT: "webvtt",
            TTML: "ttml",
            CEA608: "cea608"
        });
        y("cast.player.api.ContentProtection", {
            NONE: "none",
            CLEARKEY: "clearkey",
            PLAYREADY: "playready",
            WIDEVINE: "widevine",
            AES_128: "aes_128",
            AES_128_CKP: "aes_128_ckp"
        });
        y("cast.player.api.LoggerLevel", {
            DEBUG: 0,
            INFO: 800,
            WARNING: 900,
            ERROR: 1E3,
            NONE: Infinity
        });
        y("cast.player.api.StreamingProtocolType", {
            UNKNOWN: 0,
            MPEG_DASH: 1,
            HLS: 2,
            SMOOTH_STREAMING: 3
        });
        var Qe = function() {
            this.timeoutInterval = 3E4;
            this.headers = this.url = null;
            this.withCredentials = !1;
            this.protectionSystem = this.content = null;
            this.skipRequest = !1;
            this.setResponse = null;
            this.interval = {
                time: 0,
                duration: 0
            };
            this.kc = null
        };
        y("cast.player.api.RequestInfo", Qe);
        var Re = function(a, b, c, d, e) {
            this.url = a;
            this.errorCode = b;
            this.status = c;
            this.responseHeaders = d;
            this.response = e
        };
        y("cast.player.api.RequestStatus", Re);
        var Se = function(a, b, c, d, e, f) {
            this.codecs = a;
            this.mimeType = b;
            this.bitrates = c;
            this.language = d;
            this.name = e;
            this.role = f
        };
        y("cast.player.api.StreamInfo", Se);
        window.VTTCue = window.VTTCue || window.TextTrackCue;
        var Te = function(a) {
            Sb().xh(Nb(a))
        };
        y("cast.player.api.setLoggerLevel", Te);
        bc || (bc = new Zb);
        if (bc) {
            var Ue = bc;
            if (1 != Ue.si) {
                var Ve = Sb()
                    , We = Ue.Tk;
                Ve.Vd || (Ve.Vd = []);
                Ve.Vd.push(We);
                Ue.si = !0
            }
        }
        ;var Xe = function(a) {
            this.url = a;
            this.updateCaptionsRequestInfo = this.updateSegmentRequestInfo = this.updateManifestRequestInfo = null
        };
        y("cast.player.api.HostBase", Xe);
        var Ye = {
            clearkey: "org.w3.clearkey",
            playready: "com.chromecast.playready",
            widevine: "com.widevine.alpha"
        }
            , Ze = A("cast.player.common")
            , $e = function(a) {
            return Ba(a, "audio/")
        }
            , af = function(a) {
            return Ba(a, "video/")
        }
            , bf = function(a, b) {
            return "caption" == a || Ba(b, "text/")
        }
            , df = function(a, b) {
            b && (b = new Uint8Array(new ArrayBuffer(16)),
                b.set(a),
                cf(b.subarray(0, 4)),
                cf(b.subarray(4, 6)),
                cf(b.subarray(6, 8)),
                a = b);
            this.Qe = a
        };
        df.prototype.rb = function(a) {
            if (!a)
                return !1;
            var b = this.Qe;
            a = a.Qe;
            for (var c = 0; 16 > c; c++)
                if (b[c] != a[c])
                    return !1;
            return !0
        }
        ;
        df.prototype.Vc = function() {
            return this.Qe
        }
        ;
        df.prototype.toString = function() {
            for (var a = "", b = 0; b < this.Qe.length; b++)
                a += ("0" + this.Qe[b].toString(16)).slice(-2);
            return a
        }
        ;
        var cf = function(a) {
            for (var b = 0, c = a.length - 1; b < c; b++,
                c--) {
                var d = a[b];
                a[b] = a[c];
                a[c] = d
            }
        }
            , ef = new df([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149])
            , ff = new df([237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237])
            , gf = new df([16, 119, 239, 236, 192, 178, 77, 2, 172, 227, 60, 30, 82, 226, 251, 75])
            , hf = function(a, b) {
            return MediaSource.isTypeSupported(a + '; codecs="' + b + '"')
        }
            , jf = function(a) {
            return "mp4a.a6" == a || "ec-3" == a
        }
            , kf = function(a, b, c) {
            for (a = a.toString(b); a.length < c; )
                a = "0" + a;
            return a
        }
            , lf = function(a) {
            for (var b = a.length / 2, c = new Uint8Array(b), d = 0; d < b; d++)
                c[d] = parseInt(a.substr(2 * d, 2), 16);
            return c
        }
            , mf = function(a) {
            if (cast.__platform__ && cast.__platform__.queryPlatformValue)
                return cast.__platform__.queryPlatformValue(a)
        }
            , nf = function(a) {
            return 2 == a ? "mp4a.a5" : 4 == a ? "" : "mp4a.40.2"
        }
            , of = function(a) {
            a = a.toLowerCase();
            return !a.includes(",") && !!a.match(/^(mp4a|[ae]c-3)/)
        }
            , pf = function(a) {
            var b = /dv(he|av).[s|d|p][e|t|w][n|r|h|b][a|h]?[e|t|w]?/;
            a = a.split(",");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].match(b);
                if (d && !hf("video/mp4", d[0])) {
                    D(Ze, d[0] + " removed");
                    a.splice(c, 1);
                    break
                }
                if (d = a[c]) {
                    var e = d.split(".");
                    2 != e.length || "avc1" != e[0] && "avc3" != e[0] || (d = e[0] + "." + e[1].toUpperCase())
                }
                a[c] = d
            }
            return a.join(",")
        }
            , qf = cast.__platform__ && cast.__platform__.display
            , rf = cast.__platform__ && cast.__platform__.canDisplayType
            , sf = mf("log-level-mpl");
        Te(t(sf) ? parseInt(sf, 10) : 0);
        var tf = {
            "Cast.MPL.SegmentStats.Size": {
                min: 0,
                max: 1E6,
                Oi: 100
            },
            "Cast.MPL.SegmentStats.Time": {
                min: 0,
                max: 2E4,
                Oi: 20
            }
        }
            , uf = t(document.currentScript) && 0 < document.currentScript.src.indexOf("gstatic.com/cast/sdk/libs/")
            , vf = t(document.currentScript) && 0 < document.currentScript.src.indexOf("/df/cast/sdk/libs/")
            , wf = function(a) {
            if (a) {
                if (af(a))
                    return "Video";
                if ($e(a))
                    return "Audio"
            }
        }
            , xf = function(a) {
            switch (a) {
                case "webvtt":
                    return 1;
                case "ttml":
                    return 2;
                case "cea608":
                    return 3
            }
            return 0
        }
            , zf = function(a) {
            a.split(",").forEach(function(a) {
                z("Cast.MPL.Codec", yf(a))
            })
        }
            , yf = function(a) {
            switch (a) {
                case "mp4a.a6":
                    return 1;
                case "ec-3":
                    return 2;
                case "mp4a.40.2":
                    return 3;
                case "mp4a.40.5":
                    return 4;
                case "mp4a.67":
                    return 5;
                case "avc1.4D40":
                    return 6;
                case "avc1.4D401E":
                    return 7;
                case "mp4a.a5":
                    return 8;
                case "ac-3":
                    return 9;
                case "vorbis":
                    return 10
            }
            return 0 == a.lastIndexOf("avc1", 0) ? 11 : 0 == a.lastIndexOf("mp4a.40", 0) ? 12 : 0
        }
            , Bf = function(a, b) {
            z("Cast.MPL.ProtocolProtection", Af(a, b))
        }
            , Af = function(a, b) {
            switch (b) {
                case 1:
                    switch (a) {
                        case "clearkey":
                            return 101;
                        case "widevine":
                            return 102;
                        case "playready":
                            return 103
                    }
                    break;
                case 2:
                    switch (a) {
                        case "widevine":
                            return 201;
                        case "aes_128":
                            return 202;
                        case "aes_128_ckp":
                            return 203
                    }
                    break;
                case 3:
                    switch (a) {
                        case "playready":
                            return 301
                    }
            }
            return 0
        }
            , Cf = function(a, b) {
            tf[a] ? xa() && cast.__platform__.metrics.logHistogramValueToUma(a, b, tf[a].min, tf[a].max, tf[a].Oi) : C(Ze, "Invalid histogram name")
        }
            , Df = function(a) {
            switch (a) {
                case "application/ttml+xml":
                    return 1;
                case "text/vtt":
                    return 2;
                case "text/mp4":
                    return 3;
                case "audio/mp4":
                    return 4;
                case "video/mp4":
                    return 5;
                case "video/mp2t":
                    return 6
            }
            return 0
        }
            , Ef = function(a) {
            z("Cast.MPL.StreamingProtocolType", a)
        }
            , Ff = function(a) {
            z("Cast.MPL.Live", a ? 1 : 0)
        };
        var Gf = function(a) {
            Xe.call(this, a.url);
            this.initialBandwidth = 3145728;
            this.autoResumeDuration = 10;
            this.autoResumeNumberOfSegments = 3;
            this.autoPauseDuration = 1;
            this.segmentRequestRetryLimit = 3;
            this.useSingleKeySession = !1;
            this.mediaElement = a.mediaElement;
            this.url = a.url;
            this.licenseUrl = a.licenseUrl || null;
            this.protectionSystem = a.protectionSystem || null;
            this.licenseCustomData = a.licenseCustomData || null;
            this.Kh = 1 == a.aggressiveStallHandling;
            this.dk = 1 == a.disableSourceBufferTimeAdjust;
            this.Jg = 1 == a.hlsContentKeyProtection;
            this.el = 1 == a.skipSegmentOnNetworkFailure;
            this.preferSequenceNumberForPlaylistMatching = 1 == a.preferSequenceNumberForPlaylistMatching;
            this.ignoreTtmlPositionInfo = 1 == a.ignoreTtmlPositionInfo;
            this.useRelativeCueTimestamps = 1 == a.useRelativeCueTimestamps;
            this.onCue = this.onAutoPause = this.onMediaDownloadEnded = this.onManifestReady = this.processLicense = this.processSegment = this.processManifest = this.processMetadata = this.prepareLicenseRequest = this.getQualityLevel = this.trackBandwidth = this.updateCaptionsRequestInfo = this.updateSegmentRequestInfo = this.updateLicenseRequestInfo = this.updateManifestRequestInfo = this.onError = null
        };
        q(Gf, Xe);
        y("cast.player.api.Host", Gf);
        Gf.prototype.R = function(a, b, c, d) {
            var e = a;
            b && (e = 10 * a + b.errorCode % 10,
            6 == b.errorCode && 0 <= b.status && (e = 1E3 * e + b.status % 1E3));
            z("Cast.MPL.Error", e);
            if (vf) {
                var f = new H;
                f.lc = "text";
                f.send("http://127.0.0.1:8008/setup/send_log_report", "POST", JSON.stringify({
                    uuid: Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ x()).toString(36)
                }), {
                    "Content-Type": "application/json"
                })
            }
            a = Math.floor(a / 100);
            ec(d || Hf, "error: " + Pe[a] + "/" + e + (c ? " (" + c + ")" : ""));
            if (this.onError)
                this.onError(a, b)
        }
        ;
        Gf.prototype.jj = function(a) {
            return this.processManifest ? this.processManifest(a) : a
        }
        ;
        var Hf = A("cast.player.api.Host");
        var If = function() {
            this.cd = cast.__platform__ && cast.__platform__.cache;
            this.zd = this.isEnabled() ? this.cd.capacity() : 0;
            this.Ge = new db
        };
        If.prototype.isEnabled = function() {
            return t(this.cd)
        }
        ;
        var Kf = function(a, b, c) {
            var d = ed();
            a.cd.insert(b, c).then(function() {
                a.zd -= c.byteLength;
                d.resolve()
            }, function(a) {
                C(Jf, "Failed to cache (" + b + ") because of " + a);
                d.reject(a)
            });
            return d.kj
        }
            , Mf = function(a, b, c) {
            if (a.isEnabled()) {
                for (var d = new ArrayBuffer(2 * c.length), e = new Uint16Array(d), f = 0; f < c.length; f++)
                    e[f] = c.charCodeAt(f);
                a = Lf(a, b, d)
            } else
                a = cd("Cache is not enabled.");
            return a
        }
            , Lf = function(a, b, c) {
            if (!a.isEnabled())
                return cd("Cache is not enabled.");
            var d = Nf(b);
            D(Jf, "Store data into cache with key: " + d);
            return a.zd < c.byteLength ? (a = "Insufficient cache space available for " + b.url,
                C(Jf, a),
                cd(a)) : Kf(a, d, c)
        }
            , Nf = function(a) {
            var b = a.url;
            a.headers && a.headers.Range && (b += "\b" + a.headers.Range);
            return b
        }
            , Of = function(a, b) {
            return a.isEnabled() && a.cd.contains(Nf(b))
        }
            , Pf = function(a, b) {
            a.isEnabled() ? (a = a.cd.get(Nf(b)),
            a instanceof F || (b = new F(ka),
                Yc(b, 2, a),
                a = b)) : a = cd("Cache is not enabled.");
            return a
        }
            , Qf = function(a) {
            return a.isEnabled() ? 512E3 > a.zd : !0
        };
        If.prototype.reset = function() {
            this.isEnabled() && (this.zd = this.cd.capacity())
        }
        ;
        la(If);
        var Jf = A("cast.player.cache.Store");
        var Rf = function(a) {
            this.df = 30;
            this.qk = a
        }
            , Sf = function(a, b) {
            a = m(a);
            for (var c = a.next(); !c.done; c = a.next())
                if (c = c.value,
                    c.localName == b)
                    return c;
            return null
        }
            , Vf = function(a, b) {
            var c = b.split(":");
            if (1 == c.length) {
                var d = 0;
                if (c = c[0].match(Tf))
                    switch (b = parseFloat(c[1]),
                        c[2]) {
                        case "h":
                            d = 3600 * b;
                            break;
                        case "m":
                            d = 60 * b;
                            break;
                        case "s":
                            d = b;
                            break;
                        case "ms":
                            d = b / 1E3;
                            break;
                        case "f":
                            d = b / a.df
                    }
                else
                    C(Uf, "unsupported time expression: " + b);
                return d
            }
            d = 3600 * parseInt(c[0], 10) + 60 * parseInt(c[1], 10) + parseFloat(c[2]);
            4 == c.length && (d += parseInt(c[3], 10) / a.df);
            return d
        }
            , Wf = function(a) {
            var b = "";
            a = m(a.childNodes);
            for (var c = a.next(); !c.done; c = a.next())
                c = c.value,
                    c.nodeType == Node.TEXT_NODE ? (c = c.textContent.trim()) && (b += c) : "span" == c.localName ? (b += Wf(c),
                    (c = c.attributes.getNamedItem("tts:fontStyle")) && "italic" == c.value && (b = "<i>" + b + "</i>")) : "br" == c.localName && (b += "\n");
            return b
        };
        Rf.prototype.parse = function(a, b) {
            var c = []
                , d = (new DOMParser).parseFromString(a, "text/xml")
                , e = Sf(d.childNodes, "tt");
            if (!e)
                return C(Uf, "missing tt"),
                    c;
            var f = d = null
                , g = Sf(e.childNodes, "head");
            if (g) {
                if (f = Sf(g.childNodes, "styling"))
                    for (var d = null, f = m(f.childNodes), k = f.next(); !k.done; k = f.next()) {
                        if (k = k.value,
                            "style" === k.nodeName && (k = Xf(k)))
                            d = d || new Map,
                                d.set(k.id, k.origin)
                    }
                else
                    d = null;
                f = d;
                if (k = Sf(g.childNodes, "layout")) {
                    for (var g = null, k = m(k.childNodes), l = k.next(); !l.done; l = k.next()) {
                        var n = l.value;
                        if ("region" == n.nodeName && (l = n.attributes.getNamedItem("xml:id"))) {
                            var p = f
                                , u = null
                                , G = Xf(n);
                            G ? u = G.origin : p && (G = n.attributes.getNamedItem("style")) && (u = p.get(G.value));
                            if (p = u)
                                g = g || new Map,
                                    n = n.attributes.getNamedItem("tts:textAlign"),
                                    g.set(l.value, {
                                        align: n && n.value || "left",
                                        origin: p
                                    })
                        }
                    }
                    f = g
                } else
                    f = null
            }
            g = Sf(e.childNodes, "body");
            if (!g)
                return C(Uf, "missing body"),
                    c;
            (k = e.attributes.getNamedItem("ttp:frameRate")) ? this.df = parseInt(k.value, 10) : (C(Uf, "defaulting frameRate to30"),
                this.df = 30);
            k = Sf(g.childNodes, "div");
            if (!k)
                return C(Uf, "missing div"),
                    c;
            g = {};
            if (e = Sf(e.childNodes, "head"))
                if (e = Sf(e.childNodes, "metadata"))
                    for (e = m(e.childNodes),
                             l = e.next(); !l.done; l = e.next())
                        l = l.value,
                        "image" == l.localName && (g["#" + l.attributes.getNamedItem("xml:id").value] = Wf(l));
            e = null;
            k.attributes && d && (l = k.attributes.getNamedItem("style")) && (e = d.get(l.value));
            k = m(k.childNodes);
            for (l = k.next(); !l.done; l = k.next()) {
                var M = l.value;
                if ("p" == M.localName && M.attributes) {
                    for (var oa = G = null, p = n = u = l = null, kb = Wf(M), M = m(M.attributes), pa = M.next(); !pa.done; pa = M.next())
                        switch (pa = pa.value,
                            pa.localName) {
                            case "begin":
                                G = Vf(this, pa.value) + b;
                                break;
                            case "end":
                                oa = Vf(this, pa.value) + b;
                                break;
                            case "backgroundImage":
                                g[pa.value] && (l = g[pa.value]);
                                break;
                            case "origin":
                                u = Yf(pa.value);
                                break;
                            case "region":
                                n = pa.value;
                                break;
                            case "style":
                                p = pa.value
                        }
                    !kb && !l || null === G || null === oa ? C(Uf, "skipped cue begin=" + G + ", end=" + oa + ", text=" + a) : (G = new VTTCue(G,oa,kb),
                    this.qk || (oa = d,
                        kb = e,
                        M = null,
                    n && f && (M = f.get(n)) && M.align && (G.align = M.align),
                    !u && p && oa && (u = oa.get(p)),
                    u || (u = M && M.origin || kb),
                    u && (G.sl = u.y,
                        G.position = u.x,
                        G.xl = !1,
                    "left" != G.align && "right" != G.align && (G.align = "left"))),
                        c.push({
                            Qf: G,
                            rk: l
                        }))
                }
            }
            return c
        }
        ;
        var Yf = function(a) {
            if ("auto" === a)
                return null;
            a = a.split(" ");
            return 2 !== a.length ? (C(Uf, "Two numbers are expected in tts:origin"),
                null) : a.find(function(a) {
                return !a.includes("%")
            }) ? (C(Uf, "Only percentage value is supported in tts:origin"),
                null) : {
                x: parseInt(a[0], 10),
                y: parseInt(a[1], 10)
            }
        }
            , Xf = function(a) {
            var b = a.attributes;
            if (!b)
                return null;
            var c = b.getNamedItem("xml:id");
            if (!c)
                return null;
            b = b.getNamedItem("tts:origin");
            if (!b) {
                a = m(a.childNodes);
                for (var d = a.next(); !d.done; d = a.next())
                    d = d.value,
                    d.attributes && (b = d.attributes.getNamedItem("tts:origin"));
                if (!b)
                    return null
            }
            return (b = Yf(b.value)) ? {
                id: c.value,
                origin: b
            } : null
        }
            , Uf = A("cast.player.core.TtmlParser")
            , Tf = /([0-9]*\.?[0-9]+)?(h|ms|m|s|f)/;
        var Zf = function() {};
        Zf.prototype.parse = function(a, b) {
            for (var c = a.trim().split($f), d = a = 0, e = m(c[0].split("\n")), f = e.next(); !f.done; f = e.next())
                if (f = f.value,
                    0 == f.indexOf("X-TIMESTAMP-MAP")) {
                    (e = f.match(ag)) && (a = bg(e[1]));
                    (e = f.match(cg)) && (d = parseInt(e[1], 10) / 9E4);
                    break
                }
            b += d - a;
            if (isNaN(b))
                return C(dg, "invalid time offset"),
                    [];
            a = [];
            c = m(c);
            for (d = c.next(); !d.done; d = c.next()) {
                var g = d.value;
                if (g) {
                    for (var k = b, l = null, f = e = d = null, g = g.split("\n"), n = 0, p = m(g), u = p.next(); !u.done; u = p.next()) {
                        u = u.value;
                        if (l = u.match(eg)) {
                            d = u.match(fg);
                            e = u.match(gg);
                            f = u.match(hg);
                            break
                        }
                        n++
                    }
                    l ? (p = bg(l[1]),
                        l = bg(l[2]),
                        g = g.slice(n + 1).join("\n"),
                        isNaN(p) || isNaN(l) || !g ? (C(dg, "skipped cue, begin=" + p + ", end=" + l + ", text=" + g),
                            d = null) : (k = new VTTCue(p + k,l + k,g),
                        d && (k.align = d[1]),
                        e && (k.position = parseInt(e[1], 10)),
                        f && (k.size = parseInt(f[1], 10)),
                            d = k)) : d = null;
                    d && a.push({
                        Qf: d
                    })
                }
            }
            return a
        }
        ;
        var bg = function(a) {
            var b = a.split(":");
            if (3 < b.length)
                return C(dg, "unexpected time format=" + a),
                    0;
            a = 0;
            for (var b = m(b), c = b.next(); !c.done; c = b.next())
                a = 60 * a + parseFloat(c.value);
            return a
        }
            , dg = A("cast.player.core.WebvttParser")
            , $f = /\n\s*\n/
            , cg = /MPEGTS:([\d]*)/
            , fg = /align:(start|middle|end|left|center|right)/
            , gg = /position:(\d*)%/
            , hg = /size:(\d*)%/
            , ag = /LOCAL:((?:[\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3})/
            , eg = /((?:[\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3})[\t ]+--\x3e[\t ]+((?:[\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3})/;
        var ig = function(a, b, c) {
            B.call(this);
            this.a = b;
            this.Ne = document.createElement("track");
            this.Ne.src = "";
            this.Ne.kind = "captions";
            this.a.mediaElement.appendChild(this.Ne);
            this.Uc = this.Ne.track;
            this.Uc.mode = "showing";
            this.Xj = a;
            this.Ob = c;
            z("Cast.MPL.Captions", xf(this.Ob));
            this.qe = null;
            "ttml" == c ? this.qe = new Rf(1 == this.a.ignoreTtmlPositionInfo) : "webvtt" == c && (this.qe = new Zf);
            this.Ja = null;
            this.Dj = 0;
            this.Rd = []
        };
        q(ig, B);
        ig.prototype.G = function() {
            jg(this);
            this.Uc.mode = "disabled";
            this.Ne.remove();
            B.prototype.G.call(this)
        }
        ;
        var jg = function(a) {
            var b = a.Uc.cues;
            if (b)
                for (; 0 < b.length; )
                    a.Uc.removeCue(b[0]);
            a.Rd.forEach(function(a) {
                a.remove()
            });
            a.Rd.length = 0
        };
        h = ig.prototype;
        h.createBuffer = function() {}
        ;
        h.reset = function() {
            jg(this);
            this.Ja = null
        }
        ;
        h.de = function() {
            return !0
        }
        ;
        h.hi = function() {
            return Infinity
        }
        ;
        h.append = function(a, b, c, d) {
            d && (this.Dj = b.time - c);
            if (this.qe) {
                var e = this.a.useRelativeCueTimestamps || "ttml" == this.Ob ? b.time : this.Dj;
                c = kg(this);
                d = 0 < c.length ? c[c.length - 1].startTime : -Infinity;
                for (a = this.qe.parse(decodeURIComponent(escape(String.fromCharCode.apply(null, a))), e); 0 < a.length; ) {
                    var e = a.pop()
                        , f = e.Qf
                        , g = !1;
                    if (f.startTime < d || .1 >= Math.abs(f.startTime - d))
                        for (var k = c.length - 1; 0 <= k; k--)
                            if (c[k].text == f.text && .1 >= Math.abs(c[k].startTime - f.startTime) && .1 >= Math.abs(c[k].endTime - f.endTime)) {
                                g = !0;
                                break
                            }
                    g || this.addCue(e)
                }
            }
            this.Ja = b
        }
        ;
        h.va = function(a) {
            return this.Ja ? this.Ja.time + this.Ja.duration - a : 0
        }
        ;
        h.addCue = function(a) {
            if (this.a.onCue)
                this.a.onCue(this.Ob);
            var b = a.Qf;
            this.Uc.addCue(b);
            var c = a.rk;
            if (c) {
                var d = null;
                b.vl = function() {
                    var a = document.createElement("img");
                    a.src = "data:image/png;base64," + c;
                    a.style.position = "absolute";
                    a.style.left = "0";
                    a.style.bottom = "0";
                    a.style.right = "0";
                    a.style.margin = "0 auto";
                    a.style.zIndex = 5;
                    this.a.mediaElement.parentNode.appendChild(a);
                    d = a;
                    this.Rd.push(d)
                }
                    .bind(this);
                b.wl = function() {
                    d && (d.remove(),
                        this.Rd.splice(this.Rd.indexOf(d), 1))
                }
                    .bind(this)
            }
        }
        ;
        var kg = function(a) {
            for (var b = [], c = a.Uc.cues, d = a.Xj.Zb(), e = 0; e < c.length; ) {
                var f = c[e];
                f.endTime < d ? a.Uc.removeCue(f) : (b.push(f),
                    e++)
            }
            return b
        };
        ig.prototype.parse = function(a, b) {
            for (a = this.qe.parse(a, b); 0 < a.length; )
                this.addCue(a.pop())
        }
        ;
        var lg = function(a) {
            H.call(this);
            this.ob = null;
            this.gh = a
        };
        q(lg, H);
        lg.prototype.tg = function() {
            this.ob && (this.ob.onprogress = null);
            this.ob = H.prototype.tg.call(this);
            this.ob.onprogress = this.gh;
            return this.ob
        }
        ;
        lg.prototype.G = function() {
            this.ob && (this.ob.onprogress = null);
            H.prototype.G.call(this)
        }
        ;
        var ng = function() {
            var a = mg
                , b = this;
            return new F(function(c, d) {
                    var e = new lg(function() {}
                    );
                    E(e, "success", function(a) {
                        c(Ld(a.target))
                    }, !1, b);
                    E(e, "error", d, !1, b);
                    E(e, "timeout", d, !1, b);
                    e.send(a)
                }
            )
        };
        var og = function(a, b, c) {
            var d = x();
            this.clientId = a;
            this.blockIds = b;
            this.flags = c;
            this.timestamp = d
        }
            , qg = function() {
            var a = pg();
            this.qg = a && a.clientId || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        };
        qg.prototype.Kc = function(a) {
            ya("Cast.MPL.ExperimentationFetchResult", !0);
            var b, c;
            try {
                b = Kc(a.substring(5)),
                    c = new Ne(b[0])
            } catch (g) {
                rg(this, "Failed to parse experimentation flags.");
                return
            }
            a = J(c, 1);
            b = we(c);
            c = {};
            b = m(b);
            for (var d = b.next(); !d.done; d = b.next()) {
                var d = d.value
                    , e = d.getName()
                    , f = void 0;
                switch (oe(d, te[0])) {
                    case 2:
                        f = J(d, 5);
                        break;
                    case 3:
                        f = J(d, 3);
                        break;
                    case 4:
                        f = d.getFloatValue();
                        break;
                    case 5:
                        f = J(d, 5)
                }
                c[e] = f
            }
            sg("Cast.MPL.ExperimentationDownloadedBlockId", a);
            window.localStorage.setItem("cast.player.common.Experimentation", JSON.stringify(new og(this.qg,a,c)));
            D(tg, "Flags: " + c.toString())
        }
        ;
        qg.prototype.Cb = function() {
            ya("Cast.MPL.ExperimentationFetchResult", !1);
            rg(this, "Failed to download experimentation flags.")
        }
        ;
        var rg = function(a, b) {
            C(tg, b);
            window.localStorage.setItem("cast.player.common.Experimentation", JSON.stringify(new og(a.qg,[],{})))
        }
            , sg = function(a, b) {
            if (t(b) && 0 < b.length) {
                b = m(b);
                for (var c = b.next(); !c.done; c = b.next())
                    z(a, c.value)
            }
        }
            , vg = function(a) {
            if (!ug()) {
                var b = pg();
                if (t(b) && t(b.flags))
                    return b.flags[a]
            }
        }
            , ug = function() {
            var a = pg();
            if (!t(a) || !t(a.timestamp))
                return !0;
            var b = x() - a.timestamp
                , a = a.flags.expirationHrs;
            w(a) || (a = 3);
            return b > 36E5 * a
        }
            , pg = function() {
            var a = window.localStorage.getItem("cast.player.common.Experimentation");
            return a ? JSON.parse(a) : void 0
        };
        la(qg);
        var tg = A("cast.player.common.Experimentation")
            , wg = qg.ef()
            , xg = ug();
        ya("Cast.MPL.ExperimentationCheckExpired", xg);
        if (xg) {
            var mg = "https://$Env$.google.com/cast/senderconfig/config?hw=mpl&id=$ClientId$".replace(/\$Env\$/g, uf ? "clients3" : "clients5").replace(/\$ClientId\$/g, wg.qg.toString());
            ng().then(wg.Kc.bind(wg), wg.Cb.bind(wg))
        }
        ;var yg = function(a, b) {
            this.ca = a;
            this.Xd = [];
            for (var c = 0; c < a.length; c++)
                this.Xd.push(c);
            this.zk = t(b) ? b : 3;
            this.Fe = {};
            this.fd = this.Xd.slice()
        };
        yg.prototype.ii = function() {
            return 0
        }
        ;
        yg.prototype.Dh = function() {
            this.Fe = {};
            this.fd = this.Xd.slice()
        }
        ;
        yg.prototype.Oe = function(a) {
            this.Fe[a] || (this.Fe[a] = 0);
            this.Fe[a]++;
            this.Fe[a] > (1 == this.fd.length ? this.zk : this.ii()) && (a = this.fd.indexOf(a),
            -1 < a && this.fd.splice(a, 1));
            return this.fd
        }
        ;
        var zg = function(a, b) {
            yg.call(this, a, b)
        };
        q(zg, yg);
        zg.prototype.Oe = function(a, b) {
            for (var c = 0, d = this.ca[0], e = 1; e < this.ca.length; e++)
                this.ca[e] < d && (d = this.ca[e],
                    c = e);
            if (!b || b && a == c)
                this.fd = [c];
            return yg.prototype.Oe.call(this, a, b)
        }
        ;
        var Ag = function(a, b) {
            yg.call(this, a, b);
            this.Ee = Array(this.ca.length);
            this.Ee.fill(0);
            a = vg("numRetriesPerQualityLevel");
            this.Ak = w(a) ? a : 1;
            a = vg("blacklistThreshold");
            this.ck = w(a) ? a : 6
        };
        q(Ag, yg);
        Ag.prototype.ii = function() {
            return this.Ak
        }
        ;
        Ag.prototype.Dh = function(a) {
            this.Ee[a] = 0;
            yg.prototype.Dh.call(this, a)
        }
        ;
        Ag.prototype.Oe = function(a, b) {
            this.Ee[a] += 1;
            if (this.Ee[a] >= this.ck) {
                var c = this.Xd.indexOf(a);
                -1 < c && this.Xd.splice(c, 1)
            }
            return yg.prototype.Oe.call(this, a, b)
        }
        ;
        var Dg = function(a, b, c, d) {
            this.a = a;
            this.S = b;
            this.ca = c;
            a = this.a.initialBandwidth;
            3145728 == this.a.initialBandwidth && (a = parseFloat(window.localStorage.getItem("cast.player.core.QualityManager.currentBandwidth")),
                a = w(a) && a > this.a.initialBandwidth ? a : this.a.initialBandwidth);
            this.Sb = a;
            this.xc = Bg(this, this.Sb);
            D(Cg, this.S + ": initial " + this.ca[this.xc]);
            this.ze = 0;
            this.Vf = null;
            this.Gi = x();
            this.pd = d;
            a = this.ca;
            d = wf(d);
            if (t(d))
                for (z("Cast.MPL.Available" + d + "Bitrates", a.length),
                         b = 0; b < a.length; b++)
                    z("Cast.MPL.Available" + d + "Bitrate" + b, a[b])
        };
        Dg.prototype.M = function() {
            Eg(this)
        }
        ;
        var Bg = function(a, b, c) {
            for (var d = -1, e = Number.MAX_VALUE, f = t(c) ? c[0] : 0, g = 0; g < a.ca.length; g++)
                if (!t(c) || -1 !== c.indexOf(g)) {
                    if (b >= a.ca[g]) {
                        var k = b - a.ca[g];
                        k < e && (d = g,
                            e = k)
                    }
                    a.ca[f] > a.ca[g] && (f = g)
                }
            return 0 > d ? f : d
        }
            , Fg = function(a, b, c, d) {
            var e = x();
            if (!b && null !== a.Vf && e - a.Vf < 2E3 * (c || 0))
                return a.xc;
            a.Vf = e;
            b = Bg(a, .7 * a.Sb, d);
            a.a.getQualityLevel && (b = a.a.getQualityLevel(a.S, b),
            b >= a.ca.length && (C(Cg, a.S + ": Host provided an invalid quality level!"),
                b = a.ca.length - 1));
            b != a.xc && (D(Cg, a.S + ": from " + a.ca[a.xc] + " to " + a.ca[b]),
                Eg(a),
                a.xc = b);
            return a.xc
        }
            , Hg = function(a, b) {
            3E5 > x() - a.Gi || (z("Cast.MPL.Bandwidth", b),
            Gg || window.localStorage.setItem("cast.player.core.QualityManager.currentBandwidth", "" + b),
                Eg(a))
        }
            , Eg = function(a) {
            var b = x()
                , c = wf(a.pd);
            t(c) && z("Cast.MPL." + c + "Bitrate", a.ca[a.xc]);
            a.Gi = b
        }
            , Cg = A("cast.player.core.QualityManager")
            , Gg = document.domain.includes("gstatic.com");
        var Ig = function() {};
        y("cast.player.core.ProcessSourceDataCallback", Ig);
        Ig.prototype.ye = function() {}
        ;
        var Jg = function(a, b, c, d, e) {
            B.call(this);
            this.a = a;
            this.Qk = e;
            this.qc = c;
            this.ba = d;
            this.S = b;
            this.Yf = !1;
            this.ua = this.Ja = this.jc = null;
            this.Xb = new Pd;
            this.gd = 0;
            this.createBuffer()
        };
        q(Jg, B);
        h = Jg.prototype;
        h.G = function() {
            B.prototype.G.call(this);
            this.Xb.clear();
            this.ua && (Cc(this.ua, "updateend", this.ej, !1, this),
            "closed" != this.ba.readyState && this.ba.removeSourceBuffer(this.ua))
        }
        ;
        h.createBuffer = function() {
            if (null === this.ua && "open" == this.ba.readyState) {
                var a = this.qc.mimeType + '; codecs="' + pf(this.qc.codecs) + '"';
                D(Kg, "buffer type: " + a);
                try {
                    this.ua = this.ba.addSourceBuffer(a)
                } catch (b) {
                    this.a.R(110, void 0, b.message);
                    return
                }
                E(this.ua, "updateend", this.ej, !1, this);
                Lg(this)
            }
        }
        ;
        h.va = function(a) {
            var b = this.gd + (this.jc ? this.jc.duration : 0);
            return this.Ja ? this.Ja.time + this.Ja.duration - a + b : b
        }
        ;
        h.reset = function() {
            this.jc = this.Ja = null;
            this.Xb.clear();
            this.gd = 0;
            this.de() ? Mg(this) : (D(Kg, this.S + ": queue remove"),
                this.Xb.enqueue({
                    hh: 1,
                    gg: null
                }));
            this.de() ? Ng(this) : (D(Kg, this.S + ": queue abort"),
                this.Xb.enqueue({
                    hh: 0,
                    gg: null
                }))
        }
        ;
        h.de = function() {
            return null !== this.ua && !this.Yf && this.Xb.oa()
        }
        ;
        h.hi = function() {
            return $e(this.qc.mimeType) ? 40 : 20
        }
        ;
        var Lg = function(a) {
            for (; !a.Xb.oa(); ) {
                var b = a.Xb.hd()
                    , c = b.gg;
                switch (b.hh) {
                    case 2:
                        D(Kg, a.S + ": dequeue append");
                        a.gd -= c.interval.duration;
                        Og(a, c.data, c.interval, c.N, c.T);
                        return;
                    case 1:
                        D(Kg, a.S + ": dequeue remove");
                        Mg(a);
                        return;
                    case 0:
                        D(Kg, a.S + ": dequeue abort"),
                            Ng(a)
                }
            }
        };
        Jg.prototype.ej = function() {
            for (var a = this.ua.buffered, b = 0; b < a.length; b++)
                D(Kg, this.S + ": " + a.start(b) + " - " + a.end(b));
            D(Kg, this.S + ": updateend");
            null !== this.jc && 0 != this.jc.duration && (this.Ja = this.jc);
            this.jc = null;
            this.Yf = !1;
            Lg(this)
        }
        ;
        var Og = function(a, b, c, d, e) {
            e ? (Ng(a),
                e = Pg(a, c.time),
                a.ua.timestampOffset = e - d,
                D(Kg, a.S + ": timestampOffset = " + a.ua.timestampOffset)) : e = Pg(a, c.time);
            D(Kg, a.S + ": append " + b.length + " bytes");
            a.Yf = !0;
            a.ua.appendBuffer(b);
            a.jc = {
                time: e,
                duration: c.duration
            };
            a.Qk.ye(a.qc.mimeType, b, a.ua.timestampOffset, e, c.duration)
        }
            , Ng = function(a) {
            "open" == a.ba.readyState ? (D(Kg, a.S + ": abort"),
                a.ua.abort()) : C(Kg, a.S + ": unable to abort")
        }
            , Mg = function(a) {
            D(Kg, a.S + ": remove");
            a.Yf = !0;
            a.ua.remove(0, Infinity)
        };
        Jg.prototype.append = function(a, b, c, d) {
            this.de() ? Og(this, a, b, c, d) : (D(Kg, this.S + ": queue append"),
                this.gd += b.duration,
                this.Xb.enqueue({
                    hh: 2,
                    gg: {
                        data: a,
                        interval: {
                            time: b.time,
                            duration: b.duration
                        },
                        N: c,
                        T: d
                    }
                }))
        }
        ;
        var Pg = function(a, b) {
            if (!a.Ja || a.a.dk)
                return b;
            var c = b
                , d = a.ua.buffered;
            0 < d.length && (b = d.end(d.length - 1));
            D(Kg, a.S + ": adjustTime: " + c + " : " + b);
            return b
        }
            , Kg = A("cast.player.core.SourceBufferManager");
        var Qg = function(a, b, c, d, e, f) {
            B.call(this);
            this.Aa = a;
            this.host = b;
            this.protocol = c;
            this.I = d;
            c = c.getStreamInfo(d);
            this.tc = bf(c.role, c.mimeType) ? new ig(a,b,c.codecs) : new Jg(b,d,c,e,a);
            zf(c.codecs);
            z("Cast.MPL.MimeType", Df(c.mimeType));
            z("Cast.MPL.StreamType", $e(c.mimeType) ? 1 : af(c.mimeType) ? 2 : bf(c.role, c.mimeType) ? 3 : 0);
            this.sf = !1;
            this.g = 1;
            this.Hf = 0;
            this.Gd = !1;
            this.Jh = this.lb = 0;
            this.pb = 400;
            this.cc = this.Dc = this.nd = this.tf = !1;
            this.Fi = this.hg = 0;
            this.bb = new Pd;
            this.u = new Qe;
            this.u.setResponse = this.Vk.bind(this);
            this.f = new lg(this.gh.bind(this));
            this.f.lc = "arraybuffer";
            E(this.f, "success", this.Kc, !1, this);
            E(this.f, "error", this.Cb.bind(this, !1));
            E(this.f, "timeout", this.Cb.bind(this, !0));
            E(this.f, "ready", this.Hk, !1, this);
            a = this.protocol.getStreamInfo(this.I).bitrates;
            this.Pc = new Dg(b,d,a,c.mimeType);
            this.Xe = If.ef();
            this.Fd = null;
            (b = f) || (b = this.host.segmentRequestRetryLimit,
                b = vg("simpleFailOver") ? new Ag(a,b) : new zg(a,b));
            this.di = b
        };
        q(Qg, B);
        Qg.prototype.G = function() {
            clearTimeout(this.Fd);
            this.Fd = null;
            this.tc.M();
            this.Pc.M();
            this.f.M();
            B.prototype.G.call(this)
        }
        ;
        Qg.prototype.Vk = function(a, b) {
            a ? this.jf({
                Cc: this.cc,
                data: new Uint8Array(a),
                interval: this.u.interval,
                kc: this.u.kc
            }, this.u, b) : this.Cb(!1);
            this.tf = !1;
            this.nd && (Rg(this),
                this.nd = !1)
        }
        ;
        var Tg = function(a) {
            var b;
            a: {
                b = a.Xe;
                var c = a.host.url
                    , d = a.I;
                if (b.isEnabled() && b.Ge.Vb(c) && (b = b.Ge.get(c)[d],
                        w(b)))
                    break a;
                b = -1
            }
            -1 < b ? Sg(a, b) : Sg(a, Fg(a.Pc, !0, void 0, void 0))
        }
            , Sg = function(a, b) {
            var c = a.protocol.getQualityLevel(a.I);
            if (b == c)
                return !1;
            a.sf = !0;
            a.protocol.Kf(a.I, b, a);
            return !0
        }
            , Vg = function(a, b, c, d, e) {
            if (a.Dc) {
                D(Ug, a.I + ": segment processed");
                a.Dc = !1;
                if (a.host.processSegment) {
                    var f = a.host.processSegment(a.I, b);
                    f instanceof Uint8Array && (b = f)
                }
                a.tc.append(b, c, d, e)
            } else
                D(Ug, a.I + ": not processing");
            a.mh()
        }
            , Yg = function(a, b) {
            a.Dc ? Wg(a, b, "processing previous segment") : a.bb.oa() ? Xg(a, b) ? a.xe(b) : (Wg(a, b, "segment duration will go beyond buffer limit"),
                a.Fd = setTimeout(a.mh.bind(a), 1E3)) : Wg(a, b, "queue has " + a.bb.sb() + " segments")
        }
            , Wg = function(a, b, c) {
            D(Ug, a.I + ": queue segment (" + b.data.length + ") as " + c);
            a.bb.enqueue(b)
        };
        Qg.prototype.mh = function() {
            if (!this.Dc && !this.bb.oa()) {
                var a = this.bb.kh();
                Xg(this, a) ? (D(Ug, this.I + ": dequeue segment"),
                    this.bb.hd(),
                    this.xe(a)) : this.Fd = setTimeout(this.mh.bind(this), 1E3)
            }
        }
        ;
        var Xg = function(a, b) {
            var c = a.va(a.Aa.Zb());
            return c <= a.host.autoPauseDuration ? !0 : c + b.interval.duration <= a.tc.hi()
        };
        Qg.prototype.xe = function(a) {
            D(Ug, this.I + ": process segment");
            this.Dc = !0;
            this.protocol.processSegment(this.I, a, this)
        }
        ;
        Qg.prototype.reset = function() {
            D(Ug, this.I + ": reset");
            this.g = 1;
            this.Hf = 0;
            this.Gd = !1;
            Zg(this);
            this.Dc = this.nd = !1;
            this.bb.clear();
            clearTimeout(this.Fd);
            this.Fd = null;
            this.cc || this.f.abort();
            this.protocol.reset(this.I);
            this.tc.reset();
            this.Aa.hc()
        }
        ;
        Qg.prototype.Kc = function(a) {
            var b = this.protocol.getQualityLevel(this.I);
            this.di.Dh(b);
            this.jf({
                Cc: this.cc,
                headers: this.f.getAllResponseHeaders(),
                data: new Uint8Array(Ld(a.target)),
                interval: this.u.interval,
                kc: this.u.kc
            }, this.u)
        }
        ;
        Qg.prototype.jf = function(a, b, c) {
            if (!a.gi) {
                c = t(c) ? c : x() - this.Hf;
                b = this.Pc;
                var d = a.data.length;
                0 >= c || (b.a.trackBandwidth && b.a.trackBandwidth(b.S, c, d),
                    Cf("Cast.MPL.SegmentStats.Size", d),
                    Cf("Cast.MPL.SegmentStats.Time", c),
                    c = 0 < c ? 8 * d / (c / 1E3) : 0,
                    b.Sb = .8 * c + (1 - .8) * b.Sb,
                    D(Cg, b.S + ": current=" + c.toFixed(2) + ", average=" + b.Sb.toFixed(2)),
                    Hg(b, c),
                    b.ze = 0)
            }
            Zg(this);
            Yg(this, a);
            if (!$g(this, a) && (b = this.va(this.Aa.Zb()),
                a.gi || Sg(this, Fg(this.Pc, 10 > b, a.interval.duration, void 0)),
                    this.hg = .8 * b + (1 - .8) * this.hg,
                3E5 < x() - this.Fi && (z("Cast.MPL.AverageBufferDuration", parseInt(this.hg, 10)),
                    this.Fi = x()),
                    this.sf))
                return;
            this.Aa.hc()
        }
        ;
        var $g = function(a, b) {
            return a.cc ? (a.cc = !1,
                a.protocol.uj(a.I, b.data),
                !0) : a.Gd = !1
        };
        h = Qg.prototype;
        h.Hk = function() {
            this.nd && (Rg(this),
                this.nd = !1)
        }
        ;
        h.Cb = function(a) {
            var b = this.Pc
                , c = x() - this.Hf;
            b.a.trackBandwidth && b.a.trackBandwidth(b.S, c, b.ze);
            a && (b.Sb = 0 < c ? 8 * b.ze / (c / 1E3) : 0);
            b.ze = 0;
            b.Vf = null;
            D(Cg, b.S + ": current=" + b.Sb.toFixed(2));
            Hg(b, b.Sb);
            b = this.protocol.getQualityLevel(this.I);
            a = this.di.Oe(b, a);
            0 == a.length ? this.host.el ? (Zg(this),
                this.Aa.hc()) : (this.g = -1,
                a = this.tf ? void 0 : new Re(this.u.url,this.f.yb,Jd(this.f),this.f.getAllResponseHeaders(),Ld(this.f)),
                this.host.R(301, a)) : Sg(this, Fg(this.Pc, !0, void 0, a)) ? (this.Gd = !0,
                this.Aa.hc()) : (this.lb++,
                this.Jh = x(),
                this.Aa.hc(this.pb))
        }
        ;
        h.gh = function(a) {
            this.Pc.ze = a.loaded
        }
        ;
        h.va = function(a) {
            return this.tc.va(a)
        }
        ;
        h.createBuffer = function() {
            this.tc.createBuffer()
        }
        ;
        var bh = function(a) {
            a.sf = !1;
            a.Aa.$g();
            ah(a, !1);
            a.cc ? Rg(a) : a.Aa.hc()
        }
            , Rg = function(a) {
            if (ch(a))
                a.nd = !0;
            else {
                a.Hf = x();
                a.protocol.updateSegmentRequestInfo(a.I, a.u);
                var b = a.u.interval;
                a.u.timeoutInterval = Math.max(2E3 * b.duration, 1E4);
                a.u.skipRequest = !1;
                if (a.host.updateSegmentRequestInfo && (a.host.updateSegmentRequestInfo(a.u, a.I),
                        a.u.skipRequest)) {
                    a.tf = !0;
                    return
                }
                Of(a.Xe, a.u) ? Pf(a.Xe, a.u).then(function(c) {
                    a.jf({
                        Cc: a.cc,
                        data: new Uint8Array(c),
                        interval: b,
                        kc: a.u.kc,
                        gi: !0
                    }, a.u)
                }, function() {
                    dh(a)
                }) : dh(a)
            }
        }
            , dh = function(a) {
            a.f.Ld = a.u.withCredentials;
            a.f.Nb = Math.max(0, a.u.timeoutInterval);
            a.f.send(a.u.url, void 0, void 0, a.u.headers)
        };
        Qg.prototype.be = function() {
            return 0 < this.g || this.Dc || ch(this) || !this.tc.de() || !this.bb.oa()
        }
        ;
        Qg.prototype.Rg = function() {
            var a;
            if (a = !this.sf && 2 > this.bb.sb() && !ch(this))
                a = this.bb.kh(),
                    a = !(a && !Xg(this, a));
            return a
        }
        ;
        var ch = function(a) {
            return a.f.be() || a.tf
        }
            , ah = function(a, b) {
            if (a.protocol.rd(a.I)) {
                var c = a.protocol.Td(a.I);
                null === c ? (a.cc = !0,
                    a.Gd = a.Gd || b) : Yg(a, {
                    Cc: !0,
                    data: c,
                    interval: {
                        time: a.u.interval.time,
                        duration: 0
                    }
                })
            }
        };
        Qg.prototype.He = function() {
            if (0 < this.lb || this.Gd) {
                if (0 < this.lb) {
                    if (x() - this.Jh < this.pb)
                        return;
                    this.pb *= 2
                }
                Rg(this)
            } else if (1 == this.g) {
                var a = this.Aa.Zb()
                    , b = this.protocol.seek(this.I, a);
                w(b) ? (D(Ug, this.I + ": seek success " + a),
                    this.g = 2,
                    this.Aa.dh(this.I, b),
                    ah(this, !0),
                    Rg(this)) : D(Ug, this.I + ": seek failure " + a)
            } else
                this.protocol.dc(this.I) && (ah(this, !0),
                    Rg(this)),
                this.protocol.ub(this.I) && (this.g = 0)
        }
        ;
        var Zg = function(a) {
            a.lb = 0;
            a.Jh = 0;
            a.pb = 400
        }
            , Ug = A("cast.player.core.SegmentManager");
        var eh = function(a, b, c, d, e) {
            Qg.call(this, a, b, c, d, new MediaSource);
            this.Wh = e;
            this.mg = 0
        };
        q(eh, Qg);
        eh.prototype.jf = function(a, b) {
            var c = this
                , d = $g(this, a) ? 0 : this.protocol.getSegmentInterval(this.I).duration;
            Lf(this.Xe, b, a.data.buffer).then(function() {
                c.mg += d;
                var b = c.Wh
                    , f = c.I
                    , g = a.data.buffer.byteLength;
                b.w.ub(f) ? (D(fh, "Cached the entire stream " + f),
                    gh(b, f)) : b.Ed.va(b.ab.Mg) >= b.a.autoResumeDuration ? (D(fh, "Successfully cached stream " + f),
                    gh(b, f)) : b.Kb.zd < g ? (C(fh, "Cache likely can not fit the next segement for stream " + f),
                    gh(b, f)) : b.Ed.He()
            }, function(a) {
                C(hh, "Unable to cache segment (" + b.url + ") because of " + a);
                gh(c.Wh, c.I)
            })
        }
        ;
        eh.prototype.va = function() {
            return this.mg
        }
        ;
        var hh = A("cast.player.cache.SegmentManager");
        var ih = function() {};
        y("cast.player.core.CurrentTimeCallback", ih);
        ih.prototype.Zb = function() {}
        ;
        var jh = function() {};
        y("cast.player.core.PlayerCallbacks", jh);
        jh.prototype.hc = function() {}
        ;
        jh.prototype.dh = function() {}
        ;
        jh.prototype.$g = function() {}
        ;
        var lh = function(a) {
            this.X = kh(a)
        };
        lh.prototype.reset = function(a) {
            this.X = kh(a)
        }
        ;
        var kh = function(a) {
            for (var b = -1, c = 0; c < a.length; c++) {
                var d = parseInt(a.charAt(c), 10);
                if (isNaN(d))
                    throw Error("Invalid positive base 10 integer string");
                0 > b && d && (b = c)
            }
            return a.substr(b, a.length)
        };
        lh.prototype.toString = function() {
            return this.X
        }
        ;
        lh.prototype.add = function(a) {
            if (0 > a || Math.floor(a) != a)
                throw Error("Value must be a positive integer");
            var b = a + ""
                , c = Math.max(b.length, this.X.length);
            a = [];
            for (var d = 0, e = 0; e < c; e++) {
                var f = d + parseInt(e < b.length ? b.charAt(b.length - 1 - e) : "0", 10) + parseInt(e < this.X.length ? this.X.charAt(this.X.length - 1 - e) : "0", 10);
                10 <= f ? (d = 1,
                    f -= 10) : d = 0;
                a.push(f)
            }
            b = 0 < d ? "1" : "";
            for (c = a.length - 1; 0 <= c; c--)
                b += a[c];
            this.X = b
        }
        ;
        var mh = function(a, b) {
            if (b.X.length < a.X.length)
                return !0;
            if (b.X.length > a.X.length)
                return !1;
            for (var c = 0; c < b.X.length; c++) {
                var d = parseInt(a.X.charAt(c), 10)
                    , e = parseInt(b.X.charAt(c), 10);
                if (d < e)
                    return !1;
                if (d > e)
                    break
            }
            return !0
        };
        var nh = function(a) {
            B.call(this);
            this.hl = a;
            this.Ig = this.Wc = null;
            this.lb = 0;
            this.oh = null;
            this.pb = 400;
            this.f = new lg(function() {}
            );
            E(this.f, "success", this.Kc.bind(this));
            E(this.f, "error", this.Cb.bind(this));
            E(this.f, "timeout", this.Ik.bind(this))
        };
        q(nh, B);
        nh.prototype.G = function() {
            this.f.M();
            B.prototype.G.call(this)
        }
        ;
        nh.prototype.load = function(a) {
            var b = this;
            if (this.Wc = a.url) {
                var c = If.ef();
                Of(c, a) ? Pf(c, a).then(function(a) {
                    b.Bd(String.fromCharCode.apply(String, [].concat(ia(new Uint16Array(a)))))
                }, function() {
                    oh(b, a)
                }) : oh(this, a)
            } else
                C(Ze, "No url provided for request")
        }
        ;
        var oh = function(a, b) {
            a.Ig = b.headers;
            a.f.Ld = b.withCredentials;
            a.f.Nb = Math.max(0, b.timeoutInterval);
            a.lb = 0;
            a.f.send(a.Wc, void 0, void 0, a.Ig)
        };
        nh.prototype.abort = function() {
            this.f.abort()
        }
        ;
        var ph = function(a) {
            return new Re(a.Wc,a.f.yb,Jd(a.f),a.f.getAllResponseHeaders(),Ld(a.f))
        };
        nh.prototype.Kc = function(a) {
            clearTimeout(this.oh);
            this.pb = 400;
            this.Bd(Ld(a.target))
        }
        ;
        nh.prototype.Cb = function() {
            qh(this, 408 == Jd(this.f) ? 0 : this.pb)
        }
        ;
        nh.prototype.Ik = function() {
            qh(this, 0)
        }
        ;
        var qh = function(a, b) {
            a.lb++;
            clearTimeout(a.oh);
            3 < a.lb ? a.Bd(null) : (1 < a.lb && (a.pb = 2 * b),
                a.oh = setTimeout(function() {
                    a.f.send(a.Wc, void 0, void 0, a.Ig)
                }, b))
        };
        nh.prototype.Bd = function(a) {
            this.lb = 0;
            var b = this.f;
            this.hl.ic(a, b.ob && b.ob.responseURL ? b.ob.responseURL : null)
        }
        ;
        var rh = function(a) {
            nh.call(this, a);
            this.u = this.a = null
        };
        q(rh, nh);
        rh.prototype.od = function(a, b) {
            this.a = a;
            this.u = new Qe;
            this.u.url = this.Wc = b;
            this.u.setResponse = this.Bd.bind(this);
            a.updateManifestRequestInfo && a.updateManifestRequestInfo(this.u);
            this.u.skipRequest || this.load(this.u)
        }
        ;
        rh.prototype.Bd = function(a) {
            this.a && (a = this.a.jj(a, this.u));
            nh.prototype.Bd.call(this, a)
        }
        ;
        var sh = function(a) {
            if (a[7] << 8 | 1 != a[6])
                return C(Ze, "PlayReady header object is not valid"),
                    null;
            for (var b = a[9] << 8 | a[8], b = b + 10, c = "", d = 10; d < b; d += 2)
                c += String.fromCharCode(a[d + 1] << 8 | a[d]);
            for (var d = b = null, c = (new DOMParser).parseFromString(c.trim(), "text/xml").childNodes[0].firstElementChild, c = m(c.children), e = c.next(); !e.done; e = c.next())
                e = e.value,
                    "LA_URL" == e.nodeName ? d = e.textContent : "KID" == e.nodeName && (b = Ha(window.atob(e.textContent)));
            return b ? {
                systemId: ef,
                Wd: a,
                he: new df(b,!0),
                url: d,
                wf: 8
            } : (C(Ze, "PlayReady rights management header does not have KID"),
                null)
        }
            , K = function(a) {
            this.host = a;
            this.Nc = this.Hc = this.uri = null;
            this.Z = void 0;
            this.duration = -1;
            this.m = [];
            this.Lg = []
        }
            , uh = function(a) {
            var b = th(a.m);
            b || (b = a.m.find(function(a) {
                return 1 == a.type && !jf(a.codecs)
            }));
            b && (b.enabled = !0);
            a = m(a.m);
            for (b = a.next(); !b.done; b = a.next())
                if (b = b.value,
                    2 == b.type) {
                    b.enabled = !0;
                    break
                }
        }
            , th = function(a) {
            return a.find(function(a) {
                return 1 == a.type && jf(a.codecs) && hf("audio/mp4", a.codecs)
            })
        };
        K.prototype.getStreamCount = function() {
            return this.m.length
        }
        ;
        K.prototype.getStreamCount = K.prototype.getStreamCount;
        K.prototype.enableStream = function(a, b) {
            var c = this.m[a];
            c.index = -1;
            c.P = -1;
            c.T = !0;
            c.enabled = b;
            c.La = !1;
            this.Lg[a] = []
        }
        ;
        K.prototype.enableStream = K.prototype.enableStream;
        K.prototype.isStreamEnabled = function(a) {
            return this.m[a].enabled
        }
        ;
        K.prototype.isStreamEnabled = K.prototype.isStreamEnabled;
        K.prototype.getQualityLevel = function(a) {
            return this.m[a].P
        }
        ;
        K.prototype.getQualityLevel = K.prototype.getQualityLevel;
        K.prototype.getStreamInfo = function(a) {
            a = this.m[a];
            for (var b = [], c = m(a.v), d = c.next(); !d.done; d = c.next())
                b.push(d.value.ja);
            return new Se(a.codecs,a.mimeType,b,a.language,a.name,a.role)
        }
        ;
        K.prototype.getStreamInfo = K.prototype.getStreamInfo;
        h = K.prototype;
        h.ic = function() {
            uh(this);
            if (this.host.onManifestReady)
                this.host.onManifestReady();
            this.Nc.onManifestReady()
        }
        ;
        h.load = function(a) {
            this.Nc = a;
            this.od()
        }
        ;
        h.od = function() {
            var a = this.host.url;
            this.uri = new I(a);
            this.Hc = new rh(this);
            this.Hc.od(this.host, a)
        }
        ;
        h.Pb = function() {
            this.Hc && (this.Hc.M(),
                this.Hc = null)
        }
        ;
        h.Kf = function(a, b, c) {
            a = this.m[a];
            a.P = b;
            a.La = !0;
            bh(c)
        }
        ;
        h.updateLicenseRequestInfo = function() {}
        ;
        h.getDuration = function() {
            return this.Z ? -1 : this.duration
        }
        ;
        h.wa = function(a) {
            a = this.m[a];
            var b = a.P;
            if (0 > b)
                return null;
            a = a.v[b];
            var c = a.c;
            if (0 == c.length)
                return null;
            var b = c[0].time
                , d = c.length - 1
                , c = c[d].time + c[d].duration;
            this.Z && (c -= 20,
            c < b && (c = b));
            return {
                start: b - a.N,
                end: c - a.N
            }
        }
        ;
        h.seek = function(a, b) {
            var c = this.m[a]
                , d = c.v[c.P]
                , e = d.c;
            a = this.wa(a);
            if (!a)
                return null;
            b < a.start && (b = a.start);
            b > a.end && (b = a.end);
            b += d.N;
            for (a = e.length - 1; 0 <= a; a--)
                if (b >= e[a].time)
                    return c.index = a,
                        c.La = !0,
                    b - d.N;
            return null
        }
        ;
        h.dc = function(a) {
            a = this.m[a];
            var b = a.index + 1;
            return b < a.v[a.P].c.length ? (a.index = b,
                !0) : !1
        }
        ;
        h.ub = function(a) {
            var b = this.m[a];
            a = b.index;
            b = b.v[b.P].c;
            return !this.Z && a == b.length - 1
        }
        ;
        h.getSegmentInterval = function(a) {
            var b = this.m[a]
                , c = b.P;
            return 0 <= c && (a = b.index,
            0 <= a && (b = b.v[c],
                c = b.c,
            a < c.length)) ? {
                time: c[a].time - b.N,
                duration: c[a].duration
            } : {
                time: 0,
                duration: 0
            }
        }
        ;
        h.reset = function(a) {
            this.m[a].index = -1
        }
        ;
        h.rd = function(a) {
            a = this.m[a];
            var b = a.v[a.P];
            null !== b.ib || null !== b.D && null !== b.D.da || (a.La = !1);
            return a.La
        }
        ;
        h.uj = function(a, b) {
            this.m[a].La = !1;
            262144 < b.length ? C(vh, "init data (" + b.length + " bytes) is too large to cache") : this.Lg[a][this.m[a].P] = b
        }
        ;
        h.Td = function(a) {
            var b = this.m[a]
                , c = this.Lg[a];
            return (b = b && c ? c[b.P] || null : null) ? (this.m[a].La = !1,
                b) : null
        }
        ;
        h.updateSegmentRequestInfo = function(a, b) {
            b.interval = this.getSegmentInterval(a)
        }
        ;
        h.processSegment = function() {}
        ;
        h.ff = function() {
            return 0
        }
        ;
        var vh = A("cast.player.comon.StreamingProtocolBase");
        var L = function(a) {
            this.name = a;
            this.wi = !1
        };
        L.prototype.parse = function() {
            this.wi = !0
        }
        ;
        var N = function(a) {
            L.call(this, a);
            this.value = null
        };
        q(N, L);
        N.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            t(a) && -1 < a.indexOf("/") ? (a = a.split("/"),
                this.value = parseInt(a[0], 10) / (1 < a.length ? parseInt(a[1], 10) : 1)) : this.value = parseInt(a, 10)
        }
        ;
        var O = function(a, b) {
            L.call(this, a);
            this.value = b || null
        };
        q(O, L);
        O.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            this.value = a
        }
        ;
        var wh = function(a) {
            L.call(this, a);
            this.value = null
        };
        q(wh, L);
        wh.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            this.value = "true" == a.toLowerCase()
        }
        ;
        var xh = function(a) {
            L.call(this, a);
            this.value = null
        };
        q(xh, L);
        xh.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            if (a = a.match(cc)) {
                var b = !(a[6] || a[7] || a[8]);
                if (b && !(a[2] || a[3] || a[4]) || b && a[5])
                    a = null;
                else {
                    var b = parseInt(a[2], 10) || 0
                        , c = parseInt(a[3], 10) || 0
                        , d = parseInt(a[4], 10) || 0
                        , e = parseInt(a[6], 10) || 0
                        , f = parseInt(a[7], 10) || 0
                        , g = parseFloat(a[8]) || 0;
                    a = a[1] ? new dc(-b,-c,-d,-e,-f,-g) : new dc(b,c,d,e,f,g)
                }
            } else
                a = null;
            this.value = 60 * (60 * (24 * a.Wb + a.ac) + a.gc) + a.mc
        }
        ;
        var yh = function(a) {
            L.call(this, a);
            this.value = null
        };
        q(yh, L);
        yh.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            a = a.toUpperCase();
            for (var b in zh)
                if (zh.hasOwnProperty(b) && a.includes(zh[b])) {
                    this.value = zh[b];
                    break
                }
        }
        ;
        var zh = {
            PLAYREADY: "9A04F079-9840-4286-AB92-E65BE0885F95",
            WIDEVINE: "EDEF8BA9-79D6-4ACE-A3C8-27DCD51D21ED",
            CLEARKEY: "1077EFEC-C0B2-4D02-ACE3-3C1E52E2FB4B",
            ml: "URN:MPEG:DASH:MP4PROTECTION:2011"
        }
            , Ah = function(a) {
            L.call(this, a);
            this.value = null
        };
        q(Ah, L);
        Ah.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            a = a.toUpperCase();
            a.includes("9A04F079-9840-4286-AB92-E65BE0885F95") ? this.value = ef : a.includes("EDEF8BA9-79D6-4ACE-A3C8-27DCD51D21ED") ? this.value = ff : a.includes("1077EFEC-C0B2-4D02-ACE3-3C1E52E2FB4B") && (this.value = gf)
        }
        ;
        var P = function(a, b) {
            for (var c in b)
                if (b.hasOwnProperty(c) && b[c]instanceof L) {
                    var d = b[c];
                    if (!d.wi) {
                        var e = a.getNamedItem(d.name);
                        e && d.parse(e.value)
                    }
                }
        };
        var Bh = function(a) {
            this.buffer = a;
            this.Zh = new DataView(a.buffer,a.byteOffset);
            this.offset = 0
        }
            , Ch = function(a) {
            return a.buffer[a.offset++]
        }
            , Dh = function(a) {
            var b = a.Zh.getUint16(a.offset);
            a.offset += 2;
            return b
        }
            , Q = function(a) {
            var b = a.Zh.getUint32(a.offset);
            a.offset += 4;
            return b
        }
            , Eh = function(a) {
            var b = Q(a);
            a = Q(a);
            return 4294967296 * b + a
        }
            , Fh = function(a, b) {
            var c = a.buffer.subarray(a.offset, a.offset + b);
            a.offset += b;
            return c
        }
            , R = function(a, b) {
            a.offset += b
        };
        var Gh = function(a) {
            Bh.call(this, a)
        };
        q(Gh, Bh);
        var Hh = function(a) {
            this.buffer = new Uint8Array(new ArrayBuffer(a ? a : 2E4));
            this.offset = 0
        }
            , Ih = function(a) {
            return a.buffer.subarray(0, a.offset)
        };
        Hh.prototype.cg = function(a) {
            S(this, [a])
        }
        ;
        Hh.prototype.$c = function(a) {
            S(this, [a >> 8, a])
        }
        ;
        Hh.prototype.j = function(a) {
            S(this, [a >> 24, a >> 16, a >> 8, a])
        }
        ;
        Hh.prototype.Ih = function(a) {
            this.j(a / 4294967296);
            this.j(a % 4294967296)
        }
        ;
        var S = function(a, b) {
            var c = b.length;
            if (!(a.offset + c <= a.buffer.length)) {
                for (var d = a.buffer.length; d < a.offset + c; )
                    d *= 2;
                d = new Uint8Array(new ArrayBuffer(d));
                d.set(a.buffer, 0);
                a.buffer = d
            }
            a.buffer.set(b, a.offset);
            a.offset += c
        };
        var Jh = function(a) {
            Hh.call(this, a)
        };
        q(Jh, Hh);
        var Kh = function(a, b, c) {
            (new DataView(a.buffer,a.byteOffset,a.byteLength)).setUint32(b, c)
        };
        var Lh = [96E3, 88200, 64E3, 48E3, 44100, 32E3, 24E3, 22050, 16E3, 12E3, 11025, 8E3, 7350]
            , Mh = function(a) {
            ec(A("cast.player.mp4.base"), a)
        }
            , Nh = function(a, b, c) {
            if (0 > a || 32 <= a)
                return Mh("Invalid object type id: " + a),
                    null;
            var d = Lh.indexOf(b);
            return 0 > d ? (Mh("Invalid sample rate: " + b),
                null) : 0 > c || 16 < c ? (Mh("Invalid channels: " + c),
                null) : new Uint8Array([a << 3 | d >> 1, d << 7 | c << 3])
        };
        var Oh = function(a) {
            this.J = new Gh(a);
            this.oc = 0;
            this.Kd = this.Jc = null;
            this.Bf = a;
            this.gb = 0;
            this.oc = Q(this.J);
            this.gb = 4;
            this.Jc = Q(this.J);
            this.gb += 4;
            1 == this.oc && (this.oc = Eh(this.J),
                this.gb += 8);
            1970628964 == this.Jc && (this.Kd = new df(Fh(this.J, 16)),
                this.gb += 16)
        }
            , Ph = function(a) {
            switch (a.Jc) {
                case 1836019574:
                case 1836019558:
                case 1836475768:
                case 1953653099:
                case 1953653094:
                case 1701082227:
                case 1835297121:
                case 1835626086:
                case 1684631142:
                case 1937007212:
                    return !0;
                default:
                    return !1
            }
        };
        Oh.prototype.getName = function() {
            return this.Jc
        }
        ;
        var Qh = function(a) {
            return a.Bf.subarray(0, a.oc)
        }
            , T = function(a) {
            return Qh(a).subarray(a.gb)
        };
        Oh.prototype.h = function(a) {
            S(a, this.Bf.subarray(0, this.oc))
        }
        ;
        var U = function(a) {
            Oh.call(this, a);
            this.Yb = this.Da = 0;
            a = Q(this.J);
            this.gb += 4;
            this.Da = a >>> 24;
            this.Yb = a & 16777215
        };
        q(U, Oh);
        var Rh = function(a) {
            U.call(this, a)
        };
        q(Rh, U);
        Rh.prototype.Gg = function(a) {
            for (var b = this.Da, c = Ch(this.J), d = Array(c), e = 0; e < c; e++) {
                var f, g, k;
                if (1 == b) {
                    f = Q(this.J);
                    var l = Q(this.J);
                    g = Q(this.J);
                    var n = Q(this.J);
                    k = new lh(Math.floor(4294967296 * f / 1E4).toString() + "0000");
                    k.add(f % 1E4 * 7296 % 1E4);
                    k.add(l);
                    f = 4294967296 / a * f + l / a;
                    g = 4294967296 / a * g + n / a
                } else
                    n = Q(this.J),
                        g = Q(this.J),
                        k = new lh(n.toString()),
                        f = n / a,
                        g /= a;
                d[e] = {
                    time: f,
                    duration: g,
                    Db: k,
                    offset: 0,
                    size: 0,
                    url: null
                }
            }
            return d
        }
        ;
        var Sh = new df([212, 128, 126, 242, 202, 57, 70, 149, 142, 84, 38, 203, 158, 70, 167, 159])
            , Th = function(a) {
            U.call(this, a)
        };
        q(Th, U);
        Th.prototype.Gg = function(a) {
            var b = this.Da;
            R(this.J, 4);
            var c = Q(this.J)
                , d = 0 == b ? Q(this.J) : Eh(this.J)
                , e = 0 == b ? Q(this.J) : Eh(this.J)
                , f = a + Qh(this).byteOffset
                , g = this.oc;
            R(this.J, 2);
            a = Dh(this.J);
            b = Array(a);
            e = f + g + e;
            for (f = 0; f < a; f++) {
                var g = Q(this.J) & 2147483647
                    , k = Q(this.J);
                R(this.J, 4);
                b[f] = {
                    time: d / c,
                    duration: k / c,
                    Db: null,
                    offset: e,
                    size: g,
                    url: null
                };
                d += k;
                e += g
            }
            return b
        }
        ;
        var Uh = function(a) {
            U.call(this, a);
            this.If = new Uint8Array([]);
            this.qh = null;
            this.Sg = !1;
            this.pe()
        };
        q(Uh, U);
        Uh.prototype.pe = function() {
            var a = new Gh(T(this))
                , b = this.Yb;
            b & 1 && R(a, 20);
            var c = Q(a);
            this.qh = a.buffer.subarray(a.offset);
            this.Sg = b & 2 ? !0 : !1;
            this.If = new Uint8Array(new ArrayBuffer(c));
            for (b = 0; b < c; b++)
                if (this.Sg) {
                    R(a, 8);
                    var d = 6 * Dh(a);
                    this.If[b] = 10 + d;
                    R(a, d)
                } else
                    this.If[b] = 8,
                        R(a, 8)
        }
        ;
        var Vh = new df([162, 57, 79, 82, 90, 155, 79, 20, 162, 68, 108, 66, 124, 100, 141, 244])
            , Wh = function(a) {
            U.call(this, a);
            this.Dd = 0;
            this.Qc = [];
            this.Cd = [];
            this.pe()
        };
        q(Wh, U);
        Wh.prototype.pe = function() {
            var a = new Gh(T(this));
            this.Dd = Q(a);
            var b = this.Yb;
            b & 1 && R(a, 4);
            b & 4 && R(a, 4);
            for (var c = !!(b & 256), d = !!(b & 512), e = !!(b & 1024), b = !!(b & 2048), f = 0; f < this.Dd; f++)
                c && R(a, 4),
                d && this.Qc.push(Q(a)),
                e && R(a, 4),
                b && this.Cd.push(Q(a))
        }
        ;
        Wh.prototype.Jf = function(a) {
            Kh(T(this), 4, a)
        }
        ;
        var Xh = function(a) {
            U.call(this, a);
            this.Me = 9E4;
            this.pe()
        };
        q(Xh, U);
        Xh.prototype.pe = function() {
            var a = new Gh(T(this));
            R(a, 4);
            R(a, 4);
            this.Me = Q(a)
        }
        ;
        var Yh = function(a) {
            U.call(this, a)
        };
        q(Yh, U);
        var Zh = function(a) {
            U.call(this, a);
            this.Ah = new df(Fh(this.J, 16));
            a = Q(this.J);
            this.af = Fh(this.J, a)
        };
        q(Zh, U);
        Zh.prototype.getData = function() {
            return this.af
        }
        ;
        var $h = function(a) {
            U.call(this, a)
        };
        q($h, U);
        var ai = function(a) {
            Oh.call(this, a)
        };
        q(ai, Oh);
        ai.prototype.Jf = function(a, b) {
            var c = V(T(this), 1953653094, void 0, void 0);
            if (c) {
                var d = V(T(c), 1953658222, void 0, void 0);
                d && d.Jf(a - this.Bf.byteOffset);
                b && (a = V(T(c), 1935763823, void 0, void 0)) && (b -= this.Bf.byteOffset,
                    c = 0,
                a.Yb & 1 && (c += 8),
                    c += 4,
                    d = T(a),
                0 != a.Da && (Kh(d, c, Math.floor(b / 4294967296)),
                    c += 4),
                    Kh(d, c, Math.floor(b % 4294967296)))
            }
        }
        ;
        var bi = function(a, b) {
            var c = V(a, 1836019558);
            a = T(V(a, 1835295092)).byteOffset;
            b ? c.Jf(a + b, a) : c.Jf(a)
        }
            , ci = function(a) {
            switch (a.getName()) {
                case 1836019558:
                    return new ai(Qh(a));
                case 1835296868:
                    return new Xh(Qh(a));
                case 1953658222:
                    return new Wh(Qh(a));
                case 1935763823:
                    return new $h(Qh(a));
                case 1936286840:
                    return new Th(Qh(a));
                case 1952868452:
                    return new Yh(Qh(a));
                case 1970628964:
                    var b = a.Kd;
                    return Vh.rb(b) ? new Uh(Qh(a)) : Sh.rb(b) ? new Rh(Qh(a)) : a;
                case 1886614376:
                    return new Zh(Qh(a));
                case 1702061171:
                case 1751411826:
                case 1835427940:
                case 1836476516:
                case 1935763834:
                case 1935894637:
                case 1937011571:
                case 1952804451:
                case 1952867444:
                case 1953196132:
                case 1953654136:
                    return new U(Qh(a));
                default:
                    return a
            }
        }
            , V = function(a, b, c, d) {
            for (var e = 0; e < a.length; ) {
                var f = new Oh(a.subarray(e))
                    , e = e + f.oc;
                if (f.getName() == b && (1970628964 != b || c && c.rb(f.Kd)))
                    return ci(f);
                if (d && Ph(f) && (f = V(T(f), b, c, d)))
                    return f
            }
            return null
        }
            , di = function(a, b) {
            for (var c = 0, d = []; c < a.length; ) {
                var e = new Oh(a.subarray(c))
                    , c = c + e.oc;
                d.push(ci(e));
                b && Ph(e) && (d = d.concat(di(T(e), !0)))
            }
            return d
        };
        var fi = function(a) {
            this.duration = new xh("mediaPresentationDuration");
            this.type = new O("type");
            this.Fj = new xh("minimumUpdatePeriod");
            for (this.url = null; a; ) {
                if ("MPD" == a.nodeName) {
                    P(a.attributes, this);
                    break
                }
                a = a.nextElementSibling
            }
            this.wd = [];
            if (a) {
                for (var b = m(a.children), c = b.next(); !c.done; c = b.next())
                    if (c = c.value,
                        "BaseURL" == c.nodeName) {
                        this.url = c.textContent;
                        break
                    }
                a = m(a.children);
                for (c = a.next(); !c.done; c = a.next())
                    b = c.value,
                    "Period" == b.nodeName && this.wd.push(new ei(b,this))
            }
        }
            , gi = function(a) {
            L.call(this, a);
            this.end = this.start = null
        };
        q(gi, L);
        gi.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            a = a.split("-");
            this.start = parseInt(a[0], 10);
            this.end = parseInt(a[1], 10)
        }
        ;
        var hi = function(a) {
            this.media = new O("media");
            P(a.attributes, this)
        }
            , ii = function(a) {
            this.xj = new O("sourceURL");
            this.sa = new gi("range");
            P(a.attributes, this)
        }
            , ji = function(a) {
            this.duration = new N("duration");
            this.Le = new N("timescale");
            this.N = new O("presentationTimeOffset");
            this.H = new N("startNumber");
            this.Bc = new gi("indexRange");
            P(a.attributes, this);
            this.Rc = this.$d = null;
            a = m(a.children);
            for (var b = a.next(); !b.done; b = a.next())
                switch (b = b.value,
                    b.nodeName) {
                    case "Initialization":
                        this.$d = new ii(b);
                        break;
                    case "SegmentTimeline":
                        this.Rc = [];
                        for (var b = m(b.children), c = b.next(); !c.done; c = b.next()) {
                            var d = c.value
                                , c = 0
                                , e = d.attributes.getNamedItem("r");
                            e && (c = parseInt(e.value, 10));
                            e = (e = d.attributes.getNamedItem("t")) ? new lh(e.value) : null;
                            if (d = d.attributes.getNamedItem("d"))
                                for (d = parseInt(d.value, 10),
                                         this.Rc.push({
                                             time: e,
                                             duration: d
                                         }),
                                         e = 0; e < c; e++)
                                    this.Rc.push({
                                        time: null,
                                        duration: d
                                    })
                        }
                }
        };
        ji.prototype.Ka = function(a) {
            null === a.duration.value && (a.duration = this.duration);
            null === a.Le.value && (a.Le = this.Le);
            null === a.N.value && (a.N = this.N);
            null === a.H.value && (a.H = this.H);
            null === a.Bc.start && (a.Bc = this.Bc);
            null === a.$d && (a.$d = this.$d);
            null === a.Rc && (a.Rc = this.Rc)
        }
        ;
        var ki = function(a) {
            ji.call(this, a);
            this.c = [];
            a = m(a.children);
            for (var b = a.next(); !b.done; b = a.next())
                switch (b = b.value,
                    b.nodeName) {
                    case "SegmentURL":
                        this.c.push(new hi(b))
                }
        };
        q(ki, ji);
        ki.prototype.Ka = function(a) {
            ji.prototype.Ka.call(this, a);
            0 == a.c.length && (a.c = this.c)
        }
        ;
        var li = function(a) {
            ji.call(this, a);
            this.media = new O("media");
            this.da = new O("initialization");
            P(a.attributes, this)
        };
        q(li, ji);
        li.prototype.Ka = function(a) {
            ji.prototype.Ka.call(this, a);
            null === a.media.value && (a.media = this.media);
            null === a.da.value && (a.da = this.da)
        }
        ;
        var ni = function(a) {
            this.Yk = new yh("schemeIdUri");
            P(a.attributes, this);
            var b = this.Yk.value;
            this.Ae = mi(b, a);
            this.$b = "URN:MPEG:DASH:MP4PROTECTION:2011" == b
        }
            , mi = function(a, b) {
            switch (a) {
                case "9A04F079-9840-4286-AB92-E65BE0885F95":
                    a = m(b.children);
                    for (b = a.next(); !b.done; b = a.next())
                        switch (b = b.value,
                            b.nodeName) {
                            case "mspr:pro":
                                return sh(Ha(window.atob(b.childNodes[0].nodeValue.trim())));
                            case "cenc:pssh":
                                return a = Ha(window.atob(b.childNodes[0].nodeValue)),
                                    a = new Zh(a),
                                    sh(a.getData())
                        }
                    return oi(ef);
                case "EDEF8BA9-79D6-4ACE-A3C8-27DCD51D21ED":
                    return oi(ff);
                case "1077EFEC-C0B2-4D02-ACE3-3C1E52E2FB4B":
                    return oi(gf);
                default:
                    return null
            }
        }
            , oi = function(a) {
            return {
                systemId: a,
                Wd: null,
                he: null,
                url: null,
                wf: 0
            }
        }
            , pi = function(a) {
            this.Ce = [];
            this.$b = !1;
            this.Gb = this.D = this.Hb = this.url = null;
            a = m(a.children);
            for (var b = a.next(); !b.done; b = a.next())
                switch (b = b.value,
                    b.nodeName) {
                    case "BaseURL":
                        this.url = b.textContent;
                        break;
                    case "ContentProtection":
                        b = new ni(b);
                        b.Ae && this.Ce.push(b.Ae);
                        this.$b = this.$b || b.$b;
                        break;
                    case "SegmentBase":
                        this.Gb = new ji(b);
                        break;
                    case "SegmentTemplate":
                        this.D = new li(b);
                        break;
                    case "SegmentList":
                        this.Hb = new ki(b)
                }
        };
        pi.prototype.Ka = function(a) {
            a.D ? this.D && this.D.Ka(a.D) : a.D = this.D;
            a.Gb ? this.Gb && this.Gb.Ka(a.Gb) : a.Gb = this.Gb;
            a.Hb ? this.Hb && this.Hb.Ka(a.Hb) : a.Hb = this.Hb;
            var b;
            if (a.url && this.url) {
                b = this.url;
                var c = a.url;
                b instanceof I || (b = ce(b));
                c instanceof I || (c = ce(c));
                b = b.resolve(c).toString()
            } else
                b = a.url || this.url;
            a.url = b;
            0 == a.Ce.length && (a.Ce = this.Ce);
            a.$b = a.$b || this.$b
        }
        ;
        var qi = function(a) {
            pi.call(this, a);
            this.id = new O("id");
            this.mimeType = new O("mimeType");
            this.codecs = new O("codecs");
            P(a.attributes, this)
        };
        q(qi, pi);
        qi.prototype.Ka = function(a) {
            pi.prototype.Ka.call(this, a);
            a.mimeType.value = a.mimeType.value || this.mimeType.value;
            a.codecs.value = a.codecs.value || this.codecs.value
        }
        ;
        var ri = function(a, b) {
            qi.call(this, a);
            this.Mj = new N("bandwidth");
            this.height = new N("height");
            this.width = new N("width");
            P(a.attributes, this);
            b.Ka(this);
            if (this.mimeType.value)
                switch (this.mimeType.value.toLowerCase()) {
                    case "application/ttml+xml":
                        this.codecs.value = "ttml";
                        this.mimeType.value = "text/mp4";
                        break;
                    case "text/vtt":
                        this.codecs.value = "webvtt"
                }
            "avc1" == this.codecs.value && (this.codecs.value = "avc1.4D401E")
        };
        q(ri, qi);
        var si = function(a, b) {
            qi.call(this, a);
            this.language = new O("lang");
            this.md = new N("frameRate");
            P(a.attributes, this);
            this.role = null;
            b.Ka(this);
            this.v = [];
            a = m(a.children);
            for (b = a.next(); !b.done; b = a.next())
                b = b.value,
                    "Representation" == b.nodeName ? this.v.push(new ri(b,this)) : "Role" == b.nodeName && (this.role = b.getAttribute("value"))
        };
        q(si, qi);
        var ei = function(a, b) {
            pi.call(this, a);
            this.duration = new xh("duration");
            this.start = new xh("start");
            P(a.attributes, this);
            this.url = this.url || b.url;
            this.m = [];
            a = m(a.children);
            for (b = a.next(); !b.done; b = a.next())
                switch (b = b.value,
                    b.nodeName) {
                    case "AdaptationSet":
                        this.m.push(new si(b,this))
                }
        };
        q(ei, pi);
        var ti = function(a) {
            K.call(this, a);
            this.De = new db(5);
            this.Lf = !1;
            this.ud = this.od.bind(this);
            this.fa = null;
            this.Lc = [];
            this.Xh = []
        };
        q(ti, K);
        ti.prototype.Pb = function() {
            K.prototype.Pb.call(this);
            null !== this.fa && (clearTimeout(this.fa),
                this.fa = null)
        }
        ;
        ti.prototype.updateLicenseRequestInfo = function(a) {
            var b = this.De.get(a.protectionSystem);
            b && (a.headers = {},
                a.headers["content-type"] = "text/xml;charset=utf-8",
                a.url = b.url)
        }
        ;
        ti.prototype.Zg = function(a) {
            if (a.wd && 0 != a.wd.length) {
                var b = "dynamic" == a.type.value;
                t(this.Z) || Ff(b);
                this.Z = b;
                a.duration.value && (this.duration = a.duration.value);
                a: {
                    var c = a.wd
                        , b = c[0];
                    if (b.m[0].D) {
                        for (var d = [], e = [], c = m(c), f = c.next(); !f.done; f = c.next()) {
                            for (var f = f.value, g = f.duration.value, k = 0, l = [], n = m(f.m), p = n.next(); !p.done; p = n.next()) {
                                var u = p.value
                                    , p = u.D;
                                if (!p) {
                                    C(ui, "Multiple periods not using SegmentTemplate is not supported");
                                    b = [{
                                        start: b.start.value,
                                        duration: b.duration.value,
                                        se: null
                                    }];
                                    break a
                                }
                                var u = this.uri.resolve(new I(u.v[0].url)).toString()
                                    , G = new I(u);
                                e[k] = e[k] || 0;
                                var u = e[k]
                                    , M = {
                                    ja: 0,
                                    N: 0,
                                    c: [],
                                    url: null,
                                    D: null,
                                    H: null,
                                    ib: null
                                };
                                vi(G, p, M);
                                p = wi(G, p);
                                p = {
                                    H: M.H,
                                    N: M.N,
                                    ri: u,
                                    D: p
                                };
                                l.push(p);
                                e[k] += Math.round(g / p.D.duration);
                                k++
                            }
                            d.push({
                                start: f.start.value,
                                duration: f.duration.value,
                                se: l
                            })
                        }
                        b = d
                    } else
                        b = [{
                            start: b.start.value,
                            duration: b.duration.value,
                            se: null
                        }]
                }
                this.Lc = b;
                a = m(a.wd[0].m);
                for (b = a.next(); !b.done; b = a.next()) {
                    d = b.value;
                    b = d.v;
                    e = b[0].mimeType.value;
                    if (null === e) {
                        this.host.R(422, void 0, "No mime type in manifest", ui);
                        break
                    }
                    if ($e(e))
                        c = 1;
                    else if (af(e))
                        c = 2;
                    else if (bf(d.role, e))
                        c = 3;
                    else
                        continue;
                    b = {
                        name: d.id.value,
                        type: c,
                        enabled: !1,
                        La: !1,
                        T: !0,
                        index: -1,
                        P: -1,
                        v: [],
                        language: d.language.value,
                        mimeType: e,
                        codecs: b[0].codecs.value || "",
                        role: d.role
                    };
                    d = m(d.v);
                    for (e = d.next(); !e.done; e = d.next()) {
                        e = e.value;
                        c = m(e.Ce);
                        for (f = c.next(); !f.done; f = c.next())
                            f = f.value,
                            (g = xi(f.systemId)) && this.De.set(g, f);
                        e.$b && (this.Lf = !0);
                        f = this.uri.resolve(new I(e.url)).toString();
                        c = {
                            ja: e.Mj.value || 0,
                            id: e.id.value,
                            N: 0,
                            c: [],
                            url: f,
                            H: null,
                            D: null,
                            ib: null
                        };
                        e.Gb || e.Hb || e.D ? (e.url && "/" != f[f.length - 1] && (f += "/"),
                            f = new I(f),
                            vi(f, e.Gb, c),
                        (g = e.Hb) && vi(f, g, c),
                            e = e.D,
                            g = c,
                        e && (vi(f, e, g),
                            g.D = wi(f, e))) : (e = f,
                            f = this.duration,
                            c.c.push({
                                time: 0,
                                Db: new lh("0"),
                                duration: f,
                                url: e
                            }));
                        b.v.push(c)
                    }
                    b.La = !0;
                    this.m.push(b)
                }
            } else
                this.host.R(421, void 0, "No periods found in manifest", ui)
        }
        ;
        var yi = function(a) {
            if (qf && qf.updateOutputMode) {
                var b = a.md.value;
                if (w(b)) {
                    a = m(a.v);
                    for (var c = a.next(); !c.done; c = a.next()) {
                        var d = c.value
                            , c = d.width.value
                            , e = d.height.value;
                        if (w(c) && w(e) && 2160 <= e) {
                            a = d.codecs.value;
                            D(ui, "Update output mode with frameRate=" + b + " codecs=" + a);
                            qf.updateOutputMode(c, e, b, a);
                            break
                        }
                    }
                }
            }
        }
            , zi = function(a) {
            a = m(a.wd);
            for (var b = a.next(); !b.done; b = a.next())
                for (var c = {}, b = m(b.value.m), d = b.next(); !d.done; c = {
                    md: c.md
                },
                    d = b.next())
                    d = d.value,
                        c.md = d.md.value,
                        d.v = d.v.filter(function(a) {
                            return function(b) {
                                var c;
                                c = a.md;
                                if (rf) {
                                    var d = b.codecs.value
                                        , e = b.mimeType.value
                                        , f = b.width.value;
                                    b = b.height.value;
                                    w(f) && w(b) && 2160 <= b && d && e ? (d = e + "; codecs=" + pf(d) + "; width=" + f + "; height=" + b,
                                    w(c) && (d += "; output_refresh_rate=" + c),
                                        c = rf(d),
                                        D(ui, "canDisplay(" + d + "): " + !!c)) : c = !0
                                } else
                                    c = !0;
                                return c
                            }
                        }(c)),
                        yi(d)
        };
        ti.prototype.ic = function(a, b) {
            if (a) {
                b && (this.uri = new I(b));
                var c = null !== this.fa
                    , d = this.m;
                this.m = [];
                var e = (new DOMParser).parseFromString(a, "text/xml");
                if (e.firstChild)
                    if (e = new fi(e.firstChild),
                            zi(e),
                            this.Zg(e),
                        this.Lf || this.Nc.me(this.De.za()),
                        this.Z && w(e.Fj.value) && (this.fa = setTimeout(this.ud, 1E3 * (e.Fj.value || 10))),
                            c) {
                        for (a = 0; a < d.length; a++) {
                            b = this.m[a];
                            c = d[a];
                            b.enabled = c.enabled;
                            b.P = c.P;
                            b.La = c.La;
                            for (var e = [], f = !0, g = c.index, k = 0; k < b.v.length; k++) {
                                var l = c.v[k]
                                    , n = b.v[k];
                                n.N = l.N;
                                var p;
                                w(l.H) && w(n.H) ? (p = l.H + g - n.H,
                                    p = 0 < p ? {
                                        c: n.c,
                                        index: p,
                                        H: n.H
                                    } : {
                                        c: l.c.slice(g, n.H - l.H).concat(n.c),
                                        index: 0,
                                        H: l.H + g
                                    }) : p = null;
                                if (p)
                                    l = p;
                                else {
                                    p = {
                                        c: [],
                                        index: 0,
                                        H: n.H
                                    };
                                    var u = n.c[0];
                                    0 <= g && u.time < l.c[g].time ? (p.c = n.c,
                                        p.index = Ai(l.c[g].time, n.c),
                                        l = p) : (u = Ai(u.time, l.c),
                                        -1 == u ? l = null : (g > u ? (p.c = n.c,
                                            p.index = g - u) : (p.c = l.c.slice(g, u).concat(n.c),
                                            p.index = 0,
                                        w(n.H) && (p.H -= u - g)),
                                            l = p))
                                }
                                e[k] = l;
                                if (!e[k]) {
                                    f = !1;
                                    C(ui, "Old and new representations are out of sync.");
                                    break
                                }
                            }
                            if (!(0 > g))
                                if (f) {
                                    for (f = 0; f < b.v.length; f++)
                                        b.v[f].c = e[f].c,
                                            b.v[f].H = e[f].H;
                                    b.T = c.T;
                                    b.index = e[0].index
                                } else
                                    b.T = !0,
                                        b.index = 0
                        }
                        this.Nc.bh()
                    } else
                        K.prototype.ic.call(this, a, b)
            } else
                this.host.R(321, ph(this.Hc))
        }
        ;
        ti.prototype.wa = function(a) {
            var b = this.m[a]
                , b = b.v[b.P];
            return 0 == b.c.length && b.D ? (a = this.duration,
            this.Z && (a -= 20),
                {
                    start: 0,
                    end: a
                }) : K.prototype.wa.call(this, a)
        }
        ;
        var Ci = function(a, b, c) {
            c = Bi(a, b, c);
            a.Xh[b] != c && (a.m[b].T = !0);
            a.Xh[b] = c
        };
        ti.prototype.seek = function(a, b) {
            var c = this.m[a]
                , d = c.v[c.P];
            if (0 == d.c.length && d.D) {
                var e = this.wa(a);
                b < e.start && (b = e.start);
                b > e.end && (b = e.end);
                e = Math.floor(b / d.D.duration);
                d = Math.ceil(this.duration / d.D.duration);
                c.index = e < d ? e : d - 1;
                Ci(this, a, c.index);
                return b
            }
            return K.prototype.seek.call(this, a, b)
        }
        ;
        ti.prototype.dc = function(a) {
            var b = this.m[a]
                , c = b.v[b.P];
            if (0 == c.c.length && c.D) {
                var d = b.index + 1;
                return d < Math.ceil(this.duration / c.D.duration) ? (b.index = d,
                    Ci(this, a, b.index),
                    !0) : !1
            }
            return K.prototype.dc.call(this, a)
        }
        ;
        var Bi = function(a, b, c) {
            a = a.Lc;
            for (var d = 0; d < a.length - 1 && !(c < a[d + 1].se[b].ri); d++)
                ;
            return d
        };
        h = ti.prototype;
        h.ub = function(a) {
            var b = this.m[a]
                , c = b.v[b.P];
            return 0 == c.c.length && c.D ? b.index == Math.ceil(this.duration / c.D.duration) - 1 : K.prototype.ub.call(this, a)
        }
        ;
        h.getSegmentInterval = function(a) {
            if (this.rd(a))
                return {
                    time: 0,
                    duration: 0
                };
            var b = this.m[a]
                , c = b.v[b.P];
            if (c.D) {
                b = b.index;
                if (0 > b)
                    return {
                        time: 0,
                        duration: 0
                    };
                0 < c.c.length ? (a = c.c[b].duration,
                    c = c.c[b].time - c.N) : (a = c.D.duration,
                    c = b * a);
                return {
                    time: c,
                    duration: a
                }
            }
            return K.prototype.getSegmentInterval.call(this, a)
        }
        ;
        h.updateSegmentRequestInfo = function(a, b) {
            K.prototype.updateSegmentRequestInfo.call(this, a, b);
            var c = this.m[a]
                , d = c.v[c.P]
                , c = c.index
                , e = this.rd(a);
            if (d.D) {
                var f = d.D
                    , g = null;
                1 < this.Lc.length && (g = this.Lc[Bi(this, a, c)].se[a],
                    f = g.D);
                a = e ? f.da : f.url;
                a = a.replace(/\$RepresentationID\$/g, d.id);
                a = a.replace(/\$Bandwidth\$/g, d.ja.toString());
                e || (e = c + (d.H || 0),
                1 < this.Lc.length && (e = c + (g.H || 0) - g.ri),
                    a = Di(a, e),
                    a = a.replace("$Time$", 0 < d.c.length ? d.c[c].Db.toString() : (c * f.duration).toString()));
                b.url = a
            } else {
                g = f = null;
                if (e)
                    c = d.ib,
                        d = c.url ? c.url : d.url,
                    c.sa && (f = c.sa.start,
                        g = c.sa.end);
                else if (c < d.c.length)
                    c = d.c[c],
                        c.url ? d = c.url : (d = d.url,
                            f = c.offset,
                            g = c.offset + c.size - 1);
                else {
                    this.host.R(423, void 0, "Invalid segment info in manifest.", ui);
                    return
                }
                b.url = d;
                b.headers = {};
                null === f || null === g || (b.headers.Range = "bytes=" + f + "-" + g)
            }
        }
        ;
        h.processSegment = function(a, b, c) {
            var d = this.m[a]
                , e = d.v[d.P]
                , f = b.data;
            if (this.Lf && this.Nc) {
                var g = V(f, 1886614376, void 0, !0);
                if (g = null === g ? null : {
                        systemId: g.Ah,
                        url: null,
                        Wd: null,
                        he: null,
                        wf: 0
                    }) {
                    var k = xi(g.systemId);
                    k && (this.De.set(k, g),
                        this.Nc.me(this.De.za()),
                        this.Lf = !1)
                }
            }
            if (b.Cc)
                if (d = (d = V(f, 1836019574)) ? Qh(d) : null,
                    null === d)
                    this.host.R(322, void 0, "no init", ui);
                else {
                    if (!e.D && 0 == e.c.length) {
                        a = 0;
                        b.Cc && e.ib && e.ib.sa && (a = e.ib.sa.start);
                        f = (f = V(f, 1936286840)) ? f.Gg(a) : null;
                        if (!f) {
                            C(ui, "no segments");
                            return
                        }
                        e.c = f
                    }
                    Vg(c, d, {
                        time: b.interval.time,
                        duration: 0
                    }, 0, !1)
                }
            else
                g = b.interval,
                    e = e.N,
                1 < this.Lc.length && (e = this.Lc[Bi(this, a, d.index)],
                    e = e.se[a].N - e.start),
                this.host.processMetadata && (a = b.data,
                V(a, 1701671783, void 0, !0) && this.host.processMetadata("EMSG", a, b.interval.time)),
                    Vg(c, f, g, g.time + e, d.T),
                    d.T = !1
        }
        ;
        h.ff = function() {
            return 1
        }
        ;
        var xi = function(a) {
            return ef.rb(a) ? "playready" : ff.rb(a) ? "widevine" : gf.rb(a) ? "clearkey" : null
        }
            , vi = function(a, b, c) {
            if (b) {
                null !== b.H.value && (c.H = b.H.value);
                var d = b.Le.value || 1
                    , e = new lh(b.N.value || "0");
                c.N = parseInt(e.toString(), 10) / d;
                var e = new lh(e.toString())
                    , f = b.c
                    , g = b.Rc
                    , k = 0;
                g ? k = g.length : f && 0 < f.length && (k = f.length);
                for (var l = 0; l < k; l++) {
                    var n = g ? g[l].duration : b.duration.value || 0;
                    g && g[l].time && (e = new lh(g[l].time.toString()));
                    var p = {
                        time: parseInt(e.toString(), 10) / d,
                        Db: new lh(e.toString()),
                        duration: n / d,
                        url: f && 0 < f.length ? a.resolve(new I(f[l].media.value)).toString() : null
                    };
                    c.c.push(p);
                    e.add(n)
                }
                (d = c.ib) || (f = e = d = null,
                    g = !0,
                    (k = b.$d) && k.xj.value ? (g = !1,
                        d = k.xj.value,
                    k.sa.start && k.sa.end && (e = k.sa.start,
                        f = k.sa.end)) : (e = 0,
                    k && k.sa.start && k.sa.end && (e = k.sa.start,
                        f = k.sa.end,
                        g = !1),
                    b.Bc.start && b.Bc.end && (e = Math.min(e, b.Bc.start),
                        f = Math.max(f, b.Bc.end),
                        g = !1),
                    f || (f = 2048)),
                    d = g ? null : {
                        url: d ? a.resolve(new I(d)).toString() : null,
                        sa: null === e || null === f ? null : {
                            start: e,
                            end: f
                        },
                        data: null
                    });
                c.ib = d
            }
        }
            , wi = function(a, b) {
            return {
                duration: (b.duration.value || 0) / (b.Le.value || 1),
                url: a.resolve(new I(b.media.value)).toString(),
                da: b.da.value ? a.resolve(new I(b.da.value)).toString() : null
            }
        }
            , Ai = function(a, b) {
            for (var c = .5 * b[0].duration, d = 0; d < b.length; d++)
                if (Math.abs(b[d].time - a) <= c)
                    return d;
            return -1
        }
            , Di = function(a, b) {
            return a.replace(/\$Number(%0\d*[diuxXo]){0,1}\$/g, function(a) {
                var c = a.indexOf("%0");
                if (0 > c)
                    return b;
                c = parseInt(a.substring(c + 2, a.length - 2), 10);
                switch (a.substr(a.length - 2, 1)) {
                    case "x":
                        return kf(b, 16, c);
                    case "X":
                        return kf(b, 16, c).toUpperCase();
                    case "o":
                        return kf(b, 8, c);
                    default:
                        return kf(b, 10, c)
                }
            })
        }
            , ui = A("cast.player.dash.Protocol");
        var Ei = function(a) {
            this.xf = a;
            this.Yd = null;
            this.Bh = this.uc = 0
        }
            , Fi = function(a, b) {
            b = b.length > a.uc ? b.subarray(0, a.uc) : b;
            S(a.Yd, b);
            a.uc -= b.length
        };
        Ei.prototype.append = function(a, b, c, d) {
            b = b.subarray(c, d);
            if (this.Yd)
                return Fi(this, b),
                0 == this.uc && (this.xf && this.xf("ID3", Ih(this.Yd), this.Bh),
                    this.uc = this.Bh = this.Yd = null),
                    0;
            c = 0;
            73 != b[c++] || 68 != b[c++] || 51 != b[c++] ? c = null : (c += 3,
                d = b[c++] << 21 | b[c++] << 14 | b[c++] << 7 | b[c++],
                c += d);
            if (null === c)
                return 0;
            if (c <= b.length)
                return this.xf && this.xf("ID3", b.subarray(0, c), a),
                    c;
            this.Yd = new Hh(c);
            this.Bh = a;
            this.uc = c;
            Fi(this, b);
            return 0
        }
        ;
        var Gi = function() {
            this.o = null;
            this.jd = this.Oc = this.oi = this.fg = this.gf = this.ue = this.C = 0
        };
        Gi.prototype.oa = function() {
            return null === this.o
        }
        ;
        Gi.prototype.pf = function() {
            return this.C >= this.o.length
        }
        ;
        Gi.prototype.da = function(a) {
            this.o = a;
            this.jd = this.Oc = this.fg = this.gf = this.ue = this.C = 0
        }
        ;
        Gi.prototype.parse = function() {
            for (var a = this.C; this.C < this.o.length && !(524288 < this.C - a); ) {
                for (; this.C < this.o.length && 71 != this.o[this.C]; )
                    this.C++;
                if (this.C + 188 > this.o.length)
                    break;
                var b = this.C + 188
                    , c = b - 1;
                this.C++;
                var d = this.o[this.C] & 64
                    , e = this.o[this.C] & 31;
                this.C++;
                e = e << 8 | this.o[this.C];
                this.C++;
                var f = (this.o[this.C] & 48) >> 4;
                this.C++;
                f & 2 && (this.C += this.o[this.C] + 1);
                if (0 == e || e == this.ue)
                    if (d && this.C++,
                            c = this.o[this.C],
                            this.C++,
                        0 == c)
                        for (c = this.C,
                                 d = this.o[c] & 15,
                                 c++,
                                 d = d << 8 | this.o[c],
                                 c++,
                                 d = c + d - 4,
                                 c += 5; c < d; )
                            if (e = this.o[c],
                                    c++,
                                    e = (e << 8) + this.o[c],
                                    c++,
                                0 == e)
                                c += 2;
                            else {
                                this.ue = this.o[c] & 31;
                                c++;
                                this.ue = (this.ue << 8) + this.o[c];
                                break
                            }
                    else {
                        if (2 == c)
                            for (c = this.C,
                                     d = this.o[c] & 15,
                                     c++,
                                     d = d << 8 | this.o[c],
                                     c++,
                                     d = c + d - 4,
                                     c = c + 5 + 2,
                                     e = this.o[c] & 15,
                                     c++,
                                     e = e << 8 | this.o[c],
                                     c += e + 1; c < d; ) {
                                e = this.o[c];
                                c++;
                                f = this.o[c] & 31;
                                c++;
                                f = f << 8 | this.o[c];
                                c++;
                                switch (e) {
                                    case 27:
                                    case 219:
                                        this.gf = f;
                                        break;
                                    case 15:
                                    case 207:
                                        this.fg = f;
                                        break;
                                    case 21:
                                        this.oi = f
                                }
                                e = this.o[c] & 15;
                                c++;
                                e = e << 8 | this.o[c];
                                c += e + 1
                            }
                    }
                else if (e == this.oi)
                    this.gj(this.C, c, !!d);
                else if (e == this.gf || e == this.fg)
                    d && this.jh(this.C),
                    e == this.gf && this.fj(this.C, c);
                this.C = b
            }
        }
        ;
        var Hi = function(a, b) {
            var c = ((a.o[b] & 14) << 13) / 1.373291015625
                , c = c + (a.o[b + 1] << 6) / 1.373291015625
                , c = c + (a.o[b + 2] & 254) / 5.4931640625
                , c = c + a.o[b + 3] / 703.125;
            return c += (a.o[b + 4] & 254) / 18E4
        };
        Gi.prototype.jh = function(a) {
            if (0 == this.o[a] && 0 == this.o[a + 1] && 1 == this.o[a + 2]) {
                a += 7;
                var b = this.o[a] >> 6 & 3;
                a++;
                var c = this.o[a];
                a++;
                this.C = a + c;
                2 == b ? this.jd = this.Oc = Hi(this, a) : 3 == b && (this.Oc = Hi(this, a),
                        this.jd = Hi(this, a + 5))
            }
        }
        ;
        Gi.prototype.gj = function() {}
        ;
        Gi.prototype.fj = function() {}
        ;
        var Ii = function(a, b, c) {
            Gi.call(this);
            this.Ta = null;
            this.mf = b ? new Ei(b) : null;
            this.Xg = Infinity;
            this.fl = c;
            for (this.da(a); !this.pf(); )
                this.parse()
        };
        q(Ii, Gi);
        Ii.prototype.ji = function() {
            return this.Xg
        }
        ;
        Ii.prototype.jh = function(a) {
            Gi.prototype.jh.call(this, a);
            null === this.Ta && (this.Ta = this.jd);
            a = Ji(this.Ta, this.jd);
            a < this.Xg && (this.Xg = a)
        }
        ;
        Ii.prototype.gj = function(a, b, c) {
            if (this.mf) {
                a = new Bh(this.o.subarray(a, b + 1));
                if (c) {
                    if (445 != Q(a))
                        return;
                    R(a, 2);
                    R(a, 2);
                    c = Ch(a);
                    R(a, c)
                }
                null === this.Ta && (this.Ta = this.jd);
                this.mf.append(this.fl + (Ji(this.Ta, this.Oc) - this.Ta), a.buffer.subarray(a.offset), 0)
            }
        }
        ;
        var Ji = function(a, b) {
            var c = Math.floor(a / 95443.7176888889)
                , d = 95443.7176888889 * (c - 1) + b
                , e = 95443.7176888889 * (c + 0) + b;
            b = 95443.7176888889 * (c + 1) + b;
            var c = Math.abs(d - a)
                , f = Math.abs(e - a);
            a = Math.abs(b - a);
            var g = c;
            f < c && (d = e,
                g = f);
            a < g && (d = b);
            return d
        };
        var W = function(a, b) {
            this.Pj = a;
            this.Kd = b ? b : null;
            this.b = null
        };
        W.prototype.h = function(a) {
            var b = Ih(a).length;
            this.b = a;
            this.Hh();
            this.A();
            a = Ih(a).length - b;
            this.b.buffer.set([a >> 24, a >> 16, a >> 8, a], b)
        }
        ;
        W.prototype.Hh = function() {
            this.b.j(0);
            this.b.j(this.Pj);
            this.Kd && S(this.b, this.Kd.Vc())
        }
        ;
        W.prototype.A = function() {
            throw Error("writeBody() should be  overriden.");
        }
        ;
        var X = function(a, b, c) {
            W.call(this, a);
            this.Da = b;
            this.Yb = c
        };
        q(X, W);
        X.prototype.Hh = function() {
            W.prototype.Hh.call(this);
            this.b.j(this.Da << 24 | this.Yb & 16777215)
        }
        ;
        var Ki = function(a) {
            X.call(this, 1935763823, 0, 0);
            this.C = a
        };
        q(Ki, X);
        Ki.prototype.A = function() {
            this.b.j(1);
            this.b.j(this.C)
        }
        ;
        var Li = function(a) {
            X.call(this, 1952867444, 1, 0);
            this.Nd = a
        };
        q(Li, X);
        Li.prototype.A = function() {
            this.b.Ih(this.Nd)
        }
        ;
        var Mi = function(a, b) {
            X.call(this, 1935763834, 0, 0);
            this.ci = a;
            this.sj = b
        };
        q(Mi, X);
        Mi.prototype.A = function() {
            this.b.cg(this.ci);
            this.b.j(this.sj.length);
            0 == this.ci && S(this.b, this.sj)
        }
        ;
        var Ni = function(a, b) {
            X.call(this, 1702061171, 0, 0);
            this.Ck = a;
            this.Od = b
        };
        q(Ni, X);
        Ni.prototype.A = function() {
            S(this.b, [3, 25, 0, 1, 0, 4, 17, this.Ck, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, this.Od[0], this.Od[1]])
        }
        ;
        var Oi = function(a, b) {
            W.call(this, 1635148611);
            this.yj = a;
            this.ij = b
        };
        q(Oi, W);
        Oi.prototype.A = function() {
            S(this.b, [1, 77, 64, 30, 255, 225]);
            this.b.$c(this.yj.length);
            S(this.b, this.yj);
            this.b.cg(1);
            this.b.$c(this.ij.length);
            S(this.b, this.ij)
        }
        ;
        var Pi = function() {
            X.call(this, 1937011571, 0, 0)
        };
        q(Pi, X);
        Pi.prototype.A = function() {
            this.b.j(0)
        }
        ;
        var Qi = function(a, b, c) {
            X.call(this, 1952804451, 0, 1);
            this.ak = c ? 0 : a;
            this.$j = b;
            this.bi = c
        };
        q(Qi, X);
        Qi.prototype.A = function() {
            this.b.j(256 | this.ak);
            S(this.b, this.$j.Vc());
            this.bi && (this.b.cg(16),
                S(this.b, this.bi))
        }
        ;
        var Ri = function(a) {
            X.call(this, 1936027235, 0, 2);
            this.ph = a
        };
        q(Ri, X);
        Ri.prototype.A = function() {
            this.b.j(this.ph.length);
            for (var a = 0; a < this.ph.length; a++) {
                var b = this.ph[a].zj;
                this.b.$c(b.length);
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    this.b.$c(d.kg);
                    this.b.j(d.lg)
                }
            }
        }
        ;
        var Si = function(a, b) {
            X.call(this, 1935894637, 0, 0);
            this.Zk = a;
            this.$k = b
        };
        q(Si, X);
        Si.prototype.A = function() {
            this.b.j(this.Zk);
            this.b.j(this.$k)
        }
        ;
        var Ti = function(a) {
            W.call(this, 1718775137);
            this.Yj = a
        };
        q(Ti, W);
        Ti.prototype.A = function() {
            this.b.j(this.Yj)
        }
        ;
        var Ui = function(a) {
            X.call(this, 1751411826, 0, 0);
            this.mk = a
        };
        q(Ui, X);
        Ui.prototype.A = function() {
            this.b.j(0);
            this.b.j(this.mk);
            S(this.b, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        ;
        var Vi = function(a) {
            X.call(this, 1835296868, 0, 0);
            this.Va = a
        };
        q(Vi, X);
        Vi.prototype.A = function() {
            this.b.j(0);
            this.b.j(0);
            this.b.j(this.Va);
            this.b.j(0);
            S(this.b, [85, 196, 0, 0])
        }
        ;
        var Wi = function(a, b) {
            X.call(this, 1953196132, 0, 3);
            this.ll = a;
            this.nk = b
        };
        q(Wi, X);
        Wi.prototype.A = function() {
            this.b.j(0);
            this.b.j(0);
            S(this.b, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0]);
            this.b.j(this.ll << 16);
            this.b.j(this.nk << 16)
        }
        ;
        var Xi = function(a) {
            X.call(this, 1953654136, 0, 0);
            this.sk = a
        };
        q(Xi, X);
        Xi.prototype.A = function() {
            var a = 65536;
            this.sk && (a &= -65537);
            S(this.b, [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
            this.b.j(a)
        }
        ;
        var Yi = function(a, b) {
            X.call(this, 1886614376, 0, 0);
            this.Ah = a;
            this.hb = b
        };
        q(Yi, X);
        Yi.prototype.A = function() {
            S(this.b, this.Ah.Vc());
            this.b.j(this.hb.length);
            S(this.b, this.hb)
        }
        ;
        var Zi = function(a) {
            X.call(this, 1836476516, 0, 0);
            this.Va = a
        };
        q(Zi, X);
        Zi.prototype.A = function() {
            this.b.j(0);
            this.b.j(0);
            this.b.j(this.Va);
            S(this.b, [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2])
        }
        ;
        var $i = function(a) {
            X.call(this, 1952868452, 0, 8);
            this.bk = a
        };
        q($i, X);
        $i.prototype.A = function() {
            this.b.j(1);
            this.b.j(this.bk)
        }
        ;
        var aj = function(a) {
            X.call(this, 1953658222, 0, 513);
            this.sh = a
        };
        q(aj, X);
        aj.prototype.A = function() {
            this.b.j(this.sh.length);
            this.b.j(0);
            for (var a = 0; a < this.sh.length; a++)
                this.b.j(this.sh[a].length)
        }
        ;
        var bj = function(a) {
            X.call(this, 1835427940, 0, 0);
            this.nc = a
        };
        q(bj, X);
        bj.prototype.A = function() {
            this.b.j(this.nc)
        }
        ;
        var cj = function(a) {
            W.call(this, 1835295092);
            this.Yh = a
        };
        q(cj, W);
        cj.prototype.A = function() {
            for (var a = 0; a < this.Yh.length; a++)
                S(this.b, this.Yh[a])
        }
        ;
        var ej = function(a) {
            var b = new Uint8Array(2 + a.length);
            b[1] = 1;
            Ha(a, b, 2);
            Yi.call(this, dj, b)
        };
        q(ej, Yi);
        var dj = new df([43, 248, 102, 128, 198, 229, 78, 36, 190, 35, 15, 129, 90, 96, 110, 178]);
        var gj = function(a) {
            var b = new Jh;
            (new Yi(ff,fj(a))).h(b);
            return Ih(b)
        }
            , fj = function(a) {
            var b = new Le;
            se(b, 1, 1);
            var c = lf(a.fe);
            J(b, 2).push(c);
            se(b, 3, a.Sk);
            for (var c = [], d = 0; d < a.Vh.length; d++)
                c.push(a.Vh.charCodeAt(d));
            a = new Uint8Array(c);
            se(b, 4, a);
            se(b, 9, 1667392371);
            return b.vh()
        }
            , hj = [71, 64, 1, 16, 0, 1, 176, 45, 255, 255, 193, 0, 0, 9, 34, 99, 101, 224, 16, 99, 98, 99, 115, 0, 1, 0, 0, 1, 0, 16, 1, 237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 143, 19, 198, 145, 164, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 71, 64, 17, 16, 127, 255, 255, 255, 0, 0, 0, 32, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 71, 64, 16, 48, 147, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 79, 16, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 1, 112, 213, 251, 214, 184, 46, 217, 62, 78, 249, 138, 228, 9, 49, 238, 51, 183];
        var ij = function(a, b, c) {
            this.Bk = a;
            this.sampleRate = b;
            this.$a = c;
            this.Ec = void 0
        }
            , jj = function(a, b, c, d) {
            this.width = a;
            this.height = b;
            this.Tc = c;
            this.ve = d
        }
            , kj = function(a, b, c, d, e, f) {
            this.kb = a;
            this.sc = b;
            this.Rj = c;
            this.lk = d;
            this.audio = e;
            this.video = f
        }
            , lj = function(a) {
            W.call(this, 1836019574);
            this.i = a
        };
        q(lj, W);
        lj.prototype.A = function() {
            (new Zi(this.i.sc)).h(this.b);
            var a = this.i.kb;
            a && a.Wd && (new Yi(a.systemId,a.Wd)).h(this.b);
            (new mj(this.i)).h(this.b);
            (new nj(this.i)).h(this.b)
        }
        ;
        var nj = function(a) {
            W.call(this, 1953653099);
            this.i = a
        };
        q(nj, W);
        nj.prototype.A = function() {
            var a = 0
                , b = 0
                , c = this.i.video;
            c && (a = c.width,
                b = c.height);
            (new Wi(a,b)).h(this.b);
            (new oj(this.i)).h(this.b)
        }
        ;
        var oj = function(a) {
            W.call(this, 1835297121);
            this.i = a
        };
        q(oj, W);
        oj.prototype.A = function() {
            (new Vi(this.i.sc)).h(this.b);
            (new Ui(this.i.lk)).h(this.b);
            (new pj(this.i)).h(this.b)
        }
        ;
        var pj = function(a) {
            W.call(this, 1835626086);
            this.i = a
        };
        q(pj, W);
        pj.prototype.A = function() {
            (new qj(this.i)).h(this.b)
        }
        ;
        var qj = function(a) {
            W.call(this, 1937007212);
            this.i = a
        };
        q(qj, W);
        qj.prototype.A = function() {
            (new rj(this.i)).h(this.b);
            this.i.video && (new Pi).h(this.b)
        }
        ;
        var rj = function(a) {
            X.call(this, 1937011556, 0, 0);
            this.i = a
        };
        q(rj, X);
        rj.prototype.A = function() {
            this.b.j(1);
            (this.i.video ? new sj(this.i) : new tj(this.i)).h(this.b)
        }
        ;
        var tj = function(a) {
            W.call(this, a.kb ? 1701733217 : 1836069985);
            this.i = a
        };
        q(tj, W);
        tj.prototype.A = function() {
            S(this.b, [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 16, 0, 0, 0, 0]);
            this.b.j(this.i.audio.sampleRate << 16);
            (new Ni(this.i.audio.Bk,this.i.audio.$a)).h(this.b);
            this.i.kb && (new uj(this.i)).h(this.b)
        }
        ;
        var sj = function(a) {
            W.call(this, a.kb ? 1701733238 : 1635148593);
            this.i = a
        };
        q(sj, W);
        sj.prototype.A = function() {
            S(this.b, [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            this.b.$c(this.i.video.width);
            this.b.$c(this.i.video.height);
            S(this.b, [0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
            (new Oi(this.i.video.Tc,this.i.video.ve)).h(this.b);
            this.i.kb && (new uj(this.i)).h(this.b)
        }
        ;
        var mj = function(a) {
            W.call(this, 1836475768);
            this.i = a
        };
        q(mj, W);
        mj.prototype.A = function() {
            (new Xi(!this.i.video)).h(this.b)
        }
        ;
        var uj = function(a) {
            W.call(this, 1936289382);
            this.i = a
        };
        q(uj, W);
        uj.prototype.A = function() {
            (new Ti(this.i.Rj)).h(this.b);
            (new Si(this.i.kb.scheme || 1667591779,0)).h(this.b);
            (new vj(this.i)).h(this.b)
        }
        ;
        var vj = function(a) {
            W.call(this, 1935894633);
            this.i = a
        };
        q(vj, W);
        vj.prototype.A = function() {
            var a = this.i.kb;
            a && a.he && (new Qi(a.wf,a.he,a.Sj)).h(this.b)
        }
        ;
        var wj = function(a, b, c, d, e) {
            lj.call(this, new kj(a,b,1836069985,1936684398,new ij(c,d,e),null))
        };
        q(wj, lj);
        var xj = function(a, b, c, d, e, f) {
            lj.call(this, new kj(a,b,1635148593,1986618469,null,new jj(c,d,e,f)))
        };
        q(xj, lj);
        var yj = function(a, b, c, d) {
            W.call(this, 1836019558);
            this.i = {
                Wk: a,
                Nj: b,
                Xk: c,
                rj: d
            }
        };
        q(yj, W);
        yj.prototype.A = function() {
            (new bj(0)).h(this.b);
            (new zj(this.i)).h(this.b)
        }
        ;
        var zj = function(a) {
            W.call(this, 1953653094);
            this.i = a
        };
        q(zj, W);
        zj.prototype.A = function() {
            this.i.rj && (new Ri(this.i.rj)).h(this.b);
            (new $i(this.i.Wk)).h(this.b);
            (new Li(this.i.Nj)).h(this.b);
            (new aj(this.i.Xk)).h(this.b)
        }
        ;
        var Aj = function(a, b, c) {
            W.call(this, 1836019558);
            this.Nd = b;
            this.Jk = a;
            this.Mf = c
        };
        q(Aj, W);
        Aj.prototype.A = function() {
            for (var a = di(T(this.Jk), void 0); 0 < a.length; ) {
                var b = a.shift();
                switch (b.getName()) {
                    case 1953653094:
                        (new Bj(b,this.Nd,this.Mf)).h(this.b);
                        break;
                    default:
                        b.h(this.b)
                }
            }
        }
        ;
        var Bj = function(a, b, c) {
            W.call(this, 1953653094);
            this.Nd = b;
            this.Kk = a;
            this.Mf = c
        };
        q(Bj, W);
        Bj.prototype.A = function() {
            for (var a = di(T(this.Kk), void 0), b = null, c = !1, d = !1; 0 < a.length; ) {
                var e = a.shift();
                switch (e.getName()) {
                    case 1970628964:
                        e instanceof Uh && (b = e);
                        break;
                    case 1952868452:
                        var f = e;
                        f.Yb & 32 && (this.Mf = !1);
                        Kh(T(f), 0, 1);
                        e.h(this.b);
                        break;
                    case 1953658222:
                        (new Cj(e,this.Mf)).h(this.b);
                        break;
                    case 1935763823:
                        c = !0;
                        e.h(this.b);
                        break;
                    case 1935763834:
                        d = !0;
                        e.h(this.b);
                        break;
                    default:
                        e.h(this.b)
                }
            }
            (new Li(this.Nd)).h(this.b);
            b && (d || (new Mi(b.Sg ? 0 : 8,b.If)).h(this.b),
            c || (new Ki(0)).h(this.b))
        }
        ;
        var Cj = function(a, b) {
            var c = a.Yb
                , d = !1
                , e = null;
            c & 1 || (d = !0,
                c |= 1);
            !b || c & 1024 || c & 4 || (c |= 4,
                e = 0);
            b = d;
            X.call(this, 1953658222, a.Da, c);
            this.al = b;
            this.ei = e;
            this.Lk = a
        };
        q(Cj, X);
        Cj.prototype.A = function() {
            var a = new Gh(T(this.Lk));
            this.b.j(Q(a));
            this.al && this.b.j(0);
            null === this.ei || this.b.j(this.ei);
            S(this.b, a.buffer.subarray(a.offset))
        }
        ;
        var Dj = function(a, b, c) {
            Bh.call(this, a);
            this.mf = new Ei(b);
            this.yg = c
        };
        q(Dj, Bh);
        Dj.prototype.nh = function() {
            throw Error("readAudioHeader is not implemented");
        }
        ;
        var Ej = function(a, b, c, d, e, f, g) {
            this.Mh = a;
            this.af = c;
            this.Ta = d;
            this.Mi = f;
            this.yg = g;
            this.Sd = [];
            this.sampleRate = 0;
            this.rh = e;
            this.Od = new Uint8Array([0, 0])
        };
        Ej.prototype.parse = function(a) {
            for (var b = this.sg(this.af), c = [], d = null; b.offset < b.buffer.length; ) {
                var e = b.mf.append(a, b.buffer, b.offset);
                b.offset += e;
                if (!e)
                    if (d = b.nh())
                        c.push(Fh(b, d.fi)),
                            a += this.rh / d.sampleRate;
                    else
                        return ec(Fj, "Neither ID3 nor ADTS header was found at " + b.buffer.subarray(b.offset).byteOffset),
                            !1
            }
            if (null === d)
                return ec(Fj, "No ADTS header was found."),
                    !1;
            b = Nh(d.profile, d.sampleRate, d.Pi);
            if (null === b)
                return ec(Fj, "Cannot generate audio codec private data."),
                    !1;
            this.Sd = c;
            this.sampleRate = d.sampleRate;
            this.Od = b;
            return !0
        }
        ;
        Ej.prototype.sg = function() {
            throw Error("createdataReader is not implemented");
        }
        ;
        Ej.prototype.ji = function() {
            return this.Ta
        }
        ;
        Ej.prototype.Ud = function() {
            throw Error("getTimeScale is not implemented");
        }
        ;
        var Fj = A("cast.player.hls.PackedAudioParser");
        var Gj = function(a, b) {
            Dj.call(this, a, b)
        };
        q(Gj, Dj);
        Gj.prototype.nh = function() {
            var a = this.buffer.subarray(this.offset);
            if (255 != a[0] || 240 != (a[1] & 240))
                return null;
            var b = ((a[3] & 3) << 11) + (a[4] << 3) + ((a[5] & 224) >> 5)
                , c = a[2] >> 2 & 15
                , d = a[1] & 1 ? 7 : 9;
            this.offset += d;
            return {
                profile: (a[2] >> 6 & 3) + 1,
                sampleRate: Lh[c],
                Pi: (a[2] << 2 & 4) + (a[3] >> 6 & 3),
                fi: b - d
            }
        }
        ;
        var Hj = function(a, b, c, d, e) {
            a = a.match("mp4a.67") ? 103 : 64;
            Ej.call(this, a, 0, b, c, 1024, d, e)
        };
        q(Hj, Ej);
        Hj.prototype.sg = function(a) {
            return new Gj(a,this.Mi)
        }
        ;
        Hj.prototype.Ud = function() {
            return 1E6
        }
        ;
        var Ij = [48E3, 44100, 32E3]
            , Jj = [[64, 69, 96], [64, 70, 96], [80, 87, 120], [80, 88, 120], [96, 104, 144], [96, 105, 144], [112, 121, 168], [112, 122, 168], [128, 139, 192], [128, 140, 192], [160, 174, 240], [160, 175, 240], [192, 208, 288], [192, 209, 288], [224, 243, 336], [224, 244, 336], [256, 278, 384], [256, 279, 384], [320, 348, 480], [320, 349, 480], [384, 417, 576], [384, 418, 576], [448, 487, 672], [448, 488, 672], [512, 557, 768], [512, 558, 768], [640, 696, 960], [640, 697, 960], [768, 835, 1152], [768, 836, 1152], [896, 975, 1344], [896, 976, 1344], [1024, 1114, 1536], [1024, 1115, 1536], [1152, 1253, 1728], [1152, 1254, 1728], [1280, 1393, 1920], [1280, 1394, 1920]]
            , Kj = function(a, b, c) {
            Dj.call(this, a, b, c)
        };
        q(Kj, Dj);
        Kj.prototype.nh = function() {
            var a = this.buffer.subarray(this.offset)
                , b = 0;
            if (11 != a[b++] || 119 != a[b++])
                return null;
            var b = b + 2
                , c = a[b++]
                , b = c >> 6 & 3
                , c = Jj[c & 63];
            return t(c) ? {
                profile: (a[2] >> 6 & 3) + 1,
                sampleRate: Ij[b],
                Pi: 6,
                fi: 2 * c[b]
            } : (this.yg(316),
                null)
        }
        ;
        var Lj = function(a, b, c, d, e) {
            Ej.call(this, 165, 0, b, c, 1536, d, e)
        };
        q(Lj, Ej);
        Lj.prototype.sg = function(a) {
            return new Kj(a,this.Mi,this.yg)
        }
        ;
        Lj.prototype.Ud = function() {
            return this.sampleRate
        }
        ;
        var Mj = function(a, b) {
            this.a = a;
            this.Og = !1;
            this.ng = b;
            this.eh = this.Gk.bind(this);
            this.ah = this.sd.bind(this)
        };
        Mj.prototype.cancel = function() {
            this.Og = !0
        }
        ;
        Mj.prototype.sd = function(a) {
            if (!this.Og) {
                var b = void 0;
                a && a.name && a.message && (b = a.name + ": " + a.message);
                this.a.R(203, void 0, b)
            }
        }
        ;
        Mj.prototype.Gk = function(a) {
            this.Og || this.ng(a)
        }
        ;
        var Nj = function(a, b, c, d, e) {
            Mj.call(this, a, b);
            window.crypto.subtle.decrypt({
                name: "AES-CBC",
                iv: d
            }, c, e).then(this.eh, this.ah)
        };
        q(Nj, Mj);
        var Oj = function(a, b, c) {
            Mj.call(this, a, b);
            window.crypto.subtle.importKey("raw", c, {
                name: "AES-CBC"
            }, !0, ["decrypt"]).then(this.eh, this.ah)
        };
        q(Oj, Mj);
        var Pj = function(a) {
            this.Pa = -1;
            this.F = null;
            this.yk = this.xk.bind(this);
            this.Mk = a
        };
        Pj.prototype.xk = function(a, b) {
            for (var c = 0, d = null, e = 0; e < b.length; e++)
                if (null !== b[e].Df) {
                    c = e;
                    d = b[e].Df;
                    break
                }
            if (null === d)
                return null;
            b = -1;
            for (var e = Infinity, f = 0; f < a.length; f++) {
                var g = Math.abs(a[f].Df - d);
                if (100 > g)
                    return f - c;
                g < e && (b = f,
                    e = g)
            }
            return 0 > b || e > 500 * this.F.Pf ? -1 : b - c
        }
        ;
        var Qj = function(a, b) {
            b = b[0].uh;
            for (var c = 0; c < a.length; c++)
                if (a[c].uh == b)
                    return c;
            return null
        };
        h = Pj.prototype;
        h.update = function(a) {
            if (0 > this.Pa)
                this.F = a;
            else if (0 == a.c.length)
                C(Rj, "new manifest has no segment");
            else {
                var b = this.F.c
                    , c = b[this.Pa]
                    , d = a.c
                    , e = {
                    ld: Qj,
                    Ii: "sequence number"
                }
                    , f = {
                    ld: this.yk,
                    Ii: "program date time"
                };
                a: {
                    e = m(this.F.Hg && a.Hg ? this.Mk ? [e, f] : [f, e] : [e]);
                    for (f = e.next(); !f.done; f = e.next()) {
                        var f = f.value, g;
                        b: {
                            g = this.Pa;
                            var k = f.ld
                                , l = k(b, d);
                            if (null === l) {
                                l = k(d, b);
                                if (null === l) {
                                    g = -1;
                                    break b
                                }
                                l *= -1
                            }
                            k = g - l;
                            g < l ? (g = b[g],
                            0 < d.length && (d[0].bf = !0),
                                d.splice(0, 0, g),
                                k = 0) : k >= d.length && (d.length = 0,
                                    Array.prototype.push.apply(d, b),
                                    k = g);
                            g = k
                        }
                        if (0 > g)
                            C(Rj, "No match was found using " + f.Ii);
                        else {
                            b = g;
                            break a
                        }
                    }
                    b = -1
                }
                0 > b && (C(Rj, "New segments are appended after current"),
                0 < d.length && (d[0].bf = !0),
                    d.splice(0, 0, c),
                    b = 0);
                c = c.Fa - d[b].Fa;
                d = m(d);
                for (e = d.next(); !e.done; e = d.next())
                    e.value.Fa += c;
                this.Pa = b;
                this.F = a
            }
        }
        ;
        h.next = function() {
            var a = this.Pa + 1;
            return a < this.F.c.length ? (this.Pa = a,
                !0) : !1
        }
        ;
        h.ub = function() {
            return !this.F.Z && this.Pa == this.F.c.length - 1
        }
        ;
        h.wa = function() {
            var a = this.F.c
                , b = a[0].Fa
                , c = a.length - 1
                , a = a[c].Fa + a[c].duration;
            this.F.Z && (a -= 3 * this.F.Pf,
            a < b && (a = b));
            return {
                start: b,
                end: a
            }
        }
        ;
        h.seek = function(a) {
            var b = this.wa();
            if (!b)
                return null;
            for (var c = this.F.c, d = m(c), e = d.next(); !e.done; e = d.next())
                e.value.T = !1;
            a < b.start && (a = b.start);
            a > b.end && (a = b.end);
            for (b = c.length - 1; 0 <= b; b--)
                if (a >= c[b].Fa)
                    return this.Pa = b,
                        c[this.Pa].T = !0,
                        a;
            return null
        }
        ;
        var Sj = function(a) {
            return 0 > a.Pa ? null : a.F.c[a.Pa]
        }
            , Rj = A("cast.player.hls.Iterator");
        var Tj = function(a, b, c, d) {
            Mj.call(this, a, b);
            cast.__platform__.crypto.unwrapKey("raw", c, d, {
                name: "RSA-OAEP",
                hash: {
                    name: "SHA-256"
                }
            }, {
                name: "AES-CBC",
                length: 128
            }, !1, ["decrypt"]).then(this.eh, this.ah)
        };
        q(Tj, Mj);
        var Uj = function(a, b, c) {
            B.call(this);
            this.a = a;
            this.Ie = c;
            this.Ej = b;
            this.ra = null;
            this.vb = new Pj(1 == this.a.preferSequenceNumberForPlaylistMatching);
            this.Yi = this.Ek.bind(this);
            this.ai = this.Zj.bind(this);
            this.th = this.Gf = null;
            this.nj = -1;
            this.re = null;
            this.f = new H;
            this.f.lc = "arraybuffer";
            E(this.f, "success", this.Dk, !1, this);
            E(this.f, "error", this.Ui, !1, this);
            E(this.f, "timeout", this.Ui, !1, this);
            this.u = new Qe;
            this.u.setResponse = this.ki.bind(this);
            this.ge = this.we = this.Ai = this.xb = this.Pd = this.Eh = null;
            this.Yg = !1;
            this.Jd = !0;
            this.ea = null;
            this.Lj = {};
            this.Ca = this.bc = null
        };
        q(Uj, B);
        h = Uj.prototype;
        h.G = function() {
            this.reset();
            this.f.M()
        }
        ;
        h.reset = function() {
            this.Jd = !0;
            this.bc = this.ea = this.re = null;
            this.f.abort();
            this.we && (this.we.cancel(),
                this.we = null);
            this.Pd && (this.Pd.cancel(),
                this.Pd = null);
            null === this.Ca || clearTimeout(this.Ca)
        }
        ;
        h.Ek = function(a) {
            this.we = null;
            this.ge = a;
            this.Ca = setTimeout(this.ai, 0)
        }
        ;
        h.Dk = function(a) {
            this.ki(Ld(a.target))
        }
        ;
        h.ki = function(a) {
            a ? (a = new Uint8Array(a),
            this.a.processLicense && (a = this.a.processLicense(a)),
                this.we = this.a.Jg ? new Tj(this.a,this.Yi,a,this.Eh) : new Oj(this.a,this.Yi,a)) : this.a.R(313)
        }
        ;
        h.Ui = function() {
            this.a.R(314, new Re(this.u.url,this.f.yb,Jd(this.f),this.f.getAllResponseHeaders(),Ld(this.f)))
        }
        ;
        h.Zj = function() {
            var a = this.re.info
                , b = this.re.data;
            a && a.Ec && this.ge && b && (D(Vj, "decrypt segment"),
                this.Pd = new Nj(this.a,this.Pk.bind(this, a),this.ge,a.Ec,b),
                this.Ca = this.re = null)
        }
        ;
        h.Pk = function(a, b) {
            this.xe(a, new Uint8Array(b))
        }
        ;
        h.xe = function(a, b) {
            D(Vj, "process segment");
            this.Pd = null;
            var c;
            switch (this.Ie) {
                case 2:
                case 1:
                    b = new (2 == this.Ie ? Lj : Hj)(this.ra.Oa.codecs,b,a.Fa,this.a.processMetadata,this.a.R.bind(this.a));
                    var d = a.bf || a.T;
                    c = this.Lj;
                    var e = a.Yc || void 0
                        , f = a.Ec || void 0
                        , g = c.endOfLastSegment
                        , g = d || !t(g) ? b.Ta : g;
                    if (b.parse(g)) {
                        b.Ta = g;
                        c.endOfLastSegment = g + b.rh / b.sampleRate * b.Sd.length;
                        c = new Jh(2 * b.af.length);
                        d && (d = null,
                        e && (d = {
                            systemId: ff,
                            url: null,
                            Wd: fj(e),
                            he: new df(lf(e.fe),!1),
                            Sj: f,
                            wf: f ? f.length : 16,
                            scheme: 1667392371
                        }),
                            D(Fj, "Built AudioMoov with objectType(0x" + b.Mh.toString(16) + ") and sampleRate(" + b.sampleRate + ")"),
                            (new wj(d,b.Ud(),b.Mh,b.sampleRate,b.Od)).h(c));
                        f = g * b.Ud();
                        d = b.rh / b.sampleRate * b.Ud();
                        g = b.Sd;
                        if (e) {
                            for (var e = b.Sd, k = [], l = 0; l < e.length; l++) {
                                var n = e[l].length;
                                if (0 == n % 16)
                                    k.push({
                                        zj: [{
                                            kg: 16,
                                            lg: n - 16
                                        }]
                                    });
                                else {
                                    var p = n % 16;
                                    k.push({
                                        zj: [{
                                            kg: 16,
                                            lg: n - 16 - p
                                        }, {
                                            kg: p,
                                            lg: 0
                                        }]
                                    })
                                }
                            }
                            e = k
                        } else
                            e = void 0;
                        (new yj(d,f,g,e)).h(c);
                        (new cj(b.Sd)).h(c);
                        c = Ih(c);
                        bi(c)
                    } else
                        c = null;
                    e = c;
                    if (!e) {
                        this.a.R(315);
                        return
                    }
                    c = b;
                    b = e;
                    break;
                case 4:
                    break;
                default:
                    c = new Ii(b,this.a.processMetadata,a.Fa)
            }
            if (a.bf || a.T)
                this.ea = null,
                    a.T = !1;
            a = {
                time: a.Fa,
                duration: a.duration
            };
            e = c ? c.ji() : a.time;
            if (c = null === this.ea && Infinity != e)
                D(Vj, "start: " + e),
                    this.ea = 4 == this.Ie ? 0 : e,
                    this.bc = a,
                this.Ej && (f = this.Ej,
                f.Y && f.Y.T(e, a));
            e = this.th;
            this.th = null;
            Vg(e, b, a, this.ea || 0, c)
        }
        ;
        var Xj = function(a) {
            a.a.Jg && !a.Eh ? cast.__platform__.cryptokeys.getKeyByName("CKP").then(function(b) {
                a.Eh = b;
                Wj(a)
            }) : Wj(a)
        }
            , Wj = function(a) {
            a.ge = null;
            a.u.url = a.xb;
            a.u.skipRequest = !1;
            if (a.a.updateLicenseRequestInfo && (a.a.updateLicenseRequestInfo(a.u),
                    a.u.skipRequest))
                return;
            a.f.Ld = a.u.withCredentials;
            a.f.Nb = Math.max(0, a.u.timeoutInterval);
            a.f.send(a.u.url, void 0, void 0, a.u.headers)
        };
        h = Uj.prototype;
        h.processSegment = function(a, b, c) {
            this.th = c;
            this.re = {
                data: b,
                info: a
            };
            (c = a.Di) ? this.xb != c || null === this.ge ? (this.xb = c,
                Xj(this)) : this.Ca = setTimeout(this.ai, 0) : this.xe(a, b)
        }
        ;
        h.updateSegmentRequestInfo = function(a) {
            var b = Sj(this.vb);
            if (b) {
                a.kc = b;
                this.Jd && (b.T = !0,
                    this.Jd = !1);
                var c = b.Ph;
                c && (a.headers = {},
                    a.headers.Range = "bytes=" + c.start + "-" + c.end);
                a.url = b.url;
                a.interval = this.getSegmentInterval()
            }
        }
        ;
        h.getSegmentInterval = function() {
            var a = Sj(this.vb);
            return a ? {
                time: a.Fa,
                duration: a.duration
            } : {
                time: 0,
                duration: 0
            }
        }
        ;
        h.wa = function() {
            return this.vb.wa()
        }
        ;
        h.ub = function() {
            return this.vb.ub()
        }
        ;
        var Yj = function(a) {
            var b = Sj(a.vb);
            b.Yc && b.Yc.fe != a.Ai && 0 == a.Ie && (a.Yg = !0)
        };
        Uj.prototype.dc = function() {
            var a = this.vb.next();
            a && Yj(this);
            return a
        }
        ;
        Uj.prototype.seek = function(a) {
            a = this.vb.seek(a);
            w(a) && Yj(this);
            return a
        }
        ;
        Uj.prototype.oe = function() {
            Zj(this, this.ra.pa)
        }
        ;
        var Zj = function(a, b) {
            a.vb.update(b);
            a.Gf && (bh(a.Gf),
                a.Gf = null)
        };
        h = Uj.prototype;
        h.Kf = function(a, b, c) {
            this.nj = a;
            this.Gf = b;
            this.Jd = !0;
            this.ra && this.ra.pa && this.ra.pa.Z && this.ra.Pb();
            this.ra = c;
            c.pa ? Zj(this, c.pa) : c.load()
        }
        ;
        h.getQualityLevel = function() {
            return this.nj
        }
        ;
        h.T = function(a, b) {
            this.Jd = !0;
            this.ea = a;
            this.bc = b
        }
        ;
        h.Td = function() {
            var a = Sj(this.vb);
            if (!a.Yc || !a.Ec)
                return null;
            this.Yg = !1;
            this.Ai = a.Yc.fe;
            var b = a.Yc
                , a = a.Ec
                , c = mf("hls-sample-aes-init-segment")
                , c = c ? {
                mj: c.pssh_offset,
                zi: c.key_id_offset,
                yi: c.iv_offset,
                Aj: Ha(window.atob(c.template))
            } : {
                mj: 196,
                zi: 530,
                yi: 548,
                Aj: new Uint8Array(hj)
            }
                , d = c.Aj;
            d.set(gj(b), c.mj);
            d.set(lf(b.fe), c.zi);
            d.set(a, c.yi);
            return d
        }
        ;
        h.rd = function() {
            return this.Yg
        }
        ;
        var Vj = A("cast.player.hls.Adaptation")
            , ak = function(a) {
            Uj.call(this, a, null, 3)
        };
        q(ak, Uj);
        ak.prototype.dc = function() {
            return null === this.ea || null === this.bc ? !1 : Uj.prototype.dc.call(this)
        }
        ;
        ak.prototype.seek = function(a) {
            return null === this.ea || null === this.bc ? null : Uj.prototype.seek.call(this, a)
        }
        ;
        ak.prototype.processSegment = function(a, b, c) {
            var d = {
                time: a.Fa,
                duration: a.duration
            }
                , e = !1;
            if (null === this.ea || null === this.bc)
                b = new Uint8Array(0);
            else if (this.Jd || a.T)
                d = this.bc,
                    e = !0;
            Vg(c, b, d, this.ea || 0, e)
        }
        ;
        var bk = function(a, b) {
            this.Oj = new I(a);
            this.ga = b;
            this.g = 0;
            this.ee = this.Re = this.xb = this.qc = this.mb = null;
            this.zg = this.nc = 0;
            this.vg = !1;
            this.yd = null;
            this.ni = this.mi = !1;
            this.F = {
                vi: !1,
                Z: !0,
                Ef: "none",
                Hg: !1,
                Pf: 0,
                Ch: 0,
                c: [],
                Hd: [],
                Li: []
            }
        };
        bk.prototype.parse = function(a) {
            a = m(a.split("\n"));
            for (var b = a.next(); !b.done; b = a.next())
                if (!ck(this, b.value))
                    return C(dk, "failed to parse HLS playlist"),
                        this.F = null;
            if (this.mi && this.ni)
                for (a = 0; a < this.F.Hd.length; )
                    b = this.F.Hd[a].codecs,
                        ek(this.F.Hd[a].mimeType, b) ? (C(dk, "filtered out " + b + " stream"),
                            this.F.Hd.splice(a, 1)) : a++;
            return this.F
        }
        ;
        var ek = function(a, b) {
            return 0 <= a.indexOf("audio") || 0 > b.indexOf(",") && (0 == b.indexOf("mp4a.") || "ac-3" == b) ? !0 : !1
        }
            , fk = function(a, b) {
            var c = new I(b);
            c.Fb || (b = a.Oj.resolve(c).toString());
            return b
        }
            , ck = function(a, b) {
            b = b.trim();
            if (!b)
                return !0;
            if ("#" != b[0]) {
                if (3 != a.g && 4 != a.g)
                    gk(a, "URI"),
                        a = !1;
                else {
                    b = fk(a, b);
                    if (3 == a.g) {
                        a.mb.Df = a.yd;
                        null !== a.yd && (a.yd += 1E3 * a.mb.duration);
                        if (a.xb || a.Re) {
                            a.mb.Di = a.xb;
                            a.mb.Yc = a.Re;
                            var c = a.mb, d;
                            if (a.ee) {
                                d = a.ee;
                                for (var e = new Uint8Array(16), f = 15, g = d.length; 0 < g; g -= 2,
                                    f--)
                                    e[f] = parseInt(1 < g ? d.substr(g - 2, 2) : d.substr(0, 1), 16)
                            } else
                                for (d = a.mb.uh,
                                         e = new Uint8Array(16),
                                         f = 15; 0 <= f; f--)
                                    e[f] = d & 255,
                                        d >>= 8;
                            d = e;
                            c.Ec = d
                        }
                        a.mb.url = b;
                        a.F.c.push(a.mb)
                    } else
                        a.qc.url = b,
                            a.F.Hd.push(a.qc);
                    a.g = 2;
                    a = !0
                }
                return a
            }
            c = "#EXTINF:";
            if (0 == b.indexOf(c))
                return d = b.indexOf(","),
                    b = b.substr(c.length, (0 <= d ? d : b.length) - c.length),
                    2 != a.g && 1 != a.g ? (gk(a, "EXTINF"),
                        a = !1) : (b = parseFloat(b),
                        a.mb = {
                            uh: a.nc,
                            url: "",
                            Ph: null,
                            Fa: a.zg,
                            duration: b,
                            bf: a.vg,
                            Df: a.yd,
                            Di: null,
                            Yc: null,
                            Ec: null,
                            T: !1
                        },
                        a.F.Ch += b,
                        a.zg += b,
                        a.vg = !1,
                        a.nc += 1,
                        a.g = 3,
                        a = !0),
                    a;
            c = "#EXT-X-KEY:";
            if (0 == b.indexOf(c))
                return hk(a, b.substr(c.length));
            if (0 == b.indexOf("#EXT-X-DISCONTINUITY-SEQUENCE"))
                return 1 != a.g ? (gk(a, "EXT-X-DISCONTINUITY-SEQUENCE"),
                    a = !1) : a = !0,
                    a;
            if (0 == b.indexOf("#EXT-X-DISCONTINUITY"))
                return 2 != a.g && 1 != a.g ? (gk(a, "EXT-X-DISCONTINUITY"),
                    a = !1) : (a.vg = !0,
                    a.g = 2,
                    a = !0),
                    a;
            c = "#EXT-X-PROGRAM-DATE-TIME:";
            if (0 == b.indexOf(c))
                return b = b.substr(c.length),
                    2 != a.g && 3 != a.g && 1 != a.g ? (gk(a, "EXT-X-PROGRAM-DATE-TIME"),
                        a = !1) : (c = Date.parse(b),
                        isNaN(c) ? (C(dk, "cannot parse #EXT-X-PROGRAM-DATE-TIME: " + b),
                            a = !1) : (a.yd = c,
                            a = a.F.Hg = !0)),
                    a;
            c = "#EXT-X-BYTERANGE:";
            if (0 == b.indexOf(c))
                return b = b.substr(c.length),
                    3 != a.g ? (gk(a, "EXT-X-BYTERANGE"),
                        a = !1) : (b = b.split("@"),
                        c = parseInt(b[1], 10),
                        a.mb.Ph = {
                            start: c,
                            end: c + parseInt(b[0], 10) - 1
                        },
                        a = !0),
                    a;
            if (0 == b.indexOf("#EXTM3U"))
                return 0 != a.g ? (gk(a, "EXTM3U"),
                    a = !1) : (a.g = 1,
                    a = !0),
                    a;
            if (0 == b.indexOf("#EXT-X-ENDLIST"))
                return 2 != a.g && 1 != a.g ? (gk(a, "EXT-X-ENDLIST"),
                    a = !1) : (a.F.Z = !1,
                    a = !0),
                    a;
            c = "#EXT-X-STREAM-INF:";
            if (0 == b.indexOf(c))
                return d = b.substr(c.length),
                    1 != a.g && 2 != a.g ? (gk(a, "EXT-X-STREAM-INF"),
                        a = !1) : (e = d.match("BANDWIDTH=([0-9]+)")) ? (b = parseInt(e[1], 10),
                        c = "video/mp2t",
                        (e = d.match('CODECS="([^"]*)"')) ? (d = e[1],
                            ek(c, d) ? (a.mi = !0,
                                e = a.ga,
                                1 == e || 2 == e ? c = "audio/mp4" : 4 == e && (c = "audio/mpeg",
                                        d = "")) : a.ni = !0) : d = "avc1.4D401E,mp4a.40.2",
                        a.qc = {
                            name: null,
                            url: "",
                            ja: b,
                            mimeType: c,
                            codecs: d,
                            Pg: !0,
                            language: null
                        },
                        a.F.vi = !0,
                        a.g = 4,
                        a = !0) : (C(dk, "no BANDWIDTH attribute"),
                        a = !1),
                    a;
            c = "#EXT-X-TARGETDURATION:";
            if (0 == b.indexOf(c))
                return b = b.substr(c.length),
                    1 != a.g ? (gk(a, "EXT-X-TARGETDURATION"),
                        a = !1) : (a.F.Pf = parseInt(b, 10),
                        a = !0),
                    a;
            c = "#EXT-X-MEDIA-SEQUENCE:";
            if (0 == b.indexOf(c))
                return b = b.substr(c.length),
                    1 != a.g ? (gk(a, "EXT-X-MEDIA-SEQUENCE"),
                        a = !1) : (a.nc = parseInt(b, 10),
                        a = !0),
                    a;
            c = "#EXT-X-MEDIA:";
            return 0 == b.indexOf(c) ? ik(a, b.substr(c.length)) : !0
        }
            , gk = function(a, b) {
            C(dk, "unexpected " + b + ": state " + a.g)
        }
            , ik = function(a, b) {
            if (2 != a.g && 1 != a.g)
                return gk(a, "EXT-X-MEDIA"),
                    !1;
            var c, d, e = null, f = null, g = null, k = !1, l = b.match("TYPE=(AUDIO|VIDEO|SUBTITLES|CLOSED-CAPTIONS)");
            if (null === l)
                return !0;
            switch (l[1]) {
                case "SUBTITLES":
                    c = "webvtt";
                    d = "text/vtt";
                    break;
                case "AUDIO":
                    c = nf(a.ga);
                    d = "audio/mp4";
                    break;
                default:
                    return !0
            }
            l = b.match('URI="([^"]*)"');
            null === l || (e = fk(a, l[1]));
            l = b.match('LANGUAGE="([^"]*)"');
            null === l || (f = l[1]);
            l = b.match('NAME="([^"]*)"');
            null === l || (g = l[1]);
            l = b.match('DEFAULT="?(YES|NO)"?');
            null === l || (k = "YES" == l[1]);
            e && a.F.Li.push({
                name: g,
                url: e,
                ja: 0,
                mimeType: d,
                codecs: c,
                Pg: k,
                language: f
            });
            return !0
        }
            , hk = function(a, b) {
            if (2 != a.g && 3 != a.g && 1 != a.g)
                return gk(a, "EXT-X-KEY"),
                    !1;
            var c;
            if (0 <= b.indexOf("METHOD=AES-128")) {
                if (c = b.match('URI="([^"]*)"'))
                    a.xb = fk(a, c[1]);
                c = b.match("IV=0[x|X]([0-9a-fA-F]+)");
                a.ee = c ? c[1] : null;
                a.Re = null;
                a.F.Ef = "aes_128";
                return !0
            }
            if (0 <= b.indexOf("METHOD=SAMPLE-AES")) {
                c = b.match('KEYFORMAT="([^"]*)"');
                if (!c)
                    return C(dk, "Missing KEYFORMAT for SAMPLE-AES"),
                        !0;
                c = c[1];
                if ("com.widevine" != c)
                    return C(dk, "KEYFORMAT " + c + " is not supported for SAMPLE-AES"),
                        !0;
                if (1 != mf("enable-hls-sample-aes"))
                    return C(dk, "SAMPLE-AES not support by Cast platform"),
                        !1;
                if (c = b.match('URI="data:.*?,(.*?)"')) {
                    var d;
                    try {
                        d = JSON.parse(window.atob(c[1]))
                    } catch (e) {
                        return !1
                    }
                    c = d.key_ids;
                    if (!c || !Array.isArray(c) || 0 == c.length)
                        return C(dk, "no Widevine key ID"),
                            !1;
                    a.Re = {
                        Sk: d.provider,
                        Vh: d.content_id,
                        fe: c[0]
                    }
                }
                c = b.match("IV=0[x|X]([0-9a-fA-F]+)");
                a.ee = c ? c[1] : null;
                a.xb = null;
                a.F.Ef = "widevine";
                return !0
            }
            if (0 <= b.indexOf("METHOD=NONE"))
                return a.xb = null,
                    a.Re = null,
                    a.ee = null,
                    !0;
            C(dk, "unsupported KEY");
            return !1
        }
            , dk = A("cast.player.hls.Parser");
        var jk = function(a, b, c, d) {
            B.call(this);
            this.a = a;
            this.te = b;
            this.zb = new rh(this);
            this.fa = null;
            this.kl = this.Wf.bind(this);
            this.Oa = c;
            this.duration = -1;
            this.pa = null;
            this.ga = d
        };
        q(jk, B);
        h = jk.prototype;
        h.G = function() {
            this.zb.M();
            null !== this.fa && (clearTimeout(this.fa),
                this.fa = null);
            B.prototype.G.call(this)
        }
        ;
        h.load = function() {
            this.Wf()
        }
        ;
        h.Pb = function() {
            this.duration = -1;
            this.pa = null;
            this.zb.abort();
            null !== this.fa && (clearTimeout(this.fa),
                this.fa = null)
        }
        ;
        h.Wf = function() {
            D(kk, "update: " + this.Oa.url);
            this.zb.od(this.a, this.Oa.url)
        }
        ;
        h.ic = function(a) {
            a ? (this.pa = (new bk(this.Oa.url,this.ga)).parse(a)) ? (this.pa.Z ? (a = 1E3 * this.pa.Pf,
                this.fa = setTimeout(this.kl, a),
                D(kk, "update in: " + a)) : this.duration = this.pa.Ch,
                this.te.oe(this)) : this.a.R(412) : this.a.R(312, ph(this.zb))
        }
        ;
        var kk = A("cast.player.hls.Playlist");
        var lk = function(a, b, c, d) {
            B.call(this);
            this.a = a;
            this.zb = new rh(this);
            this.ke = b;
            this.te = c;
            this.ga = d;
            this.rc = [];
            this.Bb = []
        };
        q(lk, B);
        lk.prototype.G = function() {
            this.zb.M();
            for (var a = m(this.Bb), b = a.next(); !b.done; b = a.next())
                b.value.M();
            this.Bb.length = 0;
            a = m(this.rc);
            for (b = a.next(); !b.done; b = a.next())
                b.value.M();
            this.rc.length = 0;
            B.prototype.G.call(this)
        }
        ;
        lk.prototype.load = function() {
            this.zb.od(this.a, this.a.url)
        }
        ;
        lk.prototype.ic = function(a) {
            if (a) {
                var b = this.zb.Wc;
                if (b)
                    if (a = (new bk(b,this.ga)).parse(a)) {
                        if (a.vi)
                            for (var b = m(a.Hd), c = b.next(); !c.done; c = b.next())
                                c = new jk(this.a,this.te,c.value,this.ga),
                                    this.rc.push(c);
                        else {
                            var d;
                            switch (this.ga) {
                                case 1:
                                    c = "mp4a.40.2";
                                    d = "audio/mp4";
                                    break;
                                case 2:
                                    c = "ac-3";
                                    d = "audio/mp4";
                                    break;
                                case 4:
                                    c = "";
                                    d = "audio/mpeg";
                                    break;
                                default:
                                    c = "avc1.4D401E,mp4a.40.2",
                                        d = "video/mp2t"
                            }
                            b = new jk(this.a,this.te,{
                                name: null,
                                url: b,
                                ja: 0,
                                mimeType: d,
                                codecs: c,
                                Pg: !0,
                                language: null
                            },this.ga);
                            this.rc.push(b)
                        }
                        a = m(a.Li);
                        for (b = a.next(); !b.done; b = a.next())
                            b = b.value,
                                c = 0,
                                d = this.ga,
                            $e(b.mimeType) && t(d) && (c = d,
                            0 == d && (b.mimeType = "video/mp2t")),
                                b = new jk(this.a,this.te,b,c),
                                this.Bb.push(b);
                        this.ke.onManifestReady()
                    } else
                        this.a.R(411)
            } else
                this.a.R(311, ph(this.zb))
        }
        ;
        var Y = function(a, b) {
            this.a = a;
            this.ga = b;
            this.qa = this.$e = this.Ki = this.ke = null;
            this.fc = new Uj(a,this,0);
            this.Y = this.na = null;
            this.ti = void 0
        };
        Y.prototype.load = function(a) {
            this.$e = this.Ki = this.ke = a;
            this.qa = new lk(this.a,this,this,this.ga);
            this.qa.load()
        }
        ;
        Y.prototype.Pb = function() {
            this.fc.M();
            this.na && (this.na.M(),
                this.na = null);
            this.Y && (this.Y.M(),
                this.Y = null);
            this.qa && (this.qa.M(),
                this.qa = null)
        }
        ;
        Y.prototype.onManifestReady = function() {
            for (var a = this.qa.Bb, b = -1, c = 0; c < a.length; c++) {
                var d = a[c].Oa;
                if (of(d.codecs) && d.Pg)
                    if ("mp4a.a5" == d.codecs) {
                        b = c;
                        break
                    } else
                        -1 == b && (b = c)
            }
            a = b;
            -1 < a && this.enableStream(a + 1, !0);
            a = !0;
            b = m(this.qa.rc);
            for (c = b.next(); !c.done; c = b.next())
                c = c.value,
                ek(c.Oa.mimeType, c.Oa.codecs) || (a = !1);
            a && t(this.ga) && (this.fc.Ie = this.ga);
            if (this.a.onManifestReady)
                this.a.onManifestReady();
            this.ke.onManifestReady();
            this.ke = null
        }
        ;
        Y.prototype.getStreamCount = function() {
            return this.qa.Bb.length + 1
        }
        ;
        Y.prototype.getStreamCount = Y.prototype.getStreamCount;
        Y.prototype.enableStream = function(a, b) {
            if (0 < a) {
                a = this.qa.Bb[a - 1];
                var c = a.Oa.mimeType;
                $e(c) || of(a.Oa.codecs) ? (this.na && (this.na.M(),
                    this.na = null),
                b && hf("audio/mp4", nf(this.ga)) && (this.na = new Uj(this.a,this,t(this.ga) ? this.ga : 1),
                    this.na.ra = a)) : Ba(c, "text/") && (this.Y && (this.Y.M(),
                        this.Y = null),
                    b && (this.Y = new ak(this.a),
                        this.Y.ra = a,
                        this.Y.T(this.fc.ea, this.fc.bc)))
            }
        }
        ;
        Y.prototype.enableStream = Y.prototype.enableStream;
        Y.prototype.isStreamEnabled = function(a) {
            return null !== mk(this, a)
        }
        ;
        Y.prototype.isStreamEnabled = Y.prototype.isStreamEnabled;
        var mk = function(a, b) {
            0 == b ? a = a.fc : (b = a.qa.Bb[b - 1],
                a = null === a.na || a.na.ra != b ? null === a.Y || a.Y.ra != b ? null : a.Y : a.na);
            return a
        };
        Y.prototype.getQualityLevel = function(a) {
            return mk(this, a).getQualityLevel()
        }
        ;
        Y.prototype.getQualityLevel = Y.prototype.getQualityLevel;
        Y.prototype.getStreamInfo = function(a) {
            var b = [], c;
            if (0 == a) {
                b = [];
                a = this.qa.rc;
                for (c = 0; c < a.length; c++)
                    b.push(a[c].Oa.ja);
                a = this.qa.rc[0].Oa;
                c = a.codecs;
                if (this.na)
                    for (var d = a.codecs.split(","), e = 0; e < d.length; e++)
                        if (0 == d[e].indexOf("avc1.")) {
                            c = d[e];
                            break
                        }
            } else
                a = this.qa.Bb[a - 1].Oa,
                    b.push(a.ja),
                    c = a.codecs;
            return new Se(c,a.mimeType,b,a.language,a.name,null)
        }
        ;
        Y.prototype.getStreamInfo = Y.prototype.getStreamInfo;
        h = Y.prototype;
        h.Kf = function(a, b, c) {
            mk(this, a).Kf(b, c, 0 == a ? this.qa.rc[b] : this.qa.Bb[a - 1])
        }
        ;
        h.reset = function(a) {
            mk(this, a).reset()
        }
        ;
        h.wa = function(a) {
            return mk(this, a).wa()
        }
        ;
        h.oe = function(a) {
            this.fc.ra == a ? this.fc.oe() : null !== this.na && this.na.ra == a ? this.na.oe() : null !== this.Y && this.Y.ra == a && this.Y.oe();
            if (this.$e) {
                var b = a.pa.Ef;
                switch (b) {
                    case "widevine":
                        this.$e.me([b]);
                        break;
                    case "aes_128":
                        this.a.Jg && (b = "aes_128_ckp",
                            a.pa.Ef = b);
                        Bf(b, 2);
                        break;
                    case "none":
                        break;
                    default:
                        C(Ze, "Unexpected HLS protection type")
                }
                this.$e = null
            }
            this.Ki.bh();
            t(this.ti) || (Ff(a.pa.Z),
                this.ti = a.pa.Z)
        }
        ;
        h.updateLicenseRequestInfo = function() {}
        ;
        h.getDuration = function() {
            var a = this.fc.ra;
            return a ? a.duration : -1
        }
        ;
        h.seek = function(a, b) {
            return mk(this, a).seek(b)
        }
        ;
        h.dc = function(a) {
            return mk(this, a).dc()
        }
        ;
        h.ub = function(a) {
            return mk(this, a).ub()
        }
        ;
        h.getSegmentInterval = function(a) {
            return mk(this, a).getSegmentInterval()
        }
        ;
        h.rd = function(a) {
            return mk(this, a).rd()
        }
        ;
        h.uj = function() {}
        ;
        h.Td = function(a) {
            return mk(this, a).Td()
        }
        ;
        h.updateSegmentRequestInfo = function(a, b) {
            mk(this, a).updateSegmentRequestInfo(b)
        }
        ;
        h.processSegment = function(a, b, c) {
            b.Cc ? Vg(c, b.data, {
                time: 0,
                duration: 0
            }, 0, !1) : mk(this, a).processSegment(b.kc, b.data, c)
        }
        ;
        h.ff = function() {
            return 2
        }
        ;
        var pk = function(a) {
            this.Z = new wh("IsLive");
            this.sc = new N("TimeScale");
            for (this.duration = new N("Duration"); a; ) {
                if ("SmoothStreamingMedia" == a.nodeName) {
                    P(a.attributes, this);
                    break
                }
                a = a.nextElementSibling
            }
            this.zh = [];
            this.kb = null;
            if (a)
                for (this.sc.value || (this.sc.value = 1E7),
                         a = a.firstElementChild; null !== a; a = a.nextElementSibling)
                    if ("StreamIndex" == a.nodeName) {
                        var b = new nk(a,this.sc.value);
                        0 < b.Sa.length && this.zh.push(b)
                    } else
                        "Protection" == a.nodeName && (this.kb = new ok(a.firstElementChild))
        }
            , qk = function(a, b) {
            O.call(this, a, b)
        };
        q(qk, O);
        qk.prototype.parse = function(a) {
            switch (a) {
                case "H264":
                case "AVC1":
                    this.value = "avc1.4D40";
                    break;
                case "AACL":
                    this.value = "mp4a.40.2";
                    break;
                case "EC-3":
                    this.value = "mp4a.a6";
                    break;
                case "AACH":
                    this.value = "mp4a.40.5";
                    break;
                case "DFXP":
                case "TTML":
                    this.value = "ttml";
                    break;
                default:
                    this.value = null
            }
        }
        ;
        var rk = function() {
            L.call(this, "CodecPrivateData");
            this.ve = this.Tc = null
        };
        q(rk, L);
        rk.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            a = a.split("00000001");
            3 == a.length && (this.Tc = lf(a[1]),
                this.ve = lf(a[2]))
        }
        ;
        var sk = function() {
            L.call(this, "CodecPrivateData");
            this.value = null
        };
        q(sk, L);
        sk.prototype.parse = function(a) {
            L.prototype.parse.call(this, a);
            a && (this.value = lf(a))
        }
        ;
        var tk = function(a) {
            this.ja = new N("Bitrate");
            this.format = new qk("FourCC",a)
        }
            , uk = function(a) {
            tk.call(this, "ttml");
            P(a.attributes, this)
        };
        q(uk, tk);
        var vk = function(a) {
            tk.call(this, "avc1.4D401E");
            this.width = new N("MaxWidth");
            this.height = new N("MaxHeight");
            this.$a = new rk;
            P(a.attributes, this)
        };
        q(vk, tk);
        var wk = function(a) {
            tk.call(this, "mp4a.40.2");
            this.sampleRate = new N("SamplingRate");
            this.Qj = new N("Channels");
            this.$a = new sk;
            P(a.attributes, this)
        };
        q(wk, tk);
        var nk = function(a, b) {
            this.type = new O("Type");
            this.url = new O("Url");
            this.name = new O("Name");
            this.language = new O("Language");
            P(a.attributes, this);
            this.Lb = 0;
            switch (this.type.value) {
                case "video":
                    this.Lb = 2;
                    break;
                case "audio":
                    this.Lb = 1;
                    break;
                case "text":
                    this.Lb = 3
            }
            this.c = [];
            this.Sa = [];
            var c = new lh("0");
            for (a = a.firstElementChild; null !== a; a = a.nextElementSibling)
                if ("QualityLevel" == a.nodeName) {
                    var d;
                    d = a;
                    switch (this.Lb) {
                        case 2:
                            d = new vk(d);
                            break;
                        case 1:
                            d = new wk(d);
                            break;
                        case 3:
                            d = new uk(d);
                            break;
                        default:
                            d = null
                    }
                    d && d.format.value && this.Sa.push(d)
                } else if ("c" == a.nodeName) {
                    var e = a;
                    d = b;
                    var f = e.attributes.getNamedItem("t");
                    f && c.reset(f.value);
                    var f = null
                        , g = -1;
                    e.attributes.getNamedItem("d") && (f = parseInt(e.attributes.d.value, 10),
                        g = f / d);
                    for (var e = (e = e.attributes.getNamedItem("r")) ? parseInt(e.value, 10) : 1, k = 0; k < e; k++)
                        this.c.push({
                            time: parseInt(c.toString(), 10) / d,
                            duration: g,
                            Db: new lh(c.toString()),
                            offset: 0,
                            size: 0,
                            url: null
                        }),
                        null === f || c.add(f)
                }
            c = this.c.length - 1;
            for (a = 0; a < c; a++)
                if (d = this.c[a],
                        f = this.c[a + 1],
                    0 > d.duration) {
                    f = f.Db;
                    g = d.Db;
                    if (f.X == g.X)
                        f = 0;
                    else {
                        if (!mh(f, g))
                            throw Error("Value must be smaller than the current value");
                        for (var k = e = 0, l = 1, n = 0; n < f.X.length; n++)
                             var p = parseInt(f.X.charAt(f.X.length - 1 - n), 10) - (n < g.X.length ? parseInt(g.X.charAt(g.X.length - 1 - n), 10) : 0) - k
                                 , k = 0 > p ? 1 : 0
                                 , e = e + (k ? 10 + p : p) * l
                                 , l = 10 * l;
                        if (k)
                            throw Error("Value must be smaller than the current value");
                        if (e > Number.MAX_SAFE_INTEGER)
                            throw Error("Difference lost precision");
                        f = e
                    }
                    d.duration = f / b
                }
        }
            , ok = function(a) {
            this.systemId = new Ah("SystemID");
            P(a.attributes, this);
            this.Ae = null;
            this.systemId.value && ef.rb(this.systemId.value) && (this.Ae = sh(Ha(window.atob(a.textContent.trim()))))
        };
        A("cast.player.smooth");
        var xk = function(a) {
            K.call(this, a);
            this.Be = null;
            this.Va = 1E7
        };
        q(xk, K);
        xk.prototype.Zg = function(a) {
            var b = a.kb;
            if (b) {
                b = b.Ae;
                if (null === b) {
                    yk(this, "invalid protection info");
                    return
                }
                this.Be = b
            }
            a.sc.value && (this.Va = a.sc.value);
            a.duration.value && (this.duration = a.duration.value / this.Va);
            b = 1 == a.Z.value;
            t(this.Z) || Ff(b);
            this.Z = b;
            for (var b = Infinity, c = m(a.zh), d = c.next(); !d.done; d = c.next())
                d = d.value,
                (2 == d.Lb || 1 == d.Lb) && d.c[0].time < b && (b = d.c[0].time);
            c = [];
            a = m(a.zh);
            for (d = a.next(); !d.done; d = a.next()) {
                var e = d.value;
                if (0 == e.Sa.length) {
                    yk(this, "no quality levels");
                    return
                }
                d = e.Sa[0].format.value;
                if (null === d) {
                    yk(this, "unknown media format");
                    return
                }
                var f = null;
                if (2 == e.Lb)
                    a: {
                        var f = b
                            , g = e.Sa[0];
                        if (null === g.$a.Tc)
                            yk(this, "no sps"),
                                f = null;
                        else {
                            g = g.$a.Tc[3].toString(16);
                            1 == g.length && (g = "0" + g);
                            for (var k = zk(2, "video/mp4", d + g.toLowerCase(), e.language.value, e.name.value), l = 0; l < e.Sa.length; l++) {
                                g = e.Sa[l];
                                if (null === g.ja.value || null === g.width.value || null === g.height.value || null === g.$a.Tc || null === g.$a.ve) {
                                    yk(this, "invalid video quality");
                                    f = null;
                                    break a
                                }
                                var n = this.Be
                                    , p = this.Va
                                    , u = g.width.value
                                    , G = g.height.value
                                    , M = g.$a.Tc
                                    , oa = g.$a.ve
                                    , kb = new Jh;
                                (new xj(n,p,u,G,M,oa)).h(kb);
                                k.v.push(Ak(e.url.value, g.ja.value, f, e.c, Ih(kb)))
                            }
                            f = k
                        }
                    }
                else if (1 == e.Lb)
                    a: {
                        f = b;
                        g = zk(1, "audio/mp4", d, e.language.value, e.name.value);
                        for (k = 0; k < e.Sa.length; k++) {
                            l = e.Sa[k];
                            if (null === l.ja.value || null === l.sampleRate.value) {
                                yk(this, "invalid audio quality");
                                f = null;
                                break a
                            }
                            (n = l.$a.value) || (n = l.Qj.value,
                                n = Nh(2, l.sampleRate.value, null === n ? 2 : n));
                            G = n;
                            if (null === G) {
                                yk(this, "invalid audio codec private data");
                                f = null;
                                break a
                            }
                            n = this.Be;
                            p = this.Va;
                            u = l.sampleRate.value;
                            M = "mp4a.a6" == d ? 166 : 64;
                            oa = new Jh;
                            (new wj(n,p,M,u,G)).h(oa);
                            g.v.push(Ak(e.url.value, l.ja.value, f, e.c, Ih(oa)))
                        }
                        f = g
                    }
                else if (3 == e.Lb) {
                    f = b;
                    g = zk(3, "text/mp4", d, e.language.value, e.name.value, !1);
                    for (k = 0; k < e.Sa.length; k++)
                        g.v.push(Ak(e.url.value, e.Sa[k].ja.value || 0, f, e.c, null));
                    f = g
                }
                f && ("mp4a.a6" == d ? c.push(f) : this.m.push(f))
            }
            Array.prototype.push.apply(this.m, c)
        }
        ;
        var yk = function(a, b) {
            a.host.R(431, void 0, b, Bk)
        };
        h = xk.prototype;
        h.ic = function(a, b) {
            if (a) {
                b && (this.uri = new I(b));
                var c = (new DOMParser).parseFromString(a, "text/xml")
                    , c = new pk(c.firstChild);
                this.Zg(c);
                K.prototype.ic.call(this, a, b);
                this.Be && this.Nc.me(["playready"])
            } else
                this.host.R(331, ph(this.Hc))
        }
        ;
        h.updateLicenseRequestInfo = function(a) {
            a.headers = {};
            a.headers["content-type"] = "text/xml;charset=utf-8";
            a.url = this.Be.url
        }
        ;
        h.Td = function(a) {
            a = this.m[a];
            a.La = !1;
            return a.v[a.P].ib.data
        }
        ;
        h.updateSegmentRequestInfo = function(a, b) {
            K.prototype.updateSegmentRequestInfo.call(this, a, b);
            var c = this.m[a];
            a = c.index;
            var c = c.v[c.P]
                , d = c.url
                , d = d.replace(Ck, c.ja.toString())
                , d = d.replace(Dk, c.c[a].Db.toString());
            b.url = this.uri.resolve(new I(d)).toString().toString()
        }
        ;
        h.processSegment = function(a, b, c) {
            var d = this.m[a]
                , e = b.data
                , f = b.interval;
            if (b.Cc)
                Vg(c, e, {
                    time: f.time,
                    duration: 0
                }, 0, !1);
            else {
                if (this.Z) {
                    var g = this.Va
                        , k = V(e, 1970628964, Sh, !0)
                        , k = k ? k.Gg(g) : null;
                    if (null === k || 0 == k.length)
                        C(Bk, "no new segments");
                    else {
                        a = this.m[a];
                        g = a.v[a.P].c;
                        if (0 != k.length) {
                            for (var l = k[0].time, n = 0; n < g.length; n++) {
                                var p = g[n].time;
                                if (p > l || .3 > Math.abs(p - l)) {
                                    g.splice(n, g.length - n);
                                    break
                                }
                            }
                            k = m(k);
                            for (l = k.next(); !l.done; l = k.next())
                                g.push(l.value)
                        }
                        Ek(a)
                    }
                    if (b.headers && (b = b.headers.match('ChildTrack="([^"]*)"'))) {
                        b = m(b[1].split(/,|;/));
                        for (a = b.next(); !a.done; a = b.next())
                            if (a = a.value.match("([^=]*)=([0-9]*)"))
                                for (g = a[1],
                                         k = m(this.m),
                                         l = k.next(); !l.done; l = k.next())
                                    if (l = l.value,
                                        g == l.name) {
                                        g = l.v[0].c;
                                        a = a[2];
                                        k = parseInt(a, 10) / this.Va;
                                        (0 == g.length || g[g.length - 1].time < k) && g.push({
                                            time: k,
                                            duration: 0,
                                            Db: new lh(a),
                                            offset: 0,
                                            size: 0,
                                            url: null
                                        });
                                        break
                                    }
                        b = m(this.m);
                        for (l = b.next(); !l.done; l = b.next())
                            Ek(l.value)
                    }
                }
                b = f.time + d.v[d.P].N;
                if (3 == d.type)
                    e = (e = V(e, 1835295092)) ? T(e) : null;
                else {
                    a = b * this.Va;
                    g = 2 == d.type;
                    k = di(e);
                    l = new Jh(e.byteLength + 1024);
                    n = null;
                    for (e = 0; 0 < k.length; )
                        switch (p = k.shift(),
                            p.getName()) {
                            case 1836019558:
                                n = V(T(p), 1970628964, Vh, !0);
                                (new Aj(p,a,g)).h(l);
                                break;
                            case 1835295092:
                                var u = null;
                                n && (u = n.qh ? n.qh : new Uint8Array([]));
                                e = u ? u.length : 0;
                                (new cj(u ? [u, T(p)] : [T(p)])).h(l);
                                break;
                            default:
                                p.h(l)
                        }
                    a = Ih(l);
                    bi(a, e);
                    e = a
                }
                null === e ? this.host.R(332, void 0, "no media data", Bk) : (Vg(c, e, f, b, d.T),
                    d.T = !1)
            }
        }
        ;
        h.ff = function() {
            return 3
        }
        ;
        var zk = function(a, b, c, d, e, f) {
            return {
                name: e,
                type: a,
                enabled: !1,
                mimeType: b,
                T: !0,
                v: [],
                language: d,
                La: t(f) ? f : !0,
                codecs: c,
                index: -1,
                P: -1
            }
        }
            , Ak = function(a, b, c, d, e) {
            return {
                url: a || "",
                ja: b,
                N: c,
                c: d,
                D: null,
                H: null,
                ib: e ? {
                    url: null,
                    sa: null,
                    data: e
                } : null
            }
        }
            , Ek = function(a) {
            var b = a.v[0].c
                , c = b.length - 1E4;
            0 < c && a.index >= c && (b.splice(0, c),
                a.index -= c)
        }
            , Bk = A("cast.player.smooth.Protocol")
            , Ck = /{bitrate}|{Bitrate}/
            , Dk = /{start time}|{start_time}/;
        var Fk = function(a, b, c) {
            this.Kb = a;
            this.ab = b;
            this.Tj = c;
            this.Ed = this.w = null;
            this.yh = new Od;
            this.a = new Gf({
                mediaElement: null,
                url: b.url
            });
            this.a.jj = this.Ok.bind(this);
            this.a.onError = this.sd.bind(this);
            this.a.updateManifestRequestInfo = this.ab.updateManifestRequestInfo;
            this.a.updateSegmentRequestInfo = this.ab.updateSegmentRequestInfo;
            this.a.updateCaptionsRequestInfo = this.ab.updateCaptionsRequestInfo
        };
        Fk.prototype.load = function() {
            switch (this.ab.lj) {
                case 1:
                    this.w = new ti(this.a);
                    break;
                case 2:
                    this.w = new Y(this.a,this.ab.pk);
                    break;
                case 3:
                    this.w = new xk(this.a);
                    break;
                default:
                    C(fh, "Unrecognized streaming protocol " + this.ab.lj);
                    return
            }
            D(fh, "Pre caching " + this.ab.url);
            this.w.load(this)
        }
        ;
        Fk.prototype.Ok = function(a, b) {
            var c = this;
            if (null === a)
                return null;
            gd(Mf(this.Kb, b, a), function(a) {
                C(fh, a);
                Gk(c)
            });
            return a
        }
        ;
        Fk.prototype.onManifestReady = function() {
            for (var a = this.w.getStreamCount(), b = 0; b < a; b++)
                if (this.w.isStreamEnabled(b)) {
                    var c = this.w.getStreamInfo(b).mimeType;
                    this.yh.enqueue(b, af(c) ? 0 : $e(c) ? 1 : 2)
                }
            Hk(this)
        }
        ;
        Fk.prototype.bh = function() {}
        ;
        var Hk = function(a) {
            if (a.yh.oa())
                Gk(a);
            else if (Qf(a.Kb))
                C(fh, "Cache is full. Notifies Content Cache to move to next content."),
                    Gk(a);
            else {
                var b = a.yh.hd();
                a.w.enableStream(b, !0);
                a.Ed = new eh(a,a.a,a.w,b,a);
                Tg(a.Ed)
            }
        };
        Fk.prototype.Zb = function() {
            return this.ab.Mg
        }
        ;
        var gh = function(a, b) {
            if (0 < a.Ed.va(a.ab.Mg)) {
                var c = a.Kb
                    , d = a.a.url
                    , e = a.w.getQualityLevel(b);
                c.isEnabled() && (c.Ge.Vb(d) || c.Ge.set(d, []),
                    c.Ge.get(d)[b] = e)
            }
            Hk(a)
        };
        Fk.prototype.hc = function() {
            this.Ed.He()
        }
        ;
        Fk.prototype.sd = function() {
            Gk(this)
        }
        ;
        var Gk = function(a) {
            a.w.Pb();
            a.Tj.Qi()
        };
        Fk.prototype.me = function() {}
        ;
        Fk.prototype.$g = function() {}
        ;
        Fk.prototype.dh = function() {}
        ;
        Fk.prototype.ye = function() {}
        ;
        var fh = A("cast.player.cache.ContentLoader");
        var Ik = function() {};
        y("cast.player.cache.ContentCacheCallbacks", Ik);
        Ik.prototype.Qi = function() {}
        ;
        var Jk = function(a) {
            Xe.call(this, a.url);
            this.lj = a.protocolType || 0;
            this.Mg = a.initialTime || 0;
            this.pk = a.hlsSegmentFormat
        };
        q(Jk, Xe);
        y("cast.player.api.ContentCacheHost", Jk);
        var Kk = function() {
            this.Kb = If.ef();
            this.rg = new Pd;
            this.Ye = null
        };
        y("cast.player.api.ContentCache", Kk);
        Kk.prototype.load = function(a) {
            if (!this.Kb.isEnabled())
                return C(Lk, "Platform cache is not enabled"),
                    Promise.reject(Error("Platform cache is not enabled"));
            this.Kb.reset();
            a = m(a);
            for (var b = a.next(); !b.done; b = a.next())
                b = new Fk(this.Kb,b.value,this),
                    this.rg.enqueue(b);
            Mk(this);
            this.Ye = ed();
            return Promise.resolve(this.Ye.kj)
        }
        ;
        Kk.prototype.load = Kk.prototype.load;
        var Mk = function(a) {
            Qf(a.Kb) || a.rg.oa() ? (a.Ye.resolve(),
                a.Ye = null) : a.rg.hd().load()
        };
        Kk.prototype.Qi = function() {
            Mk(this)
        }
        ;
        var Lk = A("cast.player.api.ContentCache");
        var Ok = function(a) {
            this.$h = a;
            this.jg = this.ea = this.Id = this.mode = this.yf = 0;
            this.Cg = new Nk(this);
            this.Dg = new Nk(this);
            this.vc = [];
            this.reset()
        }
            , Pk = function(a) {
            return a.Id + a.ea
        };
        Ok.prototype.clear = function() {
            this.jg = this.Id = this.mode = 0;
            this.vc = [];
            this.reset()
        }
        ;
        Ok.prototype.reset = function() {
            this.mode = 0;
            this.Cg.reset(0);
            this.Dg.reset(1)
        }
        ;
        var Rk = function(a, b, c) {
            if (255 == a && 255 == b || !a && !b)
                return {
                    Ue: a,
                    Ve: b,
                    result: 0
                };
            a = Qk[a];
            b = Qk[b];
            if (a & 128) {
                if (!(b & 128) && 0 != c.g && c.ig == b)
                    return {
                        Ue: a,
                        Ve: b,
                        result: 1
                    }
            } else if (b & 128 && 1 <= a && 31 >= a)
                return {
                    Ue: a,
                    Ve: b,
                    result: 2
                };
            return {
                Ue: a,
                Ve: b,
                result: 3
            }
        }
            , Tk = function(a, b, c) {
            255 == b && 255 == c || !b && !c ? (45 == ++a.jg && a.reset(),
                a.Cg.Fc.clear(),
                a.Dg.Fc.clear()) : (a.jg = 0,
                Sk(a.Cg, b, c))
        };
        Ok.prototype.decode = function() {
            this.vc.sort(function(a, b) {
                var c = a.time - b.time;
                return 0 == c ? a.order - b.order : c
            });
            for (var a = 0; a < this.vc.length; a++) {
                var b = this.vc[a];
                this.Id = b.time;
                0 == b.type ? Tk(this, b.Th, b.Uh) : 1 == b.type && this.yf & 496 && Sk(this.Dg, b.Th, b.Uh)
            }
            this.vc.length = 0
        }
        ;
        var Qk = [128, 1, 2, 131, 4, 133, 134, 7, 8, 137, 138, 11, 140, 13, 14, 143, 16, 145, 146, 19, 148, 21, 22, 151, 152, 25, 26, 155, 28, 157, 158, 31, 32, 161, 162, 35, 164, 37, 38, 167, 168, 41, 42, 171, 44, 173, 174, 47, 176, 49, 50, 179, 52, 181, 182, 55, 56, 185, 186, 59, 188, 61, 62, 191, 64, 193, 194, 67, 196, 69, 70, 199, 200, 73, 74, 203, 76, 205, 206, 79, 208, 81, 82, 211, 84, 213, 214, 87, 88, 217, 218, 91, 220, 93, 94, 223, 224, 97, 98, 227, 100, 229, 230, 103, 104, 233, 234, 107, 236, 109, 110, 239, 112, 241, 242, 115, 244, 117, 118, 247, 248, 121, 122, 251, 124, 253, 254, 127, 0, 129, 130, 3, 132, 5, 6, 135, 136, 9, 10, 139, 12, 141, 142, 15, 144, 17, 18, 147, 20, 149, 150, 23, 24, 153, 154, 27, 156, 29, 30, 159, 160, 33, 34, 163, 36, 165, 166, 39, 40, 169, 170, 43, 172, 45, 46, 175, 48, 177, 178, 51, 180, 53, 54, 183, 184, 57, 58, 187, 60, 189, 190, 63, 192, 65, 66, 195, 68, 197, 198, 71, 72, 201, 202, 75, 204, 77, 78, 207, 80, 209, 210, 83, 212, 85, 86, 215, 216, 89, 90, 219, 92, 221, 222, 95, 96, 225, 226, 99, 228, 101, 102, 231, 232, 105, 106, 235, 108, 237, 238, 111, 240, 113, 114, 243, 116, 245, 246, 119, 120, 249, 250, 123, 252, 125, 126, 255]
            , Uk = function() {
            this.Ob = 0
        };
        Uk.prototype.set = function(a) {
            this.Ob = a
        }
        ;
        Uk.prototype.get = function() {
            return this.Ob
        }
        ;
        var Vk = function() {
            this.ig = this.Oh = this.g = 0
        };
        Vk.prototype.clear = function() {
            this.g = 0
        }
        ;
        Vk.prototype.update = function() {
            this.g = 2 == this.g ? 1 : 0
        }
        ;
        Vk.prototype.matches = function(a, b) {
            return 0 != this.g && a == this.Oh && b == this.ig
        }
        ;
        var Wk = function() {
            this.timestamp = this.Qb = 0;
            this.ce = !1
        };
        Wk.prototype.reset = function() {
            this.timestamp = this.Qb = 0;
            this.ce = !1
        }
        ;
        var Xk = function(a) {
            this.Ya = [];
            for (var b = 0; 15 >= b; b++) {
                this.Ya[b] = [];
                for (var c = 0; 32 >= c; c++)
                    this.Ya[b][c] = new Wk
            }
            this.O = this.ha = this.ia = 0;
            this.style = new Uk;
            this.U = a;
            this.le = 0
        }
            , Zk = function(a) {
            for (var b = "", c = Pk(a.U), d = c, e = 1; 15 >= e; ++e) {
                for (var f = "", g = !1, k = 1; 32 >= k; ++k) {
                    var l = a.Ya[e][k];
                    if (0 != l.Qb) {
                        var n = String.fromCharCode(l.Qb);
                        " " != n && (g = !0);
                        var f = f + n
                            , p = l.timestamp;
                        p < c && (c = p);
                        p > d && (d = p);
                        3 == a.style.Ob ? (!l.ce && " " == n && g && 32 > k && Yk(a.U.$h, c, c, b ? b + "\n" + f : f),
                            l.ce = !0) : l.reset()
                    }
                }
                f && (b = b ? b + "\n" + f : f)
            }
            b && Yk(a.U.$h, c, d, b)
        };
        Xk.prototype.reset = function(a) {
            for (var b = 0; 15 >= b; b++)
                for (var c = 0; 32 >= c; c++)
                    this.Ya[b][c].reset();
            this.le = a;
            this.O = 0;
            this.ha = this.ia = 1
        }
        ;
        var $k = function(a) {
            return a.Ya[a.ia][a.ha]
        }
            , cl = function(a, b, c) {
            2 <= b && 1 < a.ha && (--a.ha,
                $k(a).Qb = 0);
            var d = $k(a);
            d.timestamp = Pk(a.U);
            a: {
                switch (b) {
                    case 0:
                        b = al[(c & 127) - 32];
                        break a;
                    case 1:
                        b = bl[c & 15];
                        break a
                }
                b = 0
            }
            d.Qb = b;
            32 > a.ha && a.ha++
        }
            , dl = function(a, b, c, d) {
            for (var e = 0; e < d; e++)
                for (var f = 0; 32 >= f; f++) {
                    var g = a.Ya[b + e][f]
                        , k = a.Ya[c + e][f];
                    g.Qb = k.Qb;
                    g.timestamp = k.timestamp;
                    g.ce = k.ce
                }
        }
            , el = function(a, b, c) {
            for (var d = 0; d < c; d++)
                for (var e = 0; 32 >= e; e++)
                    a.Ya[b + d][e].reset()
        }
            , fl = function(a) {
            a.ia = 0 < a.O ? a.O : 1;
            a.ha = 1;
            el(a, 0, 15)
        }
            , al = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 225, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 233, 93, 237, 243, 250, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 231, 247, 209, 241, 9632]
            , bl = [174, 176, 189, 191, 8482, 162, 163, 9834, 224, 32, 232, 226, 234, 238, 244, 251]
            , gl = function(a) {
            this.U = a;
            this.pg = 0;
            this.style = new Uk;
            this.Vg = new Xk(a);
            this.Wg = new Xk(a);
            this.Y = new Xk(a);
            this.cb = this.Vg;
            this.qd = this.Wg;
            this.L = this.cb
        };
        gl.prototype.reset = function(a, b) {
            this.pg = b;
            this.style.set(2);
            this.cb = this.Vg;
            this.qd = this.Wg;
            this.L = this.cb;
            var c = (a << 2) + (b << 1) + 0;
            this.Vg.reset(c);
            this.Wg.reset(c);
            this.Y.reset((a << 2) + (b << 1) + 1)
        }
        ;
        var hl = function(a, b) {
            var c = a.cb;
            switch (a.style.get()) {
                case 4:
                    if (0 < c.O)
                        break;
                case 1:
                case 2:
                    Zk(c),
                        fl(a.cb),
                        fl(a.qd),
                        c.ia = 15,
                        c.O = b
            }
            a.style.set(3);
            a.L = c;
            a.L.style = a.style;
            a.U.mode = 1 << c.le;
            c.ha = 1;
            c.O != b && (c.O > b ? (Zk(c),
                el(c, c.ia - c.O, b)) : c.ia < b && (b = c.O),
                c.O = b)
        }
            , il = function(a) {
            a.style.set(1);
            a.L = a.qd;
            a.L.O = 0;
            a.L.style = a.style;
            a.U.mode = 1 << a.L.le
        }
            , jl = function(a) {
            a.style.set(4);
            a.L = a.Y;
            a.L.style = a.style;
            a.U.mode = 1 << a.L.le
        }
            , Nk = function(a) {
            this.U = a;
            this.Fc = new Vk;
            this.Eg = 0;
            this.We = new gl(a);
            this.Qh = new gl(a);
            this.ug = this.We
        };
        Nk.prototype.reset = function(a) {
            this.Eg = a;
            this.Fc.clear();
            this.ug = this.We;
            this.We.reset(a, 0);
            this.Qh.reset(a, 1)
        }
        ;
        var Sk = function(a, b, c) {
            a.Fc.update();
            b = Rk(b, c, a.Fc);
            switch (b.result) {
                case 0:
                    return;
                case 1:
                case 2:
                    return
            }
            var d = b.Ue;
            c = b.Ve;
            if (32 <= d || !d)
                a.U.mode & a.U.yf && (b = d,
                b & 128 && (b = 127),
                c & 128 && (c = 127),
                    a = a.ug.L,
                b & 96 && cl(a, 0, b),
                c & 96 && cl(a, 0, c));
            else if (d & 16)
                a: if (!a.Fc.matches(d, c) && (b = a.Fc,
                        b.Oh = d,
                        b.ig = c,
                        b.g = 2,
                        b = d & 8 ? a.Qh : a.We,
                        a.ug = b,
                        a.U.mode = 1 << (a.Eg << 2) + (b.pg << 1) + (4 == b.style.Ob ? 1 : 0),
                    (a.U.mode | 1 << (a.Eg << 2) + (b.pg << 1) + (4 != b.style.Ob ? 1 : 0)) & a.U.yf))
                    if (c & 64) {
                        a = [11, 11, 1, 2, 3, 4, 12, 13, 14, 15, 5, 6, 7, 8, 9, 10][(d & 7) << 1 | c >> 5 & 1];
                        c = c & 16 ? 4 * ((c & 14) >> 1) : 0;
                        d = b.L;
                        switch (b.style.get()) {
                            case 4:
                                a = d.ia;
                                break;
                            case 3:
                                if (a != d.ia) {
                                    if (a < d.O && (a = d.O,
                                        a == d.ia))
                                        break;
                                    var e = 1 + d.ia - d.O
                                        , f = 1 + a - d.O;
                                    dl(d, f, e, d.O);
                                    b = e;
                                    var g = d.O;
                                    f < e ? (e = f + g - e,
                                    0 < e && (b += e,
                                        g -= e)) : (e = e + g - f,
                                    0 < e && (g -= e));
                                    el(d, b, g)
                                }
                        }
                        d.ia = a;
                        d.ha = c + 1
                    } else
                        switch (d & 7) {
                            case 1:
                                switch (c & 112) {
                                    case 32:
                                        cl(b.L, 0, 32);
                                        break a;
                                    case 48:
                                        57 == c ? (b = b.L,
                                            $k(b).Qb = 0,
                                        32 > b.ha && b.ha++) : cl(b.L, 1, c & 15)
                                }
                                break;
                            case 2:
                                c & 32 && cl(b.L, 2, c & 31);
                                break;
                            case 3:
                                c & 32 && cl(b.L, 3, c & 31);
                                break;
                            case 4:
                            case 5:
                                if (32 <= c && 47 >= c)
                                    switch (c) {
                                        case 32:
                                            il(b);
                                            break;
                                        case 33:
                                            b = b.L;
                                            1 < b.ha && (--b.ha,
                                                $k(b).Qb = 0);
                                            break;
                                        case 36:
                                            b = b.L;
                                            a = $k(b);
                                            for (c = 0; 15 >= c; c++)
                                                for (d = 0; 32 >= d; d++)
                                                    if (b.Ya[c][d] == a) {
                                                        for (; 32 >= d; d++)
                                                            b.Ya[c][d].reset();
                                                        break
                                                    }
                                            break;
                                        case 37:
                                            hl(b, 2);
                                            break;
                                        case 38:
                                            hl(b, 3);
                                            break;
                                        case 39:
                                            hl(b, 4);
                                            break;
                                        case 40:
                                            cl(b.L, 0, 32);
                                            break;
                                        case 41:
                                            b.style.set(2);
                                            b.L = b.cb;
                                            b.L.O = 0;
                                            b.L.style = b.style;
                                            b.U.mode = 1 << b.L.le;
                                            break;
                                        case 42:
                                            a = b.Y;
                                            a.O = 15;
                                            a.style.set(4);
                                            fl(a);
                                            jl(b);
                                            break;
                                        case 43:
                                            jl(b);
                                            break;
                                        case 44:
                                            a = b.cb;
                                            switch (b.style.get()) {
                                                case 1:
                                                case 2:
                                                case 3:
                                                    Zk(a)
                                            }
                                            el(a, 0, 15);
                                            break;
                                        case 45:
                                            b: {
                                                a = b.L;
                                                switch (b.style.get()) {
                                                    default:
                                                    case 2:
                                                    case 1:
                                                        break b;
                                                    case 4:
                                                        if (15 > a.ia) {
                                                            ++a.ia;
                                                            a.ha = 1;
                                                            break b
                                                        }
                                                    case 3:
                                                }
                                                2 > a.O && (a.O = 2,
                                                a.ia < a.O && (a.ia = a.O));
                                                b = a.ia - a.O + 1;
                                                Zk(a);
                                                dl(a, b, b + 1, a.O - 1);
                                                el(a, a.ia, 1)
                                            }
                                            break;
                                        case 46:
                                            el(b.qd, 0, 15);
                                            break;
                                        case 47:
                                            Zk(b.cb),
                                                a = b.qd,
                                                b.qd = b.cb,
                                                b.cb = a,
                                                il(b)
                                    }
                                break;
                            case 7:
                                switch (c) {
                                    case 33:
                                    case 34:
                                    case 35:
                                        b = b.L,
                                        32 < (b.ha += c & 3) && (b.ha = 32)
                                }
                        }
        };
        var kl = function(a) {
            this.ng = a;
            this.Ib = 0;
            this.Ua = new Uint8Array(5120)
        };
        kl.prototype.clear = function() {
            this.Ib = 0
        }
        ;
        kl.prototype.append = function(a) {
            this.Ua.set(a, this.Ib);
            this.Ib += a.length
        }
        ;
        var ll = function(a, b) {
            for (var c = 0, d = 0, e = 0; d < a.Ib; )
                2 == c && 3 == a.Ua[d] ? c = 0 : (0 == a.Ua[d] ? c++ : c = 0,
                    a.Ua[e] = a.Ua[d],
                    e++),
                    d++;
            c = d - e;
            for (d = 0; d + c < a.Ib; ) {
                for (var f = 0; 255 == a.Ua[d]; )
                    f += 255,
                        d++;
                f += a.Ua[d++];
                if (45 < f)
                    break;
                for (e = 0; 255 == a.Ua[d]; )
                    e += 255,
                        d++;
                e += a.Ua[d++];
                if (4 == f) {
                    var f = a.ng.U
                        , g = b
                        , k = new Bh(a.Ua.subarray(d, d + e));
                    if (181 == Ch(k) && 49 == Dh(k) && 1195456820 == Q(k) && 3 == Ch(k)) {
                        var l = Ch(k);
                        if (0 != (l & 64)) {
                            l &= 31;
                            R(k, 1);
                            for (var n = 0; n < l; n++) {
                                var p = Ch(k)
                                    , u = (p & 4) >> 2
                                    , G = Ch(k)
                                    , M = Ch(k);
                                u && f.vc.push({
                                    time: g,
                                    type: p & 3,
                                    Th: G,
                                    Uh: M,
                                    order: f.vc.length
                                })
                            }
                        }
                    }
                }
                d += e
            }
            a.Ib = 0
        };
        var ml = function(a) {
            this.Jb = new kl(a);
            this.Za = null;
            this.wg = 0;
            this.Me = 9E4;
            this.Dd = 0;
            this.Qc = [];
            this.Cd = []
        };
        h = ml.prototype;
        h.da = function(a) {
            if (a) {
                var b = V(a, 1835296868, void 0, !0);
                b && (this.Me = b.Me);
                if (b = V(a, 1953658222, void 0, !0))
                    if (this.Qc = b.Qc,
                        0 != this.Qc.length && (this.Cd = b.Cd,
                            this.Dd = b.Dd,
                            a = V(a, 1835295092)))
                        this.Za = new Bh(T(a))
            } else
                this.wg = 0,
                    this.Za = null
        }
        ;
        h.tj = function(a) {
            this.wg = a
        }
        ;
        h.oa = function() {
            return null === this.Za
        }
        ;
        h.pf = function() {
            var a;
            (a = null === this.Za) || (a = this.Za,
                a = !(a.offset < a.buffer.length));
            return a
        }
        ;
        h.parse = function() {
            if (this.Za)
                for (var a = this.wg / this.Dd, b = 0, c = 0, d = this.Qc[0]; !this.pf(); ) {
                    var e = Q(this.Za);
                    6 == (Ch(this.Za) & 31) ? (this.Jb.append(Fh(this.Za, e - 1)),
                        ll(this.Jb, 0 == this.Cd.length ? b : b + this.Cd[c] / this.Me)) : R(this.Za, e - 1);
                    d -= e + 4;
                    0 == d && (b += a,
                        c++,
                        d = this.Qc[c])
                }
        }
        ;
        var nl = function(a) {
            Gi.call(this);
            this.Jb = new kl(a)
        };
        q(nl, Gi);
        nl.prototype.da = function(a) {
            Gi.prototype.da.call(this, a);
            this.Jb.clear()
        }
        ;
        nl.prototype.tj = function() {}
        ;
        nl.prototype.fj = function(a, b) {
            for (var c = 0; ; ) {
                var d;
                a: {
                    d = a;
                    for (var e = b, e = e - 3; d <= e; ) {
                        if (0 == this.o[d] && 0 == this.o[d + 1]) {
                            if (0 == this.o[d + 2] && 1 == this.o[d + 3]) {
                                d += 4;
                                break a
                            }
                            if (1 == this.o[d + 2]) {
                                d += 3;
                                break a
                            }
                        }
                        d++
                    }
                    d = -1
                }
                e = 0 <= d;
                if (0 < this.Jb.Ib || 6 == c) {
                    var c = e ? d - 1 : b
                        , f = this.Jb;
                    f.Ib + (c - a + 1) <= f.Ua.length || ll(this.Jb, this.Oc);
                    this.Jb.append(this.o.subarray(a, c + 1))
                }
                if (!e)
                    break;
                ll(this.Jb, this.Oc);
                a = d;
                c = this.o[a++] & 31
            }
        }
        ;
        var ol = function(a, b) {
            ig.call(this, a, b, "webvtt");
            this.ma = A("cast.player.cea608.InbandCaptionsManager");
            this.U = new Ok(this);
            this.U.yf = 1;
            this.Ea = null;
            this.ea = 0;
            this.kd = null;
            this.ed = [];
            this.ud = this.fh.bind(this);
            this.Ca = null;
            this.vd = new Pd
        };
        q(ol, ig);
        ol.prototype.G = function() {
            this.reset();
            ig.prototype.G.call(this)
        }
        ;
        ol.prototype.fh = function() {
            if (this.Ea.oa()) {
                var a = this.vd.hd();
                this.ea != a.N && (this.U.clear(),
                    this.kd = null);
                this.ea = a.N;
                this.U.ea = a.Wj;
                this.Ea.da(a.data);
                this.Ea.tj(a.duration)
            }
            this.Ea.parse();
            if (this.Ea.pf()) {
                this.U.decode();
                if (0 < this.ed.length) {
                    for (kg(this); 0 < this.ed.length; )
                        a = this.ed.pop(),
                            a = new VTTCue(a.start,a.end,a.text),
                            a.position = 20,
                            a.align = "start",
                            this.addCue({
                                Qf: a
                            });
                    this.ed.length = 0
                }
                this.Ea.da(null)
            }
            this.vd.oa() && this.Ea.oa() ? this.Ca = null : this.Ca = setTimeout(this.ud, 20)
        }
        ;
        var Yk = function(a, b, c, d) {
            null !== a.kd && b < a.kd && (b = a.kd);
            .1 > c - b && (c = b + .1);
            a.kd = c;
            a.ed.push({
                start: b,
                end: c,
                text: d
            })
        };
        ol.prototype.ye = function(a, b, c, d, e) {
            if (af(a)) {
                if (!this.Ea)
                    switch (a) {
                        case "video/mp2t":
                            this.Ea = new nl(this);
                            break;
                        case "video/mp4":
                            this.Ea = new ml(this);
                            break;
                        default:
                            return
                    }
                1 < this.vd.sb() ? C(this.ma, "Dropped segment") : (this.vd.enqueue({
                    data: b,
                    duration: e,
                    N: c,
                    Wj: "video/mp4" == a ? d : c
                }),
                    D(this.ma, "Pending " + this.vd.sb()),
                null === this.Ca && (this.Ca = setTimeout(this.ud, 20)))
            }
        }
        ;
        ol.prototype.reset = function() {
            ig.prototype.reset.call(this);
            this.ea = 0;
            this.kd = null;
            this.ed.length = 0;
            this.Ea && this.Ea.da(null);
            this.U.clear();
            this.vd.clear();
            null !== this.Ca && (clearTimeout(this.Ca),
                this.Ca = null)
        }
        ;
        var pl = function(a, b, c, d) {
            B.call(this);
            this.a = a;
            this.w = b;
            this.vk = d;
            this.hb = c;
            this.l = this.Bi = null;
            this.wb = "none";
            this.Uf = this.Tf = this.ec = null;
            this.Xf = !1;
            this.f = new H;
            this.f.lc = "arraybuffer";
            E(this.f, "success", this.Kc, !1, this);
            E(this.f, "error", this.Cb, !1, this)
        };
        q(pl, B);
        h = pl.prototype;
        h.G = function() {
            this.l && (this.ec && Cc(this.ec, "message", this.Vi, !1, this),
                this.l = null);
            this.ec && (this.ec.close(),
                this.ec = null);
            this.f.M();
            B.prototype.G.call(this)
        }
        ;
        h.createSession = function(a) {
            D(ql, "create session");
            this.Uf = x();
            var b = this.a.licenseCustomData;
            if (b) {
                var c = new Jh(this.hb.length + b.length + 34);
                S(c, this.hb);
                (new ej(b)).h(c);
                b = Ih(c)
            } else
                b = this.hb;
            this.l = this.a.mediaElement;
            this.wb = a;
            this.ec = a = this.l.mediaKeys.createSession();
            E(this.ec, "message", this.Vi, !1, this);
            a.generateRequest("cenc", b.buffer).catch(this.Ti.bind(this))
        }
        ;
        h.Kc = function(a) {
            D(ql, "xhr success");
            var b = this.Tf;
            null !== b && (b = x() - b,
                z("Cast.MPL.LicenseReq.ServerLatency", b));
            this.Tf = null;
            this.li(Ld(a.target))
        }
        ;
        h.li = function(a) {
            var b = this;
            a ? (a = new Uint8Array(a),
            this.a.processLicense && (a = this.a.processLicense(a)),
                this.Xf = !0,
                this.ec.update(a.buffer).then(function() {
                    b.Xf = !1;
                    var a = b.vk;
                    D(rl, "key session ended: " + a.Sc);
                    5 < a.Ba.length ? a.Ba.shift().M() : a.Sc++;
                    a.Sc < a.Ba.length && a.Ba[a.Sc].createSession(a.wb)
                }, function(a) {
                    b.Xf = !1;
                    b.Ti(a)
                })) : this.a.R(201, void 0)
        }
        ;
        h.Cb = function() {
            D(ql, "xhr error");
            var a = new Re(String(this.f.je),this.f.yb,Jd(this.f),this.f.getAllResponseHeaders(),Ld(this.f));
            this.a.R(201, a)
        }
        ;
        h.Vi = function(a) {
            D(ql, "message");
            this.Bi = new Uint8Array(a.yc.message);
            this.a.prepareLicenseRequest && !this.a.prepareLicenseRequest() || this.pc()
        }
        ;
        h.Ti = function(a) {
            D(ql, "keyerror " + a);
            this.a.R(202)
        }
        ;
        h.pc = function() {
            var a = new Qe;
            a.timeoutInterval = 18E4;
            a.protectionSystem = this.wb;
            a.content = this.Bi;
            a.setResponse = this.li.bind(this);
            this.w.updateLicenseRequestInfo(a);
            this.a.licenseUrl && (a.url = this.a.licenseUrl);
            if (!a.url && this.hb && "playready" == this.wb) {
                var b = new Zh(this.hb);
                if (b = sh(b.getData()))
                    a.url = b.url
            }
            if (this.a.updateLicenseRequestInfo && (this.a.updateLicenseRequestInfo(a),
                    a.skipRequest))
                return;
            this.f.Ld = a.withCredentials;
            this.f.Nb = Math.max(0, a.timeoutInterval);
            this.f.send(a.url, "POST", a.content, a.headers);
            a = this.Uf;
            null !== a && (a = x() - a,
                z("Cast.MPL.LicenseReq.GenLatency", a));
            this.Uf = null;
            this.Tf = x()
        }
        ;
        h.ae = function() {
            return null !== this.Uf || null !== this.Tf || this.Xf
        }
        ;
        var ql = A("cast.player.core.MediaKeySession");
        var tl = function(a, b, c, d) {
            B.call(this);
            this.a = a;
            this.w = b;
            this.Ba = [];
            this.Sc = 0;
            this.wb = null;
            E(this.a.mediaElement, "encrypted", this.Ri, !1, this);
            d && 0 < d.length && (a.protectionSystem && (d.includes(a.protectionSystem) ? d.splice(0, 0, d.splice(d.indexOf(a.protectionSystem), 1)[0]) : C(rl, "Preferred protection system not found")),
                sl(this, {
                    Ci: d,
                    Tg: 0
                }))
        };
        q(tl, B);
        tl.prototype.G = function() {
            Cc(this.a.mediaElement, "encrypted", this.Ri, !1, this);
            for (var a = m(this.Ba), b = a.next(); !b.done; b = a.next())
                b.value.M();
            this.Ba.length = 0;
            B.prototype.G.call(this)
        }
        ;
        var sl = function(a, b) {
            ul(a, b).catch(function(c) {
                b.Tg++;
                b.Tg < b.Ci.length ? sl(a, b) : (ec(rl, c.toString()),
                    C(rl, "unsupported protection system"),
                    a.a.R(202))
            })
        }
            , ul = function(a, b) {
            var c = b.Ci[b.Tg];
            return navigator.requestMediaKeySystemAccess(Ye[c], [{}]).then(function(a) {
                return a.createMediaKeys()
            }).then(function(b) {
                return a.a.mediaElement.setMediaKeys(b)
            }).then(function() {
                a.wb = c;
                Bf(a.wb, a.w.ff());
                0 < a.Ba.length && a.Ba[0].createSession(c);
                return Promise.resolve()
            })
        };
        tl.prototype.Ri = function(a) {
            a = a.yc;
            D(rl, "onencrypted: " + this.Sc);
            (a = a.initData) ? (a = new Uint8Array(a),
            vl(this, a) || (a = new pl(this.a,this.w,a,this),
            this.wb && this.Sc == this.Ba.length && a.createSession(this.wb),
                this.Ba.push(a))) : D(rl, "invalid init data")
        }
        ;
        var vl = function(a, b) {
            return a.Ba.some(function(a) {
                a: if (b.length != a.hb.length)
                    a = !1;
                else {
                    for (var c = b.length, e = 0; e < c; e++)
                        if (b[e] != a.hb[e]) {
                            a = !1;
                            break a
                        }
                    a = !0
                }
                return a
            })
        };
        tl.prototype.pc = function() {
            this.Ba[this.Sc].pc()
        }
        ;
        tl.prototype.ae = function() {
            return this.Ba.some(function(a) {
                return a.ae()
            })
        }
        ;
        var rl = A("cast.player.core.MediaKeysManager");
        var wl = function(a, b, c) {
            B.call(this);
            this.a = a;
            this.w = b;
            this.Aa = c;
            this.ta = [];
            this.Ab = null;
            this.ba = new MediaSource;
            this.ui = this.xi = this.qf = !1;
            this.Ug = this.pd = null;
            E(this.ba, "sourceopen", this.cj, !1, this)
        };
        q(wl, B);
        wl.prototype.G = function() {
            this.w.Pb();
            xl(this);
            this.pd = null;
            this.Ab && (this.Ab.M(),
                this.Ab = null);
            Cc(this.ba, "sourceopen", this.cj, !1, this);
            B.prototype.G.call(this)
        }
        ;
        wl.prototype.cj = function() {
            D(yl, "sourceopen");
            if (this.ui) {
                this.update();
                zl(this);
                for (var a = m(this.ta), b = a.next(); !b.done; b = a.next())
                    (b = b.value) && b.createBuffer()
            }
        }
        ;
        var Al = function(a) {
            !a.Ab && a.pd && a.Ug && a.xi && (a.Ab = new tl(a.a,a.w,0,a.Ug))
        }
            , Bl = function(a) {
            if (t(a.ba.setLiveSeekableRange) && "open" == a.ba.readyState && Infinity == a.ba.duration) {
                var b = a.wa();
                b && a.ba.setLiveSeekableRange(b.start, b.end)
            }
        };
        h = wl.prototype;
        h.wa = function() {
            for (var a = -Infinity, b = Infinity, c = this.w.getStreamCount(), d = 0; d < c; d++)
                if (this.w.isStreamEnabled(d)) {
                    var e = this.w.wa(d);
                    if (!e)
                        return null;
                    e.start > a && (a = e.start);
                    e.end < b && (b = e.end)
                }
            a > b && (a = b);
            return {
                start: a,
                end: b
            }
        }
        ;
        h.onManifestReady = function() {
            this.ui = !0;
            this.update();
            Bl(this)
        }
        ;
        h.bh = function() {
            Bl(this)
        }
        ;
        h.me = function(a) {
            this.Ug = a;
            Al(this)
        }
        ;
        h.endOfStream = function() {
            "open" == this.ba.readyState && this.ba.endOfStream()
        }
        ;
        h.load = function() {
            xl(this);
            this.open()
        }
        ;
        h.open = function() {
            this.qf || (this.w.load(this),
                this.qf = !0);
            this.a.mediaElement.src ? (Bc(this.a.mediaElement, "emptied", function() {
                Cl(this)
            }, !1, this),
                this.a.mediaElement.src = "") : Cl(this)
        }
        ;
        var Cl = function(a) {
            D(yl, "open");
            !a.Ab && a.a.mediaElement.setMediaKeys ? a.a.mediaElement.setMediaKeys(null).then(function() {
                Dl(a)
            }).catch(function(b) {
                ec(yl, b.toString());
                Dl(a)
            }) : Dl(a)
        }
            , Dl = function(a) {
            a.a.mediaElement.src = window.URL.createObjectURL(a.ba);
            a.xi = !0;
            Al(a)
        };
        wl.prototype.lh = function() {
            this.qf ? C(yl, "protocol already loaded") : (this.w.load(this),
                this.qf = !0)
        }
        ;
        var xl = function(a) {
            for (var b = m(a.ta), c = b.next(); !c.done; c = b.next())
                (c = c.value) && c.M();
            a.ta.length = 0
        }
            , zl = function(a) {
            if ("open" == a.ba.readyState) {
                var b = a.w.getDuration();
                0 < b && !a.ba.duration && (a.ba.duration = parseFloat((b - 1E-4).toFixed(4)))
            }
        };
        h = wl.prototype;
        h.reset = function() {
            for (var a = m(this.ta), b = a.next(); !b.done; b = a.next())
                (b = b.value) && b.reset()
        }
        ;
        h.update = function() {
            for (var a = this.w.getStreamCount(), b = null, c = null, d = 0; d < a; d++)
                if (this.w.isStreamEnabled(d)) {
                    var e = this.w.getStreamInfo(d).mimeType;
                    $e(e) ? b ? C(yl, "more than one audio stream enabled") : b = e : af(e) && (c ? C(yl, "more than one video stream enabled") : c = e);
                    this.ta[d] || (this.ta[d] = new Qg(this.Aa,this.a,this.w,d,this.ba),
                        this.w.enableStream(d, !0),
                        Tg(this.ta[d]))
                } else
                    this.ta[d] && (this.ta[d].M(),
                        this.ta[d] = null);
            a = c ? c : b;
            a ? this.pd || (this.pd = a,
                    Al(this)) : C(yl, "no enabled audio or video stream")
        }
        ;
        h.Rg = function(a) {
            return this.ta[a].Rg()
        }
        ;
        h.He = function(a) {
            this.ta[a].He()
        }
        ;
        h.be = function(a) {
            return this.ta[a].be()
        }
        ;
        h.va = function(a, b) {
            return this.ta[a].va(b)
        }
        ;
        h.pc = function() {
            this.Ab.pc()
        }
        ;
        h.ae = function() {
            return null !== this.Ab && this.Ab.ae()
        }
        ;
        h.getStreamCount = function() {
            return this.ta.length
        }
        ;
        var yl = A("cast.player.core.MediaSourceManager");
        var El = function(a, b, c, d) {
            ig.call(this, a, b, c);
            a = new Qe;
            a.url = d;
            b.updateCaptionsRequestInfo && b.updateCaptionsRequestInfo(a);
            this.Bj = new nh(this);
            this.Bj.load(a)
        };
        q(El, ig);
        El.prototype.G = function() {
            this.Bj.M();
            ig.prototype.G.call(this)
        }
        ;
        El.prototype.reset = function() {}
        ;
        El.prototype.ic = function(a) {
            a && this.parse(a, 0)
        }
        ;
        var Z = function(a) {
            D(Fl, "Version: 1.0.0.40");
            xa() && cast.__platform__.metrics.setMplVersion("1.0.0.40");
            this.a = a;
            this.w = null;
            this.tb = 0;
            this.Mb = null;
            this.Nh = this.Ia = this.Qg = this.Qa = !1;
            this.vf = !0;
            this.uf = !1;
            this.Ub = this.W = this.l = null;
            this.Zd = !1;
            this.Ke = null;
            this.ud = this.fh.bind(this);
            this.Sf = this.Rf = this.Je = null;
            this.Nf = this.rf = !1
        };
        y("cast.player.api.Player", Z);
        var Hl = function(a, b) {
            Gl(a);
            a.Ke = setTimeout(a.ud, b || 0)
        };
        h = Z.prototype;
        h.hc = function(a) {
            Hl(this, a)
        }
        ;
        h.ye = function(a, b, c, d, e) {
            this.Qg && this.Ub.ye(a, b, c, d, e);
            Hl(this)
        }
        ;
        h.dh = function(a, b) {
            this.Qa && (Infinity == this.tb || this.tb < b) && (this.tb = b)
        }
        ;
        h.$g = function() {
            zl(this.W)
        }
        ;
        h.Zb = function() {
            return this.Qa ? this.tb : this.l.currentTime
        }
        ;
        var Gl = function(a) {
            null !== a.Ke && (clearTimeout(a.Ke),
                a.Ke = null)
        };
        h = Z.prototype;
        h.bj = function() {
            D(Fl, "seeking");
            this.Zd ? this.Zd = !1 : (this.uf = this.Qa = !1,
                this.Je = null,
            this.Ub && this.Ub.reset(),
                this.W.reset())
        }
        ;
        h.aj = function() {
            D(Fl, "seeked");
            this.Mb = x()
        }
        ;
        h.sd = function() {
            ec(Fl, "error");
            var a = 100;
            if (this.l.error)
                switch (this.l.error.code) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        a = 101;
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        a = 103;
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        a = 102;
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        a = 104
                }
            this.a.R(a)
        }
        ;
        h.Xi = function() {
            this.Je = x();
            za("Cast.MPL.Playing");
            if (this.Rf) {
                var a = x() - this.Rf;
                z("Cast.MPL.AutoPauseTime", a);
                this.Rf = null
            }
        }
        ;
        h.Wi = function() {
            var a = x();
            this.Ia && !this.Qa && null !== this.Je && (this.Rf = a,
                z("Cast.MPL.PlayTimeBeforeAutoPause", a - this.Je));
            za("Cast.MPL.Pause");
            this.Mb = this.Je = null
        }
        ;
        h.Si = function() {
            za("Cast.MPL.Ended");
            this.Mb = null
        }
        ;
        h.Wf = function() {
            if (this.Qa && this.l && !isNaN(this.l.duration) && 0 != this.l.buffered.length && (this.Qa = !1,
                    this.Mb = x(),
                    z("Cast.MPL.MediaDuration", this.l.duration),
                0 != this.tb && this.tb != this.l.currentTime)) {
                var a = this.tb;
                this.Zd = !0;
                this.l.currentTime = a
            }
            this.vf = !1;
            for (var b = 0, c = 0, d = !0, a = this.Zb(), e = this.W.getStreamCount(), f = 0; f < e; f++)
                if (this.w.isStreamEnabled(f) && (c++,
                        this.W.be(f))) {
                    b++;
                    var g = this.W.va(f, a);
                    if (this.Ia && d) {
                        var k = this.w.getSegmentInterval(f).duration * this.a.autoResumeNumberOfSegments;
                        if (0 == k || k > this.a.autoResumeDuration)
                            k = this.a.autoResumeDuration;
                        g < k && (d = !1)
                    }
                    k = f;
                    20 <= g || (g < this.a.autoPauseDuration && (g = this.w.getStreamInfo(k),
                    bf(g.role, g.mimeType) || (this.vf = !0)),
                    this.W.Rg(k) && this.W.He(k))
                }
            if (this.l && 0 != c) {
                this.vf ? !this.l.paused && this.l.duration - a > this.a.autoPauseDuration && (D(Fl, "auto pause " + a),
                        this.Ia = !0,
                        this.l.pause(),
                    this.a.onAutoPause && this.a.onAutoPause(this.Ia)) : !this.Qa && this.Ia && d && (this.Ia = !1,
                    this.l.paused && (D(Fl, "auto resume " + a),
                        this.l.play(),
                    this.a.onAutoPause && this.a.onAutoPause(this.Ia)));
                if (0 == b) {
                    if (!this.uf && (D(Fl, "endOfStream " + a),
                            this.W.endOfStream(),
                            this.a.onMediaDownloadEnded))
                        this.a.onMediaDownloadEnded();
                    this.uf = !0
                }
                if (!(this.Qa || this.Ia || this.l.paused || !this.W || this.W.ae()) && (D(Fl, "time=" + a),
                    this.Mb && (b = x(),
                        c = 2500 < b - this.Mb,
                    this.a.Kh || c))) {
                    a: {
                        d = this.l.currentTime;
                        e = this.l.buffered;
                        for (f = e.length - 1; 0 <= f; f--) {
                            g = e.start(f);
                            if (d >= g)
                                break;
                            if (0 == f || d > e.end(f - 1) - .15) {
                                C(Fl, "stall jump to " + g);
                                za("Cast.MPL.PlaybackStallGap");
                                this.Zd = this.Nf = !0;
                                this.l.currentTime = g;
                                d = !0;
                                break a
                            }
                        }
                        d = !1
                    }
                    d ? this.Mb = null : c && (this.Mb = this.a.Kh ? b : null,
                            C(Fl, "playback stalled in buffered region"),
                            za("Cast.MPL.PlaybackStall"),
                            this.Zd = this.Nf = !0,
                            this.l.currentTime = a + .5)
                }
            }
            Hl(this, 400)
        }
        ;
        h.dj = function() {
            this.Mb = x();
            this.Nf && (z("Cast.MPL.StallPrevented", 1),
                this.Nf = !1);
            if (this.Sf) {
                var a = x() - this.Sf;
                z(this.rf ? "Cast.MPL.PreloadAutoplayStartupLatency" : "Cast.MPL.AutoplayStartupLatency", a);
                this.Sf = null
            }
        }
        ;
        h.fh = function() {
            this.Ke = null;
            this.Wf()
        }
        ;
        var Il = function(a, b, c) {
            a.w = b;
            a.Qa = !0;
            a.tb = c || 0;
            a.W = new wl(a.a,a.w,a)
        };
        Z.prototype.load = function(a, b) {
            D(Fl, "load");
            za("Cast.MPL.Load");
            var c = pg();
            t(c) && sg("Cast.MPL.ExperimentationBlockId", c.blockIds);
            this.l = this.a.mediaElement;
            E(this.l, "error", this.sd, !1, this);
            E(this.l, "seeking", this.bj, !1, this);
            E(this.l, "seeked", this.aj, !1, this);
            E(this.l, "pause", this.Wi, !1, this);
            E(this.l, "playing", this.Xi, !1, this);
            E(this.l, "timeupdate", this.dj, !1, this);
            E(this.l, "ended", this.Si, !1, this);
            this.l.autoplay && (this.Sf = x(),
                this.l.autoplay = !1,
                this.Nh = !0,
                this.hj());
            this.W ? this.W.open() : a ? (this.rf = !1,
                Il(this, a, b),
                this.W.load()) : ec(Fl, "no protocol")
        }
        ;
        Z.prototype.load = Z.prototype.load;
        Z.prototype.lh = function(a, b) {
            D(Fl, "preload");
            za("Cast.MPL.Preload");
            Il(this, a, b);
            this.W.lh();
            this.rf = !0
        }
        ;
        Z.prototype.preload = Z.prototype.lh;
        Z.prototype.Pb = function() {
            D(Fl, "unload");
            Jl(this);
            this.l && (this.Nh && (this.l.autoplay = !0),
                this.W.M(),
                this.W = null,
                Gl(this),
                this.uf = this.Ia = !1,
                Cc(this.l, "error", this.sd, !1, this),
                Cc(this.l, "seeking", this.bj, !1, this),
                Cc(this.l, "seeked", this.aj, !1, this),
                Cc(this.l, "pause", this.Wi, !1, this),
                Cc(this.l, "playing", this.Xi, !1, this),
                Cc(this.l, "timeupdate", this.dj, !1, this),
                Cc(this.l, "ended", this.Si, !1, this),
                this.l = null,
                this.rf = !1)
        }
        ;
        Z.prototype.unload = Z.prototype.Pb;
        Z.prototype.reload = function() {
            this.Qa || (this.tb = this.l.currentTime);
            this.Qa = !0;
            this.l.paused || (this.Ia = !0);
            Gl(this);
            this.W.load()
        }
        ;
        Z.prototype.reload = Z.prototype.reload;
        Z.prototype.hj = function() {
            this.Ia = !0
        }
        ;
        Z.prototype.playWhenHaveEnoughData = Z.prototype.hj;
        Z.prototype.jk = function(a) {
            var b = this.W.wa();
            t(a) || (a = 1);
            var c = {};
            a & 1 && (c.underflow = this.vf || this.Ia);
            a & 2 && (c.seekable = b ? {
                start: b.start,
                end: b.end
            } : null);
            return c
        }
        ;
        Z.prototype.getState = Z.prototype.jk;
        Z.prototype.va = function(a) {
            return this.W.va(a, this.Zb())
        }
        ;
        Z.prototype.getBufferDuration = Z.prototype.va;
        Z.prototype.ik = function() {
            return 20
        }
        ;
        Z.prototype.getMaxBufferDuration = Z.prototype.ik;
        Z.prototype.pc = function() {
            this.W.pc()
        }
        ;
        Z.prototype.startLicenseRequest = Z.prototype.pc;
        var Jl = function(a) {
            a.Ub && (a.Qg = !1,
                a.Ub.M(),
                a.Ub = null)
        };
        Z.prototype.ek = function(a, b, c) {
            b ? a ? "cea608" == b ? (this.Qg = !0,
                this.Ub = new ol(this,this.a)) : c && (this.Ub = new El(this,this.a,b,c)) : Jl(this) : this.W.update()
        }
        ;
        Z.prototype.enableCaptions = Z.prototype.ek;
        Z.prototype.kk = function() {
            return this.w
        }
        ;
        Z.prototype.getStreamingProtocol = Z.prototype.kk;
        Z.prototype.hk = function() {
            return this.a
        }
        ;
        Z.prototype.getHost = Z.prototype.hk;
        var Fl = A("cast.player.api.Player");
        Z.State = {
            UNDERFLOW: 1,
            SEEKABLE: 2
        };
        y("cast.player.api.CreateDashStreamingProtocol", function(a) {
            Ef(1);
            return new ti(a)
        });
        y("cast.player.api.CreateHlsStreamingProtocol", function(a, b) {
            Ef(2);
            return new Y(a,b)
        });
        y("cast.player.api.CreateSmoothStreamingProtocol", function(a) {
            Ef(3);
            return new xk(a)
        });
    }
).call(window);
