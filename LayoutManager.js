(function () {

    function getParent(x, y, rootParentLayout) {
        var mobDev = rootParentLayout;
        var parentHtml = mobDev;

        function parent(x, y, element) {
            var ch = element.children;
            for (var i = 0; i < ch.length; i++) {
                //console.log(ch[i].nodeName.toLowerCase());
                var rect = ch[i].getBoundingClientRect();
                if (rect.top <= y && rect.left <= x && rect.bottom >= y && rect.right >= x) {
                    console.log(ch[i].nodeName.toLowerCase());
                    if (ch[i].nodeName.toLowerCase() == 'ul')
                        parentHtml = ch[i];
                    parent(x, y, ch[i]);
                }
            }
        }

        parent(x, y, mobDev);

        return parentHtml;
    }


    function addItem(parent, listItem) {
        if (parent.orientation == "horizontal") {
            listItem.style.display = 'inline-block';
        }
        else {
            listItem.style.display = 'block';
        }
        parent.appendChild(listItem);
    }

    function wrapingContent(element, parent) {
        // var elemParent = parent;
        // var ElemRect = element.getBoundingClientRect();
        // var ParentRect = elemParent.getBoundingClientRect();
        //
        //
        // if (ElemRect.top - ParentRect.top + "px" != element.style.borderTopWidth && parent.orientation == "horizontal") {
        //     console.log(parent.offsetWidth, element.offsetWidth);
        //     parent.style.width = parent.offsetWidth + element.offsetWidth + 'px';
        // }
        //
        // //alert(ElemRect.left-ParentRect.left+"px    " + element.style.borderLeftWidth);
        // if (parent.orientation == "vertical" && parent.children.length > 1) {
        //
        //     console.log(parent.offsetHeight, element.offsetHeight);
        //     parent.style.height = parent.offsetHeight + element.offsetHeight + 'px';
        // }
        //
        //
        // console.log(parent, parent.children.length == 1)
        //
        // if (parent.children.length == 1) {
        //     if (parent.orientation == "horizontal")
        //         parent.style.width = parent.offsetWidth + 20 + 'px';
        //     else
        //         parent.style.height = parent.offsetHeight + 20 + 'px';
        // }
    }


    window.LayoutManager = window.LayoutManager || {};
    window.LayoutManager.getParent = getParent;
    window.LayoutManager.wrapContent = wrapingContent;
    window.LayoutManager.addItem = addItem;

})();