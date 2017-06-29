/**
 * Created by shawara on 3/1/2017.
 */

function loadTree() {

    function Node(data) {
        this.data = ( data || 0);

        this.child = new Array();
    }

    function Tree() {
        this.root = {};
        // this.root = new Node(rootView);
        this.getFiles = function () {
            var xmls = {};
            for (var r in this.root) {
                xmls[r.toLowerCase() + '.xml'] = getXmlFileString(this.root[r]);
            }
            return xmls;
        };

        this.removeView = function (activityId, viewId) {
            removeViewId(this.root[activityId], -1, undefined, viewId);
        };

        var removeViewId = function (node, nodeIdx, parentNode, viewId) {
            if (node === undefined)return;
            if (viewId === node.data) {
                if (parentNode) {
                    //console.log(parentNode.child[1].data);
                    delete parentNode.child[nodeIdx];
                    // parentNode.child.slice(nodeIdx, 1);
                }
                return;
            }

            for (var i = 0; i < node.child.length; i++) {
                removeViewId(node.child[i], i, node, viewId);
            }

        };


        this.addChild = function (activityId, parentId, viewId, upperId) {
            add(this.root[activityId], parentId, viewId, upperId);
        };


        var add = function (node, parentId, viewId, upperId) {
            if (node === undefined)return;
            if (node.data == parentId) {

                if (upperId === undefined) {
                    node.child.push(new Node(viewId));
                    return;
                }
                else {
                    for (var i = 0; i < node.child.length; i++) {
                        if (node.child[i].data === upperId) {
                            node.child.splice(i + 1, 0, (new Node(viewId)));
                            return;
                        }
                    }
                }
            }
            for (var i = 0; i < node.child.length; i++) {
                add(node.child[i], parentId, viewId, upperId);
            }
        };

        this.printTree = function (activtyId) {
            //prinTree(this.root);
            return getXmlFileString(this.root[activtyId]);
        };

        var prinTree = function (node) {
            if (node == undefined)return;
            console.log(node.data);
            console.log(node.data);
            if (node.child)
                for (var i = 0; i < node.child.length; i++) {
                    prinTree(node.child[i]);

                }
            console.log(node.data);
        };
        var getComponentXml = function (viewId) {
            return window.utiles.objectToXml(window.utiles.arr[viewId]);
        };

        var getXmlFileString = function (node) {
            var out = '';
            if (node == undefined)return out;
            //console.log(node.data);
            out += getComponentXml(node.data);
            if (node.child)
                for (var i = 0; i < node.child.length; i++) {
                    out += getXmlFileString(node.child[i]);
                }
            //console.log(node.data);
            out += '\n</' + window.utiles.arr[node.data].type + '>\n';
            return out;
        };
    }


    /*
     var mXml = new Tree("linear_layout_root");
     mXml.addChild("linear_layout_root", "linear_child_V");
     mXml.addChild("linear_layout_root", "linear_child_H");
     mXml.addChild("linear_child_V", "Image_view1");
     mXml.addChild("linear_layout_root", "text_view1", "linear_child_V");
     mXml.printTree();
     console.log();
     mXml.removeView("text_view1");
     //mXml.removeView("linear_child_V");
     mXml.printTree();
     */


    // window.utiles.objectToXml(root_id);
    window.tree = window.tree || new Tree();
    window.NodeObj = window.NodeObj || Node;

    var WorkspaceDev = window.ProjectManager.getCurrentActivy();   //this is the div where we drag and drop the element in it

};

window.addEventListener('load', loadTree, false);