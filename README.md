# NerdeFocus Bookmarklet

NerdeFocus is a quick way to debug focus problems when testing a page for accessibility issues. When activated, it will animate and accentuate the focus ring and display the CSS selector of the currently focused item.

## Installing

Create a new bookmark with the following URL:

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.js';var iframes=document.getElementsByTagName('iframe');for(i=0;i<iframes.length;i++) {iframes[i].contentDocument.body.appendChild(document.createElement('script')).src='https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.js';}})();
```

[How to Install a Bookmarklet](https://mreidsma.github.io/bookmarklets/installing.html)

## Usage

When loaded, NerdeFocus will be placed on the bottom center of the web page. It displays the CSS path of the currently selected element. Clicking on the path expands the focus history.

[Screenshot 1](https://wizzyfx.s3.amazonaws.com/ss/201712162cw.png) | [Screenshot 2](https://wizzyfx.s3.amazonaws.com/ss/2017123ciq2.png)
## Authors

* **Ugi Kutluoglu** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Bookmarklet-Boilerplate](https://github.com/JeyKeu/Bookmarklet-Boilerplate)
* [jQuery Get Path](https://github.com/yamadapc/jquery-getpath)
