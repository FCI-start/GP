/**
 * Created by Allam on 2/27/2017.
 */
(function () {

    var draggedItem;
    var right_div = document.getElementById('right_div');
    var linearLayoutSection = document.getElementById('linear_layout');
    var basicsSecion = document.getElementById('basics_class');
    var imageViewSection = document.getElementById('imageView_class');
    var textViewSection = document.getElementById('text_class');
    var editTextSection = document.getElementById('editText_class');

    var linearLayout = document.getElementById('linear');
    var button = document.getElementById('button');
    var imageView = document.getElementById('imageView');
    var textView = document.getElementById('textView');
    var editText = document.getElementById('editText');

    function addWidgetEventListner(draggedItem) {
        if (draggedItem) {
            draggedItem.addEventListener('click', getGeneralXml, false);
        }
    }

    // button.addEventListener('click', getGeneralXml, false);
    // imageView.addEventListener('click', getGeneralXml, false);
    // editText.addEventListener('click', getGeneralXml, false);
    // textView.addEventListener('click', getGeneralXml, false);


    function selectItem(HtmlObj) {
        window.curruntlyHtmlObjectSelected = HtmlObj;
        updatePropertiesView(HtmlObj._innerText);
        window.utiles.setPropertiestoObject(HtmlObj._id, HtmlObj._innerText);
        var xmlObject = window.utiles.arr[HtmlObj._id];
     //   console.log(utiles.objectToXml(xmlObject));
    }

    function updatePropertiesView(draggedItem) {
        if (draggedItem != null) {
            show(right_div);
            switch (draggedItem) {

                case 'LinearLayout':
                    LinearLayout();
                    break;
                case 'ImageView':
                    ImageView();
                    break;
                case 'Button':
                    Button();
                    break;
                case 'TextView':
                    TextView();
                    break;
                case 'EditText':
                    EditText();
                    break;
                default:
                    break;
            }
        } else {
            hideAll()
        }
    }

    function show(item) {
        item.style.display = 'block';
    }

    function hide(item) {
        item.style.display = 'none';
    }

    function EditText() {
        show(basicsSecion);
        hide(linearLayoutSection);
        show(textViewSection);
        show(editTextSection);
        hide(imageViewSection);
    }

    function TextView() {
        show(basicsSecion);
        hide(linearLayoutSection);
        show(textViewSection);
        hide(editTextSection);
        hide(imageViewSection);
    }

    function ImageView() {
        show(basicsSecion);
        hide(linearLayoutSection);
        hide(textViewSection);
        hide(editTextSection);
        show(imageViewSection);
    }

    function Button() {
        show(basicsSecion);
        hide(linearLayoutSection);
        show(textViewSection);
        hide(editTextSection);
        hide(imageViewSection);
    }

    function LinearLayout() {
        show(basicsSecion);
        show(linearLayoutSection);
        hide(textViewSection);
        hide(editTextSection);
        hide(imageViewSection);
    }

    function hideAll() {
        hide(basicsSecion);
        hide(linearLayoutSection);
        hide(imageViewSection);
        hide(textViewSection);
        hide(editTextSection);
    }

    window.properties = window.properties || {};
    window.properties.draggedItem = draggedItem;
    window.properties.addWidgetEventListner = addWidgetEventListner;
    window.properties.selectItem = selectItem;
})();