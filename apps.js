/**
 * Created by Ahmed Shaban on 20/02/2017.
 */
var DragDrop =
{
    self: this,
    direct: null,
    selected: this,
    WorkspaceDev: null,



    init: function (Element) {

        this.Element = Element;  //capture the event you pass as parameter
        //this.WorkspaceDev = document.getElementById('WorkspaceContainer');
        this.WorkspaceDev = window.ProjectManager.getCurrentActivy();
        //console.log(this.WorkspaceDev);

        this.ComponentDev = document.getElementById('ComponentContainer');

        this.WorkspaceDev.orientation = "vertical";
        //this.WorkspaceDev.orientation="horizontal";

        //this.WorkspaceDev._innerText="";

        //not use until now but it use to get all the style of the workspace & Component
        this.WorkspaceDevStyling = window.getComputedStyle(this.WorkspaceDev);
        this.ComponentDevStyling = window.getComputedStyle(this.ComponentDev);

        //now we want to get the coordination of workspace to use to check where we drop component after dragging
        this.WorkspaceDevCoordinateLeft = this.ComponentDev.clientWidth + parseInt(this.WorkspaceDevStyling.marginLeft);
        this.WorkspaceDevCoordinateright = this.WorkspaceDevCoordinateLeft + this.WorkspaceDev.clientWidth;
        this.WorkspaceDevCoordinateTop = this.WorkspaceDevStyling.marginTop;
        this.WorkspaceDevCoordinatedown = this.WorkspaceDevCoordinateTop + this.WorkspaceDev.clientHeight;


        window.main = "WorkspaceContainer";

        //first step is to assign action event to Element
        this.myAction(this.Element);

        //provide ability to move element using arrow and delete using delete
        //document.addEventListener('keydown', DragDrop.moveobj, false);

        // window.properties.draggedItem=Element;


    },
    //calculate the x,y for dragging
    move: function (e) {
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
    },
    dragme: function (e) {
        DragDrop.selected.className = 'draggable';


        //if (DragDrop.direct == "Move" || DragDrop.direct == undefined) {

        //do computation to make mouse in the place where it press during moving
        DragDrop.selected.style.left = DragDrop.selected.beginningPositionLeft + e.clientX - DragDrop.selected.mouseX + 'px';
        DragDrop.selected.style.top = DragDrop.selected.beginningPositionTop + e.clientY - DragDrop.selected.mouseY + 'px';
        DragDrop.selected.style.cursor = "move";
        //}
        /*
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
         */
    },
    dropme: function (e) {
        DragDrop.direct = undefined;
        document.removeEventListener('mousemove', DragDrop.dragme, false);
        document.removeEventListener('mouseup', DragDrop.dropme, false);
        document.removeEventListener('mouseout', DragDrop.dropme, false);

        // todo adding to tree which will store in local storage
        //@todo printing tree in left side

        //check if you put the Element in the appropriate place
        if (parseInt(window.getComputedStyle(DragDrop.selected).left) < DragDrop.WorkspaceDevCoordinateLeft || parseInt(window.getComputedStyle(DragDrop.selected).left) > DragDrop.WorkspaceDevCoordinateright) {
            DragDrop.selected.style.left = DragDrop.selected.beginningPositionLeft + 'px';
            DragDrop.selected.style.top = DragDrop.selected.beginningPositionTop + 'px';
        }
        else if (!DragDrop.selected._id) {
            // console.log(window.ProjectManager.getCurrentActivy());
            var parent = window.LayoutManager.getParent(event.clientX, event.clientY, window.ProjectManager.getCurrentActivy());
            // window.curruntlyHtmlObjectSelected = parent;
            var listItem = document.createElement("li");
            listItem.style.width = "100px";
            listItem.style.height = "35px";

            var newObj = document.createElement(DragDrop.selected.nodeName);
            newObj.style.width = window.getComputedStyle(DragDrop.selected).width;
            newObj.style.height = window.getComputedStyle(DragDrop.selected).height;
            newObj.style.backgroundColor = window.getComputedStyle(DragDrop.selected).backgroundColor;
            newObj.style.border = window.getComputedStyle(DragDrop.selected).border;
            newObj.orientation = "horizontal";
            newObj.style.position = "relative";
            newObj.style.width = "100%";
            newObj.style.height = "100%";
            listItem.appendChild(newObj);
            //window.properties.addWidgetEventListner(newObj);

            window.LayoutManager.addItem(parent, listItem);
            window.LayoutManager.wrapContent(newObj, parent);

            if (!(DragDrop.selected._innerText == 'Edittext' || DragDrop.selected._innerText == 'LinearLayout'))
                newObj.innerText = DragDrop.selected._innerText;


            var myId = window.utiles.generateId(DragDrop.selected._innerText);
            newObj._id = myId;
            newObj._import = DragDrop.selected._import;
            newObj._innerText = DragDrop.selected._innerText;
            window.properties.selectItem(newObj);

            newObj.addEventListener('click', function (e) {
                window.properties.selectItem(e.target);
            });

            newObj.addEventListener('dblclick', function (e) {

                if (newObj._innerText == "RecyclerView") {
                    window.ProjectManager.generateMainLayout(newObj._id);
                }
                else {
                    if (window.ProjectManager.getCurrentActivy().id.indexOf('RecyclerView') === -1)
                        window.toggle_visibility('popupBoxOnePosition');
                }
            });
            DragDrop.selected.style.left = DragDrop.selected.beginningPositionLeft + 'px';
            DragDrop.selected.style.top = DragDrop.selected.beginningPositionTop + 'px';


            window.widgetResizing.linearResizing(newObj);
            window.widgetResizing.reOrdering(DragDrop.WorkspaceDev, newObj);


            var handleJava = function () {
                //  console.log('current=',window.ProjectManager.getCurrentActivy());
                window.JavaGenerator.addMember(window.ProjectManager.getCurrentActivy(), 'private', newObj._innerText, newObj._id, newObj._import);
            }();

            var HandelXml = function () {
                // console.log(parent._id);
                var activity_id = window.ProjectManager.getCurrentActivy().id;
                window.tree.addChild(activity_id, parent._id, myId);
                fileXml = window.tree.printTree(activity_id, parent._id);
                //console.log(fileXml)
            }();

        }
    },
    myAction: function (Element) {
        Element.className = 'draggable';  //give element class draggable which in turn make position absolute
        Element.addEventListener('mousedown', DragDrop.move, false);      //the first step in making drag and drop when you press on mouse
        Element.addEventListener('mousemove', DragDrop.scaling, false);   //this is for making scaling and change cursor
        Element.addEventListener('dblclick', DragDrop.showpopup, false);  //this for showing pop up menu
        Element.addEventListener('click', DragDrop.showproperty, false);  //this is for showing table property of item
    },
    scaling: function (e) {
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
    },
    showpopup: function (e) {
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
    },
    //this function to assign event to Element and give class draggable to make its position absolute :)
    showproperty: function () {

        /*
         if (DragDrop.selected == this)
         return;

         //@todo there is bug of showing to table instead of unique one
         if (DragDrop.selected != window) {


         tableId = DragDrop.selected.nodeName.toLowerCase() + "table";
         if (tableId == 'divtable' && window.getComputedStyle(this).borderStyle == 'dashed')
         table = document.getElementById('listviewtable');
         else if (tableId == 'divtable')
         table = document.getElementById('imageviewtable');
         else
         table = document.getElementById(tableId);


         table.style.display = "none";
         }


         if (parseInt(window.getComputedStyle(this).left) > DragDrop.WorkspaceDevCoordinateLeft && parseInt(window.getComputedStyle(this).left) < DragDrop.WorkspaceDevCoordinateright) {
         DragDrop.selected = this;
         tableId = this.nodeName.toLowerCase() + "table"
         if (tableId == 'divtable' && window.getComputedStyle(this).borderStyle == 'dashed')
         table = document.getElementById('listviewtable');
         else if (tableId == 'divtable')
         table = document.getElementById('imageviewtable');
         else
         table = document.getElementById(tableId);


         table.style.display = "block";
         }
         */


        var draggedItem = DragDrop.selected.nodeName.toLowerCase();


        var right_div = document.getElementById('right_div');

        var basicsSecion = document.getElementById('basics_class');
        var imageViewSection = document.getElementById('imageView_class');
        var textViewSection = document.getElementById('text_class');
        var editTextSection = document.getElementById('editText_class');

        if (draggedItem != null) {
            show(basicsSecion);
            show(right_div);

            switch (draggedItem) {


                case 'div':
                    show(imageViewSection);
                    hide(textViewSection);
                    hide(editTextSection);
                    break;

                case 'button':
                    show(textViewSection);
                    hide(imageViewSection);
                    hide(editTextSection);
                    break;
                case 'label':
                    show(textViewSection);
                    hide(imageViewSection);
                    hide(editTextSection);
                    break;
                case 'input':
                    show(textViewSection);
                    show(editTextSection);
                    hide(imageViewSection);

                    break;
                default:
                    show(imageViewSection);
                    show(textViewSection);
                    show(editTextSection);
                    break;
            }
        } else {
            hide(right_div);
            hide(basicsSecion);
            hide(imageViewSection);
            hide(textViewSection);
            hide(editTextSection);
        }


        function isImageView() {
            var imageViewSection = document.getElementsByClassName('imageView_class');
            show(imageViewSection);
        };


        function show(item) {
            item.style.display = 'visible';
        };

        function hide(item) {
            item.style.display = 'none';
        };


        //@todo choosing file
        /*
         var fileinput = document.getElementById('fileinput');

         fileinput.addEventListener('change', function (e) {
         var file = fileinput.files[0];
         var pattern = 'image.*';

         if (file.type.match(pattern)) {
         var filereader = new FileReader();
         filereader.readAsDataURL(file);
         filereader.onload = function (e) {
         var img = new Image();
         img.src = filereader.result;

         img.style.width = getComputedStyle(DragDrop.selected).width;
         img.style.height = getComputedStyle(DragDrop.selected).height;
         DragDrop.selected.innerText = "";
         DragDrop.selected.appendChild(img);
         };
         }
         else {
         alert("Error");
         }
         }, false);
         */

    },
    moveobj: function (e) {

        e.stopPropagation();

        if (DragDrop.selected == window)
            return;

        var box = DragDrop.selected;
        var step = 10;

        var boxStyle = getComputedStyle(DragDrop.selected);

        if (e.keyCode == 46) {
            box.parentNode.removeChild(box);
        }

        if (e.keyCode == 40) {
            boxTop = parseInt(boxStyle.top, 10);
            box.style.top = boxTop + step + "px";
        }

        else if (e.keyCode == 38) {
            boxTop = parseInt(boxStyle.top, 10);
            box.style.top = boxTop - step + "px";
        }

        else if (e.keyCode == 37) {
            boxLeft = parseInt(boxStyle.left, 10);
            box.style.left = boxLeft - step + "px";
        }

        else if (e.keyCode == 39) {
            boxLeft = parseInt(boxStyle.left, 10);
            box.style.left = boxLeft + step + "px";
        }
    },
    deleteElemet: function()
    {
        document.addEventListener('keydown',function (e) {
            if(e.keyCode==46)
            {
                //delete from design
                if (e.keyCode == 46) {
                    curruntlyHtmlObjectSelected.parentNode.parentNode.removeChild(curruntlyHtmlObjectSelected.parentNode)
                }
            }
        });
    }
}






