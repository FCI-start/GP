/**
 * Created by Ahmed Shaban on 18/04/2017.
 */





function initComponents() {


    var mybutton = document.getElementById('mybutton');
    mybutton._innerText = "Button";
    mybutton._import = "import android.widget.Button;";
    var mytextview = document.querySelector('div#ComponentContainer div#divtextview label');
    mytextview._innerText = "TextView";
    mytextview._import = "import android.widget.TextView;";
    var myedittext = document.querySelector('div#ComponentContainer div#divedittext input');
    myedittext._innerText = "EditText";
    myedittext._import = "import android.widget.EditText;";
    var myImageview = document.querySelector('div#ComponentContainer div#divimageview div');
    myImageview._innerText = "ImageView";
    myImageview._import = "import android.widget.ImageView;";
    var LinearLayout = document.querySelector('div#ComponentContainer #LinearLayout');
    LinearLayout._innerText = "LinearLayout";
    LinearLayout._import = "import android.widget.LinearLayout;";
    var mylistview = document.querySelector('div#ComponentContainer #ListViewComponent');
    mylistview._innerText = "ListView";
    mylistview._import = "import android.widget.ListView;";


    DragDrop.init(mybutton);
    DragDrop.init(mytextview);
    DragDrop.init(myedittext);
    DragDrop.init(mylistview);
    DragDrop.init(myImageview);
    DragDrop.init(LinearLayout);
}

window.addEventListener('load', initComponents, false);
