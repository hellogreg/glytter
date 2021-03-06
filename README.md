# Glytter: the font glyph getter

**[Follow this link to use Glytter!](https://hellogreg.github.io/glytter/)**

This browser-based tool lets you view all the characters for a font on your local machine. The characters are displayed in plain HTML text, so you can easily copy and paste them, if you want.

This project was created by me, Greg Finn Gibson ([hellogreg.org](http://hellogreg.org)), because I wanted a simple tool for viewing and copying character sets for fonts I'm producing or using. I used it to generate [a character map sample for Firava](https://firava.netlify.app/), my variable font adaptation of Mozilla's Fira Sans typeface.

## Notes
* Accepts most web font formats: .ttf, .otf, .woff, and .woff2.
* Fonts are kept on your machine and not uploaded anywhere.
* Glytter uses [fontkit](https://github.com/foliojs/fontkit) to parse font info.
* Special thanks to [Adam Twardoch](http://www.twardoch.com/) and [Christian Genco](https://christian.gen.co/) for their tips on getting fontkit to work in the browser:
[https://github.com/foliojs/fontkit/issues/41](https://github.com/foliojs/fontkit/issues/41).
