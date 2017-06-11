// /**
//  * Created by Ahmed Shaban on 11/03/2017.
//  */
// (function () {
//
//     var arr = [];
//     function generateId(name) {
//         var i = 1;
//         while (1) {
//             if (!this.arr.hasOwnProperty(name + i)) {
//                 generateDeafult(name, name + i);
//                 return name + i;
//             }
//
//             i++;
//         }
//     }
//
//
//     function generateDeafult(type, id) {
//         if (type == "Button") {
//             arr[id] = {};
//             arr[id].type = "Button";
//             arr[id].id = "@+id/" + id;
//             arr[id].text = id;
//             arr[id].width = "wrap_content";
//             arr[id].height = "wrap_content";
//
//         }
//         else if (type == "TextView") {
//             arr[id] = {};
//             arr[id].id = "@+id/" + id;
//             arr[id].type = "TextView";
//             arr[id].text = id;
//             arr[id].width = "wrap_content";
//             arr[id].height = "wrap_content";
//         }
//         else if (type == "EditText") {
//             arr[id] = {};
//             arr[id].id = "@+id/" + id;
//             arr[id].type = "EditText";
//             arr[id].text = id;
//             arr[id].width = "wrap_content";
//             arr[id].height = "wrap_content";
//         }
//         else if (type == "ImageView") {
//             arr[id] = {};
//             arr[id].id = "@+id/" + id;
//             arr[id].type = "ImageView";
//             arr[id].text = id;
//             arr[id].width = "wrap_content";
//             arr[id].height = "wrap_content";
//         }
//         else if (type == "ListView") {
//             arr[id] = {};
//             arr[id].id = "@+id/" + id;
//             arr[id].type = "ListView";
//             arr[id].text = id;
//             arr[id].width = "wrap_content";
//             arr[id].height = "wrap_content";
//         }
//         else if (type === "LinearLayout") {
//             arr[id] = {};
//             arr[id].id = "@+id/" + id;
//             arr[id].type = "LinearLayout";
//             arr[id].text = id;
//             arr[id].width = "match_parent";
//             arr[id].height = "match_parent";
//         } else{
//
//         }
//     }
//
//
//     function objectToXml(obj) {
//         var output = "\n<" + obj.type + " \n";
//         for (key in obj) {
//             if (key != "type") {
//                 output += 'android:' + key + '="' + obj[key] + '" \n';
//             }
//         }
//         output += ">";
//
//         return output;
//     }
//
//
//
//     window.utiles = window.utiles || {};
//     window.utiles.arr = arr || [];
//     window.utiles.generateId = generateId;
//     window.utiles.generateDeafult = generateDeafult;
//     window.utiles.objectToXml = objectToXml;
//
// })();

(function () {
    this.arr = [];

    function generateId(name) {
        var i = 1;
        while (1) {
            var id = name + i;
            if (!this.arr.hasOwnProperty(id)) {
                return id;
            }
            i++;
        }
    }

    function generateGroupLayout(width, heigh, id, type) {
        this.arr[id] = {};
        this.arr[id].type = type;
        this.arr[id].id = "@+id/" + id;
        this.arr[id].layout_width = width;
        this.arr[id].layout_height = heigh;
    }

    function setPropertiestoObject(id, type) {
        //  Assign Basic class
        var idProperty = document.getElementById("id_text");
        var widthProperty = document.getElementById("layout_width");
        var heightProperty = document.getElementById("layout_height");
        var margins = [document.getElementById("margin_top").value,
            document.getElementById("margin_left").value,
            document.getElementById("margin_buttom").value,
            document.getElementById("margin_right").value];

        var paddings = [document.getElementById("padding_top").value,
            document.getElementById("padding_left").value,
            document.getElementById("padding_buttom").value,
            document.getElementById("padding_right").value];

        var visibility = document.getElementById("visibility");
        var background = document.getElementById("background").value;
        var onClick = document.getElementById("onClick").value;

        idProperty.value = id;
        // if(!arr.hasOwnProperty(id)) {
        //     generateDefault();
        // }
        //     previewInProperties();


        this.arr[id] = {};
        this.arr[id].type = type;
        this.arr[id].id = "@+id/" + id;
        this.arr[id].layout_width = getValueFromSelectList(widthProperty);
        this.arr[id].layout_height = getValueFromSelectList(heightProperty);
        this.arr[id].layout_margin_top = margins[0];
        this.arr[id].layout_margin_left = margins[1];
        this.arr[id].layout_margin_buttom = margins[2];
        this.arr[id].layout_margin_right = margins[3];

        this.arr[id].layout_padding_top = paddings[0];
        this.arr[id].layout_padding_left = paddings[1];
        this.arr[id].layout_padding_buttom = paddings[2];
        this.arr[id].layout_padding_right = paddings[3];

        this.arr[id].visibility = getValueFromSelectList(visibility);
        this.arr[id].background = background;
        this.arr[id].onClick = onClick;
        for (var it in arr[id])
            if (arr[id][it] == 'none')delete arr[id][it];
        return this.arr[id];
    }

    function getValueFromSelectList(select) {
        return select.children[select.value].innerText;
    }

    function objectToXml(obj) {
        var output = "\n<" + obj.type + " \n";
        for (key in obj) {
            if (key != "type") {
                output += 'android:' + key + '="' + obj[key] + '" \n';
            }
        }
        output += ">";
        return output;
    }

    window.utiles = window.utiles || {};
    window.utiles.arr = arr || [];
    window.utiles.generateId = generateId;
    window.utiles.setPropertiestoObject = setPropertiestoObject;
    window.utiles.objectToXml = objectToXml;
    window.utiles.generateGroupLayout = generateGroupLayout;

})();

