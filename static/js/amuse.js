/**
 * Created at 2020/05/14 16:57.
 *
 * @author Liangcheng Juves
 *
 */
let strContainChk = (target, ch) => target.indexOf(ch) != -1;
let paramIsOK = (target) => null != target && undefined != target;

let doc = document;
let win = window;
let xhr = (() =>
  win.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP"))();

let wol = (handler) => (win.onload = handler);

let html = firstEleByTagName("html");
let head = firstEleByTagName("head");
let metas = elesByTagName("meta");
let links = elesByTagName("link");
let title = firstEleByTagName("title");
let body = firstEleByTagName("body");

let print = (data) => console.log(data);
let cslerr = (data) => console.error(data);
let cslwarn = (data) => console.warn(data);

let docWrite = (text) => doc.write(text);

let wlhref = (src) => (win.location.href = src);
let whisgo = (num) => win.history.go(num);
let whisback = () => win.history.back();
let whisforward = () => win.history.forward();

let ele = (eleId) => doc.getElementById(eleId);
let eleClick = (eleId, handler) => (ele(eleId).onclick = handler());
let eleFocus = (eleId, handler) => (ele(eleId).onfocus = handler());

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
  if (paramIsOK(attr)) {
    for (let attrName in attr) {
      ele[attrName] = attr[attrName];
    }
  }
  return ele;
};
let beforeTitleOf = (...eles) => {
  if (paramIsOK(eles)) {
    for (let l of links) {
      let lrel = l.getAttribute("rel");
      if (paramIsOK(lrel) && "shortcut icon" == lrel) {
        eles.forEach((ele) => head.insertBefore(ele, l.nextElementSibling));
      }
    }
  }
};
let afterMetaCharsetOf = (...eles) => {
  if (paramIsOK(eles)) {
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
  if (paramIsOK(eles)) {
    eles.forEach((ele) =>
      body.insertBefore(ele, body.lastElementChild.nextElementSibling)
    );
  }
};

let afterStartBodyOf = (...eles) => {
  if (paramIsOK(eles)) {
    eles.forEach((ele) => body.insertBefore(ele, body.firstElementChild));
  }
};

let docQuery = (selectors) => doc.querySelector(selectors);

let firstOfDocQuery = (selectors) => docQueryAll(selectors)[0];

let docQueryAll = (selectors) => doc.querySelectorAll(selectors);

(() => {
  let meta = newEleOf("meta", {
    name: "viewport",
    content: `width=device-width, user-scalable=no, initial-scale=1.0, 
    maximum-scale=1.0, minimum-scale=1.0`,
  });

  let _meta = newEleOf("meta", {
    httpEquiv: "X-UA-Compatible",
    content: "ie=edge",
  });

  let iconType = mediaTypeOf(".ico");
  let iconHref = "/static/img/favicon.ico";

  let linkIcon = newEleOf("link", {
    rel: "icon",
    type: iconType,
    href: iconHref,
  });

  let linkShortIcon = newEleOf("link", {
    rel: "shortcut icon",
    type: iconType,
    href: iconHref,
  });

  afterMetaCharsetOf(linkShortIcon, linkIcon, _meta, meta);
})();

let jsof = (src, beforeTitle, integrity, crossorigin) => {
  let scriptAttr = { src: src };
  if (paramIsOK(integrity)) {
    scriptAttr[integrity] = integrity;
  }
  if (strContainChk(src, "//")) {
    scriptAttr[crossorigin] = paramIsOK[crossorigin]
      ? crossorigin
      : "anonymous";
  }
  let scriptEle = newEleOf("script", scriptAttr);
  if (beforeTitle) {
    beforeTitleOf(scriptEle);
  } else if (!paramIsOK(beforeTitle) || !beforeTitle) {
    beforeEndBodyOf(scriptEle);
  }
};

let loadVue = () => jsof("//cdn.jsdelivr.net/npm/vue@2.6.11", true);

let linkStyle = (href, beforeTitle, integrity, crossorigin) => {
  let cssAttr = {
    rel: "stylesheet",
    type: mediaTypeOf(".css"),
    href: href,
  };
  if (paramIsOK(integrity)) {
    cssAttr[integrity] = integrity;
  }
  if (strContainChk(href, "//")) {
    cssAttr[crossorigin] = paramIsOK[crossorigin] ? crossorigin : "anonymous";
  }
  let cssLinkEle = newEleOf("link", cssAttr);
  if (beforeTitle) {
    beforeTitleOf(cssLinkEle);
  } else if (!paramIsOK(beforeTitle) || !beforeTitle) {
    beforeEndBodyOf(cssLinkEle);
  }
};

let strOfCss = (target, attr) => {
  if (paramIsOK(target) && paramIsOK(attr)) {
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
    type: mediaTypeOf(".css"),
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
  jsof(
    "//code.jquery.com/jquery-3.5.1.min.js",
    true,
    "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  );

// `<script src="//code.jquery.com/jquery-3.5.1.min.js"
// integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
// crossorigin="anonymous"></script>`

// let loadJQSlim = () => {
//   afterMetaCharsetOf(
//     `<script src="//code.jquery.com/jquery-3.5.1.slim.min.js"
//       integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="
//       crossorigin="anonymous"></script>`
//   );
// };

let loadJQSlim = () =>
  jsof(
    "//code.jquery.com/jquery-3.5.1.slim.min.js",
    true,
    "sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="
  );

let loadBootstrap = () => {
  linkStyle(
    "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
    true,
    "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  );
  jsof(
    "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
    true,
    "sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
  );
};

let loadFullBootstrap = () => {
  loadBootstrap();
  loadJQSlim();
  jsof(
    "//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    true,
    "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
  );
};

let initialize = (title, styleList, scriptList, fontList) => {
  if (paramIsOK(title)) {
    let titleEle = newEleOf("title");
    titleEle.innerText = title;
    beforeTitleOf(ele);
  }
  if (paramIsOK(styleList) && styleList instanceof Array) {
    styleList.forEach((href) => linkStyle(href, true));
  }
  if (paramIsOK(scriptList) && scriptList instanceof Array) {
    scriptList.forEach((src) => jsof(src));
  }
  if (paramIsOK(fontList) && fontList instanceof Array) {
    fontList.forEach((fontFamily) => fontOf(fontFamily));
  } else {
    useDefFont();
  }
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

const MIME_MAPPING = [
  {
    extension: "123",
    "mime-type": "application/vnd.lotus-1-2-3",
  },
  {
    extension: "3dml",
    "mime-type": "text/vnd.in3d.3dml",
  },
  {
    extension: "3ds",
    "mime-type": "image/x-3ds",
  },
  {
    extension: "3g2",
    "mime-type": "video/3gpp2",
  },
  {
    extension: "3gp",
    "mime-type": "video/3gpp",
  },
  {
    extension: "7z",
    "mime-type": "application/x-7z-compressed",
  },
  {
    extension: "aab",
    "mime-type": "application/x-authorware-bin",
  },
  {
    extension: "aac",
    "mime-type": "audio/x-aac",
  },
  {
    extension: "aam",
    "mime-type": "application/x-authorware-map",
  },
  {
    extension: "aas",
    "mime-type": "application/x-authorware-seg",
  },
  {
    extension: "abs",
    "mime-type": "audio/x-mpeg",
  },
  {
    extension: "abw",
    "mime-type": "application/x-abiword",
  },
  {
    extension: "ac",
    "mime-type": "application/pkix-attr-cert",
  },
  {
    extension: "acc",
    "mime-type": "application/vnd.americandynamics.acc",
  },
  {
    extension: "ace",
    "mime-type": "application/x-ace-compressed",
  },
  {
    extension: "acu",
    "mime-type": "application/vnd.acucobol",
  },
  {
    extension: "acutc",
    "mime-type": "application/vnd.acucorp",
  },
  {
    extension: "adp",
    "mime-type": "audio/adpcm",
  },
  {
    extension: "aep",
    "mime-type": "application/vnd.audiograph",
  },
  {
    extension: "afm",
    "mime-type": "application/x-font-type1",
  },
  {
    extension: "afp",
    "mime-type": "application/vnd.ibm.modcap",
  },
  {
    extension: "ahead",
    "mime-type": "application/vnd.ahead.space",
  },
  {
    extension: "ai",
    "mime-type": "application/postscript",
  },
  {
    extension: "aif",
    "mime-type": "audio/x-aiff",
  },
  {
    extension: "aifc",
    "mime-type": "audio/x-aiff",
  },
  {
    extension: "aiff",
    "mime-type": "audio/x-aiff",
  },
  {
    extension: "aim",
    "mime-type": "application/x-aim",
  },
  {
    extension: "air",
    "mime-type": "application/vnd.adobe.air-application-installer-package+zip",
  },
  {
    extension: "ait",
    "mime-type": "application/vnd.dvb.ait",
  },
  {
    extension: "ami",
    "mime-type": "application/vnd.amiga.ami",
  },
  {
    extension: "anx",
    "mime-type": "application/annodex",
  },
  {
    extension: "apk",
    "mime-type": "application/vnd.android.package-archive",
  },
  {
    extension: "appcache",
    "mime-type": "text/cache-manifest",
  },
  {
    extension: "application",
    "mime-type": "application/x-ms-application",
  },
  {
    extension: "apr",
    "mime-type": "application/vnd.lotus-approach",
  },
  {
    extension: "arc",
    "mime-type": "application/x-freearc",
  },
  {
    extension: "art",
    "mime-type": "image/x-jg",
  },
  {
    extension: "asc",
    "mime-type": "application/pgp-signature",
  },
  {
    extension: "asf",
    "mime-type": "video/x-ms-asf",
  },
  {
    extension: "asm",
    "mime-type": "text/x-asm",
  },
  {
    extension: "aso",
    "mime-type": "application/vnd.accpac.simply.aso",
  },
  {
    extension: "asx",
    "mime-type": "video/x-ms-asf",
  },
  {
    extension: "atc",
    "mime-type": "application/vnd.acucorp",
  },
  {
    extension: "atom",
    "mime-type": "application/atom+xml",
  },
  {
    extension: "atomcat",
    "mime-type": "application/atomcat+xml",
  },
  {
    extension: "atomsvc",
    "mime-type": "application/atomsvc+xml",
  },
  {
    extension: "atx",
    "mime-type": "application/vnd.antix.game-component",
  },
  {
    extension: "au",
    "mime-type": "audio/basic",
  },
  {
    extension: "avi",
    "mime-type": "video/x-msvideo",
  },
  {
    extension: "avx",
    "mime-type": "video/x-rad-screenplay",
  },
  {
    extension: "aw",
    "mime-type": "application/applixware",
  },
  {
    extension: "axa",
    "mime-type": "audio/annodex",
  },
  {
    extension: "axv",
    "mime-type": "video/annodex",
  },
  {
    extension: "azf",
    "mime-type": "application/vnd.airzip.filesecure.azf",
  },
  {
    extension: "azs",
    "mime-type": "application/vnd.airzip.filesecure.azs",
  },
  {
    extension: "azw",
    "mime-type": "application/vnd.amazon.ebook",
  },
  {
    extension: "bat",
    "mime-type": "application/x-msdownload",
  },
  {
    extension: "bcpio",
    "mime-type": "application/x-bcpio",
  },
  {
    extension: "bdf",
    "mime-type": "application/x-font-bdf",
  },
  {
    extension: "bdm",
    "mime-type": "application/vnd.syncml.dm+wbxml",
  },
  {
    extension: "bed",
    "mime-type": "application/vnd.realvnc.bed",
  },
  {
    extension: "bh2",
    "mime-type": "application/vnd.fujitsu.oasysprs",
  },
  {
    extension: "bin",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "blb",
    "mime-type": "application/x-blorb",
  },
  {
    extension: "blorb",
    "mime-type": "application/x-blorb",
  },
  {
    extension: "bmi",
    "mime-type": "application/vnd.bmi",
  },
  {
    extension: "bmp",
    "mime-type": "image/bmp",
  },
  {
    extension: "body",
    "mime-type": "text/html",
  },
  {
    extension: "book",
    "mime-type": "application/vnd.framemaker",
  },
  {
    extension: "box",
    "mime-type": "application/vnd.previewsystems.box",
  },
  {
    extension: "boz",
    "mime-type": "application/x-bzip2",
  },
  {
    extension: "bpk",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "btif",
    "mime-type": "image/prs.btif",
  },
  {
    extension: "bz",
    "mime-type": "application/x-bzip",
  },
  {
    extension: "bz2",
    "mime-type": "application/x-bzip2",
  },
  {
    extension: "c",
    "mime-type": "text/x-c",
  },
  {
    extension: "c11amc",
    "mime-type": "application/vnd.cluetrust.cartomobile-config",
  },
  {
    extension: "c11amz",
    "mime-type": "application/vnd.cluetrust.cartomobile-config-pkg",
  },
  {
    extension: "c4d",
    "mime-type": "application/vnd.clonk.c4group",
  },
  {
    extension: "c4f",
    "mime-type": "application/vnd.clonk.c4group",
  },
  {
    extension: "c4g",
    "mime-type": "application/vnd.clonk.c4group",
  },
  {
    extension: "c4p",
    "mime-type": "application/vnd.clonk.c4group",
  },
  {
    extension: "c4u",
    "mime-type": "application/vnd.clonk.c4group",
  },
  {
    extension: "cab",
    "mime-type": "application/vnd.ms-cab-compressed",
  },
  {
    extension: "caf",
    "mime-type": "audio/x-caf",
  },
  {
    extension: "cap",
    "mime-type": "application/vnd.tcpdump.pcap",
  },
  {
    extension: "car",
    "mime-type": "application/vnd.curl.car",
  },
  {
    extension: "cat",
    "mime-type": "application/vnd.ms-pki.seccat",
  },
  {
    extension: "cb7",
    "mime-type": "application/x-cbr",
  },
  {
    extension: "cba",
    "mime-type": "application/x-cbr",
  },
  {
    extension: "cbr",
    "mime-type": "application/x-cbr",
  },
  {
    extension: "cbt",
    "mime-type": "application/x-cbr",
  },
  {
    extension: "cbz",
    "mime-type": "application/x-cbr",
  },
  {
    extension: "cc",
    "mime-type": "text/x-c",
  },
  {
    extension: "cct",
    "mime-type": "application/x-director",
  },
  {
    extension: "ccxml",
    "mime-type": "application/ccxml+xml",
  },
  {
    extension: "cdbcmsg",
    "mime-type": "application/vnd.contact.cmsg",
  },
  {
    extension: "cdf",
    "mime-type": "application/x-cdf",
  },
  {
    extension: "cdkey",
    "mime-type": "application/vnd.mediastation.cdkey",
  },
  {
    extension: "cdmia",
    "mime-type": "application/cdmi-capability",
  },
  {
    extension: "cdmic",
    "mime-type": "application/cdmi-container",
  },
  {
    extension: "cdmid",
    "mime-type": "application/cdmi-domain",
  },
  {
    extension: "cdmio",
    "mime-type": "application/cdmi-object",
  },
  {
    extension: "cdmiq",
    "mime-type": "application/cdmi-queue",
  },
  {
    extension: "cdx",
    "mime-type": "chemical/x-cdx",
  },
  {
    extension: "cdxml",
    "mime-type": "application/vnd.chemdraw+xml",
  },
  {
    extension: "cdy",
    "mime-type": "application/vnd.cinderella",
  },
  {
    extension: "cer",
    "mime-type": "application/pkix-cert",
  },
  {
    extension: "cfs",
    "mime-type": "application/x-cfs-compressed",
  },
  {
    extension: "cgm",
    "mime-type": "image/cgm",
  },
  {
    extension: "chat",
    "mime-type": "application/x-chat",
  },
  {
    extension: "chm",
    "mime-type": "application/vnd.ms-htmlhelp",
  },
  {
    extension: "chrt",
    "mime-type": "application/vnd.kde.kchart",
  },
  {
    extension: "cif",
    "mime-type": "chemical/x-cif",
  },
  {
    extension: "cii",
    "mime-type": "application/vnd.anser-web-certificate-issue-initiation",
  },
  {
    extension: "cil",
    "mime-type": "application/vnd.ms-artgalry",
  },
  {
    extension: "cla",
    "mime-type": "application/vnd.claymore",
  },
  {
    extension: "class",
    "mime-type": "application/java",
  },
  {
    extension: "clkk",
    "mime-type": "application/vnd.crick.clicker.keyboard",
  },
  {
    extension: "clkp",
    "mime-type": "application/vnd.crick.clicker.palette",
  },
  {
    extension: "clkt",
    "mime-type": "application/vnd.crick.clicker.template",
  },
  {
    extension: "clkw",
    "mime-type": "application/vnd.crick.clicker.wordbank",
  },
  {
    extension: "clkx",
    "mime-type": "application/vnd.crick.clicker",
  },
  {
    extension: "clp",
    "mime-type": "application/x-msclip",
  },
  {
    extension: "cmc",
    "mime-type": "application/vnd.cosmocaller",
  },
  {
    extension: "cmdf",
    "mime-type": "chemical/x-cmdf",
  },
  {
    extension: "cml",
    "mime-type": "chemical/x-cml",
  },
  {
    extension: "cmp",
    "mime-type": "application/vnd.yellowriver-custom-menu",
  },
  {
    extension: "cmx",
    "mime-type": "image/x-cmx",
  },
  {
    extension: "cod",
    "mime-type": "application/vnd.rim.cod",
  },
  {
    extension: "com",
    "mime-type": "application/x-msdownload",
  },
  {
    extension: "conf",
    "mime-type": "text/plain",
  },
  {
    extension: "cpio",
    "mime-type": "application/x-cpio",
  },
  {
    extension: "cpp",
    "mime-type": "text/x-c",
  },
  {
    extension: "cpt",
    "mime-type": "application/mac-compactpro",
  },
  {
    extension: "crd",
    "mime-type": "application/x-mscardfile",
  },
  {
    extension: "crl",
    "mime-type": "application/pkix-crl",
  },
  {
    extension: "crt",
    "mime-type": "application/x-x509-ca-cert",
  },
  {
    extension: "cryptonote",
    "mime-type": "application/vnd.rig.cryptonote",
  },
  {
    extension: "csh",
    "mime-type": "application/x-csh",
  },
  {
    extension: "csml",
    "mime-type": "chemical/x-csml",
  },
  {
    extension: "csp",
    "mime-type": "application/vnd.commonspace",
  },
  {
    extension: "css",
    "mime-type": "text/css",
  },
  {
    extension: "cst",
    "mime-type": "application/x-director",
  },
  {
    extension: "csv",
    "mime-type": "text/csv",
  },
  {
    extension: "cu",
    "mime-type": "application/cu-seeme",
  },
  {
    extension: "curl",
    "mime-type": "text/vnd.curl",
  },
  {
    extension: "cww",
    "mime-type": "application/prs.cww",
  },
  {
    extension: "cxt",
    "mime-type": "application/x-director",
  },
  {
    extension: "cxx",
    "mime-type": "text/x-c",
  },
  {
    extension: "dae",
    "mime-type": "model/vnd.collada+xml",
  },
  {
    extension: "daf",
    "mime-type": "application/vnd.mobius.daf",
  },
  {
    extension: "dart",
    "mime-type": "application/vnd.dart",
  },
  {
    extension: "dataless",
    "mime-type": "application/vnd.fdsn.seed",
  },
  {
    extension: "davmount",
    "mime-type": "application/davmount+xml",
  },
  {
    extension: "dbk",
    "mime-type": "application/docbook+xml",
  },
  {
    extension: "dcr",
    "mime-type": "application/x-director",
  },
  {
    extension: "dcurl",
    "mime-type": "text/vnd.curl.dcurl",
  },
  {
    extension: "dd2",
    "mime-type": "application/vnd.oma.dd2+xml",
  },
  {
    extension: "ddd",
    "mime-type": "application/vnd.fujixerox.ddd",
  },
  {
    extension: "deb",
    "mime-type": "application/x-debian-package",
  },
  {
    extension: "def",
    "mime-type": "text/plain",
  },
  {
    extension: "deploy",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "der",
    "mime-type": "application/x-x509-ca-cert",
  },
  {
    extension: "dfac",
    "mime-type": "application/vnd.dreamfactory",
  },
  {
    extension: "dgc",
    "mime-type": "application/x-dgc-compressed",
  },
  {
    extension: "dib",
    "mime-type": "image/bmp",
  },
  {
    extension: "dic",
    "mime-type": "text/x-c",
  },
  {
    extension: "dir",
    "mime-type": "application/x-director",
  },
  {
    extension: "dis",
    "mime-type": "application/vnd.mobius.dis",
  },
  {
    extension: "dist",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "distz",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "djv",
    "mime-type": "image/vnd.djvu",
  },
  {
    extension: "djvu",
    "mime-type": "image/vnd.djvu",
  },
  {
    extension: "dll",
    "mime-type": "application/x-msdownload",
  },
  {
    extension: "dmg",
    "mime-type": "application/x-apple-diskimage",
  },
  {
    extension: "dmp",
    "mime-type": "application/vnd.tcpdump.pcap",
  },
  {
    extension: "dms",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "dna",
    "mime-type": "application/vnd.dna",
  },
  {
    extension: "doc",
    "mime-type": "application/msword",
  },
  {
    extension: "docm",
    "mime-type": "application/vnd.ms-word.document.macroenabled.12",
  },
  {
    extension: "docx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    extension: "dot",
    "mime-type": "application/msword",
  },
  {
    extension: "dotm",
    "mime-type": "application/vnd.ms-word.template.macroenabled.12",
  },
  {
    extension: "dotx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  },
  {
    extension: "dp",
    "mime-type": "application/vnd.osgi.dp",
  },
  {
    extension: "dpg",
    "mime-type": "application/vnd.dpgraph",
  },
  {
    extension: "dra",
    "mime-type": "audio/vnd.dra",
  },
  {
    extension: "dsc",
    "mime-type": "text/prs.lines.tag",
  },
  {
    extension: "dssc",
    "mime-type": "application/dssc+der",
  },
  {
    extension: "dtb",
    "mime-type": "application/x-dtbook+xml",
  },
  {
    extension: "dtd",
    "mime-type": "application/xml-dtd",
  },
  {
    extension: "dts",
    "mime-type": "audio/vnd.dts",
  },
  {
    extension: "dtshd",
    "mime-type": "audio/vnd.dts.hd",
  },
  {
    extension: "dump",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "dv",
    "mime-type": "video/x-dv",
  },
  {
    extension: "dvb",
    "mime-type": "video/vnd.dvb.file",
  },
  {
    extension: "dvi",
    "mime-type": "application/x-dvi",
  },
  {
    extension: "dwf",
    "mime-type": "model/vnd.dwf",
  },
  {
    extension: "dwg",
    "mime-type": "image/vnd.dwg",
  },
  {
    extension: "dxf",
    "mime-type": "image/vnd.dxf",
  },
  {
    extension: "dxp",
    "mime-type": "application/vnd.spotfire.dxp",
  },
  {
    extension: "dxr",
    "mime-type": "application/x-director",
  },
  {
    extension: "ecelp4800",
    "mime-type": "audio/vnd.nuera.ecelp4800",
  },
  {
    extension: "ecelp7470",
    "mime-type": "audio/vnd.nuera.ecelp7470",
  },
  {
    extension: "ecelp9600",
    "mime-type": "audio/vnd.nuera.ecelp9600",
  },
  {
    extension: "ecma",
    "mime-type": "application/ecmascript",
  },
  {
    extension: "edm",
    "mime-type": "application/vnd.novadigm.edm",
  },
  {
    extension: "edx",
    "mime-type": "application/vnd.novadigm.edx",
  },
  {
    extension: "efif",
    "mime-type": "application/vnd.picsel",
  },
  {
    extension: "ei6",
    "mime-type": "application/vnd.pg.osasli",
  },
  {
    extension: "elc",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "emf",
    "mime-type": "application/x-msmetafile",
  },
  {
    extension: "eml",
    "mime-type": "message/rfc822",
  },
  {
    extension: "emma",
    "mime-type": "application/emma+xml",
  },
  {
    extension: "emz",
    "mime-type": "application/x-msmetafile",
  },
  {
    extension: "eol",
    "mime-type": "audio/vnd.digital-winds",
  },
  {
    extension: "eot",
    "mime-type": "application/vnd.ms-fontobject",
  },
  {
    extension: "eps",
    "mime-type": "application/postscript",
  },
  {
    extension: "epub",
    "mime-type": "application/epub+zip",
  },
  {
    extension: "es3",
    "mime-type": "application/vnd.eszigno3+xml",
  },
  {
    extension: "esa",
    "mime-type": "application/vnd.osgi.subsystem",
  },
  {
    extension: "esf",
    "mime-type": "application/vnd.epson.esf",
  },
  {
    extension: "et3",
    "mime-type": "application/vnd.eszigno3+xml",
  },
  {
    extension: "etx",
    "mime-type": "text/x-setext",
  },
  {
    extension: "eva",
    "mime-type": "application/x-eva",
  },
  {
    extension: "evy",
    "mime-type": "application/x-envoy",
  },
  {
    extension: "exe",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "exi",
    "mime-type": "application/exi",
  },
  {
    extension: "ext",
    "mime-type": "application/vnd.novadigm.ext",
  },
  {
    extension: "ez",
    "mime-type": "application/andrew-inset",
  },
  {
    extension: "ez2",
    "mime-type": "application/vnd.ezpix-album",
  },
  {
    extension: "ez3",
    "mime-type": "application/vnd.ezpix-package",
  },
  {
    extension: "f",
    "mime-type": "text/x-fortran",
  },
  {
    extension: "f4v",
    "mime-type": "video/x-f4v",
  },
  {
    extension: "f77",
    "mime-type": "text/x-fortran",
  },
  {
    extension: "f90",
    "mime-type": "text/x-fortran",
  },
  {
    extension: "fbs",
    "mime-type": "image/vnd.fastbidsheet",
  },
  {
    extension: "fcdt",
    "mime-type": "application/vnd.adobe.formscentral.fcdt",
  },
  {
    extension: "fcs",
    "mime-type": "application/vnd.isac.fcs",
  },
  {
    extension: "fdf",
    "mime-type": "application/vnd.fdf",
  },
  {
    extension: "fe_launch",
    "mime-type": "application/vnd.denovo.fcselayout-link",
  },
  {
    extension: "fg5",
    "mime-type": "application/vnd.fujitsu.oasysgp",
  },
  {
    extension: "fgd",
    "mime-type": "application/x-director",
  },
  {
    extension: "fh",
    "mime-type": "image/x-freehand",
  },
  {
    extension: "fh4",
    "mime-type": "image/x-freehand",
  },
  {
    extension: "fh5",
    "mime-type": "image/x-freehand",
  },
  {
    extension: "fh7",
    "mime-type": "image/x-freehand",
  },
  {
    extension: "fhc",
    "mime-type": "image/x-freehand",
  },
  {
    extension: "fig",
    "mime-type": "application/x-xfig",
  },
  {
    extension: "flac",
    "mime-type": "audio/flac",
  },
  {
    extension: "fli",
    "mime-type": "video/x-fli",
  },
  {
    extension: "flo",
    "mime-type": "application/vnd.micrografx.flo",
  },
  {
    extension: "flv",
    "mime-type": "video/x-flv",
  },
  {
    extension: "flw",
    "mime-type": "application/vnd.kde.kivio",
  },
  {
    extension: "flx",
    "mime-type": "text/vnd.fmi.flexstor",
  },
  {
    extension: "fly",
    "mime-type": "text/vnd.fly",
  },
  {
    extension: "fm",
    "mime-type": "application/vnd.framemaker",
  },
  {
    extension: "fnc",
    "mime-type": "application/vnd.frogans.fnc",
  },
  {
    extension: "for",
    "mime-type": "text/x-fortran",
  },
  {
    extension: "fpx",
    "mime-type": "image/vnd.fpx",
  },
  {
    extension: "frame",
    "mime-type": "application/vnd.framemaker",
  },
  {
    extension: "fsc",
    "mime-type": "application/vnd.fsc.weblaunch",
  },
  {
    extension: "fst",
    "mime-type": "image/vnd.fst",
  },
  {
    extension: "ftc",
    "mime-type": "application/vnd.fluxtime.clip",
  },
  {
    extension: "fti",
    "mime-type": "application/vnd.anser-web-funds-transfer-initiation",
  },
  {
    extension: "fvt",
    "mime-type": "video/vnd.fvt",
  },
  {
    extension: "fxp",
    "mime-type": "application/vnd.adobe.fxp",
  },
  {
    extension: "fxpl",
    "mime-type": "application/vnd.adobe.fxp",
  },
  {
    extension: "fzs",
    "mime-type": "application/vnd.fuzzysheet",
  },
  {
    extension: "g2w",
    "mime-type": "application/vnd.geoplan",
  },
  {
    extension: "g3",
    "mime-type": "image/g3fax",
  },
  {
    extension: "g3w",
    "mime-type": "application/vnd.geospace",
  },
  {
    extension: "gac",
    "mime-type": "application/vnd.groove-account",
  },
  {
    extension: "gam",
    "mime-type": "application/x-tads",
  },
  {
    extension: "gbr",
    "mime-type": "application/rpki-ghostbusters",
  },
  {
    extension: "gca",
    "mime-type": "application/x-gca-compressed",
  },
  {
    extension: "gdl",
    "mime-type": "model/vnd.gdl",
  },
  {
    extension: "geo",
    "mime-type": "application/vnd.dynageo",
  },
  {
    extension: "gex",
    "mime-type": "application/vnd.geometry-explorer",
  },
  {
    extension: "ggb",
    "mime-type": "application/vnd.geogebra.file",
  },
  {
    extension: "ggt",
    "mime-type": "application/vnd.geogebra.tool",
  },
  {
    extension: "ghf",
    "mime-type": "application/vnd.groove-help",
  },
  {
    extension: "gif",
    "mime-type": "image/gif",
  },
  {
    extension: "gim",
    "mime-type": "application/vnd.groove-identity-message",
  },
  {
    extension: "gml",
    "mime-type": "application/gml+xml",
  },
  {
    extension: "gmx",
    "mime-type": "application/vnd.gmx",
  },
  {
    extension: "gnumeric",
    "mime-type": "application/x-gnumeric",
  },
  {
    extension: "gph",
    "mime-type": "application/vnd.flographit",
  },
  {
    extension: "gpx",
    "mime-type": "application/gpx+xml",
  },
  {
    extension: "gqf",
    "mime-type": "application/vnd.grafeq",
  },
  {
    extension: "gqs",
    "mime-type": "application/vnd.grafeq",
  },
  {
    extension: "gram",
    "mime-type": "application/srgs",
  },
  {
    extension: "gramps",
    "mime-type": "application/x-gramps-xml",
  },
  {
    extension: "gre",
    "mime-type": "application/vnd.geometry-explorer",
  },
  {
    extension: "grv",
    "mime-type": "application/vnd.groove-injector",
  },
  {
    extension: "grxml",
    "mime-type": "application/srgs+xml",
  },
  {
    extension: "gsf",
    "mime-type": "application/x-font-ghostscript",
  },
  {
    extension: "gtar",
    "mime-type": "application/x-gtar",
  },
  {
    extension: "gtm",
    "mime-type": "application/vnd.groove-tool-message",
  },
  {
    extension: "gtw",
    "mime-type": "model/vnd.gtw",
  },
  {
    extension: "gv",
    "mime-type": "text/vnd.graphviz",
  },
  {
    extension: "gxf",
    "mime-type": "application/gxf",
  },
  {
    extension: "gxt",
    "mime-type": "application/vnd.geonext",
  },
  {
    extension: "gz",
    "mime-type": "application/x-gzip",
  },
  {
    extension: "h",
    "mime-type": "text/x-c",
  },
  {
    extension: "h261",
    "mime-type": "video/h261",
  },
  {
    extension: "h263",
    "mime-type": "video/h263",
  },
  {
    extension: "h264",
    "mime-type": "video/h264",
  },
  {
    extension: "hal",
    "mime-type": "application/vnd.hal+xml",
  },
  {
    extension: "hbci",
    "mime-type": "application/vnd.hbci",
  },
  {
    extension: "hdf",
    "mime-type": "application/x-hdf",
  },
  {
    extension: "hh",
    "mime-type": "text/x-c",
  },
  {
    extension: "hlp",
    "mime-type": "application/winhlp",
  },
  {
    extension: "hpgl",
    "mime-type": "application/vnd.hp-hpgl",
  },
  {
    extension: "hpid",
    "mime-type": "application/vnd.hp-hpid",
  },
  {
    extension: "hps",
    "mime-type": "application/vnd.hp-hps",
  },
  {
    extension: "hqx",
    "mime-type": "application/mac-binhex40",
  },
  {
    extension: "htc",
    "mime-type": "text/x-component",
  },
  {
    extension: "htke",
    "mime-type": "application/vnd.kenameaapp",
  },
  {
    extension: "htm",
    "mime-type": "text/html",
  },
  {
    extension: "html",
    "mime-type": "text/html",
  },
  {
    extension: "hvd",
    "mime-type": "application/vnd.yamaha.hv-dic",
  },
  {
    extension: "hvp",
    "mime-type": "application/vnd.yamaha.hv-voice",
  },
  {
    extension: "hvs",
    "mime-type": "application/vnd.yamaha.hv-script",
  },
  {
    extension: "i2g",
    "mime-type": "application/vnd.intergeo",
  },
  {
    extension: "icc",
    "mime-type": "application/vnd.iccprofile",
  },
  {
    extension: "ice",
    "mime-type": "x-conference/x-cooltalk",
  },
  {
    extension: "icm",
    "mime-type": "application/vnd.iccprofile",
  },
  {
    extension: "ico",
    "mime-type": "image/x-icon",
  },
  {
    extension: "ics",
    "mime-type": "text/calendar",
  },
  {
    extension: "ief",
    "mime-type": "image/ief",
  },
  {
    extension: "ifb",
    "mime-type": "text/calendar",
  },
  {
    extension: "ifm",
    "mime-type": "application/vnd.shana.informed.formdata",
  },
  {
    extension: "iges",
    "mime-type": "model/iges",
  },
  {
    extension: "igl",
    "mime-type": "application/vnd.igloader",
  },
  {
    extension: "igm",
    "mime-type": "application/vnd.insors.igm",
  },
  {
    extension: "igs",
    "mime-type": "model/iges",
  },
  {
    extension: "igx",
    "mime-type": "application/vnd.micrografx.igx",
  },
  {
    extension: "iif",
    "mime-type": "application/vnd.shana.informed.interchange",
  },
  {
    extension: "imp",
    "mime-type": "application/vnd.accpac.simply.imp",
  },
  {
    extension: "ims",
    "mime-type": "application/vnd.ms-ims",
  },
  {
    extension: "in",
    "mime-type": "text/plain",
  },
  {
    extension: "ink",
    "mime-type": "application/inkml+xml",
  },
  {
    extension: "inkml",
    "mime-type": "application/inkml+xml",
  },
  {
    extension: "install",
    "mime-type": "application/x-install-instructions",
  },
  {
    extension: "iota",
    "mime-type": "application/vnd.astraea-software.iota",
  },
  {
    extension: "ipfix",
    "mime-type": "application/ipfix",
  },
  {
    extension: "ipk",
    "mime-type": "application/vnd.shana.informed.package",
  },
  {
    extension: "irm",
    "mime-type": "application/vnd.ibm.rights-management",
  },
  {
    extension: "irp",
    "mime-type": "application/vnd.irepository.package+xml",
  },
  {
    extension: "iso",
    "mime-type": "application/x-iso9660-image",
  },
  {
    extension: "itp",
    "mime-type": "application/vnd.shana.informed.formtemplate",
  },
  {
    extension: "ivp",
    "mime-type": "application/vnd.immervision-ivp",
  },
  {
    extension: "ivu",
    "mime-type": "application/vnd.immervision-ivu",
  },
  {
    extension: "jad",
    "mime-type": "text/vnd.sun.j2me.app-descriptor",
  },
  {
    extension: "jam",
    "mime-type": "application/vnd.jam",
  },
  {
    extension: "jar",
    "mime-type": "application/java-archive",
  },
  {
    extension: "java",
    "mime-type": "text/x-java-source",
  },
  {
    extension: "jisp",
    "mime-type": "application/vnd.jisp",
  },
  {
    extension: "jlt",
    "mime-type": "application/vnd.hp-jlyt",
  },
  {
    extension: "jnlp",
    "mime-type": "application/x-java-jnlp-file",
  },
  {
    extension: "joda",
    "mime-type": "application/vnd.joost.joda-archive",
  },
  {
    extension: "jpe",
    "mime-type": "image/jpeg",
  },
  {
    extension: "jpeg",
    "mime-type": "image/jpeg",
  },
  {
    extension: "jpg",
    "mime-type": "image/jpeg",
  },
  {
    extension: "jpgm",
    "mime-type": "video/jpm",
  },
  {
    extension: "jpgv",
    "mime-type": "video/jpeg",
  },
  {
    extension: "jpm",
    "mime-type": "video/jpm",
  },
  {
    extension: "js",
    "mime-type": "application/javascript",
  },
  {
    extension: "jsf",
    "mime-type": "text/plain",
  },
  {
    extension: "json",
    "mime-type": "application/json",
  },
  {
    extension: "jsonml",
    "mime-type": "application/jsonml+json",
  },
  {
    extension: "jspf",
    "mime-type": "text/plain",
  },
  {
    extension: "kar",
    "mime-type": "audio/midi",
  },
  {
    extension: "karbon",
    "mime-type": "application/vnd.kde.karbon",
  },
  {
    extension: "kfo",
    "mime-type": "application/vnd.kde.kformula",
  },
  {
    extension: "kia",
    "mime-type": "application/vnd.kidspiration",
  },
  {
    extension: "kml",
    "mime-type": "application/vnd.google-earth.kml+xml",
  },
  {
    extension: "kmz",
    "mime-type": "application/vnd.google-earth.kmz",
  },
  {
    extension: "kne",
    "mime-type": "application/vnd.kinar",
  },
  {
    extension: "knp",
    "mime-type": "application/vnd.kinar",
  },
  {
    extension: "kon",
    "mime-type": "application/vnd.kde.kontour",
  },
  {
    extension: "kpr",
    "mime-type": "application/vnd.kde.kpresenter",
  },
  {
    extension: "kpt",
    "mime-type": "application/vnd.kde.kpresenter",
  },
  {
    extension: "kpxx",
    "mime-type": "application/vnd.ds-keypoint",
  },
  {
    extension: "ksp",
    "mime-type": "application/vnd.kde.kspread",
  },
  {
    extension: "ktr",
    "mime-type": "application/vnd.kahootz",
  },
  {
    extension: "ktx",
    "mime-type": "image/ktx",
  },
  {
    extension: "ktz",
    "mime-type": "application/vnd.kahootz",
  },
  {
    extension: "kwd",
    "mime-type": "application/vnd.kde.kword",
  },
  {
    extension: "kwt",
    "mime-type": "application/vnd.kde.kword",
  },
  {
    extension: "lasxml",
    "mime-type": "application/vnd.las.las+xml",
  },
  {
    extension: "latex",
    "mime-type": "application/x-latex",
  },
  {
    extension: "lbd",
    "mime-type": "application/vnd.llamagraphics.life-balance.desktop",
  },
  {
    extension: "lbe",
    "mime-type": "application/vnd.llamagraphics.life-balance.exchange+xml",
  },
  {
    extension: "les",
    "mime-type": "application/vnd.hhe.lesson-player",
  },
  {
    extension: "lha",
    "mime-type": "application/x-lzh-compressed",
  },
  {
    extension: "link66",
    "mime-type": "application/vnd.route66.link66+xml",
  },
  {
    extension: "list",
    "mime-type": "text/plain",
  },
  {
    extension: "list3820",
    "mime-type": "application/vnd.ibm.modcap",
  },
  {
    extension: "listafp",
    "mime-type": "application/vnd.ibm.modcap",
  },
  {
    extension: "lnk",
    "mime-type": "application/x-ms-shortcut",
  },
  {
    extension: "log",
    "mime-type": "text/plain",
  },
  {
    extension: "lostxml",
    "mime-type": "application/lost+xml",
  },
  {
    extension: "lrf",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "lrm",
    "mime-type": "application/vnd.ms-lrm",
  },
  {
    extension: "ltf",
    "mime-type": "application/vnd.frogans.ltf",
  },
  {
    extension: "lvp",
    "mime-type": "audio/vnd.lucent.voice",
  },
  {
    extension: "lwp",
    "mime-type": "application/vnd.lotus-wordpro",
  },
  {
    extension: "lzh",
    "mime-type": "application/x-lzh-compressed",
  },
  {
    extension: "m13",
    "mime-type": "application/x-msmediaview",
  },
  {
    extension: "m14",
    "mime-type": "application/x-msmediaview",
  },
  {
    extension: "m1v",
    "mime-type": "video/mpeg",
  },
  {
    extension: "m21",
    "mime-type": "application/mp21",
  },
  {
    extension: "m2a",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "m2v",
    "mime-type": "video/mpeg",
  },
  {
    extension: "m3a",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "m3u",
    "mime-type": "audio/x-mpegurl",
  },
  {
    extension: "m3u8",
    "mime-type": "application/vnd.apple.mpegurl",
  },
  {
    extension: "m4a",
    "mime-type": "audio/mp4",
  },
  {
    extension: "m4b",
    "mime-type": "audio/mp4",
  },
  {
    extension: "m4r",
    "mime-type": "audio/mp4",
  },
  {
    extension: "m4u",
    "mime-type": "video/vnd.mpegurl",
  },
  {
    extension: "m4v",
    "mime-type": "video/mp4",
  },
  {
    extension: "ma",
    "mime-type": "application/mathematica",
  },
  {
    extension: "mac",
    "mime-type": "image/x-macpaint",
  },
  {
    extension: "mads",
    "mime-type": "application/mads+xml",
  },
  {
    extension: "mag",
    "mime-type": "application/vnd.ecowin.chart",
  },
  {
    extension: "maker",
    "mime-type": "application/vnd.framemaker",
  },
  {
    extension: "man",
    "mime-type": "text/troff",
  },
  {
    extension: "mar",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "mathml",
    "mime-type": "application/mathml+xml",
  },
  {
    extension: "mb",
    "mime-type": "application/mathematica",
  },
  {
    extension: "mbk",
    "mime-type": "application/vnd.mobius.mbk",
  },
  {
    extension: "mbox",
    "mime-type": "application/mbox",
  },
  {
    extension: "mc1",
    "mime-type": "application/vnd.medcalcdata",
  },
  {
    extension: "mcd",
    "mime-type": "application/vnd.mcd",
  },
  {
    extension: "mcurl",
    "mime-type": "text/vnd.curl.mcurl",
  },
  {
    extension: "mdb",
    "mime-type": "application/x-msaccess",
  },
  {
    extension: "mdi",
    "mime-type": "image/vnd.ms-modi",
  },
  {
    extension: "me",
    "mime-type": "text/troff",
  },
  {
    extension: "mesh",
    "mime-type": "model/mesh",
  },
  {
    extension: "meta4",
    "mime-type": "application/metalink4+xml",
  },
  {
    extension: "metalink",
    "mime-type": "application/metalink+xml",
  },
  {
    extension: "mets",
    "mime-type": "application/mets+xml",
  },
  {
    extension: "mfm",
    "mime-type": "application/vnd.mfmp",
  },
  {
    extension: "mft",
    "mime-type": "application/rpki-manifest",
  },
  {
    extension: "mgp",
    "mime-type": "application/vnd.osgeo.mapguide.package",
  },
  {
    extension: "mgz",
    "mime-type": "application/vnd.proteus.magazine",
  },
  {
    extension: "mid",
    "mime-type": "audio/midi",
  },
  {
    extension: "midi",
    "mime-type": "audio/midi",
  },
  {
    extension: "mie",
    "mime-type": "application/x-mie",
  },
  {
    extension: "mif",
    "mime-type": "application/x-mif",
  },
  {
    extension: "mime",
    "mime-type": "message/rfc822",
  },
  {
    extension: "mj2",
    "mime-type": "video/mj2",
  },
  {
    extension: "mjp2",
    "mime-type": "video/mj2",
  },
  {
    extension: "mk3d",
    "mime-type": "video/x-matroska",
  },
  {
    extension: "mka",
    "mime-type": "audio/x-matroska",
  },
  {
    extension: "mks",
    "mime-type": "video/x-matroska",
  },
  {
    extension: "mkv",
    "mime-type": "video/x-matroska",
  },
  {
    extension: "mlp",
    "mime-type": "application/vnd.dolby.mlp",
  },
  {
    extension: "mmd",
    "mime-type": "application/vnd.chipnuts.karaoke-mmd",
  },
  {
    extension: "mmf",
    "mime-type": "application/vnd.smaf",
  },
  {
    extension: "mmr",
    "mime-type": "image/vnd.fujixerox.edmics-mmr",
  },
  {
    extension: "mng",
    "mime-type": "video/x-mng",
  },
  {
    extension: "mny",
    "mime-type": "application/x-msmoney",
  },
  {
    extension: "mobi",
    "mime-type": "application/x-mobipocket-ebook",
  },
  {
    extension: "mods",
    "mime-type": "application/mods+xml",
  },
  {
    extension: "mov",
    "mime-type": "video/quicktime",
  },
  {
    extension: "movie",
    "mime-type": "video/x-sgi-movie",
  },
  {
    extension: "mp1",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "mp2",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "mp21",
    "mime-type": "application/mp21",
  },
  {
    extension: "mp2a",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "mp3",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "mp4",
    "mime-type": "video/mp4",
  },
  {
    extension: "mp4a",
    "mime-type": "audio/mp4",
  },
  {
    extension: "mp4s",
    "mime-type": "application/mp4",
  },
  {
    extension: "mp4v",
    "mime-type": "video/mp4",
  },
  {
    extension: "mpa",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "mpc",
    "mime-type": "application/vnd.mophun.certificate",
  },
  {
    extension: "mpe",
    "mime-type": "video/mpeg",
  },
  {
    extension: "mpeg",
    "mime-type": "video/mpeg",
  },
  {
    extension: "mpega",
    "mime-type": "audio/x-mpeg",
  },
  {
    extension: "mpg",
    "mime-type": "video/mpeg",
  },
  {
    extension: "mpg4",
    "mime-type": "video/mp4",
  },
  {
    extension: "mpga",
    "mime-type": "audio/mpeg",
  },
  {
    extension: "mpkg",
    "mime-type": "application/vnd.apple.installer+xml",
  },
  {
    extension: "mpm",
    "mime-type": "application/vnd.blueice.multipass",
  },
  {
    extension: "mpn",
    "mime-type": "application/vnd.mophun.application",
  },
  {
    extension: "mpp",
    "mime-type": "application/vnd.ms-project",
  },
  {
    extension: "mpt",
    "mime-type": "application/vnd.ms-project",
  },
  {
    extension: "mpv2",
    "mime-type": "video/mpeg2",
  },
  {
    extension: "mpy",
    "mime-type": "application/vnd.ibm.minipay",
  },
  {
    extension: "mqy",
    "mime-type": "application/vnd.mobius.mqy",
  },
  {
    extension: "mrc",
    "mime-type": "application/marc",
  },
  {
    extension: "mrcx",
    "mime-type": "application/marcxml+xml",
  },
  {
    extension: "ms",
    "mime-type": "text/troff",
  },
  {
    extension: "mscml",
    "mime-type": "application/mediaservercontrol+xml",
  },
  {
    extension: "mseed",
    "mime-type": "application/vnd.fdsn.mseed",
  },
  {
    extension: "mseq",
    "mime-type": "application/vnd.mseq",
  },
  {
    extension: "msf",
    "mime-type": "application/vnd.epson.msf",
  },
  {
    extension: "msh",
    "mime-type": "model/mesh",
  },
  {
    extension: "msi",
    "mime-type": "application/x-msdownload",
  },
  {
    extension: "msl",
    "mime-type": "application/vnd.mobius.msl",
  },
  {
    extension: "msty",
    "mime-type": "application/vnd.muvee.style",
  },
  {
    extension: "mts",
    "mime-type": "model/vnd.mts",
  },
  {
    extension: "mus",
    "mime-type": "application/vnd.musician",
  },
  {
    extension: "musicxml",
    "mime-type": "application/vnd.recordare.musicxml+xml",
  },
  {
    extension: "mvb",
    "mime-type": "application/x-msmediaview",
  },
  {
    extension: "mwf",
    "mime-type": "application/vnd.mfer",
  },
  {
    extension: "mxf",
    "mime-type": "application/mxf",
  },
  {
    extension: "mxl",
    "mime-type": "application/vnd.recordare.musicxml",
  },
  {
    extension: "mxml",
    "mime-type": "application/xv+xml",
  },
  {
    extension: "mxs",
    "mime-type": "application/vnd.triscape.mxs",
  },
  {
    extension: "mxu",
    "mime-type": "video/vnd.mpegurl",
  },
  {
    extension: "n-gage",
    "mime-type": "application/vnd.nokia.n-gage.symbian.install",
  },
  {
    extension: "n3",
    "mime-type": "text/n3",
  },
  {
    extension: "nb",
    "mime-type": "application/mathematica",
  },
  {
    extension: "nbp",
    "mime-type": "application/vnd.wolfram.player",
  },
  {
    extension: "nc",
    "mime-type": "application/x-netcdf",
  },
  {
    extension: "ncx",
    "mime-type": "application/x-dtbncx+xml",
  },
  {
    extension: "nfo",
    "mime-type": "text/x-nfo",
  },
  {
    extension: "ngdat",
    "mime-type": "application/vnd.nokia.n-gage.data",
  },
  {
    extension: "nitf",
    "mime-type": "application/vnd.nitf",
  },
  {
    extension: "nlu",
    "mime-type": "application/vnd.neurolanguage.nlu",
  },
  {
    extension: "nml",
    "mime-type": "application/vnd.enliven",
  },
  {
    extension: "nnd",
    "mime-type": "application/vnd.noblenet-directory",
  },
  {
    extension: "nns",
    "mime-type": "application/vnd.noblenet-sealer",
  },
  {
    extension: "nnw",
    "mime-type": "application/vnd.noblenet-web",
  },
  {
    extension: "npx",
    "mime-type": "image/vnd.net-fpx",
  },
  {
    extension: "nsc",
    "mime-type": "application/x-conference",
  },
  {
    extension: "nsf",
    "mime-type": "application/vnd.lotus-notes",
  },
  {
    extension: "ntf",
    "mime-type": "application/vnd.nitf",
  },
  {
    extension: "nzb",
    "mime-type": "application/x-nzb",
  },
  {
    extension: "oa2",
    "mime-type": "application/vnd.fujitsu.oasys2",
  },
  {
    extension: "oa3",
    "mime-type": "application/vnd.fujitsu.oasys3",
  },
  {
    extension: "oas",
    "mime-type": "application/vnd.fujitsu.oasys",
  },
  {
    extension: "obd",
    "mime-type": "application/x-msbinder",
  },
  {
    extension: "obj",
    "mime-type": "application/x-tgif",
  },
  {
    extension: "oda",
    "mime-type": "application/oda",
  },
  {
    extension: " OpenDocument Database ",
    "mime-type": "odb",
  },
  {
    extension: " OpenDocument Chart ",
    "mime-type": "odc",
  },
  {
    extension: " OpenDocument Formula ",
    "mime-type": "odf",
  },
  {
    extension: "odft",
    "mime-type": "application/vnd.oasis.opendocument.formula-template",
  },
  {
    extension: " OpenDocument Drawing ",
    "mime-type": "odg",
  },
  {
    extension: " OpenDocument Image ",
    "mime-type": "odi",
  },
  {
    extension: " OpenDocument Master Document ",
    "mime-type": "odm",
  },
  {
    extension: " OpenDocument Presentation ",
    "mime-type": "odp",
  },
  {
    extension: " OpenDocument Spreadsheet ",
    "mime-type": "ods",
  },
  {
    extension: " OpenDocument Text ",
    "mime-type": "odt",
  },
  {
    extension: "oga",
    "mime-type": "audio/ogg",
  },
  {
    extension: "ogg",
    "mime-type": "audio/ogg",
  },
  {
    extension: "ogv",
    "mime-type": "video/ogg",
  },
  {
    extension: " xiph mime types ",
    "mime-type": "ogx",
  },
  {
    extension: "omdoc",
    "mime-type": "application/omdoc+xml",
  },
  {
    extension: "onepkg",
    "mime-type": "application/onenote",
  },
  {
    extension: "onetmp",
    "mime-type": "application/onenote",
  },
  {
    extension: "onetoc",
    "mime-type": "application/onenote",
  },
  {
    extension: "onetoc2",
    "mime-type": "application/onenote",
  },
  {
    extension: "opf",
    "mime-type": "application/oebps-package+xml",
  },
  {
    extension: "opml",
    "mime-type": "text/x-opml",
  },
  {
    extension: "oprc",
    "mime-type": "application/vnd.palm",
  },
  {
    extension: "org",
    "mime-type": "application/vnd.lotus-organizer",
  },
  {
    extension: "osf",
    "mime-type": "application/vnd.yamaha.openscoreformat",
  },
  {
    extension: "osfpvg",
    "mime-type": "application/vnd.yamaha.openscoreformat.osfpvg+xml",
  },
  {
    extension: "otc",
    "mime-type": "application/vnd.oasis.opendocument.chart-template",
  },
  {
    extension: "otf",
    "mime-type": "font/otf",
  },
  {
    extension: " OpenDocument Drawing Template ",
    "mime-type": "otg",
  },
  {
    extension: " HTML Document Template ",
    "mime-type": "oth",
  },
  {
    extension: "oti",
    "mime-type": "application/vnd.oasis.opendocument.image-template",
  },
  {
    extension: " OpenDocument Presentation Template ",
    "mime-type": "otp",
  },
  {
    extension: " OpenDocument Spreadsheet Template ",
    "mime-type": "ots",
  },
  {
    extension: " OpenDocument Text Template ",
    "mime-type": "ott",
  },
  {
    extension: "oxps",
    "mime-type": "application/oxps",
  },
  {
    extension: "oxt",
    "mime-type": "application/vnd.openofficeorg.extension",
  },
  {
    extension: "p",
    "mime-type": "text/x-pascal",
  },
  {
    extension: "p10",
    "mime-type": "application/pkcs10",
  },
  {
    extension: "p12",
    "mime-type": "application/x-pkcs12",
  },
  {
    extension: "p7b",
    "mime-type": "application/x-pkcs7-certificates",
  },
  {
    extension: "p7c",
    "mime-type": "application/pkcs7-mime",
  },
  {
    extension: "p7m",
    "mime-type": "application/pkcs7-mime",
  },
  {
    extension: "p7r",
    "mime-type": "application/x-pkcs7-certreqresp",
  },
  {
    extension: "p7s",
    "mime-type": "application/pkcs7-signature",
  },
  {
    extension: "p8",
    "mime-type": "application/pkcs8",
  },
  {
    extension: "pas",
    "mime-type": "text/x-pascal",
  },
  {
    extension: "paw",
    "mime-type": "application/vnd.pawaafile",
  },
  {
    extension: "pbd",
    "mime-type": "application/vnd.powerbuilder6",
  },
  {
    extension: "pbm",
    "mime-type": "image/x-portable-bitmap",
  },
  {
    extension: "pcap",
    "mime-type": "application/vnd.tcpdump.pcap",
  },
  {
    extension: "pcf",
    "mime-type": "application/x-font-pcf",
  },
  {
    extension: "pcl",
    "mime-type": "application/vnd.hp-pcl",
  },
  {
    extension: "pclxl",
    "mime-type": "application/vnd.hp-pclxl",
  },
  {
    extension: "pct",
    "mime-type": "image/pict",
  },
  {
    extension: "pcurl",
    "mime-type": "application/vnd.curl.pcurl",
  },
  {
    extension: "pcx",
    "mime-type": "image/x-pcx",
  },
  {
    extension: "pdb",
    "mime-type": "application/vnd.palm",
  },
  {
    extension: "pdf",
    "mime-type": "application/pdf",
  },
  {
    extension: "pfa",
    "mime-type": "application/x-font-type1",
  },
  {
    extension: "pfb",
    "mime-type": "application/x-font-type1",
  },
  {
    extension: "pfm",
    "mime-type": "application/x-font-type1",
  },
  {
    extension: "pfr",
    "mime-type": "application/font-tdpfr",
  },
  {
    extension: "pfx",
    "mime-type": "application/x-pkcs12",
  },
  {
    extension: "pgm",
    "mime-type": "image/x-portable-graymap",
  },
  {
    extension: "pgn",
    "mime-type": "application/x-chess-pgn",
  },
  {
    extension: "pgp",
    "mime-type": "application/pgp-encrypted",
  },
  {
    extension: "pic",
    "mime-type": "image/pict",
  },
  {
    extension: "pict",
    "mime-type": "image/pict",
  },
  {
    extension: "pkg",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "pki",
    "mime-type": "application/pkixcmp",
  },
  {
    extension: "pkipath",
    "mime-type": "application/pkix-pkipath",
  },
  {
    extension: "plb",
    "mime-type": "application/vnd.3gpp.pic-bw-large",
  },
  {
    extension: "plc",
    "mime-type": "application/vnd.mobius.plc",
  },
  {
    extension: "plf",
    "mime-type": "application/vnd.pocketlearn",
  },
  {
    extension: "pls",
    "mime-type": "audio/x-scpls",
  },
  {
    extension: "pml",
    "mime-type": "application/vnd.ctc-posml",
  },
  {
    extension: "png",
    "mime-type": "image/png",
  },
  {
    extension: "pnm",
    "mime-type": "image/x-portable-anymap",
  },
  {
    extension: "pnt",
    "mime-type": "image/x-macpaint",
  },
  {
    extension: "portpkg",
    "mime-type": "application/vnd.macports.portpkg",
  },
  {
    extension: "pot",
    "mime-type": "application/vnd.ms-powerpoint",
  },
  {
    extension: "potm",
    "mime-type": "application/vnd.ms-powerpoint.template.macroenabled.12",
  },
  {
    extension: "potx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.presentationml.template",
  },
  {
    extension: "ppam",
    "mime-type": "application/vnd.ms-powerpoint.addin.macroenabled.12",
  },
  {
    extension: "ppd",
    "mime-type": "application/vnd.cups-ppd",
  },
  {
    extension: "ppm",
    "mime-type": "image/x-portable-pixmap",
  },
  {
    extension: "pps",
    "mime-type": "application/vnd.ms-powerpoint",
  },
  {
    extension: "ppsm",
    "mime-type": "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
  },
  {
    extension: "ppsx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  },
  {
    extension: "ppt",
    "mime-type": "application/vnd.ms-powerpoint",
  },
  {
    extension: "pptm",
    "mime-type": "application/vnd.ms-powerpoint.presentation.macroenabled.12",
  },
  {
    extension: "pptx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    extension: "pqa",
    "mime-type": "application/vnd.palm",
  },
  {
    extension: "prc",
    "mime-type": "application/x-mobipocket-ebook",
  },
  {
    extension: "pre",
    "mime-type": "application/vnd.lotus-freelance",
  },
  {
    extension: "prf",
    "mime-type": "application/pics-rules",
  },
  {
    extension: "ps",
    "mime-type": "application/postscript",
  },
  {
    extension: "psb",
    "mime-type": "application/vnd.3gpp.pic-bw-small",
  },
  {
    extension: "psd",
    "mime-type": "image/vnd.adobe.photoshop",
  },
  {
    extension: "psf",
    "mime-type": "application/x-font-linux-psf",
  },
  {
    extension: "pskcxml",
    "mime-type": "application/pskc+xml",
  },
  {
    extension: "ptid",
    "mime-type": "application/vnd.pvi.ptid1",
  },
  {
    extension: "pub",
    "mime-type": "application/x-mspublisher",
  },
  {
    extension: "pvb",
    "mime-type": "application/vnd.3gpp.pic-bw-let",
  },
  {
    extension: "pwn",
    "mime-type": "application/vnd.3m.post-it-notes",
  },
  {
    extension: "pya",
    "mime-type": "audio/vnd.ms-playready.media.pya",
  },
  {
    extension: "pyv",
    "mime-type": "video/vnd.ms-playready.media.pyv",
  },
  {
    extension: "qam",
    "mime-type": "application/vnd.epson.quickanime",
  },
  {
    extension: "qbo",
    "mime-type": "application/vnd.intu.qbo",
  },
  {
    extension: "qfx",
    "mime-type": "application/vnd.intu.qfx",
  },
  {
    extension: "qps",
    "mime-type": "application/vnd.publishare-delta-tree",
  },
  {
    extension: "qt",
    "mime-type": "video/quicktime",
  },
  {
    extension: "qti",
    "mime-type": "image/x-quicktime",
  },
  {
    extension: "qtif",
    "mime-type": "image/x-quicktime",
  },
  {
    extension: "qwd",
    "mime-type": "application/vnd.quark.quarkxpress",
  },
  {
    extension: "qwt",
    "mime-type": "application/vnd.quark.quarkxpress",
  },
  {
    extension: "qxb",
    "mime-type": "application/vnd.quark.quarkxpress",
  },
  {
    extension: "qxd",
    "mime-type": "application/vnd.quark.quarkxpress",
  },
  {
    extension: "qxl",
    "mime-type": "application/vnd.quark.quarkxpress",
  },
  {
    extension: "qxt",
    "mime-type": "application/vnd.quark.quarkxpress",
  },
  {
    extension: "ra",
    "mime-type": "audio/x-pn-realaudio",
  },
  {
    extension: "ram",
    "mime-type": "audio/x-pn-realaudio",
  },
  {
    extension: "rar",
    "mime-type": "application/x-rar-compressed",
  },
  {
    extension: "ras",
    "mime-type": "image/x-cmu-raster",
  },
  {
    extension: "rcprofile",
    "mime-type": "application/vnd.ipunplugged.rcprofile",
  },
  {
    extension: "rdf",
    "mime-type": "application/rdf+xml",
  },
  {
    extension: "rdz",
    "mime-type": "application/vnd.data-vision.rdz",
  },
  {
    extension: "rep",
    "mime-type": "application/vnd.businessobjects",
  },
  {
    extension: "res",
    "mime-type": "application/x-dtbresource+xml",
  },
  {
    extension: "rgb",
    "mime-type": "image/x-rgb",
  },
  {
    extension: "rif",
    "mime-type": "application/reginfo+xml",
  },
  {
    extension: "rip",
    "mime-type": "audio/vnd.rip",
  },
  {
    extension: "ris",
    "mime-type": "application/x-research-info-systems",
  },
  {
    extension: "rl",
    "mime-type": "application/resource-lists+xml",
  },
  {
    extension: "rlc",
    "mime-type": "image/vnd.fujixerox.edmics-rlc",
  },
  {
    extension: "rld",
    "mime-type": "application/resource-lists-diff+xml",
  },
  {
    extension: "rm",
    "mime-type": "application/vnd.rn-realmedia",
  },
  {
    extension: "rmi",
    "mime-type": "audio/midi",
  },
  {
    extension: "rmp",
    "mime-type": "audio/x-pn-realaudio-plugin",
  },
  {
    extension: "rms",
    "mime-type": "application/vnd.jcp.javame.midlet-rms",
  },
  {
    extension: "rmvb",
    "mime-type": "application/vnd.rn-realmedia-vbr",
  },
  {
    extension: "rnc",
    "mime-type": "application/relax-ng-compact-syntax",
  },
  {
    extension: "roa",
    "mime-type": "application/rpki-roa",
  },
  {
    extension: "roff",
    "mime-type": "text/troff",
  },
  {
    extension: "rp9",
    "mime-type": "application/vnd.cloanto.rp9",
  },
  {
    extension: "rpss",
    "mime-type": "application/vnd.nokia.radio-presets",
  },
  {
    extension: "rpst",
    "mime-type": "application/vnd.nokia.radio-preset",
  },
  {
    extension: "rq",
    "mime-type": "application/sparql-query",
  },
  {
    extension: "rs",
    "mime-type": "application/rls-services+xml",
  },
  {
    extension: "rsd",
    "mime-type": "application/rsd+xml",
  },
  {
    extension: "rss",
    "mime-type": "application/rss+xml",
  },
  {
    extension: "rtf",
    "mime-type": "application/rtf",
  },
  {
    extension: "rtx",
    "mime-type": "text/richtext",
  },
  {
    extension: "s",
    "mime-type": "text/x-asm",
  },
  {
    extension: "s3m",
    "mime-type": "audio/s3m",
  },
  {
    extension: "saf",
    "mime-type": "application/vnd.yamaha.smaf-audio",
  },
  {
    extension: "sbml",
    "mime-type": "application/sbml+xml",
  },
  {
    extension: "sc",
    "mime-type": "application/vnd.ibm.secure-container",
  },
  {
    extension: "scd",
    "mime-type": "application/x-msschedule",
  },
  {
    extension: "scm",
    "mime-type": "application/vnd.lotus-screencam",
  },
  {
    extension: "scq",
    "mime-type": "application/scvp-cv-request",
  },
  {
    extension: "scs",
    "mime-type": "application/scvp-cv-response",
  },
  {
    extension: "scurl",
    "mime-type": "text/vnd.curl.scurl",
  },
  {
    extension: "sda",
    "mime-type": "application/vnd.stardivision.draw",
  },
  {
    extension: "sdc",
    "mime-type": "application/vnd.stardivision.calc",
  },
  {
    extension: "sdd",
    "mime-type": "application/vnd.stardivision.impress",
  },
  {
    extension: "sdkd",
    "mime-type": "application/vnd.solent.sdkm+xml",
  },
  {
    extension: "sdkm",
    "mime-type": "application/vnd.solent.sdkm+xml",
  },
  {
    extension: "sdp",
    "mime-type": "application/sdp",
  },
  {
    extension: "sdw",
    "mime-type": "application/vnd.stardivision.writer",
  },
  {
    extension: "see",
    "mime-type": "application/vnd.seemail",
  },
  {
    extension: "seed",
    "mime-type": "application/vnd.fdsn.seed",
  },
  {
    extension: "sema",
    "mime-type": "application/vnd.sema",
  },
  {
    extension: "semd",
    "mime-type": "application/vnd.semd",
  },
  {
    extension: "semf",
    "mime-type": "application/vnd.semf",
  },
  {
    extension: "ser",
    "mime-type": "application/java-serialized-object",
  },
  {
    extension: "setpay",
    "mime-type": "application/set-payment-initiation",
  },
  {
    extension: "setreg",
    "mime-type": "application/set-registration-initiation",
  },
  {
    extension: "sfd-hdstx",
    "mime-type": "application/vnd.hydrostatix.sof-data",
  },
  {
    extension: "sfs",
    "mime-type": "application/vnd.spotfire.sfs",
  },
  {
    extension: "sfv",
    "mime-type": "text/x-sfv",
  },
  {
    extension: "sgi",
    "mime-type": "image/sgi",
  },
  {
    extension: "sgl",
    "mime-type": "application/vnd.stardivision.writer-global",
  },
  {
    extension: "sgm",
    "mime-type": "text/sgml",
  },
  {
    extension: "sgml",
    "mime-type": "text/sgml",
  },
  {
    extension: "sh",
    "mime-type": "application/x-sh",
  },
  {
    extension: "shar",
    "mime-type": "application/x-shar",
  },
  {
    extension: "shf",
    "mime-type": "application/shf+xml",
  },
  {
    extension: "sid",
    "mime-type": "image/x-mrsid-image",
  },
  {
    extension: "sig",
    "mime-type": "application/pgp-signature",
  },
  {
    extension: "sil",
    "mime-type": "audio/silk",
  },
  {
    extension: "silo",
    "mime-type": "model/mesh",
  },
  {
    extension: "sis",
    "mime-type": "application/vnd.symbian.install",
  },
  {
    extension: "sisx",
    "mime-type": "application/vnd.symbian.install",
  },
  {
    extension: "sit",
    "mime-type": "application/x-stuffit",
  },
  {
    extension: "sitx",
    "mime-type": "application/x-stuffitx",
  },
  {
    extension: "skd",
    "mime-type": "application/vnd.koan",
  },
  {
    extension: "skm",
    "mime-type": "application/vnd.koan",
  },
  {
    extension: "skp",
    "mime-type": "application/vnd.koan",
  },
  {
    extension: "skt",
    "mime-type": "application/vnd.koan",
  },
  {
    extension: "sldm",
    "mime-type": "application/vnd.ms-powerpoint.slide.macroenabled.12",
  },
  {
    extension: "sldx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.presentationml.slide",
  },
  {
    extension: "slt",
    "mime-type": "application/vnd.epson.salt",
  },
  {
    extension: "sm",
    "mime-type": "application/vnd.stepmania.stepchart",
  },
  {
    extension: "smf",
    "mime-type": "application/vnd.stardivision.math",
  },
  {
    extension: "smi",
    "mime-type": "application/smil+xml",
  },
  {
    extension: "smil",
    "mime-type": "application/smil+xml",
  },
  {
    extension: "smv",
    "mime-type": "video/x-smv",
  },
  {
    extension: "smzip",
    "mime-type": "application/vnd.stepmania.package",
  },
  {
    extension: "snd",
    "mime-type": "audio/basic",
  },
  {
    extension: "snf",
    "mime-type": "application/x-font-snf",
  },
  {
    extension: "so",
    "mime-type": "application/octet-stream",
  },
  {
    extension: "spc",
    "mime-type": "application/x-pkcs7-certificates",
  },
  {
    extension: "spf",
    "mime-type": "application/vnd.yamaha.smaf-phrase",
  },
  {
    extension: "spl",
    "mime-type": "application/x-futuresplash",
  },
  {
    extension: "spot",
    "mime-type": "text/vnd.in3d.spot",
  },
  {
    extension: "spp",
    "mime-type": "application/scvp-vp-response",
  },
  {
    extension: "spq",
    "mime-type": "application/scvp-vp-request",
  },
  {
    extension: "spx",
    "mime-type": "audio/ogg",
  },
  {
    extension: "sql",
    "mime-type": "application/x-sql",
  },
  {
    extension: "src",
    "mime-type": "application/x-wais-source",
  },
  {
    extension: "srt",
    "mime-type": "application/x-subrip",
  },
  {
    extension: "sru",
    "mime-type": "application/sru+xml",
  },
  {
    extension: "srx",
    "mime-type": "application/sparql-results+xml",
  },
  {
    extension: "ssdl",
    "mime-type": "application/ssdl+xml",
  },
  {
    extension: "sse",
    "mime-type": "application/vnd.kodak-descriptor",
  },
  {
    extension: "ssf",
    "mime-type": "application/vnd.epson.ssf",
  },
  {
    extension: "ssml",
    "mime-type": "application/ssml+xml",
  },
  {
    extension: "st",
    "mime-type": "application/vnd.sailingtracker.track",
  },
  {
    extension: "stc",
    "mime-type": "application/vnd.sun.xml.calc.template",
  },
  {
    extension: "std",
    "mime-type": "application/vnd.sun.xml.draw.template",
  },
  {
    extension: "stf",
    "mime-type": "application/vnd.wt.stf",
  },
  {
    extension: "sti",
    "mime-type": "application/vnd.sun.xml.impress.template",
  },
  {
    extension: "stk",
    "mime-type": "application/hyperstudio",
  },
  {
    extension: "stl",
    "mime-type": "application/vnd.ms-pki.stl",
  },
  {
    extension: "str",
    "mime-type": "application/vnd.pg.format",
  },
  {
    extension: "stw",
    "mime-type": "application/vnd.sun.xml.writer.template",
  },
  {
    extension: "sub",
    "mime-type": "text/vnd.dvb.subtitle",
  },
  {
    extension: "sus",
    "mime-type": "application/vnd.sus-calendar",
  },
  {
    extension: "susp",
    "mime-type": "application/vnd.sus-calendar",
  },
  {
    extension: "sv4cpio",
    "mime-type": "application/x-sv4cpio",
  },
  {
    extension: "sv4crc",
    "mime-type": "application/x-sv4crc",
  },
  {
    extension: "svc",
    "mime-type": "application/vnd.dvb.service",
  },
  {
    extension: "svd",
    "mime-type": "application/vnd.svd",
  },
  {
    extension: "svg",
    "mime-type": "image/svg+xml",
  },
  {
    extension: "svgz",
    "mime-type": "image/svg+xml",
  },
  {
    extension: "swa",
    "mime-type": "application/x-director",
  },
  {
    extension: "swf",
    "mime-type": "application/x-shockwave-flash",
  },
  {
    extension: "swi",
    "mime-type": "application/vnd.aristanetworks.swi",
  },
  {
    extension: "sxc",
    "mime-type": "application/vnd.sun.xml.calc",
  },
  {
    extension: "sxd",
    "mime-type": "application/vnd.sun.xml.draw",
  },
  {
    extension: "sxg",
    "mime-type": "application/vnd.sun.xml.writer.global",
  },
  {
    extension: "sxi",
    "mime-type": "application/vnd.sun.xml.impress",
  },
  {
    extension: "sxm",
    "mime-type": "application/vnd.sun.xml.math",
  },
  {
    extension: "sxw",
    "mime-type": "application/vnd.sun.xml.writer",
  },
  {
    extension: "t",
    "mime-type": "text/troff",
  },
  {
    extension: "t3",
    "mime-type": "application/x-t3vm-image",
  },
  {
    extension: "taglet",
    "mime-type": "application/vnd.mynfc",
  },
  {
    extension: "tao",
    "mime-type": "application/vnd.tao.intent-module-archive",
  },
  {
    extension: "tar",
    "mime-type": "application/x-tar",
  },
  {
    extension: "tcap",
    "mime-type": "application/vnd.3gpp2.tcap",
  },
  {
    extension: "tcl",
    "mime-type": "application/x-tcl",
  },
  {
    extension: "teacher",
    "mime-type": "application/vnd.smart.teacher",
  },
  {
    extension: "tei",
    "mime-type": "application/tei+xml",
  },
  {
    extension: "teicorpus",
    "mime-type": "application/tei+xml",
  },
  {
    extension: "tex",
    "mime-type": "application/x-tex",
  },
  {
    extension: "texi",
    "mime-type": "application/x-texinfo",
  },
  {
    extension: "texinfo",
    "mime-type": "application/x-texinfo",
  },
  {
    extension: "text",
    "mime-type": "text/plain",
  },
  {
    extension: "tfi",
    "mime-type": "application/thraud+xml",
  },
  {
    extension: "tfm",
    "mime-type": "application/x-tex-tfm",
  },
  {
    extension: "tga",
    "mime-type": "image/x-tga",
  },
  {
    extension: "thmx",
    "mime-type": "application/vnd.ms-officetheme",
  },
  {
    extension: "tif",
    "mime-type": "image/tiff",
  },
  {
    extension: "tiff",
    "mime-type": "image/tiff",
  },
  {
    extension: "tmo",
    "mime-type": "application/vnd.tmobile-livetv",
  },
  {
    extension: "torrent",
    "mime-type": "application/x-bittorrent",
  },
  {
    extension: "tpl",
    "mime-type": "application/vnd.groove-tool-template",
  },
  {
    extension: "tpt",
    "mime-type": "application/vnd.trid.tpt",
  },
  {
    extension: "tr",
    "mime-type": "text/troff",
  },
  {
    extension: "tra",
    "mime-type": "application/vnd.trueapp",
  },
  {
    extension: "trm",
    "mime-type": "application/x-msterminal",
  },
  {
    extension: "tsd",
    "mime-type": "application/timestamped-data",
  },
  {
    extension: "tsv",
    "mime-type": "text/tab-separated-values",
  },
  {
    extension: "ttc",
    "mime-type": "font/collection",
  },
  {
    extension: "ttf",
    "mime-type": "font/ttf",
  },
  {
    extension: "ttl",
    "mime-type": "text/turtle",
  },
  {
    extension: "twd",
    "mime-type": "application/vnd.simtech-mindmapper",
  },
  {
    extension: "twds",
    "mime-type": "application/vnd.simtech-mindmapper",
  },
  {
    extension: "txd",
    "mime-type": "application/vnd.genomatix.tuxedo",
  },
  {
    extension: "txf",
    "mime-type": "application/vnd.mobius.txf",
  },
  {
    extension: "txt",
    "mime-type": "text/plain",
  },
  {
    extension: "u32",
    "mime-type": "application/x-authorware-bin",
  },
  {
    extension: "udeb",
    "mime-type": "application/x-debian-package",
  },
  {
    extension: "ufd",
    "mime-type": "application/vnd.ufdl",
  },
  {
    extension: "ufdl",
    "mime-type": "application/vnd.ufdl",
  },
  {
    extension: "ulw",
    "mime-type": "audio/basic",
  },
  {
    extension: "ulx",
    "mime-type": "application/x-glulx",
  },
  {
    extension: "umj",
    "mime-type": "application/vnd.umajin",
  },
  {
    extension: "unityweb",
    "mime-type": "application/vnd.unity",
  },
  {
    extension: "uoml",
    "mime-type": "application/vnd.uoml+xml",
  },
  {
    extension: "uri",
    "mime-type": "text/uri-list",
  },
  {
    extension: "uris",
    "mime-type": "text/uri-list",
  },
  {
    extension: "urls",
    "mime-type": "text/uri-list",
  },
  {
    extension: "ustar",
    "mime-type": "application/x-ustar",
  },
  {
    extension: "utz",
    "mime-type": "application/vnd.uiq.theme",
  },
  {
    extension: "uu",
    "mime-type": "text/x-uuencode",
  },
  {
    extension: "uva",
    "mime-type": "audio/vnd.dece.audio",
  },
  {
    extension: "uvd",
    "mime-type": "application/vnd.dece.data",
  },
  {
    extension: "uvf",
    "mime-type": "application/vnd.dece.data",
  },
  {
    extension: "uvg",
    "mime-type": "image/vnd.dece.graphic",
  },
  {
    extension: "uvh",
    "mime-type": "video/vnd.dece.hd",
  },
  {
    extension: "uvi",
    "mime-type": "image/vnd.dece.graphic",
  },
  {
    extension: "uvm",
    "mime-type": "video/vnd.dece.mobile",
  },
  {
    extension: "uvp",
    "mime-type": "video/vnd.dece.pd",
  },
  {
    extension: "uvs",
    "mime-type": "video/vnd.dece.sd",
  },
  {
    extension: "uvt",
    "mime-type": "application/vnd.dece.ttml+xml",
  },
  {
    extension: "uvu",
    "mime-type": "video/vnd.uvvu.mp4",
  },
  {
    extension: "uvv",
    "mime-type": "video/vnd.dece.video",
  },
  {
    extension: "uvva",
    "mime-type": "audio/vnd.dece.audio",
  },
  {
    extension: "uvvd",
    "mime-type": "application/vnd.dece.data",
  },
  {
    extension: "uvvf",
    "mime-type": "application/vnd.dece.data",
  },
  {
    extension: "uvvg",
    "mime-type": "image/vnd.dece.graphic",
  },
  {
    extension: "uvvh",
    "mime-type": "video/vnd.dece.hd",
  },
  {
    extension: "uvvi",
    "mime-type": "image/vnd.dece.graphic",
  },
  {
    extension: "uvvm",
    "mime-type": "video/vnd.dece.mobile",
  },
  {
    extension: "uvvp",
    "mime-type": "video/vnd.dece.pd",
  },
  {
    extension: "uvvs",
    "mime-type": "video/vnd.dece.sd",
  },
  {
    extension: "uvvt",
    "mime-type": "application/vnd.dece.ttml+xml",
  },
  {
    extension: "uvvu",
    "mime-type": "video/vnd.uvvu.mp4",
  },
  {
    extension: "uvvv",
    "mime-type": "video/vnd.dece.video",
  },
  {
    extension: "uvvx",
    "mime-type": "application/vnd.dece.unspecified",
  },
  {
    extension: "uvvz",
    "mime-type": "application/vnd.dece.zip",
  },
  {
    extension: "uvx",
    "mime-type": "application/vnd.dece.unspecified",
  },
  {
    extension: "uvz",
    "mime-type": "application/vnd.dece.zip",
  },
  {
    extension: "vcard",
    "mime-type": "text/vcard",
  },
  {
    extension: "vcd",
    "mime-type": "application/x-cdlink",
  },
  {
    extension: "vcf",
    "mime-type": "text/x-vcard",
  },
  {
    extension: "vcg",
    "mime-type": "application/vnd.groove-vcard",
  },
  {
    extension: "vcs",
    "mime-type": "text/x-vcalendar",
  },
  {
    extension: "vcx",
    "mime-type": "application/vnd.vcx",
  },
  {
    extension: "vis",
    "mime-type": "application/vnd.visionary",
  },
  {
    extension: "viv",
    "mime-type": "video/vnd.vivo",
  },
  {
    extension: "vob",
    "mime-type": "video/x-ms-vob",
  },
  {
    extension: "vor",
    "mime-type": "application/vnd.stardivision.writer",
  },
  {
    extension: "vox",
    "mime-type": "application/x-authorware-bin",
  },
  {
    extension: "vrml",
    "mime-type": "model/vrml",
  },
  {
    extension: "vsd",
    "mime-type": "application/vnd.visio",
  },
  {
    extension: "vsf",
    "mime-type": "application/vnd.vsf",
  },
  {
    extension: "vss",
    "mime-type": "application/vnd.visio",
  },
  {
    extension: "vst",
    "mime-type": "application/vnd.visio",
  },
  {
    extension: "vsw",
    "mime-type": "application/vnd.visio",
  },
  {
    extension: "vtu",
    "mime-type": "model/vnd.vtu",
  },
  {
    extension: "vxml",
    "mime-type": "application/voicexml+xml",
  },
  {
    extension: "w3d",
    "mime-type": "application/x-director",
  },
  {
    extension: "wad",
    "mime-type": "application/x-doom",
  },
  {
    extension: "wav",
    "mime-type": "audio/x-wav",
  },
  {
    extension: "wax",
    "mime-type": "audio/x-ms-wax",
  },
  {
    extension: " Wireless Bitmap ",
    "mime-type": "wbmp",
  },
  {
    extension: "wbs",
    "mime-type": "application/vnd.criticaltools.wbs+xml",
  },
  {
    extension: "wbxml",
    "mime-type": "application/vnd.wap.wbxml",
  },
  {
    extension: "wcm",
    "mime-type": "application/vnd.ms-works",
  },
  {
    extension: "wdb",
    "mime-type": "application/vnd.ms-works",
  },
  {
    extension: "wdp",
    "mime-type": "image/vnd.ms-photo",
  },
  {
    extension: "weba",
    "mime-type": "audio/webm",
  },
  {
    extension: "webm",
    "mime-type": "video/webm",
  },
  {
    extension: "webp",
    "mime-type": "image/webp",
  },
  {
    extension: "wg",
    "mime-type": "application/vnd.pmi.widget",
  },
  {
    extension: "wgt",
    "mime-type": "application/widget",
  },
  {
    extension: "wks",
    "mime-type": "application/vnd.ms-works",
  },
  {
    extension: "wm",
    "mime-type": "video/x-ms-wm",
  },
  {
    extension: "wma",
    "mime-type": "audio/x-ms-wma",
  },
  {
    extension: "wmd",
    "mime-type": "application/x-ms-wmd",
  },
  {
    extension: "wmf",
    "mime-type": "application/x-msmetafile",
  },
  {
    extension: " WML Source ",
    "mime-type": "wml",
  },
  {
    extension: " Compiled WML ",
    "mime-type": "wmlc",
  },
  {
    extension: " WML Script Source ",
    "mime-type": "wmls",
  },
  {
    extension: " Compiled WML Script ",
    "mime-type": "wmlsc",
  },
  {
    extension: "wmv",
    "mime-type": "video/x-ms-wmv",
  },
  {
    extension: "wmx",
    "mime-type": "video/x-ms-wmx",
  },
  {
    extension: "wmz",
    "mime-type": "application/x-msmetafile",
  },
  {
    extension: "woff",
    "mime-type": "font/woff",
  },
  {
    extension: "woff2",
    "mime-type": "font/woff2",
  },
  {
    extension: "wpd",
    "mime-type": "application/vnd.wordperfect",
  },
  {
    extension: "wpl",
    "mime-type": "application/vnd.ms-wpl",
  },
  {
    extension: "wps",
    "mime-type": "application/vnd.ms-works",
  },
  {
    extension: "wqd",
    "mime-type": "application/vnd.wqd",
  },
  {
    extension: "wri",
    "mime-type": "application/x-mswrite",
  },
  {
    extension: "wrl",
    "mime-type": "model/vrml",
  },
  {
    extension: "wsdl",
    "mime-type": "application/wsdl+xml",
  },
  {
    extension: "wspolicy",
    "mime-type": "application/wspolicy+xml",
  },
  {
    extension: "wtb",
    "mime-type": "application/vnd.webturbo",
  },
  {
    extension: "wvx",
    "mime-type": "video/x-ms-wvx",
  },
  {
    extension: "x32",
    "mime-type": "application/x-authorware-bin",
  },
  {
    extension: "x3d",
    "mime-type": "model/x3d+xml",
  },
  {
    extension: "x3db",
    "mime-type": "model/x3d+binary",
  },
  {
    extension: "x3dbz",
    "mime-type": "model/x3d+binary",
  },
  {
    extension: "x3dv",
    "mime-type": "model/x3d+vrml",
  },
  {
    extension: "x3dvz",
    "mime-type": "model/x3d+vrml",
  },
  {
    extension: "x3dz",
    "mime-type": "model/x3d+xml",
  },
  {
    extension: "xaml",
    "mime-type": "application/xaml+xml",
  },
  {
    extension: "xap",
    "mime-type": "application/x-silverlight-app",
  },
  {
    extension: "xar",
    "mime-type": "application/vnd.xara",
  },
  {
    extension: "xbap",
    "mime-type": "application/x-ms-xbap",
  },
  {
    extension: "xbd",
    "mime-type": "application/vnd.fujixerox.docuworks.binder",
  },
  {
    extension: "xbm",
    "mime-type": "image/x-xbitmap",
  },
  {
    extension: "xdf",
    "mime-type": "application/xcap-diff+xml",
  },
  {
    extension: "xdm",
    "mime-type": "application/vnd.syncml.dm+xml",
  },
  {
    extension: "xdp",
    "mime-type": "application/vnd.adobe.xdp+xml",
  },
  {
    extension: "xdssc",
    "mime-type": "application/dssc+xml",
  },
  {
    extension: "xdw",
    "mime-type": "application/vnd.fujixerox.docuworks",
  },
  {
    extension: "xenc",
    "mime-type": "application/xenc+xml",
  },
  {
    extension: "xer",
    "mime-type": "application/patch-ops-error+xml",
  },
  {
    extension: "xfdf",
    "mime-type": "application/vnd.adobe.xfdf",
  },
  {
    extension: "xfdl",
    "mime-type": "application/vnd.xfdl",
  },
  {
    extension: "xht",
    "mime-type": "application/xhtml+xml",
  },
  {
    extension: "xhtml",
    "mime-type": "application/xhtml+xml",
  },
  {
    extension: "xhvml",
    "mime-type": "application/xv+xml",
  },
  {
    extension: "xif",
    "mime-type": "image/vnd.xiff",
  },
  {
    extension: "xla",
    "mime-type": "application/vnd.ms-excel",
  },
  {
    extension: "xlam",
    "mime-type": "application/vnd.ms-excel.addin.macroenabled.12",
  },
  {
    extension: "xlc",
    "mime-type": "application/vnd.ms-excel",
  },
  {
    extension: "xlf",
    "mime-type": "application/x-xliff+xml",
  },
  {
    extension: "xlm",
    "mime-type": "application/vnd.ms-excel",
  },
  {
    extension: "xls",
    "mime-type": "application/vnd.ms-excel",
  },
  {
    extension: "xlsb",
    "mime-type": "application/vnd.ms-excel.sheet.binary.macroenabled.12",
  },
  {
    extension: "xlsm",
    "mime-type": "application/vnd.ms-excel.sheet.macroenabled.12",
  },
  {
    extension: "xlsx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    extension: "xlt",
    "mime-type": "application/vnd.ms-excel",
  },
  {
    extension: "xltm",
    "mime-type": "application/vnd.ms-excel.template.macroenabled.12",
  },
  {
    extension: "xltx",
    "mime-type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  },
  {
    extension: "xlw",
    "mime-type": "application/vnd.ms-excel",
  },
  {
    extension: "xm",
    "mime-type": "audio/xm",
  },
  {
    extension: "xml",
    "mime-type": "application/xml",
  },
  {
    extension: "xo",
    "mime-type": "application/vnd.olpc-sugar",
  },
  {
    extension: "xop",
    "mime-type": "application/xop+xml",
  },
  {
    extension: "xpi",
    "mime-type": "application/x-xpinstall",
  },
  {
    extension: "xpl",
    "mime-type": "application/xproc+xml",
  },
  {
    extension: "xpm",
    "mime-type": "image/x-xpixmap",
  },
  {
    extension: "xpr",
    "mime-type": "application/vnd.is-xpr",
  },
  {
    extension: "xps",
    "mime-type": "application/vnd.ms-xpsdocument",
  },
  {
    extension: "xpw",
    "mime-type": "application/vnd.intercon.formnet",
  },
  {
    extension: "xpx",
    "mime-type": "application/vnd.intercon.formnet",
  },
  {
    extension: "xsl",
    "mime-type": "application/xml",
  },
  {
    extension: "xslt",
    "mime-type": "application/xslt+xml",
  },
  {
    extension: "xsm",
    "mime-type": "application/vnd.syncml+xml",
  },
  {
    extension: "xspf",
    "mime-type": "application/xspf+xml",
  },
  {
    extension: "xul",
    "mime-type": "application/vnd.mozilla.xul+xml",
  },
  {
    extension: "xvm",
    "mime-type": "application/xv+xml",
  },
  {
    extension: "xvml",
    "mime-type": "application/xv+xml",
  },
  {
    extension: "xwd",
    "mime-type": "image/x-xwindowdump",
  },
  {
    extension: "xyz",
    "mime-type": "chemical/x-xyz",
  },
  {
    extension: "xz",
    "mime-type": "application/x-xz",
  },
  {
    extension: "yang",
    "mime-type": "application/yang",
  },
  {
    extension: "yin",
    "mime-type": "application/yin+xml",
  },
  {
    extension: "z",
    "mime-type": "application/x-compress",
  },
  {
    extension: "z1",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z2",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z3",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z4",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z5",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z6",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z7",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "z8",
    "mime-type": "application/x-zmachine",
  },
  {
    extension: "zaz",
    "mime-type": "application/vnd.zzazz.deck+xml",
  },
  {
    extension: "zip",
    "mime-type": "application/zip",
  },
  {
    extension: "zir",
    "mime-type": "application/vnd.zul",
  },
  {
    extension: "zirz",
    "mime-type": "application/vnd.zul",
  },
  {
    extension: "zmm",
    "mime-type": "application/vnd.handheld-entertainment+xml",
  },
];
function mediaTypeOf(strIncludeFileSuffix) {
  if (paramIsOK(strIncludeFileSuffix)) {
    strIncludeFileSuffix = strContainChk(strIncludeFileSuffix, ".")
      ? strIncludeFileSuffix.substr(strIncludeFileSuffix.lastIndexOf(".") + 1)
      : strIncludeFileSuffix;
    for (let ele of MIME_MAPPING) {
      if (ele.extension == strIncludeFileSuffix) {
        return strIncludeFileSuffix.endsWith(".html") ||
          strIncludeFileSuffix.endsWith(".css") ||
          strIncludeFileSuffix.endsWith(".js") ||
          strIncludeFileSuffix.endsWith(".xml") ||
          strIncludeFileSuffix.endsWith(".json")
          ? `${ele["mime-type"]};charset=utf-8`
          : ele["mime-type"];
      }
    }
  }
}

function styleOnDarkMode() {
  head.innerHTML = `
  <style class="darkreader darkreader--fallback" media="screen"></style>
  <style class="darkreader darkreader--text" media="screen"></style>
  <style class="darkreader darkreader--invert" media="screen">
    .jfk-bubble.gtx-bubble,
    embed[type="application/pdf"] {
      filter: invert(100%) hue-rotate(180deg) contrast(90%) !important;
    }
  </style>
  <style class="darkreader darkreader--inline" media="screen">
    [data-darkreader-inline-bgcolor] {
      background-color: var(--darkreader-inline-bgcolor) !important;
    }
    [data-darkreader-inline-bgimage] {
      background-image: var(--darkreader-inline-bgimage) !important;
    }
    [data-darkreader-inline-border] {
      border-color: var(--darkreader-inline-border) !important;
    }
    [data-darkreader-inline-border-bottom] {
      border-bottom-color: var(--darkreader-inline-border-bottom) !important;
    }
    [data-darkreader-inline-border-left] {
      border-left-color: var(--darkreader-inline-border-left) !important;
    }
    [data-darkreader-inline-border-right] {
      border-right-color: var(--darkreader-inline-border-right) !important;
    }
    [data-darkreader-inline-border-top] {
      border-top-color: var(--darkreader-inline-border-top) !important;
    }
    [data-darkreader-inline-boxshadow] {
      box-shadow: var(--darkreader-inline-boxshadow) !important;
    }
    [data-darkreader-inline-color] {
      color: var(--darkreader-inline-color) !important;
    }
    [data-darkreader-inline-fill] {
      fill: var(--darkreader-inline-fill) !important;
    }
    [data-darkreader-inline-stroke] {
      stroke: var(--darkreader-inline-stroke) !important;
    }
    [data-darkreader-inline-outline] {
      outline-color: var(--darkreader-inline-outline) !important;
    }
  </style>
  <style class="darkreader darkreader--user-agent" media="screen">
    html {
      background-color: #181a1b !important;
    }
    html,
    body,
    input,
    textarea,
    select,
    button {
      background-color: #181a1b;
    }
    html,
    body,
    input,
    textarea,
    select,
    button {
      border-color: #736b5e;
      color: #e8e6e3;
    }
    a {
      color: #3391ff;
    }
    table {
      border-color: #545b5e;
    }
    ::placeholder {
      color: #b2aba1;
    }
    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      background-color: #555b00 !important;
      color: #e8e6e3 !important;
    }
    ::-webkit-scrollbar {
      background-color: #202324;
      color: #aba499;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #454a4d;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #575e62;
    }
    ::-webkit-scrollbar-thumb:active {
      background-color: #484e51;
    }
    ::-webkit-scrollbar-corner {
      background-color: #181a1b;
    }
    * {
      scrollbar-color: #202324 #454a4d;
    }
    ::selection {
      background-color: #004daa !important;
      color: #e8e6e3 !important;
    }
    ::-moz-selection {
      background-color: #004daa !important;
      color: #e8e6e3 !important;
    }
  </style>${head.innerHTML}`;
}
