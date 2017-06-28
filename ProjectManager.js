/**
 * Created by Ahmed Shaban on 11/03/2017.
 */

(function () {
    var activityNames = [];
    var currentActivityName;
    var selectorElement = document.getElementById('all_activity');

    function generateActivityName(id) {
        //console.log(id);
        if (id) {
            document.getElementById('listViewConfig').style.display = 'inline-block';
            if (!activityNames.hasOwnProperty(id)) {
                activityNames[id] = true;
                return id;
            } else {
                return '5ra';
            }

        }
        else {
            document.getElementById('listViewConfig').style.display = 'none';
            var i = 1;
            while (1) {
                if (!activityNames.hasOwnProperty("activity" + i)) {
                    activityNames["activity" + i] = true;
                    return "activity" + i;
                }

                i++;
            }
        }
    }

    function generateMainLayout(id) {
        var file = generateActivityName(id);

        var layout;
        if (file !== '5ra') {
            layout = document.createElement("ul");
            //layout.style.backgroundColor="red";
            layout.className = "WorkspaceContainer";
            layout.id = file;
            layout.style.width = "100%";
            layout.style.height = "100%";
            document.getElementById('mobielDev').appendChild(layout);
            createOptionItem(file);
            handleXMLTree(layout);
            if (!id) {
                window.JavaGenerator.generateDefaultJaveActivity(layout.id);
                window.JavaGenerator.printJavaActivity(layout.id);
            }

            if (currentActivityName)
                layout.parentActivity = getCurrentActivy().id;
        }


        hideCurrentActivity();

        if (id) {
            document.getElementById(id).style.display = 'visiable';
            layout = document.getElementById(id);
            window.JavaGenerator.createListViewHolderAndAdapter(layout.parentActivity, id);
            //console.log(layout.parentActivity);
            window.JavaGenerator.getAlladptersAndLists(layout.parentActivity);
        }
        return currentActivityName = layout;
    }

    function handleXMLTree(WorkspaceDev) {
        var root_id = window.utiles.generateId("LinearLayout");
        window.utiles.generateGroupLayout('match_parent', 'match_parent', root_id, 'LinearLayout'); // generate XML of grouplayout

        WorkspaceDev._id = root_id;
        window.tree.root[WorkspaceDev.id] = new window.NodeObj(WorkspaceDev._id);
    }

    function getCurrentActivy() {
        if (!currentActivityName) {
            currentActivityName = generateMainLayout();
        }
        return currentActivityName;
    }

    function hideCurrentActivity() {
        if (currentActivityName) {
            currentActivityName.style.display = "none";
        }

    }

    function selectActivity(e) {
        hideCurrentActivity();
        currentActivityName = document.getElementById(selectorElement.value);
        currentActivityName.style.display = 'block';
        if (selectorElement.value.indexOf("ListView") !== -1) {
            document.getElementById('listViewConfig').style.display = 'inline-block';
        } else {
            document.getElementById('listViewConfig').style.display = 'none';
        }
    }

    function createOptionItem(name) {
        var optionItem = document.createElement('option');
        optionItem['value'] = name;
        selectorElement.addEventListener('click', selectActivity, false);
        selectorElement.appendChild(optionItem);
        optionItem.innerText = name;
        optionItem.selected = true;
    }

    function getAllCode() {
        window.NetworkHandler.printModelsInterfaces();
        window.JavaGenerator.printJavaActivities();
    }

    window.ProjectManager = window.ProjectManager || {};
    window.ProjectManager.activityNames = activityNames || [];
    window.ProjectManager.generateActivity = generateActivityName;
    window.ProjectManager.generateMainLayout = generateMainLayout;
    window.ProjectManager.getCurrentActivy = getCurrentActivy;
    window.ProjectManager.getAllCode = getAllCode;


})();