/**
 * Focus testing bookmarklet for accessibility testing.
 *
 * @author Ugurcan (Ugi) Kutluoglu <ugurcank@gmail.com>
 */


var NerdeFocus = (function () {
    "use strict";

    function main() {
        currentFocus = $(document.activeElement);
        nerdeBody = $("body");

        nerdeBody.append('<section id="nerdeFocusRoot"><ol></ol><strong></strong></section><div id="nerdeFocusOverlay"></div>');

        nerdeRoot = $("#nerdeFocusRoot");
        nerdeOverlay = $("#nerdeFocusOverlay");
        nerdeStatus = $("#nerdeFocusRoot strong");
        nerdeList = $('#nerdeFocusRoot ol');

        nerdeStatus.click(function () {
            nerdeList.toggle();
        });

        nerdeOverlay.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
            nerdeBody.removeClass("nerdeInTransition");
        });

        updateFocus();
        document.addEventListener("focus", function () {
            updateFocus();
        }, true);

        setInterval(function () {
            if (currentFocus[0].localName !== "body" && $(document.activeElement)[0].localName === "body") {
                updateFocus();
            }
        }, 1000);
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
            if (!name) {
                break;
            }
            name = name.toLowerCase();

            if (realNode.id && $('#' + realNode.id).length === 1) {
                name = '#' + realNode.id;
                path = name + (path ? '>' + path : '');
                break;
            }

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

    function isVisuallyHidden(node) {
        while (node.length) {
            var realNode = node[0];
            if ($(realNode).outerHeight() <= 8 || $(realNode).outerWidth() <= 8) {
                return true;
            }
            node = node.parent();
        }
        return false;
    }

    function updateFocus() {
        var node = $(document.activeElement);

        if (node) {
            currentFocus.removeClass('nerdeFocus');
            currentFocus = node;
            if (currentFocus[0].localName === "body") {
                nerdeRoot.addClass('reset');
            } else {
                nerdeRoot.removeClass('reset');
            }

            currentFocus.addClass('nerdeFocus');
            nerdeList.append('<li>' + getPath(currentFocus) + '</li>').scrollTop(999999);
            nerdeStatus.html(getPath(currentFocus));

            nerdeBody.addClass("nerdeInTransition");

            var elementTop = currentFocus.offset().top;
            var elementLeft = currentFocus.offset().left;
            var elementBottom = elementTop + currentFocus.outerHeight();
            var elementRight = elementLeft + currentFocus.outerWidth();
            var viewportBottom = $('body').outerHeight();
            var viewportRight = $('body').outerWidth();


            if (isVisuallyHidden($(currentFocus)) || elementBottom < 0 || elementTop > viewportBottom || elementRight < 0 || elementLeft > viewportRight) {
                nerdeBody.addClass("nerdeFocusHidden");
            } else {
                nerdeBody.removeClass("nerdeFocusHidden");
            }

            if (elementLeft > viewportRight) {
                elementLeft = viewportRight;
            }
            if (elementTop > viewportBottom) {
                elementTop = viewportBottom;
            }

            nerdeOverlay.css('left', elementLeft + 'px').css('top', elementTop + 'px').css('width', currentFocus.outerWidth() + 'px').css('height', currentFocus.outerHeight() + 'px');
        }
    }

    /* https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.css */
    /* https://uk-serve.net/apps/nerde/nerde.css */

    if (!document.getElementById('nerdeFocusRoot')) {
        var currentFocus, nerdeRoot, nerdeOverlay, nerdeStatus, nerdeList, nerdeBody;
        getResource('https://rawgit.com/wizzyfx/nerdefocus/master/dist/nerde.min.css', function () {
            if (window.jQuery) {
                main();
            } else {
                getResource('https://code.jquery.com/jquery-3.2.1.slim.min.js', function () {
                    main();
                });
            }
        }, 'css');
    }

})();