/**
 * Created by Ahmed Shaban on 18/04/2017.
 */





function initComponents() {


    var mybutton = document.getElementById('mybutton');
    mybutton._innerText = "Button";
    var mytextview = document.querySelector('div#ComponentContainer div#divtextview label');
    mytextview._innerText = "TextView";
    var myedittext = document.querySelector('div#ComponentContainer div#divedittext input');
    myedittext._innerText = "EditText";
    var myImageview = document.querySelector('div#ComponentContainer div#divimageview div');
    myImageview._innerText = "ImageView";
    var LinearLayout = document.querySelector('div#ComponentContainer #LinearLayout');
    LinearLayout._innerText = "LinearLayout";
    var mylistview = document.querySelector('div#ComponentContainer #ListViewComponent');
    mylistview._innerText = "ListView";


    DragDrop.init(mybutton);
    DragDrop.init(mytextview);
    DragDrop.init(myedittext);
    DragDrop.init(mylistview);
    DragDrop.init(myImageview);
    DragDrop.init(LinearLayout);
}

window.addEventListener('load', initComponents, false);
