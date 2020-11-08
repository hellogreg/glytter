// TODO: Add drag and drop?
// TODO: Make select menu for Google fonts?
//
// Thanks to Adam Twardoch (http://www.twardoch.com/) and Christian Genco (https://christian.gen.co/)
// For their tips on getting fontkit to work in the browser:
// https://github.com/foliojs/fontkit/issues/41
// https://github.com/foliojs/fontkit/issues/77
//


(function () {

  const root = document.documentElement; // <html> element
  const $fontfam = document.getElementById("fontfam");
  const $charmap = document.getElementById("charmap");

  function dir(m) {
    if (console.dir && m) {
      console.dir(m);
    }
  }

  function log(m) {
    if (console.log) {
      m = m !== undefined ? m : "-----------------";
      console.log(m);
    }
  }

  function displayFontInfo(name, text) {
    $fontfam.innerHTML = name;
    $charmap.innerHTML = text;
  }

  function parseFontFile() {
    const input = document.getElementById("fontinput");
    const filename = input.files[0].name;
    const reader = new FileReader();
    reader.readAsArrayBuffer(input.files[0]);
    reader.onload = function () {
      let outputName = "";
      let outputText = "";
      let i = 0;
      try {
        const arrayBuffer = reader.result;
        const fontkitBuffer = new Buffer(arrayBuffer);
        const font = fontkit.create(fontkitBuffer);
        const fontFace = new FontFace("TempFont", arrayBuffer);
        fontFace.load().then(function (loadedFont) {
          document.fonts.add(loadedFont);
          root.style.setProperty("--font-family", "TempFont, AdobeBlank");
        });
        outputName = font.familyName;
        while (i < font.characterSet.length) {
          outputText = outputText.concat("&#" + font.characterSet[i] + "; ");
          i++;
        }
      } catch (e) {
        outputName = "None";
        outputText = `Sorry. I couldn't read <strong>${filename}</strong>. `
          + `If you submitted a valid font, maybe it was in a `
          + `format this app doesn't understand (e.g., .eot).`;
        root.style.setProperty("--font-family", "Firava");
        log(e);
      } finally {
        displayFontInfo(outputName, outputText);
      }
    };
  }

  function loadDefaultFont() {
    const fontPath = "fonts/Firava.woff2";
    fetch(fontPath).then((response) => response.arrayBuffer()).then((arrayBuffer) => {
      const font = fontkit.create(new Buffer(arrayBuffer));
      let outputName = font.familyName;
      let outputText = "";
      const charSet = font.characterSet;
      let i = 0;
      while (i < charSet.length) {
        outputText = outputText.concat("&#" + charSet[i] + "; ");
        i++;
      }
      displayFontInfo(outputName, outputText);
    });
  }

  function listenForFontChooser() {
    document.getElementById("fontinput").addEventListener("change", parseFontFile, false);
  }

  window.addEventListener("DOMContentLoaded", function () {
    loadDefaultFont();
    listenForFontChooser();
  });

}());
