/**
 * Created by shawara on 6/19/2017.
 */

var netWorkInterfaces = {};
function createInterface(listViewId, method) {
    netWorkInterfaces['ListView1' + 'Interface'] = 'public Interface ' + listViewId +
        'Interface {\n\t' + method.annotation + '\n\t' + method.header + ' getData(';
    var cnt = 0, str = '';
    for (var i in method.params) {
        if (cnt)str += ' , ';
        str += method.params[i].param;
        cnt++;
    }
    netWorkInterfaces['ListView1' + 'Interface'] += str + ');\n}';

    console.log(netWorkInterfaces['ListView1' + 'Interface']);
}

window.NetworkHandler = window.NetworkHandler || {};
window.NetworkHandler.createInterface = createInterface;