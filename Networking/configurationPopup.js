/**
 * Created by shawara on 6/19/2017.
 */

'use strict';
var configs = {};
var resultObj = undefined;
var classes = ['', 'custom-checked', 'custom-unchecked', 'custom-indeterminate'];


function saveConfigs() {

    function validateURL(textval) {
        var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return urlregex.test(textval);
    }

    function getQueries() {
        var querylist = {};
        var liQlist = document.getElementsByClassName('configQuery')[0].getElementsByClassName('queryRow');
        for (var i = 0; i < liQlist.length; i++) {
            var strKey = liQlist[i].getElementsByClassName('qKey')[0].value;
            var strValue = liQlist[i].getElementsByClassName('qValue')[0].value;
            var queryFrom = !liQlist[i].getElementsByClassName('queryFrom')[0].disabled;
            if (strKey.length === 0 && strValue.length <= 2 * queryFrom)continue;

            if (queryFrom)
                strValue = strValue.substr(1, strValue.length - 2);

            querylist[strKey] = {value: strValue, isDynamic: queryFrom};

        }
        return querylist;
    }

    function getStaticQueriesStr(queries) {
        var str = '';
        for (var i in queries) {
            if (!queries[i].isDynamic) {
                if (str.length > 0)str += '&';
                str += i + '=' + queries[i].value;
            }
        }
        return str;
    }

    function getDynamicQlist() {
        var obj = {};
        for (var i in queries) {
            if (queries[i].isDynamic) {
                obj[i] = queries[i].value;
            }
        }
        return obj;
    }

    function empty() {
        return {
            members: {},
            objects: {}
        };
    }

    function getCheckedModel(javaObj, copy) {
        for (var m in  javaObj.members) {
            var chkd = document.getElementById(m + 'label').className !== 'custom-unchecked';
            if (!chkd)continue;
            var ob = javaObj.members[m];

            copy.members[m] = ob;

            if (javaObj.objects[ob.Object]) {
                var o = empty();
                getCheckedModel(javaObj.objects[ob.Object], o);
                copy.objects[ob.Object] = o;
            }
        }
    }


    function getSelectRadioList() {
        var radios = document.getElementsByName('list');
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                return [radios[j].value, radios[j]._value];
            }
        }
        return [];
    }

    var strMethod = document.getElementById('configMethod').value;
    var strUrl = document.getElementById('baseUrl').value;
    var strPath = document.getElementById('path').value;
    var queries = getQueries();
    var pathList = checkPath(strPath);
    var strField = (strMethod === 'GET' ? '@Query' : '@Field');
    var paramsObj = {};
    var strListObjectPath = '';
    var strListIdPath = '';
    var activity = window.ProjectManager.getCurrentActivy();
    var listViewId = activity.id;
    var activityId = activity.parentActivity;


    if (/*!validateURL(strUrl) || checkPath(strPath).length > 1 ||*/ !resultObj) {
        console.log('Failed');
        return;
    }

    var strHeader = resultObj.isList ? 'Call<List<' + window.ProjectManager.getCurrentActivy().id + 'Model>>' : 'Call<' + window.ProjectManager.getCurrentActivy().id + 'Model>';

    if (!resultObj.isList) {
        var l = getSelectRadioList();
        if (l.length > 0)
            strListObjectPath = l[0];
        strListIdPath = l[1];
    }

    if (pathList.length > 0) {
        paramsObj[pathList[0]] = {
            param: '@Path(\"' + pathList[0] + '\") String ' + pathList[0],
            key: pathList[0],
            isDynamic: true
        };
    }
    for (var k in queries) {
        paramsObj[k] = {
            param: strField + '(\"' + k + '\") String ' + k,
            key: queries[k].value,
            isDynamic: queries[k].isDynamic
        };
    }


    var METHOD = {
        annotation: '@' + strMethod + '(\"' + strPath + '\")',
        header: strHeader,
        params: paramsObj
    };


    var copy = empty();
    getCheckedModel(resultObj.obj, copy);

    var strModel = getStringClass(copy, listViewId + 'Model', '');
    console.log(strModel);
    window.NetworkHandler.setModel(listViewId + 'Model', strModel);
    console.log(METHOD);
    window.NetworkHandler.createInterface(listViewId, METHOD);
    window.JavaGenerator.addApiFunction(activityId, listViewId, strUrl, METHOD, strListObjectPath, strListIdPath);
    var type = strListObjectPath.length > 0 ? listViewId + 'Model.' + strListObjectPath : listViewId + 'Model';
    window.JavaGenerator.addModelTypeToHolder(activityId, listViewId, type);

}


function toggle_config_visibility(id, isSave) {
    var e = document.getElementById(id);
    if (e.style.display == 'block') {
        if (isSave) {

            saveConfigs();

        } else {
            e.style.display = 'none';
        }

    }
    else
        e.style.display = 'block';
}

