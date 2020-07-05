// Provide to ES6.
// (() => {
//   let head = document.getElementsByTagName("head")[0];
//   head.innerHTML = `<style class="darkreader darkreader--fallback" media="screen"></style>
//   <style class="darkreader darkreader--text" media="screen"></style>
//   <style class="darkreader darkreader--invert" media="screen">
//   .jfk-bubble,embed[type="application/pdf"],a[href="/product"],
//   .registration-hero.form-prompt{filter:invert(100%)hue-rotate(180deg)contrast(90%)!important}</style>
//   <style class="darkreader darkreader--inline" media="screen">
//   [data-darkreader-inline-bgcolor]{
//       background-color:var(--darkreader-inline-bgcolor)!important
//     }
//     [data-darkreader-inline-bgimage]{
//         background-image:var(--darkreader-inline-bgimage)!important
//     }
//     [data-darkreader-inline-border]{
//         border-color:var(--darkreader-inline-border)!important
//     }
//     [data-darkreader-inline-border-bottom]{
//         border-bottom-color:var(--darkreader-inline-border-bottom)!important
//     }
//     [data-darkreader-inline-border-left]{
//         border-left-color:var(--darkreader-inline-border-left)!important
//     }
//     [data-darkreader-inline-border-right]{
//         border-right-color:var(--darkreader-inline-border-right)!important
//     }
//     [data-darkreader-inline-border-top]{
//         border-top-color:var(--darkreader-inline-border-top)!important
//     }
//     [data-darkreader-inline-boxshadow]{
//         box-shadow:var(--darkreader-inline-boxshadow)!important
//     }
//     [data-darkreader-inline-color]{
//         color:var(--darkreader-inline-color)!important
//     }
//     [data-darkreader-inline-fill]{
//         fill:var(--darkreader-inline-fill)!important
//     }
//     [data-darkreader-inline-stroke]{
//         stroke:var(--darkreader-inline-stroke)!important
//     }
//     [data-darkreader-inline-outline]{
//         outline-color:var(--darkreader-inline-outline)!
//     }</style>
//     <style class="darkreader darkreader--user-agent" media="screen">
//     html{background-color:#181a1b!important}html,body,input,textarea,select,button{background-color:#181a1b}
//     html,body,input,textarea,select,button{border-color:#575757;color:#e8e6e3}
//     a{color:#3391ff}table{border-color:#4c4c4c}::placeholder{color:#bab5ab}
//     input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill{
//         background-color:#545b00!important;color:#e8e6e3!important
//     }
//     ::-webkit-scrollbar{background-color:#1c1e1f;color:#c5c1b9}
//     ::-webkit-scrollbar-thumb{background-color:#2f3234}
//     ::-webkit-scrollbar-thumb:hover{background-color:#383b3e}
//     ::-webkit-scrollbar-thumb:active{background-color:#3d4043}
//     ::-webkit-scrollbar-corner{background-color:#181a1b}
//     *{scrollbar-color:#1c1e1f#2f3234}
//     ::selection{background-color:#005ccc!important;color:#ffffff!important}
//     ::-moz-selection{background-color:#005ccc!important;color:#ffffff!important}</style>${head.innerHTML}`;
// })();

(function () {
  var head = document.getElementsByTagName("head")[0];
  head.innerHTML = '<style class="darkreader darkreader--fallback" media="screen"></style>\n  <style class="darkreader darkreader--text" media="screen"></style>\n  <style class="darkreader darkreader--invert" media="screen">\n  .jfk-bubble,embed[type="application/pdf"],a[href="/product"],\n  .registration-hero.form-prompt{filter:invert(100%)hue-rotate(180deg)contrast(90%)!important}</style>\n  <style class="darkreader darkreader--inline" media="screen">\n  [data-darkreader-inline-bgcolor]{\n      background-color:var(--darkreader-inline-bgcolor)!important\n    }\n    [data-darkreader-inline-bgimage]{\n        background-image:var(--darkreader-inline-bgimage)!important\n    }\n    [data-darkreader-inline-border]{\n        border-color:var(--darkreader-inline-border)!important\n    }\n    [data-darkreader-inline-border-bottom]{\n        border-bottom-color:var(--darkreader-inline-border-bottom)!important\n    }\n    [data-darkreader-inline-border-left]{\n        border-left-color:var(--darkreader-inline-border-left)!important\n    }\n    [data-darkreader-inline-border-right]{\n        border-right-color:var(--darkreader-inline-border-right)!important\n    }\n    [data-darkreader-inline-border-top]{\n        border-top-color:var(--darkreader-inline-border-top)!important\n    }\n    [data-darkreader-inline-boxshadow]{\n        box-shadow:var(--darkreader-inline-boxshadow)!important\n    }\n    [data-darkreader-inline-color]{\n        color:var(--darkreader-inline-color)!important\n    }\n    [data-darkreader-inline-fill]{\n        fill:var(--darkreader-inline-fill)!important\n    }\n    [data-darkreader-inline-stroke]{\n        stroke:var(--darkreader-inline-stroke)!important\n    }\n    [data-darkreader-inline-outline]{\n        outline-color:var(--darkreader-inline-outline)!\n    }</style>\n    <style class="darkreader darkreader--user-agent" media="screen">\n    html{background-color:#181a1b!important}html,body,input,textarea,select,button{background-color:#181a1b}\n    html,body,input,textarea,select,button{border-color:#575757;color:#e8e6e3}\n    a{color:#3391ff}table{border-color:#4c4c4c}::placeholder{color:#bab5ab}\n    input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill{\n        background-color:#545b00!important;color:#e8e6e3!important\n    }\n    ::-webkit-scrollbar{background-color:#1c1e1f;color:#c5c1b9}\n    ::-webkit-scrollbar-thumb{background-color:#2f3234}\n    ::-webkit-scrollbar-thumb:hover{background-color:#383b3e}\n    ::-webkit-scrollbar-thumb:active{background-color:#3d4043}\n    ::-webkit-scrollbar-corner{background-color:#181a1b}\n    *{scrollbar-color:#1c1e1f#2f3234}\n    ::selection{background-color:#005ccc!important;color:#ffffff!important}\n    ::-moz-selection{background-color:#005ccc!important;color:#ffffff!important}</style>'.concat(
    head.innerHTML
  );
})();
