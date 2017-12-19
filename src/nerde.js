/**
 * Focus testing bookmarklet for accessibility testing.
 *
 * @author Ugurcan (Ugi) Kutluoglu <ugurcank@gmail.com>
 */


var NerdeFocus = (function () {
    "use strict";
    var currentFocus;

    function main() {
        $("body").append("<section id=\"nerdeFocusRoot\"><ol></ol><strong></strong></section>");
        $("body").append("<div id=\"nerdeFocusOverlay\"></div>");

        $("#nerdeFocusRoot strong").click(function(){
            $('#nerdeFocusRoot ol').toggle();
        });


        $("#nerdeFocusOverlay").on('transitionend webkitTransitionEnd oTransitionEnd', function () {
            $("body").removeClass("nerdeInTransition");
        });

        updateFocus();

        document.addEventListener("focus", function () {
            updateFocus();
        }, true);
    }

    /**
     * getResource - Loads multiple Script and CSS resources from the specified URL.
     * a call back is called when all the resources are loaded.
     * @param string url, a string or a coma-separated list of urls
     * @param string callback
     * @param string type
     * This function is a modified version of Paul Irish's getScript() function
     * http://pastie.org/462639
     */
    function getResource(url, callback, type) {
        var head = document.getElementsByTagName("head")[0],
            done = false,
            elem,
            splitUrl = url.split(',');
        type = type || 'script';

        if (splitUrl.length > 0) {
            for (var i = 0; i < splitUrl.length; i++) {
                switch (type) {
                    case 'script': {
                        elem = document.createElement("script");
                        elem.src = splitUrl[i];
                        break;
                    }
                    case 'css': {
                        elem = document.createElement("link");
                        elem.type = "text/css";
                        elem.rel = "stylesheet";
                        elem.href = splitUrl[i];
                        break;
                    }
                }

                elem.onload = elem.onreadystatechange = function () {
                    if (!done && (!this.readyState ||
                            this.readyState === "loaded" || this.readyState === "complete")) {
                        done = true;
                        callback();
                    }
                };
                head.appendChild(elem);
            }
        } else {
            switch (type) {
                case 'script': {
                    elem = document.createElement("script");
                    elem.src = url;
                    break;
                }
                case 'css': {
                    elem = document.createElement("link");
                    elem.type = "text/css";
                    elem.rel = "stylesheet";
                    elem.href = url;
                    break;
                }
            }

            elem.onload = elem.onreadystatechange = function () {
                if (!done && (!this.readyState ||
                        this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    callback();
                }
            };
            head.appendChild(elem);
        }
    }

    /**
     * https://github.com/yamadapc/jquery-getpath
     */
    function getPath(node) {
        var path, allSiblings;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);

            if (sameTagSiblings.length > 1) {
                allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }
            path = name + (path ? '>' + path : '');
            node = parent;
        }
        return path;
    }

    function updateFocus() {
        var node = $(':focus');
        if (node.length) {
            $(currentFocus).removeClass('nerdeFocus');
            currentFocus = node;
            if(typeof getPath($(currentFocus)) != 'undefined'){
                $('#nerdeFocusRoot ol').append('<li>'+getPath($(currentFocus))+'</li>')
            } else {
                $('#nerdeFocusRoot ol').append('<li>Focus Lost</li>');
            };
            $(currentFocus).addClass('nerdeFocus');
            $('#nerdeFocusRoot strong').html(getPath($(currentFocus)));
            $("body").addClass("nerdeInTransition");
            $('#nerdeFocusOverlay').css('left', ($(currentFocus).offset().left) + 'px').css('top', ($(currentFocus).offset().top) + 'px').css('width', $(currentFocus).outerWidth() + 'px').css('height', $(currentFocus).outerHeight() + 'px');
        } else {
            $('#nerdeFocusRoot strong').html('Focus Reset!');
        }
    }

    getResource('https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.css', function () {
        if (window.jQuery) {
            main();
        } else {
            getResource('https://code.jquery.com/jquery-2.2.4.min.js', function () {
                main();
            });
        }
    }, 'css');

})();