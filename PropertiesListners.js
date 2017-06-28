/**
 * Created by Allam on 2/27/2017.
 */
(function () {
    var widthProperty = document.getElementById("layout_width");
    var heightProperty = document.getElementById("layout_height");

    var marginTop = document.getElementById("margin_top");
    var marginLeft = document.getElementById("margin_left");
    var marginButtom = document.getElementById("margin_buttom");
    var marginRight = document.getElementById("margin_right");

    var paddingTop = document.getElementById("padding_top");
    var paddingLeft = document.getElementById("padding_left");
    var paddingButtom = document.getElementById("padding_buttom");
    var paddingRight = document.getElementById("padding_right");

    var visibility = document.getElementById("visibility");
    var backgroundColor = document.getElementById("background_color");
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

    widthProperty.addEventListener("change", changeObjWidth, false);
    heightProperty.addEventListener("change", changeObjHeight, false);

    //Margin input listners
    marginTop.addEventListener('input', marginTopChange);
    marginLeft.addEventListener('input', marginLeftChange);
    marginButtom.addEventListener('input', marginButtomChange);
    marginRight.addEventListener('input', marginRightChange);

    //Padding input listners
    paddingTop.addEventListener('input', paddingTopChange);
    paddingLeft.addEventListener('input', paddingLeftChange);
    paddingButtom.addEventListener('input', paddingButtomChange);
    paddingRight.addEventListener('input', paddingRightChange);

    visibility.addEventListener('change', visibiliyChange, false);
    backgroundColor.addEventListener('input', backgroundChange, false);


    function changeObjWidth() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.layout_width = widthProperty.value;
        htmlObjParent.style.width = htmlObj.parentNode.parentElement.clientWidth + 'px';
    }

    function changeObjHeight() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.layout_height = heightProperty.value;
        htmlObjParent.style.height = htmlObj.parentNode.parentElement.clientHeight + 'px';
    }


    /**
     * set Margins in runtime from right properties
     */

    function marginTopChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var xmlObj = window.utiles.arr[htmlObj._id];
        var marginValue = marginTop.value;
        xmlObj.marginTop = marginValue;
        htmlObjParent.style.marginTop = marginValue + "px";
    }

    function marginLeftChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var marginValue = marginLeft.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.marginLeft = marginValue;
        htmlObjParent.style.marginLeft = marginValue + "px";
    }

    function marginButtomChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var marginValue = marginButtom.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.marginButton = marginValue;
        htmlObjParent.style.marginBottom = marginValue + "px";
    }

    function marginRightChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var marginValue = marginRight.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.marginRight = marginValue;
        htmlObjParent.style.marginRight = marginValue + "px";
    }

    /**
     * set Paddings in runtime from right properties
     */

    function paddingTopChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var paddingValue = paddingTop.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.paddingTop = paddingValue;
        htmlObj.style.paddingTop = paddingValue + "px";
    }

    function paddingLeftChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var paddingValue = paddingLeft.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.paddingLeft = paddingValue;
        htmlObj.style.paddingLeft = paddingValue + "px";
    }

    function paddingButtomChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var paddingValue = paddingButtom.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.paddingButton = paddingValue;
        htmlObj.style.paddingBottom = paddingValue + "px";
    }

    function paddingRightChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var paddingValue = paddingRight.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.paddingRight = paddingValue;
        htmlObj.style.paddingRight = paddingValue + "px";
    }

    function visibiliyChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var htmlObjParent = htmlObj.parentNode;
        var visibilityValue = visibility.value;
        var xmlObj = window.utiles.arr[htmlObj._id];
        xmlObj.visibility = visibilityValue;
        if(visibilityValue == "visible"){
            htmlObjParent.style.display = "block";
            htmlObjParent.style.visibility = "visible";
        }else if(visibilityValue == "invisible"){
            htmlObjParent.style.visibility = "hidden";
        }else{
            htmlObjParent.style.display="none";
        }
    }

    function backgroundChange() {
        var htmlObj = window.curruntlyHtmlObjectSelected;
        var xmlObj = window.utiles.arr[htmlObj._id];
        var color = backgroundColor.value;
        xmlObj.background = color;
        htmlObj.style.backgroundColor = color;
    }


})();