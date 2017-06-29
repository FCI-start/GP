/**
 * Created by shawara on 6/12/2017.
 */
function start() {

    function Dragable(element, dragStart, dragEnd) {
        this.element = element;
        this.dragStart = dragStart;
        this.dragEnd = dragStart;

        // this.element.classList.add('draggable');

        var self = this;

        var move = function (event) {
            event.stopPropagation();
            event.preventDefault();


            // var dive = document.createElement('div');
            // dive.classList.add(self.element.className);
            // dive.innerHTML = self.element.innerHTML;
            // dive.style.position = 'absolute';
            // var parent = document.getElementById('funList');
            // parent.appendChild(dive);


            var eleTop = parseInt(window.getComputedStyle(this).top);
            var eleLeft = parseInt(window.getComputedStyle(this).left);
            var eleRight = eleLeft + self.element.offsetWidth;
            var eleBot = eleTop + self.element.offsetHeight;
            var mouseX = event.clientX;
            var mouseY = event.clientY;

            function dragMe(event) {
                self.element.style.left = eleLeft + event.clientX - mouseX + 'px';
                self.element.style.top = eleTop + event.clientY - mouseY + 'px';
                event.stopPropagation();
            }

            function dropMe(event) {
                self.element.style.left = '0px';
                self.element.style.top = '0px';


                var off = document.getElementById('funLines').getBoundingClientRect();
                var mouseX = event.clientX;
                var mouseY = event.clientY;
                // console.log(off);
                var elems = event.target;
                var e = elems.getElementsByTagName("select")
                if (mouseX >= off.left && mouseX <= off.right && mouseY >= off.top && mouseY <= off.bottom
                    && (e.length === 0 || e[0].options.length > 0)) {
                    //create copy
                    var dive = document.createElement('div');
                    dive.classList.add(self.element.className);
                    dive.innerHTML = self.element.innerHTML;
                    dive.style.position = 'static';
                    dive._id = 'copy';
                    var parent = document.getElementById('funList');
                    parent.appendChild(dive);
                }


                document.removeEventListener('mousemove', dragMe, true);
                document.removeEventListener('mouseup', dropMe, true);
                event.stopPropagation();
            }

            document.addEventListener('mousemove', dragMe, true);
            document.addEventListener('mouseup', dropMe, true);

        };


        this.element.addEventListener('mousedown', move, false);
    }

    var showToastText = document.querySelector('div#functionWrpper div#funComponent div.showToast');
    var dragObj = new Dragable(showToastText);

    var showToastFrom = document.querySelector('div#functionWrpper div#funComponent div.showToastFrom');
    var dragObj2 = new Dragable(showToastFrom);

    var showToastFrom = document.querySelector('div#functionWrpper div#funComponent div.moveValueofViews');
    var dragObj3 = new Dragable(showToastFrom);

    var showToastFrom = document.querySelector('div#functionWrpper div#funComponent div.startActivity');
    var dragObj4 = new Dragable(showToastFrom);

}

window.addEventListener('load', start, false);