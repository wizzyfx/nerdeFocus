# NerdeFocus

Visualize currently focused element.

### Installing

Bookmarklet

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.js';var iframes=document.getElementsByTagName('iframe');for(i=0;i<iframes.length;i++) {iframes[i].contentDocument.body.appendChild(document.createElement('script')).src='https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.js';}})();
```

## Authors

* **Ugi Kutluoglu** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Bookmarklet-Boilerplate](https://github.com/JeyKeu/Bookmarklet-Boilerplate)
* https://github.com/yamadapc/jquery-getpath
