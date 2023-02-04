var styleHider = new CSSStyleSheet();
styleHider.replaceSync(`
#hider {
  background-color: #0000003b;
  z-index: 3;
  transition: all 0.2s ease-in-out;
  width: 100%;
  position: absolute;
  top: 0;
}
`);
// add the style to the document
document.adoptedStyleSheets = [styleHider];