//handel [query input design]
function addQuery(ul) {
    var li = document.getElementById('queryCreator').getElementsByClassName('queryRow')[0].cloneNode(true);
    ul.appendChild(li);
}

function removeQuery(ul) {
    if (ul.children.length > 1)
        ul.removeChild(ul.lastChild);

}

function dynamicQuery(qValue) {
    //alert(qValue.value);
    var str = qValue.value;
    var select = qValue.parentNode.getElementsByClassName('queryFrom')[0];
    if (str.startsWith('{') && str.endsWith('}') && str.length > 2) {
        select.disabled = false;
    } else {
        select.disabled = true;
    }
}
//end of [query input design]


//handle [path]
function checkPath(str) {
    var res = [];
    var list = str.split('/');
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        if (p.startsWith('{') && p.endsWith('}') && p.length > 2) {
            res.push(str.substr(1, str.length - 2));
        }
    }
    return res;
}

function dynamicPath(pathInput) {
    //alert(qValue.value);
    var str = pathInput.value;
    var select = pathInput.parentNode.parentNode.getElementsByClassName('pathFrom')[0];
    if (checkPath(str).length === 1) {
        select.disabled = false;
    } else {
        select.disabled = true;
    }
}
//end of [path]


//convert json text into intermediate object
function JsonToJavaObject(strJson) {
    var isJsonArray = 0;
    var JavaObject = createEmptyJObject();
    var js = JSON.parse(strJson);
    isJsonArray = isArray(js);
    if (isArray(js))
        js = js[0];

    function createEmptyJObject() {
        return {
            members: {},
            objects: {}
        };
    }

    function isArray(obj) {
        return isObject(obj) && (obj instanceof Array);
    }

    function isObject(obj) {
        return obj && (typeof obj === "object");
    }

    function isLong(n) {
        return isInt(n) && n > 1e9;
    }

    function isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    function isBoolean(n) {
        return typeof n === 'boolean';
    }

    function isString(n) {
        return typeof n === 'string';
    }


    function getType(n) {
        if (isLong(n)) {
            return 'long';
        } else if (isInt(n)) {
            return 'int';
        } else if (isFloat(n)) {
            return 'double'
        } else if (isBoolean(n)) {
            return 'boolean';
        } else if (isString(n)) {
            return 'String';
        }
    }

    function createClassName(name) {
        return name.charAt(0).toUpperCase() + name.substr(1) + 'Bean';
    }

    function getObjectJava(object, javaObject) {

        for (var i in object) {
            if (isArray(object[i])) {

                var listL = '', listR = '';
                var listobj = object[i];
                while (isArray(listobj)) {
                    listL += 'List< ';
                    listR += ' >';
                    listobj = listobj[0];
                }
                if (isObject(listobj)) {
                    javaObject.members[i] = {type: 'List<' + createClassName(i) + '>', Object: createClassName(i)};
                    javaObject.objects[createClassName(i)] = getObjectJava(listobj, createEmptyJObject());

                } else {
                    javaObject.members[i] = {type: listL + getType(listobj) + listR, Object: getType(listobj)};
                }


            } else if (isObject(object[i])) {
                javaObject.members[i] = {type: createClassName(i), Object: createClassName(i)};
                javaObject.objects[createClassName(i)] = getObjectJava(object[i], createEmptyJObject());

            } else {
                javaObject.members[i] = {type: getType(object[i]), Object: getType(object[i])};

            }
        }
        return javaObject;
    }


    getObjectJava(js, JavaObject);

    //var stringJavaObjectCode = getStringClass(JavaObject, 'Model', '');

    return {obj: JavaObject, isList: isJsonArray};
}


//convert intermediate object to string java code
function getStringClass(javaObject, class_name, tapes) {
    var res = tapes + 'public class ' + class_name + ' {\n';
    for (var m in  javaObject.members) {
        var ob = javaObject.members[m];
        res += tapes + '\tpublic ' + ob.type + ' ' + m + ';\n';
    }


    for (var m in javaObject.objects) {
        var ob = javaObject.objects[m];
        //console.log(m, ob);
        res += '\n' + getStringClass(ob, m, tapes + '\t');

    }

    res += tapes + '}\n';
    return res;
}


