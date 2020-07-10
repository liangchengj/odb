/**
 * Created at 2020/7/2 5:11.
 *
 * @author Liangcheng Juves
 * @author Noah
 */

let strContainChk = (target, ch) => target.indexOf(ch) != -1;
let paramIsOK = (target) => null != target && undefined != target;

const NONE = "\033[0m";
const HIGH_LIGHT = "\033[1m";
const UNDER_LINE = "\033[4m";
const FLASHING = "\033[5m";
const REVERSE = "\033[7m";
const BLANKING = "\033[8m";
const CLEAR_SCREEN = "\033[2J";
const CLEAR_CONTENT_FROM_CURSOR_OF_EOL = "\033[K";

const RED = "\033[0;32;31m";
const GREEN = "\033[0;32;32m";
const BLUE = "\033[0;32;34m";

const WHITE = "\033[1;37m";
const CYAN = "\033[0;36m";
const PURPLE = "\033[0;35m";
const YELLOW = "\033[1;33m";
const BROWN = "\033[0;33m";

const LIGHT_RED = "\033[1;31m";
const LIGHT_GREEN = "\033[1;32m";
const LIGHT_BLUE = "\033[1;34m";
const LIGHT_CYAN = "\033[1;36m";
const LIGHT_PURPLE = "\033[1;35m";
const LIGHT_GRAY = "\033[0;37m";

const DARK_GRAY = "\033[1;30m";

let MOVE_CURSOR_UP = (n) => "\033[" + n + "A";
let MOVE_CURSOR_DOWN = (n) => "\033[" + n + "B";
let MOVE_CURSOR_RIGHT = (n) => "\033[" + n + "C";
let MOVE_CURSOR_LEFT = (n) => "\033[" + n + "D";

/**
 * Set cursor position (y column x row).
 * \033[y;xH
 *
 * @param {column} y
 * @param {row} x
 */
let MOVE_CURSOR_POSTION = (y, x) => "\033[" + y + ";" + x + "H";

