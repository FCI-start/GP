/**
 * Created by shawara on 7/1/2017.
 */

function saveActivities() {
    var result = {};
    result['JAVA'] = getJava();
    result['HTML'] = getHtml();
    result['XML'] = getXml();

    console.log(result);
    console.log(JSON.parse(JSON.stringify(result)));

    function getXml() {
        var xml = {
            trees: window.tree.root,
            attributs: window.tree.getAllAtributes()
        }
        return xml;
    }

    function getJava() {
        var activities = window.JavaGenerator.getActivitiesObject();
        return activities;
    }


    function getHtml() {
        var html = document.getElementById('mobielDev').innerHTML;
        return html;
    }


}

window.SaveManagement = window.SaveManagement || {};
window.SaveManagement.save = saveActivities;
