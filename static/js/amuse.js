/**
 * @author Liangcheng Juves
 * Created at 2020/05/14 16:57
 */
let doc = document;
let win = window;
let xhr;

function docWrite(text) {
    doc.write(text);
}

/** Ignore error. */
function loadDarkMode() {
    firstOfHead('<style class="darkreader darkreader--fallback" media="screen"></style>'
        + '<style class="darkreader darkreader--text" media="screen"></style>'
        + '<style class="darkreader darkreader--invert" media="screen">'
        + '.jfk-bubble,embed[type="application/pdf"],a[href="/product"],'
        + '.registration-hero.form-prompt{filter:invert(100%)hue-rotate(180deg)'
        + 'contrast(90%)!important}</style>'
        + '<style class="darkreader darkreader--inline" media="screen">'
        + '[data-darkreader-inline-bgcolor]{'
        + 'background-color:var(--darkreader-inline-bgcolor)!important'
        + '}[data-darkreader-inline-bgimage]{'
        + 'background-image:var(--darkreader-inline-bgimage)!important}'
        + '[data-darkreader-inline-border]{'
        + 'border-color:var(--darkreader-inline-border)!important}'
        + '[data-darkreader-inline-border-bottom]{'
        + 'border-bottom-color:var(--darkreader-inline-border-bottom)!important}'
        + '[data-darkreader-inline-border-left]{'
        + 'border-left-color:var(--darkreader-inline-border-left)!important}'
        + '[data-darkreader-inline-border-right]{'
        + 'border-right-color:var(--darkreader-inline-border-right)!important}'
        + '[data-darkreader-inline-border-top]{'
        + 'border-top-color:var(--darkreader-inline-border-top)!important}'
        + '[data-darkreader-inline-boxshadow]{'
        + 'box-shadow:var(--darkreader-inline-boxshadow)!important}'
        + '[data-darkreader-inline-color]{'
        + 'color:var(--darkreader-inline-color)!important}'
        + '[data-darkreader-inline-fill]{'
        + 'fill:var(--darkreader-inline-fill)!important}'
        + '[data-darkreader-inline-stroke]{'
        + 'stroke:var(--darkreader-inline-stroke)!important}'
        + '[data-darkreader-inline-outline]{'
        + 'outline-color:var(--darkreader-inline-outline)!important}</style>'
        + '<style class="darkreader darkreader--user-agent" media="screen">'
        + 'html{background-color:#181a1b!important}html,body,input,textarea,select,button{'
        + 'background-color:#181a1b}html,body,input,textarea,select,button{'
        + 'border-color:#575757;color:#e8e6e3}a{color:#3391ff}table{'
        + 'border-color:#4c4c4c}::placeholder{color:#bab5ab}'
        + 'input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill{'
        + 'background-color:#545b00!important;color:#e8e6e3!important}'
        + '::-webkit-scrollbar{background-color:#1c1e1f;color:#c5c1b9}'
        + '::-webkit-scrollbar-thumb{background-color:#2f3234}'
        + '::-webkit-scrollbar-thumb:hover{background-color:#383b3e}'
        + '::-webkit-scrollbar-thumb:active{background-color:#3d4043}'
        + '::-webkit-scrollbar-corner{background-color:#181a1b}*{'
        + 'scrollbar-color:#1c1e1f#2f3234}'
        + '::selection{background-color:#005ccc!important;color:#ffffff!important}'
        + '::-moz-selection{background-color:#005ccc!important;color:#ffffff!important}'
        + '</style>');
}


function loadCommonHead(title) {
    firstOfHead('<meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">'
        + '<meta http-equiv="X-UA-Compatible" content="ie=edge">'
        + '<title>' + title + '</title>'
        + '<link rel="icon" type="image/x-icon" href="/static/img/favicon.ico">'
        + '<link rel="shortcut icon" type="image/x-icon" href="/static/img/favicon.ico">');
}

function loadBeautyFont() {
    docWrite('<style rel="stylesheet" type="text/css">*{font-family:"Helvetica Neue",Helvetica,Arial,"Microsoft Yahei",'
        + '"Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif}</style>');
}

function loadJQ() {
    firstOfHead('<script src="https://code.jquery.com/jquery-3.5.1.js" '
        + 'integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" '
        + 'crossorigin="anonymous"></script>');
}

function loadJQMin() {
    firstOfHead('<script src="https://code.jquery.com/jquery-3.5.1.min.js" '
        + 'integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" '
        + 'crossorigin="anonymous"></script>');
}

function loadJQSlim() {
    firstOfHead('<script src="https://code.jquery.com/jquery-3.5.1.slim.js" '
        + 'integrity="sha256-DrT5NfxfbHvMHux31Lkhxg42LY6of8TaYyK50jnxRnM=" '
        + 'crossorigin="anonymous"></script>');
}

function loadJQSlimMin() {
    firstOfHead('<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" '
        + 'integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" '
        + 'crossorigin="anonymous"></script>');
}

function jsof(src) {
    firstOfHead('<script src="' + src + '"></script>');
}

function loadVue() {
    jsof('https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
}

function loadVueMin() {
    jsof('https://cdn.jsdelivr.net/npm/vue@2.6.11');
}


function loadBootstrap() {
    firstOfHead('<link rel="stylesheet" '
        + 'href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" '
        + 'integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" '
        + 'crossorigin="anonymous">'
        + '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" '
        + 'integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" '
        + 'crossorigin="anonymous"></script>');
}


function loadFullBootstrap() {
    loadBootstrap();
    firstOfHead('<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" '
        + 'integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" '
        + 'crossorigin="anonymous"></script>'
        + '<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" '
        + 'integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" '
        + 'crossorigin="anonymous"></script>');
}


function wol(handler) {
    if (win.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    win.onload = handler();
}

function wlhref(src) {
    win.location.href = src;
}

function whisgo(num) {
    win.history.go(num);
}

function whisback() {
    win.history.back();
}

function whisforward() {
    win.history.forward();
}

function ele(eleId) {
    return doc.getElementById(eleId);
}

function eleClick(eleId, handler) {
    ele(eleId).onclick = handler();
}

function eleFocus(eleId, handler) {
    ele(eleId).onfocus = handler();
}


function elesByName(eleName) {
    return doc.getElementsByName(eleName);
}

function elesByTagName(qualifiedName) {
    return doc.getElementsByTagName(qualifiedName);
}

function elesByTagNameNS(namespaceURI, localName) {
    return doc.getElementsByTagNameNS(namespaceURI, localName);
}

function elesByClassName(classNames) {
    return doc.getElementsByClassName(classNames);
}


function getTitle() {
    return elesByTagName('title')[0].innerText;
}

function docQuery(selectors) {
    return doc.querySelector(selectors);
}

function docQueryAll(selectors) {
    return doc.querySelectorAll(selectors);
}

function firstOfHead(text) {
    let head = elesByTagName('head')[0];
    head.innerHTML = text + head.innerHTML;
}