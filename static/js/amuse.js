/**
 * Created at 2020/05/14 16:57.
 *
 * @author Liangcheng Juves
 *
 */


let doc = document;
let win = window;
let xhr = (() =>
  win.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP"))();

let wol = (handler) => void (win.onload = handler);

let html = firstEleByTagName("html");
let head = firstEleByTagName("head");
let metas = elesByTagName("meta");
let links = elesByTagName("link");
let title = firstEleByTagName("title");
let body = firstEleByTagName("body");

let print = (data) => void console.log(data);
let clerr = (data) => void console.error(data);
let clwarn = (data) => void console.warn(data);

let docWrite = (text) => doc.write(text);

let wlhref = (src) => void (win.location.href = src);
let whisgo = (num) => void win.history.go(num);
let whisback = () => void win.history.back();
let whisforward = () => void win.history.forward();

let ele = (eleId) => doc.getElementById(eleId);
let eleClick = (eleId, handler) => void (ele(eleId).onclick = handler());
let eleFocus = (eleId, handler) => void (ele(eleId).onfocus = handler());

let elesByName = (eleName) => doc.getElementsByName(eleName);
function elesByTagName(qualifiedName) {
  return doc.getElementsByTagName(qualifiedName);
}
function firstEleByTagName(qualifiedName) {
  return elesByTagName(qualifiedName)[0];
}
let elesByTagNameNS = (namespaceURI, localName) =>
  doc.getElementsByTagNameNS(namespaceURI, localName);

let elesByClassName = (classNames) => doc.getElementsByClassName(classNames);

let newEleOf = (tagName, attr) => {
  let ele = doc.createElement(tagName);
  if (null != attr && undefined != attr) {
    for (let attrName in attr) {
      ele[attrName] = attr[attrName];
    }
  }
  return ele;
};
let beforeTitleOf = (...eles) => {
  if (null != eles && undefined != eles) {
    for (let l of links) {
      let lrel = l.getAttribute("rel");
      if (null != lrel && undefined != lrel && "shortcut icon" == lrel) {
        eles.forEach((ele) => head.insertBefore(ele, l.nextElementSibling));
      }
    }
  }
};
let afterMetaCharsetOf = (...eles) => {
  if (null != eles && undefined != eles) {
    for (let m of metas) {
      let metaCharsetAttr = m.getAttribute("charset");
      if (
        null != metaCharsetAttr &&
        undefined != metaCharsetAttr &&
        "" != metaCharsetAttr
      ) {
        eles.forEach((ele) => head.insertBefore(ele, m.nextElementSibling));
      }
    }
  }
};

let beforeEndBodyOf = (...eles) => {
  if (null != eles && undefined != eles) {
    eles.forEach((ele) =>
      body.insertBefore(ele, body.lastElementChild.nextElementSibling)
    );
  }
};

let afterStartBodyOf = (...eles) => {
  if (null != eles && undefined != eles) {
    eles.forEach((ele) => body.insertBefore(ele, body.firstElementChild));
  }
};

let docQuery = (selectors) => doc.querySelector(selectors);

let firstOfDocQuery = (selectors) => docQueryAll(selectors)[0];

let docQueryAll = (selectors) => doc.querySelectorAll(selectors);

let loadDarkMode = () => void jsof("dark_mode.js");

(() => {
  // let cmhd = `<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0,
  // maximum-scale=1.0, minimum-scale=1.0">
  //  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //  <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico">
  //  <link rel="shortcut icon" type="image/x-icon" href="/static/img/favicon.ico">`;

  let meta = newEleOf("meta", {
    name: "viewport",
    content: `width=device-width, user-scalable=no, initial-scale=1.0, 
    maximum-scale=1.0, minimum-scale=1.0`,
  });

  let _meta = newEleOf("meta", {
    httpEquiv: "X-UA-Compatible",
    content: "ie=edge",
  });

  let iconType = "image/x-icon";
  let iconHref = "/static/img/favicon.ico";

  let linkIcon = newEleOf("link", {
    rel: "icon",
    type: iconType,
    href: iconHref,
  });

  let linkShortIcon = new newEleOf("link", {
    rel: "shortcut icon",
    type: iconType,
    href: iconHref,
  });

  afterMetaCharsetOf(linkShortIcon, linkIcon, _meta, meta);
})();

let titleOf = (text) =>
  ((ele) => {
    ele.innerText = text;
    beforeTitleOf(ele);
  })(newEleOf("title"));

let strOfCss = (target, attr) => {
  if (null != attr && undefined != attr) {
    let append = "";
    for (let attrName in attr) {
      append += `${attrName}: ${attr[attrName]};`;
    }
    append = !"" == append ? append.substr(0, append.length - 1) : append;
    return `${target} { ${append} }`;
  }
};

let fontOf = (family) => {
  let styleOfFont = newEleOf("style", {
    rel: "stylesheet",
    type: "text/css",
  });
  styleOfFont.innerHTML = strOfCss("*", {
    "font-family": family,
  });
  beforeTitleOf(styleOfFont);
};

let useDefFont = () =>
  fontOf(`"Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB",
"Heiti SC","WenQuanYi Micro Hei",sans-serif`);

let loadJQ = () =>
  void afterMetaCharsetOf(
    `<script src="//code.jquery.com/jquery-3.5.1.min.js"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"></script>`
  );

let loadJQSlim = () => {
  afterMetaCharsetOf(
    `<script src="//code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="
      crossorigin="anonymous"></script>`
  );
};

let jsof = (scriptAttr) => {
  beforeTitleOf(newEleOf("script", scriptAttr));
};

let loadVue = () => jsof({ src: "//cdn.jsdelivr.net/npm/vue@2.6.11" });

let loadBootstrap = () =>
  afterMetaCharsetOf(
    `<link rel="stylesheet"
    href="//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous">
    <script src="//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"></script>`
  );

let loadFullBootstrap = () => {
  loadBootstrap();
  loadJQSlim();
  afterMetaCharsetOf(
    `<script  src="//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>`
  );
};

// Browser environment sniffing
// Vue 2.6.11
let inBrowser = typeof window !== "undefined";
let inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf("msie 9.0") > 0;
let isEdge = UA && UA.indexOf("edge/") > 0;
let isAndroid = (UA && UA.indexOf("android") > 0) || weexPlatform === "android";
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === "ios";
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
let isPhantomJS = UA && /phantomjs/.test(UA);
let isFF = UA && UA.match(/firefox\/(\d+)/);


