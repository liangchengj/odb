/**
 * Created at 2020/05/27 23:28.
 *
 * @author Liangcheng Juves
 */

let jsDelivrPrefixUrl = "https://cdn.jsdelivr.net/gh/LiangchengJ/odb@2021.1.18";

(() => {
  initialize(`Liangcheng Juves' Support Contens`, [
    `${jsDelivrPrefixUrl}/static/css/index.css`,
    `${jsDelivrPrefixUrl}/static/css/animation.css`,
  ]);
})();

function loadPdf(url) {
  $(".content").css({
    display: "flex",
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

let prefixUrl = "https://files.liangchengj.com";

$(() => {
  $.get(prefixUrl + "/static/json/books.json", (data, status) => {
    if ("success" == status) {
      for (let bookName of data) {
        let url = `${prefixUrl}/static/pdf/${encodeURIComponent(bookName)}`;
        $("body main div")
          .append(`<span class="book_content"><img src="${jsDelivrPrefixUrl}/static/img/book_icon.svg"/>
          <a href="javascript:void(0);" onclick="loadPdf('${url}');">《 ${bookName.substring(
          0,
          bookName.lastIndexOf(".")
        )} 》</a>
        </span>`);
      }
    }
  });
  $("body header img").attr({ src: `${jsDelivrPrefixUrl}/static/img/book.svg` });
  $("body header span").text("Open Developer Books");
  $("body footer div").text(
    `访问者可将本网站提供的内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，
    但同时应遵守著作权法及其他相关法律的规定，不得侵犯本网站及相关权利人的合法权利。`
  );
});
