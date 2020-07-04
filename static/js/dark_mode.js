(() => {
  let head = document.getElementsByTagName("head")[0];
  head.innerHTML = `<style class="darkreader darkreader--fallback" media="screen"></style>
  <style class="darkreader darkreader--text" media="screen"></style>
  <style class="darkreader darkreader--invert" media="screen">
  .jfk-bubble,embed[type="application/pdf"],a[href="/product"],
  .registration-hero.form-prompt{filter:invert(100%)hue-rotate(180deg)contrast(90%)!important}</style>
  <style class="darkreader darkreader--inline" media="screen">
  [data-darkreader-inline-bgcolor]{
      background-color:var(--darkreader-inline-bgcolor)!important
    }
    [data-darkreader-inline-bgimage]{
        background-image:var(--darkreader-inline-bgimage)!important
    }
    [data-darkreader-inline-border]{
        border-color:var(--darkreader-inline-border)!important
    }
    [data-darkreader-inline-border-bottom]{
        border-bottom-color:var(--darkreader-inline-border-bottom)!important
    }
    [data-darkreader-inline-border-left]{
        border-left-color:var(--darkreader-inline-border-left)!important
    }
    [data-darkreader-inline-border-right]{
        border-right-color:var(--darkreader-inline-border-right)!important
    }
    [data-darkreader-inline-border-top]{
        border-top-color:var(--darkreader-inline-border-top)!important
    }
    [data-darkreader-inline-boxshadow]{
        box-shadow:var(--darkreader-inline-boxshadow)!important
    }
    [data-darkreader-inline-color]{
        color:var(--darkreader-inline-color)!important
    }
    [data-darkreader-inline-fill]{
        fill:var(--darkreader-inline-fill)!important
    }
    [data-darkreader-inline-stroke]{
        stroke:var(--darkreader-inline-stroke)!important
    }
    [data-darkreader-inline-outline]{
        outline-color:var(--darkreader-inline-outline)!
    }</style>
    <style class="darkreader darkreader--user-agent" media="screen">
    html{background-color:#181a1b!important}html,body,input,textarea,select,button{background-color:#181a1b}
    html,body,input,textarea,select,button{border-color:#575757;color:#e8e6e3}
    a{color:#3391ff}table{border-color:#4c4c4c}::placeholder{color:#bab5ab}
    input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill{
        background-color:#545b00!important;color:#e8e6e3!important
    }
    ::-webkit-scrollbar{background-color:#1c1e1f;color:#c5c1b9}
    ::-webkit-scrollbar-thumb{background-color:#2f3234}
    ::-webkit-scrollbar-thumb:hover{background-color:#383b3e}
    ::-webkit-scrollbar-thumb:active{background-color:#3d4043}
    ::-webkit-scrollbar-corner{background-color:#181a1b}
    *{scrollbar-color:#1c1e1f#2f3234}
    ::selection{background-color:#005ccc!important;color:#ffffff!important}
    ::-moz-selection{background-color:#005ccc!important;color:#ffffff!important}</style>${head.innerHTML}`;
})();