//get TextArea text Json
function jsonInput(TA) {
    var ulRoot = document.getElementsByClassName('treeview')[0];
    while (ulRoot.firstChild) {
        ulRoot.removeChild(ulRoot.firstChild);
    }
    var list = [];
    var listObjects = [];

    function getAllLists(path, javaObject, pathObject) {
        for (var m in javaObject.members) {
            var ob = javaObject.members[m];
            if (ob.type.startsWith('List')) {
                list.push(path + m);
                listObjects.push(pathObject + ob.Object);
            } else if (ob.type.endsWith('Bean')) {
                getAllLists(path + m + '.', javaObject.objects[ob.Object], pathObject + ob.Object + '.');
            }
        }
    }

    try {
        resultObj = JsonToJavaObject(TA.value);
        //console.log(getStringClass(javaObject,'Model',''));
    } catch (ex) {
        resultObj = {};
        // console.log(ex);
        return;
    }


    var javaObject = resultObj.obj;
    var isList = resultObj.isList;

    var parent = document.getElementById('selectListDiv');
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
    parent.innerHTML = 'The result is Object You must select List:<br>';
    //console.log(parent);
    if (!isList) {
        parent.style.display = 'inline-block';
        list = [];
        listObjects = [];
        getAllLists('', javaObject, '');
        for (var i = 0; i < list.length; i++) {
            var inp = document.getElementById('radioCreator').getElementsByTagName('input')[0].cloneNode(true);
            var lbl = document.getElementById('radioCreator').getElementsByTagName('label')[0].cloneNode(true);
            inp.value = listObjects[i];
            inp._value = list[i];
            inp.addEventListener('click', function () {
                //console.log('shawaraaadasfsdafasd', inp.value);
                createHtmlTree(javaObject, ulRoot, inp._value);
            }, false);

            inp.id = 'list' + list[i];
            lbl.for = 'list' + list[i];
            lbl.innerHTML = list[i];
            parent.appendChild(inp);
            parent.appendChild(lbl);
        }
    } else {
        parent.style.display = 'none';
        createHtmlTree(javaObject, ulRoot, '');
    }


}


function createHtmlTree(javaObject, ulRoot, PATH) {

    createHtmlObject(ulRoot, javaObject, '');

    function createHtmlObject(ul, javaObj, path) {
        for (var m in  javaObj.members) {
            var ob = javaObj.members[m];
            //console.log(path, PATH);
            var show = path.startsWith(PATH);
            var li = createElem(m, ob.type, show, show ? path.replace(PATH + '.', '') : path);

            ul.appendChild(li);

            if (javaObj.objects[ob.Object]) {
                var u = document.createElement('ul');
                li.appendChild(u);
                createHtmlObject(u, javaObj.objects[ob.Object], path + m + '.');
            }
        }

    }

    function createElem(id, type, show, path) {
        // console.log(type);
        type = type.replace('<', '&lt;').replace('>', '&gt;');

        var li = document.getElementById('checkboxCreator').getElementsByTagName('li')[0].cloneNode(true);
        var inp = li.getElementsByTagName('input')[0];
        var lbl = li.getElementsByTagName('label')[0];
        var binw = li.getElementsByClassName('bindWithDev')[0];
        var selc = binw.getElementsByClassName('bindWithSel')[0];
        var listView = window.ProjectManager.getCurrentActivy().id;
        var activityId = window.ProjectManager.getCurrentActivy().parentActivity;

        selc.addEventListener('click', function () {
            if (selc.value !== 'none') {
                window.JavaGenerator.bindMember(activityId, listView, selc.value, path + id);
                console.log(path + id);
            }

        }, false);

        inp.name = id + 'input';
        inp.id = id + 'input';
        lbl.for = id + 'input';
        lbl.id = id + 'label';
        lbl.innerHTML = type + " : " + id;
        selc.id = id + 'select';
        if (type.startsWith('List') || type.endsWith('Bean') || !show) {
            li.removeChild(binw);
        }
        else {

            var mObj = window.JavaGenerator.getHolderMembers(activityId, listView);

            //console.log(mObj);
            for (var i  in mObj) {
                var op = document.createElement('option');
                op.value = i;
                op.innerHTML = i;
                selc.appendChild(op);

            }

        }


        return li;
    }

}


//Handle design of checkBoxes
function checkBoxChanged(ele) {

    //console.log(ele.className)
    checkChildren(ele, ele.className !== 'custom-checked');
    checkParent(ele);

    function checkChildren(box, checked) {
        box.className = (checked ? 'custom-checked' : 'custom-unchecked');
        //console.log(box);
        var ul = box.parentNode.getElementsByTagName('ul')[0];
        if (!ul)return;
        for (var i = 0; i < ul.children.length; i++) {
            var li = ul.children[i];
            var boxc = li.getElementsByTagName('label')[0];
            checkChildren(boxc, checked);
        }
    }


    function checkSiblings(ul) {
        var ch = 0, unch = 0, mix = 0;
        for (var i = 0; i < ul.children.length; i++) {
            var li = ul.children[i];
            var isChecked = (li.getElementsByTagName('label')[0].className === 'custom-checked');
            var unChecked = (li.getElementsByTagName('label')[0].className === 'custom-unchecked');
            if (isChecked)ch = 1;
            else if (unChecked)unch = 2;
            else mix = 3;
        }
        return ch | unch | mix;
    }

    function checkParent(ele) {
        var ul = ele.parentNode.parentNode;
        if (ul.className === 'treeview')
            return;

        var type = checkSiblings(ul);
        //console.log(type);

        var lbl = ul.parentNode.getElementsByTagName('label')[0];
        lbl.className = classes[type];
        checkParent(lbl);
    }
}


