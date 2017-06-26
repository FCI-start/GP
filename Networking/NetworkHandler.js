/**
 * Created by shawara on 6/19/2017.
 */

var netWorkInterfaces = {};
var models = {};
function createInterface(listViewId, method) {
    netWorkInterfaces['ListView1' + 'Interface'] = 'import retrofit2.Call;' +
        '\nimport retrofit2.http.Field;' +
        '\nimport retrofit2.http.GET;' +
        '\nimport retrofit2.http.POST;' +
        '\nimport retrofit2.http.Path;' +
        '\nimport retrofit2.http.Query;\n';

    netWorkInterfaces['ListView1' + 'Interface'] += 'public interface ' + listViewId +
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

function setModel(modelId, strModel) {
    models[modelId] = 'import java.util.List;\n' + strModel;
}

function printModelsInterfaces() {
    for (i in models) {
        console.log(models[i]);
    }

    for (i in netWorkInterfaces) {
        console.log(netWorkInterfaces[i]);
    }
}

window.NetworkHandler = window.NetworkHandler || {};
window.NetworkHandler.createInterface = createInterface;
window.NetworkHandler.setModel = setModel;
window.NetworkHandler.printModelsInterfaces = printModelsInterfaces;