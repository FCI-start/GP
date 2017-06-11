/**
 * Created by Ahmed Shaban on 29/03/2017.
 */
var fun = function () {

    function ResizableElemnt(element) {

        this.element = element;
        var self = this;

        var move = function (event) {
            event.stopPropagation();
            event.preventDefault();

            var eleTop = parseInt(window.getComputedStyle(this).top);
            var eleLeft = parseInt(window.getComputedStyle(this).left);
            var eleRight = eleLeft + self.element.offsetWidth;
            var eleBot = eleTop + self.element.offsetHeight;
            var mouseX = event.clientX;
            var mouseY = event.clientY;

            function dragMe(event) {

                console.log(self.element.param);

                if (self.element.param === "MOVE") {
                    self.element.style.left = eleLeft + event.clientX - mouseX + 'px';
                    self.element.style.top = eleTop + event.clientY - mouseY + 'px';


                } else if (self.element.param === "LIFT") {
                    var w = eleRight - event.clientX;
                    var h = self.element.offsetHeight;
                    self.element.style.left = eleRight - w + 'px';
                    self.element.style.width = w + 'px';
                    self.element.style.height = h + 'px';


                } else if (self.element.param === "TOP") {
                    var w = self.element.offsetWidth;
                    var h = eleBot - event.clientY;

                    self.element.style.top = eleBot - h + 'px';
                    self.element.style.width = w + 'px';
                    self.element.style.height = h + 'px';

                } else if (self.element.param === "DOWN") {
                    self.element.style.height = event.clientY - eleTop + 'px';
                    self.element.style.width = self.element.offsetWidth + 'px';
                } else if (self.element.param === "RIGHT") {
                    self.element.style.width = event.clientX - eleLeft + 'px';
                    self.element.style.height = self.element.offsetHeight + 'px';

                }

                event.stopPropagation();
            }

            function dropMe(event) {
                document.removeEventListener('mousemove', dragMe, true);
                document.removeEventListener('mouseup', dropMe, true);
                self.element.classList.remove('resizeUp');
                self.element.classList.remove('resizeDown');
                self.element.classList.remove('resizeLeft');
                self.element.classList.remove('resizeRight');
                self.element.classList.remove('draggable');
                event.stopPropagation();
            }

            document.addEventListener('mousemove', dragMe, true);
            document.addEventListener('mouseup', dropMe, true);

        };

        var removeAllClassLists = function () {
            self.element.classList.remove('resizeUp');
            self.element.classList.remove('resizeDown');
            self.element.classList.remove('resizeLeft');
            self.element.classList.remove('resizeRight');
            self.element.classList.remove('draggable');
        }


        var moveover = function (event) {
            var eleTop = parseInt(window.getComputedStyle(self.element).top);
            var eleLeft = parseInt(window.getComputedStyle(self.element).left);
            var eleRight = eleLeft + self.element.offsetWidth;
            var eleBot = eleTop + self.element.offsetHeight;

            //removeAllClassLists();
            if (event.clientY - eleTop < 20) {
                self.element.classList.add('resizeUp');
                self.element.param = "TOP";
            }
            else if (eleBot - event.clientY < 20) {
                self.element.classList.add('resizeDown');
                self.element.param = "DOWN";

            }
            else if (event.clientX - eleLeft < 20) {
                self.element.classList.add('resizeLeft');
                self.element.param = "LIFT";

            }
            else if (eleRight - event.clientX < 20) {
                self.element.classList.add('resizeRight');
                self.element.param = "RIGHT";
            }
            else {
                self.element.classList.add('draggable');
                self.element.param = "MOVE";
            }

        };


        this.element.addEventListener('mousedown', move, false);
        this.element.addEventListener('mousemove', moveover, false);
    }

    window.ResizableElemnt = ResizableElemnt;
}();

