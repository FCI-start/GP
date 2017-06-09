// (function () {
//     this.arr = [];
//     function generateId(name) {
//         var i = 1;
//         while (1) {
//             var id = name + i;
//             if (!this.arr.hasOwnProperty(id)) {
//                 return setPropertiestoObject(id, name);
//             }
//             i++;
//         }
//     }
//
//
//     function setPropertiestoObject(id, type) {
//         //  Assign Basic class
//         var idProperty = document.getElementById("id_text");
//         var widthProperty = document.getElementById("layout_width");
//         var heightProperty = document.getElementById("layout_height");
//         var margins = [document.getElementById("margin_top").value,
//             document.getElementById("margin_left").value,
//             document.getElementById("margin_buttom").value,
//             document.getElementById("margin_right").value];
//
//         var paddings = [document.getElementById("padding_top").value,
//             document.getElementById("padding_left").value,
//             document.getElementById("padding_buttom").value,
//             document.getElementById("padding_right").value];
//
//         var visibility = document.getElementById("visibility");
//         var background = document.getElementById("background").value;
//         var onClick = document.getElementById("onClick").value;
//
//         idProperty.value = id;
//
//         this.arr[id] = {};
//         this.arr[id].type = type;
//         this.arr[id].id = "@+id/" + id;
//         this.arr[id].layout_width = getValueFromSelectList(widthProperty);
//         this.arr[id].layout_height = getValueFromSelectList(heightProperty);
//         this.arr[id].layout_margin_top = margins[0];
//         this.arr[id].layout_margin_left = margins[1];
//         this.arr[id].layout_margin_buttom = margins[2];
//         this.arr[id].layout_margin_right = margins[3];
//
//         this.arr[id].layout_padding_top = paddings[0];
//         this.arr[id].layout_padding_left = paddings[1];
//         this.arr[id].layout_padding_buttom = paddings[2];
//         this.arr[id].layout_padding_right = paddings[3];
//
//         this.arr[id].visibility = getValueFromSelectList(visibility);
//         this.arr[id].background = background;
//         this.arr[id].onClick = onClick;
//         return this.arr[id];
//     }
//
//     function getValueFromSelectList(select) {
//         return select.children[select.value].innerText;
//     }
//
//     function objectToXml(obj) {
//         var output = "\n<" + obj.type + " \n";
//         for (key in obj) {
//             if (key != "type") {
//                 output += 'android:' + key + '="' + obj[key] + '" \n';
//             }
//         }
//         output += ">";
//         return output;
//     }
//
//     window.utiles = window.utiles || {};
//     window.utiles.arr = arr || [];
//     window.utiles.generateId = generateId;
//     window.utiles.setPropertiestoObject = setPropertiestoObject;
//     window.utiles.objectToXml = objectToXml;
//
// })();
//
