/**
 * Created by Ahmed Shaban on 11/03/2017.
 */

(function () {



    var activityNames=[];
    var currentActivityName;
    var selectorElement=document.getElementById('all_activity');
    function generateActivityName()
    {
        var i = 1;
        while (1) {
            if (!activityNames.hasOwnProperty("activity" + i)) {
                activityNames["activity"+i]=true;
                return "activity"+i;
            }

            i++;
        }
    }

    function generateMainLayout() {
        var file=generateActivityName();
        var layout=document.createElement("ul");
        layout.className="WorkspaceContainer";
        layout.id=file;
        document.getElementById('mobielDev').appendChild(layout);
        hideCurrentActivity();
        createOptionItem(file);
        handleXMLTree(layout);

        return currentActivityName=layout;
    }

    function handleXMLTree(WorkspaceDev) {
        var root_id = window.utiles.generateId("LinearLayout");
        window.utiles.generateGroupLayout('match_parent', 'match_parent', root_id, 'LinearLayout'); // generate XML of grouplayout

        WorkspaceDev._id = root_id;
        window.tree.root[WorkspaceDev.id] = new window.NodeObj(WorkspaceDev._id);
    }

    function getCurrentActivy() {
        if (!currentActivityName) {
            currentActivityName=generateMainLayout();
        }
        return currentActivityName;
    }

    function hideCurrentActivity()
    {
        if(currentActivityName)
        {
            currentActivityName.style.display="none";
        }

    }

    function selectActivity(e) {
        hideCurrentActivity();
        currentActivityName=document.getElementById(selectorElement.value);
        currentActivityName.style.display='block';

    }

    function createOptionItem(name)
    {
        var optionItem=document.createElement('option');
        optionItem['value']=name;
        selectorElement.addEventListener('click',selectActivity,false);
        selectorElement.appendChild(optionItem);
        optionItem.innerText=name;
        optionItem.selected=true;
    }



    window.ProjectManager = window.ProjectManager || {};
    window.ProjectManager.activityNames = activityNames|| [];
    window.ProjectManager.generateActivity = generateActivityName;
    window.ProjectManager.generateMainLayout =generateMainLayout;
    window.ProjectManager.getCurrentActivy = getCurrentActivy;


})();