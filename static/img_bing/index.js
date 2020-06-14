let xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.open("GET", "https://cn.bing.com/HPImageArchive.aspx", true);
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
xhr.send("format=js&idx=0&n=1");
