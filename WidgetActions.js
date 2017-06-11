/**
 * Created by Ahmed Shaban on 29/03/2017.
 */

(function () {


    function myAction(Element) {
        if (Element.style.position === "absolute") {
            Element.className = 'draggable';
            Element.addEventListener('mousedown', DragDrop.move, false);
        }
        Element.addEventListener('mouseover', DragDrop.scaling, false);   //this is for making scaling and change cursor
        Element.addEventListener('dblclick', DragDrop.showpopup, false);  //this for showing pop up menu
        Element.addEventListener('click', DragDrop.showproperty, false);  //this is for showing table property of item
    }

    function move(e) {
        //prevent any default action
        e.preventDefault();

        //store the original point of element before Dragging so if user put it in invalid place (not in workspace) it return it to the original point
        this.beginningPositionLeft = parseInt(window.getComputedStyle(this).left);
        this.beginningPositionTop = parseInt(window.getComputedStyle(this).top);

        //store where mouse point on the element as used in calculation of position of element during dragging process
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;


        DragDrop.selected = this;

        //during mouse down do action to move element when mouse move
        document.addEventListener('mousemove', DragDrop.dragme, false);

        //remove action of moving to put element while making mouse up
        document.addEventListener('mouseup', DragDrop.dropme, false);
        //document.addEventListener('mouseout',DragDrop.dropme,false);
    }

    function dragme(e) {
        DragDrop.selected.className = 'draggable';
        if (DragDrop.direct == "Move" || DragDrop.direct == undefined) {
            //do computation to make mouse in the place where it press during moving
            DragDrop.selected.style.left = DragDrop.selected.beginningPositionLeft + e.clientX - DragDrop.selected.mouseX + 'px';
            DragDrop.selected.style.top = DragDrop.selected.beginningPositionTop + e.clientY - DragDrop.selected.mouseY + 'px';
            DragDrop.selected.style.cursor = "move";

        }
        else {
            if (DragDrop.direct == "TopLeft") {
                DragDrop.self.style.width = DragDrop.self.originalX - e.clientX + DragDrop.self.originalWidth + "px";
                DragDrop.self.style.height = DragDrop.self.originalY - e.clientY + DragDrop.self.originalHeight + "px";
                DragDrop.self.style.top = e.clientY + "px";
                DragDrop.self.style.left = e.clientX + "px";

            }
            else if (DragDrop.direct == "TopRight") {
                DragDrop.self.style.width = e.clientX - DragDrop.self.originalX + DragDrop.self.originalWidth + "px";
                DragDrop.self.style.height = DragDrop.self.originalY - e.clientY + DragDrop.self.originalHeight + "px";
                DragDrop.self.style.top = e.clientY + "px";
            }
            else if (DragDrop.direct == "DownLeft") {
                DragDrop.self.style.width = DragDrop.self.originalX - e.clientX + DragDrop.self.originalWidth + "px";
                DragDrop.self.style.height = e.clientY - DragDrop.self.originalY + DragDrop.self.originalHeight + "px";
                DragDrop.self.style.left = e.clientX + "px";
            }
            else if (DragDrop.direct == "DownRight") {
                DragDrop.self.style.width = e.clientX - DragDrop.self.originalX + DragDrop.self.originalWidth + "px";
                DragDrop.self.style.height = e.clientY - DragDrop.self.originalY + DragDrop.self.originalHeight + "px";
            }
            else if (DragDrop.direct == "Right") {
                DragDrop.self.style.width = e.clientX - DragDrop.self.originalX + DragDrop.self.originalWidth + "px";

            }
            else if (DragDrop.direct == "Left") {
                DragDrop.self.style.width = DragDrop.self.originalX - e.clientX + DragDrop.self.originalWidth + "px";
                DragDrop.self.style.left = e.clientX + "px";
            }

            else if (DragDrop.direct == "Top") {
                DragDrop.self.style.height = DragDrop.self.originalY - e.clientY + DragDrop.self.originalHeight + "px";
                DragDrop.self.style.top = e.clientY + "px";
            }
            else if (DragDrop.direct == "Down") {
                DragDrop.self.style.height = e.clientY - DragDrop.self.originalY + DragDrop.self.originalHeight + "px";
            }

            var mychild;
            if ((mychild = DragDrop.selected.childNodes[0])) {
                if (mychild.nodeName == "IMG") {
                    DragDrop.selected.childNodes[0].style.width = getComputedStyle(DragDrop.selected).width;
                    DragDrop.selected.childNodes[0].style.height = getComputedStyle(DragDrop.selected).height;
                }
            }
        }
    }

    function dropme(e) {
        DragDrop.direct = undefined;
        document.removeEventListener('mousemove', DragDrop.dragme, false);
        document.removeEventListener('mouseup', DragDrop.dropme, false);
        document.removeEventListener('mouseout', DragDrop.dropme, false);


        //@todo here the linear layout magnetic                         #######
        //@todo checking  for parent                                    #################
        // todo adding to tree which will store in local storage
        //@todo printing tree in left side

        //check if you put the Element in the appropriate place
        if (parseInt(window.getComputedStyle(DragDrop.selected).left) < DragDrop.WorkspaceDevCoordinateLeft || parseInt(window.getComputedStyle(DragDrop.selected).left) > DragDrop.WorkspaceDevCoordinateright) {
            DragDrop.selected.style.left = DragDrop.selected.beginningPositionLeft + 'px';
            DragDrop.selected.style.top = DragDrop.selected.beginningPositionTop + 'px';
        }
        else {

            //create new Element of the same type of element in component div by getting parent and create Element
            // and assign to it myAction Function to give it all possible action like moving , drag and drop

            /*
             DragDrop.DevParent = DragDrop.selected.parentNode;
             var containerDiv = DragDrop.DevParent;
             */


            if (!DragDrop.selected._id) {

                var listItem = document.createElement("li");
                var newObj = document.createElement(DragDrop.selected.nodeName);
                DragDrop.myLinearAction(newObj);


                newObj.style.width = window.getComputedStyle(DragDrop.selected).width;
                newObj.style.height = window.getComputedStyle(DragDrop.selected).height;
                newObj.style.backgroundColor = window.getComputedStyle(DragDrop.selected).backgroundColor;
                newObj.style.border = window.getComputedStyle(DragDrop.selected).border;

                listItem.appendChild(newObj);
                DragDrop.myLinearAction(newObj);
                DragDrop.WorkspaceDev.appendChild(listItem);
                DragDrop.init(newObj)
                newObj.className = "";


                if (DragDrop.selected.nodeName == 'DIV' && window.getComputedStyle(DragDrop.selected).borderStyle == 'dashed')
                    newObj.innerText = 'listview';
                else if (DragDrop.selected.nodeName == 'DIV')
                    newObj.innerText = 'imageview';
                else if (DragDrop.selected.nodeName == 'INPUT');
                else
                    newObj.innerText = DragDrop.selected.nodeName.toLowerCase();


                var myId = window.utiles.generateId(DragDrop.selected.tagName);
                newObj._id = myId;

                DragDrop.selected.style.left = DragDrop.selected.beginningPositionLeft + 'px';
                DragDrop.selected.style.top = DragDrop.selected.beginningPositionTop + 'px';

                console.log(window.LayoutManager.getParent(e.clientX, e.clientY));

                /*window.tree.addChild("LINEAR_LAYOUT1",myId,undefined,DragDrop.selected);
                 fileXml = window.tree.printTree();
                 console.log(fileXml);*/

            }

        }
    }

    function scaling(e) {
        if (parseInt(window.getComputedStyle(this).left) > DragDrop.WorkspaceDevCoordinateLeft && parseInt(window.getComputedStyle(this).left) < DragDrop.WorkspaceDevCoordinateright) {

            this.originalWidth = parseInt(window.getComputedStyle(this).width);
            this.originalHeight = parseInt(window.getComputedStyle(this).height);

            this.originalX = e.clientX;
            this.originalY = e.clientY;

            DragDrop.self = this;

            if (e.offsetX < 2 && e.offsetY < 2) {
                this.style.cursor = "nwse-resize";
                DragDrop.direct = "TopLeft";
            } else if (e.offsetX >= this.originalWidth - 4 && e.offsetY >= this.originalHeight - 4) {
                this.style.cursor = "nwse-resize";
                DragDrop.direct = "DownRight";
            }
            else if (e.offsetX < 2 && e.offsetY >= this.originalHeight - 4) {
                this.style.cursor = "sw-resize";
                DragDrop.direct = "DownLeft";
            }
            else if (e.offsetY < 2 && e.offsetX >= this.originalWidth - 4) {
                this.style.cursor = "sw-resize";
                DragDrop.direct = "TopRight";
            }
            else if (e.offsetX < 2) {
                this.style.cursor = "w-resize";
                DragDrop.direct = "Left";
            }
            else if (e.offsetX >= this.originalWidth - 4) {
                this.style.cursor = "w-resize";
                DragDrop.direct = "Right";
            }
            else if (e.offsetY < 2) {
                this.style.cursor = "s-resize";
                DragDrop.direct = "Top";
            }
            else if (e.offsetY >= this.originalHeight - 4) {
                this.style.cursor = "s-resize";
                DragDrop.direct = "Down";
            }
            else {
                this.style.cursor = "move";
                DragDrop.direct = "Move";
            }
        }
    }

    function showpopup(e) {
        if (parseInt(window.getComputedStyle(this).left) > DragDrop.WorkspaceDevCoordinateLeft && parseInt(window.getComputedStyle(this).left) < DragDrop.WorkspaceDevCoordinateright) {
            var popupDiv;
            if (e.target.parentNode.id == 'divlistview') {
                popupDiv = document.getElementsByClassName("listviewpopup")[0];
                var new_item = document.getElementById('newlistitem');
                document.getElementById('addlistviewitem').addEventListener('click', function (e) {

                    if (DragDrop.selected.innerText == "listview")
                        DragDrop.selected.innerText = "";
                    DragDrop.selected.innerText = DragDrop.selected.innerText.concat(new_item.value + "\n");
                    new_item.value = "";
                }, false)
            }

            else
                var popupDiv = document.getElementsByClassName("popup")[0];

            var coverDiv = document.getElementsByClassName("cover")[0];

            popupDiv.style.display = "inline-block";
            popupDiv.style.left = 5 + e.clientX - popupDiv.clientWidth / 2 + 'px';
            popupDiv.style.top = 5 + e.clientY - popupDiv.clientHeight / 2 + 'px';
            coverDiv.style.display = "block";

            var closebutton = document.getElementById('close');
            closebutton.addEventListener('click', function (e) {
                popupDiv.style.display = "none";
                coverDiv.style.display = "none";
            }, false);

            coverDiv.addEventListener('click', function (e) {
                popupDiv.style.display = "none";
                coverDiv.style.display = "none";
            }, false);
        }
    }


    window.WidgetActions = window.WidgetActions || {};
    window.WidgetActions.myAction = myAction;
})();