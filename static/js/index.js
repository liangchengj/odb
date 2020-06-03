/**
 * @author Liangcheng Juves
 * Created at 2020/05/27 23:28
 */
function loadPdf(url) {
    $(".content").css({
        display: "flex"
    });
    $(".content").show();
    wlhref(url);
    setTimeout(function () {
        $(".content").fadeOut();
        $(".content").css({
            display: "none"
        });
    }, 3000);
}

$(function () {
    $.get("/static/json/books.json", function (data, status) {
        if ("success" == status) {
            let html = "";
            for (let i in data) {
                let bookName = data[i];
                let url = "/static/pdf/" + bookName;
                html += "<span class=\"book_content\">" +
                    "<img src=\"/static/img/book_icon.svg\"/>" +
                    "<a href=\"javascript:void(0);\" " +
                    "onclick=\"loadPdf('" + url + "');\">《 " +
                    bookName.substring(0, bookName.lastIndexOf(".")) +
                    " 》</a></span>";

                $("body main div").append(html);
                html = "";
            }
        }
    });
    $("body header span").text('Open Developer Books');
    $("body footer div").text('访问者可将本网站提供的内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，' +
        '但同时应遵守著作权法及其他相关法律的规定，不得侵犯本网站及相关权利人的合法权利。');
});