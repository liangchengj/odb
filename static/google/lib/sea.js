!(function (e, t) {
  if (!e.seajs) {
    var r = (e.seajs = { version: "3.0.0" }),
      n = (r.data = {}),
      i = P("Object"),
      s = P("String"),
      a = Array.isArray || P("Array"),
      o = P("Function"),
      u = 0,
      c = (n.events = {});
    (r.on = function (e, t) {
      return (c[e] || (c[e] = [])).push(t), r;
    }),
      (r.off = function (e, t) {
        if (!e && !t) return (c = n.events = {}), r;
        var i = c[e];
        if (i)
          if (t)
            for (var s = i.length - 1; s >= 0; s--)
              i[s] === t && i.splice(s, 1);
          else delete c[e];
        return r;
      });
    var f = (r.emit = function (e, t) {
        var n = c[e];
        if (n) for (var i = 0, s = (n = n.slice()).length; i < s; i++) n[i](t);
        return r;
      }),
      l = /[^?#]*\//,
      d = /\/\.\//g,
      h = /\/[^\/]+\/\.\.\//,
      v = /([^:\/])\/+\//g,
      p = /^([^\/:]+)(\/.+)$/,
      y = /{([^{]+)}/g,
      g = /^\/\/.|:\//,
      E = /^.*?\/\/.*?\//;
    r.resolve = function (e, t) {
      if (!e) return "";
      var r, i, a;
      (e = H(e)),
        (e = H(
          (e = (function (e) {
            var t,
              r = n.paths;
            return (
              r && (t = e.match(p)) && s(r[t[1]]) && (e = r[t[1]] + t[2]), e
            );
          })(e))
        )),
        (e = H(
          (e = (function (e) {
            var t = n.vars;
            return (
              t &&
                e.indexOf("{") > -1 &&
                (e = e.replace(y, function (e, r) {
                  return s(t[r]) ? t[r] : e;
                })),
              e
            );
          })(e))
        )),
        (i = (r = e).length - 1);
      var u = z(
        (e = H(
          (e =
            35 === (a = r.charCodeAt(i))
              ? r.substring(0, i)
              : ".js" === r.substring(i - 2) || r.indexOf("?") > 0 || 47 === a
              ? r
              : r + ".js")
        )),
        t
      );
      return (u = (function (e) {
        var t = n.map,
          r = e;
        if (t)
          for (var i = 0, s = t.length; i < s; i++) {
            var a = t[i];
            if ((r = o(a) ? a(e) || e : e.replace(a[0], a[1])) !== e) break;
          }
        return r;
      })((u = H(u))));
    };
    var m,
      x,
      b,
      w,
      O =
        "undefined" == typeof window &&
        "undefined" != typeof importScripts &&
        o(importScripts),
      A =
        !location.href || /^(about|blob):/.test(location.href)
          ? ""
          : V(location.href);
    if (O) {
      var _, D;
      try {
        throw new Error();
      } catch (e) {
        _ = e.stack.split("\n");
      }
      _.shift();
      for (
        var q = /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i;
        _.length > 0;

      ) {
        var S = _.shift();
        if (null != (D = q.exec(S))) break;
      }
      if (null != D) var N = /(.*?):\d+:\d+\)?$/.exec(D[1])[1];
      (x = N), (m = V(N || A)), "" === A && (A = m);
    } else {
      var T = (I = document).scripts,
        C = I.getElementById("seajsnode") || T[T.length - 1];
      m = V((x = (b = C).hasAttribute ? b.src : b.getAttribute("src", 4)) || A);
    }
    if (O) {
      r.request = function (e, t, r) {
        var n;
        try {
          importScripts(e);
        } catch (e) {
          n = e;
        }
        t(n);
      };
    } else {
      var I,
        U,
        k =
          (I = document).head ||
          I.getElementsByTagName("head")[0] ||
          I.documentElement,
        G = k.getElementsByTagName("base")[0];
      r.request = function (e, t, r) {
        var i = I.createElement("script");
        if (r) {
          var s = o(r) ? r(e) : r;
          s && (i.charset = s);
        }
        !(function (e, t, r) {
          function i(r) {
            (e.onload = e.onerror = e.onreadystatechange = null),
              n.debug || k.removeChild(e),
              (e = null),
              t(r);
          }
          "onload" in e
            ? ((e.onload = i),
              (e.onerror = function () {
                f("error", { uri: r, node: e }), i(!0);
              }))
            : (e.onreadystatechange = function () {
                /loaded|complete/.test(e.readyState) && i();
              });
        })(i, t, e),
          (i.async = !0),
          (i.src = e),
          (U = i),
          G ? k.insertBefore(i, G) : k.appendChild(i),
          (U = null);
      };
    }
    var R,
      L = (r.cache = {}),
      j = {},
      $ = {},
      X = {},
      B = (K.STATUS = {
        FETCHING: 1,
        SAVED: 2,
        LOADING: 3,
        LOADED: 4,
        EXECUTING: 5,
        EXECUTED: 6,
        ERROR: 7,
      });
    (K.prototype.resolve = function () {
      for (var e = this.dependencies, t = [], r = 0, n = e.length; r < n; r++)
        t[r] = K.resolve(e[r], this.uri);
      return t;
    }),
      (K.prototype.pass = function () {
        for (
          var e = this.dependencies.length, t = 0;
          t < this._entry.length;
          t++
        ) {
          for (var r = this._entry[t], n = 0, i = 0; i < e; i++) {
            var s = this.deps[this.dependencies[i]];
            s.status < B.LOADED &&
              !r.history.hasOwnProperty(s.uri) &&
              ((r.history[s.uri] = !0),
              n++,
              s._entry.push(r),
              s.status === B.LOADING && s.pass());
          }
          n > 0 && ((r.remain += n - 1), this._entry.shift(), t--);
        }
      }),
      (K.prototype.load = function () {
        if (!(this.status >= B.LOADING)) {
          this.status = B.LOADING;
          var e = this.resolve();
          f("load", e);
          for (var t = 0, r = e.length; t < r; t++)
            this.deps[this.dependencies[t]] = K.get(e[t]);
          if ((this.pass(), this._entry.length)) this.onload();
          else {
            var n,
              i = {};
            for (t = 0; t < r; t++)
              (n = L[e[t]]).status < B.FETCHING
                ? n.fetch(i)
                : n.status === B.SAVED && n.load();
            for (var s in i) i.hasOwnProperty(s) && i[s]();
          }
        }
      }),
      (K.prototype.onload = function () {
        this.status = B.LOADED;
        for (var e = 0, t = (this._entry || []).length; e < t; e++) {
          var r = this._entry[e];
          0 == --r.remain && r.callback();
        }
        delete this._entry;
      }),
      (K.prototype.error = function () {
        this.onload(), (this.status = B.ERROR);
      }),
      (K.prototype.exec = function () {
        var e = this;
        if (e.status >= B.EXECUTING) return e.exports;
        if (
          ((e.status = B.EXECUTING),
          e._entry && !e._entry.length && delete e._entry,
          e.hasOwnProperty("factory"))
        ) {
          var t = e.uri;
          (i.resolve = function (e) {
            return K.resolve(e, t);
          }),
            (i.async = function (e, r) {
              return K.use(e, r, t + "_async_" + F()), i;
            });
          var r = e.factory,
            n = o(r) ? r(i, (e.exports = {}), e) : r;
          return (
            void 0 === n && (n = e.exports),
            delete e.factory,
            (e.exports = n),
            (e.status = B.EXECUTED),
            f("exec", e),
            e.exports
          );
        }
        function i(t) {
          var r = e.deps[t] || K.get(i.resolve(t));
          if (r.status == B.ERROR)
            throw new Error("module was broken: " + r.uri);
          return r.exec();
        }
        e.non = !0;
      }),
      (K.prototype.fetch = function (e) {
        var t = this.uri;
        this.status = B.FETCHING;
        var i = { uri: t };
        f("fetch", i);
        var s = i.requestUri || t;
        function a() {
          r.request(i.requestUri, i.onRequest, i.charset);
        }
        s && !$.hasOwnProperty(s)
          ? j.hasOwnProperty(s)
            ? X[s].push(this)
            : ((j[s] = !0),
              (X[s] = [this]),
              f(
                "request",
                (i = {
                  uri: t,
                  requestUri: s,
                  onRequest: function (e) {
                    delete j[s], ($[s] = !0), R && (K.save(t, R), (R = null));
                    var r,
                      n = X[s];
                    delete X[s];
                    for (; (r = n.shift()); ) !0 === e ? r.error() : r.load();
                  },
                  charset: o(n.charset) ? n.charset(s) || "utf-8" : n.charset,
                })
              ),
              i.requested || (e ? (e[i.requestUri] = a) : a()))
          : this.load();
      }),
      (K.resolve = function (e, t) {
        var n = { id: e, refUri: t };
        return f("resolve", n), n.uri || r.resolve(n.id, t);
      }),
      (K.define = function (e, t, r) {
        var n = arguments.length;
        1 === n
          ? ((r = e), (e = void 0))
          : 2 === n && ((r = t), a(e) ? ((t = e), (e = void 0)) : (t = void 0)),
          !a(t) && o(r) && (t = J(r.toString()));
        var i = { id: e, uri: K.resolve(e), deps: t, factory: r };
        if (!O && !i.uri && I.attachEvent) {
          var s = M();
          s && (i.uri = s.src);
        }
        f("define", i), i.uri ? K.save(i.uri, i) : (R = i);
      }),
      (K.save = function (e, t) {
        var r = K.get(e);
        r.status < B.SAVED &&
          ((r.id = t.id || e),
          (r.dependencies = t.deps || []),
          (r.factory = t.factory),
          (r.status = B.SAVED),
          f("save", r));
      }),
      (K.get = function (e, t) {
        return L[e] || (L[e] = new K(e, t));
      }),
      (K.use = function (t, r, n) {
        var i = K.get(n, a(t) ? t : [t]);
        i._entry.push(i),
          (i.history = {}),
          (i.remain = 1),
          (i.callback = function () {
            for (var t = [], n = i.resolve(), s = 0, a = n.length; s < a; s++)
              t[s] = L[n[s]].exec();
            r && r.apply(e, t),
              delete i.callback,
              delete i.history,
              delete i.remain,
              delete i._entry;
          }),
          i.load();
      }),
      (r.use = function (e, t) {
        return K.use(e, t, n.cwd + "_use_" + F()), r;
      }),
      (K.define.cmd = {}),
      (e.define = K.define),
      (r.Module = K),
      (n.fetchedList = $),
      (n.cid = F),
      (r.require = function (e) {
        var t = K.get(K.resolve(e));
        return t.status < B.EXECUTING && (t.onload(), t.exec()), t.exports;
      }),
      (n.base = m),
      (n.dir = m),
      (n.loader = x),
      (n.cwd = A),
      (n.charset = "utf-8"),
      (r.config = function (e) {
        for (var t in e) {
          var s = e[t],
            o = n[t];
          if (o && i(o)) for (var u in s) o[u] = s[u];
          else
            a(o)
              ? (s = o.concat(s))
              : "base" === t && ("/" !== s.slice(-1) && (s += "/"), (s = z(s))),
              (n[t] = s);
        }
        return f("config", e), r;
      });
  }
  function P(e) {
    return function (t) {
      return {}.toString.call(t) == "[object " + e + "]";
    };
  }
  function F() {
    return u++;
  }
  function V(e) {
    return e.match(l)[0];
  }
  function H(e) {
    var t = n.alias;
    return t && s(t[e]) ? t[e] : e;
  }
  function z(e, t) {
    var r,
      i = e.charCodeAt(0);
    if (g.test(e)) r = e;
    else if (46 === i) r = (t ? V(t) : n.cwd) + e;
    else if (47 === i) {
      var s = n.cwd.match(E);
      r = s ? s[0] + e.substring(1) : e;
    } else r = n.base + e;
    return (
      0 === r.indexOf("//") && (r = location.protocol + r),
      (function (e) {
        for (e = (e = e.replace(d, "/")).replace(v, "$1/"); e.match(h); )
          e = e.replace(h, "/");
        return e;
      })(r)
    );
  }
  function M() {
    if (U) return U;
    if (w && "interactive" === w.readyState) return w;
    for (
      var e = k.getElementsByTagName("script"), t = e.length - 1;
      t >= 0;
      t--
    ) {
      var r = e[t];
      if ("interactive" === r.readyState) return (w = r);
    }
  }
  function J(e) {
    if (-1 == e.indexOf("require")) return [];
    for (
      var t, r = 0, n = e.length, i = 1, s = 0, a = 0, o = [], u = [];
      r < n;

    )
      c(),
        /\s/.test(t) ||
          ('"' == t || "'" == t
            ? (f(), (i = 1))
            : "/" == t
            ? (c(),
              "/" == t
                ? -1 == (r = e.indexOf("\n", r)) && (r = e.length)
                : "*" == t
                ? -1 == (r = e.indexOf("*/", r))
                  ? (r = n)
                  : (r += 2)
                : i
                ? (l(), (i = 0))
                : (r--, (i = 1)))
            : /[a-z_$]/i.test(t)
            ? d()
            : /\d/.test(t) || ("." == t && /\d/.test(e.charAt(r)))
            ? h()
            : "(" == t
            ? (o.push(a), (i = 1))
            : ")" == t
            ? (i = o.pop())
            : ((i = "]" != t), (s = 0)));
    return u;
    function c() {
      t = e.charAt(r++);
    }
    function f() {
      var i = r,
        a = t,
        o = e.indexOf(a, i);
      if (-1 == o) r = n;
      else if ("\\" != e.charAt(o - 1)) r = o + 1;
      else
        for (; r < n; )
          if ((c(), "\\" == t)) r++;
          else if (t == a) break;
      s && (u.push(e.slice(i, r - 1)), (s = 0));
    }
    function l() {
      for (r--; r < n; )
        if ((c(), "\\" == t)) r++;
        else {
          if ("/" == t) break;
          if ("[" == t)
            for (; r < n; )
              if ((c(), "\\" == t)) r++;
              else if ("]" == t) break;
        }
    }
    function d() {
      var t = e.slice(r - 1),
        n = /^[\w$]+/.exec(t)[0];
      (a = { if: 1, for: 1, while: 1, with: 1 }[n]),
        (i = {
          break: 1,
          case: 1,
          continue: 1,
          debugger: 1,
          delete: 1,
          do: 1,
          else: 1,
          false: 1,
          if: 1,
          in: 1,
          instanceof: 1,
          return: 1,
          typeof: 1,
          void: 1,
        }[n]),
        (s = /^require\s*\(\s*(['"]).+?\1\s*\)/.test(t))
          ? ((n = /^require\s*\(\s*['"]/.exec(t)[0]), (r += n.length - 2))
          : (r += /^[\w$]+(?:\s*\.\s*[\w$]+)*/.exec(t)[0].length - 1);
    }
    function h() {
      var n,
        s = e.slice(r - 1);
      (n =
        "." == t
          ? /^\.\d+(?:E[+-]?\d*)?\s*/i.exec(s)[0]
          : /^0x[\da-f]*/i.test(s)
          ? /^0x[\da-f]*\s*/i.exec(s)[0]
          : /^\d+\.?\d*(?:E[+-]?\d*)?\s*/i.exec(s)[0]),
        (r += n.length - 1),
        (i = 0);
    }
  }
  function K(e, t) {
    (this.uri = e),
      (this.dependencies = t || []),
      (this.deps = {}),
      (this.status = 0),
      (this._entry = []);
  }
})(this);
