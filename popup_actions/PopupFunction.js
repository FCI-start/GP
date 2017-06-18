/**
 * Created by shawara on 6/12/2017.
 */

//todo handl all action component dragged in function, get values from them
function onSaveFunction(ulContainer) {
    for (var i = 0; i < ulContainer.children.length; i++) {
        var ele = ulContainer.children[i];
        if (ele.className === 'showToast') {

            var txt = ele.getElementsByTagName('input')[0].value;
            var lineCode = 'Toast.makeText(getApplicationContext(),\"' + txt + '\", Toast.LENGTH_SHORT).show();';
            console.log(lineCode);

        } else if (ele.className === 'showToastFrom') {

            var e = ele.getElementsByClassName("selectFrom")[0];
            var txt = e.options[e.selectedIndex].text + '.getText()';
            var lineCode = 'Toast.makeText(getApplicationContext(),' + txt + ', Toast.LENGTH_SHORT).show();';
            console.log(lineCode);

        } else if (ele.className === 'moveValueofViews') {

            var e1 = ele.getElementsByClassName("setValueTo")[0];
            var e2 = ele.getElementsByClassName("setValueFrom")[0];
            var totxt = e1.options[e1.selectedIndex].text;
            var fromtxt = e2.options[e2.selectedIndex].text + '.getText()';

            var lineCode = totxt + '.setText( ' + fromtxt + ' );';
            console.log(lineCode);

        } else if (ele.className === 'startActivity') {
            var e = ele.getElementsByClassName("activities")[0];
            var activity = (e.options[e.selectedIndex].text).toUpperCase() + '.class';
            console.log(activity);
            var intent = "Intent intent=new Intent(getApplicationContext()," + activity + ");";

            var table = ele.getElementsByClassName("extraTable")[0];
            //console.log(table);
            for (var j = 0; table.rows[j]; j++) {
                var key = table.rows[j].getElementsByClassName("fieldKey")[0].value;
                var val = table.rows[j].getElementsByClassName("fieldValue")[0].value;
                console.log(key, val);
                if (key.length > 0) {
                    intent += '\nintent.putExtra(\"' + key + '\" , \"' + val + '\");';
                }
            }
            intent += '\nstartActivity( intent );';
            console.log(intent);
        }
    }
}

function toggle_visibility(id, isSave) {
    var e = document.getElementById(id);
    if (e.style.display == 'block') {
        e.style.display = 'none';

        var fun = document.getElementById('funList');

        if (isSave)
            onSaveFunction(fun);
        while (fun.hasChildNodes()) {
            fun.removeChild(fun.lastChild);
        }
    }
    else
        e.style.display = 'block';
}

function removeExtraRow(e) {
    var tr = e.parentNode;
    var table = tr.parentNode;
    if (table.children.length > 1)
        table.removeChild(tr);
}

function addExtraRow(e) {
    var table = e.querySelector('table.extraTable');
    if (table.parentNode._id !== 'copy')
        return;
    var row = table.rows[0];
    var clone = row.cloneNode(true);
    table.appendChild(clone);
}