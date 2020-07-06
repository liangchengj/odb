/**
 * Created at 2020/05/27 23:28.
 *
 * @author Liangcheng Juves
 */

(() => {
  loadVue();
  titleOf(`Liangcheng Juves' Support Contens`);
  useDefFont();
})();

function loadPdf(url) {
  $(".content").css({
    display: "flex"
  });
  $(".content").show();
  wlhref(url);
  setTimeout(function () {
    $(".content").fadeOut();
    $(".content").css({
      display: "none",
    });
  }, 3000);
}

$(() => {
  $.get("/static/json/books.json", (data, status) => {
    if ("success" == status) {
      for (let bookName of data) {
        let url = `/static/pdf/${encodeURIComponent(bookName)}`;
        $("body main div")
          .append(`<span class="book_content"><img src="/static/img/book_icon.svg"/>
          <a href="javascript:void(0);" onclick="loadPdf('${url}');">《 ${bookName.substring(
            0,
            bookName.lastIndexOf(".")
          )} 》</a>
        </span>`);
      }
    }
  });
  $("body header img").attr({ src: "/static/img/book.svg" });
  $("body header span").text("Open Developer Books");
  $("body footer div").text(
    `访问者可将本网站提供的内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，
    但同时应遵守著作权法及其他相关法律的规定，不得侵犯本网站及相关权利人的合法权利。`
  );
});

// function _createForOfIteratorHelper(o, allowArrayLike) {
//   var it;
//   if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
//     if (
//       Array.isArray(o) ||
//       (it = _unsupportedIterableToArray(o)) ||
//       (allowArrayLike && o && typeof o.length === "number")
//     ) {
//       if (it) o = it;
//       var i = 0;
//       var F = function F() {};
//       return {
//         s: F,
//         n: function n() {
//           if (i >= o.length) return { done: true };
//           return { done: false, value: o[i++] };
//         },
//         e: function e(_e) {
//           throw _e;
//         },
//         f: F,
//       };
//     }
//     throw new TypeError(
//       "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
//     );
//   }
//   var normalCompletion = true,
//     didErr = false,
//     err;
//   return {
//     s: function s() {
//       it = o[Symbol.iterator]();
//     },
//     n: function n() {
//       var step = it.next();
//       normalCompletion = step.done;
//       return step;
//     },
//     e: function e(_e2) {
//       didErr = true;
//       err = _e2;
//     },
//     f: function f() {
//       try {
//         if (!normalCompletion && it.return != null) it.return();
//       } finally {
//         if (didErr) throw err;
//       }
//     },
//   };
// }

// function _unsupportedIterableToArray(o, minLen) {
//   if (!o) return;
//   if (typeof o === "string") return _arrayLikeToArray(o, minLen);
//   var n = Object.prototype.toString.call(o).slice(8, -1);
//   if (n === "Object" && o.constructor) n = o.constructor.name;
//   if (n === "Map" || n === "Set") return Array.from(o);
//   if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
//     return _arrayLikeToArray(o, minLen);
// }

// function _arrayLikeToArray(arr, len) {
//   if (len == null || len > arr.length) len = arr.length;
//   for (var i = 0, arr2 = new Array(len); i < len; i++) {
//     arr2[i] = arr[i];
//   }
//   return arr2;
// }

// /**
//  * Created at 2020/05/27 23:28.
//  *
//  * @author Liangcheng Juves
//  */
// function loadPdf(url) {
//   $(".content").css({
//     display: "flex",
//   });
//   $(".content").show();
//   wlhref(url);
//   setTimeout(function () {
//     $(".content").fadeOut();
//     $(".content").css({
//       display: "none",
//     });
//   }, 3000);
// }

// $(function () {
//   $.get("/static/json/books.json", function (data, status) {
//     if ("success" == status) {
//       var _iterator = _createForOfIteratorHelper(data),
//         _step;

//       try {
//         for (_iterator.s(); !(_step = _iterator.n()).done; ) {
//           var bookName = _step.value;
//           var url = "/static/pdf/".concat(encodeURIComponent(bookName));
//           $("body main div").append(
//             '<span class="book_content"><img src="/static/img/book_icon.svg"/>\n          <a href="javascript:void(0);" onclick="loadPdf(\''
//               .concat(url, "');\">\u300A ")
//               .concat(
//                 bookName.substring(0, bookName.lastIndexOf(".")),
//                 " \u300B</a>\n        </span>"
//               )
//           );
//         }
//       } catch (err) {
//         _iterator.e(err);
//       } finally {
//         _iterator.f();
//       }
//     }
//   });
//   $("body header img").attr({
//     src: "/static/img/book.svg",
//   });
//   $("body header span").text("Open Developer Books");
//   $("body footer div").text(
//     "访问者可将本网站提供的内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，" +
//       "但同时应遵守著作权法及其他相关法律的规定，不得侵犯本网站及相关权利人的合法权利。"
//   );
// });


