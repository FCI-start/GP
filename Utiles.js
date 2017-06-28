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

    //****************************** test change in width and hieght ***************************----------------------

    function generateGroupLayout(width, heigh, id, type) {
        this.arr[id] = {};
        this.arr[id].type = type;
        this.arr[id].id = "@+id/" + id;
        this.arr[id].layout_width = width;
        this.arr[id].layout_height = heigh;
    }


    function setDefaultPropertiesToNewObject(htmlObject) {

        var id = htmlObject._id;
        var type = htmlObject._innerText;

        this.arr[id] = {};
        this.arr[id].type = type;
        this.arr[id].id = "@+id/" + id;
        this.arr[id].layout_width = "wrap_content";
        this.arr[id].layout_height = "wrap_content";
        this.arr[id].layout_marginTop = 0;
        this.arr[id].layout_marginLeft = 0;
        this.arr[id].layout_marginButton = 0;
        this.arr[id].layout_marginRight = 0;
        this.arr[id].paddingTop = 0;
        this.arr[id].paddingLeft = 0;
        this.arr[id].paddingButton = 0;
        this.arr[id].paddingRight = 0;
        this.arr[id].visibility = "visible";
        this.arr[id].background = "#FFFFFF";
        this.arr[id].onClick = "none";


        if (type == "Button" || type == "TextView") {
            this.arr[id].text = type;
            this.arr[id].fontFamily = "none";
            this.arr[id].textSize = "14sp";
            this.arr[id].textColor = "none";
            this.arr[id].textStyle = ["none"];

        } else if (type == "ImageView") {
            this.arr[id].src = "none";
            this.arr[id].scaleType = "none";
            this.arr[id].adjustViewBounds = true;
        }
        else if (type == "EditText") {
            this.arr[id].inputType = "none";
            this.arr[id].hint = "none";
            this.arr[id].singleLine = true;
        }

        return this.arr[id]
    }

    function fillPropertiesFromSelectedObject(object) {

        var xmlObject = window.utiles.arr[object._id];
        var objectType = object._innerText;

        //  Assign Basic class
        var idProperty = document.getElementById("id_text");
        var widthProperty = document.getElementById("layout_width");
        var heightProperty = document.getElementById("layout_height");

        var marginTop = document.getElementById("margin_top");
        var marginLeft = document.getElementById("margin_left");
        var marginButton = document.getElementById("margin_buttom");
        var marginRight = document.getElementById("margin_right");

        var paddingTop = document.getElementById("padding_top");
        var paddingLeft = document.getElementById("padding_left");
        var paddingButton = document.getElementById("padding_buttom");
        var paddingRight = document.getElementById("padding_right");

        var visibility = document.getElementById("visibility");
        var background = document.getElementById("background_color");
        var onClick = document.getElementById("onClick");

        var orientation = document.getElementById("orientation");

        var widget_text = document.getElementById("widget_text");
        var font_family = document.getElementById("font_family");
        var type_face = document.getElementById("type_face");
        var text_size = document.getElementById("text_size");
        var text_color = document.getElementById("text_color");
        var bold = document.getElementById("bold");
        var italic = document.getElementById("italic");
        var all_caps = document.getElementById("all_caps");


        var inputType = document.getElementById("inputType");
        var hint = document.getElementById("hint");
        var singleLine = document.getElementById("singleLine");


        var src = document.getElementById("src");
        var scaleType = document.getElementById("scaleType");
        var adjustViewBounds = document.getElementById("adjustViewBounds");


        // fill basic properties from xml object to right side properties
        idProperty.value = object._id;
        console.log(xmlObject.layout_width);
        widthProperty.value = xmlObject.layout_width;
        heightProperty.value = xmlObject.layout_height;

        marginTop.value = xmlObject.layout_marginTop;
        marginLeft.value = xmlObject.layout_marginLeft;
        marginButton.value = xmlObject.layout_marginButton;
        marginRight.value = xmlObject.layout_marginRight;

        paddingTop.value = xmlObject.paddingTop;
        paddingLeft.value = xmlObject.paddingLeft;
        paddingButton.value = xmlObject.paddingButton;
        paddingRight.value = xmlObject.paddingRight;

        visibility.value = xmlObject.visibility;
        background.value = xmlObject.background;
        onClick.value = xmlObject.onClick;

        if(objectType == "Button" || objectType == "TextView"){
            widget_text.value = xmlObject.text;
            font_family.value = xmlObject.fontFamily;
            text_size.value = xmlObject.textSize;
            text_color.value = xmlObject.textColor;

            for(var style in xmlObject.textStyle){
                switch (xmlObject.textStyle){
                    case "Bold":
                        bold.checked = true;
                        break;
                    case "Italic":
                        italic.checked = true;
                        break;
                    case "AllCaps":
                        all_caps.checked = true;
                        break;
                    default:
                        bold.checked = false;
                        italic.checked = false;
                        all_caps.checked = false;
                }
            }

        }else if(objectType == "EditText"){
            inputType.value = xmlObject.inputType;
            hint.value = xmlObject.hint;
            singleLine.checked = xmlObject.singleLine;
        }else if(objectType == "ImageView"){
            src.value = xmlObject.src;
            scaleType.value = xmlObject.scaleType;
            adjustViewBounds.checked = xmlObject.adjustViewBounds;
        }
    }

