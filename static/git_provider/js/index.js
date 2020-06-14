var webSocketClick = {
  ws: null,
  app_block: null,
  githubUrl: null,
  init: function () {
    var __this = this;
    __this.app_block = $(".app-block");
    var ishttps = "https:" == document.location.protocol ? true : false;
    __this.ws = new WebSocket(
      "ws" + (ishttps ? "s" : "") + ":gg.widyun.com" + document.domain + "/wss"
    );
    __this.ws.onopen = function (event) {
      __this.onOpen(event);
    };
    __this.ws.onmessage = function (event) {
      __this.onMessage(event);
    };
    __this.ws.onclose = function (event) {
      __this.onClose(event);
    };
    __this.app_block.find(".sub-btn").on("click", function () {
      __this.getSource($(this));
    });
    $(".exemption").on("click", function () {
      var html =
        '<div style="font-size:1rem;margin:15px;">\
            <span style="font-size:1.5rem;">Browsing and using the download service on this site is deemed to be an endorsement of the content of the following statement</span>\
            <p>1, this site does not store resources, only transit platform</p>\
            <p>2. Use this site to download any resources at your own risk</p>\
            <p>3. This site only substitutes existing codes on the Internet, and cannot make any promises and guarantees on the availability, accuracy or reliability of these codes</p>\
            <p>4. This site is not responsible for any direct and indirect losses caused by the use or inability to use the code provided by this site</p>\
            <p>5. No unit or individual may use this site to download any software or materials that are infringing, pirated or illegal</p>\
            </div>';
      layer.alert(html, { title: "Disclaimer", area: "500px" });
      return false;
    });
  },
  onOpen: function (event) {
    var __this = this;
    sendJson = {
      type: "2",
    };
    __this.ws.send(JSON.stringify(sendJson) + "\n");
    console.log("connection succeeded");
  },
  onMessage: function (event) {
    var __this = this;
    try {
      var data = JSON.parse(event.data);
      if (data.status == 1) {
        layer.msg(data.msg);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
        return false;
      }
      switch (data.data.sta) {
        case 1: // Bale
        case 2: // Zip
          if ((data.msg = "正在检出代码")) {
            data.msg = "Checking out code";
          }
          if ((data.msg = "正在打包，请稍后")) {
            data.msg = "Packaging, please wait. . .";
          }
          break;

        case 3:
          if ((data.msg = "下载压缩包")) {
            data.msg = "Dwonload zip";
          }
          if (data.data.url != null && data.data.url != "") {
            data.data.url = "http://gg.widyun.com" + data.data.url;
          }
          layer.msg("The operation is complete, please download");
          __this.app_block
            .find(".sub-btn")
            .html(
              '<a class="download-btn" href="javascript:void(0);" onclick="window.location.href=\'' +
                data.data.url +
                '\';" target="_blank">' +
                data.msg +
                "</a>"
            )
            .css({
              background: "green",
              color: "#fff",
            });
          $(".download-btn").on("click", function () {
            sendJson = {
              type: "1",
            };
            __this.ws.send(JSON.stringify(sendJson) + "\n");
            sendJson.type = "2";
            __this.ws.send(JSON.stringify(sendJson) + "\n");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          });
          break;

        case 4:
          $(".down_num").find("b").text($.trim(data.data.down_num));
          break;
      }
    } catch (e) {}
  },
  onClose: function (event) {
    var __this = this;
    console.log("Connection closed");
  },
  getSource: function ($this) {
    var __this = this;
    var githubUrl = __this.app_block.find(".text");
    var githubUrlReg = new RegExp(
      "^https:\\/\\/github.com\\/([\\w\\/\\d\\-\\_\\.]+)$",
      "ig"
    );
    var githubUrlReg1 = new RegExp(
      "^((https|http):\\/\\/)?([\\w\\.\\/\\-\\_^]+?)\\.([tar\\.gz|tgz|msi|gz|tar\\.bz2|bz2|tar|zip|tar\\.xz|tar\\.z|rpm|deb|apk|exe|7z|dmg|rar|jar]+?)$",
      "ig"
    );
    if (!githubUrl.val()) {
      layer.msg("Please enter github address");
      githubUrl.select();
      return false;
    }
    var urlVal = $.trim(githubUrl.val());
    if (!githubUrlReg.test(urlVal) && !githubUrlReg1.test(urlVal)) {
      layer.msg(
        "Please enter the correct github address: only supports https protocol or <br> (gz|tar.gz|bz2|tar|tar.bz2|zip|tar.xz|tar.z|rpm|deb|rar) format compressed package Download link"
      );
      githubUrl.select();
      return false;
    }
    __this.githubUrl = urlVal;
    __this.getSourceInit();
  },
  getSourceInit: function () {
    var __this = this;
    var sendJson = {
      url: __this.githubUrl,
    };
    __this.app_block.find(".sub-btn").prop("disabled", true).off("click").css({
      background: "none",
      color: "#EACB20",
    });
    __this.ws.send(JSON.stringify(sendJson) + "\n");
  },
};
$(function () {
  webSocketClick.init();
  $("#ah").html("");
  $("#cp").html("");
  $("body h1").css({
    "margin-top": "2rem",
  });
});
