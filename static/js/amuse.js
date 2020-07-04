/**
 * Created at 2020/05/14 16:57.
 *
 * @author Liangcheng Juves
 */
let doc = document;
let win = window;
let xhr;

let docWrite = (text) => doc.write(text);

let firstOfHead = (text) => {
  let head = elesByTagName("head")[0];
  head.innerHTML = `${text}${head.innerHTML}`;
};

let wol = (handler) => {
  xhr = win.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  win.onload = handler();
};

let wlhref = (src) => void (win.location.href = src);
let whisgo = (num) => void win.history.go(num);
let whisback = () => void win.history.back();
let whisforward = () => void win.history.forward();

let ele = (eleId) => doc.getElementById(eleId);
let eleClick = (eleId, handler) => void (ele(eleId).onclick = handler());
let eleFocus = (eleId, handler) => void (ele(eleId).onfocus = handler());

let elesByName = (eleName) => doc.getElementsByName(eleName);
let elesByTagName = (qualifiedName) => doc.getElementsByTagName(qualifiedName);
let elesByTagNameNS = (namespaceURI, localName) =>
  doc.getElementsByTagNameNS(namespaceURI, localName);

let elesByClassName = (classNames) => doc.getElementsByClassName(classNames);

let title = () => elesByTagName("title")[0].innerText;

let docQuery = (selectors) => doc.querySelector(selectors);

let docQueryAll = (selectors) => doc.querySelectorAll(selectors);

let loadDarkMode = () => void jsof("dark_mode.js");

(function () {
  firstOfHead(`<meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0,
   maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="/static/img/favicon.ico">`);
})();

function loadBeautyFont() {
  docWrite(
    '<style rel="stylesheet" type="text/css">*{font-family:"Helvetica Neue",Helvetica,Arial,"Microsoft Yahei",' +
      '"Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif}</style>'
  );
}

function loadJQ() {
  firstOfHead(
    '<script src="https://code.jquery.com/jquery-3.5.1.js" ' +
      'integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" ' +
      'crossorigin="anonymous"></script>'
  );
}

function loadJQMin() {
  firstOfHead(
    '<script src="https://code.jquery.com/jquery-3.5.1.min.js" ' +
      'integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" ' +
      'crossorigin="anonymous"></script>'
  );
}

function loadJQSlim() {
  firstOfHead(
    '<script src="https://code.jquery.com/jquery-3.5.1.slim.js" ' +
      'integrity="sha256-DrT5NfxfbHvMHux31Lkhxg42LY6of8TaYyK50jnxRnM=" ' +
      'crossorigin="anonymous"></script>'
  );
}

function loadJQSlimMin() {
  firstOfHead(
    '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" ' +
      'integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" ' +
      'crossorigin="anonymous"></script>'
  );
}

function jsof(src) {
  firstOfHead(`<script src="${src}"></script>`);
}

function loadVue() {
  jsof("https://cdn.jsdelivr.net/npm/vue/dist/vue.js");
}

function loadVueMin() {
  jsof("https://cdn.jsdelivr.net/npm/vue@2.6.11");
}

function loadBootstrap() {
  firstOfHead(
    '<link rel="stylesheet" ' +
      'href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" ' +
      'integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" ' +
      'crossorigin="anonymous">' +
      '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" ' +
      'integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" ' +
      'crossorigin="anonymous"></script>'
  );
}

function loadFullBootstrap() {
  loadBootstrap();
  firstOfHead(
    '<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" ' +
      'integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" ' +
      'crossorigin="anonymous"></script>' +
      '<script  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" ' +
      'integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" ' +
      'crossorigin="anonymous"></script>'
  );
}