/*
    function setPropertiestoObject(htmlObject) {

        var id = htmlObject._id;
        var type = htmlObject._innerText;

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

        var orientation = document.getElementById("orientation");

        var widget_text = document.getElementById("widget_text");
        var font_family = document.getElementById("font_family").value;
        var type_face = document.getElementById("type_face").value;
        var text_size = document.getElementById("text_size").value;
        var text_color = document.getElementById("text_color");
        var bold = document.getElementById("bold");
        var italic = document.getElementById("italic");
        var all_caps = document.getElementById("all_caps");


        var inputType = document.getElementById("inputType").value;
        var hint = document.getElementById("hint");
        var singleLine = document.getElementById("singleLine");


        var src = document.getElementById("src");
        var scaleType = document.getElementById("scaleType").value;
        var adjustViewBounds = document.getElementById("adjustViewBounds");


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
*/

    function getValueFromSelectList(select) {
        return select.value;
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

    function renderPropertyToWidget(obj, htmlObj) {
        for (prop in obj) {
            if (prop == "layout_height") {
                if (obj[prop] == "wrap_content")
                    htmlObj.height = "";
                else if (obj[prop] == "match_parent")
                    htmlObj.height = htmlObj.parent.height;
                else
                    htmlObj.height = obj[prop];
            }

            if (prop == "layout_width") {
                if (obj[prop] == "wrap_content")
                    htmlObj.width = "";
                else if (obj[prop] == "match_parent")
                    htmlObj.width = htmlObj.parent.width;
                else
                    htmlObj.width = obj[prop];
            }

            if (prop == "layout_margin_buttom") {
                htmlObj.marginBottom = obj[prop];
            }
            if (prop == "layout_margin_left") {
                htmlObj.marginLeft = obj[prop];
            }
            if (prop == "layout_margin_right") {
                htmlObj.marginRight = obj[prop];
            }
            if (prop == "layout_margin_top") {
                htmlObj.marginTop = obj[prop];
            }
            if (prop == "layout_padding_buttom") {
                htmlObj.paddingBottom = obj[prop];
            }
            if (prop == "layout_padding_left") {
                htmlObj.paddingBottom = obj[prop];
            }
            if (prop == "layout_padding_right") {
                htmlObj.paddingRight = obj[prop];
            }
            if (prop == "layout_padding_top") {
                htmlObj.paddingTop = obj[prop];
            }


            if (obj.type == "Button") {
                if (prop == "widget_text") {
                    htmlObj.innerText = obj[prop]
                }
                if (prop == "font_family") {

                }
                if (prop == "type_face") {

                }
                if (prop == "text_size") {

                }
                if (prop == "text_color") {

                }
                if (prop == "bold") {

                }
                if (prop == "italic") {

                }
                if (prop == "all_caps") {

                }
            }


        }
    }

    window.utiles = window.utiles || {};
    window.utiles.arr = arr || [];
    window.utiles.generateId = generateId;
    window.utiles.objectToXml = objectToXml;
    window.utiles.generateGroupLayout = generateGroupLayout;
    window.utiles.setDefaultPropertiesToNewObject = setDefaultPropertiesToNewObject;
    window.utiles.fillPropertiesFromSelectedObject = fillPropertiesFromSelectedObject;


})();

