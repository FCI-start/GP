/*** Created by Ahmed Shaban on 29/03/2017.***/

(function () {


    function linearResizing(element) {
        element.originalWidth = parseInt(window.getComputedStyle(element).width);
        element.originalHeight = parseInt(window.getComputedStyle(element).height);

        element.addEventListener('mousemove', changeCursor, false);
        element.addEventListener('mousedown', changeWidth, false);

        function changeCursor(e) {

            if (e.offsetX >= element.originalWidth - 8 && e.offsetY >= element.originalHeight - 8) {
                element.style.cursor = "nwse-resize";
                element.direct = "DownRight";
            }
            else if (e.offsetX >= element.originalWidth - 8) {
                element.style.cursor = "w-resize";
                element.direct = "Right";
            }
            else if (e.offsetY >= element.originalHeight - 8) {
                element.style.cursor = "s-resize";
                element.direct = "Down";
            }
            else {
                element.style.cursor = "Move";
                element.direct = "Move";
            }
        }

        function changeWidth(e) {

            e.stopPropagation();

            element.originalX = e.clientX;
            element.originalY = e.clientY;

            element.originalWidth = parseInt(window.getComputedStyle(element).width);
            element.originalHeight = parseInt(window.getComputedStyle(element).height);


            console.log("operation","button_mouse_move");

            document.addEventListener('mousemove', startResizing, false);
            document.addEventListener('mouseup', function (e) {
                element.addEventListener('mousemove', changeCursor, false);
                document.removeEventListener('mousemove', startResizing, false);
                element.style.cursor = "Move";
                element.direct = "Move";
            }, false);
        }


        function startResizing(e) {
            e.stopPropagation();

            console.log(e.clientX , element.originalX , element.originalWidth);
            console.log(element.originalWidth);

            element.removeEventListener('mousemove', changeCursor, false);

            if (element.direct == "DownRight") {
                console.log("DownRight");
                if (e.clientX+10> element.originalX)
                {
                    console.log("Bigger");
                    element.style.width = e.clientX - element.originalX + element.originalWidth + "px";
                    element.style.height = e.clientY - element.originalY + element.originalHeight + "px";
                }
                else
                {
                    console.log("Smaller");
                    element.style.width = e.clientX - (element.originalX - element.originalWidth) + "px";
                    element.style.height = e.clientY - (element.originalY - element.originalHeight) + "px";
                }
            }
            else if (element.direct == "Right") {
                console.log("Right");
                element.style.width = e.clientX - element.originalX + element.originalWidth + "px";

            }
            else if (element.direct == "Down") {
                console.log("Down");
                element.style.height = e.clientY - element.originalY + element.originalHeight + "px";
            }
        }
    }


    function reOrdering(mainListElement, element) {
        element.addEventListener('click', function (e) {

            //console.log(element, element.parentNode, mainListElement.children.length);
            element.parentNode.style.width = window.getComputedStyle(element).width;
            element.parentNode.style.height = window.getComputedStyle(element).height;
            element.style.position = "relative";

            var ul = element.parentNode.parentNode;
            //console.log(element.parentNode.parentNode);


            /*

             //mouseDown
             this.beginningPositionLeft = parseInt(window.getComputedStyle(this).left);
             this.beginningPositionTop = parseInt(window.getComputedStyle(this).top);

             this.mouseX = e.clientX;
             this.mouseY = e.clientY;

             //moving
             element.style.left = element.beginningPositionLeft + e.clientX - element.mouseX + 'px';
             element.style.top = element.beginningPositionTop + e.clientY - element.mouseY + 'px';
             element.style.cursor = "move";


             //mouseUp
             element.style.left = element.beginningPositionLeft+ 'px';
             element.style.top = element.beginningPositionTop+'px';
             element.style.position="relative";

             */

            //mainListElement.prepend(mainListElement.children[2]);

            /*var temp= mainListElement.children[2];
             mainListElement.children[2]=mainListElement.children[3];
             mainListElement.children[3]=temp;*/

        }, false);
    }


    window.widgetResizing = window.widgetResizing || {};
    window.widgetResizing.linearResizing = linearResizing;
    window.widgetResizing.reOrdering = reOrdering;


})();