const LOCAL_IP = (() => {
  let nifaces = require("os").networkInterfaces();
  for (let devName in nifaces) {
    for (let alias of nifaces[devName]) {
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
})();
const PORT = 80;
const INDEX_PAGE = "index.html";
const DO_COMPRESS_HTML = true;
const DO_COMPRESS_JS = true;

// let a = `https://www.liangchengj.com`;

/**
 * ${LIGHT_BLUE}
 */

/**
 * REGEXP
 *
 * Match the <script></script> tag pair that does not exist in the comment.
 * (?<!<!--[ \n]*|(\*[\s\S](\*\*\/)*|\/\/|#|--).*)<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>(?![ \n]*-->)
 *
 * Match the pair of <script></script> tags present in the comment.
 * <script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>
 *
 * Match the EL expression.
 * (?<!(\/\/|#|--|\*[\s\S](\*\*\/)*).*|<!--[ \n]*)\$\{([^\}]+)\}(?![ \n]*-->)
 *
 * Match all comments.
 * <!--([\s\S|\r]*?)-->|\/\*(.|\r\n|\n)*?\*\/|(?<!:.*|<[\s\S]*=")\/\/.*
 *
 * Match multiple lines of comments.
 * (?<!\/\/|#|--.*|<!--[ \n]*)\/\*[\s\S\n]*?\*\/(?![ \n]*-->)
 *
 * Match single-line comments.
 * (?<!:.*|("|`|').*|\b(let|var)\b.*|\/[^\/]*|(\*[\s\S](\*\*\/)*))\/\/.*
 * test :: (?<!(:|#|--).*|\\|\b(let|var)\b.*=[ ]*|((`|'|")[^\/]*))\/\/.*[^`]
 *
 * Match XML tag comments.
 * (?<!(\/\/|#|--|\*[\s\S](\*\*\/)*).*)<!--([\s\S\n]*?)-->
 *
 * Match blank lines.
 * ^\s*\n
 *
 * Match the ES character template.
 * (?<!(\\|(\/\/|\*[\s\S](\*\*\/)*|#|--).*))`([\s\S\n]*?)[^\\]`
 *
 */

//  let a =  //

let rmComment = (code) => code; // .replace(/\/\*(.|\r\n|\n)*?\*\/|(?<!:.*|<[\s\S]*=")\/\/.*/gi, (...args) => //   args[0] //     .replace(/(.*)(?=<\/.*script>)/, "") //     .replace(/(.*)(?=<\/.*style>)/, "") // );
// .replace(/<!--([\s\S|\r]*?)-->/gi, "")
// .replace(/\/\*(.|\r\n|\n)*?\*\//gi, "")
/*  .replace(/^\s\S*\n/gim, "") */ let compressHtml = (html) =>
  rmComment(html)
    .replace(/\r+|\n/gi, "")
    .replace(/[ ]+</gi, "<")
    .replace(/>[ ]+/gi, ">")
    .replace(/(?<=.*)[ ]+(?=\/>)/gi, "");

let compressJs = (js) =>
  rmComment(js)
    .replace(/\blet\b(?=\=|\bin\b|\bof\b)*/gi, "var")
    // (\([^(]*\))\s*=>(?!.\{)([^;])*
    .replace(/(\([^()]*\))\s*=>(?=\s*\{(.|\n)*\})/gis, "function $1");
// .replace(
//   /(?<!(\/\/[\s\S])|(\*[\s\S](\*\*\/)*))`([\s\S]*)`(?!\*\/*)/gi /* *`*`* */,
//   (...args) => {
//     // let test =
//     //   '<span class="book_content"><img src="/static/img/book_icon.svg"/>' +
//     //   '<a href="javascript:void(0);" onclick="loadPdf(\'" + url+ "\');">《 " + bookName.substring(' +
//     //   "0," +
//     //   'bookName.lastIndexOf(".")' +
//     //   ')+ " 》</a>' +
//     //   "</span>";

//     let tmp = args[0];
//     if (
//       tmp.startsWith(`//`) == -1 ||
//       tmp.startsWith("*") ||
//       tmp.endsWith("*/")
//     ) {
//       return tmp;
//     } else {
//       return `"${tmp
//         // Handle \` escape characters in template strings
//         .replace(/\`/gi, "")
//         // Solve the HTML tags escape character " -> \"
//         .replace(/"/gi, '\\"')
//         // Processing methods in all escape character \" -> "
//         .replace(/((?<=\()\\")|\\"(?=\))/gi, `"`)
//         // To solve the problem of the single quotes to invoke the method
//         .replace(/"'(?=\))/gi, `'"`)
//         // String format template
//         .replace(/ *[\r\n]+ */gi, '"\n\t+ "')
//         // Methods a newline in the body
//         .replace(/(?<=\()(.*)(?=\))/gis, (...args) =>
//           args[1].replace(/"\n\t\+ "/gi, "")
//         )
//         // Deal with EL expression
//         .replace(/\$\{([^\}]+)\}/gi, `" + $1 + "`)}"`; // a
//     }
//   }
// );

let commonRespHeaderOf = (contentType, contentLength, strOfDate) => ({
  Connection: "Keep-Alive",
  "Content-Type": contentType,
  "Content-Length": contentLength,
  Date: strOfDate,
  Host: LOCAL_IP,
});

function callBack(resp, status, respHeader, data) {
  resp.writeHead(status, respHeader);
  resp.write(data);
}

let http = require("http");
let fs = require("fs");
let url = require("url");

http
  .createServer((req, resp) => {
    let pathname = decodeURIComponent(url.parse(req.url).pathname);
    let strOfDate = new Date().toString();
    console.log(
      `   ${LIGHT_BLUE}[ ${strOfDate} ]${NONE}   Request for ${UNDER_LINE}${LIGHT_CYAN}${pathname}${NONE} received.`
    );
    let gotoPathName = pathname.substr(1);
    gotoPathName =
      fs.existsSync(gotoPathName) && fs.statSync(gotoPathName).isDirectory()
        ? `${gotoPathName}/${INDEX_PAGE}`
        : gotoPathName;
    gotoPathName = "" == gotoPathName ? INDEX_PAGE : gotoPathName;

    fs.readFile(gotoPathName, (err, data) => {
      if (err) {
        let errHtml = HTML_NOT_FOUND(pathname);
        callBack(
          resp,
          404,
          commonRespHeaderOf(mediaTypeOf(".html"), errHtml.length, strOfDate),
          errHtml
        );
      } else {
        let fileExt = gotoPathName.trim();
        let compressedData = "";
        compressedData =
          fileExt.endsWith(".html") && DO_COMPRESS_HTML
            ? compressHtml(data.toString())
            : compressedData;

        compressedData =
          fileExt.endsWith(".js") && DO_COMPRESS_JS
            ? compressJs(data.toString())
            : compressedData;

        callBack(
          resp,
          200,
          ((shouldDel) => {
            let tmp = commonRespHeaderOf(
              mediaTypeOf(gotoPathName),
              "" == compressedData ? data.length : compressedData.length,
              strOfDate
            );
            if (shouldDel) {
              delete tmp["Connection"];
              delete tmp["Content-Length"];
            }
            return tmp;
          })(fileExt.endsWith(".html") | fileExt.endsWith(".js")),
          "" == compressedData ? data : compressedData
        );
      }
      resp.end();
    });
  })
  .listen(PORT);

console.log(
  `Server running at ${LIGHT_GREEN}${UNDER_LINE}http://${LOCAL_IP}:${PORT}/${NONE} ${LIGHT_GREEN}.${NONE}`
);

function HTML_NOT_FOUND(path) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>server.js [ 404 ]</title><style rel="stylesheet" type="text/css">* {        margin: 0;        padding: 0;        color: #6e9f60;        font-family: Menlo;        font-size: 1.2rem;      }      body div {        position: absolute;        left: 50%;        top: 50%;        transform: translate(-50%, -50%);        text-align: center;      }</style></head><body><div><svg        t="1594129257084"        class="icon"        viewBox="0 0 1024 1024"        version="1.1"        xmlns="http://www.w3.org/2000/svg"        p-id="800"        xmlns:xlink="http://www.w3.org/1999/xlink"        width="380"        height="380"      ><defs><style type="text/css"/></defs><path          d="M506.9 786.4c-3 0-5.9-0.8-8.5-2.3l-27-16c-4-2.3-2.1-3.1-0.7-3.5 5.4-1.9 6.5-2.3 12.2-5.6 0.6-0.3 1.4-0.2 2 0.1l20.8 12.3c0.7 0.4 1.8 0.4 2.5 0l80.9-46.7c0.7-0.4 1.2-1.3 1.2-2.2v-93.4c0-0.9-0.5-1.8-1.3-2.2l-80.9-46.7c-0.7-0.4-1.7-0.4-2.5 0L424.8 627c-0.8 0.4-1.3 1.3-1.3 2.2v93.4c0 0.9 0.5 1.7 1.3 2.2l22.2 12.8c12 6 19.4-1.1 19.4-8.2v-92.2c0-1.3 1-2.3 2.3-2.3h10.2c1.3 0 2.3 1 2.3 2.3v92.2c0 16-8.7 25.3-24 25.3-4.7 0-8.4 0-18.7-5.1l-21.2-12.2c-5.2-3-8.5-8.7-8.5-14.8v-93.4c0-6.1 3.2-11.7 8.5-14.7l81-46.7c5.1-2.9 11.9-2.9 17 0l80.9 46.7c5.2 3 8.5 8.7 8.5 14.7v93.4c0 6.1-3.3 11.7-8.5 14.7L515.3 784c-2.5 1.6-5.5 2.3-8.4 2.4"          fill="#689F63"          p-id="801"/><path          d="M531.9 722c-35.4 0-42.8-16.3-42.8-29.9 0-1.3 1-2.3 2.3-2.3h10.5c1.2 0 2.1 0.8 2.3 2 1.6 10.6 6.3 16 27.7 16 17.1 0 24.3-3.9 24.3-12.9 0-5.2-2.1-9.1-28.6-11.7-22.2-2.2-35.9-7.1-35.9-24.8 0-16.3 13.8-26 36.8-26 25.9 0 38.7 9 40.4 28.3 0.1 0.7-0.2 1.3-0.6 1.8-0.4 0.5-1.1 0.7-1.7 0.7h-10.5c-1.1 0-2-0.8-2.3-1.8-2.5-11.2-8.6-14.8-25.3-14.8-18.6 0-20.8 6.5-20.8 11.3 0 5.9 2.6 7.6 27.7 10.9 24.9 3.3 36.7 8 36.7 25.4 0 17.6-14.7 27.7-40.3 27.7m98.5-98.8h2.7c2.2 0 2.7-1.6 2.7-2.5 0-2.4-1.6-2.4-2.6-2.4h-2.8v4.9z m-3.3-7.6h6c2.1 0 6.1 0 6.1 4.6 0 3.2-2.1 3.9-3.3 4.3 2.4 0.2 2.6 1.7 2.9 4 0.2 1.4 0.4 3.8 0.9 4.6h-3.7c-0.1-0.8-0.7-5.3-0.7-5.5-0.2-1-0.6-1.5-1.8-1.5h-3.1v7H627v-17.5z m-7.2 8.7c0 7.3 5.9 13.1 13 13.1 7.3 0 13.1-6 13.1-13.1 0-7.3-5.9-13-13.1-13-7.1-0.1-13.1 5.6-13 13m28.6 0c0 8.6-7 15.6-15.6 15.6-8.5 0-15.6-6.9-15.6-15.6 0-8.8 7.3-15.6 15.6-15.6 8.4 0 15.6 6.8 15.6 15.6"          fill="#689F63"          p-id="802"/><path          d="M256.3 421c0-3.7-2-7.1-5.2-9l-85.8-49.4c-1.4-0.9-3.1-1.3-4.7-1.4h-0.9c-1.6 0.1-3.3 0.5-4.7 1.4L69.2 412c-3.2 1.9-5.2 5.3-5.2 9l0.2 133c0 1.8 1 3.6 2.6 4.5 1.6 1 3.6 1 5.1 0l51-29.2c3.2-1.9 5.2-5.3 5.2-9v-62.1c0-3.7 2-7.1 5.2-9l21.7-12.5c1.6-0.9 3.4-1.4 5.2-1.4 1.8 0 3.6 0.5 5.2 1.4l21.7 12.5c3.2 1.8 5.2 5.3 5.2 9v62.1c0 3.7 2 7.1 5.2 9l51 29.2c1.6 1 3.6 1 5.2 0 1.6-0.9 2.6-2.6 2.6-4.5V421z m404.8 69.2c0 0.9-0.5 1.8-1.3 2.2l-29.5 17c-0.8 0.5-1.8 0.5-2.6 0l-29.5-17c-0.8-0.5-1.3-1.3-1.3-2.2v-34c0-0.9 0.5-1.8 1.3-2.2l29.5-17c0.8-0.5 1.8-0.5 2.6 0l29.5 17c0.8 0.5 1.3 1.3 1.3 2.2v34z m8-251.9c-1.6-0.9-3.6-0.9-5.2 0.1-1.6 0.9-2.6 2.6-2.6 4.5v131.7c0 1.3-0.7 2.5-1.8 3.1-1.1 0.6-2.5 0.6-3.6 0l-21.5-12.4c-3.2-1.9-7.1-1.9-10.4 0l-85.8 49.5c-3.2 1.8-5.2 5.3-5.2 9v99.1c0 3.7 2 7.1 5.2 9l85.8 49.6c3.2 1.8 7.1 1.8 10.4 0l85.8-49.6c3.2-1.9 5.2-5.3 5.2-9V275.8c0-3.8-2-7.2-5.3-9.1l-51-28.4z m285.7 217c3.2-1.9 5.2-5.3 5.2-9v-24c0-3.7-2-7.1-5.2-9l-85.3-49.5a10.2 10.2 0 0 0-10.4 0l-85.8 49.5c-3.2 1.9-5.2 5.3-5.2 9v99c0 3.7 2 7.2 5.2 9l85.3 48.6c3.1 1.8 7 1.8 10.2 0.1l51.6-28.7c1.6-0.9 2.7-2.6 2.7-4.5s-1-3.6-2.6-4.5l-86.3-49.5c-1.6-0.9-2.6-2.6-2.6-4.5v-31.1c0-1.9 1-3.6 2.6-4.5l26.9-15.5c1.6-0.9 3.6-0.9 5.2 0l26.9 15.5c1.6 0.9 2.6 2.6 2.6 4.5v24.4c0 1.8 1 3.6 2.6 4.5 1.6 0.9 3.6 0.9 5.2 0l51.2-29.8z"          fill="#231815"          p-id="803"/><path          d="M863.1 450.7c0.6-0.4 1.4-0.4 2 0l16.5 9.5c0.6 0.4 1 1 1 1.7v19c0 0.7-0.4 1.4-1 1.7l-16.5 9.5c-0.6 0.4-1.4 0.4-2 0l-16.5-9.5c-0.6-0.4-1-1-1-1.7v-19c0-0.7 0.4-1.4 1-1.7l16.5-9.5zM487.5 415.6l-0.2-0.2c-0.1-0.1-0.2-0.2-0.4-0.3-0.2-0.2-0.5-0.4-0.7-0.6-0.1-0.1-0.1-0.1-0.2-0.1l-0.9-0.6-55.9-32.3-8.9-5.1-20.6-11.9c-0.9-0.5-1.8-0.8-2.7-1.1-0.8-0.2-1.6-0.3-2.4-0.3H393.6h-0.1c-0.2 0-0.4 0.1-0.6 0.1-0.2 0-0.4 0.1-0.5 0.1-0.2 0.1-0.5 0.1-0.7 0.2-0.1 0-0.3 0.1-0.4 0.1-0.3 0.1-0.5 0.2-0.7 0.3h-0.1c-0.3 0.1-0.6 0.3-0.9 0.5l-65.8 38-19.3 11.1-0.2 0.1c-3.2 1.8-5.2 5.2-5.2 8.9v98.6c0 2.3 0.8 4.5 2.1 6.3 0.2 0.3 0.5 0.6 0.8 0.9l0.2 0.2c0.2 0.2 0.5 0.4 0.7 0.7l0.2 0.2c0.3 0.3 0.7 0.5 1.1 0.7l74.4 43 11 6.3c0.9 0.5 1.8 0.9 2.8 1.1 0.2 0 0.4 0.1 0.5 0.1 0.3 0 0.5 0.1 0.8 0.1 0.3 0 0.5 0 0.8 0.1h0.3c0.4 0 0.7 0 1.1-0.1h0.4c0.3 0 0.6-0.1 0.9-0.2 0.1 0 0.2 0 0.3-0.1h0.2l0.9-0.3c0.1 0 0.1 0 0.2-0.1l1.2-0.6 85.3-49.3c2.6-1.5 4.4-4.2 5-7.1 0.1-0.6 0.2-1.2 0.2-1.8v-98.6c-0.2-2.7-1.2-5.2-3-7z"          fill="#689F63"          p-id="804"/></svg><br/><br/><br/><span>Not found =>&nbsp;\`${path}\`</span></div></body></html>`;
} // args
/**
 * //
 */

// `a`;
/**
 * `a`
 */

/**
 * //
 */

/*  .replace(/^\s\S*\n/gim, "") */

//

function mediaTypeOf(strIncludeFileSuffix) {
  if (paramIsOK(strIncludeFileSuffix)) {
    strIncludeFileSuffix = strContainChk(strIncludeFileSuffix, ".")
      ? strIncludeFileSuffix.substr(strIncludeFileSuffix.lastIndexOf(".") + 1)
      : strIncludeFileSuffix;
    for (let ele of MIME_MAPPING()) {
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

function MIME_MAPPING() {
  let mimeMapping = [
    ["123", "application/vnd.lotus-1-2-3"],
    ["3dml", "text/vnd.in3d.3dml"],
    ["3ds", "image/x-3ds"],
    ["3g2", "video/3gpp2"],
    ["3gp", "video/3gpp"],
    ["7z", "application/x-7z-compressed"],
    ["aab", "application/x-authorware-bin"],
    ["aac", "audio/x-aac"],
    ["aam", "application/x-authorware-map"],
    ["aas", "application/x-authorware-seg"],
    ["abs", "audio/x-mpeg"],
    ["abw", "application/x-abiword"],
    ["ac", "application/pkix-attr-cert"],
    ["acc", "application/vnd.americandynamics.acc"],
    ["ace", "application/x-ace-compressed"],
    ["acu", "application/vnd.acucobol"],
    ["acutc", "application/vnd.acucorp"],
    ["adp", "audio/adpcm"],
    ["aep", "application/vnd.audiograph"],
    ["afm", "application/x-font-type1"],
    ["afp", "application/vnd.ibm.modcap"],
    ["ahead", "application/vnd.ahead.space"],
    ["ai", "application/postscript"],
    ["aif", "audio/x-aiff"],
    ["aifc", "audio/x-aiff"],
    ["aiff", "audio/x-aiff"],
    ["aim", "application/x-aim"],
    ["air", "application/vnd.adobe.air-application-installer-package+zip"],
    ["ait", "application/vnd.dvb.ait"],
    ["ami", "application/vnd.amiga.ami"],
    ["anx", "application/annodex"],
    ["apk", "application/vnd.android.package-archive"],
    ["appcache", "text/cache-manifest"],
    ["application", "application/x-ms-application"],
    ["apr", "application/vnd.lotus-approach"],
    ["arc", "application/x-freearc"],
    ["art", "image/x-jg"],
    ["asc", "application/pgp-signature"],
    ["asf", "video/x-ms-asf"],
    ["asm", "text/x-asm"],
    ["aso", "application/vnd.accpac.simply.aso"],
    ["asx", "video/x-ms-asf"],
    ["atc", "application/vnd.acucorp"],
    ["atom", "application/atom+xml"],
    ["atomcat", "application/atomcat+xml"],
    ["atomsvc", "application/atomsvc+xml"],
    ["atx", "application/vnd.antix.game-component"],
    ["au", "audio/basic"],
    ["avi", "video/x-msvideo"],
    ["avx", "video/x-rad-screenplay"],
    ["aw", "application/applixware"],
    ["axa", "audio/annodex"],
    ["axv", "video/annodex"],
    ["azf", "application/vnd.airzip.filesecure.azf"],
    ["azs", "application/vnd.airzip.filesecure.azs"],
    ["azw", "application/vnd.amazon.ebook"],
    ["bat", "application/x-msdownload"],
    ["bcpio", "application/x-bcpio"],
    ["bdf", "application/x-font-bdf"],
    ["bdm", "application/vnd.syncml.dm+wbxml"],
    ["bed", "application/vnd.realvnc.bed"],
    ["bh2", "application/vnd.fujitsu.oasysprs"],
    ["bin", "application/octet-stream"],
    ["blb", "application/x-blorb"],
    ["blorb", "application/x-blorb"],
    ["bmi", "application/vnd.bmi"],
    ["bmp", "image/bmp"],
    ["body", "text/html"],
    ["book", "application/vnd.framemaker"],
    ["box", "application/vnd.previewsystems.box"],
    ["boz", "application/x-bzip2"],
    ["bpk", "application/octet-stream"],
    ["btif", "image/prs.btif"],
    ["bz", "application/x-bzip"],
    ["bz2", "application/x-bzip2"],
    ["c", "text/x-c"],
    ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
    ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
    ["c4d", "application/vnd.clonk.c4group"],
    ["c4f", "application/vnd.clonk.c4group"],
    ["c4g", "application/vnd.clonk.c4group"],
    ["c4p", "application/vnd.clonk.c4group"],
    ["c4u", "application/vnd.clonk.c4group"],
    ["cab", "application/vnd.ms-cab-compressed"],
    ["caf", "audio/x-caf"],
    ["cap", "application/vnd.tcpdump.pcap"],
    ["car", "application/vnd.curl.car"],
    ["cat", "application/vnd.ms-pki.seccat"],
    ["cb7", "application/x-cbr"],
    ["cba", "application/x-cbr"],
    ["cbr", "application/x-cbr"],
    ["cbt", "application/x-cbr"],
    ["cbz", "application/x-cbr"],
    ["cc", "text/x-c"],
    ["cct", "application/x-director"],
    ["ccxml", "application/ccxml+xml"],
    ["cdbcmsg", "application/vnd.contact.cmsg"],
    ["cdf", "application/x-cdf"],
    ["cdkey", "application/vnd.mediastation.cdkey"],
    ["cdmia", "application/cdmi-capability"],
    ["cdmic", "application/cdmi-container"],
    ["cdmid", "application/cdmi-domain"],
    ["cdmio", "application/cdmi-object"],
    ["cdmiq", "application/cdmi-queue"],
    ["cdx", "chemical/x-cdx"],
    ["cdxml", "application/vnd.chemdraw+xml"],
    ["cdy", "application/vnd.cinderella"],
    ["cer", "application/pkix-cert"],
    ["cfs", "application/x-cfs-compressed"],
    ["cgm", "image/cgm"],
    ["chat", "application/x-chat"],
    ["chm", "application/vnd.ms-htmlhelp"],
    ["chrt", "application/vnd.kde.kchart"],
    ["cif", "chemical/x-cif"],
    ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
    ["cil", "application/vnd.ms-artgalry"],
    ["cla", "application/vnd.claymore"],
    ["class", "application/java"],
    ["clkk", "application/vnd.crick.clicker.keyboard"],
    ["clkp", "application/vnd.crick.clicker.palette"],
    ["clkt", "application/vnd.crick.clicker.template"],
    ["clkw", "application/vnd.crick.clicker.wordbank"],
    ["clkx", "application/vnd.crick.clicker"],
    ["clp", "application/x-msclip"],
    ["cmc", "application/vnd.cosmocaller"],
    ["cmdf", "chemical/x-cmdf"],
    ["cml", "chemical/x-cml"],
    ["cmp", "application/vnd.yellowriver-custom-menu"],
    ["cmx", "image/x-cmx"],
    ["cod", "application/vnd.rim.cod"],
    ["com", "application/x-msdownload"],
    ["conf", "text/plain"],
    ["cpio", "application/x-cpio"],
    ["cpp", "text/x-c"],
    ["cpt", "application/mac-compactpro"],
    ["crd", "application/x-mscardfile"],
    ["crl", "application/pkix-crl"],
    ["crt", "application/x-x509-ca-cert"],
    ["cryptonote", "application/vnd.rig.cryptonote"],
    ["csh", "application/x-csh"],
    ["csml", "chemical/x-csml"],
    ["csp", "application/vnd.commonspace"],
    ["css", "text/css"],
    ["cst", "application/x-director"],
    ["csv", "text/csv"],
    ["cu", "application/cu-seeme"],
    ["curl", "text/vnd.curl"],
    ["cww", "application/prs.cww"],
    ["cxt", "application/x-director"],
    ["cxx", "text/x-c"],
    ["dae", "model/vnd.collada+xml"],
    ["daf", "application/vnd.mobius.daf"],
    ["dart", "application/vnd.dart"],
    ["dataless", "application/vnd.fdsn.seed"],
    ["davmount", "application/davmount+xml"],
    ["dbk", "application/docbook+xml"],
    ["dcr", "application/x-director"],
    ["dcurl", "text/vnd.curl.dcurl"],
    ["dd2", "application/vnd.oma.dd2+xml"],
    ["ddd", "application/vnd.fujixerox.ddd"],
    ["deb", "application/x-debian-package"],
    ["def", "text/plain"],
    ["deploy", "application/octet-stream"],
    ["der", "application/x-x509-ca-cert"],
    ["dfac", "application/vnd.dreamfactory"],
    ["dgc", "application/x-dgc-compressed"],
    ["dib", "image/bmp"],
    ["dic", "text/x-c"],
    ["dir", "application/x-director"],
    ["dis", "application/vnd.mobius.dis"],
    ["dist", "application/octet-stream"],
    ["distz", "application/octet-stream"],
    ["djv", "image/vnd.djvu"],
    ["djvu", "image/vnd.djvu"],
    ["dll", "application/x-msdownload"],
    ["dmg", "application/x-apple-diskimage"],
    ["dmp", "application/vnd.tcpdump.pcap"],
    ["dms", "application/octet-stream"],
    ["dna", "application/vnd.dna"],
    ["doc", "application/msword"],
    ["docm", "application/vnd.ms-word.document.macroenabled.12"],
    [
      "docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    ["dot", "application/msword"],
    ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
    [
      "dotx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    ],
    ["dp", "application/vnd.osgi.dp"],
    ["dpg", "application/vnd.dpgraph"],
    ["dra", "audio/vnd.dra"],
    ["dsc", "text/prs.lines.tag"],
    ["dssc", "application/dssc+der"],
    ["dtb", "application/x-dtbook+xml"],
    ["dtd", "application/xml-dtd"],
    ["dts", "audio/vnd.dts"],
    ["dtshd", "audio/vnd.dts.hd"],
    ["dump", "application/octet-stream"],
    ["dv", "video/x-dv"],
    ["dvb", "video/vnd.dvb.file"],
    ["dvi", "application/x-dvi"],
    ["dwf", "model/vnd.dwf"],
    ["dwg", "image/vnd.dwg"],
    ["dxf", "image/vnd.dxf"],
    ["dxp", "application/vnd.spotfire.dxp"],
    ["dxr", "application/x-director"],
    ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
    ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
    ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
    ["ecma", "application/ecmascript"],
    ["edm", "application/vnd.novadigm.edm"],
    ["edx", "application/vnd.novadigm.edx"],
    ["efif", "application/vnd.picsel"],
    ["ei6", "application/vnd.pg.osasli"],
    ["elc", "application/octet-stream"],
    ["emf", "application/x-msmetafile"],
    ["eml", "message/rfc822"],
    ["emma", "application/emma+xml"],
    ["emz", "application/x-msmetafile"],
    ["eol", "audio/vnd.digital-winds"],
    ["eot", "application/vnd.ms-fontobject"],
    ["eps", "application/postscript"],
    ["epub", "application/epub+zip"],
    ["es3", "application/vnd.eszigno3+xml"],
    ["esa", "application/vnd.osgi.subsystem"],
    ["esf", "application/vnd.epson.esf"],
    ["et3", "application/vnd.eszigno3+xml"],
    ["etx", "text/x-setext"],
    ["eva", "application/x-eva"],
    ["evy", "application/x-envoy"],
    ["exe", "application/octet-stream"],
    ["exi", "application/exi"],
    ["ext", "application/vnd.novadigm.ext"],
    ["ez", "application/andrew-inset"],
    ["ez2", "application/vnd.ezpix-album"],
    ["ez3", "application/vnd.ezpix-package"],
    ["f", "text/x-fortran"],
    ["f4v", "video/x-f4v"],
    ["f77", "text/x-fortran"],
    ["f90", "text/x-fortran"],
    ["fbs", "image/vnd.fastbidsheet"],
    ["fcdt", "application/vnd.adobe.formscentral.fcdt"],
    ["fcs", "application/vnd.isac.fcs"],
    ["fdf", "application/vnd.fdf"],
    ["fe_launch", "application/vnd.denovo.fcselayout-link"],
    ["fg5", "application/vnd.fujitsu.oasysgp"],
    ["fgd", "application/x-director"],
    ["fh", "image/x-freehand"],
    ["fh4", "image/x-freehand"],
    ["fh5", "image/x-freehand"],
    ["fh7", "image/x-freehand"],
    ["fhc", "image/x-freehand"],
    ["fig", "application/x-xfig"],
    ["flac", "audio/flac"],
    ["fli", "video/x-fli"],
    ["flo", "application/vnd.micrografx.flo"],
    ["flv", "video/x-flv"],
    ["flw", "application/vnd.kde.kivio"],
    ["flx", "text/vnd.fmi.flexstor"],
    ["fly", "text/vnd.fly"],
    ["fm", "application/vnd.framemaker"],
    ["fnc", "application/vnd.frogans.fnc"],
    ["for", "text/x-fortran"],
    ["fpx", "image/vnd.fpx"],
    ["frame", "application/vnd.framemaker"],
    ["fsc", "application/vnd.fsc.weblaunch"],
    ["fst", "image/vnd.fst"],
    ["ftc", "application/vnd.fluxtime.clip"],
    ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
    ["fvt", "video/vnd.fvt"],
    ["fxp", "application/vnd.adobe.fxp"],
    ["fxpl", "application/vnd.adobe.fxp"],
    ["fzs", "application/vnd.fuzzysheet"],
    ["g2w", "application/vnd.geoplan"],
    ["g3", "image/g3fax"],
    ["g3w", "application/vnd.geospace"],
    ["gac", "application/vnd.groove-account"],
    ["gam", "application/x-tads"],
    ["gbr", "application/rpki-ghostbusters"],
    ["gca", "application/x-gca-compressed"],
    ["gdl", "model/vnd.gdl"],
    ["geo", "application/vnd.dynageo"],
    ["gex", "application/vnd.geometry-explorer"],
    ["ggb", "application/vnd.geogebra.file"],
    ["ggt", "application/vnd.geogebra.tool"],
    ["ghf", "application/vnd.groove-help"],
    ["gif", "image/gif"],
    ["gim", "application/vnd.groove-identity-message"],
    ["gml", "application/gml+xml"],
    ["gmx", "application/vnd.gmx"],
    ["gnumeric", "application/x-gnumeric"],
    ["gph", "application/vnd.flographit"],
    ["gpx", "application/gpx+xml"],
    ["gqf", "application/vnd.grafeq"],
    ["gqs", "application/vnd.grafeq"],
    ["gram", "application/srgs"],
    ["gramps", "application/x-gramps-xml"],
    ["gre", "application/vnd.geometry-explorer"],
    ["grv", "application/vnd.groove-injector"],
    ["grxml", "application/srgs+xml"],
    ["gsf", "application/x-font-ghostscript"],
    ["gtar", "application/x-gtar"],
    ["gtm", "application/vnd.groove-tool-message"],
    ["gtw", "model/vnd.gtw"],
    ["gv", "text/vnd.graphviz"],
    ["gxf", "application/gxf"],
    ["gxt", "application/vnd.geonext"],
    ["gz", "application/x-gzip"],
    ["h", "text/x-c"],
    ["h261", "video/h261"],
    ["h263", "video/h263"],
    ["h264", "video/h264"],
    ["hal", "application/vnd.hal+xml"],
    ["hbci", "application/vnd.hbci"],
    ["hdf", "application/x-hdf"],
    ["hh", "text/x-c"],
    ["hlp", "application/winhlp"],
    ["hpgl", "application/vnd.hp-hpgl"],
    ["hpid", "application/vnd.hp-hpid"],
    ["hps", "application/vnd.hp-hps"],
    ["hqx", "application/mac-binhex40"],
    ["htc", "text/x-component"],
    ["htke", "application/vnd.kenameaapp"],
    ["htm", "text/html"],
    ["html", "text/html"],
    ["hvd", "application/vnd.yamaha.hv-dic"],
    ["hvp", "application/vnd.yamaha.hv-voice"],
    ["hvs", "application/vnd.yamaha.hv-script"],
    ["i2g", "application/vnd.intergeo"],
    ["icc", "application/vnd.iccprofile"],
    ["ice", "x-conference/x-cooltalk"],
    ["icm", "application/vnd.iccprofile"],
    ["ico", "image/x-icon"],
    ["ics", "text/calendar"],
    ["ief", "image/ief"],
    ["ifb", "text/calendar"],
    ["ifm", "application/vnd.shana.informed.formdata"],
    ["iges", "model/iges"],
    ["igl", "application/vnd.igloader"],
    ["igm", "application/vnd.insors.igm"],
    ["igs", "model/iges"],
    ["igx", "application/vnd.micrografx.igx"],
    ["iif", "application/vnd.shana.informed.interchange"],
    ["imp", "application/vnd.accpac.simply.imp"],
    ["ims", "application/vnd.ms-ims"],
    ["in", "text/plain"],
    ["ink", "application/inkml+xml"],
    ["inkml", "application/inkml+xml"],
    ["install", "application/x-install-instructions"],
    ["iota", "application/vnd.astraea-software.iota"],
    ["ipfix", "application/ipfix"],
    ["ipk", "application/vnd.shana.informed.package"],
    ["irm", "application/vnd.ibm.rights-management"],
    ["irp", "application/vnd.irepository.package+xml"],
    ["iso", "application/x-iso9660-image"],
    ["itp", "application/vnd.shana.informed.formtemplate"],
    ["ivp", "application/vnd.immervision-ivp"],
    ["ivu", "application/vnd.immervision-ivu"],
    ["jad", "text/vnd.sun.j2me.app-descriptor"],
    ["jam", "application/vnd.jam"],
    ["jar", "application/java-archive"],
    ["java", "text/x-java-source"],
    ["jisp", "application/vnd.jisp"],
    ["jlt", "application/vnd.hp-jlyt"],
    ["jnlp", "application/x-java-jnlp-file"],
    ["joda", "application/vnd.joost.joda-archive"],
    ["jpe", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["jpg", "image/jpeg"],
    ["jpgm", "video/jpm"],
    ["jpgv", "video/jpeg"],
    ["jpm", "video/jpm"],
    ["js", "application/javascript"],
    ["jsf", "text/plain"],
    ["json", "application/json"],
    ["jsonml", "application/jsonml+json"],
    ["jspf", "text/plain"],
    ["kar", "audio/midi"],
    ["karbon", "application/vnd.kde.karbon"],
    ["kfo", "application/vnd.kde.kformula"],
    ["kia", "application/vnd.kidspiration"],
    ["kml", "application/vnd.google-earth.kml+xml"],
    ["kmz", "application/vnd.google-earth.kmz"],
    ["kne", "application/vnd.kinar"],
    ["knp", "application/vnd.kinar"],
    ["kon", "application/vnd.kde.kontour"],
    ["kpr", "application/vnd.kde.kpresenter"],
    ["kpt", "application/vnd.kde.kpresenter"],
    ["kpxx", "application/vnd.ds-keypoint"],
    ["ksp", "application/vnd.kde.kspread"],
    ["ktr", "application/vnd.kahootz"],
    ["ktx", "image/ktx"],
    ["ktz", "application/vnd.kahootz"],
    ["kwd", "application/vnd.kde.kword"],
    ["kwt", "application/vnd.kde.kword"],
    ["lasxml", "application/vnd.las.las+xml"],
    ["latex", "application/x-latex"],
    ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
    ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
    ["les", "application/vnd.hhe.lesson-player"],
    ["lha", "application/x-lzh-compressed"],
    ["link66", "application/vnd.route66.link66+xml"],
    ["list", "text/plain"],
    ["list3820", "application/vnd.ibm.modcap"],
    ["listafp", "application/vnd.ibm.modcap"],
    ["lnk", "application/x-ms-shortcut"],
    ["log", "text/plain"],
    ["lostxml", "application/lost+xml"],
    ["lrf", "application/octet-stream"],
    ["lrm", "application/vnd.ms-lrm"],
    ["ltf", "application/vnd.frogans.ltf"],
    ["lvp", "audio/vnd.lucent.voice"],
    ["lwp", "application/vnd.lotus-wordpro"],
    ["lzh", "application/x-lzh-compressed"],
    ["m13", "application/x-msmediaview"],
    ["m14", "application/x-msmediaview"],
    ["m1v", "video/mpeg"],
    ["m21", "application/mp21"],
    ["m2a", "audio/mpeg"],
    ["m2v", "video/mpeg"],
    ["m3a", "audio/mpeg"],
    ["m3u", "audio/x-mpegurl"],
    ["m3u8", "application/vnd.apple.mpegurl"],
    ["m4a", "audio/mp4"],
    ["m4b", "audio/mp4"],
    ["m4r", "audio/mp4"],
    ["m4u", "video/vnd.mpegurl"],
    ["m4v", "video/mp4"],
    ["ma", "application/mathematica"],
    ["mac", "image/x-macpaint"],
    ["mads", "application/mads+xml"],
    ["mag", "application/vnd.ecowin.chart"],
    ["maker", "application/vnd.framemaker"],
    ["man", "text/troff"],
    ["mar", "application/octet-stream"],
    ["mathml", "application/mathml+xml"],
    ["mb", "application/mathematica"],
    ["mbk", "application/vnd.mobius.mbk"],
    ["mbox", "application/mbox"],
    ["mc1", "application/vnd.medcalcdata"],
    ["mcd", "application/vnd.mcd"],
    ["mcurl", "text/vnd.curl.mcurl"],
    ["mdb", "application/x-msaccess"],
    ["mdi", "image/vnd.ms-modi"],
    ["me", "text/troff"],
    ["mesh", "model/mesh"],
    ["meta4", "application/metalink4+xml"],
    ["metalink", "application/metalink+xml"],
    ["mets", "application/mets+xml"],
    ["mfm", "application/vnd.mfmp"],
    ["mft", "application/rpki-manifest"],
    ["mgp", "application/vnd.osgeo.mapguide.package"],
    ["mgz", "application/vnd.proteus.magazine"],
    ["mid", "audio/midi"],
    ["midi", "audio/midi"],
    ["mie", "application/x-mie"],
    ["mif", "application/x-mif"],
    ["mime", "message/rfc822"],
    ["mj2", "video/mj2"],
    ["mjp2", "video/mj2"],
    ["mk3d", "video/x-matroska"],
    ["mka", "audio/x-matroska"],
    ["mks", "video/x-matroska"],
    ["mkv", "video/x-matroska"],
    ["mlp", "application/vnd.dolby.mlp"],
    ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
    ["mmf", "application/vnd.smaf"],
    ["mmr", "image/vnd.fujixerox.edmics-mmr"],
    ["mng", "video/x-mng"],
    ["mny", "application/x-msmoney"],
    ["mobi", "application/x-mobipocket-ebook"],
    ["mods", "application/mods+xml"],
    ["mov", "video/quicktime"],
    ["movie", "video/x-sgi-movie"],
    ["mp1", "audio/mpeg"],
    ["mp2", "audio/mpeg"],
    ["mp21", "application/mp21"],
    ["mp2a", "audio/mpeg"],
    ["mp3", "audio/mpeg"],
    ["mp4", "video/mp4"],
    ["mp4a", "audio/mp4"],
    ["mp4s", "application/mp4"],
    ["mp4v", "video/mp4"],
    ["mpa", "audio/mpeg"],
    ["mpc", "application/vnd.mophun.certificate"],
    ["mpe", "video/mpeg"],
    ["mpeg", "video/mpeg"],
    ["mpega", "audio/x-mpeg"],
    ["mpg", "video/mpeg"],
    ["mpg4", "video/mp4"],
    ["mpga", "audio/mpeg"],
    ["mpkg", "application/vnd.apple.installer+xml"],
    ["mpm", "application/vnd.blueice.multipass"],
    ["mpn", "application/vnd.mophun.application"],
    ["mpp", "application/vnd.ms-project"],
    ["mpt", "application/vnd.ms-project"],
    ["mpv2", "video/mpeg2"],
    ["mpy", "application/vnd.ibm.minipay"],
    ["mqy", "application/vnd.mobius.mqy"],
    ["mrc", "application/marc"],
    ["mrcx", "application/marcxml+xml"],
    ["ms", "text/troff"],
    ["mscml", "application/mediaservercontrol+xml"],
    ["mseed", "application/vnd.fdsn.mseed"],
    ["mseq", "application/vnd.mseq"],
    ["msf", "application/vnd.epson.msf"],
    ["msh", "model/mesh"],
    ["msi", "application/x-msdownload"],
    ["msl", "application/vnd.mobius.msl"],
    ["msty", "application/vnd.muvee.style"],
    ["mts", "model/vnd.mts"],
    ["mus", "application/vnd.musician"],
    ["musicxml", "application/vnd.recordare.musicxml+xml"],
    ["mvb", "application/x-msmediaview"],
    ["mwf", "application/vnd.mfer"],
    ["mxf", "application/mxf"],
    ["mxl", "application/vnd.recordare.musicxml"],
    ["mxml", "application/xv+xml"],
    ["mxs", "application/vnd.triscape.mxs"],
    ["mxu", "video/vnd.mpegurl"],
    ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
    ["n3", "text/n3"],
    ["nb", "application/mathematica"],
    ["nbp", "application/vnd.wolfram.player"],
    ["nc", "application/x-netcdf"],
    ["ncx", "application/x-dtbncx+xml"],
    ["nfo", "text/x-nfo"],
    ["ngdat", "application/vnd.nokia.n-gage.data"],
    ["nitf", "application/vnd.nitf"],
    ["nlu", "application/vnd.neurolanguage.nlu"],
    ["nml", "application/vnd.enliven"],
    ["nnd", "application/vnd.noblenet-directory"],
    ["nns", "application/vnd.noblenet-sealer"],
    ["nnw", "application/vnd.noblenet-web"],
    ["npx", "image/vnd.net-fpx"],
    ["nsc", "application/x-conference"],
    ["nsf", "application/vnd.lotus-notes"],
    ["ntf", "application/vnd.nitf"],
    ["nzb", "application/x-nzb"],
    ["oa2", "application/vnd.fujitsu.oasys2"],
    ["oa3", "application/vnd.fujitsu.oasys3"],
    ["oas", "application/vnd.fujitsu.oasys"],
    ["obd", "application/x-msbinder"],
    ["obj", "application/x-tgif"],
    ["oda", "application/oda"],
    [" OpenDocument Database ", "odb"],
    [" OpenDocument Chart ", "odc"],
    [" OpenDocument Formula ", "odf"],
    ["odft", "application/vnd.oasis.opendocument.formula-template"],
    [" OpenDocument Drawing ", "odg"],
    [" OpenDocument Image ", "odi"],
    [" OpenDocument Master Document ", "odm"],
    [" OpenDocument Presentation ", "odp"],
    [" OpenDocument Spreadsheet ", "ods"],
    [" OpenDocument Text ", "odt"],
    ["oga", "audio/ogg"],
    ["ogg", "audio/ogg"],
    ["ogv", "video/ogg"],
    [" xiph mime types ", "ogx"],
    ["omdoc", "application/omdoc+xml"],
    ["onepkg", "application/onenote"],
    ["onetmp", "application/onenote"],
    ["onetoc", "application/onenote"],
    ["onetoc2", "application/onenote"],
    ["opf", "application/oebps-package+xml"],
    ["opml", "text/x-opml"],
    ["oprc", "application/vnd.palm"],
    ["org", "application/vnd.lotus-organizer"],
    ["osf", "application/vnd.yamaha.openscoreformat"],
    ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
    ["otc", "application/vnd.oasis.opendocument.chart-template"],
    ["otf", "font/otf"],
    [" OpenDocument Drawing Template ", "otg"],
    [" HTML Document Template ", "oth"],
    ["oti", "application/vnd.oasis.opendocument.image-template"],
    [" OpenDocument Presentation Template ", "otp"],
    [" OpenDocument Spreadsheet Template ", "ots"],
    [" OpenDocument Text Template ", "ott"],
    ["oxps", "application/oxps"],
    ["oxt", "application/vnd.openofficeorg.extension"],
    ["p", "text/x-pascal"],
    ["p10", "application/pkcs10"],
    ["p12", "application/x-pkcs12"],
    ["p7b", "application/x-pkcs7-certificates"],
    ["p7c", "application/pkcs7-mime"],
    ["p7m", "application/pkcs7-mime"],
    ["p7r", "application/x-pkcs7-certreqresp"],
    ["p7s", "application/pkcs7-signature"],
    ["p8", "application/pkcs8"],
    ["pas", "text/x-pascal"],
    ["paw", "application/vnd.pawaafile"],
    ["pbd", "application/vnd.powerbuilder6"],
    ["pbm", "image/x-portable-bitmap"],
    ["pcap", "application/vnd.tcpdump.pcap"],
    ["pcf", "application/x-font-pcf"],
    ["pcl", "application/vnd.hp-pcl"],
    ["pclxl", "application/vnd.hp-pclxl"],
    ["pct", "image/pict"],
    ["pcurl", "application/vnd.curl.pcurl"],
    ["pcx", "image/x-pcx"],
    ["pdb", "application/vnd.palm"],
    ["pdf", "application/pdf"],
    ["pfa", "application/x-font-type1"],
    ["pfb", "application/x-font-type1"],
    ["pfm", "application/x-font-type1"],
    ["pfr", "application/font-tdpfr"],
    ["pfx", "application/x-pkcs12"],
    ["pgm", "image/x-portable-graymap"],
    ["pgn", "application/x-chess-pgn"],
    ["pgp", "application/pgp-encrypted"],
    ["pic", "image/pict"],
    ["pict", "image/pict"],
    ["pkg", "application/octet-stream"],
    ["pki", "application/pkixcmp"],
    ["pkipath", "application/pkix-pkipath"],
    ["plb", "application/vnd.3gpp.pic-bw-large"],
    ["plc", "application/vnd.mobius.plc"],
    ["plf", "application/vnd.pocketlearn"],
    ["pls", "audio/x-scpls"],
    ["pml", "application/vnd.ctc-posml"],
    ["png", "image/png"],
    ["pnm", "image/x-portable-anymap"],
    ["pnt", "image/x-macpaint"],
    ["portpkg", "application/vnd.macports.portpkg"],
    ["pot", "application/vnd.ms-powerpoint"],
    ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
    [
      "potx",
      "application/vnd.openxmlformats-officedocument.presentationml.template",
    ],
    ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
    ["ppd", "application/vnd.cups-ppd"],
    ["ppm", "image/x-portable-pixmap"],
    ["pps", "application/vnd.ms-powerpoint"],
    ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
    [
      "ppsx",
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    ],
    ["ppt", "application/vnd.ms-powerpoint"],
    ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
    [
      "pptx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    ["pqa", "application/vnd.palm"],
    ["prc", "application/x-mobipocket-ebook"],
    ["pre", "application/vnd.lotus-freelance"],
    ["prf", "application/pics-rules"],
    ["ps", "application/postscript"],
    ["psb", "application/vnd.3gpp.pic-bw-small"],
    ["psd", "image/vnd.adobe.photoshop"],
    ["psf", "application/x-font-linux-psf"],
    ["pskcxml", "application/pskc+xml"],
    ["ptid", "application/vnd.pvi.ptid1"],
    ["pub", "application/x-mspublisher"],
    ["pvb", "application/vnd.3gpp.pic-bw-let"],
    ["pwn", "application/vnd.3m.post-it-notes"],
    ["pya", "audio/vnd.ms-playready.media.pya"],
    ["pyv", "video/vnd.ms-playready.media.pyv"],
    ["qam", "application/vnd.epson.quickanime"],
    ["qbo", "application/vnd.intu.qbo"],
    ["qfx", "application/vnd.intu.qfx"],
    ["qps", "application/vnd.publishare-delta-tree"],
    ["qt", "video/quicktime"],
    ["qti", "image/x-quicktime"],
    ["qtif", "image/x-quicktime"],
    ["qwd", "application/vnd.quark.quarkxpress"],
    ["qwt", "application/vnd.quark.quarkxpress"],
    ["qxb", "application/vnd.quark.quarkxpress"],
    ["qxd", "application/vnd.quark.quarkxpress"],
    ["qxl", "application/vnd.quark.quarkxpress"],
    ["qxt", "application/vnd.quark.quarkxpress"],
    ["ra", "audio/x-pn-realaudio"],
    ["ram", "audio/x-pn-realaudio"],
    ["rar", "application/x-rar-compressed"],
    ["ras", "image/x-cmu-raster"],
    ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
    ["rdf", "application/rdf+xml"],
    ["rdz", "application/vnd.data-vision.rdz"],
    ["rep", "application/vnd.businessobjects"],
    ["res", "application/x-dtbresource+xml"],
    ["rgb", "image/x-rgb"],
    ["rif", "application/reginfo+xml"],
    ["rip", "audio/vnd.rip"],
    ["ris", "application/x-research-info-systems"],
    ["rl", "application/resource-lists+xml"],
    ["rlc", "image/vnd.fujixerox.edmics-rlc"],
    ["rld", "application/resource-lists-diff+xml"],
    ["rm", "application/vnd.rn-realmedia"],
    ["rmi", "audio/midi"],
    ["rmp", "audio/x-pn-realaudio-plugin"],
    ["rms", "application/vnd.jcp.javame.midlet-rms"],
    ["rmvb", "application/vnd.rn-realmedia-vbr"],
    ["rnc", "application/relax-ng-compact-syntax"],
    ["roa", "application/rpki-roa"],
    ["roff", "text/troff"],
    ["rp9", "application/vnd.cloanto.rp9"],
    ["rpss", "application/vnd.nokia.radio-presets"],
    ["rpst", "application/vnd.nokia.radio-preset"],
    ["rq", "application/sparql-query"],
    ["rs", "application/rls-services+xml"],
    ["rsd", "application/rsd+xml"],
    ["rss", "application/rss+xml"],
    ["rtf", "application/rtf"],
    ["rtx", "text/richtext"],
    ["s", "text/x-asm"],
    ["s3m", "audio/s3m"],
    ["saf", "application/vnd.yamaha.smaf-audio"],
    ["sbml", "application/sbml+xml"],
    ["sc", "application/vnd.ibm.secure-container"],
    ["scd", "application/x-msschedule"],
    ["scm", "application/vnd.lotus-screencam"],
    ["scq", "application/scvp-cv-request"],
    ["scs", "application/scvp-cv-response"],
    ["scurl", "text/vnd.curl.scurl"],
    ["sda", "application/vnd.stardivision.draw"],
    ["sdc", "application/vnd.stardivision.calc"],
    ["sdd", "application/vnd.stardivision.impress"],
    ["sdkd", "application/vnd.solent.sdkm+xml"],
    ["sdkm", "application/vnd.solent.sdkm+xml"],
    ["sdp", "application/sdp"],
    ["sdw", "application/vnd.stardivision.writer"],
    ["see", "application/vnd.seemail"],
    ["seed", "application/vnd.fdsn.seed"],
    ["sema", "application/vnd.sema"],
    ["semd", "application/vnd.semd"],
    ["semf", "application/vnd.semf"],
    ["ser", "application/java-serialized-object"],
    ["setpay", "application/set-payment-initiation"],
    ["setreg", "application/set-registration-initiation"],
    ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
    ["sfs", "application/vnd.spotfire.sfs"],
    ["sfv", "text/x-sfv"],
    ["sgi", "image/sgi"],
    ["sgl", "application/vnd.stardivision.writer-global"],
    ["sgm", "text/sgml"],
    ["sgml", "text/sgml"],
    ["sh", "application/x-sh"],
    ["shar", "application/x-shar"],
    ["shf", "application/shf+xml"],
    ["sid", "image/x-mrsid-image"],
    ["sig", "application/pgp-signature"],
    ["sil", "audio/silk"],
    ["silo", "model/mesh"],
    ["sis", "application/vnd.symbian.install"],
    ["sisx", "application/vnd.symbian.install"],
    ["sit", "application/x-stuffit"],
    ["sitx", "application/x-stuffitx"],
    ["skd", "application/vnd.koan"],
    ["skm", "application/vnd.koan"],
    ["skp", "application/vnd.koan"],
    ["skt", "application/vnd.koan"],
    ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
    [
      "sldx",
      "application/vnd.openxmlformats-officedocument.presentationml.slide",
    ],
    ["slt", "application/vnd.epson.salt"],
    ["sm", "application/vnd.stepmania.stepchart"],
    ["smf", "application/vnd.stardivision.math"],
    ["smi", "application/smil+xml"],
    ["smil", "application/smil+xml"],
    ["smv", "video/x-smv"],
    ["smzip", "application/vnd.stepmania.package"],
    ["snd", "audio/basic"],
    ["snf", "application/x-font-snf"],
    ["so", "application/octet-stream"],
    ["spc", "application/x-pkcs7-certificates"],
    ["spf", "application/vnd.yamaha.smaf-phrase"],
    ["spl", "application/x-futuresplash"],
    ["spot", "text/vnd.in3d.spot"],
    ["spp", "application/scvp-vp-response"],
    ["spq", "application/scvp-vp-request"],
    ["spx", "audio/ogg"],
    ["sql", "application/x-sql"],
    ["src", "application/x-wais-source"],
    ["srt", "application/x-subrip"],
    ["sru", "application/sru+xml"],
    ["srx", "application/sparql-results+xml"],
    ["ssdl", "application/ssdl+xml"],
    ["sse", "application/vnd.kodak-descriptor"],
    ["ssf", "application/vnd.epson.ssf"],
    ["ssml", "application/ssml+xml"],
    ["st", "application/vnd.sailingtracker.track"],
    ["stc", "application/vnd.sun.xml.calc.template"],
    ["std", "application/vnd.sun.xml.draw.template"],
    ["stf", "application/vnd.wt.stf"],
    ["sti", "application/vnd.sun.xml.impress.template"],
    ["stk", "application/hyperstudio"],
    ["stl", "application/vnd.ms-pki.stl"],
    ["str", "application/vnd.pg.format"],
    ["stw", "application/vnd.sun.xml.writer.template"],
    ["sub", "text/vnd.dvb.subtitle"],
    ["sus", "application/vnd.sus-calendar"],
    ["susp", "application/vnd.sus-calendar"],
    ["sv4cpio", "application/x-sv4cpio"],
    ["sv4crc", "application/x-sv4crc"],
    ["svc", "application/vnd.dvb.service"],
    ["svd", "application/vnd.svd"],
    ["svg", "image/svg+xml"],
    ["svgz", "image/svg+xml"],
    ["swa", "application/x-director"],
    ["swf", "application/x-shockwave-flash"],
    ["swi", "application/vnd.aristanetworks.swi"],
    ["sxc", "application/vnd.sun.xml.calc"],
    ["sxd", "application/vnd.sun.xml.draw"],
    ["sxg", "application/vnd.sun.xml.writer.global"],
    ["sxi", "application/vnd.sun.xml.impress"],
    ["sxm", "application/vnd.sun.xml.math"],
    ["sxw", "application/vnd.sun.xml.writer"],
    ["t", "text/troff"],
    ["t3", "application/x-t3vm-image"],
    ["taglet", "application/vnd.mynfc"],
    ["tao", "application/vnd.tao.intent-module-archive"],
    ["tar", "application/x-tar"],
    ["tcap", "application/vnd.3gpp2.tcap"],
    ["tcl", "application/x-tcl"],
    ["teacher", "application/vnd.smart.teacher"],
    ["tei", "application/tei+xml"],
    ["teicorpus", "application/tei+xml"],
    ["tex", "application/x-tex"],
    ["texi", "application/x-texinfo"],
    ["texinfo", "application/x-texinfo"],
    ["text", "text/plain"],
    ["tfi", "application/thraud+xml"],
    ["tfm", "application/x-tex-tfm"],
    ["tga", "image/x-tga"],
    ["thmx", "application/vnd.ms-officetheme"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["tmo", "application/vnd.tmobile-livetv"],
    ["torrent", "application/x-bittorrent"],
    ["tpl", "application/vnd.groove-tool-template"],
    ["tpt", "application/vnd.trid.tpt"],
    ["tr", "text/troff"],
    ["tra", "application/vnd.trueapp"],
    ["trm", "application/x-msterminal"],
    ["tsd", "application/timestamped-data"],
    ["tsv", "text/tab-separated-values"],
    ["ttc", "font/collection"],
    ["ttf", "font/ttf"],
    ["ttl", "text/turtle"],
    ["twd", "application/vnd.simtech-mindmapper"],
    ["twds", "application/vnd.simtech-mindmapper"],
    ["txd", "application/vnd.genomatix.tuxedo"],
    ["txf", "application/vnd.mobius.txf"],
    ["txt", "text/plain"],
    ["u32", "application/x-authorware-bin"],
    ["udeb", "application/x-debian-package"],
    ["ufd", "application/vnd.ufdl"],
    ["ufdl", "application/vnd.ufdl"],
    ["ulw", "audio/basic"],
    ["ulx", "application/x-glulx"],
    ["umj", "application/vnd.umajin"],
    ["unityweb", "application/vnd.unity"],
    ["uoml", "application/vnd.uoml+xml"],
    ["uri", "text/uri-list"],
    ["uris", "text/uri-list"],
    ["urls", "text/uri-list"],
    ["ustar", "application/x-ustar"],
    ["utz", "application/vnd.uiq.theme"],
    ["uu", "text/x-uuencode"],
    ["uva", "audio/vnd.dece.audio"],
    ["uvd", "application/vnd.dece.data"],
    ["uvf", "application/vnd.dece.data"],
    ["uvg", "image/vnd.dece.graphic"],
    ["uvh", "video/vnd.dece.hd"],
    ["uvi", "image/vnd.dece.graphic"],
    ["uvm", "video/vnd.dece.mobile"],
    ["uvp", "video/vnd.dece.pd"],
    ["uvs", "video/vnd.dece.sd"],
    ["uvt", "application/vnd.dece.ttml+xml"],
    ["uvu", "video/vnd.uvvu.mp4"],
    ["uvv", "video/vnd.dece.video"],
    ["uvva", "audio/vnd.dece.audio"],
    ["uvvd", "application/vnd.dece.data"],
    ["uvvf", "application/vnd.dece.data"],
    ["uvvg", "image/vnd.dece.graphic"],
    ["uvvh", "video/vnd.dece.hd"],
    ["uvvi", "image/vnd.dece.graphic"],
    ["uvvm", "video/vnd.dece.mobile"],
    ["uvvp", "video/vnd.dece.pd"],
    ["uvvs", "video/vnd.dece.sd"],
    ["uvvt", "application/vnd.dece.ttml+xml"],
    ["uvvu", "video/vnd.uvvu.mp4"],
    ["uvvv", "video/vnd.dece.video"],
    ["uvvx", "application/vnd.dece.unspecified"],
    ["uvvz", "application/vnd.dece.zip"],
    ["uvx", "application/vnd.dece.unspecified"],
    ["uvz", "application/vnd.dece.zip"],
    ["vcard", "text/vcard"],
    ["vcd", "application/x-cdlink"],
    ["vcf", "text/x-vcard"],
    ["vcg", "application/vnd.groove-vcard"],
    ["vcs", "text/x-vcalendar"],
    ["vcx", "application/vnd.vcx"],
    ["vis", "application/vnd.visionary"],
    ["viv", "video/vnd.vivo"],
    ["vob", "video/x-ms-vob"],
    ["vor", "application/vnd.stardivision.writer"],
    ["vox", "application/x-authorware-bin"],
    ["vrml", "model/vrml"],
    ["vsd", "application/vnd.visio"],
    ["vsf", "application/vnd.vsf"],
    ["vss", "application/vnd.visio"],
    ["vst", "application/vnd.visio"],
    ["vsw", "application/vnd.visio"],
    ["vtu", "model/vnd.vtu"],
    ["vxml", "application/voicexml+xml"],
    ["w3d", "application/x-director"],
    ["wad", "application/x-doom"],
    ["wav", "audio/x-wav"],
    ["wax", "audio/x-ms-wax"],
    [" Wireless Bitmap ", "wbmp"],
    ["wbs", "application/vnd.criticaltools.wbs+xml"],
    ["wbxml", "application/vnd.wap.wbxml"],
    ["wcm", "application/vnd.ms-works"],
    ["wdb", "application/vnd.ms-works"],
    ["wdp", "image/vnd.ms-photo"],
    ["weba", "audio/webm"],
    ["webm", "video/webm"],
    ["webp", "image/webp"],
    ["wg", "application/vnd.pmi.widget"],
    ["wgt", "application/widget"],
    ["wks", "application/vnd.ms-works"],
    ["wm", "video/x-ms-wm"],
    ["wma", "audio/x-ms-wma"],
    ["wmd", "application/x-ms-wmd"],
    ["wmf", "application/x-msmetafile"],
    [" WML Source ", "wml"],
    [" Compiled WML ", "wmlc"],
    [" WML Script Source ", "wmls"],
    [" Compiled WML Script ", "wmlsc"],
    ["wmv", "video/x-ms-wmv"],
    ["wmx", "video/x-ms-wmx"],
    ["wmz", "application/x-msmetafile"],
    ["woff", "font/woff"],
    ["woff2", "font/woff2"],
    ["wpd", "application/vnd.wordperfect"],
    ["wpl", "application/vnd.ms-wpl"],
    ["wps", "application/vnd.ms-works"],
    ["wqd", "application/vnd.wqd"],
    ["wri", "application/x-mswrite"],
    ["wrl", "model/vrml"],
    ["wsdl", "application/wsdl+xml"],
    ["wspolicy", "application/wspolicy+xml"],
    ["wtb", "application/vnd.webturbo"],
    ["wvx", "video/x-ms-wvx"],
    ["x32", "application/x-authorware-bin"],
    ["x3d", "model/x3d+xml"],
    ["x3db", "model/x3d+binary"],
    ["x3dbz", "model/x3d+binary"],
    ["x3dv", "model/x3d+vrml"],
    ["x3dvz", "model/x3d+vrml"],
    ["x3dz", "model/x3d+xml"],
    ["xaml", "application/xaml+xml"],
    ["xap", "application/x-silverlight-app"],
    ["xar", "application/vnd.xara"],
    ["xbap", "application/x-ms-xbap"],
    ["xbd", "application/vnd.fujixerox.docuworks.binder"],
    ["xbm", "image/x-xbitmap"],
    ["xdf", "application/xcap-diff+xml"],
    ["xdm", "application/vnd.syncml.dm+xml"],
    ["xdp", "application/vnd.adobe.xdp+xml"],
    ["xdssc", "application/dssc+xml"],
    ["xdw", "application/vnd.fujixerox.docuworks"],
    ["xenc", "application/xenc+xml"],
    ["xer", "application/patch-ops-error+xml"],
    ["xfdf", "application/vnd.adobe.xfdf"],
    ["xfdl", "application/vnd.xfdl"],
    ["xht", "application/xhtml+xml"],
    ["xhtml", "application/xhtml+xml"],
    ["xhvml", "application/xv+xml"],
    ["xif", "image/vnd.xiff"],
    ["xla", "application/vnd.ms-excel"],
    ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
    ["xlc", "application/vnd.ms-excel"],
    ["xlf", "application/x-xliff+xml"],
    ["xlm", "application/vnd.ms-excel"],
    ["xls", "application/vnd.ms-excel"],
    ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
    ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
    [
      "xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    ["xlt", "application/vnd.ms-excel"],
    ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
    [
      "xltx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    ],
    ["xlw", "application/vnd.ms-excel"],
    ["xm", "audio/xm"],
    ["xml", "application/xml"],
    ["xo", "application/vnd.olpc-sugar"],
    ["xop", "application/xop+xml"],
    ["xpi", "application/x-xpinstall"],
    ["xpl", "application/xproc+xml"],
    ["xpm", "image/x-xpixmap"],
    ["xpr", "application/vnd.is-xpr"],
    ["xps", "application/vnd.ms-xpsdocument"],
    ["xpw", "application/vnd.intercon.formnet"],
    ["xpx", "application/vnd.intercon.formnet"],
    ["xsl", "application/xml"],
    ["xslt", "application/xslt+xml"],
    ["xsm", "application/vnd.syncml+xml"],
    ["xspf", "application/xspf+xml"],
    ["xul", "application/vnd.mozilla.xul+xml"],
    ["xvm", "application/xv+xml"],
    ["xvml", "application/xv+xml"],
    ["xwd", "image/x-xwindowdump"],
    ["xyz", "chemical/x-xyz"],
    ["xz", "application/x-xz"],
    ["yang", "application/yang"],
    ["yin", "application/yin+xml"],
    ["z", "application/x-compress"],
    ["z1", "application/x-zmachine"],
    ["z2", "application/x-zmachine"],
    ["z3", "application/x-zmachine"],
    ["z4", "application/x-zmachine"],
    ["z5", "application/x-zmachine"],
    ["z6", "application/x-zmachine"],
    ["z7", "application/x-zmachine"],
    ["z8", "application/x-zmachine"],
    ["zaz", "application/vnd.zzazz.deck+xml"],
    ["zip", "application/zip"],
    ["zir", "application/vnd.zul"],
    ["zirz", "application/vnd.zul"],
    ["zmm", "application/vnd.handheld-entertainment+xml"],
  ];
  let MIME_MAPPING = new Array();
  mimeMapping.forEach((mimeItem) =>
    MIME_MAPPING.push({
      extension: mimeItem[0],
      "mime-type": mimeItem[1],
    })
  );
  return MIME_MAPPING;
}
